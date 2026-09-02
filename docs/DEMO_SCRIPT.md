# AidPath Agent Bridge — WebMCP Challenge demo

**Target runtime:** 2:20–2:40  
**Language:** English  
**Format:** public YouTube video with audio

## 0:00–0:20 — Problem and thesis

**Screen:** Open the live `webmcp.html` hero.

**Narration:**
“Hi, this is AidPath Agent Bridge. Rule-heavy public-service websites are difficult not only for people, but also for AI agents. Without a capability layer, an agent has to scrape rendered text, infer form semantics, and automate brittle clicks. AidPath uses WebMCP so humans keep control while agents get reliable tools.”

## 0:20–0:45 — Architecture

**Screen:** Show the agent capability card, then the ‘Why WebMCP changes the experience’ section.

**Narration:**
“The product has three boundaries. A small local classifier interprets free text. Explicit deterministic rules evaluate the illustrative support conditions. WebMCP is only the orchestration layer. The LLM never invents or overrides an eligibility condition, and there is no backend or stored profile.”

## 0:45–1:10 — Show the WebMCP surface

**Screen:** Show the six-tool section and, if running in a WebMCP-enabled browser, the `WebMCP active · 6 tools` badge.

**Narration:**
“In a WebMCP-enabled browser, the page registers six tools using `document.modelContext.registerTool`: list options, analyze a case, explain one option, compare options, load a safe demo case, and prepare a next-step checklist. Each tool has a typed JSON Schema, and read-only operations are explicitly annotated.”

## 1:10–1:40 — Human + agent student scenario

**Screen:** Load the **Student renter** case and show the analysis panel.

**Narration:**
“Here is a student renter with unstable income and housing pressure. The same case can be entered by the human or staged by an agent. The shared deterministic engine ranks Student Stability Bridge first with all three demo conditions matched. The result is visible so the person can inspect or correct the facts.”

## 1:40–2:05 — Compare + checklist

**Screen:** Demonstrate `compare_support_options` for `student_bridge` and `housing_relief`, then `prepare_next_step_checklist` for housing support. Keep the visible activity log in frame.

**Narration:**
“Now the agent compares two options without scraping result cards. Housing Stability Support is missing one condition: core documents ready. The checklist tool turns that explicit gap into a next step, and the execution is recorded in the human-visible activity log.”

## 2:05–2:30 — Why it matters / close

**Screen:** Return to the ‘Stop scraping. Start collaborating.’ message and repository link.

**Narration:**
“That is the WebMCP advantage: the website exposes stable domain capabilities while preserving human review and deterministic decision logic. The current programs are illustrative only. A production version can attach verified official sources, effective dates, versioned rules, and human approval. AidPath Agent Bridge: stop scraping, start collaborating.”

## Recording checklist

- Keep total runtime under **3:00**.
- Include audible narration for the whole story.
- Record the public HTTPS deployment, not localhost.
- If possible, use ChatGPT in-app browser or Chrome with WebMCP testing enabled so the actual six-tool capability is visible.
- Do not imply the illustrative programs are real government benefits.
- Keep the public GitHub repository visible briefly at the end.
- YouTube visibility must be **Public** or otherwise publicly viewable without sign-in, as required by the challenge.
