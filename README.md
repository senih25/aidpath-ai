# AidPath Agent Bridge

**A WebMCP-native, privacy-first support navigator where humans keep control and agents use structured, auditable tools instead of scraping the UI.**

> OpenAI WebMCP Challenge submission build. The original AidPath UI prototype was created on September 2, 2026, inside the WebMCP Challenge submission period. The WebMCP-native Agent Bridge extension was added on September 3, 2026. Commit history provides the timestamped evidence.

## Live challenge app

The challenge entry point is `webmcp.html`. It is a standalone static application that can be hosted on any HTTPS static host, including GitHub Pages.

## Why WebMCP

Public-service and benefits websites often contain complex forms and rule-heavy flows. A generic browser agent has to infer labels, scrape rendered text, click controls, and hope the interface has not changed. AidPath publishes explicit capabilities instead.

The human remains in control of facts and visible outcomes. A WebMCP-aware agent can discover typed tools, call the same deterministic rule engine used by the UI, and return auditable matched/missing conditions.

## WebMCP tools

The application registers six Imperative API tools with `document.modelContext.registerTool(...)`:

1. `list_support_options` — discover the available illustrative programs without scraping cards.
2. `analyze_support_case` — classify a need, evaluate deterministic rules, rank options, and update the visible workbench.
3. `explain_support_option` — explain matched and missing conditions for one option.
4. `compare_support_options` — compare selected options against one profile.
5. `load_demo_case` — stage a safe sample case in the human interface for review/editing.
6. `prepare_next_step_checklist` — create a human-visible checklist from missing conditions.

Read-only tools use `readOnlyHint: true`; tools that update visible page state use `readOnlyHint: false`.

## Safety and responsible design

- No backend, account, or database.
- No user input is persisted after refresh.
- The model/agent does **not** decide eligibility.
- The same deterministic JavaScript rule engine powers both the human interface and WebMCP tools.
- Tool execution is logged in the visible UI.
- Programs and rules in this prototype are explicitly illustrative and are not legal, financial, benefits, or medical advice.
- A production version would ingest verified official rules with source URLs, effective dates, versioning, and human review.

## Human + agent demo flow

1. Open `webmcp.html` in ChatGPT's in-app browser or Chrome with WebMCP enabled.
2. Ask the agent to list the available support options.
3. Ask it to load the `student` demo case.
4. Ask it to analyze the case.
5. Ask it to compare `student_bridge` and `housing_relief`.
6. Ask it to prepare a next-step checklist for the top option.
7. Observe that every meaningful tool call updates the human-visible activity log or returns explicit evidence.

The app remains fully usable as a normal website when WebMCP is unavailable; the header reports capability status.

## Run locally

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080/webmcp.html
```

WebMCP itself requires a supporting browser context. For local Chrome testing, follow the current Chrome WebMCP documentation and enable the WebMCP testing flag/origin-trial mechanism as applicable.

## Challenge judging alignment

- **WebMCP Leverage:** six non-trivial typed tools sharing one deterministic domain engine.
- **Execution:** complete responsive human UI with WebMCP feature detection, fallbacks, visible results, and activity logging.
- **Potential Impact:** replaces fragile UI scraping in a high-friction, rule-heavy public-service navigation problem.
- **Creativity & Ambition:** separates agent orchestration from authoritative decision logic, allowing humans and agents to collaborate without giving the LLM authority to invent rules.

## Repository history / prior work disclosure

The initial AidPath prototype (`index.html`) was created September 2, 2026 for an ML-focused hackathon. It contained the local intent classifier and deterministic rule-engine concept but **no WebMCP integration**. The WebMCP Challenge work adds the dedicated `webmcp.html` agent-native experience, six registered WebMCP tools, human-visible tool activity, typed schemas, annotations, WebMCP feature detection, challenge documentation, and a repository license file.

This distinction is intentionally documented for compliance with the WebMCP Challenge rule covering pre-existing projects.

## License

MIT — see [`LICENSE`](LICENSE).
