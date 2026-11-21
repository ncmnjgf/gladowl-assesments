# EduCompass — College Discovery Platform

> **"Find Your Direction. Discover Your Future."**  
> Frontend Development Internship Assessment — Track 2: Next.js

EduCompass is a modern, responsive, and student-focused college discovery web application built with **Next.js (App Router)** and **Tailwind CSS**. It allows students to explore premier colleges and universities across India, filter by location and academic stream, search programs, evaluate fee structures and reviews, and shortlist favorite institutions with persistent local storage.

---

## 1. Project Overview & Live Links

- **Live Deployed URL:** `https://your-deployment-url.vercel.app`
- **GitHub Repository:** `https://github.com/your-username/educompass-college-discovery`
- **Primary Technology Stack:** Next.js 16 (App Router), React 19, JavaScript (ES6+), Tailwind CSS, Lenis Smooth Scroll, GSAP, Lucide Icons.

---

## 2. Key Features Implemented

### Screen 1: Homepage (`/`)
- **Hero Exploration:** Two-column hero with an uppercase status badge, headline highlighting *"Shape your future"*, and a unified search form (keyword input + city dropdown + "Find Colleges" CTA).
- **Interactive Visual Composition:** Rounded campus photography with interactive floating highlight cards (*"Find your dream college"* and *"Explore 500+ possibilities"*).
- **Popular Search Chips:** Quick-access lavender chips for *Engineering*, *Management*, *Computer Science*, *Medical*, and *Arts & Science*.
- **Academic Disciplines (6 Categories):** Dedicated cards for Engineering, Management, Medical, Computer Science, Arts & Humanities, and Science with subtle hover animations.
- **Featured Institutions:** Reusable card grid showcasing top-tier colleges (*ABC Institute of Technology*, *Western Business University*, *National College of Science*) with a *"View All Colleges"* secondary action.
- **How EduCompass Works:** 3-step numbered journey guiding students through *Discover*, *Explore*, and *Shortlist*.
- **Final CTA & 4-Column Footer:** High-contrast Navy banner (`#14213D`) leading into comprehensive directory links, account shortcuts, and verification accreditation notices.

### Screen 2: College Listing / Explore Colleges (`/colleges`)
- **Instant Search:** Debounced, case-insensitive keyword search matching across university names, cities, states, descriptions, and courses offered.
- **Multi-Factor Filter Sidebar:**
  - **Location / City Dropdown:** Quick-filtering by cities including Pune, Mumbai, Bengaluru, Delhi, Hyderabad, and Chennai.
  - **Academic Discipline Checkboxes:** Selectable streams (*Engineering*, *Management*, *Medical*, *Science*, *Arts*).
  - **Sorting Controls:** Alphabetical (A–Z, Z–A) and Rating (High to Low, Low to High).
  - **Institution Type:** Toggle filters between *All*, *Public*, and *Private*.
  - **Reset All Filters:** One-click clear action that restores default settings and resets pagination.
- **Active Filter Chips:** Visible chips for all active constraints with instant `✕` removal buttons.
- **Pagination / Load More:** Dynamic card pagination displaying 6 colleges initially, with an interactive *"Load More Colleges"* button showing remaining records.
- **Empty State:** Minimal illustration with informative guidance and a direct *"Clear All Filters"* button when 0 items match.
- **Mobile Responsive Drawer:** Smooth bottom sheet drawer for filter controls on smaller screens with zero horizontal overflow.

### Screen 3: College Details (`/colleges/[slug]`)
- **Dynamic Routing:** Built with Next.js App Router dynamic parameter `[slug]`.
- **Dynamic SEO Metadata (`generateMetadata`):** Injects dynamic `<title>` and `<meta name="description">` tags into the document head per college for search engine indexing.
- **Static Site Generation (SSG):** Utilizes `generateStaticParams()` to pre-render HTML for all 12 college pages at build time for instant loading.
- **Comprehensive Profile:**
  - Campus cover image with breadcrumbs (`Home / Explore Colleges / [College Name]`).
  - Overlapping hero card with college name, location, and institution type.
  - 4 quick metrics cards: Location, Programs Offered, Annual Fee, and Institutional Rating.
  - *"About this College"* overview with campus highlights checklist.
  - *"Courses Offered"* breakdown with degree types, durations, and syllabi.
  - *"Fees & Expenses"* structured table with sample labels.
  - *"Student Reviews"* section displaying verified student testimonials or *"No reviews available yet."*
  - Interactive *"Save to Wishlist"* button and *"Back to Colleges"* navigation.

### Screen 4: Personal Wishlist (`/wishlist`)
- **Persistence via LocalStorage:** Shortlisted colleges are saved under `educompass_wishlist` and remain preserved after page reloads and browser restarts.
- **Hydration Safety:** Configured with an `isLoaded` mount guard inside `WishlistContext.js` to eliminate SSR hydration mismatch errors.
- **Live Counter & Toast Feedback:** Real-time badge counter on the header bookmark icon, accompanied by bottom-right toast notifications confirming saves and removals.
- **Empty State:** Dedicated graduation cap graphic, *"Your wishlist is waiting!"* headline, and an *"Explore Colleges"* button.

