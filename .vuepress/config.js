// .vuepress/config.js
module.exports = {
  title: 'CheatSheet',  // 设置网站标题
  description : "",
  base : '/restful-web_doc/',
  themeConfig: {
    nav : [
        { text: 'Github', link: 'http://www.github.com/sunnnychan' }
    ],
    sidebar: [
      {
        title: 'Get Start',   // 必要的
        path: '/getstart/',      // 可选的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/getstart/what/',
          '/getstart/demo/'
        ]
      }
    ]
  }
}
