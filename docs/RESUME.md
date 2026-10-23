# Resume: Google Ads MCP

Scaffold only. No API calls, no OAuth app, and no published packages. Start from this file.

Kaneo was unavailable when this was written (`/api/auth/get-session: Application not found`), so this document is the tracker.

Conversion actions and the customers a token can see. Reporting stays in the Analytics MCP. This API is large; this repo stays on conversions.

## Related scaffolds

Each API family has its own repository. Do not add their tools here.

| Repo | Role |
| --- | --- |
| [google-analytics-mcp](https://github.com/lemon-squared/google-analytics-mcp) | GA4 Admin and Data |
| [google-tag-manager-mcp-server](https://github.com/lemon-squared/google-tag-manager-mcp-server) | Tag Manager |
| [google-business-profile-mcp-server](https://github.com/lemon-squared/google-business-profile-mcp-server) | Business Profile |
| [google-search-console-mcp-server](https://github.com/lemon-squared/google-search-console-mcp-server) | Search Console |
| [google-pagespeed-mcp-server](https://github.com/lemon-squared/google-pagespeed-mcp-server) | PageSpeed Insights and CrUX |
| [google-ads-mcp-server](https://github.com/lemon-squared/google-ads-mcp-server) | Ads conversion actions |
| [bing-webmaster-mcp-server](https://github.com/lemon-squared/bing-webmaster-mcp-server) | Bing Webmaster |
| [indexnow-mcp-server](https://github.com/lemon-squared/indexnow-mcp-server) | IndexNow URL pushes |
| [google-indexing-mcp-server](https://github.com/lemon-squared/google-indexing-mcp-server) | Indexing API for 8ball.live streams |
| [google-merchant-mcp-server](https://github.com/lemon-squared/google-merchant-mcp-server) | Merchant Center for the WMS |

## This repository

TypeScript, formatted with Ultracite. The local CLI keeps client data on the machine that holds the credentials.

| Path | Package | Status |
| --- | --- | --- |
| `packages/core` | `@lemon-squared/google-ads-mcp-core` | `AdsAuthProvider` only. Tools go here. |
| `packages/cli` | `@lemon-squared/google-ads-mcp` | Exits immediately and points at this file. |
| `apps/worker` | not created | Hosted credentials, after the CLI is in use. |

`AdsAuthProvider.getAccessToken()` is the only auth seam. The CLI and a later worker both implement it. Tools never see how the credential was obtained.

Do not put that value in a committed `.cursor/mcp.json`. When the CLI speaks MCP over stdio, user-level Cursor config is `~/.cursor/mcp.json` so every internal and client project can see it.

Scope: `https://www.googleapis.com/auth/adwords`. A developer token is a second value, separate from the access token. Both stay in environment variables. Do not commit either.

### Tools to add

Reads first.

| Tool | Purpose |
| --- | --- |
| `list_accessible_customers` | Customer ids the token can use. |
| `list_conversion_actions` | Conversion actions on one customer. |

Later: upload a click conversion for a booked delivery or a shop purchase, after consent allows `ad_storage`. Do not build campaign, keyword, or reporting tools here.

## Order of work

1. Implement the two read tools in `packages/core`, then make `packages/cli` an stdio MCP server.
2. Add click-conversion upload after those reads are what Cursor uses.
3. Add a hosted OAuth worker only after the local CLI is what Cursor uses for client projects.

## Constraints

- Format with Ultracite (`bun run format`). The config extends `ultracite/biome/core`.
- Keep client data on the local CLI until a hosted worker exists.
- GA4 event reports stay in [google-analytics-mcp](https://github.com/lemon-squared/google-analytics-mcp).
