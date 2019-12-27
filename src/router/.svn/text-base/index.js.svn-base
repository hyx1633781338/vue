import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '销售机会表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '仓库信息' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '商品详细信息' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                },
				,
				{
					path: '/form1',
					component: () => import(/* webpackChunkName: "donate" */ '../components/page/Form.vue'),
					meta: { title: '客户开发计划' }
				},
				{
					path: '/khtable',
					component: () => import(/* webpackChunkName: "donate" */ '../components/page/KhTable.vue'),
					meta: { title: '客户信息管理' }
				},
				{
					path: '/khxq',
					component: () => import(/* webpackChunkName: "donate" */ '../components/page/KhXq.vue'),
					meta: { title: '客户信息详情' }
				},
				{
					path: '/linkman',
					component: () => import(/* webpackChunkName: "donate" */ '../components/page/LinkMan.vue'),
					meta: { title: '联系人' }
				},
				{
					path: '/orderform',
					component: () => import(/* webpackChunkName: "donate" */ '../components/page/OrderForm.vue'),
					meta: { title: '历史订单' }
				},
				{
					path: '/ofxq',
					component: () => import(/* webpackChunkName: "donate" */ '../components/page/OFXQ.vue'),
					meta: { title: '订单详情' }
				},
				{
					path: '/jwjl',
					component: () => import(/* webpackChunkName: "donate" */ '../components/page/JWJL.vue'),
					meta: { title: '交往记录' }
				},
				{
					path: '/khleave',
					component: () => import(/* webpackChunkName: "donate" */ '../components/page/KhLeave.vue'),
					meta: { title: '客户流失管理' }
				},
				{
					path: '/zhls',
					component: () => import(/* webpackChunkName: "donate" */ '../components/page/ZHLS.vue'),
					meta: { title: '暂缓流失' }
				},
				{
					path: '/fwfp',
					component: () => import(/* webpackChunkName: "donate" */ '../components/page/FWFP.vue'),
					meta: { title: '服务分配' }
				},
				{
					path: '/fwcj',
					component: () => import(/* webpackChunkName: "donate" */ '../components/page/FWCJ.vue'),
					meta: { title: '服务创建' }
				},
				{
					path: '/fwcl',
					component: () => import(/* webpackChunkName: "donate" */ '../components/page/FWCL.vue'),
					meta: { title: '服务处理' }
				},
				{
					path: '/fwcl1',
					component: () => import(/* webpackChunkName: "donate" */ '../components/page/FWCL1.vue'),
					meta: { title: '服务处理详情' }
				},
				{
					path: '/fwfk',
					component: () => import(/* webpackChunkName: "donate" */ '../components/page/FWFK.vue'),
					meta: { title: '服务反馈' }
				},
				{
					path: '/fwfk1',
					component: () => import(/* webpackChunkName: "donate" */ '../components/page/FWFK1.vue'),
					meta: { title: '服务反馈详情' }
				},
				{
					path: '/fwgd',
					component: () => import(/* webpackChunkName: "donate" */ '../components/page/FWGD.vue'),
					meta: { title: '服务归档' }
				},
				{
					path: '/khgc',
					component: () => import(/* webpackChunkName: "donate" */ '../components/page/KHGC.vue'),
					meta: { title: '客户构成分析' }
				},
				{
					path: '/khfw',
					component: () => import(/* webpackChunkName: "donate" */ '../components/page/KHFW.vue'),
					meta: { title: '客户服务分析' }
				},
				{
					path: '/khgx',
					component: () => import(/* webpackChunkName: "donate" */ '../components/page/KHGX.vue'),
					meta: { title: '客户贡献分析' }
				},
				{
					path: '/khls',
					component: () => import(/* webpackChunkName: "donate" */ '../components/page/KHLS.vue'),
					meta: { title: '客户流失分析' }
				}
				
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue')
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
