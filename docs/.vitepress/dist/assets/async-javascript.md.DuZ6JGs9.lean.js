import { _ as _export_sfc, C as resolveComponent, o as openBlock, c as createElementBlock, a4 as createStaticVNode, E as createVNode } from "./chunks/framework.HgOL68BE.js";
const __pageData = JSON.parse('{"title":"04 · Asynchronous JavaScript","description":"","frontmatter":{},"headers":[],"relativePath":"async-javascript.md","filePath":"async-javascript.md","lastUpdated":1793594755000}');
const _sfc_main = { name: "async-javascript.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CheckpointChecklist = resolveComponent("CheckpointChecklist");
  return openBlock(), createElementBlock("div", null, [
    _cache[0] || (_cache[0] = createStaticVNode("", 39)),
    createVNode(_component_CheckpointChecklist, {
      id: "stage-04-async-javascript",
      title: "Asynchronous JavaScript sudah tidak membingungkan?",
      description: "Jalankan contoh-contohnya sendiri sebelum mencentang bagian ini.",
      items: [
        "Bisa menjelaskan call stack, microtask queue, task queue, dan event loop secara dasar.",
        "Memahami callback dan alasan callback hell bisa terjadi.",
        "Bisa membuat, chaining, dan menangani rejection pada Promise.",
        "Tahu kapan memakai Promise.all, allSettled, race, dan any.",
        "Bisa memakai async/await, fetch, JSON, dan memeriksa response.ok."
      ]
    }),
    _cache[1] || (_cache[1] = createStaticVNode("", 2))
  ]);
}
const asyncJavascript = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  asyncJavascript as default
};
