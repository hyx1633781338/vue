<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i> 服务管理
				</el-breadcrumb-item>
				<el-breadcrumb-item>服务反馈</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-form ref="query" :model="query" label-width="80px">
					&nbsp;&nbsp;&nbsp; 客户名
					<el-input v-model="query.svrCustName" placeholder="请输入内容" class="handle-input mr6"></el-input>
					概要
					<el-input v-model="query.svrTilte" placeholder="请输入内容" class="handle-input mr6"></el-input>
					状态
					<el-select v-model="query.svrStatus" placeholder="请选择" class="handle-select mr10">
						<el-option key="1" label="已处理" value="已处理"></el-option>
					</el-select>
					服务类型
					<el-select v-model="query.svrType" placeholder="请选择" class="handle-select mr10">
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
						<el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">服务处理详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :current-page="currentPage4" :page-sizes="[10, 50, 100, 200]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>

		<!-- 反馈弹出框 -->
		<el-dialog title="编辑" :visible.sync="editVisible" width="60%">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="编号">
					<el-col :span="10">
						<el-input :disabled="true" v-model="form.svrId"></el-input>
					</el-col>
					<el-col class="line" :span="4">
						<center>服务类型</center>
					</el-col>
					<el-col :span="10">
						<el-select :disabled="true" v-model="form.svrType" placeholder="请选择" class="handle-select mr10">
							<el-option key="3" label="咨询" value="咨询"></el-option>
							<el-option key="4" label="建议" value="建议"></el-option>
							<el-option key="5" label="投诉" value="投诉"></el-option>
						</el-select>
					</el-col>
				</el-form-item>
				<el-form-item label="概要">
					<el-input :disabled="true" v-model="form.svrTilte"></el-input>
				</el-form-item>
				<el-form-item label="客户">
					<el-col :span="10">
						<el-input :disabled="true" v-model="form.svrCustName"></el-input>
					</el-col>
					<el-col class="line" :span="4">
						<center>状态</center>
					</el-col>
					<el-col :span="10">
						<el-select :disabled="true" v-model="form.svrStatus" placeholder="请选择" class="handle-select mr10">
							<el-option key="3" label="已处理" value="已处理"></el-option>
						</el-select>
					</el-col>
				</el-form-item>
				<el-form-item label="服务请求">
					<el-input :disabled="true" v-model="form.svrRequest" type="textarea"></el-input>
				</el-form-item>
				<el-form-item label="创建人">
					<el-col :span="10">
						<el-input :disabled="true" v-model="form.svrCreateBy"></el-input>
					</el-col>
					<el-col class="line" :span="4">
						<center>创建时间</center>
					</el-col>
					<el-col :span="10">
						<el-input :disabled="true" v-model="form.svrCreateDate"></el-input>
					</el-col>
				</el-form-item>
				</el-form-item>
				<el-form-item label="分配给">
					<el-col :span="10">
						<el-input :disabled="true" v-model="form.svrDueTo"></el-input>
					</el-col>
					<el-col class="line" :span="4">
						<center>分配时间</center>
					</el-col>
					<el-col :span="10">
						<el-input :disabled="true" v-model="form.svrDueDate"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="服务处理">
					<el-input v-model="form.svrDeal" :disabled="true" type="textarea"></el-input>
				</el-form-item>
				<el-form-item label="处理人">
					<el-col :span="10">
						<el-input :disabled="true" v-model="form.svrDealBy"></el-input>
					</el-col>
					<el-col class="line" :span="4">
						<center>处理时间</center>
					</el-col>
					<el-col :span="10">
						<el-input :disabled="true" v-model="form.svrDealDate"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="处理结果">
					<el-col :span="10">
						<el-input v-model="form.svrResult"></el-input>
					</el-col>
					<el-col class="line" :span="4">
						<center>满意度</center>
					</el-col>
					<el-col :span="10">
						 <el-rate style="margin-top: 5px;" v-model="form.svrSatisfy"></el-rate>
					</el-col>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
						<el-button @click="editVisible = false">取 消</el-button>
						<el-button type="primary" @click="saveEdit">确 定</el-button>
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
					svrId: '',
					svrCustName: '',
					svrTilte: '',
					svrStatus: '已处理',
					svrType: '',
					svrDueTo: '',
					rows: 10,
					page: 1
				},
				form: {
					svrId: '',
					svrCustName: '',
					svrTilte: '',
					svrStatus: '',
					svrRequest:'',
					svrType: '',
					svrCreateBy:'',
					svrCreateDate:'',
					svrDueTo: '',
					svrDueDate:'',
					svrDealBy:'',
					svrDealDate:'',
					svrResult:'',
					svrSatisfy:''
				},
				tableData: [],
				index: 0,
				editVisible: false,
				total: 0
			};
		},
		created() {
			this.handleSearch();
			//this.nowTimes();
		},
		methods: {
			// 触发搜索按钮
			handleSearch() {
				var url = this.axios.urls.FW_FWCL_SEL;
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
				this.form.svrStatus = '已归档';
				this.axios.post(url, this.form).then((response) => {
					//返回数据
					this.editVisible = false;
					this.handleSearch();
					this.$message.success('归档中');
				}).catch((response) => {});
			},
			nowTimes() {
				this.handleSearch();
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
		width: 120px;
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