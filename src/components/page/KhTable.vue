<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i> 客户管理
				</el-breadcrumb-item>
				<el-breadcrumb-item>客户信息表格</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-form ref="forma" :model="forma" label-width="70px">
					<el-button-group>
						<el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
						<el-tooltip class="item" effect="dark" content="新增客户信息" placement="top-start">
							<el-button type="primary" icon="el-icon-lx-add" class="handle-del mr10" @click="editVisible=true"></el-button>
						</el-tooltip>
					</el-button-group>
					客户名称
					<el-input v-model="forma.custName" placeholder="请输入内容" class="handle-input mr10"></el-input>
					地区
					<el-input v-model="forma.custRegion" placeholder="请输入内容" class="handle-input mr10"></el-input>
					客户等级
					<el-input v-model="forma.custLevel" placeholder="请输入内容" class="handle-input mr10"></el-input>
					<el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
				</el-form>
			</div>
			<el-table :data="tableData" height="330" border class="table" ref="multipleTable" header-cell-class-name="table-header" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column type="index" label="ID" width="55" align="center" :index="indexMethod"></el-table-column>
				<el-table-column prop="custName" label="客户名称" align="center"></el-table-column>
				<el-table-column prop="custRegion" label="地区" align="center"></el-table-column>
				<el-table-column prop="custLevelLabel" label="客户等级" align="center"></el-table-column>
				<el-table-column prop="custSatisfy" label="客户信用度" align="center"></el-table-column>
				<el-table-column label="状态" align="center">
					<template slot-scope="scope">
						<el-tag :type="scope.row.custStatus==='正常'?'success':(scope.row.custStatus==='非正常'?'danger':'')">{{scope.row.custStatus}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="250" align="center">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" @click="khXq(scope.row)">详细信息</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :current-page="currentPage4" :page-sizes="[10, 50, 100, 200]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog title="新增客户" :visible.sync="editVisible" width="60%" @close="handleDialogClose">
			<el-form :rules="rules" ref="formb" :model="formb" label-width="80px" label-position="left">
				<el-form-item label="名称">
					<el-form-item prop="custName">
						<el-input v-model="formb.custName"></el-input>
					</el-form-item>
				</el-form-item>
				<el-form-item label="地区">
					<el-col :span="10">
						<el-form-item prop="custRegion">
							<el-input v-model="formb.custRegion"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="line" :span="4">
						<center>客户经理</center>
					</el-col>
					<el-col :span="10">
						<el-form-item prop="custManagerName">
							<el-input v-model="formb.custManagerName"></el-input>
						</el-form-item>
					</el-col>
				</el-form-item>
				<el-form-item label="客户等级">
					<el-form-item prop="custLevelLabel">
						<el-select v-model="formb.custLevelLabel" placeholder="请选择客户等级">
							<el-option label="普通客户" value="普通客户"></el-option>
							<el-option label="重点开发客户" value="重点开发客户"></el-option>
							<el-option label="大客户" value="大客户"></el-option>
							<el-option label="合作伙伴" value="合作伙伴"></el-option>
							<el-option label="战略合作伙伴" value="战略合作伙伴"></el-option>
						</el-select>
					</el-form-item>
				</el-form-item>
				<el-form-item label="客户满意度">
					<el-col :span="10">
						<el-form-item prop="custSatisfy">
							<el-select v-model="formb.custSatisfy" placeholder="请选择客户满意度">
								<el-option label="1" value="1"></el-option>
								<el-option label="2" value="2"></el-option>
								<el-option label="3" value="3"></el-option>
								<el-option label="4" value="4"></el-option>
								<el-option label="5" value="5"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col class="line" :span="4">
						<center>客户信用度</center>
					</el-col>
					<el-col :span="10">
						<el-form-item prop="custCredit">
							<el-select v-model="formb.custCredit" placeholder="请选择客户信用度">
								<el-option label="1" value="1"></el-option>
								<el-option label="2" value="2"></el-option>
								<el-option label="3" value="3"></el-option>
								<el-option label="4" value="4"></el-option>
								<el-option label="5" value="5"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-form-item>

				<el-form-item label="地址">
					<el-col :span="10">
						<el-form-item prop="custAddr">
							<el-input v-model="formb.custAddr"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="line" :span="4">
						<center>邮政编码</center>
					</el-col>
					<el-col :span="10">
						<el-form-item prop="custZip">
							<el-input v-model="formb.custZip"></el-input>
						</el-form-item>
					</el-col>
				</el-form-item>
				<el-form-item label="电话">
					<el-col :span="10">
						<el-form-item prop="custTel">
							<el-input v-model="formb.custTel"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="line" :span="4">
						<center>传真</center>
					</el-col>
					<el-col :span="10">
						<el-form-item prop="custFax">
							<el-input v-model="formb.custFax"></el-input>
						</el-form-item>
					</el-col>
				</el-form-item>
				<el-form-item label="网址">
					<el-form-item prop="custWebsite">
						<el-input v-model="formb.custWebsite"></el-input>
					</el-form-item>
				</el-form-item>
				<el-form-item label="营业执照注册号">
					<el-col :span="10">
						<el-input v-model="formb.custLicenceNo"></el-input>
					</el-col>
					<el-col class="line" :span="4">
						<center>法人</center>
					</el-col>
					<el-col :span="10">
						<el-form-item prop="custChieftain">
							<el-input v-model="formb.custChieftain"></el-input>
						</el-form-item>
					</el-col>
				</el-form-item>
				<el-form-item label="注册资金(万元)">
					<el-col :span="10">
						<el-input v-model="formb.custBankroll"></el-input>
					</el-col>
					<el-col class="line" :span="4">
						<center>年营业额</center>
					</el-col>
					<el-col :span="10">
						<el-input v-model="formb.custTurnover"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="开户银行">
					<el-col :span="10">
						<el-form-item prop="custBank">
							<el-input v-model="formb.custBank"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="line" :span="4">
						<center>银行账号</center>
					</el-col>
					<el-col :span="10">
						<el-form-item prop="custBankAccount">
							<el-input v-model="formb.custBankAccount"></el-input>
						</el-form-item>
					</el-col>
				</el-form-item>
				<el-form-item label="地税登记号">
					<el-col :span="10">
						<el-input v-model="formb.custLocalTaxNo"></el-input>
					</el-col>
					<el-col class="line" :span="4">
						<center>国税登记号</center>
					</el-col>
					<el-col :span="10">
						<el-input v-model="formb.custNationalTaxNo"></el-input>
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
				labelPosition: 'left',
				total: 1,
				tableData: [],
				editVisible: false,
				forma: {
					custName: '',
					custRegion: '',
					custLevel: '',
					page: 1,
					rows: 10
				},
				formb: {
					custId: '',
					custName: '',
					custRegion: '',
					custManagerName: '',
					custLevelLabel: '',
					custSatisfy: '',
					custCredit: '',
					custAddr: '',
					custZip: '',
					custTel: '',
					custFax: '',
					custWebsite: '',
					custLicenceNo: '',
					custChieftain: '',
					custBankroll: '',
					custTurnover: '',
					custBank: '',
					custBankAccount: '',
					custLocalTaxNo: '',
					custNationalTaxNo: '',
					custStatus: '正常'
				},
				rules: {
					custName: [{
							required: true,
							message: '请填写内容',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 20,
							message: '长度在 3 到 20 个字符',
							trigger: 'blur'
						}
					],
					custRegion: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}],
					custManagerName: [{
						required: true,
						message: '请填写内容',
						trigger: 'blur'
					}],
					custLevelLabel: [{
						required: true,
						message: '请选择客户等级',
						trigger: 'change'
					}],
					custSatisfy: [{
						required: true,
						message: '请选择客户满意度',
						trigger: 'change'
					}],
					custCredit: [{
						required: true,
						message: '请选择客户信用度',
						trigger: 'change'
					}],
					custAddr: [{
						required: true,
						message: '请填写内容',
						trigger: 'blur'
					}],
					custZip: [{
						required: true,
						message: '请填写内容',
						trigger: 'blur'
					}],
					custTel: [{
						required: true,
						message: '请填写内容',
						trigger: 'blur'
					}],
					custFax: [{
						required: true,
						message: '请填写内容',
						trigger: 'blur'
					}],
					custWebsite: [{
						required: true,
						message: '请填写内容',
						trigger: 'blur'
					}],
					custChieftain: [{
						required: true,
						message: '请填写内容',
						trigger: 'blur'
					}],
					custBank: [{
						required: true,
						message: '请填写内容',
						trigger: 'blur'
					}],
					custBankAccount: [{
						required: true,
						message: '请填写内容',
						trigger: 'blur'
					}]
				},
				query: {
					address: '',
					name: '',
					pageIndex: 1,
					pageSize: 10
				},
				multipleSelection: [],
				delList: [],
				pageTotal: 0,
				form: {},
				idx: -1,
				id: -1
			};
		},
		created() {
			this.search();
		},
		methods: {
			//客户信息详情
			khXq(row) {
				localStorage.removeItem('custIda');
				localStorage.removeItem('custName');
				localStorage.removeItem('custRegion');
				localStorage.removeItem('custManagerName');
				localStorage.removeItem('custSatisfy');
				localStorage.removeItem('custLevelLabel');
				localStorage.removeItem('custCredit');
				localStorage.removeItem('custAddr');
				localStorage.removeItem('custZip');
				localStorage.removeItem('custTel');
				localStorage.removeItem('custFax');
				localStorage.removeItem('custWebsite');
				localStorage.removeItem('custLicenceNo');
				localStorage.removeItem('custChieftain');
				localStorage.removeItem('custWebsite');
				localStorage.removeItem('custBankroll');
				localStorage.removeItem('custTurnover');
				localStorage.removeItem('custBank');
				localStorage.removeItem('custBankAccount');
				localStorage.removeItem('custLocalTaxNo');
				localStorage.removeItem('custNationalTaxNo');
				this.formb = row;
				localStorage.setItem('custIda', row.custId);
				localStorage.setItem('custName', this.formb.custName);
				localStorage.setItem('custRegion', this.formb.custRegion);
				localStorage.setItem('custManagerName', this.formb.custManagerName);
				localStorage.setItem('custSatisfy', this.formb.custSatisfy);
				localStorage.setItem('custLevelLabel', this.formb.custLevelLabel);
				localStorage.setItem('custCredit', this.formb.custCredit);
				localStorage.setItem('custAddr', this.formb.custAddr);
				localStorage.setItem('custZip', this.formb.custZip);
				localStorage.setItem('custTel', this.formb.custTel);
				localStorage.setItem('custFax', this.formb.custFax);
				localStorage.setItem('custWebsite', this.formb.custWebsite);
				localStorage.setItem('custLicenceNo', this.formb.custLicenceNo);
				localStorage.setItem('custChieftain', this.formb.custChieftain);
				localStorage.setItem('custBankroll', this.formb.custBankroll);
				localStorage.setItem('custTurnover', this.formb.custTurnover);
				localStorage.setItem('custBank', this.formb.custBank);
				localStorage.setItem('custBankAccount', this.formb.custBankAccount);
				localStorage.setItem('custLocalTaxNo', this.formb.custLocalTaxNo);
				localStorage.setItem('custNationalTaxNo', this.formb.custNationalTaxNo);
				this.$router.push({
					path: 'khxq'
				})
			},
			// 触发搜索按钮
			handleSearch() {
				this.search();
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
				this.formb.custId = null;
				this.formb.custName = null;
				this.formb.custRegion = null;
				this.formb.custManagerName = null;
				this.formb.custLevelLabel = null;
				this.formb.custSatisfy = null;
				this.formb.custCredit = null;
				this.formb.custAddr = null;
				this.formb.custZip = null;
				this.formb.custTel = null;
				this.formb.custFax = null;
				this.formb.custWebsite = null;
				this.formb.custLicenceNo = null;
				this.formb.custChieftain = null;
				this.formb.custBankroll = null;
				this.formb.custTurnover = null;
				this.formb.custBank = null;
				this.formb.custBankAccount = null;
				this.formb.custLocalTaxNo = null;
				this.formb.custNationalTaxNo = null;
			},
			handleDialogClose: function() {
				this.resetGergeForm();
			},
			// 添加客户
			saveEdit() {
				this.$refs['formb'].validate((valid) => {
					if(valid) {
						let url = this.axios.urls.KH_ADD;
						this.axios.post(url, this.formb).then((resp) => {
							this.$message.success(resp.data.message);
							this.handleDialogClose();
							//this.editVisible = false;
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
			indexMethod(index) {
				return(this.forma.page - 1) * this.forma.rows + (index + 1);
			},
			// 分页导航
			handlePageChange(val) {
				this.$set(this.query, 'pageIndex', val);
				this.getData();
			},
			//变动每页显示条数
			/*handleSizeChange: function(rows) {
				console.log("rows=%i", rows);
				this.page = 1;
				this.rows = rows;
				this.search();
			},*/
			//分页
			/*handleCurrentChange: function(page) {
				console.log("page=%i", page);
				this.page = page;
				this.search();
			},*/
			//绑定数据方法
			search: function() {
				var url = this.axios.urls.KH_LIST;
				this.axios.post(url, this.forma).then((response) => {
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