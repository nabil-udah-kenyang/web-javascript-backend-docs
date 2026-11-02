import { _ as _export_sfc, C as resolveComponent, o as openBlock, c as createElementBlock, a4 as createStaticVNode, E as createVNode, j as createBaseVNode, a as createTextVNode } from "./chunks/framework.HgOL68BE.js";
const __pageData = JSON.parse('{"title":"01 · JavaScript fundamental","description":"","frontmatter":{},"headers":[],"relativePath":"javascript-fundamental.md","filePath":"javascript-fundamental.md","lastUpdated":1793594755000}');
const _sfc_main = { name: "javascript-fundamental.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CheckpointChecklist = resolveComponent("CheckpointChecklist");
  return openBlock(), createElementBlock("div", null, [
    _cache[0] || (_cache[0] = createStaticVNode("", 58)),
    createVNode(_component_CheckpointChecklist, {
      id: "stage-01-javascript-fundamental",
      title: "JavaScript fundamental sudah cukup kuat?",
      description: "Centang setelah kamu bisa menjelaskan dan mempraktikkan poin-poin ini tanpa menyalin contoh.",
      items: [
        "Memahami tipe data, coercion, truthy/falsy, dan perbandingan ===.",
        "Bisa menggunakan control flow dan loop untuk menyelesaikan masalah sederhana.",
        "Bisa mengolah string, array, dan object dengan method yang tepat.",
        "Bisa memakai map, filter, find, some, every, dan reduce.",
        "Memahami perbedaan primitive value dan reference value."
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
          href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
          target: "_blank",
          rel: "noreferrer"
        }, "MDN JavaScript Guide")
      ]),
      createBaseVNode("li", null, [
        createBaseVNode("a", {
          href: "https://javascript.info/",
          target: "_blank",
          rel: "noreferrer"
        }, "JavaScript.info")
      ])
    ], -1))
  ]);
}
const javascriptFundamental = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  javascriptFundamental as default
};
