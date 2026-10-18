import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

// Offline simulation of the browser's WebMCP imperative surface.
// Only repository HTML is evaluated. No network APIs, storage, real profiles,
// external AI providers, actual browser registration or personal data.
const html = readFileSync(new URL("../webmcp.html", import.meta.url), "utf8");
assert.match(html, /<meta\s+name="viewport"\s+content="width=device-width,initial-scale=1">/);
const breakpoints = [...html.matchAll(/@media\s*\(\s*max-width:\s*(\d{2,4})px\s*\)/gi)].map((match) => Number(match[1]));
assert.ok(breakpoints.some((size) => size <= 600), "Mobile CSS breakpoint missing");
assert.ok(breakpoints.some((size) => size >= 760), "Tablet/mobile layout breakpoint missing");
assert.match(html, /WebMCP unavailable in this browser/, "Accessible fallback status missing");
assert.match(html, /Illustrative prototype only; verify official criteria before acting\./,
  "Non-official prototype disclaimer missing");
const snippet = html.match(/<script>([\s\S]*?)<\/script>/i)?.[1];
assert.ok(snippet, "Expected the single inline WebMCP script");

const nodes = new Map();
function fakeElement() {
  return {
    textContent: "", innerHTML: "", value: "", checked: false, className: "",
    classList: { add() {}, remove() {} },
    addEventListener() {}, appendChild() {}, prepend() {},
  };
}
const element = (id) => {
  if (!nodes.has(id)) nodes.set(id, fakeElement());
  return nodes.get(id);
};
const registered = [];
const mockDocument = {
  getElementById: element,
  createElement: fakeElement,
  querySelectorAll: () => [],
  modelContext: {
    registerTool: async (tool) => {
      if (registered.some((x) => x.name === tool.name)) throw new Error("Duplicate tool");
      registered.push(tool);
    },
  },
};
const windowMock = {};
runInNewContext(snippet, {
  document: mockDocument, window: windowMock,
  console: { log() {}, error(error) { throw error; } },
}, { timeout: 2500 });
await new Promise((resolve) => setImmediate(resolve));

const expected = [
  "list_support_options", "analyze_support_case", "explain_support_option",
  "compare_support_options", "load_demo_case", "prepare_next_step_checklist",
];
assert.deepEqual(registered.map((tool) => tool.name), expected, "Six WebMCP tools must be registered in order");
const map = new Map(registered.map((tool) => [tool.name, tool]));
for (const tool of registered) {
  assert.equal(tool.inputSchema?.type, "object");
  assert.ok(tool.inputSchema?.properties && typeof tool.execute === "function");
  assert.equal(typeof tool.annotations?.readOnlyHint, "boolean");
  assert.ok(tool.title?.length > 3 && tool.description?.length > 10);
}
for (const name of ["list_support_options", "explain_support_option", "compare_support_options"]) {
  assert.equal(map.get(name).annotations.readOnlyHint, true);
}
for (const name of ["analyze_support_case", "load_demo_case", "prepare_next_step_checklist"]) {
  assert.equal(map.get(name).annotations.readOnlyHint, false);
}

const education = JSON.parse(await map.get("list_support_options").execute({ category: "education" }));
assert.ok(education.length >= 2 && education.every((row) => row.category === "education"));
const demo = windowMock.__aidpath.DEMOS.student; // Synthetic fixture, not user-provided.
const analysis = JSON.parse(await map.get("analyze_support_case").execute(demo));
assert.equal(analysis.ranked_options[0].id, "student_bridge");
assert.equal(analysis.ranked_options[0].score, 3);
assert.equal(analysis.ranked_options[0].total, 3);
const housing = JSON.parse(await map.get("explain_support_option").execute({
  program_id: "housing_relief", profile: demo,
}));
assert.equal(housing.score, 2);
assert.ok(housing.missing.includes("Core documents ready"));
const comparison = JSON.parse(await map.get("compare_support_options").execute({
  program_ids: ["housing_relief", "student_bridge"], profile: demo,
}));
assert.equal(comparison[0].id, "student_bridge");
assert.match(await map.get("load_demo_case").execute({ scenario: "student" }), /Loaded student demo case/);
const checklist = JSON.parse(await map.get("prepare_next_step_checklist").execute({
  program_id: "housing_relief", profile: demo,
}));
assert.ok(checklist.checklist.some((line) => line.includes("Core documents ready")));
assert.match(checklist.disclaimer, /Illustrative prototype/);
assert.ok(element("activityLog"), "Human-visible audit log should exist");
console.log("PASS: all six real WebMCP registration/execute callbacks, schemas, access hints, synthetic results, visible updates, and mobile breakpoint");
