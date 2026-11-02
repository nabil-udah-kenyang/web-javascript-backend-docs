import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'id-ID',
  title: 'JS / TS Backend Notes',
  description: 'Catatan belajar JavaScript, TypeScript, dan fondasi backend Node.js.',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: '/mark.svg',
    siteTitle: 'JS / TS Backend Notes',
    nav: [
      { text: 'Mulai', link: '/guide/start' },
      { text: 'Roadmap', link: '/javascript-fundamental' },
      { text: 'Referensi', link: '/guide/references' }
    ],
    sidebar: {
      '/': [
        {
          text: 'Orientasi',
          items: [
            { text: 'Cara memakai handbook', link: '/guide/start' },
            { text: 'Peta perjalanan', link: '/guide/roadmap' },
            { text: 'Referensi pilihan', link: '/guide/references' }
          ]
        },
        {
          text: 'JavaScript',
          collapsed: false,
          items: [
            { text: '01 · Fundamental', link: '/javascript-fundamental' },
            { text: '02 · Function & scope', link: '/functions-scope' },
            { text: '03 · Modern JS & module', link: '/modules' },
            { text: '04 · Asynchronous JS', link: '/async-javascript' },
            { text: '05 · JS di Node.js', link: '/node-runtime' }
          ]
        },
        {
          text: 'TypeScript',
          collapsed: false,
          items: [
            { text: '06 · Fundamental', link: '/typescript-fundamental' },
            { text: '07 · Untuk backend', link: '/typescript-backend' }
          ]
        },
        {
          text: 'Praktik',
          items: [
            { text: '08 · Mini project & checkpoint', link: '/capstone' }
          ]
        }
      ]
    },
    outline: { level: [2, 3] },
    footer: {
      message: 'Belajar pelan, bangun sesuatu yang nyata.',
      copyright: 'Created by Naufal Nabil · 2026'
    },
    search: { provider: 'local' }
  },
  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  }
})
