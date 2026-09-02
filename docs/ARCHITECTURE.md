# AidPath AI — Architecture

## Design principle

AidPath AI deliberately separates language interpretation from eligibility logic.

```text
Free-text need
     |
     v
On-device Multinomial Naive Bayes
     |
     +--> intent probabilities (housing / education / employment / health / caregiving / food)
     |
     v
Minimal structured facts
     |
     v
Deterministic rule engine
     |
     +--> matched conditions
     +--> missing conditions
     +--> ranked illustrative support options
```

## Why this architecture

A generative model is useful for interpreting ambiguous language, but eligibility is a high-consequence decision surface. The prototype therefore keeps the final matching logic explicit and auditable.

### ML layer
- Multinomial Naive Bayes implemented directly in browser JavaScript.
- Small transparent training corpus embedded in source.
- Tokenization, Laplace smoothing, log-probability scoring, and normalized probabilities.
- Confidence is displayed as an interpretation signal only.

### Rule layer
Each illustrative program is a list of named boolean conditions. A result exposes every condition as matched or missing. The intent prediction can influence ranking but never converts a failed condition into a passed one.

### Privacy model
- Static application hosted on GitHub Pages.
- No backend endpoint.
- No analytics SDK.
- No model API.
- No cookies or local persistence created by the application.
- Refresh clears the entered scenario.

## Production extension

The same interface can support verified public-benefit programs by replacing demo rules with a versioned policy schema containing source URL, jurisdiction, effective date, evidence requirement, and human-reviewed change history. Official-source synchronization and human attestation would be required before any production eligibility use.