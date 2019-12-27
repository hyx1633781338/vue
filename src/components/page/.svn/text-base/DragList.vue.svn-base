<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i> 仓库查看
				</el-breadcrumb-item>
				<el-breadcrumb-item>仓库信息表格</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-form ref="query" :model="query" label-width="70px">
					产品名称
					<el-input v-model="query.stkProdName" placeholder="请输入内容" class="handle-input mr10"></el-input>
					<el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
				</el-form>
			</div>
			<el-table :data="tableData" height="330" border class="table" ref="multipleTable" header-cell-class-name="table-header" >
				<el-table-column type="index" label="编号" width="55" align="center" :index="indexMethod"></el-table-column>
				<el-table-column prop="stkProdName" label="产品名称" align="center"></el-table-column>
				<el-table-column prop="stkWareHouse" label="仓库名称" align="center">
				</el-table-column>
				<el-table-column prop="stkWare" label="存放位置" align="center">
				</el-table-column>
				<el-table-column prop="stkCount" label="件数" align="center"></el-table-column>
				<el-table-column prop="stkMemo" label="备注" align="center"></el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :current-page="currentPage4" :page-sizes="[10, 50, 100, 200]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'basetable',
		data() {
			return {
				query: {
					stkProdName: '',
					page: 1,
					rows: 10
				},
				total: 0,
				tableData: []
			};
		},
		created() {
			this.handleSearch();
		},
		methods: {
			// 触发搜索按钮
			handleSearch() {
				var url = this.axios.urls.CK_CKCK_SEL;
				this.axios.post(url, this.query).then((response) => {
					//返回数据
					this.tableData = response.data.result;
					//总记录数
					this.total = response.data.total;
				}).catch((response) => {});

			},
			indexMethod(index) {
				return(this.query.page - 1) * this.query.rows + (index + 1);
			},
			//变动每页显示条数
			handleSizeChange: function(rows) {
				console.log("rows=%i", rows);
				this.query.page = 1;
				this.query.rows = rows;
				this.handleSearch();
			},
			//分页
			handlePageChange: function(page) {
				console.log("page=%i", page);
				this.query.page = page;
				this.handleSearch();
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