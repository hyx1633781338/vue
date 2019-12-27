<template>
    <div>
        <div class="crumbs">
          <el-breadcrumb separator="/">
                      	<el-breadcrumb-item>
                      		<i class="el-icon-lx-cascades"></i> 客户管理
                      	</el-breadcrumb-item>
                      	<el-breadcrumb-item :to="{ path: 'khtable' }">客户信息表格</el-breadcrumb-item>
          				<el-breadcrumb-item :to="{ path: 'khxq' }">客户信息详情</el-breadcrumb-item>
          				<el-breadcrumb-item :to="{ path: 'orderform' }">历史订单</el-breadcrumb-item>
						<el-breadcrumb-item>订单详情</el-breadcrumb-item>
                      </el-breadcrumb>
        </div>
        <div class="container">
            <div class="">
                <el-form ref="form" :model="form" label-width="80px" label-position="left">
                	<el-form-item label="订单编号">
                	<el-col :span="10">
                	<el-input v-model="form.name"></el-input>
                	</el-col>
                	<el-col class="line" :span="4"><center>日期</center></el-col>
                	<el-col :span="10">
                	<el-input v-model="form.name"></el-input>
                	</el-col>
                	</el-form-item>
                	<el-form-item label="送货地址">
                		<el-col :span="10">
                		<el-input v-model="form.name"></el-input>
                		</el-col>
                		<el-col class="line" :span="4"><center>总金额（元）</center></el-col>
                		<el-col :span="10">
                		<el-input v-model="form.name"></el-input>
                		</el-col>
                	</el-form-item>
                	<el-form-item label="状态">
                		<el-input v-model="form.name"></el-input>
                	</el-form-item>
                </el-form>
            </div>
        </div>
		<div class="container">
			<div class="handle-box">
				<el-button-group>
				<el-button
					type="primary"
					icon="el-icon-delete"
					class="handle-del mr10"
					@click="delAllSelection"
				>批量删除</el-button>
				<el-button
					type="primary"
					icon="el-icon-lx-add"
					class="handle-del mr10"
					@click="handleEdit(1, 1)"
				>增加商品</el-button>
				</el-button-group>
				
			</div>
		<el-table
			:data="tableData"
			height="330"
			border
			class="table"
			ref="multipleTable"
			header-cell-class-name="table-header"
			@selection-change="handleSelectionChange"
		>
			<el-table-column type="selection" width="55" align="center"></el-table-column>
			<el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
			<el-table-column prop="date" label="商品" align="center"></el-table-column>
			<el-table-column prop="address" label="数量" align="center"></el-table-column>
			<el-table-column label="单位" align="center">
				<template slot-scope="scope">
					<el-tag
						:type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
					>{{scope.row.state}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="address" label="单价(元)" align="center"></el-table-column>
	    <el-table-column prop="address" label="金额(元)" align="center"></el-table-column>
			<el-table-column label="操作" width="250" align="center">
				<template slot-scope="scope">
					<el-button
						type="primary"
						icon="el-icon-edit"
						@click="handleEdit(1, 1)"
					>编辑</el-button>
					<el-button
						type="danger"
						icon="el-icon-delete"
						class=""
						@click="handleDelete(scope.$index, scope.row)"
					>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handlePageChange"
				:current-page="currentPage4"
				:page-sizes="[5, 10, 20, 100]"
				:page-size="5"
				layout="total, sizes, prev, pager, next, jumper"
				:total="pageTotal">
			</el-pagination>
		</div>
		</div>
		
		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" :visible.sync="editVisible" width="40%">
			<el-form ref="form" :model="form" label-width="70px">
				<el-form-item label="商品">
					<el-input v-model="form.name"></el-input>
				</el-form-item>	
				<el-form-item label="数量">
					<el-input v-model="form.name"></el-input>
				</el-form-item>	
				<el-form-item label="单位">
					<el-input v-model="form.name"></el-input>
				</el-form-item>	
				<el-form-item label="单价(元)">
					<el-input v-model="form.name"></el-input>
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
	import { fetchData } from '../../api/index';
export default {
    name: 'baseform',
    data() {
    return {
		tableData: [],
		multipleSelection: [],
		delList: [],
		editVisible: false,
		pageTotal: 0,
		idx: -1,
		id: -1,
		query: {
			address: '',
			name: '',
			pageIndex: 1,
			pageSize: 10
		},
            options: [
                {
                    value: 'guangdong',
                    label: '广东省',
                    children: [
                        {
                            value: 'guangzhou',
                            label: '广州市',
                            children: [
                                {
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
                            children: [
                                {
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
                    children: [
                        {
                            value: 'changsha',
                            label: '长沙市',
                            children: [
                                {
                                    value: 'yuelu',
                                    label: '岳麓区'
                                }
                            ]
                        }
                    ]
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
       		this.pageTotal = res.pageTotal || 1;
       	});
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


