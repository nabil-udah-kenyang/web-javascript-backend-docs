import { _ as _export_sfc, C as resolveComponent, o as openBlock, c as createElementBlock, a4 as createStaticVNode, E as createVNode, j as createBaseVNode, a as createTextVNode } from "./chunks/framework.HgOL68BE.js";
const __pageData = JSON.parse('{"title":"03 · Modern JavaScript dan module system","description":"","frontmatter":{},"headers":[],"relativePath":"modules.md","filePath":"modules.md","lastUpdated":1793594755000}');
const _sfc_main = { name: "modules.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CheckpointChecklist = resolveComponent("CheckpointChecklist");
  return openBlock(), createElementBlock("div", null, [
    _cache[0] || (_cache[0] = createStaticVNode("", 45)),
    createVNode(_component_CheckpointChecklist, {
      id: "stage-03-modules",
      title: "Siap memecah kode menjadi module?",
      description: "Coba baca ulang project kecilmu dan pastikan dependency antar-file terasa jelas.",
      items: [
        "Memahami manfaat destructuring, spread, default value, dan immutability.",
        "Bisa membuat named export dan default export.",
        "Bisa menggunakan import alias dan re-export.",
        "Memahami perbedaan ESM dan CommonJS.",
        "Bisa membaca package.json dan membedakan dependency dengan devDependency."
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
          href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
          target: "_blank",
          rel: "noreferrer"
        }, "MDN — JavaScript Modules")
      ]),
      createBaseVNode("li", null, [
        createBaseVNode("a", {
          href: "https://nodejs.org/api/esm.html",
          target: "_blank",
          rel: "noreferrer"
        }, "Node.js — ECMAScript Modules")
      ])
    ], -1))
  ]);
}
const modules = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  modules as default
};
