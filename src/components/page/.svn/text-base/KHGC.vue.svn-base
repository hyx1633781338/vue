<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-form ref="form" :model="form" label-width="70px">
					年份
					<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" value-format="yyyy-MM-dd" style="width: 20%;"></el-date-picker>
					<el-button type="primary" icon="el-icon-search">搜索</el-button>
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
					name: '',
					date1: '',
				}
			};
		},
		mounted() {
			// 基于准备好的dom，初始化echarts实例
			var myChart = echarts.init(document.getElementById('echartContainer'));
			// 绘制图表
			myChart.setOption({
				title: {
					text: '客户构成分析',
					subtext: '2019',
					x: 'center'
				},
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					orient: 'vertical',
					x: 'left',
					data: ['战略合作伙伴', '合作伙伴', '大客户', '重点开发客户', '普通客户']
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
							type: ['pie', 'funnel'],
							option: {
								funnel: {
									x: '25%',
									width: '50%',
									funnelAlign: 'left',
									max: 1548
								}
							}
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
				series: [{
					name: '访问来源',
					type: 'pie',
					radius: '55%',
					center: ['50%', '60%'],
					data: [{
							value: 335,
							name: '战略合作伙伴'
						},
						{
							value: 310,
							name: '合作伙伴'
						},
						{
							value: 234,
							name: '大客户'
						},
						{
							value: 135,
							name: '重点开发客户'
						},
						{
							value: 1548,
							name: '普通客户'
						}
					]
				}]
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
