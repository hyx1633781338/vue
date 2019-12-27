<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i> 客户管理
				</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: 'khtable' }">客户信息表格</el-breadcrumb-item>
				<el-breadcrumb-item>客户信息详情</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-button-group>
					<el-button type="primary" icon="el-icon-lx-addressbook" class="handle-del mr10" @click=" lm()">联系人</el-button>
					<el-button type="primary" icon="el-icon-lx-calendar" class="handle-del mr10" @click="jwjl()">交往记录</el-button>
					<el-button type="primary" icon="el-icon-lx-cart" class="handle-del mr10" @click="of()">历史订单</el-button>
					<el-button type="primary" icon="el-icon-lx-edit" class="handle-del mr10" @click="saveEdit()">{{bj}}</el-button>
				</el-button-group>
			</div>
			<el-form :rules="rules" ref="formb" :model="formb" label-width="80px" label-position="left">
				<el-form-item label="编号">
					<el-col :span="10">
						<el-form-item>
							<el-input v-model="formb.custId" disabled="false"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="line" :span="4">
						<center>客户名称</center>
					</el-col>
					<el-col :span="10">
						<el-form-item prop="custName">
							<el-input v-model="formb.custName" :disabled="f"></el-input>
						</el-form-item>
					</el-col>

				</el-form-item>
				<el-form-item label="地区">
					<el-col :span="10">
						<el-form-item prop="custRegion">
							<el-input v-model="formb.custRegion" :disabled="f"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="line" :span="4">
						<center>客户经理</center>
					</el-col>
					<el-col :span="10">
						<el-form-item prop="custManagerName">
							<el-input v-model="formb.custManagerName" :disabled="f"></el-input>
						</el-form-item>
					</el-col>
				</el-form-item>
				<el-form-item label="客户等级">
					<el-form-item prop="custLevelLabel">
						<el-select v-model="formb.custLevelLabel" placeholder="请选择客户等级" :disabled="f">
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
							<el-select v-model="formb.custSatisfy" placeholder="请选择客户满意度" :disabled="f">
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
							<el-select v-model="formb.custCredit" placeholder="请选择客户信用度" :disabled="f">
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
							<el-input v-model="formb.custAddr" :disabled="f"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="line" :span="4">
						<center>邮政编码</center>
					</el-col>
					<el-col :span="10">
						<el-form-item prop="custZip">
							<el-input v-model="formb.custZip" :disabled="f"></el-input>
						</el-form-item>
					</el-col>
				</el-form-item>
				<el-form-item label="电话">
					<el-col :span="10">
						<el-form-item prop="custTel">
							<el-input v-model="formb.custTel" :disabled="f"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="line" :span="4">
						<center>传真</center>
					</el-col>
					<el-col :span="10">
						<el-form-item prop="custFax">
							<el-input v-model="formb.custFax" :disabled="f"></el-input>
						</el-form-item>
					</el-col>
				</el-form-item>
				<el-form-item label="网址">
					<el-form-item prop="custWebsite">
						<el-input v-model="formb.custWebsite" :disabled="f"></el-input>
					</el-form-item>
				</el-form-item>
				<el-form-item label="营业执照注册号">
					<el-col :span="10">
						<el-input v-model="formb.custLicenceNo" :disabled="f"></el-input>
					</el-col>
					<el-col class="line" :span="4">
						<center>法人</center>
					</el-col>
					<el-col :span="10">
						<el-form-item prop="custChieftain">
							<el-input v-model="formb.custChieftain" :disabled="f"></el-input>
						</el-form-item>
					</el-col>
				</el-form-item>
				<el-form-item label="注册资金(万元)">
					<el-col :span="10">
						<el-input v-model="formb.custBankroll" :disabled="f"></el-input>
					</el-col>
					<el-col class="line" :span="4">
						<center>年营业额</center>
					</el-col>
					<el-col :span="10">
						<el-input v-model="formb.custTurnover" :disabled="f"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="开户银行">
					<el-col :span="10">
						<el-form-item prop="custBank">
							<el-input v-model="formb.custBank" :disabled="f"> </el-input>
						</el-form-item>
					</el-col>
					<el-col class="line" :span="4">
						<center>银行账号</center>
					</el-col>
					<el-col :span="10">
						<el-form-item prop="custBankAccount">
							<el-input v-model="formb.custBankAccount" :disabled="f"></el-input>
						</el-form-item>
					</el-col>
				</el-form-item>
				<el-form-item label="地税登记号">
					<el-col :span="10">
						<el-input v-model="formb.custLocalTaxNo" :disabled="f"></el-input>
					</el-col>
					<el-col class="line" :span="4">
						<center>国税登记号</center>
					</el-col>
					<el-col :span="10">
						<el-input v-model="formb.custNationalTaxNo" :disabled="f"></el-input>
					</el-col>
				</el-form-item>
			</el-form>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'baseform',
		data() {
			return {
				bj: '编辑',
				f: 'true',
				formb: {
					custId: localStorage.getItem('custIda'),
					custName: localStorage.getItem('custName'),
					custRegion: localStorage.getItem('custRegion'),
					custManagerName: localStorage.getItem('custManagerName'),
					custLevelLabel: localStorage.getItem('custLevelLabel'),
					custSatisfy: localStorage.getItem('custSatisfy'),
					custCredit: localStorage.getItem('custCredit'),
					custAddr: localStorage.getItem('custAddr'),
					custTel: localStorage.getItem('custTel'),
					custZip: localStorage.getItem('custZip'),
					custFax: localStorage.getItem('custFax'),
					custWebsite: localStorage.getItem('custWebsite'),
					custLicenceNo: localStorage.getItem('custLicenceNo'),
					custChieftain: localStorage.getItem('custChieftain'),
					custBankroll: localStorage.getItem('custBankroll'),
					custTurnover: localStorage.getItem('custTurnover'),
					custBank: localStorage.getItem('custBank'),
					custBankAccount: localStorage.getItem('custBankAccount'),
					custLocalTaxNo: localStorage.getItem('custLocalTaxNo'),
					custNationalTaxNo: localStorage.getItem('custNationalTaxNo'),
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
				tableData: [],
				query: {
					address: '',
					name: '',
					pageIndex: 1,
					pageSize: 10
				}
			};
		},
		created() {
			this.getData();
		},
		methods: {
			// 保存
			saveEdit() {
				if(this.bj === "编辑") {
					this.bj = '保存';
					this.f = null;
				} else {
					this.$refs['formb'].validate((valid) => {
						if(valid) {

							var url = this.axios.urls.KH_UPDATE;
							this.axios.post(url, this.formb).then((response) => {
								this.bj = '编辑';
								this.f = 'true';
								console.log(response);
								this.$message({
									message: response.data.message,
									type: 'success'
								});
								this.dialogFormVisible = false;
								this.search();
							}).catch((response) => {

							});

						} else {
							console.log('error submit!!');
							return false;
						}
					});
				}
			},
			getData() {
				fetchData(this.query).then(res => {
					this.tableData = res.list;
					this.pageTotal = res.pageTotal || 50;
				});
			},
			//联系人
			lm() {
				this.$router.push({
					path: 'linkman'
				})
			},
			//订单详情
			of () {
				this.$router.push({
					path: 'orderform'
				})
			},
			jwjl() {
				this.$router.push({
					path: 'jwjl'
				})
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