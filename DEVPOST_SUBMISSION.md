# AidPath AI

**Tagline:** Explainable AI that turns confusing support rules into a clear next step — without sending sensitive inputs to a server.

## Inspiration

People seeking social assistance often have to interpret long eligibility rules at the exact moment they have the least time and attention to spare. AI can simplify language, but using an opaque model as the final eligibility decision-maker creates a new trust problem.

AidPath AI explores a safer pattern: use machine learning for what it is good at — interpreting free text — and explicit rules for what must remain auditable.

## What it does

A user describes what kind of help they need and provides a few broad, non-identifying facts. AidPath AI then:

1. classifies the free-text need locally in the browser;
2. shows the model’s category probabilities;
3. evaluates transparent illustrative support-program conditions;
4. ranks relevant options;
5. shows every matched and missing requirement.

The current demo covers housing, education, employment, health/access, caregiving, and food-support scenarios.

## How we built it

The application is a zero-dependency static web app built with HTML, CSS, and JavaScript.

The ML layer is a Multinomial Naive Bayes text classifier implemented directly in the browser with tokenization, Laplace smoothing, log-probability scoring, and normalized class probabilities. The training examples are visible in the source.

The decision layer is separate: each illustrative support program contains named deterministic conditions. Model confidence never satisfies or overrides a condition; it is used only as an interpretation/ranking signal.

The entire application runs client-side on GitHub Pages. There is no backend, external model API, analytics SDK, login, or application-created persistence.

## Challenges we ran into

The main design challenge was not maximizing model complexity; it was defining where AI should stop. Eligibility-like workflows need transparency, predictable behavior, and a way for users to understand why a result appeared. That led to the two-layer architecture and the explicit matched/missing-condition UI.

We also optimized the prototype for reproducibility: zero runtime dependencies, a public repository, deterministic rules, and no API credentials needed to test the project.

## Accomplishments that we're proud of

- A real ML classifier runs entirely on-device in the browser.
- No user-entered support-seeking data leaves the page.
- Every recommendation can be inspected condition by condition.
- The architecture separates probabilistic interpretation from deterministic decision logic.
- The application is responsive and publicly deployable with zero secrets or runtime dependencies.
- Mobile Lighthouse audit: Accessibility 96, Best Practices 100, SEO 100, Agentic Browsing 100.

## What we learned

Responsible AI architecture can be more important than adding a larger model. In sensitive workflows, using a smaller transparent model plus an auditable rule layer can create a more trustworthy and reproducible product than a single generative black box.

## What's next

A production version would replace illustrative programs with verified official rules stored in a versioned policy schema. Each rule would include jurisdiction, official source URL, effective date, evidence requirements, and a human-reviewed change history. The core invariant would remain: **AI may interpret language; auditable rules decide.**

## Built with

HTML, CSS, JavaScript, Multinomial Naive Bayes, deterministic rule engine, GitHub Pages

## Links

- Live demo: https://senih25.github.io/aidpath-ai/
- Source: https://github.com/senih25/aidpath-ai