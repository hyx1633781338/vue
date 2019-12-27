<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i> 客户管理
				</el-breadcrumb-item>
				<el-breadcrumb-item>服务创建</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-button-group>
					<el-button type="primary" icon="el-icon-lx-addressbook" class="handle-del mr10" @click=" lm()">提交</el-button>
				</el-button-group>
			</div>
			<el-form ref="form"  label-width="80px">
				<el-form-item label="编号">
					<el-col :span="10">
						<el-input :disabled="true" placeholder="该项为自动生成" ></el-input>
					</el-col>
					<el-col class="line" :span="4">
						<center>服务类型</center>
					</el-col>
					<el-col :span="10">
						<el-select v-model="form.svrType" placeholder="请选择" class="handle-select mr10">
							<el-option key="3" label="咨询" value="咨询"></el-option>
							<el-option key="4" label="建议" value="建议"></el-option>
							<el-option key="5" label="投诉" value="投诉"></el-option>
						</el-select>
					</el-col>
				</el-form-item>
				<el-form-item label="概要">
					<el-input v-model="form.svrTilte"></el-input>
				</el-form-item>
				<el-form-item label="客户名">
					<el-col :span="10">
						<el-input v-model="form.svrCustName"></el-input>
					</el-col>
					<el-col class="line" :span="4">
						<center>状态</center>
					</el-col>
					<el-col :span="10">
						<el-select v-model="form.svrStatus" placeholder="请选择" class="handle-select mr10">
							<el-option key="3" label="新创建" value="新创建"></el-option>
						</el-select>
					</el-col>
				</el-form-item>
				<el-form-item label="服务请求">
					<el-input v-model="form.svrRequest" type="textarea"></el-input>
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
			</el-form>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'baseform',
		data() {
			return {
				form: {
					svrType: '',
					svrTilte: '',
					svrCustName: '',
					svrStatus: '新创建',
					svrRequest: '',
					svrCreateBy:localStorage.getItem('name'),
					svrCreateDate: '自动生成'
				}
			};
		},
		created() {
			this.nowTimes;
		},
		methods: {
			//提交
			lm() {
				let url = this.axios.urls.FW_FWCJ_ADD;
				this.timeFormate(new Date());
				this.axios.post(url, this.form).then(resp => {
					if(resp.data.code === 0) {
						this.$message({
							message: '创建成功',
							type: 'success'
						});
								this.form.svrType = null,
								this.form.svrTilte = null,
								this.form.svrCustName = null,
								this.form.svrStatus = '新创建',
								this.form.svrRequest = null,
								this.form.svrCreateDate = null
					} else {
						this.$message.error('失败');
					}
				}).catch((response) => {
					console.log('嘿嘿')
				})
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
				this.form.svrCreateDate = year + "年" + month + "月" + date + "日" + " " + hh + ":" + mm;
				// console.log(this.nowTime);
			},
			
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