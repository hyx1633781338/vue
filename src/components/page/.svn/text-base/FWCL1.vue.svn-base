<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i> 客户管理
				</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: 'fwcl' }">服务处理</el-breadcrumb-item>
				<el-breadcrumb-item>服务处理详情</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-button-group>
					<el-button type="primary" icon="el-icon-lx-addressbook" class="handle-del mr10" @click=" lm()">提交</el-button>
				</el-button-group>
			</div>
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="编号">
					<el-col :span="10">
						<el-input v-model="form.name"></el-input>
					</el-col>
					<el-col class="line" :span="4">
						<center>服务类型</center>
					</el-col>
					<el-col :span="10">
						<el-select v-model="query.name" placeholder="请选择" class="handle-select mr10">
							<el-option key="3" label="咨询" value="咨询"></el-option>
							<el-option key="4" label="建议" value="建议"></el-option>
						</el-select>
					</el-col>
				</el-form-item>
				<el-form-item label="概要">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="客户">
					<el-col :span="10">
						<el-input v-model="form.name"></el-input>
					</el-col>
					<el-col class="line" :span="4">
						<center>状态</center>
					</el-col>
					<el-col :span="10">
						<el-select v-model="query.a" placeholder="请选择" class="handle-select mr10">
							<el-option key="3" label="新创建" value="新创建"></el-option>
							<el-option key="4" label="" value=""></el-option>
						</el-select>
					</el-col>
				</el-form-item>
				<el-form-item label="服务请求">
					<el-input v-model="form.name" type="textarea"></el-input>
				</el-form-item>
				<el-form-item label="创建人">
					<el-col :span="10">
						<el-input v-model="form.name"></el-input>
					</el-col>
					<el-col class="line" :span="4">
						<center>创建时间</center>
					</el-col>
					<el-col :span="10">
						<el-input v-model="form.name"></el-input>
					</el-col>
				</el-form-item>
				</el-form-item>
				<el-form-item label="分配给">
					<el-col :span="10">
						<el-input v-model="form.name"></el-input>
					</el-col>
					<el-col class="line" :span="4">
						<center>分配时间</center>
					</el-col>
					<el-col :span="10">
						<el-input v-model="form.name"></el-input>
					</el-col>
				</el-form-item>
			<el-form-item label="服务处理">
					<el-input v-model="form.name"  type="textarea"></el-input>
			</el-form-item>
			<el-form-item label="处理人">
				<el-col :span="10">
					<el-input v-model="form.name"></el-input>
				</el-col>
				<el-col class="line" :span="4">
					<center>处理时间</center>
				</el-col>
				<el-col :span="10">
					<el-input v-model="form.name"></el-input>
				</el-col>
			</el-form-item>
			</el-form>
		</div>


	</div>
</template>

<script>
	import {
		fetchData
	} from '../../api/index';
	export default {
		name: 'baseform',
		data() {
			return {


				tableData: [],
				editVisible: false,
				query: {
					address: '',
					name: '',
					pageIndex: 1,
					pageSize: 10,
					a:'',
				},
				options: [{
						value: 'guangdong',
						label: '广东省',
						children: [{
								value: 'guangzhou',
								label: '广州市',
								children: [{
										value: 'tianhe',
										label: '天河区'
									},
									{
										value: 'haizhu',
										label: '海珠区'
									}
								]
							},
							{
								value: 'dongguan',
								label: '东莞市',
								children: [{
										value: 'changan',
										label: '长安镇'
									},
									{
										value: 'humen',
										label: '虎门镇'
									}
								]
							}
						]
					},
					{
						value: 'hunan',
						label: '湖南省',
						children: [{
							value: 'changsha',
							label: '长沙市',
							children: [{
								value: 'yuelu',
								label: '岳麓区'
							}]
						}]
					}
				],
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: true,
					type: ['步步高'],
					resource: '小天才',
					desc: '',
					options: []
				}
			};
		},
		created() {
			this.getData();
		},
		methods: {
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
			// 多选操作
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			delAllSelection() {
				const length = this.multipleSelection.length;
				let str = '';
				this.delList = this.delList.concat(this.multipleSelection);
				for (let i = 0; i < length; i++) {
					str += this.multipleSelection[i].name + ' ';
				}
				this.$message.error(`删除了${str}`);
				this.multipleSelection = [];
			},
			// 编辑操作
			handleEdit(index, row) {
				this.idx = index;
				this.form = row;
				this.editVisible = true;
			},
			// 保存编辑
			saveEdit() {
				this.editVisible = false;
				this.$message.success(`修改第 ${this.idx + 1} 行成功`);
				this.$set(this.tableData, this.idx, this.form);
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
		width: 100%;
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
		margin-right: 100px;
	}

	.table-td-thumb {
		display: block;
		margin: auto;
		width: 40px;
		height: 40px;
	}
</style>
