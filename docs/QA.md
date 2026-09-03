# QA Evidence

Validated on the deployed WebMCP challenge build on 2026-09-03.

## Native Chrome WebMCP acceptance

Environment: Windows 10/11, Chrome 151, secure GitHub Pages origin, `chrome://flags/#enable-webmcp-testing` set to **Enabled** and Chrome relaunched.

- `document.modelContext.registerTool` is available: **PASS**
- Page status reports `WebMCP active · 6 tools`: **PASS**
- `await document.modelContext.getTools()` discovers all six registered tools: **6/6 PASS**
- Native `document.modelContext.executeTool(...)` execution: **6/6 PASS**

Executed tools:

1. `list_support_options` — PASS
2. `load_demo_case` — PASS
3. `analyze_support_case` — PASS
4. `explain_support_option` — PASS
5. `compare_support_options` — PASS
6. `prepare_next_step_checklist` — PASS

## Deterministic student-case result

Acceptance profile:

- age: 22
- income: low
- student: true
- housing pressure: true
- documents ready: false

Observed result through native WebMCP execution:

- intent signal: `housing`
- top option: **Student Stability Bridge**
- top deterministic match: **3/3**
- **Housing Stability Support**: **2/3**, with `Core documents ready` as the explicit missing condition
- comparison ranks `student_bridge` ahead of `housing_relief`
- checklist output: `Verify or provide: Core documents ready`

The visible workbench updated after agent execution and the activity log recorded registration, demo loading, analysis, and checklist activity.

## Tool-contract checks

- Every tool exposes a typed JSON Schema.
- Discovery, explanation, and comparison operations use `readOnlyHint: true`.
- Tools that intentionally update visible state use `readOnlyHint: false`.
- Tool results come from the same deterministic JavaScript rule engine used by the human UI.
- No tool grants the model authority to invent or override support rules.

## Browser fallback

When WebMCP is unavailable, the page remains usable as a normal human-facing website and reports that the WebMCP capability is unavailable. This is intentional progressive enhancement rather than a hard dependency.

## Privacy / runtime architecture

- Static HTML/CSS/JavaScript challenge app.
- No backend, account, database, API key, analytics integration, or persisted user profile.
- User-entered data remains in page memory and is cleared on refresh.
- Programs are explicitly illustrative; the prototype does not claim real-world eligibility.

## Reproduce the judge test

1. In Chrome, open `chrome://flags/#enable-webmcp-testing`.
2. Set **WebMCP for testing** to **Enabled** and relaunch Chrome.
3. Open `https://senih25.github.io/aidpath-ai/webmcp.html`.
4. Confirm the header reports `WebMCP active · 6 tools`.
5. Ask a WebMCP-capable agent to list options, load the `student` demo, analyze it, compare `student_bridge` with `housing_relief`, and prepare the housing checklist.
6. Confirm the deterministic results above and inspect the visible activity log.

For direct browser verification, `document.modelContext.getTools()` returns the six tool contracts and `document.modelContext.executeTool(tool, JSON.stringify(args))` executes the selected tool using Chrome's native WebMCP API.

## Result

**Challenge WebMCP acceptance: PASS — native discovery 6/6, native execution 6/6, visible human-agent state synchronization PASS.**
