export interface AnalysisItem {
    category: string,
    severity: number
}

export interface ImageAnalysisResult {
    categoriesResult: AnalysisItem[]
    isValid: boolean
}