---

## 3. Screenshots of Required Screens

*(Screenshots to be added before final submission)*

### 1. Homepage (`/`)
`![EduCompass Homepage](screenshots/homepage.png)`

### 2. College Listing Page (`/colleges`)
`![EduCompass College Listing](screenshots/colleges-listing.png)`

### 3. College Detail Page (`/colleges/[slug]`)
`![EduCompass College Details](screenshots/college-details.png)`

### 4. Wishlist Page (`/wishlist`)
`![EduCompass Wishlist](screenshots/wishlist.png)`

---

## 4. Technical Architecture & Decisions (Walkthrough Guide)

### Why Next.js App Router?
- **Server Components:** Utilized by default on pages like `app/colleges/[slug]/page.js` to fetch data and generate SEO metadata without shipping unnecessary JavaScript to the client.
- **Client Components (`'use client'`):** Strictly isolated to interactive UI islands requiring browser APIs or state:
  - `context/WishlistContext.js` (for `localStorage` and toasts)
  - `components/Header.js` (for mobile drawer state and live wishlist counter)
  - `components/SearchAndFilters.js` (for input and filter events)
  - `components/CollegeCard.js` (for `e.preventDefault()` wishlist toggling)

### Rendering & Data Strategy
- **Static Site Generation (SSG):** We chose SSG for the college detail routes using `generateStaticParams()`. Because college directory catalogs change infrequently compared to user actions, pre-rendering HTML at build time guarantees sub-second page loads, optimal Lighthouse scores, and zero server latency.
- **Data Modeling:** Built with a custom, realistic JSON dataset (`data/colleges.json`) with consistent fields (`id`, `name`, `slug`, `city`, `state`, `category`, `image`, `description`, `courses`, `fees`, `rating`, `reviews`, `accreditation`, `coursesOffered`, `feeSchedule`).

### Styling & Design System
- Styled using **Tailwind CSS** with a custom brand palette:
  - **Navy (`#14213D`)**: Authoritative headings and branding.
  - **Indigo (`#4F46E5`)**: Primary buttons, active navigation, and search highlights.
  - **Lavender (`#EEF2FF`)**: Chip backgrounds and subtle hover cards.
  - **Light Gray (`#F8FAFC`)**: Page background.
- Fonts loaded with zero render-blocking via Next.js native `next/font/google`: **Manrope** for headings and **Inter** for body text.
- Integrated **Lenis + GSAP** for smooth momentum scrolling with accessibility fallbacks (`prefers-reduced-motion`).

---

## 5. Application Structure

```
college-finder/
├── app/
│   ├── layout.js                 # Global Root Layout (Header, Footer, WishlistProvider, Lenis Smooth Scroll)
│   ├── page.js                   # Screen 1: Homepage (Hero, Categories, Featured, CTA)
│   ├── globals.css               # Design system tokens, custom properties, and scroll rules
│   ├── colleges/
│   │   ├── page.js               # Screen 2: College Catalog (Search, Multi-Filter, Sorting, Load More)
│   │   └── [slug]/
│   │       ├── page.js           # Screen 3: College Detail Page (SSG + Dynamic SEO generateMetadata)
│   │       ├── DetailWishlistButton.js # Client toggle button with instant feedback
│   │       └── EnquiryModal.js   # Interactive brochure & inquiry form
│   └── wishlist/
│       └── page.js               # Screen 4: Personal Shortlist Page (LocalStorage sync, empty state)
├── components/
│   ├── Header.js                 # Sticky navigation, brand logo, mobile drawer, live counter
│   ├── Footer.js                 # 4-column footer with brand info, directory links & copyright
│   ├── CollegeCard.js            # Reusable 16:9 card with heart toggle, rating badge & details link
│   ├── EmptyState.js             # Reusable empty feedback with 1-click filter reset
│   └── SmoothScrollProvider.js   # Momentum smooth-scrolling engine (Lenis + GSAP)
├── context/
│   └── WishlistContext.js        # Global React Context with LocalStorage sync & toast notifications
├── data/
│   └── colleges.json             # 12 detailed university records with realistic fields, fees & courses
├── lib/
│   └── colleges.js               # Pure querying, filtering, and sorting helper algorithms
├── verify-dataset.js             # Automated data validator script
└── README.md                     # Project documentation
```

---

## 6. Installation & Local Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/your-username/educompass-college-discovery.git
cd educompass-college-discovery/college-finder
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 7. Known Limitations & Future Enhancements

- **User Authentication:** Sign In and Get Started triggers currently display informative modal alerts; future iterations will connect NextAuth / Supabase for cloud account synchronization.
- **Dataset Scale:** The platform currently runs on a verified 12-institution sample dataset; a production version would integrate a PostgreSQL/Prisma backend or external educational API with full pagination.
- **Comparison Table:** Side-by-side comparison matrix for shortlisted colleges will be added in version 2.0.
