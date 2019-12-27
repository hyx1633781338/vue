<template>
	<div>
		<div class="container"  >
			<div class="handle-box" style="width:100%; height:50px">
				<el-form :rules="rules" ref="form" :model="form" label-width="70px" :inline="true">
					<el-form-item label="">
						<el-button-group>
							<el-button :type="form.atype" @click="year()">年</el-button>
							<el-button :type="form.btype" @click="month()">月</el-button>
							<el-button :type="form.ctype" @click="day()">日</el-button>
						</el-button-group>
					</el-form-item>
					<el-form-item label="时间">
						<el-col :span="11">
							<el-form-item :prop="form.a">
							<el-date-picker v-model="form.datea" :type="form.dtype" :placeholder="form.placeholder"></el-date-picker>
							</el-form-item >
						</el-col>
						<el-col class="line" :span="2">
							<center>-</center>
						</el-col>
						<el-col :span="11">
							<el-form-item :prop="form.b">
							<el-date-picker v-model="form.dateb" :type="form.dtype" :placeholder="form.placeholder"></el-date-picker>
							</el-form-item >
						</el-col>
					</el-form-item>
					<el-button type="primary" icon="el-icon-search"  @click="saveEdit()">搜索</el-button>
				</el-form>
			</div>
		</div>
		<div class="container">
			<div id="echartContainer" style="width:100%; height:400px"></div>
		</div>
	</div>
</template>

<script>
	var echarts = require('echarts');

	export default {
		data() {
			return {
				form: {
					a:'datea',
					b:'dateb',
					atype: 'success',
					btype: '',
					ctype: '',
					dtype: 'year',
					placeholder: '选择年',
					datea: '',
					dateb: '',
					datec: '',
					dated: '',
					datee: '',
					datef: ''
				},
				rules: {
					datea: [{
						required: true,
						message:'请选择内容',
						trigger: 'change'
					}],
					dateb: [{
						required: true,
						message: '请选择内容',
						trigger: 'change'
					}],
				}
			};
		},
		methods: {
			year() {
				this.form.dtype = "year";
				this.form.placeholder = "选择年";
				this.form.atype = "success";
				this.form.btype = null;
				this.form.ctype = null;
				this.form.datea = null;
				this.form.dateb = null;
				this.form.a = "datea";
				this.form.b = "dateb";
				this.$refs['form'].resetFields();
			},
			month() {
				this.form.dtype = "month";
				this.form.placeholder = "选择月";
				this.form.atype = null;
				this.form.btype = "success";
				this.form.ctype = null;
				this.form.datea = null;
				this.form.dateb= null;
				this.form.a = "datea";
				this.form.b = "dateb";
				this.$refs['form'].resetFields();
			},
			day() {
				this.form.dtype = "date";
				this.form.placeholder = "选择日";
				this.form.atype = null;
				this.form.btype = null;
				this.form.ctype = "success";
				this.form.datea = null;
				this.form.dateb = null;
				this.form.a = "datea";
				this.form.b = "dateb";
				this.$refs['form'].resetFields();
			},
			// 搜索
			saveEdit() {
				this.$refs['form'].validate((valid) => {
					if(valid) {
						console.log(this.form.datea+'-'+this.form.dateb);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
			
		},
		mounted() {
			// 基于准备好的dom，初始化echarts实例
			var myChart = echarts.init(document.getElementById('echartContainer'));
			// 绘制图表
			myChart.setOption({
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['建议', '咨询', '投诉']
				},
				toolbox: {
					show: true,
					feature: {
						mark: {
							show: true
						},
						dataView: {
							show: true,
							readOnly: false
						},
						magicType: {
							show: true,
							type: ['line', 'bar', 'stack', 'tiled']
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
					}
				},
				calculable: true,
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月']
				}],
				yAxis: [{
					type: 'value'
				}],
				series: [{
						name: '建议',
						type: 'line',
						stack: '总量',
						itemStyle: {
							normal: {
								areaStyle: {
									type: 'default'
								}
							}
						},
						data: [300, 200, 101, 134, 90, 230, 210]
					},
					{
						name: '咨询',
						type: 'line',
						stack: '总量',
						itemStyle: {
							normal: {
								areaStyle: {
									type: 'default'
								}
							}
						},
						data: [300, 182, 191, 234, 290, 330, 310]
					},
					{
						name: '投诉',
						type: 'line',
						stack: '总量',
						itemStyle: {
							normal: {
								areaStyle: {
									type: 'default'
								}
							}
						},
						data: [100, 232, 201, 154, 190, 330, 410]
					},
				]
			});
		}
	}
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