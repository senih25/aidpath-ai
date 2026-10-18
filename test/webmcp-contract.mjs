import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

// Synthetic, offline test of AidPath's *own* in-page WebMCP API contract.
// Native Chrome WebMCP support and real mobile accessibility require separate browser QA.
const html = await readFile(new URL("../webmcp.html", import.meta.url), "utf8");
assert.match(html, /<meta\s+name="viewport"\s+content="width=device-width,initial-scale=1">/);
assert.match(html, /@media\(max-width:860px\)/);
assert.match(html, /@media\(max-width:560px\)/);
const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script, "Inline WebMCP script missing");
const registered = new Map();
const elements = new Map();
const makeNode = () => ({
  value: "", checked: false, textContent: "", innerHTML: "",
  className: "", children: [],
  classList: { add() {}, remove() {} },
  addEventListener() {}, appendChild(child) { this.children.push(child); },
  prepend(child) { this.children.unshift(child); },
});
const element = (id) => {
  if (!elements.has(id)) elements.set(id, makeNode());
  return elements.get(id);
};
const document = {
  modelContext: { async registerTool(tool) {
    assert.ok(!registered.has(tool.name), "Duplicate tool registration");
    registered.set(tool.name, tool);
  }},
  getElementById: element,
  createElement: makeNode,
  querySelectorAll: () => [],
};
const window = {};
vm.runInNewContext(script, { document, window, console, Date, setTimeout, clearTimeout }, { timeout: 1500 });
await new Promise(setImmediate);

const names = [
  "list_support_options",
  "analyze_support_case",
  "explain_support_option",
  "compare_support_options",
  "load_demo_case",
  "prepare_next_step_checklist",
];
assert.deepEqual([...registered.keys()].sort(), names.slice().sort());
for (const name of names) {
  const tool = registered.get(name);
  assert.equal(tool.inputSchema?.type, "object", name + ": missing typed input schema");
  assert.equal(typeof tool.execute, "function", name + ": not callable");
  assert.equal(typeof tool.annotations?.readOnlyHint, "boolean", name + ": missing read-only annotation");
}
const sample = {
  need: "Synthetic student with unstable income and housing pressure.",
  age: 22, income: "low", student: true, housing: true, documents: false,
};
const listed = JSON.parse(await registered.get("list_support_options").execute({ category: "education" }));
assert.ok(listed.some((x) => x.id === "student_bridge"));
const loaded = await registered.get("load_demo_case").execute({ scenario: "student" });
assert.match(loaded, /Loaded student demo case/);
const analyzed = JSON.parse(await registered.get("analyze_support_case").execute(sample));
assert.equal(analyzed.ranked_options[0].id, "student_bridge");
assert.equal(analyzed.ranked_options[0].score, 3);
const explained = JSON.parse(await registered.get("explain_support_option").execute({ program_id: "housing_relief", profile: sample }));
assert.equal(explained.id, "housing_relief");
assert.ok(explained.missing.includes("Core documents ready"));
const compared = JSON.parse(await registered.get("compare_support_options").execute({
  program_ids: ["student_bridge", "housing_relief"], profile: sample,
}));
assert.deepEqual(compared.map((x) => x.id), ["student_bridge", "housing_relief"]);
const checklist = JSON.parse(await registered.get("prepare_next_step_checklist").execute({
  program_id: "housing_relief", profile: sample,
}));
assert.ok(checklist.checklist.some((x) => /documents/i.test(x)));
assert.match(checklist.disclaimer, /Illustrative prototype only/);
assert.match(element("webmcpStatus").textContent, /6 tools/);
assert.ok(element("activityLog").children.length > 0);
console.log("PASS: six in-page WebMCP registrations, synthetic calls, schemas, checklist, responsive CSS markers");
