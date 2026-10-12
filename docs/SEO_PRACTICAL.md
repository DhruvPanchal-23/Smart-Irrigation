# Sitemap and robots.txt practical

Date: 11 October 2026

## Aim

Create an XML sitemap for public content and crawler rules for the irrigation website, then verify local and published responses.

## Observations

- Node.js: v24.7.0; npm: 11.5.1.
- Executed `npx.cmd --yes sitemap-generator-cli https://agri-ai-sandy.vercel.app/ --filepath public/sitemap.xml --verbose` from `frontend`.
- Generator result: zero pages, zero ignored pages, one HTTP 404 error. This was not successful sitemap generation.
- Created the XML from `src/routes/AppRoutes.jsx`: the homepage is `/`, and `/about` is the other public content page. `/home` does not exist.
- Created robots.txt directly with exclusions for authentication, protected application routes, reserved farmer/admin paths, and `/api/`. The SmallSEOTools generator was not used.
- Both local URLs returned HTTP 200 and their contents matched the source and `dist` files exactly. XML parsing passed.
- `npm.cmd run build` and `npm.cmd run lint` passed. Build warned about a bundle larger than 500 kB.
- Both published URLs returned HTTP 404 with Vercel `DEPLOYMENT_NOT_FOUND`. No deployment was performed.

## Explanation

A sitemap lists public content URLs for search engines. robots.txt supplies crawler instructions and the sitemap location. It does not enforce authentication or prevent access to private data. Vite serves these files from `public` and copies them to `dist` during the build.

## Evidence to attach

1. Actual generator command and its error output; capture a successful run after the domain is restored if required by the experiment.
2. `frontend/public/sitemap.xml` filename and complete XML in VS Code.
3. Actual SmallSEOTools configuration and generated output after completing that step.
4. `frontend/public/robots.txt` filename and complete contents in VS Code.
5. Published sitemap address and XML after deployment.
6. Published robots.txt address and contents after deployment.

Screenshots have not been captured or attached.

## Result and conclusion

Local sitemap and robots.txt implementation is verified. The practical remains incomplete until the current production domain is confirmed, both files are deployed, both published responses are verified, and the required screenshots are attached.

## Reproduce local verification

From the repository root:

```powershell
cd frontend
npm.cmd run dev
```

Open `/sitemap.xml` and `/robots.txt` at the address printed by Vite. In a separate frontend terminal:

```powershell
npm.cmd run lint
npm.cmd run build
```

No dependencies, backend routes, models, or application pages were added. Database and authenticated workflow checks are outside this static-file change. The frontend has no configured test script; the existing backend tests run with `cd backend` followed by `npm.cmd test`.

## Landing About section update - 12 October 2026

The standalone `/about` content moved to `/#about` on the landing page. Legacy
`/about` visits redirect there. The sitemap now lists only `/`; URL fragments do
not represent separate sitemap pages. Earlier practical notes describe the route
configuration at the time of the original exercise.
