# React + Vite

## Sitemap and crawler rules

`public/sitemap.xml` lists the implemented public content route `/`.
`/home` is not an application route. `public/robots.txt` excludes authentication,
private application routes, and the API. Authentication remains responsible for
protecting private data.

Both files currently use `https://agri-ai-sandy.vercel.app`. On 11 October 2026,
that domain returned Vercel `404 DEPLOYMENT_NOT_FOUND`; confirm the current domain
and replace it in both files before publishing. The requested sitemap generator
reported zero pages and one 404 error, so the XML was authored from the local
route configuration.

Run `npm.cmd run dev` and check `/sitemap.xml` and `/robots.txt` at the printed
local address. Run `npm.cmd run build` before deploying with the existing Vercel
workflow. After deployment, verify both URLs return the files rather than the
application HTML or a deployment error. Capture the requested journal screenshots
from the actual terminal, editor, generator, and published browser pages.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Landing page refresh - 12 October 2026

The `/` page uses a locally bundled agricultural photograph, image-overlay public
navigation, blue primary actions, and the sugarcane About guide below the hero. Account links use the existing `/login` and `/register` routes; section
links use native anchors. The landing page contains no sample weather readings.
The hero photograph is from Unsplash:
https://images.unsplash.com/photo-1500382017468-9049fed747ef

The reference composition is adapted to the blue primary-action requirement in
AGENTS.md. This change adds no dependencies and does not change API contracts.

### Landing page verification (12 October 2026)

`npm.cmd run lint` and `npm.cmd run build` pass. `npm.cmd run dev -- --host
127.0.0.1` serves the page, account/about paths, transformed Home module and
bundled image with HTTP 200. Both development servers started and all 11 existing
backend tests passed. Browser visual/mobile/keyboard checks remain pending because
no browser surface was connected. There is no frontend test script configured.

### About section consolidation

The sugarcane growing guide now appears at `/#about` below the landing hero.
The standalone About page was removed; `/about` redirects to `/#about` for old
bookmarks. About navigation and hero links scroll to this section. The former
feature cards, three-step onboarding, landing note and landing footer were removed.
The sitemap now lists only `/`. Frontend lint and build pass; browser visual and
scrolling verification remains pending because no browser is connected.

The embedded About guide uses the landing page's blue, navy, white and slate
palette for text, cards, buttons and panels; its sugarcane illustration retains
natural crop colors. Frontend lint and build pass after the palette update.

### App-wide color alignment

Shared styles, login/register, dashboard/sidebar, profile, irrigation advisor and
analytics accents now use the landing page's blue/navy/white/slate palette.
Semantic success, warning and error colors remain distinct. No dependencies or
business behavior changed. Lint and build pass; visual browser review is pending.

The app-wide palette change above was reverted at the user's request. The earlier
earth-tone app styling is restored; landing/About colors are retained. Lint and
build pass after rollback.

### Green-to-blue accents

Green/teal decorative accents now use blue, including buttons, links, active
navigation, profile/advisor accents, login/register gradients and chart accents.
Brown surfaces and existing neutral colors remain. Lint and build pass; browser
visual review is pending.

The user requested brighter blue without dark blue shades. Decorative blue
accents, panel gradients and hover colors use #2563EB rather than darker blues.
Lint and build pass; browser visual verification remains pending.

### Landing glassmorphism

The landing header, secondary controls and About cards use translucent surfaces,
backdrop blur, light borders and soft shadows. Blue background glows make the
frosted cards visible. Browsers without backdrop-filter receive more opaque
fallbacks. Lint/build pass; browser visual review remains pending.

The Irrigation strategy section, including the pre-irrigation checklist and four
crop-stage moisture cards, was removed at the user's request. Lint/build pass.

The glassmorphism additions above were removed at the user's request. The landing
and About section return to their prior styling. Bright blue accents and the
Irrigation strategy section removal are retained. Lint/build pass.

The landing About account-creation banner uses light blue (#DBEAFE), dark text,
and the existing bright blue button instead of a navy background. Lint/build pass.

Glassmorphism is now limited to the landing hero buttons and header Sign up
button. These use translucent surfaces, backdrop blur, subtle borders/shadows
and opaque fallbacks where blur is unsupported. Lint/build pass; browser visual
review remains pending.

The landing buttons now follow the supplied clear-glass reference with transparent
surfaces, stronger blur, raised edge highlights, inset shadows and white labels.
Lint/build pass; browser visual review remains pending.

The About cards, illustration overlay and account banner now use clear-glass
surfaces with blur, raised light edges and inset shadows. Light blue background
glows make translucency visible. Opaque fallbacks are provided. Lint/build pass;
browser visual review remains pending.

The About-content glass styling was removed after clarification. The About
KisanSetu hero button retains its clear-glass effect; the other previously styled
hero/header buttons remain as requested earlier. Lint/build pass.

The landing button glass effect has been reverted. Hero and header buttons now
use their preceding solid blue/white styling. Lint and production build pass.

Landing hero/header buttons now have a subtle glass finish while preserving their
blue/white colors and label colors. Slight translucency, blur, rim highlights and
shadows provide the effect, with solid fallback fills. Lint/build pass; browser
visual verification remains pending.

The landing buttons use a sculpted tinted-glass finish inspired by the latest
reference: raised rims, deeper inset shadows and 24px backdrop blur, while
retaining blue/white fills and label colors. Lint/build pass; browser visual
comparison remains pending.

The latest landing button finish uses thicker rounded glass rims, layered inset
borders and 26px blur with blue/white tinted cores. Lint/build pass; browser visual
comparison remains pending.

The landing button glass is now more transparent (48% tinted fills), with brighter
edge highlights and 16px blur to show more background detail. Blue/white tints
remain. Lint/build pass; browser visual and contrast review remains pending.

The landing-button glass effect was removed at the user's request. Original solid
blue/white buttons are restored. Lint and production build pass.

### Responsive HD landing background - 12 October 2026

The hero uses a native picture element with bundled copies of the same Unsplash
photo: desktop 3840x2160, tablet 2048x1536, and portrait phone 1200x1600.
Portrait phones up to 600px select the mobile crop; other viewports up to 1200px
select the tablet crop. Larger screens use the 4K image. Object-fit cover avoids
stretching. Mobile hero height follows content with a 100svh minimum; short
landscape viewports retain enough vertical space for text and controls.
Image dimensions, lint/build, and local HTTP image delivery are verified.
Desktop/tablet/mobile browser visual checks remain pending. No dependencies added.


### Shortened landing About section - 12 October 2026

At the user's request, removed the crop explanation/principles, growing timeline,
irrigation-method cards, and good-field-habits checklist. Their unused data/icon
imports and the growing-method anchor link were removed. The introductory hero,
sugarcane illustration, registration banner, and disclaimer remain. Lint/build pass.


The landing About Farm with better context account banner and educational disclaimer were removed at the user's request. The introductory sugarcane content remains. Frontend lint/build pass.
