# Open Record

Plain HTML, CSS and JavaScript. No build step or package installation.

Run `node preview-server.cjs` and open http://127.0.0.1:8080.

## Account configuration

The supplied Supabase project URL and public publishable key are in config.js.
Never use a secret or service-role key. The project's public settings report
sign-up enabled and automatic email confirmation. If email confirmation is
enabled later, allow local and deployed login.html URLs as auth redirect URLs.
Configure the production site URL before inviting visitors.

Missing configuration fails closed: protected pages redirect to login.html,
where the form explains the setup requirement. There is no preview login or
authentication bypass. The owner confirmed live sign-up, log-in and log-out pass
on 2026-10-08. Email confirmation is currently automatic; test the confirmation
email flow if that project setting changes.

This follows SPEC.md's browser authentication gate. Static HTML and image files
are served publicly by a static host; the browser gate is not server-side access
control for confidential project files.

## Content

Project copy, images and project metadata remain explicit
placeholders. Replace them with owner-approved material. Search works on visible
project titles and metadata; year/course/type filters await approved categories.
Project pages are development records, not claims of published projects.

The SVG share card is a local typographic placeholder. Replace it with a raster
share image and an absolute deployed image URL when the hosting URL is
approved, for compatibility with social preview services.

## Verification

Run `node --test tests/site.test.cjs`. Tests check internal file links, metadata,
authentication gates and form/session flows with a mock Supabase client. They do
not replace a live account test.
