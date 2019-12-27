<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-form ref="form" :model="form" label-width="70px">
					客户名称
					<el-input v-model="form.name" placeholder="请输入内容" class="handle-input mr10"></el-input>
					年份
					<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" value-format="yyyy-MM-dd" style="width: 20%;"></el-date-picker>
					<el-button type="primary" icon="el-icon-search">搜索</el-button>
				</el-form>
			</div>
			<el-table :data="tableData" height="330" border class="table" ref="multipleTable" header-cell-class-name="table-header"
			 @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
				<el-table-column prop="name" label="客户名称" align="center"></el-table-column>
				<el-table-column prop="name" label="订单金额(元)" align="center">
				</el-table-column>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :current-page="currentPage4"
				 :page-sizes="[10, 50, 100, 200]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
				</el-pagination>
			</div>
		</div>
		<div class="container">
			<div id="echartContainer" style="width:100%; height:400px"></div>
		</div>
	</div>
</template>

<script>
	import {
		fetchData
	} from '../../api/index';
	var echarts = require('echarts');
	var echarts = require('echarts');

	export default {
		data() {
			return {
				form: {
					name: '',
					date1: '',
				},
				tableData: []
			};
		},
		mounted() {
			// 基于准备好的dom，初始化echarts实例
			var myChart = echarts.init(document.getElementById('echartContainer'));
			// 绘制图表
			myChart.setOption({
				title: {
					text: '2018客户贡献',
					subtext: ''
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['2018年']
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
							type: ['line', 'bar']
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
					type: 'value',
					boundaryGap: [0, 0.01]
				}],
				yAxis: [{
					type: 'category',
					data: ['其他', '太阳药业', '北京明科科技有限公司', '青鸟无限数码', '上海天河有限公司', '总收入(万)']
				}],
				series: [
					/* {
					    name:'2011年',
					    type:'bar',
					    data:[18203, 23489, 29034, 104970, 131744, 630230]
					}, */
					{
						name: '2018年',
						type: 'bar',
						data: [100, 300, 100, 200, 400, 1000]
					}
				]
			});
		},
		created() {
			this.getData();
		},
		methods: {
			// 获取 easy-mock 的模拟数据
			getData() {
				fetchData(this.query).then(res => {
					this.tableData = res.list;
					this.pageTotal = res.pageTotal || 1;
				});
			}
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
