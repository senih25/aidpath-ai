# QA Evidence

Validated on the deployed GitHub Pages build on 2026-09-03.

## Functional checks

- Student renter preset loads structured facts correctly.
- Student scenario classifies primarily as housing and produces transparent program matches.
- Student Housing Bridge displays 4/5 matched conditions and the missing residency-document condition.
- Learning Access Grant displays 4/4 matched conditions in the student scenario.
- Caregiver preset updates inputs and classifies as caregiving.
- Caregiver Relief Support displays 4/4 matched conditions.
- Access & Mobility Fund displays 4/4 matched conditions in the caregiver/access scenario.
- No application JavaScript errors observed during interaction.

## Network/privacy check

The deployed application loads as a single document with no application API, analytics, model, stylesheet, or JavaScript network dependency. The only observed 404 was the browser's optional request for `/favicon.ico`; it does not affect application behavior.

## Responsive check

Verified at desktop 1440×900 and mobile 390×844 viewports. Primary workflow, form controls, result cards, decision-logic section, and privacy section remain accessible.

## Lighthouse — mobile

- Accessibility: **96**
- Best Practices: **100**
- SEO: **100**
- Agentic Browsing: **100**

## Reproducibility

No build step, package manager, API key, or external runtime dependency is required. Serve `index.html` from any static web server or open the deployed GitHub Pages URL.