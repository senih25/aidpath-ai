# AidPath AI

**Privacy-first, explainable support navigation for people facing complex eligibility rules.**

Built from scratch for **ML Empowerment Build Challenge 3.0 (2026)**.

## Problem

Social-support systems are difficult to navigate. People often need to understand what kind of support is relevant, which conditions already match, and what is still missing before they can take the next step.

Generic AI chatbots can help with language, but opaque model outputs are a poor fit for eligibility decisions. AidPath AI deliberately separates **interpretation** from **decision logic**.

## Solution

AidPath AI is a fully client-side prototype with two layers:

- **On-device ML intent classification** — a Multinomial Naive Bayes model classifies free-text needs into housing, education, employment, health/access, caregiving, or food.
- **Deterministic policy matching** — explicit JavaScript rules evaluate illustrative support programs. The model never decides eligibility.

Every recommendation shows matched and missing conditions.

## Responsible AI design

- No account required.
- No form input is transmitted to a server or model API.
- No personal data is stored after refresh.
- ML confidence is visible but never used as an eligibility threshold.
- Rules and training examples are inspectable in the repository.
- Sample programs are explicitly illustrative, not official legal or financial advice.

## Technical implementation

- Vanilla HTML/CSS/JavaScript — zero runtime dependencies.
- Multinomial Naive Bayes implemented in the browser.
- Laplace smoothing and normalized class probabilities.
- Transparent rule engine with matched/missing-condition explanations.
- Responsive, keyboard-friendly interface.

## Demo scenarios

Use the preset buttons for **Student renter**, **Caregiver**, or **Job seeker**, or enter a free-text situation.

## Run locally

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Product path

A production version can ingest verified official program rules through a versioned policy schema, attach source URLs and effective dates, and use human review for rule updates. The core safety invariant stays the same: **AI may interpret language; auditable rules decide.**

## Hackathon judging alignment

- **Technical Implementation (30%)**: on-device ML classifier + explainable rule engine.
- **Creativity & Innovation (20%)**: hybrid AI architecture that avoids black-box eligibility decisions.
- **Real-World Impact (20%)**: reduces navigation friction for people seeking assistance.
- **Design & UX (15%)**: clear workflow focused on next actions and reasons.
- **Presentation & Documentation (15%)**: public architecture, safety rationale, demo scenarios, and implementation notes.

## License

MIT.