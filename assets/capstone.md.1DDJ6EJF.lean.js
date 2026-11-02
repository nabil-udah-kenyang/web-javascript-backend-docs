import { _ as _export_sfc, C as resolveComponent, o as openBlock, c as createElementBlock, a4 as createStaticVNode, E as createVNode } from "./chunks/framework.HgOL68BE.js";
const __pageData = JSON.parse('{"title":"08 · Mini project dan checkpoint akhir","description":"","frontmatter":{},"headers":[],"relativePath":"capstone.md","filePath":"capstone.md","lastUpdated":1793594755000}');
const _sfc_main = { name: "capstone.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CheckpointChecklist = resolveComponent("CheckpointChecklist");
  return openBlock(), createElementBlock("div", null, [
    _cache[0] || (_cache[0] = createStaticVNode("", 29)),
    createVNode(_component_CheckpointChecklist, {
      id: "stage-08-checkpoint-akhir",
      title: "Checkpoint akhir roadmap",
      description: "Ini ringkasan besar sebelum kamu mulai Node.js Fundamental dan Express.js.",
      items: [
        "Memahami tipe data, operator, control flow, string, array, dan object.",
        "Memahami function, callback, scope, hoisting, closure, this, class, dan error handling.",
        "Memahami destructuring, spread, import/export, ESM, dan CommonJS.",
        "Memahami Promise, async/await, event loop, error asynchronous, dan API JSON.",
        "Memahami type inference, annotation, union, narrowing, generic, dan utility types.",
        "Memahami tsconfig, type declaration, async typing, validasi runtime, dan konteks Express."
      ]
    }),
    _cache[1] || (_cache[1] = createStaticVNode("", 10))
  ]);
}
const capstone = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  capstone as default
};
