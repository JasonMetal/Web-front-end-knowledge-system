module.exports = {
    title: '前端知识体系',
    description: 'Hello, my friend!',
    head: [
        ['link', {
            rel: 'icon',
            href: `/favicon.ico`
        }]
    ],
    dest: './docs/.vuepress/dist',
    ga: '',
    evergreen: true,
    themeConfig: {
        nav: [
        //   { text: 'Home', link: '/' },
        ],
        sidebarDepth: 2,
        sidebar: [
            {
                title: 'JavaScript',
                collapsable: true,
                children: ['/javaScript/']
            },
        ]
    },
    
}