<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i> 客户管理
				</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: 'khleave' }">客户流失管理</el-breadcrumb-item>
				<el-breadcrumb-item>暂缓流失</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="">
				<el-form ref="forma" :model="forma" label-width="80px" label-position="left">
					<el-form-item label="编号">
						<el-col :span="10">
							<el-input v-model="forma.id"></el-input>
						</el-col>
						<el-col class="line" :span="4">
							<center>客户</center>
						</el-col>
						<el-col :span="10">
							<el-input v-model="forma.name"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="客户经理">
						<el-col :span="10">
							<el-input v-model="forma.manager"></el-input>
						</el-col>
						<el-col class="line" :span="4">
							<center>上次下单时间</center>
						</el-col>
						<el-col :span="10">
							<el-input v-model="forma.datea"></el-input>
						</el-col>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-button-group>
					<el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
					<el-button type="primary" icon="el-icon-lx-add" class="handle-del mr10" @click="editVisible=true">追加暂缓措施</el-button>
				</el-button-group>

			</div>
			<el-table :data="tableData" height="330" border class="table" ref="multipleTable" header-cell-class-name="table-header" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column type="index" label="ID" width="55" align="center" :index="indexMethod"></el-table-column>
				<el-table-column prop="datea" label="日期" align="center"></el-table-column>
				<el-table-column prop="measure" label="暂缓措施" align="center"></el-table-column>
				<el-table-column label="操作" width="250" align="center">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button type="danger" icon="el-icon-delete" class="" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :current-page="currentPage4" :page-sizes="[5, 10, 20, 100]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
				</el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog :title="dialogTitle" :visible.sync="editVisible" width="40%" @close="handleDialogClose">
			<el-form :rules="rules" ref="formb" :model="formb" label-width="70px" label-position="left">
				<el-form-item label="日期" prop="datea">
					<el-date-picker type="date" placeholder="选择日期" v-model="formb.datea" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="措施" prop="measure">
					<el-input type="textarea" v-model="formb.measure"></el-input>
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
				page: 1,
				rows: 10,
				total: 1,
				editVisible: false,
				dialogTitle: '添加',
				tableData: [{
						datea: '2019/01/12',
						measure: '确认流失'
					},
					{
						datea: '2019/01/12',
						measure: '暂缓流失'
					}
				],
				forma: {
					id:'1',
					name: '天河有限公司',
					manager: '小李',
					datea: '2019/01/12',
				},
				formb: {
					measure: '',
					datea: ''
				},
				idx: -1,
				id: -1,
				rules: {
					measure: [{
							required: true,
							message: '请填写内容',
							trigger: 'blur'
						},
						{
							min: 4,
							message: '长度在 需大于4',
							trigger: 'blur'
						}
					],
					datea: [{
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}]
				}
			};
		},
		created() {},
		methods: {
			indexMethod(index) {
				return(this.page - 1) * this.rows + (index + 1);
			},
			// 删除操作
			handleDelete(index, row) {
				// 二次确认删除
				this.$confirm('确定要删除吗？', '提示', {
						type: 'warning'
					})
					.then(() => {
						this.$message.success('删除成功');
						this.tableData.splice(index, 1);
					})
					.catch(() => {});
			},
			// 多选操作
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			delAllSelection() {
				const length = this.multipleSelection.length;
				let str = '';
				this.delList = this.delList.concat(this.multipleSelection);
				for(let i = 0; i < length; i++) {
					str += this.multipleSelection[i].name + ' ';
				}
				this.$message.error(`删除了${str}`);
				this.multipleSelection = [];
			},
			/* <!--清空文本框 --> */
			resetGergeForm: function() {
				this.$refs['formb'].resetFields();
				this.dialogTitle = '添加';
				this.formb.datea = null;
				this.formb.measure = null;
			},

			handleDialogClose: function() {
				this.resetGergeForm();
			},
			// 编辑操作
			handleEdit(index, row) {
				this.idx = index;
				this.formb = row;
				this.dialogTitle = '编辑';
				this.editVisible = true;
			},
			// 保存编辑
			saveEdit() {
				this.$refs['formb'].validate((valid) => {
					if(valid) {
						this.editVisible = false;
						this.$message.success(`修改第 ${this.idx + 1} 行成功`);
						//this.$set(this.tableData, this.idx, this.formb);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			handlePageChange(val) {
				this.$set(this.query, 'pageIndex', val);
				this.getData();
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