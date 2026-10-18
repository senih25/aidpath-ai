import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("../webmcp.html", import.meta.url), "utf8");
assert.match(html, /<meta[^>]+name=["']viewport["']/i);
assert.match(html, /@media\s*\(max-width:\s*560px\)/);
assert.match(html, /illustrative/i);

const blocks = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
assert.equal(blocks.length, 1, "expected one self-contained demo script");
const registry = new Map();
const errors = [];
const elements = new Map();
function el(id = "") {
  return {
    id, value: "", checked: false, textContent: "", innerHTML: "",
    dataset: {}, style: {},
    classList: { add() {}, remove() {}, toggle() {} },
    addEventListener() {}, appendChild() {}, prepend() {}, setAttribute() {}
  };
}
const document = {
  getElementById(id) {
    if (!elements.has(id)) elements.set(id, el(id));
    return elements.get(id);
  },
  querySelectorAll() { return []; },
  createElement() { return el(); },
  modelContext: {
    async registerTool(config) {
      assert.ok(config && typeof config.execute === "function");
      assert.ok(!registry.has(config.name), "duplicate WebMCP name");
      registry.set(config.name, config);
    }
  }
};
// Never provide a network client or a real browser profile to this VM.
vm.runInNewContext(blocks[0][1], {
  document, window: {}, console: { error: (...args) => errors.push(args.map(String).join(" ")) }
}, { timeout: 4000, filename: "aidpath-webmcp.html" });
for (let i = 0; i < 12; i++) await Promise.resolve();
assert.deepEqual(errors, [], "registration errors");
const names = [
  "list_support_options", "analyze_support_case", "explain_support_option",
  "compare_support_options", "load_demo_case", "prepare_next_step_checklist"
];
assert.equal(registry.size, 6, "expected six public WebMCP capabilities");
const mutable = new Set(["analyze_support_case", "load_demo_case", "prepare_next_step_checklist"]);
for (const name of names) {
  const tool = registry.get(name);
  assert.ok(tool, "missing " + name);
  assert.equal(tool.inputSchema.type, "object");
  assert.ok(tool.description && tool.title);
  assert.equal(tool.annotations?.readOnlyHint, !mutable.has(name), name);
  assert.ok(Array.isArray(tool.inputSchema.required));
}
const programs = JSON.parse(await registry.get("list_support_options").execute({ category: "education" }));
assert.ok(programs.length > 0);
assert.ok(programs.every(p => p.category === "education"));
const profile = {
  need: "I am a student seeking support with rent.", age: 22, income: "low",
  student: true, housing: true, documents: false
};
const result = JSON.parse(await registry.get("analyze_support_case").execute(profile));
assert.ok(result.ranked_options.length >= 2, "deterministic options missing");
const explained = JSON.parse(await registry.get("explain_support_option").execute({
  program_id: "student_bridge", profile
}));
assert.equal(explained.id, "student_bridge");
const compared = JSON.parse(await registry.get("compare_support_options").execute({
  program_ids: ["student_bridge", "housing_relief"], profile
}));
assert.equal(compared.length, 2);
const demo = await registry.get("load_demo_case").execute({ scenario: "student" });
assert.match(demo, /Loaded student demo case/);
const checklist = JSON.parse(await registry.get("prepare_next_step_checklist").execute({
  program_id: "housing_relief", profile
}));
assert.ok(checklist.checklist.length >= 1);
assert.match(checklist.disclaimer, /Illustrative prototype only/);
console.log("G10 PASS: six mocked WebMCP tools, schema hints, deterministic flows and mobile viewport");
