module.exports = {
    title: '前端知识笔记',
    description: '本博客属于个人总结记录，目前包括JavaScript、浏览器基本知识点',
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
        sidebarDepth: 2,
        sidebar: [
            {
                title: 'JavaScript',
                collapsable: true,
                children: [
                    '/javaScript/type',
                    '/javaScript/val',
                    '/javaScript/variable',
                    '/javaScript/nativeFunction',
                    '/javaScript/grammar',
                    '/javaScript/asyn',
                    '/javaScript/environment',
                    '/javaScript/operating-mechanism',
                    '/javaScript/closure',
                    '/javaScript/RAM',
                    '/javaScript/object',
                    '/javaScript/Cross-domain',
                    '/javaScript/Simulation',
                    '/javaScript/advancedSkills',                    
                ],
            },
            {
                title: 'React',
                collapsable: true,
                children: [
                    '/React',
                ],
            },
            {
                title: '浏览器',
                collapsable: true,
                children: [
                    '/browser/storage',
                    '/browser/cache',
                    '/browser/netWork',
                    '/browser/parse',
                    '/browser/render',
                    '/browser/backflow',
                ],
                sidebarDepth: 2,
            },
            {
                title: '读书笔记',
                collapsable: true,
                children: [
                    '/readNode/yDknow/on',
                ],
            },
        ]
        // sidebar: {
        //     '/javaScript/': [
        //     '',
        //     ],
        //     '/browser/': [
        //     '',
        //     ],
        //     '/foo/': [
        //     '',     /* /foo/ */
        //     ],
    
        //     '/bar/': [
        //     '',      /* /bar/ */
        //     ],        
        // }
    },
    
}