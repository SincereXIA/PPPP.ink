const sortFn = (a, b) => {
  const firstA = a.filename.split("-")[0]
  const firstB = b.filename.split("-")[0]
  return firstA > firstB ? 1 : -1
}

module.exports = {
  "title": "PPPP.ink 粉墨",
  "description": "PPPP.ink is Personal Private Playground",
  "dest": "public",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "subSidebar": 'auto',
    "nav": [
      {
        "text": "主页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "时光机",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "文档",
        "icon": "reco-message",
        "items": [
          {
            "text": "北航",
            "link": "/docs/buaa/"
          },
          {
            "text": "前端基础",
            "link": "/docs/learn-frontend/"
          }
        ]
      },
      {
        "text": "联系",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/SincereXIA",
            "icon": "reco-github"
          }
        ]
      }
    ],
    // "sidebar": {
    //   "/docs/theme-reco/": [
    //     "",
    //     "theme",
    //     "plugin",
    //     "api"
    //   ],
    //   "/docs/learn-frontend/" :[
    //     "",
    //   ]
    // },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "分类"
      },
      "tag": {
        "location": 3,
        "text": "标签"
      },
      "socialLinks": [     // 信息栏展示社交信息
        { icon: 'reco-github', link: 'https://github.com/SincereXIA' },
      ]
    },
    "friendLink": [
      {
        "title": "朝霞换夕阳",
        "desc": "蜉蝣天地，沧海一粟",
        "email": "",
        "link": "https://www.mornw.com/"
      }
    ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "SincereXIA",
    "authorAvatar": "/avatar.png",
    // 备案
    record: '陕ICP备16018536号-2',
    recordLink: 'https://beian.miit.gov.cn/',
    cyberSecurityRecord: '公安部备案文案',
    cyberSecurityLink: '公安部备案指向链接',
    // 项目开始时间，只填写年份
    startYear: '2020',
    repo: 'SincereXIA/PPPP.ink',
    docsDir: 'content',
    docsBranch: 'main',
    editLinks: true,
    mode: 'light',
  },
  "markdown": {
    "lineNumbers": true
  },
  "plugins": {
    'permalink-pinyin':{},
    "vuepress-plugin-auto-sidebar": {
      // options
      sort: {
        mode: 'custom',
        fn: sortFn
      },
      sidebarDepth: 2,
      ignore: [
        {
          menu: "/blogs/diary/2021/",
          regex: ".*"
        }
      ]
    },
    '@maginapp/katex': {
      delimiters: 'dollars'
    },
    "md-enhance":
    {
      // 配置选项
      // 开启标记
      mark: true,
      //tex: true,
      // 启用下角标功能
      sub: true,
      // 启用上角标
      sup: true,
    },
  }
}