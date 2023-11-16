import { Web3Storage } from "web3.storage";

const postfix = "Image Secure Vault";

interface StoreImageResult {
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

export async function storeImage(
  imageFile: File,
  caption: string,
  token: string
): Promise<StoreImageResult> {
  const uploadName = [caption, postfix].join(" | ");

  const metadataFile = jsonFile("metadata.json", {
    path: imageFile.name,
    caption,
  });

  const web3storage = new Web3Storage({ token });
  const cid = await web3storage.put([imageFile, metadataFile], {
    name: uploadName,
  });

  const metadataGatewayURL = makeGatewayURL(cid, "metadata.json");
  const imageGatewayURL = makeGatewayURL(cid, imageFile.name);
  const imageURI = `ipfs://${cid}/${imageFile.name}`;
  const metadataURI = `ipfs://${cid}/metadata.json`;

  return { cid, metadataGatewayURL, imageGatewayURL, imageURI, metadataURI };
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

interface ImageMetadata {
  cid: string;
  path: string;
  caption: string;
  gatewayURL: string;
  uri: string;
}

export async function getImageMetadata(cid: string): Promise<ImageMetadata> {
  const url = makeGatewayURL(cid, "metadata.json");
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `error fetching image metadata: [${res.status}] ${res.statusText}`
    );
  }

  const metadata = await res.json();
  const gatewayURL = makeGatewayURL(cid, metadata.path);
  const uri = `ipfs://${cid}/${metadata.path}`;

  return { ...metadata, cid, gatewayURL, uri };
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
