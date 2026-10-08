# Website Specification

## Implementation status

The selected Editorial folio design is implemented in root-level index.html,
archive.html, notes.html, about.html, login.html, Lakeside Classroom and two placeholder project
records (project-1.html through project-3.html). Home and Archive link to these
records. Archive search filters titles and visible metadata in the browser;
specific year, course and work-type categories await owner-approved information.

All factual content that has not been supplied remains explicitly marked [ADD:].
Supabase login, signup, confirmation handling, session checks and logout are wired.
The supplied Supabase project URL and public publishable key are in config.js.
Protected pages redirect signed-out visitors to login.html. The public account
form supports email/password signup and login, with email confirmation when
required by the Supabase project. Public project settings currently report
sign-up enabled and automatic email confirmation. Signed-out browser checks pass
for all seven protected pages. On 2026-10-08, the owner confirmed that live
sign-up, log-in and log-out all pass.
There is no authentication bypass. See README.md for local startup and setup.

## What the Site Is

This website is a continuously updated personal architectural archive.

It collects projects, final presentation material, architectural drawings, renders, model photography, writing, research and, when available, process material in one browsable location.

It is not intended to behave only as a formal employment portfolio. It is also a personal repository and a casual way for professors, jurors, peers, employers and other interested visitors to explore a broader body of work and, where material exists, understand the thinking behind individual projects.

The archive belongs to Lucas Slowik, but his name should remain secondary to the identity of the archive.

The archive name is Open Record. Lucas Slowik is the author/curator.

Approved homepage description: "An ongoing record of architectural work, research, and experimentation."

## Site Structure

### login.html

Purpose:
Acts as the public front door to the entire archive.

Content:
- Archive name when provided
- Small secondary identification of Lucas Slowik
- One owner-provided architectural drawing, render or photograph
- Email field
- Password field
- Log In control
- Sign Up control
- Necessary authentication feedback

Visitors can freely create accounts.

This is the only page that is never protected by the authentication gate.

Signing up does not constitute consent to receive marketing or networking emails.

### index.html — Home

Purpose:
Introduces the archive and gives visitors an immediate sense that it is a living collection of architectural work.

Content:
- Archive name
- Brief introduction
- Selected or recent projects
- Entry into the full Archive
- Selected Notes / Research when appropriate
- Visible primary navigation
- Log Out

The exact introductory text and featured projects must be supplied or approved by the owner rather than invented.

### archive.html — Archive / Projects

Purpose:
Acts as the primary browsing interface for the body of architectural work.

Content:
- All published projects
- Project thumbnails
- Project titles
- Available project metadata
- Filtering controls
- Links to individual Project pages
- Log Out

Projects are the primary organizational unit.

The archive should support filters so visitors can browse the collection in different ways. Potential metadata may include year, course and type of work, but actual filter categories and metadata must only be used when the owner provides or approves that information.

Filtering happens in the browser using JavaScript. Search matches titles, metadata
and approved keywords; "educational" also finds Lakeside Classroom. Empty results
offer a clear-search control.

### Lakeside Classroom — project-1.html

Replaces Project 001 on Home and Archive. Architect: Lucas Slowik. Year: 2026.
Location: University of Miami, Coral Gables, Florida.
Type: Academic / Outdoor Learning Pavilion.
Status: Completed academic design project (proposal, not constructed).

Lakeside Classroom is an outdoor learning pavilion proposed for the University of Miami campus, positioned along Lake Osceola between Lakeside Village and Eaton Residential College. Designed to accommodate approximately 16 students and an instructor, the project explores how a small architectural intervention can create a sheltered learning environment within the existing campus landscape.

The pavilion is defined by a continuous folded enclosure that forms its walls and roof. The folding geometry establishes a distinctive interior volume while providing protection from sun and rain. Openings and louvers introduce controlled daylight and maintain visual connections to the surrounding landscape.

An elevated platform responds to the site's sloping terrain and emphasizes views toward Lake Osceola. Together, the enclosure, platform, and orientation establish a relationship between the learning environment and its immediate surroundings.

Images: images/lakeside-classroom/. Use exterior-illustration.png as the featured
thumbnail. Documentation: site-plan, floor-plan, elevations, perspective-sections,
wall-section and axonometric. Visualizations: exterior-illustration, interior-render,
aerial-photomontage and ground-photomontage, each shown individually. Design Process:
preliminary-designs, folding-techniques-01 and folding-techniques-02. All are PNGs.
Design Process Explorer: Final Work displays the six documentation sheets and four
renders. Design Process displays only Preliminary Designs (one sheet) and Folding
Techniques (two slides). Use keyboard-accessible tabs; Final Work is the default.
Descriptions identify the supplied drawings and folded-paper model studies only.
Both views use the existing image viewer. Without JavaScript, both remain visible.

