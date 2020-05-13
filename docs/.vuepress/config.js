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
            {
                title: 'HTML与CSS',
                collapsable: true,
                children: ['/html/']
            },
            {
                title: '计算机基础',
                collapsable: true,
                children: ['/computerBasics/']
            },
            {
                title: '数据解构与算法',
                collapsable: true,
                children: ['/algorithm/']
            },
            {
                title: '浏览器',
                collapsable: true,
                children: ['/browser/']
            },
            {
                title: '前端工程',
                collapsable: true,
                children: ['/engineering/']
            },
            {
                title: '框架与类库',
                collapsable: true,
                children: ['/frame/']
            },
            {
                title: '项目与业务',
                collapsable: true,
                children: ['/other/']
            } 
        ]
    },
    
}