export const serverName = "google-ads-mcp";

/** Supplies a Google access token. The CLI and a future hosted worker both implement this. */
export interface AdsAuthProvider {
  getAccessToken: () => Promise<string>;
}
