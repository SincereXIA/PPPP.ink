const path = require('path')
const secret = require('./secret.js')
const sortFn = (a, b) => {
  const firstA = a.filename.split("-")[0]
  const firstB = b.filename.split("-")[0]
  numA = parseInt(firstA)
  numB = parseInt(firstB)
  return numA > numB ? 1 : -1
}

module.exports = {
  "title": "PPPP.ink 粉墨 - 粉墨日记",
  "description": "PPPP.ink is Personal Private Playground",
  "dest": "public",
  "head": [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: "#d55b98"}],
    ['meta', { name: 'msapplication-TileColor', content: '#da532c'}],
    ['meta', { name: 'theme-color', content: '#ffffff'}],
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
    "type": 'HomePageOne',
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
          },
          {
            "text": "golang",
            "link": "/docs/golang/"
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
      },
      { text: '订阅', link: 'https://www.pppp.ink/rss.xml', icon: 'reco-rss'},
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
    //"type": "blog",
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
    //"logo": "/logo.png", // 顶栏左上角 logo
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "SincereXIA",
    "authorAvatar": "/avatar.jpeg",
    // 备案
    record: '陕ICP备16018536号-2',
    recordLink: 'https://beian.miit.gov.cn/',
    cyberSecurityRecord: '京公网安备 11010802035338 号',
    cyberSecurityLink: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802035338',
    // 项目开始时间，只填写年份
    startYear: '2020',
    repo: 'SincereXIA/PPPP.ink',
    docsDir: 'content',
    docsBranch: 'main',
    editLinks: true,
    mode: 'auto',
    valineConfig: {
      appId: 'vzuuxzwzT439zjrqDAdnfQdS-gzGzoHsz',
      appKey: secret.valineAppKey,
      recordIP: true,
      enableQQ: true,
      requiredFields: ['nick'],
      verify: true,
    }
  },
  "markdown": {
    "lineNumbers": true
  },
  "plugins": {
    '@vuepress-reco/rss': {
      site_url: 'https://www.pppp.ink',
    },
    '@vuepress/plugin-register-components': {
      components: [
        {
          name: 'reco-home-page-one',
          path: path.resolve(__dirname, './components/HomePageOne.vue')
        }
      ],
      componentsDir: path.resolve(__dirname, './demo')
    },
    'permalink-pinyin':{},
    "vuepress-plugin-auto-sidebar": {
      // options
      sort: {
        mode: 'custom',
        fn: sortFn
      },
      sidebarDepth: 1,
      readmeFirstForce: true,
      mode: "titlecase"
      // ignore: [
      //   {
      //     menu: "/blogs/diary/2021/",
      //     regex: ".*"
      //   }
      // ]
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
    "sitemap": {
      hostname: 'https://pppp.ink'
    }
  }
}
