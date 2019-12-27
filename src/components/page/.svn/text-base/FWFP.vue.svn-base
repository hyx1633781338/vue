<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i> 服务管理
				</el-breadcrumb-item>
				<el-breadcrumb-item>服务分配</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-form ref="query" :model="query" label-width="80px">
					<el-button-group>
						<el-button type="primary" icon="el-icon-lx-add" class="handle-del mr10" @click="fwcj()"></el-button>
					</el-button-group>
					客户名
					<el-input v-model="query.svrCustName" placeholder="请输入内容" class="handle-input mr6"></el-input>
					概要
					<el-input v-model="query.svrTilte" placeholder="请输入内容" class="handle-input mr6"></el-input>
					状态
					<el-select v-model="query.svrStatus"  placeholder="请选择" class=" mr6">
						<el-option key="1" label="新创建" value="新创建"></el-option>
					</el-select>
					服务类型
					<el-select v-model="query.svrType" placeholder="请选择" class=" mr6">
						<el-option key="3" label="咨询" value="咨询"></el-option>
						<el-option key="4" label="建议" value="建议"></el-option>
						<el-option key="4" label="投诉" value="投诉"></el-option>
						<el-option key="6" label="全部" value=""></el-option>
					</el-select>
					<el-button type="primary" icon="el-icon-search" @click="handleSearch()">搜索</el-button>
				</el-form>
			</div>
			<el-table :data="tableData" height="330" border class="table" ref="multipleTable" header-cell-class-name="table-header" @selection-change="handleSelectionChange">
				<el-table-column type="index" label="编号" width="55" align="center" :index="indexMethod"></el-table-column>
				<el-table-column prop="svrCustName" label="客户名" width="100" align="center"></el-table-column>
				<el-table-column prop="svrTilte" label="概要" align="center"></el-table-column>
				<el-table-column prop="svrType" label="服务类型" width="100" align="center"></el-table-column>
				<el-table-column prop="svrCreateBy" label="创建人" width="140" align="center"></el-table-column>
				<el-table-column prop="svrCreateDate" label="创建日期" width="200" align="center"></el-table-column>
				<el-table-column prop="svrRequest" label="服务请求" width="140" align="center"></el-table-column>
				<el-table-column label="操作" width="140" align="center">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">服务分配</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" :visible.sync="editVisible" width="65%">
			<el-form label-width="70px">
				<el-form-item label="分配给">
					<el-select v-model="form.svrDueId" placeholder="请选择" class="handle-select mr10">
						<el-option key="1" label="lcy" value="2"></el-option>
						<el-option key="2" label="slt" value="1"></el-option>
						<el-option key="3" label="hyx" value="3"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
						<el-button @click="editVisible=false">取 消</el-button>
						<el-button type="primary" @click="saveEdit()">确 定</el-button>
					</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'basetable',
		data() {
			return {
				query: {
					svrId:'',
					svrCustName: '',
					svrTilte: '',
					svrStatus: '新创建',
					svrType: '',
					svrDueTo:'',
					svrRequest:'',
					rows: 10,
					page: 1
				},
				form:{
					svrId:'',
					svrDueId:'',
					svrDueDate:''
				},
				tableData: [],
				index:1,
				editVisible: false,
				total:0
			};
		},
		created() {
			this.handleSearch();
			this.nowTimes;
		},
		methods: {
			//序列
			indexMethod(index) {
				return(this.page - 1) * this.rows + (index + 1);
			},
			//服务创建
			fwcj() {
				this.$router.push({
					path: 'fwcj'
				})
			},
			// 触发搜索按钮
			handleSearch() {
				let url = this.axios.urls.FW_FWCL_SEL;
				this.axios.post(url, this.query).then((response) => {
					//返回数据
					this.tableData = response.data.result;
					//总记录数
					this.total = response.data.total;
				}).catch((response) => {});
			},
			// 编辑操作
			handleEdit(index, row) {
				this.index = index;
				this.form = row;
				this.editVisible = true;
			},
			// 保存编辑
			saveEdit() {
				let url = this.axios.urls.FW_FWCL_EDIT;
				this.form.svrStatus='已分配';
				this.timeFormate(new Date());
				this.axios.post(url, this.form).then((response) => {
					//返回数据
					this.tableData = response.data.result;
					this.$message.success('分配完成');
					this.handleSearch();
				}).catch((response) => {});
				this.editVisible = false;
			},
			//变动每页显示条数
			handleSizeChange: function(rows) {
				console.log("rows=%i", rows);
				this.query.page = 1;
				this.query.rows = rows;
				this.handleSearch();
			},
			//分页
			handleCurrentChange: function(page) {
				console.log("page=%i", page);
				this.query.page = page;
				this.handleSearch();
			},
			// 获取当前时间函数
			timeFormate(timeStamp) {
				let year = new Date(timeStamp).getFullYear();
				let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
				let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
				let hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
				let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
				// let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
				// return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
				this.form.svrDueDate = year + "年" + month + "月" + date + "日" + " " + hh + ":" + mm;
				// console.log(this.nowTime);
			},
			// 定时器函数
			nowTimes() {
				this.handleSearch();
				this.timeFormate(new Date());
				setInterval(this.nowTimes, 30 * 1000);
			},
			indexMethod(index) {
				return(this.query.page - 1) * this.query.rows + (index + 1);
			},
			//变动每页显示条数
			handleSizeChange: function(rows) {
				console.log("rows=%i", rows);
				this.query.page = 1;
				this.query.rows = rows;
				this.handleSearch();
			},
			//分页
			handlePageChange: function(page) {
				console.log("page=%i", page);
				this.query.page = page;
				this.handleSearch();
			}
		}
	};
</script>

<style scoped>
	.handle-box {
		margin-bottom: 20px;
	}
	
	.handle-select {
		width: 600px;
	}
	
	.handle-input {
		width: 290px;
		display: inline-block;
	}
	
	.table {
		width: 100%;
		font-size: 14px;
	}
	
	.red {
		color: #ff0000;
	}
	
	.mr10 {
		margin-right: 10px;
	}
	
	.mr6 {
		width: 140px;
	}
	
	.table-td-thumb {
		display: block;
		margin: auto;
		width: 40px;
		height: 40px;
	}
</style>