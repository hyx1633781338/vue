<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'dashboard',
                        title: '系统首页'
                    },
                    {
                        icon: 'el-icon-lx-service',
						index: '1',
                        title: '微信管理',
						subs: [
							{
								index: 'productlist',
								title: '公众账号管理',
							},
                            {
                                index: 'khleave',
                                title: '微信菜单管理',
                            }
						]
                    },{
                        icon: 'el-icon-lx-friendadd',
						index: '2',
                        title: '微信模板管理',
						subs: [
							{
								index: 'adminlist',
								title: '微信模板管理',
							}
						]
                    },{
                        icon: 'el-icon-lx-vipcard',
						index: '3',
                        title: '智能应答管理',
						subs: [
							{
								index: 'jksh',
								title: '关键字指令',
							},{
                                index: 'jksh',
                                title: '关键字管理',
                            },{
                                index: 'jksh',
                                title: '关键字类别管理',
                            },{
                                index: 'jksh',
                                title: '关键字类别关联',
                            },{
                                index: 'jksh',
                                title: '智能应答管理',
                            }
						]
                    },{
                        icon: 'el-icon-money',
                        index: '4',
                        title: '微信报表管理',
                        subs: [
                            {
                                index: 'cwgl',
                                title: '二级菜单点击率',
                            },
                            {
                                index: 'zdsl',
                                title: '关键字检索统计报表',
                            },
                            {
                                index: 'zdsl',
                                title: '用户关注人数报表',
                            },
                            {
                                index: 'zdsl',
                                title: '绑定用户时段统计报表',
                            },
                            {
                                index: 'zdsl',
                                title: '绑定用户日统计报表',
                            }
                        ]
                    },{
                        icon: 'el-icon-set-up',
                        index: '5',
                        title: '网点/ATM维护',
                        subs: [
                            {
                                index: 'zdcs',
                                title: '网点/ATM维护',
                            }
                        ]
                    },
                   {
                        icon: 'el-icon-lx-rank',
                        index: '6',
                        title: '微信绑定管理',
                        subs: [
                            {
                                index: 'khgx',
                                title: '微信绑定明细查询',
                            },
                            {
                                index: 'khgc',
                                title: '微信关注明细查询',
                            },
                            {
                                index: 'khfw',
                                title: '客户绑定签约',
                            }
                        ]
                    },{
                        icon: 'el-icon-lx-read',
                        index: '7',
                        title: '系统管理',
                        subs: [
                            {
                                index: 'drag',
                                title: '操作员管理',
                            },

                        ]
                    },
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
