import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("../webmcp.html", import.meta.url), "utf8");
const names = [
  "list_support_options",
  "analyze_support_case",
  "explain_support_option",
  "compare_support_options",
  "load_demo_case",
  "prepare_next_step_checklist",
];

assert.match(html, /<meta\s+name="viewport"\s+content="width=device-width,\s*initial-scale=1"/i);
assert.match(html, /@media\s*\(/, "No responsive CSS breakpoint");
assert.match(html, /WebMCP unavailable in this browser/, "Human fallback missing");
assert.match(html, /Illustrative prototype only; verify official criteria before acting\./);
assert.match(html, /document\.modelContext\.registerTool\(t\)/);

const toolNames = [...html.matchAll(/\bname:'([a-z_]+)'\s*,title:/g)].map((m) => m[1]);
assert.deepEqual(toolNames, names, "Exact six tool contracts must be retained");
for (const key of ["inputSchema", "annotations", "readOnlyHint", "required"]) {
  assert.ok(html.includes(key), `Missing WebMCP schema attribute: ${key}`);
}
const script = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
  .map((m) => m[1]).filter(Boolean);
assert.equal(script.length, 1, "One self-contained inline app script expected");
new vm.Script(script[0], { filename: "webmcp.inline.js" });

console.log("PASS: responsive viewport, browser fallback, six names, schemas and script syntax");
console.log("NOTE: native WebMCP registration/execution requires a browser with the relevant API enabled.");
