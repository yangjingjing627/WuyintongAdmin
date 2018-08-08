import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router)

/* layout */
import Layout from '../views/layout/Layout'

/**
* icon : the icon show in the sidebar
* hidden : if `hidden:true` will not show in the sidebar
* redirect : if `redirect:noredirect` will no redirct in the levelbar
* noDropdown : if `noDropdown:true` will has no submenu
* meta : { role: ['admin'] }  will control the page role
**/
export const constantRouterMap = [
    { path: '/login', component: _import('login/index'), hidden: true },
    { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
    { path: '/404', component: _import('errorPage/404'), hidden: true },
    { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{ path: 'dashboard', component: _import('dashboard/index') }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/index',
  //   name: '权限测试',
  //   icon: 'lock',
  //   meta: { role: ['admin'] },
  //   noDropdown: true,
  //   children: [{ path: 'index', component: _import('permission/index'), name: '权限测试页', meta: { role: ['admin'] }}]
  // },
  // {
  //   path: '/icon',
  //   component: Layout,
  //   icon: 'icon',
  //   noDropdown: true,
  //   children: [{ path: 'index', component: _import('svg-icons/index'), name: 'icons' }]
  // },
  /*
  * 金融产品管理
  */
  {
    path: '/management',
    component: Layout,
    redirect: '/management/index',
    name: '金融产品管理',
    icon: 'chart',
    children: [
      { path: 'index', component: _import('management/index'), name: '新增个人贷' }
      // { path: 'keyboard', component: _import('charts/keyboard'), name: '新增企业贷' },
      // { path: 'keyboard2', component: _import('charts/keyboard2'), name: '产品管理' },
      // { path: 'line', component: _import('charts/line'), name: '合同管理' }
    ]
  },
  /*
  * 融资申请
  */
  {
    path: '/financing',
    component: Layout,
    redirect: '/financing/index',
    name: '融资申请',
    icon: 'chart',
    children: [
      { path: 'index', component: _import('financing/index'), name: '融资申请' },
      { path: 'credit', component: _import('financing/credit'), name: '授信管理' },
      { path: 'creditDetail', component: _import('financing/credit.detail'), name: '授信详情', hidden: true },
      { path: 'keyboard2', component: _import('charts/keyboard2'), name: '用款查询' },
      { path: 'repayment', component: _import('financing/repayment'), name: '还款查询' },
      { path: 'repaymentBillDetail', component: _import('financing/repayment.bill.detail'), name: '还款账单明细', hidden: true },
      { path: 'enterpriseInfo', component: _import('financing/enterprise.info'), name: '放款详情', hidden: true }

    ]
  },
  /*
  * 链上信息查询
  */
  {
    path: '/charts',
    component: Layout,
    redirect: '/charts/index',
    name: '链上信息查询',
    icon: 'chart',
    children: [
      { path: 'line', component: _import('charts/line'), name: '企业信息查询' }
    ]
  },
  /*
  * 我的消息
  */
  {
    path: '/charts',
    component: Layout,
    redirect: '/charts/index',
    name: '我的消息',
    icon: 'chart',
    children: [
      { path: 'line', component: _import('charts/line'), name: '我的消息' },
      { path: 'keyboard2', component: _import('charts/keyboard2'), name: '发送消息' }
    ]
  },
  /*
  *  用户管理
  */
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: '用户管理',
    icon: 'user',
    children: [
      { path: 'index', component: _import('user/index'), name: '用户管理' },
      { path: 'add', component: _import('user/add.user'), name: '新增用户' }
    ]
  },
  /*
  *  设置
  */
  {
    path: '/charts',
    component: Layout,
    redirect: '/charts/index',
    name: '设置',
    icon: 'chart',
    children: [
      { path: 'line', component: _import('charts/line'), name: '企业人员管理' },
      { path: 'keyboard2', component: _import('charts/keyboard2'), name: '我的企业' }
    ]
  },
  // {
  //   path: '/components',
  //   component: Layout,
  //   redirect: '/components/index',
  //   name: '组件',
  //   icon: 'component',
  //   children: [
  //     { path: 'index', component: _import('components/index'), name: '介绍 ' },
  //     { path: 'tinymce', component: _import('components/tinymce'), name: '富文本编辑器' },
  //     { path: 'markdown', component: _import('components/markdown'), name: 'Markdown' },
  //     { path: 'jsoneditor', component: _import('components/jsonEditor'), name: 'JSON编辑器' },
  //     { path: 'dndlist', component: _import('components/dndList'), name: '列表拖拽' },
  //     { path: 'splitpane', component: _import('components/splitpane'), name: 'SplitPane' },
  //     { path: 'avatarupload', component: _import('components/avatarUpload'), name: '头像上传' },
  //     { path: 'dropzone', component: _import('components/dropzone'), name: 'Dropzone' },
  //     { path: 'sticky', component: _import('components/sticky'), name: 'Sticky' },
  //     { path: 'countto', component: _import('components/countTo'), name: 'CountTo' },
  //     { path: 'mixin', component: _import('components/mixin'), name: '小组件' },
  //     { path: 'backtotop', component: _import('components/backToTop'), name: '返回顶部' }
  //   ]
  // },
  // {
  //   path: '/charts',
  //   component: Layout,
  //   redirect: '/charts/index',
  //   name: '图表',
  //   icon: 'chart',
  //   children: [
  //     { path: 'index', component: _import('charts/index'), name: '介绍' },
  //     { path: 'keyboard', component: _import('charts/keyboard'), name: '键盘图表' },
  //     { path: 'keyboard2', component: _import('charts/keyboard2'), name: '键盘图表2' },
  //     { path: 'line', component: _import('charts/line'), name: '折线图' },
  //     { path: 'mixchart', component: _import('charts/mixChart'), name: '混合图表' }
  //   ]
  // },
  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: '综合实例',
    icon: 'example',
    children: [
      {
        path: '/example/table',
        component: _import('example/table/index'),
        redirect: '/example/table/table',
        name: 'Table',
        icon: 'table',
        children: [
          { path: 'dynamictable', component: _import('example/table/dynamictable/index'), name: '动态table' },
          { path: 'dragtable', component: _import('example/table/dragTable'), name: '拖拽table' },
          { path: 'inline_edit_table', component: _import('example/table/inlineEditTable'), name: 'table内编辑' },
          { path: 'table', component: _import('example/table/table'), name: '综合table' }
        ]
      },
      { path: 'form/edit', icon: 'form', component: _import('example/form'), name: '编辑Form', meta: { isEdit: true }},
      { path: 'form/create', icon: 'form', component: _import('example/form'), name: '创建Form' },
      { path: 'tab/index', icon: 'tab', component: _import('example/tab/index'), name: 'Tab' }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: '错误页面',
    icon: '404',
    children: [
      { path: '401', component: _import('errorPage/401'), name: '401' },
      { path: '404', component: _import('errorPage/404'), name: '404' }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
