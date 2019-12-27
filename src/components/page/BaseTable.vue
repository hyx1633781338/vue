<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i> 营销管理
				</el-breadcrumb-item>
				<el-breadcrumb-item>销售机会表格</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-form ref="forma" :model="forma" label-width="70px">
					<el-button-group>
						<el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
						<el-tooltip class="item" effect="dark" content="新增销售机会" placement="top-start">
							<el-button type="primary" icon="el-icon-lx-add" class="handle-del mr10" @click="editVisible=true"></el-button>
						</el-tooltip>
					</el-button-group>
					<el-select v-model="forma.chcStatus" placeholder="状态" class="handle-select mr10">
						<el-option key="1" label="未分配" value="未分配"></el-option>
						<el-option key="2" label="开发中" value="开发中"></el-option>
						<el-option key="3" label="开发成功" value="开发成功"></el-option>
						<el-option key="4" label="开发失败" value="开发失败"></el-option>
						<el-option key="5" label="所有状态" value=""></el-option>
					</el-select>
					客户名称
					<el-input v-model="forma.chcCustName" placeholder="请输入内容" class="handle-input mr10"></el-input>
					概要
					<el-input v-model="forma.chcTitle" placeholder="请输入内容" class="handle-input mr10"></el-input>
					联系人
					<el-input v-model="forma.chcLinkman" placeholder="请输入内容" class="handle-input mr10"></el-input>
					<el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
				</el-form>
			</div>
			<el-table :data="tableData" height="330" border class="table" ref="multipleTable" header-cell-class-name="table-header" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column type="index" label="ID" width="40" align="center" :index="indexMethod"></el-table-column>
				<el-table-column prop="chcCustName" label="客户名称" align="center" width="200"></el-table-column>
				<el-table-column prop="chcTitle" label="概要" align="center" width="200">
				</el-table-column>
				<el-table-column prop="chcLinkman" label="联系人" align="center">
				</el-table-column>
				<el-table-column prop="chcTel" label="联系人电话" align="center"></el-table-column>
				<el-table-column prop="chcCreateDate" label="创建时间" align="center" width="180"></el-table-column>
				<el-table-column label="状态" align="center">
					<template slot-scope="scope">
						<el-tag :type="scope.row.chcStatus==='开发成功'?'success':(scope.row.chcStatus==='开发失败'?'danger':'')">{{scope.row.chcStatus}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="280" align="center">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button type="primary" icon="" class="" @click="kfjh(scope.row)">开发计划</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 50, 100, 200]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog :title="dialogTitle" :visible.sync="editVisible" width="40%" @close="handleDialogClose">
			<el-form :model="formb" label-width="70px" :rules="rules" ref="formb" :label-position="labelPosition" class="demo-ruleForm">
				<el-form-item label="机会来源">
					<el-input v-model="formb.chcSource"></el-input>
				</el-form-item>
				<el-form-item label="客户名称">
					<el-col :span="10">
						<el-form-item prop="chcCustName">
							<el-input v-model="formb.chcCustName"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="line" :span="4">
						<center>成功几率</center>
					</el-col>
					<el-col :span="10">
						<el-form-item prop="chcRate">
							<el-input v-model="formb.chcRate"></el-input>
						</el-form-item>
					</el-col>
				</el-form-item>
				<el-form-item label="概要">
					<el-form-item prop="chcTitle">
						<el-input v-model="formb.chcTitle"></el-input>
					</el-form-item>
				</el-form-item>
				<el-form-item label="联系人">
					<el-col :span="9">
						<el-input v-model="formb.chcLinkman"></el-input>
					</el-col>
					<el-col class="line" :span="5">
						<center>联系人电话</center>
					</el-col>
					<el-col :span="10">
						<el-input v-model="formb.chcTel"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="机会描述">
					<el-form-item prop="chcDesc">
						<el-input type="textarea" v-model="formb.chcDesc"></el-input>
					</el-form-item>
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
						<el-select v-model="formb.chcDueTo" placeholder="请选择客户经理">
							<el-option label="hyx" value="hyx"></el-option>
							<el-option label="lcy" value="lcy"></el-option>
							<el-option label="slt" value="slt"></el-option>
						</el-select>
					</el-col>
					<el-col class="line" :span="4">
						<center>指派时间</center>
					</el-col>
					<el-col :span="10">
						<el-input v-model="formb.chcDueDate" :disabled="true"></el-input>
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
				idx: -1,
				id: -1,
				labelPosition: 'left',
				forma: {
					chcCustName: '', //客户名称
					chcTitle: '', //概要
					chcLinkman: '', //联系人
					chcStatus: '', //状态
					page: 1,
					rows: 10
				},
				total: 1,
				tableData: [],
				editVisible: false,
				dialogTitle: '添加',
				formb: {
					chcId: '',
					chcSource: '', //机会来源
					chcCustName: '', //客户名称
					chcRate: '', //成功几率
					chcTitle: '', //概要
					chcLinkman: '', //联系人
					chcTel: '', //联系人电话
					chcDesc: '', //机会描述
					chcCreateBy: localStorage.getItem('name'), //创建人
					chcCreateDate: '', //创建时间
					chcDueTo: '请选择', //指派给
					chcDueDate: '', //指派时间
				},
				rules: {
					chcCustName: [{
							required: true,
							message: '请填写内容',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 10,
							message: '长度在 3 到 10 个字符',
							trigger: 'blur'
						}
					],
					chcRate: [{
						required: true,
						message: '请填写内容',
						trigger: 'blur'
					}],
					chcTitle: [{
						required: true,
						message: '请填写内容',
						trigger: 'blur'
					}],
					chcDesc: [{
						required: true,
						message: '请填写内容',
						trigger: 'blur'
					}]
				}
			}

		},
		created() {
			this.nowTimes();
			this.search();
		},
		methods: {
			// 触发搜索按钮
			handleSearch() {
				this.search();
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
			//变动每页显示条数
			handleSizeChange: function(rows) {
				console.log("rows=%i", rows);
				this.forma.page = 1;
				this.forma.rows = rows;
				this.search();
			},
			//分页
			handleCurrentChange: function(page) {
				console.log("page=%i", page);
				this.forma.page = page;
				this.search();
			},
			indexMethod(index) {
				return(this.forma.page - 1) * this.forma.rows + (index + 1);
			},
			// 编辑操作
			handleEdit: function(index, row) {
				this.idx = index;
				this.formb = row;
				this.dialogTitle = '编辑';
				this.editVisible = true;

			},
			//开发计划
			kfjh: function(row) {
				localStorage.removeItem('chcId');
				localStorage.removeItem('chcSource');
				localStorage.removeItem('chcCustName');
				localStorage.removeItem('chcRate');
				localStorage.removeItem('chcTitle');
				localStorage.removeItem('chcLinkman');
				localStorage.removeItem('chcTel');
				localStorage.removeItem('chcDesc');
				localStorage.removeItem('chcCreateBy');
				localStorage.removeItem('chcCreateDate');
				localStorage.removeItem('chcDueTo');
				localStorage.removeItem('chcDueDate');
				localStorage.removeItem('chcStatus');
				this.formb = row;
				localStorage.setItem('chcId', this.formb.chcId);
				localStorage.setItem('chcSource', this.formb.chcSource);
				localStorage.setItem('chcCustName', this.formb.chcCustName);
				localStorage.setItem('chcRate', this.formb.chcRate);
				localStorage.setItem('chcTitle', this.formb.chcTitle);
				localStorage.setItem('chcLinkman', this.formb.chcLinkman);
				localStorage.setItem('chcTel', this.formb.chcTel);
				localStorage.setItem('chcDesc', this.formb.chcDesc);
				localStorage.setItem('chcCreateBy', this.formb.chcCreateBy);
				localStorage.setItem('chcCreateDate', this.formb.chcCreateDate);
				localStorage.setItem('chcDueTo', this.formb.chcDueTo);
				localStorage.setItem('chcDueDate', this.formb.chcDueDate);
				localStorage.setItem('chcStatus', this.formb.chcStatus);
				this.$router.push({
					path: 'form1'
				});

			},
			/* <!--清空文本框 --> */
			resetGergeForm: function() {
				this.$refs['formb'].resetFields();
				this.dialogTitle = '添加';
				this.formb.chcSource = null;
				this.formb.chcCustName = null;
				this.formb.chcRate = null;
				this.formb.chcTitle = null;
				this.formb.chcLinkman = null;
				this.formb.chcTel = null;
				this.formb.chcDesc = null;
				this.formb.chcDueTo = null;
				this.search();
				//this.formb.creationtime = null;
				//this.formb.designate = null;
				//this.formb.designatetime = null;
				//this.nowTimes();
			},

			handleDialogClose: function() {
				this.resetGergeForm();
			},
			// 保存编辑
			saveEdit() {
				this.$refs['formb'].validate((valid) => {
					if(valid) {
						let url = this.axios.urls.YX_MERAG;
						this.axios.post(url, this.formb).then((resp) => {
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

			// 获取当前时间函数
			timeFormate(timeStamp) {
				let year = new Date(timeStamp).getFullYear();
				let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
				let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
				let hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
				let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
				// let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
				// return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
				this.formb.chcCreateDate = year + "年" + month + "月" + date + "日" + " " + hh + ":" + mm;
				this.formb.chcDueDate = year + "年" + month + "月" + date + "日" + " " + hh + ":" + mm;
				// console.log(this.nowTime);
			},
			// 定时器函数
			nowTimes() {
				this.timeFormate(new Date());
				setInterval(this.nowTimes, 30 * 1000);
			},

			//绑定数据方法
			search: function() {
				var url = this.axios.urls.YX_LIST;
				this.axios.post(url, this.forma).then((response) => {
					this.tableData = response.data.result;
					this.total = response.data.total;
					console.log(response.data.result);
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