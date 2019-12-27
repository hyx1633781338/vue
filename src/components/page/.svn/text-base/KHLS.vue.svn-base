<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-form ref="form" :model="form" label-width="70px">
					客户名称
					<el-input v-model="form.name" placeholder="请输入内容" class="handle-input mr10"></el-input>
					客户经理
					<el-input v-model="form.name1" placeholder="请输入内容" class="handle-input mr10"></el-input>
					<el-button type="primary" icon="el-icon-search">搜索</el-button>
				</el-form>
			</div>
			<el-table :data="tableData" height="330" border class="table" ref="multipleTable" header-cell-class-name="table-header"
			 @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
				<el-table-column prop="name" label="客户" align="center"></el-table-column>
				<el-table-column prop="name" label="客户经理" align="center">
				</el-table-column>
				<el-table-column prop="name" label="流失原因" align="center">
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

	export default {
		data() {
			return {
				form: {
					name: '',
					name1: '',
				},
				tableData: []
			};
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
					data: ['流失客户数量']
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
					data: ['2012年', '2013年', '2014年', '2015年', '2016年', '2017年', '2018年']
				}],
				yAxis: [{
					type: 'value'
				}],
				series: [{
					name: '流失客户数量',
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
				}]
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
