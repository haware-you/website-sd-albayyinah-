# Reference study: AIS Indonesia (ais-indonesia.com)

Studied: 24 Nov 2026, via Firecrawl scrapes of ~25 pages.
Note: the school is "Australian **Independent** School", not "International". No separate "Australian International School Jakarta" site was found.

---

## 1. Site architecture (the most important finding)

AIS has **two levels**:

1. **Group site** (`/`) — covers both campuses (Jakarta + Bali).
2. **Campus sites** (`/ais-jakarta`, `/ais-bali`) — each has its own header, menu and logo, with a top bar "Back to AIS | AIS Jakarta | AIS Bali".

For a single SD this split is not needed. We should copy the **campus-level** structure, since that is what a single school looks like.

### Group-level menu
| Menu | Dropdown items |
|---|---|
| About Us | Our Principals, Accreditations & Affiliations, AIS at a Glance, Our Staff, The AIS Advantage, AIS Curriculum, Data Protection & Privacy Policy (+ a photo in the mega-menu) |
| AIS Jakarta | — |
| AIS Bali | — |
| 360 Tour | Jakarta, Bali (external Panomatics VR) |
| Contact | Contact Us, Careers, UNSW Foundation |
| Enquiry | — |
| Buttons | **Book Tour** (outline) + **Apply Now** (filled yellow) |
| Top bar | Language EN/ID, Login (parent payment portal) |

### Campus-level menu (AIS Jakarta) — the model to follow
| Menu | Dropdown items |
|---|---|
| About Us | Principal's Welcome, Key Leadership Team, 360 Tour |
| Curriculum | (hub page, 7 cards) |
| Beyond the Classroom | — |
| Admissions | (hub page, 9 cards) |
| AIS Life | News, Gallery, What Parents Say, Community, Newsletter |
| Contact | Contact Us, Careers |
| Enquiry | — |
| Buttons | Book Tour + Apply Now |

---

## 2. Visual design

| Item | Value | Confidence |
|---|---|---|
| Primary dark | `#003333` (footer, dark sections) | High (pixel-sampled) |
| Heading teal | `#014843` | High (pixel-sampled) |
| Accent / CTA | golden yellow, approx `#F5B82E` | Medium (visual estimate) |
| Light section bg | `#EAEDEE`, `#F3FAFA` | High |
| Font | Rounded geometric sans (looks like Outfit) | Low — needs verification in their CSS |
| Corners | Large radius (~16–24px) on images and cards | High |
| Buttons | Pill-shaped; primary = solid yellow, secondary = yellow outline | High |
| Layout width | ~1120px centered container | Medium |

Recurring visual patterns:
- Full-width photo hero with dark overlay, small uppercase eyebrow label, big heading, 1 yellow button.
- Inner pages: 1440×500 photo banner + page title.
- Image-left / text-right split blocks, alternating.
- Floating icon badges on the corners of photos (homepage "Why AIS").
- Testimonial slider surrounded by scattered rounded photos fading at the edges.
- Horizontal card carousels with prev/next arrows (gallery).
- Tall portrait cards (256×360) with label, used as navigation grids on hub pages.
- "PREVIOUS / NEXT" links at the bottom of every inner page in a section.
- Closing CTA band on every main page: grey background, photo fading left, heading + Book Tour / Apply Now.

---

## 3. Page-by-page sections

### Homepage (group)
1. Header (transparent over hero, logo left, menu right, 2 CTA buttons)
2. Hero slider — "Empowering Minds and Uniting Communities" + Learn More
3. Why AIS? — photo with icon badges + text + 4 bullet reasons + Learn More
4. Our School Campus — 2 large photo cards (Jakarta, Bali)
5. Why Families Choose AIS — testimonial slider (quote, parent photo, name, role)
6. Latest Update — tabs: News / Gallery, horizontal card slider (thumbnail, date, title)
7. CTA band — "What You Do Today Can Improve All Your Tomorrows" + Book Now / Apply Now
8. Accreditation logo strip
9. Footer

### Campus home (AIS Jakarta)
1. Hero slider
2. "An education for the future" — image + text + Learn more
3. From the Principal — dark teal band, quote card + principal cut-out photo
4. Admissions – Start the Journey — heading + See All
5. A Complete Education — text + photo + Learn More
6. Our Gallery — carousel
7. CTA band — Book a Tour / Apply Now
8. Footer

### About pages
- **Our Principals / Principal's Welcome**: banner, photo (square), name, role, intro paragraph, "Read More" (expands).
- **Key Leadership Team**: grid of people (photo, name, role). 6 people.
- **Accreditations & Affiliations**: list of blocks — heading, paragraph, logo. 6 bodies (CIS, IB, AISA, NAPLAN, Kemendikbud/SPK, SA Dept of Education).
- **AIS at a Glance**: heading, intro, image slider, history paragraph (founded 1996, 600+ students, levels).
- **Our Staff**: two text sections + one wide image.
- **The AIS Advantage**: 9 alternating image/text blocks (curriculum, certification, learning environment, inclusivity, individual pathways, personalised learning, deep learning, diversity, community).
- **AIS Curriculum**: intro text + one image.

