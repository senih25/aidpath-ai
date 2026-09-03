# AidPath Agent Bridge

**Tagline:** Humans keep control. Agents get reliable tools.

## Inspiration

Web agents are powerful, but rule-heavy public-service websites expose an awkward interface to them: rendered labels, forms, changing layouts, and long eligibility-style descriptions. An agent can try to scrape the page and automate clicks, but that is brittle and difficult for a person to audit.

AidPath Agent Bridge explores a different web architecture. The same site remains fully usable by a human, while WebMCP publishes stable, typed domain capabilities to an agent. The agent orchestrates; it does not invent the rules.

## What it does

AidPath is a privacy-first support-navigation prototype. A person describes a need and shares only a few broad facts. A small local classifier interprets the free-text intent, while an explicit deterministic rule engine evaluates illustrative support options and exposes every matched and missing condition.

The WebMCP extension lets an agent work with that same engine through six structured tools:

1. `list_support_options`
2. `analyze_support_case`
3. `explain_support_option`
4. `compare_support_options`
5. `load_demo_case`
6. `prepare_next_step_checklist`

This means an agent does not need to infer field semantics or scrape result cards. It can ask the site itself for the supported capabilities and call them using typed JSON inputs.

## Why WebMCP is a strong fit

Without WebMCP, an agent has to reverse-engineer a human interface: locate controls, infer what each field means, scrape result text, and repeat those assumptions whenever the UI changes.

With WebMCP, AidPath exposes the *intent* of the product directly. The browser can discover tools with explicit descriptions and JSON Schemas. Read-only operations are annotated as read-only. Tool results come from the same deterministic functions used by the visible UI.

Most importantly, agent actions remain human-verifiable. Analysis updates the visible workbench and checklist actions appear in the on-screen activity log. WebMCP improves agent reliability without removing human oversight.

## How it creates a better user experience

A person can begin in either direction:

- **Human first:** fill the visible form, inspect results, and then ask an agent to compare or explain options.
- **Agent assisted:** ask the agent to load a safe demo or analyze structured facts, then inspect and correct the visible result before taking any real-world action.

The agent and human are no longer operating two separate workflows. They share one rule engine and one auditable state.

## What people and agents can do together that was difficult before

A person can retain control of sensitive facts while delegating repetitive reasoning tasks such as listing options, comparing alternatives, surfacing missing conditions, and preparing a next-step checklist. The agent receives structured evidence instead of guessing from pixels or DOM text, and the person sees the resulting state.

## How WebMCP was implemented

The challenge build uses the WebMCP Imperative API:

```js
await document.modelContext.registerTool({
  name: "analyze_support_case",
  description: "Analyze a structured support case using local interpretation and deterministic rules.",
  inputSchema: { /* typed JSON Schema */ },
  annotations: { readOnlyHint: false },
  execute: async (input) => { /* shared rule engine + visible UI update */ }
});
```

Six tools are registered. Read-only discovery/explanation/comparison tools use `readOnlyHint: true`; actions that intentionally stage or update visible state use `readOnlyHint: false`. The app feature-detects `document.modelContext`, so the normal human experience continues to work in browsers without WebMCP.

## Technical architecture

- Static HTML/CSS/JavaScript; no backend and no runtime secrets.
- Local free-text intent classifier.
- Deterministic and inspectable support-rule engine.
- Typed WebMCP tool layer over the same domain functions.
- Human-visible agent activity log.
- GitHub Pages HTTPS deployment.
- MIT licensed public repository.

## Responsible design

The model or agent never decides eligibility. The prototype programs are deliberately illustrative and are not legal, financial, benefits, medical, or government advice. A production version would replace them with verified official rule sources carrying jurisdiction, effective dates, version history, and human-reviewed updates.

No user-entered profile is persisted by the application after refresh.

## New work during the WebMCP Challenge

The initial AidPath prototype was created on September 2, 2026, during the WebMCP Challenge submission period. The dedicated WebMCP extension adds `webmcp.html`, six registered WebMCP tools, typed schemas and annotations, WebMCP feature detection, shared human/agent state, visible execution logging, challenge-specific documentation, and a public license. The Git commit history provides timestamped evidence.

## QA

The deployed HTTPS WebMCP build was validated on September 3, 2026 in Chrome 151 on Windows with `chrome://flags/#enable-webmcp-testing` enabled and Chrome relaunched.

- GitHub Pages deployment: **PASS**
- `document.modelContext.registerTool` available: **PASS**
- Native `document.modelContext.getTools()` discovery: **6/6 PASS**
- Native `document.modelContext.executeTool(...)` execution: **6/6 PASS**
- Executed tools: listing, demo load, analysis, explanation, comparison, checklist: **PASS**
- Deterministic student case: **Student Stability Bridge 3/3** top result: **PASS**
- Housing comparison: **Housing Stability Support 2/3**, missing `Core documents ready`: **PASS**
- Visible agent activity logging and UI synchronization: **PASS**
- No application JavaScript errors observed during native WebMCP acceptance: **PASS**
- Public unauthenticated repo access with MIT license visible: **PASS**
- Public unauthenticated live app access with native six-tool discovery/execution: **PASS**

Full reproduction steps and observed outputs are documented in [`docs/QA.md`](docs/QA.md).

## Built with

WebMCP Imperative API, HTML, CSS, JavaScript, local text classification, deterministic rule engine, GitHub Pages

## Links

- Live WebMCP demo: https://senih25.github.io/aidpath-ai/webmcp.html
- Public source: https://github.com/senih25/aidpath-ai
- License: https://github.com/senih25/aidpath-ai/blob/main/LICENSE
