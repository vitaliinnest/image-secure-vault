import {ImageAnalysisResult, AnalysisItem} from "../models/imageAnalysisModels.ts"

const url = "https://image-chain-resource.cognitiveservices.azure.com/contentsafety/image:analyze?api-version=2023-10-01"
const apiKey = "cb1fadf790a24959ae477a8f39ca6e2a"

export async function isImageSafe(base64image: string) {
    const body = {
        image: { 
            content: base64image
        },
        categories: [
            "SelfHarm",
            "Hate",
            "Sexual",
            "Violence"
        ],
        outputType: "FourSeverityLevels"
    }


    const response = await fetch(url, {
                            method: "POST", 
                            headers: {
                                'content-type': "application/json",
                                'host': 'image-chain-resource.cognitiveservices.azure.com',
                                'Ocp-Apim-Subscription-Key': apiKey
                            },
                            body: JSON.stringify(body)
                        })
                        .then(resp => resp.json());

    return verifyResponse(response);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function verifyResponse(resp: any): ImageAnalysisResult {
    const response = resp.categoriesAnalysis as AnalysisItem[];
    const finalResult: ImageAnalysisResult = {categoriesResult: response, isValid: true};

    response.forEach(item => {
        if(item.severity > 0) {
            finalResult.isValid = false
        }

        if(item.category === "SelfHarm") {
            item.category = "Self Harm"
        }
    });

    return finalResult;
}
