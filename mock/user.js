
const tokens = {
  admin: {
    token: "admin-token",
  },
  lisi: {
    token: "lisi-token",
  },
};

// 用户资料，张三的用户资料，李四的用户资料
const users = {
  "admin-token": {
    introduction: "我是超级管理员",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "admin张三",
    roles: {
      // menuList是服务端返回动态路由配置
      menuList: [
        {
          path: "/content",
          component: "layout",
          meta: {
            title: "内容管理",
            icon: "dashboard",
          },
          name: "content",
          redirect: "/content/cate",
          children: [
            {
              path: "cate",
              component: "content/cate",
              name: "cate",
              meta: {
                title: "分类管理",
                icon: "dashboard",
              }
            },
            {
              path: "tag",
              component: "content/tag",
              name: "tag",
              meta: {
                title: "标签管理",
                icon: "dashboard",
              }
            },
          ],
        },
        {
          path: "/adv",
          component: "layout",
          meta: {
            icon: "dashboard",
            title: "广告管理",
          },
          name: "adv",
          redirect: "/adv/pos",
          children: [
            {
              path: "pos",
              component: "adv/pos",
              name: "pos",
              meta: {
                title: "广告位管理",
                icon: "dashboard",
              }
            },
            {
              path: "img",
              component: "adv/img",
              name: "img",
              meta: {
                title: "广告图管理",
                icon: "dashboard",
              }
            },
          ],
        },
      ],
      btnList: [],
    },
  },
  "lisi-token": {
    introduction: "我是广告管理员",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "李四",
    roles: {
      // menuList服务端返回动态路由配置
      menuList: [
        {
          path: "/content",
          component: "layout",
          title: "内容管理",
          icon: "dashboard",
          name: "content",
          redirect: "/content/cate",
          children: [
            {
              path: "cate",
              component: "content/cate",
              name: "cate",
              meta: {
                title: "分类管理",
                icon: "dashboard",
              }
            },
          ],
        },
        {
          path: "/adv",
          component: "layout",
          meta: {
            icon: "dashboard",
            title: "广告管理",
          },
          name: "adv",
          redirect: "/adv/pos",
          children: [
            {
              path: "pos",
              component: "adv/pos",
              name: "pos",
              meta: {
                title: "广告位管理",
                icon: "dashboard",
              }
            },
          ],
        },
      ],
      btnList: [],
    },
  },
};

module.exports = [
  // 登录操作
  {
    url: "/mock/api/user/login",
    type: "post",
    response: (config) => {
      const { username } = config.body;
      const token = tokens[username];

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: "账号密码不正确",
        };
      }
      return {
        code: 200,
        data: token,
      };
    },
  },
  // 获取用户资料
  {
    url: "/mock/api/user/getInfo",
    type: "get",
    response: (config) => {
      // 从查询参数里面读取处token
      const tokenKey = config.headers.authorization; // token的值是 admin-token  lisi-token
      const info = users[tokenKey];
      // mock error
      if (!info) {
        return {
          code: 50008,
          message: "Login failed, unable to get user details.",
        };
      }
      return {
        code: 200,
        data: info,
      };
    },
  },
  // 退出
  {
    url: "/mock/api/user/logout",
    type: "post",
    response: (_) => {
      return {
        code: 200,
        data: "success",
      };
    },
  },
];
