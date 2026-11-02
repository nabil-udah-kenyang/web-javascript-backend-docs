import { _ as _export_sfc, C as resolveComponent, o as openBlock, c as createElementBlock, a4 as createStaticVNode, E as createVNode } from "./chunks/framework.HgOL68BE.js";
const __pageData = JSON.parse('{"title":"07 · TypeScript untuk backend","description":"","frontmatter":{},"headers":[],"relativePath":"typescript-backend.md","filePath":"typescript-backend.md","lastUpdated":1793594755000}');
const _sfc_main = { name: "typescript-backend.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CheckpointChecklist = resolveComponent("CheckpointChecklist");
  return openBlock(), createElementBlock("div", null, [
    _cache[0] || (_cache[0] = createStaticVNode("", 44)),
    createVNode(_component_CheckpointChecklist, {
      id: "stage-07-typescript-backend",
      title: "Siap memakai TypeScript untuk backend?",
      description: "Bagian terpenting di sini adalah tahu batas TypeScript dan tetap memvalidasi data dari luar.",
      items: [
        "Bisa membuat type untuk entity, function, callback, status, dan response aplikasi.",
        "Bisa mengetik Promise<T>, async function, Promise.all, dan catch sebagai unknown.",
        "Memahami perbedaan static type checking dengan validasi runtime.",
        "Memahami opsi penting tsconfig seperti strict, module, target, dan moduleResolution.",
        "Bisa membaca gambaran typing Request, Response, middleware, dan controller Express."
      ]
    }),
    _cache[1] || (_cache[1] = createStaticVNode("", 2))
  ]);
}
const typescriptBackend = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  typescriptBackend as default
};
