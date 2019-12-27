<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 产品管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>产品信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form ref="forma" :model="forma" label-width="70px">
                    <el-button-group>
                        <el-tooltip class="item" effect="dark" content="新增产品" placement="top-start">
                            <el-button type="primary" icon="el-icon-lx-add" class="handle-del mr10"
                                       @click="editVisible=true,nul=false"></el-button>
                        </el-tooltip>
                    </el-button-group>
                    产品名称
                    <el-input v-model="forma.productName" placeholder="请输入内容" class="handle-input mr10"></el-input>
                    <el-select v-model="forma.productState" placeholder="状态" class="handle-select mr10">
                        <el-option key="有效" label="有效" value="有效"></el-option>
                        <el-option key="无效" label="无效" value="无效"></el-option>
                    </el-select>
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                </el-form>
            </div>

            <el-table :data="tableData" height="330" border class="table" ref="multipleTable"
                      header-cell-class-name="table-header" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column type="index" label="ID" width="40" align="center"
                                 :index="indexMethod"></el-table-column>
                <el-table-column prop="productName" label="产品名称" align="center" width="200"></el-table-column>
                <el-table-column prop="productMaxMonth" label="最高月期数" align="center">
                </el-table-column>
                <el-table-column prop="productMinMonth" label="最低月期限" align="center">
                </el-table-column>
                <el-table-column prop="productMaxPeriods" label="最高期数" align="center">
                </el-table-column>
                <el-table-column prop="productMinPeriods" label="最低期数" align="center">
                </el-table-column>
                <el-table-column prop="productMaxInterest" label="最高利率（%）" align="center">
                </el-table-column>
                <el-table-column prop="productMinInterest" label="最低利率（%）" align="center"></el-table-column>
                <el-table-column prop="productMaxMoney" label="最高金额" align="center"></el-table-column>
                <el-table-column prop="productMinMoney" label="最低金额" align="center"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.productState==='有效'?'success':(scope.row.productState==='无效'?'danger':'')">
                            {{scope.row.productState}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="currentPage4" :page-sizes="[10, 50, 100, 200]" :page-size="10"
                               layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="dialogTitle" :visible.sync="editVisible" width="40%" @close="handleDialogClose">
            <el-form :model="formb" label-width="70px" :rules="rules" ref="formb" :label-position="labelPosition"
                     class="demo-ruleForm">
                <el-form-item label="产品名称">
                    <el-col :span="10">
                        <el-form-item prop="productName">
                            <el-input v-model="formb.productName" :disabled="nul"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="4">
                        <center>状态</center>
                    </el-col>
                    <el-col :span="10">
                        <el-select v-model="formb.productState" placeholder="状态">
                            <el-option label="有效" value="有效"></el-option>
                            <el-option label="无效" value="无效"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="最高月期">
                    <el-col :span="10">
                        <el-form-item prop="productMaxMonth">
                            <el-input v-model="formb.productMaxMonth" :disabled="nul"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="4">
                        <center>最低月期</center>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item prop="productMinMonth">
                            <el-input v-model="formb.productMinMonth" :disabled="nul"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="最高期数">
                    <el-col :span="10">
                        <el-form-item prop="productMaxPeriods">
                            <el-input v-model="formb.productMaxPeriods" :disabled="nul"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="4">
                        <center>最低期数</center>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item prop="productMinPeriods">
                            <el-input v-model="formb.productMinPeriods" :disabled="nul"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="最高利率">
                    <el-col :span="10">
                        <el-form-item prop="productMaxInterest">
                            <el-input v-model="formb.productMaxInterest" :disabled="nul"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="4">
                        <center>最低利率</center>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item prop="productMinInterest">
                            <el-input v-model="formb.productMinInterest" :disabled="nul"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="最高金额">
                    <el-col :span="10">
                        <el-form-item prop="productMaxMoney">
                            <el-input v-model="formb.productMaxMoney" :disabled="nul"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="4">
                        <center>最低金额</center>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item prop="productMinMoney">
                            <el-input v-model="formb.productMinMoney" :disabled="nul"></el-input>
                        </el-form-item>
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
        name: 'adminlist',
        data() {
            return {
                idx: -1,
                id: -1,
                labelPosition: 'left',
                forma: {
                    productName: '', //产品名称
                    productState: '', //状态
                    page: 1,
                    rows: 10
                },
                total: 1,
                tableData: [],
                editVisible: false,
                dialogTitle: '添加',
                nul: '',
                formb: {
                    productId: '', //产品ID
                    productName: '', //产品名称
                    productMaxMonth: '', //最高月期数
                    productMinMonth: '', //最低月期限
                    productMaxPeriods: '', //最高期数
                    productMinPeriods: '', //最低期数
                    productMaxInterest: '', //最高利率
                    productMinInterest: '', //最低利率
                    productMaxMoney: '',//最高金额
                    productMinMoney: '',//最低金额
                    productState: '' //状态
                },
                rules: {
                    productName: [{
                        required: true,
                        message: '请填写内容',
                        trigger: 'blur'
                    }],
                    productMaxMonth: [{
                        required: true,
                        message: '请填写内容',
                        trigger: 'blur'
                    }],
                    productMinMonth: [{
                        required: true,
                        message: '请填写内容',
                        trigger: 'blur'
                    }],
                    productMaxPeriods: [{
                        required: true,
                        message: '请填写内容',
                        trigger: 'blur'
                    }],
                    productMinPeriods: [{
                        required: true,
                        message: '请填写内容',
                        trigger: 'blur'
                    }],
                    productMaxInterest: [{
                        required: true,
                        message: '请填写内容',
                        trigger: 'blur'
                    }],
                    productMinInterest: [{
                        required: true,
                        message: '请填写内容',
                        trigger: 'blur'
                    }],
                    productMaxMoney: [{
                        required: true,
                        message: '请填写内容',
                        trigger: 'blur'
                    }],
                    productMinMoney: [{
                        required: true,
                        message: '请填写内容',
                        trigger: 'blur'
                    }]
                }
            };

        },
        created() {
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
            //变动每页显示条数
            handleSizeChange: function(rows) {
                console.log('rows=%i', rows);
                this.forma.page = 1;
                this.forma.rows = rows;
                this.search();
            },
            //分页
            handleCurrentChange: function(page) {
                console.log('page=%i', page);
                this.forma.page = page;
                this.search();
            },
            indexMethod(index) {
                return (this.forma.page - 1) * this.forma.rows + (index + 1);
            },
            // 编辑操作
            handleEdit: function(index, row) {
                this.idx = index;
                this.formb = row;
                this.dialogTitle = '编辑';
                this.editVisible = true;
                this.nul = false;
            },
            /* <!--清空文本框 --> */
            resetGergeForm: function() {
                this.$refs['formb'].resetFields();
                this.dialogTitle = '添加';
                this.formb.productId=null;
                this.formb.productName = null;
                this.formb.productMaxMonth = null;
                this.formb.productMinMonth = null;
                this.formb.productMaxPeriods = null;
                this.formb.productMinPeriods = null;
                this.formb.productMaxInterest = null;
                this.formb.productMinInterest = null;
                this.formb.productMaxMoney = null;
                this.formb.productMinMoney = null;
                this.formb.productState = null;
                this.search();
            },
            handleDialogClose: function() {
                this.resetGergeForm();
            },
            // 保存编辑
            saveEdit() {
                this.$refs['formb'].validate((valid) => {
                    if (valid) {
                        let url = this.axios.urls.PRODUCT_UPDATE;
                        this.axios.post(url, this.formb).then((resp) => {
                            this.$message.success(resp.data.message);
                            this.editVisible = false;
                            this.search();
                        }).catch((response) => {
                            console.log(response);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 定时器函数
            nowTimes() {
                this.timeFormate(new Date());
                setInterval(this.nowTimes, 30 * 1000);
            },
            //绑定数据方法
            search: function() {
                var url = this.axios.urls.PRODUCT_LIST;
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