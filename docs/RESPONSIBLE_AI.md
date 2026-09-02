# Responsible AI & Privacy

AidPath AI is a hackathon prototype for demonstrating a safer pattern for AI-assisted support navigation. The sample programs are fictional/illustrative and must not be interpreted as official eligibility determinations.

## Safety invariants

1. **AI interprets; rules decide.** Model confidence is never used to waive or satisfy a policy condition.
2. **Explain every result.** The interface shows passed and missing conditions instead of a single opaque score.
3. **Minimize data.** The prototype asks only for broad facts needed by the illustrative rules.
4. **Keep inputs local.** User text and selections remain in the browser; no external AI service receives them.
5. **No persistent profile.** The app creates no user account and does not persist form data.
6. **No authoritative claims.** Program names and criteria are examples used to demonstrate the architecture.
7. **Human review before production.** Real policy rules would require verified official sources, versioning, change review, and jurisdiction-specific validation.

## Failure modes considered

- Ambiguous free text can be misclassified: show category probability and allow users to change structured facts.
- A rule may be incomplete or stale: keep rule logic readable and attach version/source metadata in a production implementation.
- Users may over-trust an AI recommendation: label all prototype results as illustrative and expose reasons/missing conditions.
- Sensitive support-seeking behavior may reveal personal circumstances: avoid server/API transmission entirely in the prototype.

## What the prototype does not do

It does not provide legal, financial, medical, or government advice; verify real-world program eligibility; make automated high-impact decisions; or store personal records.