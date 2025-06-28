import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "stat lord's Sheet Template",
  description: "Documentation for stat lord's tournament template sheets",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' }
    ],

    sidebar: [
        {text: 'Getting Started', link: '/getting-started'},
        {text: 'Admin Template', link: '/admin'},
        {text: 'Pooling Template', link: '/pooling'},
        {text: 'Referee Template', link: '/referee'},
        {text: 'Stats Template', link: '/stats'}
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
