import { _ as _export_sfc, C as resolveComponent, o as openBlock, c as createElementBlock, a4 as createStaticVNode, E as createVNode, j as createBaseVNode, a as createTextVNode } from "./chunks/framework.HgOL68BE.js";
const __pageData = JSON.parse('{"title":"05 · JavaScript yang relevan untuk Node.js","description":"","frontmatter":{},"headers":[],"relativePath":"node-runtime.md","filePath":"node-runtime.md","lastUpdated":1793594755000}');
const _sfc_main = { name: "node-runtime.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CheckpointChecklist = resolveComponent("CheckpointChecklist");
  return openBlock(), createElementBlock("div", null, [
    _cache[0] || (_cache[0] = createStaticVNode("", 40)),
    createVNode(_component_CheckpointChecklist, {
      id: "stage-05-node-runtime",
      title: "Siap membawa JavaScript ke Node.js?",
      description: "Checkpoint ini memastikan kamu memahami runtime yang akan menjalankan backend-mu.",
      items: [
        "Bisa membedakan API browser dan API bawaan Node.js.",
        "Memahami process.env, process.argv, dan validasi environment variable.",
        "Bisa membaca dan menulis file secara asynchronous dengan fs/promises.",
        "Memahami path, Buffer, EventEmitter, dan dasar HTTP request/response.",
        "Bisa menjelaskan perbedaan concurrency, parallelism, dan non-blocking I/O."
      ]
    }),
    _cache[1] || (_cache[1] = createBaseVNode("h2", {
      id: "referensi-bab",
      tabindex: "-1"
    }, [
      createTextVNode("Referensi bab "),
      createBaseVNode("a", {
        class: "header-anchor",
        href: "#referensi-bab",
        "aria-label": 'Permalink to "Referensi bab"'
      }, "​")
    ], -1)),
    _cache[2] || (_cache[2] = createBaseVNode("ul", null, [
      createBaseVNode("li", null, [
        createBaseVNode("a", {
          href: "https://nodejs.org/learn",
          target: "_blank",
          rel: "noreferrer"
        }, "Node.js Learn")
      ]),
      createBaseVNode("li", null, [
        createBaseVNode("a", {
          href: "https://nodejs.org/api/",
          target: "_blank",
          rel: "noreferrer"
        }, "Node.js API Documentation")
      ])
    ], -1))
  ]);
}
const nodeRuntime = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  nodeRuntime as default
};