### Curriculum hub
- Intro text → "Why an Australian Education" (image + text + bullet list) → grid of 7 portrait cards: Early Childhood, Primary, High School, Senior School, Assessment, Wellbeing Program, Learning Support Services.
- **Primary Curriculum** (most relevant for SD): image + intro → "What is taught" → 7 subject icon tiles (English, Maths, Science, HPE, HASS, Arts, Technologies) each linking out → link to Scope & Sequence PDF.
- **Wellbeing Program**: primary vs high school support, Zones of Regulation, restorative practice, support team.

### Beyond the Classroom
- Intro + image slider → tabs (Sport / Outdoor Education / CAS) → each tab: paragraph, image, bullet list of activities.

### Admissions hub
- Intro block + Apply Now → grid of 9 portrait cards: Academic Calendar, School Fee, Why Parents Choose, Admissions Policy & Guidelines, English Support, Learning Support, General Parent Information, FAQ, Testimonial.
- **Academic Calendar**: 4 terms with start/end dates + school hours per level.
- **School Fee**: no fees on the page itself — embedded FlipHTML5 PDF viewers + download links.
- **FAQ**: accordion, ~25 questions (uniform, parking, academic year, entry assessment, holidays, class placement by age, non-English speakers, scholarships, financial aid, class size, languages, inclusion, school hours, admissions cut-off, meals, transport, safety, exams, excursions, sports, ECAs, music, childcare, teachers' origin, parents in class).

### AIS Life
- **News**: card grid (thumbnail, date, title), pagination `?page=n`.
- **News article**: banner, title, date, body text with images.
- **Gallery**, **What Parents Say**, **Community** (Parents & Friends association, relocation support), **Newsletter**.

### Forms
| Form | Fields |
|---|---|
| Contact Us | 2 Google Maps embeds, address/phone/email per campus, admissions block (email, WhatsApp, office hours) + form: first/last name, phone, country, email, level of interest, campus |
| Enquiry | Parent: relationship, title, first name, surname, email, mobile, country, enquiry type, campus, how did you hear. Student (repeatable "Add other child"): name, gender, DOB, current school, current grade, year group applying. Free-text question. reCAPTCHA |
| Booking Tour | Campus, date, time slot, offline/virtual (Google Meet), level; parent details; repeatable child block; visit rules; reCAPTCHA |
| Apply Now | Links out to a Google Form |

### Footer
- Logo + quick links (Enquiry, Booking Tour, Apply Now)
- Per-campus address / email / phone with icons
- Link columns: About Us, Campus pages, Contact, Careers, Privacy Policy
- Copyright + social icons (Instagram, LinkedIn, YouTube)

---

## 4. Critical notes before we build

1. **Do not copy their text or photos.** Structure and layout patterns are fine to borrow; AIS's copy, photos and logo are their copyrighted material. Every section needs our own content. (Confidence: high — standard copyright; not legal advice.)
2. **Content mismatch.** AIS is an English-medium Australian-curriculum K–12 school. SD Al Bayyinah is (I assume, needs confirmation) an Indonesian Islamic primary school. Several AIS sections do not translate directly:
   - "Australian curriculum / IB / NAPLAN" → likely Kurikulum Merdeka + Islamic programme (tahfidz, BTQ, adab), if that applies.
   - Senior School, High School, IBDP, university list → drop.
   - Two-campus structure → drop (unless Al Bayyinah has several units).
3. **The site depends on a lot of real content.** AIS has ~40 pages, each with professional photos. If we don't have photos, leadership bios, fee info, testimonials and news, a copy of this layout will look empty. Realistic first version is smaller (see §5).
4. **Forms need a backend.** AIS forms post to their CMS + reCAPTCHA. For us: a static site can't receive form data by itself. Cheapest options: WhatsApp link, Google Form, or a form service. Decision needed.
5. **Fees as PDF embeds** (AIS style) are hard to read on phones. A simple HTML table is better.
6. **AIS weaknesses worth not copying**: hero images lazy-load (blank in screenshots/slow connections), FAQ "school hours" answer is only an image, duplicated child-form blocks, "Apply Now" leaves the site to Google Forms.

---

## 5. Proposed sitemap for SD Al Bayyinah (draft, to be confirmed)

| AIS page | Al Bayyinah equivalent | Priority |
|---|---|---|
| Campus home | Beranda | Must |
| Principal's Welcome + Leadership | Tentang Kami → Sambutan Kepala Sekolah, Guru & Staf | Must |
| AIS at a Glance + Advantage | Tentang Kami → Profil, Visi & Misi, Keunggulan | Must |
| Accreditations | Akreditasi & Legalitas | Should |
| Curriculum hub + Primary Curriculum | Kurikulum → Kurikulum Nasional, Program Keislaman | Must |
| Beyond the Classroom | Ekstrakurikuler | Should |
| Admissions hub | PPDB / Pendaftaran → Alur, Biaya, Kalender, FAQ | Must |
| News + Gallery | Berita & Galeri | Should |
| What Parents Say | Testimoni | Could |
| Contact + Enquiry + Book Tour | Kontak (map, WhatsApp, form) + Jadwal Kunjungan | Must |
| Careers, Newsletter, Community, 360 Tour, Login | — | Later |
