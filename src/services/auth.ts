export const TOKEN_STORAGE_KEY: string = "w3storage-token";

export function getSavedToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}
