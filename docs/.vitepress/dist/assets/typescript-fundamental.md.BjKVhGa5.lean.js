import { _ as _export_sfc, C as resolveComponent, o as openBlock, c as createElementBlock, a4 as createStaticVNode, E as createVNode } from "./chunks/framework.HgOL68BE.js";
const __pageData = JSON.parse('{"title":"06 · TypeScript fundamental","description":"","frontmatter":{},"headers":[],"relativePath":"typescript-fundamental.md","filePath":"typescript-fundamental.md","lastUpdated":1793594755000}');
const _sfc_main = { name: "typescript-fundamental.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CheckpointChecklist = resolveComponent("CheckpointChecklist");
  return openBlock(), createElementBlock("div", null, [
    _cache[0] || (_cache[0] = createStaticVNode("", 51)),
    createVNode(_component_CheckpointChecklist, {
      id: "stage-06-typescript-fundamental",
      title: "TypeScript fundamental sudah cukup kuat?",
      description: "Centang jika kamu bisa menjelaskan error tipe, bukan hanya menghilangkannya dengan assertion.",
      items: [
        "Memahami type inference, annotation, basic types, tuple, literal, any, dan unknown.",
        "Bisa mengetik parameter, return value, callback, optional parameter, dan function overload.",
        "Bisa membuat type alias, interface, optional property, readonly, dan nested object type.",
        "Memahami union, narrowing, discriminated union, type guard, dan risiko assertion.",
        "Bisa menggunakan generic, keyof, satisfies, serta utility types yang umum."
      ]
    }),
    _cache[1] || (_cache[1] = createStaticVNode("", 2))
  ]);
}
const typescriptFundamental = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  typescriptFundamental as default
};
