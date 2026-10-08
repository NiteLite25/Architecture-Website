# Design Direction

## Selected direction — Editorial folio (Scheme C)

Scheme C is the selected design for the entire archive. The home page lives at
index.html; the alternative scheme folders are removed. Use a charcoal ground,
paper text, large Cormorant Garamond titles and quiet Inter body text. The attitude
is reflective and editorial, with framed work, generous space and fine rules.

The home opens with a centered serif title and introduction, then a horizontal
sequence of three framed projects staggered vertically. Archive uses a systematic
catalogue; project pages use an asymmetric folio. Notes use a spacious reading
layout. About remains restrained. Login pairs one large image with a compact form.

The archive name, introductory copy, project material and personal details remain
explicit [ADD: ...] placeholders until supplied or approved by the owner.

## Concept

A living architectural archive presented as an editorial folio: a reflective,
continually growing collection of drawings, images and writing. Restrained dark
surfaces and paper typography frame the work without changing its appearance.

## References

There is no single named visual reference. The design instead borrows systems from three broader reference types without copying their identities.

Architectural archives:
Borrow the ability to catalogue work through consistent metadata, filtering and clear relationships between projects, dates, courses and types of material. Do not copy names, logos, text, imagery, fonts or the visual identity of any existing archive.

Studio pin-up walls:
Borrow the feeling of individually framed drawings and images arranged freely across a larger field. Composition can vary in scale and position instead of forcing every piece of work into identical cards.

Architectural drawing sets and physical material samples:
Borrow restrained monochrome, fine rules, generous margins, annotation-like typography and the tones of paper, graphite and concrete. The system should evoke architectural documentation without imitating a particular architect or publication.

## Colour Palette

Paper — #F2F0EA
Primary text and headings on the charcoal ground.

Soft Paper — #E7E4DC
Light surfaces only when needed within owner-provided material.

Graphite — #3D3D3A
Image placeholder backgrounds and quiet secondary surfaces.

Concrete — #B8B6AF
Secondary text and metadata. Use #64645D for subtle rules and borders.

Charcoal — #1D1D1B
Primary page background throughout the archive.

Black — #000000
Reserved for maximum-contrast moments, active states and selected controls.

The interface should remain within this monochrome family. Architectural drawings, renders, photographs and other project material retain their original colours unless explicitly specified otherwise.

## Typography

Use Google Fonts only.

Display typeface: Cormorant Garamond. Body, navigation and metadata: Inter.

Serif display type gives the archive a publication-like character. Inter provides clear, restrained navigation and reading text. Use regular and medium weights.

Display / Home title: 96–120px desktop, 64px mobile
Page heading: 64–88px desktop, 44–56px mobile
Project title: 32–44px desktop, 28–34px mobile
Section heading: 20–24px
Body: 16–18px
Metadata / captions: 12–14px
Navigation: 13–14px

Use regular and medium weights as the default. Bold typography should be uncommon.

## Layout and Grid

The layout should feel free rather than locked to an obvious architectural grid.

Use an underlying responsive 12-column desktop grid to maintain order, but allow images, titles and project groups to occupy different widths and positions. The visitor should sense composition rather than see the grid.

On mobile, collapse the system into a simple one- or two-column arrangement depending on available width.

The Archive page is more systematic than individual Project pages because browsing and filtering must remain easy.

Project pages can behave more like studio walls. Drawings, renders and photographs may vary significantly in size and placement while maintaining generous separation.

Avoid visual density. Blank space is an active part of the composition.

Base spacing unit: 8px.
Common spacing increments: 8px, 16px, 24px, 32px, 48px, 64px, 96px and 128px.

## Image Treatment

Images are primarily framed rather than full-bleed.

Give drawings, renders and photographs generous surrounding space so that they resemble material laid out on a studio wall or table.

Do not automatically crop, recolour, desaturate or convert project material to black and white.

Preserve the original aspect ratio whenever possible.

Captions and metadata should remain visually secondary.

Archive thumbnails can be more standardized for browsing, while Project pages are allowed greater variation in image scale and placement.

## Movement

Movement is subtle.

Use restrained opacity transitions, gentle hover responses and smooth filter changes.

Transitions should generally last approximately 150–300ms.

Images should not fly into position, aggressively scale, rotate or follow the cursor.

Scrolling should remain natural.

No custom cursor.

## Log-in Page

The log-in page is the architectural front door to the archive.

Use one large architectural drawing, render or photograph selected by the site owner as the dominant visual element. Do not invent or substitute project imagery.

The image should retain its original appearance.

Place a restrained sign-up / log-in area beside the image on wide screens. On phones, place the image above the authentication area.

The archive name should appear clearly but without oversized branding. The owner's name should appear only as small secondary identification.

The page should feel like the cover of an architectural archive rather than a corporate account portal.

Sign-up is open to any visitor.

The page should make clear that creating an account provides access to the archive. It must not imply that creating an account subscribes the visitor to marketing emails or a mailing list.

## Menu

Navigation must always be visible and understandable.

Desktop navigation should include:
Home
Archive
Notes / Research
About
Log Out

Individual Project pages return naturally to Archive and remain connected to the primary navigation.

On small screens, navigation may collapse for space, but the menu control must remain permanently visible, clearly labelled and immediately understandable.

Do not hide navigation behind unexplained icons or interactions.

## Buttons and Controls

Buttons should be simple rectangular controls with restrained borders and typography.

Avoid decorative shapes, gradients, exaggerated rounding and glossy effects.

Filter controls should clearly distinguish active and inactive states.

Hover states can invert foreground and background or make a restrained tonal shift.

Clickable elements must always look or behave clearly enough that the visitor understands they are interactive.

## Tone of Voice

Direct, observational and architectural.

Project writing should explain intentions, decisions, constraints and development without sounding promotional.

Avoid exaggerated claims about the quality or importance of the work.

Notes and research may be more informal and exploratory than finished project descriptions, reinforcing the sense that this is a living working archive.

## Five Never Rules

1. Never turn the interface into a generic portfolio template of identical project cards.
2. Never introduce colour simply to make the monochrome design more exciting.
3. Never use pop-ups, custom cursors or navigation that visitors have to discover.
4. Never alter the colour, crop or visual character of architectural work unless specifically instructed.
5. Never let experimental composition interfere with the visitor's ability to find, filter or understand the work.
