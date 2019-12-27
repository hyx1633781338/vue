/**
 * 对后台请求的地址的封装，URL格式如下：
 * 模块名_实体名_操作
 */
export default {
	//服务器
	'SERVER': 'http://localhost:8081',

	//用户管理
	'SYS_USER_DOLOGIN': '/admin/tologin', //登陆

	//财务管理
	'SYS_LOAN_LIST':'/loan/list',//list
	'SYS_LOAN_ADMINA':'/loan/adminb',//adminb
	'SYS_LOAN_ADMINB':'/loan/adminb',//adminb

	//账单流水
	'SYS_LOAN_ZLIST':'/loan/zlist',//list

	//催收管理
	'SYS_LOAN_CLIST':'/iNormalloanpsService/list',//list

	//员工管理
	'ADMIN_LOGIN':'/admin/tologin',//登录
	'ADMIN_UPDATE':'/admin/toupd',//修改
	'ADMIN_LIST':'/admin/list',//查询

	//产品管理
	'PRODUCT_INSERT':'/product/toadd',//增加
	'PRODUCT_UPDATE':'/product/toupd',//修改
	'PRODUCT_LIST':'/product/list',//查询

	
	//获得请求的完整地址，用于mockjs测试时使用
	'getFullPath': k => {
		return this.SERVER + this[k];
	}
}