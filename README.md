# Open Record

An ongoing record of architectural work, research, and experimentation.
Created and curated by Lucas Slowik, Open Record documents architectural development
through final proposals, drawings, visualizations and process material.

Plain HTML, CSS and JavaScript; no framework, package installation or build step.
The monochromatic editorial layout uses Cormorant Garamond headings and Inter text.

## Local preview

Run `node preview-server.cjs` and open http://127.0.0.1:8080.

## Accounts

Supabase provides email/password signup, login and logout. The public project URL
and publishable key are in config.js. Never include a secret or service-role key.
login.html is public; every other page checks the session and redirects signed-out
visitors to login.html. Successful login or signup with a session opens Home;
logout returns to Login. Signup does not subscribe visitors to marketing emails.
If Supabase requires email confirmation, the form asks visitors to confirm before
logging in. Missing configuration or an unavailable account service fails closed.

The owner previously confirmed live signup, login and logout. A fresh live account
test was not performed during the final audit. If email confirmation is enabled,
test that flow and configure the local and production redirect URLs in Supabase.

This is a browser authentication gate. Static HTML and image files are publicly
served by the host; it is not server-side protection for confidential files.

## Project archive

Lakeside Classroom (2026) is the only fully documented, indexed project: an academic
outdoor learning pavilion proposal by Lucas Slowik for the University of Miami,
not a constructed building. Its 13 original PNGs include six architectural sheets,
four individual renders and three process sheets/slides.

The keyboard-accessible Design Process Explorer switches between Final Work and
Design Process. Final Work contains drawings and renders; Design Process contains
Preliminary Designs and Folding Techniques. Both views share the image viewer.
Visitors can enlarge images, zoom with wheel/trackpad or plus/minus controls, pan
by dragging or using arrow keys, reset, and close by clicking the image, using
Close, or pressing Escape. Touch pinch and pan are implemented.

Archive search matches titles, metadata and approved keywords, including
"educational". Case-insensitive search combines with project type, year and
documentation filters generated from actual indexed metadata. A matching count,
empty-result message and reset control are provided. Projects 2 and 3 remain
explicit unfinished placeholders with existing links and are excluded from the
index. Other owner-content placeholders remain; no architectural material is
invented. About retains its image placeholder and displays no personal email.

## Deployment and sharing

Source repository: https://github.com/NiteLite25/Architecture-Website
Production website: https://architecture-website-omega.vercel.app/

The project uses GitHub and Vercel static hosting with no build step. This cleanup
does not push commits or initiate a deployment. Configure the production site URL
and permitted authentication redirect URLs in Supabase for the deployed origin.

All pages use absolute production URLs for their Open Graph sharing images.
share.png is a monochromatic raster counterpart of the existing typographic SVG
card. Lakeside Classroom uses its unchanged exterior illustration PNG. Actual
social-platform previews should be checked after deployment.

## Verification

Run `node --test tests/*.test.cjs`. Tests cover internal links and page metadata,
the 13 project images, Archive indexing/filter/reset behavior, viewer gestures,
and authentication flows using a mock Supabase client. They do not replace live
account tests or physical-device touch and screen-reader testing.

The final audit verified all seven signed-out redirects, image alt text and
internal navigation. Prior browser checks verified explorer and viewer controls,
Archive search/filter combinations and responsive layouts. The owner confirmed
phone usability. The deployed live-link check remains unverified in SPEC.md.

Seven original architectural PNGs exceed 500 KB: aerial-photomontage,
exterior-illustration, folding-techniques-01, folding-techniques-02,
ground-photomontage, interior-render and preliminary-designs. They remain unchanged.
