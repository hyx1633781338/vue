<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-calendar"></i> 营销管理
				</el-breadcrumb-item>
				<el-breadcrumb-item>客户开发计划</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="">
				<el-form :model="formb" label-width="70px" :rules="rules" ref="formb" :label-position="labelPosition" class="demo-ruleForm">
					<el-form-item label="编号">
						<el-col :span="10">
							<el-input v-model="formb.chcId" :disabled="true"></el-input>
						</el-col>
						<el-col class="line" :span="4">
							<center>机会来源</center>
						</el-col>
						<el-col :span="10">
							<el-input v-model="formb.chcSource" :disabled="true"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="客户名称">
						<el-col :span="10">
							<el-input v-model="formb.chcCustName" :disabled="true"></el-input>
						</el-col>
						<el-col class="line" :span="4">
							<center>成功几率</center>
						</el-col>
						<el-col :span="10">
							<el-input v-model="formb.chcRate" :disabled="true"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="概要">
						<el-input v-model="formb.chcTitle" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="联系人">
						<el-col :span="10">
							<el-input v-model="formb.chcLinkman" :disabled="true"></el-input>
						</el-col>
						<el-col class="line" :span="4">
							<center>联系人电话</center>
						</el-col>
						<el-col :span="10">
							<el-input v-model="formb.chcTel" :disabled="true"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="机会描述">
						<el-input type="textarea" v-model="formb.chcDesc" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="创建人">
						<el-col :span="10">
							<el-input v-model="formb.chcCreateBy" :disabled="true"></el-input>
						</el-col>
						<el-col class="line" :span="4">
							<center>创建时间</center>
						</el-col>
						<el-col :span="10">
							<el-input v-model="formb.chcCreateDate" :disabled="true"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="指派给">
						<el-col :span="10">
							<el-input v-model="formb.chcDueTo" :disabled="true"></el-input>
						</el-col>
						<el-col class="line" :span="4">
							<center>指派时间</center>
						</el-col>
						<el-col :span="10">
							<el-input v-model="formb.chcDueDate" :disabled="true"></el-input>
						</el-col>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-button-group>
					<el-button type="primary" icon="el-icon-lx-add" class="handle-del mr10" @click="editVisible=true">新增计划项</el-button>
					<el-button type="primary" icon="" class="handle-del mr10" @click="saveEdita('开发成功','状态：开发成功')">开发成功</el-button>
					<el-button type="primary" icon="" class="handle-del mr10" @click="saveEdita('开发失败', '状态：开发失败')">开发失败</el-button>
				</el-button-group>

			</div>
			<el-table :data="tableData" height="330" border class="table" ref="multipleTable" header-cell-class-name="table-header" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column type="index" label="ID" width="55" align="center" :index="indexMethod"></el-table-column>
				<el-table-column prop="plaDate" label="日期" align="center"></el-table-column>
				<el-table-column prop="plaTodo" label="计划项" align="center"></el-table-column>
				<el-table-column prop="plaResult" label="执行结果" align="center"></el-table-column>
				<el-table-column label="操作" width="150" align="center">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">执行计划</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[5, 10, 20, 100]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog :title="dialogTitle" :visible.sync="editVisible" width="40%" @close="handleDialogClose">
			<el-form :rules="rules" ref="forma" :model="forma" label-width="70px" :label-position="labelPosition">
				<el-form-item label="日期" prop="plaDate">
					<el-date-picker type="date" placeholder="选择日期" v-model="forma.plaDate" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="计划项" prop="plaTodo">
					<el-input v-model="forma.plaTodo" type="textarea"></el-input>
				</el-form-item>
				<el-form-item label="执行结果" :prop="a">
					<el-input v-model="forma.plaResult" type="textarea" :disabled="f"></el-input>
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
		name: 'baseform',
		data() {
			return {
				aaa: {
					/*chcId: localStorage.getItem('chcId'),*/
					chcStatus: '',
					/*chcCustName: localStorage.getItem('chcCustName'),
					chcTitle: localStorage.getItem('chcTitle'), //概要
					chcRate: localStorage.getItem('chcRate'), //成功几率
					chcDesc: localStorage.getItem('chcDesc'), //机会描述
					chcCreateBy: localStorage.getItem('chcCreateBy') //创建人*/

					chcId: localStorage.getItem('chcId'),
					chcSource: localStorage.getItem('chcSource'), //机会来源
					chcCustName: localStorage.getItem('chcCustName'), //客户名称
					chcRate: localStorage.getItem('chcRate'), //成功几率
					chcTitle: localStorage.getItem('chcTitle'), //概要
					chcLinkman: localStorage.getItem('chcLinkman'), //联系人
					chcTel: localStorage.getItem('chcTel'), //联系人电话
					chcDesc: localStorage.getItem('chcDesc'), //机会描述
					chcCreateBy: localStorage.getItem('chcCreateBy'), //创建人
					chcCreateDate: localStorage.getItem('chcCreateDate'), //创建时间
					chcDueTo: localStorage.getItem('chcDueTo'), //指派给
					chcDueDate: localStorage.getItem('chcDueDate'), //指派时间
				},
				a: '',
				f: 'true',
				ff: 'true',
				labelPosition: 'left',
				forma: {
					chcId: localStorage.getItem('chcId'),
					plaId: '',
					plaDate: '', //日期
					plaTodo: '', //计划项
					plaResult: ''
				},
				page: 1,
				rows: 10,
				total: 1,
				tableData: [],
				editVisible: false,
				dialogTitle: '添加',
				formb: {
					chcId: localStorage.getItem('chcId'),
					chcSource: localStorage.getItem('chcSource'), //机会来源
					chcCustName: localStorage.getItem('chcCustName'), //客户名称
					chcRate: localStorage.getItem('chcRate'), //成功几率
					chcTitle: localStorage.getItem('chcTitle'), //概要
					chcLinkman: localStorage.getItem('chcLinkman'), //联系人
					chcTel: localStorage.getItem('chcTel'), //联系人电话
					chcDesc: localStorage.getItem('chcDesc'), //机会描述
					chcCreateBy: localStorage.getItem('chcCreateBy'), //创建人
					chcCreateDate: localStorage.getItem('chcCreateDate'), //创建时间
					chcDueTo: localStorage.getItem('chcDueTo'), //指派给
					chcDueDate: localStorage.getItem('chcDueDate'), //指派时间
				},
				rules: {
					plaDate: [{
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}],
					plaTodo: [{
						required: true,
						message: '请填写内容',
						trigger: 'blur'
					}],
					plaResult: [{
						required: true,
						message: '请填写内容',
						trigger: 'blur'
					}]
				}
			};
		},
		created() {
			this.search();
		},
		methods: {
			// 删除操作
			handleDelete(index, row) {
				// 二次确认删除
				this.$confirm('确定要删除吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					})
					.then(() => {
						this.$message.success('删除成功');
						this.tableData.splice(index, 1);
						/*var url = this.axios.urls.SYS_ARTICLES_DEL;
						this.axios.post(url, {
							id: row.id
						}).then((response) => {
							console.log(response);
							this.$message({
								message: response.data.message,
								type: 'success'
							});

							this.search();
						}).catch((response) => {

						});*/
					})
					.catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
			},
			// 多选操作
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			indexMethod(index) {
				return(this.page - 1) * this.rows + (index + 1);
			},
			// 编辑操作
			handleEdit: function(index, row) {
				this.f = false;
				this.idx = index;
				this.forma = row;
				this.dialogTitle = '执行计划';
				this.editVisible = true;
				this.a = 'plaResult';
			},
			/* <!--清空文本框 --> */
			resetGergeForm: function() {
				this.$refs['forma'].resetFields();
				this.dialogTitle = '添加';
				this.forma.plaDate = null;
				this.forma.plaTodo = null;
				this.forma.plaResult = null;
				this.f = true;
				this.a = null;
			},
			handleDialogClose: function() {
				this.resetGergeForm();
			},
			//
			saveEdita(a, b) {
				let url = this.axios.urls.KF_EDIT;
				this.aaa.chcStatus = a;
				this.axios.post(url, this.aaa).then((resp) => {
					this.$message.success(b);
					this.editVisible = false;
					this.search();
				}).catch((response) => {
					console.log(response)
				})
			},
			// 保存编辑
			saveEdit() {
				this.$refs['forma'].validate((valid) => {
					if(valid) {
						let url = this.axios.urls.KF_MERAG;
						this.axios.post(url, this.forma).then((resp) => {
							this.$message.success(resp.data.message);
							this.editVisible = false;
							this.search();
						}).catch((response) => {
							console.log(response)
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});

			},
			//变动每页显示条数
			handleSizeChange: function(rows) {
				console.log("rows=%i", rows);
				this.page = 1;
				this.rows = rows;
				this.search();
			},
			//分页
			handleCurrentChange: function(page) {
				console.log("page=%i", page);
				this.page = page;
				this.search();
			},
			//绑定数据方法
			search: function() {
				/*console.log(ocalStorage.getItem('chcStatus'));
				if(ocalStorage.getItem('chcStatus') == '开发中') {
					this.ff = false;
					console.log(111);
				};*/
				var url = this.axios.urls.KF_LIST;
				var formData = {
					chcId: this.formb.chcId,
					page: this.page,
					rows: this.rows
				};
				this.axios.post(url, formData).then((response) => {
					this.tableData = response.data.result;
					this.total = response.data.total;
					//console.log(response.data.result);
				}).catch((response) => {

				});
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
		width: 150px;
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
	
	.table-td-thumb {
		display: block;
		margin: auto;
		width: 40px;
		height: 40px;
	}
</style>