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
                    '/javaScript/1.varType',
                    '/javaScript/2.prototype',
                    '/javaScript/3.scopes',
                    '/javaScript/4.this',
                    '/javaScript/5.code',
                    '/javaScript/6.nativeCode',
                    '/javaScript/dataType',
                    '/javaScript/type',
                    '/javaScript/val',
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
                ],
            },
            {
              title: '网络协议',
              collapsable: true,
              children: [
                  '/net/1.网络基础',
                  '/net/2.http',
                  '/net/3.https',
                  '/net/4.http认证方式',
              ],
              sidebarDepth: 2,
            },
            {
              title: '设计模式',
              collapsable: true,
              children: [

              ],
            },
            {
              title: '数据结构与算法',
              collapsable: true,
              children: [

              ],
            },
            {
                title: '浏览器',
                collapsable: true,
                children: [
                    '/browser/backflow',
                    '/browser/cache',
                    '/browser/netWork',
                    '/browser/parse',
                    '/browser/render',
                    '/browser/storage',
                ],
                sidebarDepth: 2,
            },
            {
              title: 'Node',
              collapsable: true,
              children: [
              ],
            },
            {
              title: '框架与库',
              collapsable: true,
              children: [
                  '/TypeScript/advanced-types',
                  '/TypeScript/basic-types',
              ],
            },
            {
              title: '前端工程化',
              collapsable: true,
              children: [

              ],
            },
            {
              title: '性能优化',
              collapsable: true,
              children: [

              ],
            },
            {
              title: '前端安全',
              collapsable: true,
              children: [

              ],
            },
            {
                title: '面试题',
                collapsable: true,
                children: [
                    '/mianshi/1.js',
                    '/mianshi/2.es6',
                    '/mianshi/3.编码题',
                    '/mianshi/4.html、css',
                    '/mianshi/5.网络协议',
                    '/mianshi/6.浏览器',
                    '/mianshi/9.性能优化',
                    '/mianshi/10.前端安全',
                    '/mianshi/12.前端工程',
                    '/mianshi/13.其他问题',
                ],
            },

            {
                title: '读书笔记',
                collapsable: true,
                children: [
                    '/readNode/yDknow/on',
                ],
            },
        ]
    },

}
