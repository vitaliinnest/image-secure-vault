import { Web3Storage } from "web3.storage";

const postfix = "Image Secure Vault";

export interface ImageMetadata {
  path: string;
  caption: string;
  cid: string;
  imageURI: string;
  metadataURI: string;
  imageGatewayURL: string;
  metadataGatewayURL: string;
}

function jsonFile(filename: string, obj: object): File {
  return new File([JSON.stringify(obj)], filename);
}

function makeGatewayURL(cid: string, path: string): string {
  return `https://${cid}.ipfs.dweb.link/${encodeURIComponent(path)}`;
}

export function convertIpfsUriToHttps(uri: string): string {
  const ipfsPrefix = 'ipfs://';
  const ipfsIoPrefix = 'https://ipfs.io/ipfs/';
  
  const hash = uri.substring(ipfsPrefix.length);
  return `${ipfsIoPrefix}${hash}`;
}

export async function storeImage(
  imageFile: File,
  caption: string,
  token: string
): Promise<ImageMetadata> {
  const uploadName = [caption, postfix].join(" | ");

  const metadataFile = jsonFile("metadata.json", {
    path: imageFile.name,
    caption,
  });

  const web3storage = new Web3Storage({ token });
  const cid = await web3storage.put([imageFile, metadataFile], { name: uploadName });
  
  return buildImageMetadata(cid, caption, imageFile.name);
}

function buildImageMetadata(cid: string, imageCaption: string, imagePath: string): ImageMetadata {
  const metadataGatewayURL = makeGatewayURL(cid, "metadata.json");
  const imageGatewayURL = makeGatewayURL(cid, imagePath);
  const imageURI = `ipfs://${cid}/${imagePath}`;
  const metadataURI = `ipfs://${cid}/metadata.json`;
  return {
    caption: imageCaption,
    path: imagePath,
    cid,
    metadataGatewayURL,
    imageGatewayURL,
    imageURI,
    metadataURI,
  };
}

export async function* listImageMetadata(token: string): AsyncGenerator<ImageMetadata> {
  if (!token) {
    console.error("No API token for Web3.Storage found.");
    return;
  }

  const web3storage = new Web3Storage({ token });
  for await (const upload of web3storage.list()) {
    if (!upload.name || !upload.name.endsWith(postfix)) {
      continue;
    }

    try {
      const metadata = await getImageMetadata(upload.cid);
      yield metadata;
    } catch (e) {
      console.error("error getting image metadata:", e);
      continue;
    }
  }
}

export async function getImageMetadata(cid: string): Promise<ImageMetadata> {
  const metadataUrl = makeGatewayURL(cid, "metadata.json");
  const metadataResult = await fetch(metadataUrl);
  if (!metadataResult.ok) {
    throw new Error(
      `error fetching image metadata: [${metadataResult.status}] ${metadataResult.statusText}`
    );
  }

  const storedMetadata = await metadataResult.json();
  return buildImageMetadata(cid, storedMetadata.caption, storedMetadata.path);
}
  
export async function validateToken(token: string): Promise<boolean> {
  const web3storage = new Web3Storage({ token });

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const _ of web3storage.list({ maxResults: 1 })) {
      // any non-error response means the token is legit
      break;
    }
    return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return false;
  }
}
