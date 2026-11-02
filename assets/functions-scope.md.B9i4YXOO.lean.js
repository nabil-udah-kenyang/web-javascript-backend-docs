import { _ as _export_sfc, C as resolveComponent, o as openBlock, c as createElementBlock, a4 as createStaticVNode, E as createVNode } from "./chunks/framework.HgOL68BE.js";
const __pageData = JSON.parse('{"title":"02 · Function, scope, dan cara kerja JavaScript","description":"","frontmatter":{},"headers":[],"relativePath":"functions-scope.md","filePath":"functions-scope.md","lastUpdated":1793594755000}');
const _sfc_main = { name: "functions-scope.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CheckpointChecklist = resolveComponent("CheckpointChecklist");
  return openBlock(), createElementBlock("div", null, [
    _cache[0] || (_cache[0] = createStaticVNode("", 47)),
    createVNode(_component_CheckpointChecklist, {
      id: "stage-02-functions-scope",
      title: "Function dan scope sudah cukup jelas?",
      description: "Gunakan checklist ini setelah latihan function factory, closure, dan custom error selesai.",
      items: [
        "Bisa membedakan function declaration, expression, arrow function, parameter, dan argument.",
        "Memahami callback, higher-order function, dan konsep pure function.",
        "Bisa menjelaskan scope chain, hoisting, dan Temporal Dead Zone.",
        "Memahami closure dan dapat membuat function factory sederhana.",
        "Memahami this, prototype, class, dan cara menangani error dengan try/catch."
      ]
    }),
    _cache[1] || (_cache[1] = createStaticVNode("", 2))
  ]);
}
const functionsScope = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  functionsScope as default
};
