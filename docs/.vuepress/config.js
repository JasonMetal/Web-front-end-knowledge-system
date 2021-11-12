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
        sidebarDepth: 2,
        sidebar: [
            {
                title: 'JavaScript',
                collapsable: true,
                children: [
                    '/javaScript/dataType',
                    '/javaScript/variable',
                    '/javaScript/function',
                    '/javaScript/functions_diy',
                    '/javaScript/environment',
                    '/javaScript/operating-mechanism',
                    '/javaScript/closure',
                    '/javaScript/RAM',
                    '/javaScript/object',
                    '/javaScript/Cross-domain',
                    '/javaScript/Simulation',
                    '/javaScript/advancedSkills',
                    '/javaScript/es6',
                ]
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