Display all 13 without cropping or altering their appearance. Provide descriptive
alt text and an accessible opt-in image viewer. Projects 002 and 003 stay unchanged.

### Individual Project Pages

Purpose:
Present the complete available record of an individual architectural project.

Content may include:
- Project title
- Project description
- Final presentation material
- Plans
- Sections
- Elevations
- Diagrams
- Renderings
- Photomontages
- Model photography
- Process work when available
- Writing or research when available
- Project metadata
- Captions
- Navigation back to Archive
- Primary site navigation
- Log Out

Not every project needs every content type.

Project pages should accommodate incomplete archives. Missing process work should not prevent a project from being published.

Each project page uses a relative .html file.

Do not invent project information to fill empty areas.

### notes.html — Notes / Research

Purpose:
Provides a home for architectural research, writing, precedents, experiments and unfinished ideas that do not necessarily belong to a finished design project.

Content:
- Notes
- Research
- Architectural writing
- Precedent studies
- Experiments
- Related imagery when available
- Links to related projects when applicable
- Log Out

Only owner-provided material is published.

### about.html — About

Purpose:
Identifies the person behind the archive without turning the entire website into a conventional personal portfolio.

Content:
- Lucas Slowik
- Owner-provided biography
- Owner-provided portrait or other image if desired
- Owner-provided contact information if desired
- Relevant professional or academic information supplied by the owner
- Log Out

Approved biography:

Lucas Slowik is a fifth-year Master of Architecture student at the University of Miami. His academic work spans a range of architectural projects, research, and design explorations, reflecting an ongoing interest in understanding architecture through different ideas, methods, and approaches.

Rather than defining his work through a singular architectural philosophy, he approaches each project as an opportunity to explore new possibilities, respond to different conditions, and develop his understanding of design.

Open Record is an evolving archive of this work, bringing together completed projects, ongoing experiments, research, and observations. It serves as a place to document architectural development beyond finished presentations, preserving the ideas, iterations, and processes that contribute to each project.

Academic information: Fifth-year Master of Architecture student, University of Miami.

Public contact: "Contact information coming soon." Do not display a personal email or mailto link.

Keep the existing About-page image placeholder until an image is selected.

Do not invent additional biography, education, employment, contact details or other personal information.

## Authentication Gate

Authentication uses Supabase.

Visitors can create an account using an email address and password.

login.html is never gated.

index.html is the home page.

Every page except login.html checks the visitor's Supabase authentication state.

If a signed-out visitor enters the address of index.html, archive.html, notes.html, about.html or any Project .html page directly, redirect the visitor to login.html.

After successful sign-up and any required Supabase email-confirmation flow, the visitor can log in.

After successful log-in, redirect to index.html.

Every protected page contains a Log Out control.

After logging out, redirect to login.html.

All internal links are relative.

Supabase Auth is used only for authentication.

No additional visitor database tables are created.

The site does not store visitor profiles, browsing activity, project interactions or other visitor information.

Authentication email addresses must not automatically be treated as a mailing list or networking consent.

## Content Rule

Never invent facts, dimensions, dates, project names, course names, descriptions, captions, people or other factual content that the owner has not provided.

If required information is missing, ask the owner.

Use explicit placeholders rather than invented content during development.

## Build

Use plain HTML, CSS and JavaScript files only.

No frameworks.

No npm.

No build step.

Load Supabase using its CDN script tag.

index.html sits at the top level of the project folder.

All page links are relative.

The site must be responsive and usable on a phone.

The source is published from GitHub to Vercel.

No secret or Supabase service-role key may be included in the website.

## Images

Owner-provided images are stored in a folder named:

images

Preserve the appearance and aspect ratio of drawings, renders and photographs unless the owner specifically requests an alteration.

Every image must have descriptive alt text.

When an image has not yet been supplied, use a plain grey placeholder containing:

[ADD: image of ...]

The description after "image of" should state what content is needed without inventing the content itself.

Example:

[ADD: image of project hero render]

Do not substitute stock photography or invented architectural work for missing project images.

## Out of Scope

- Payments
- E-commerce
- Storing visitor information beyond their authentication account
- Visitor profiles
- Analytics stored in custom database tables
- Project comments
- Likes or favourites stored to accounts
- Mailing-list storage
- Automatic networking email collection beyond Supabase authentication
- Any custom database tables

## Done When

- [ ] The site works on a phone.
- [ ] The menu reaches every page.
- [x] Sign up works.
- [x] Log in works.
- [x] Log out works.
- [x] Typing the address of any protected page ending in .html while signed out sends the visitor to login.html.
- [ ] Every image has alt text.
- [ ] The live link opens in a new tab or window.
