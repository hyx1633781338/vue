<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i>催收管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>账单催收</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" style=" height:500px">
            <div class="handle-box">
                <el-form ref="forma" :model="forma" label-width="70px">
                    <el-select v-model="forma.stateb" placeholder="状态" class="handle-select mr10">
                        <el-option key="1" label="还款中" value="还款中"></el-option>
                        <el-option key="2" label="已还清" value="已还清"></el-option>
                        <el-option key="3" label="逾期" value="逾期"></el-option>
                        <el-option key="4" label="全部状态" value=""></el-option>
                    </el-select>
                    客户名称
                    <el-input v-model="forma.accountName" placeholder="请输入内容" class="handle-input mr10"></el-input>
                    身份证号码
                    <el-input v-model="forma.accountIdentityCard" placeholder="请输入内容"
                              class="handle-input mr10"></el-input>
                    电话号码
                    <el-input v-model="forma.accountNumber" placeholder="请输入内容" class="handle-input mr10"></el-input>
                    产品名字
                    <el-input v-model="forma.productName" placeholder="请输入内容" class="handle-input mr10"></el-input>

                    <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                </el-form>
            </div>
            <el-table :data="tableData" height="400" border class="table" ref="multipleTable"
                      header-cell-class-name="table-header" @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column type="index" label="ID" width="40" align="center"
                                 :index="indexMethod"></el-table-column>
                <el-table-column prop="account.accountName" label="客户名称" align="center" width="100"></el-table-column>
                <el-table-column prop="account.accountIdentityCard" label="身份证号码" align="center" width="200">
                </el-table-column>
                <el-table-column prop="account.accountNumber" label="电话号码" align="center" width="150">
                </el-table-column>
                <el-table-column prop="product.productName" label="产品名字" align="center" width="150"></el-table-column>
                <el-table-column prop="lnPeriods" label="期数" align="center"></el-table-column>
                <el-table-column prop="lnDay" label="每期天数" align="center"></el-table-column>
                <el-table-column prop="lnMoney" label="借款金额(元)" align="center" width="150"></el-table-column>
                <el-table-column prop="lnRepayment" label="总还款（元）" align="center" width="150"></el-table-column>
                <el-table-column prop="lnJdate" label="借款时间" align="center" width="150"></el-table-column>
                <el-table-column label="状态" align="center" width="120">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.stateb==='已还清'?'success':(scope.row.stateb==='逾期'?'danger':'')">
                            {{scope.row.stateb}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="280" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="" class="" @click="kfjh(scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="currentPage4" :page-sizes="[10, 20, 50, 100]" :page-size="10"
                               layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="dialogTitle" :visible.sync="editVisible" width="40%" @close="handleDialogClose">
            <el-form :model="formb" label-width="70px" :rules="rules" ref="formb" :label-position="labelPosition"
                     class="demo-ruleForm">
                <el-form-item label="指派给">
                    <el-col :span="20">
                        <el-select v-model="formb.adminb" placeholder="请选择客户经理">
                            <el-option label="hyx" value="hyx"></el-option>
                            <el-option label="lcy" value="lcy"></el-option>
                            <el-option label="slt" value="slt"></el-option>
                        </el-select>
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
                lnId: '',
                accountName: '',
                accountIdentityCard: '',
                accountNumber: '',
                productName: '',
                idx: -1,
                id: -1,
                labelPosition: 'left',
                forma: {
                    accountName: '',
                    accountIdentityCard: '',
                    accountNumber: '',
                    productName: '',
                    statea: '审核通过',
                    stateb: '',
                    page: 1,
                    rows: 10
                },
                total: 1,
                tableData: [],
                editVisible: false,
                dialogTitle: '添加',
                formb: {
                    lnId: '',
                    adminb: ''
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
            };

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
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error(`删除了${str}`);
                this.multipleSelection = [];
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
                this.dialogTitle = '指派';
                this.editVisible = true;
                this.formb.adminb = '请选择';

            },
            //账单详情
            kfjh: function(row) {
                this.$router.push({
                    path: 'zdcsxq',
                    query: {
                        lnId: row.lnId,
                        accountName: row.account.accountName,
                        accountIdentityCard: row.account.accountIdentityCard,
                        accountNumber: row.account.accountNumber,
                        productName: row.product.productName
                    }
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
                    this.$message.success('111');
                    /*if (valid) {
                        let url = this.axios.urls.SYS_LOAN_ADMINB;
                        this.axios.post(url, this.formb).then((resp) => {
                            if (resp.data.code == 0) {
                                this.$message.success(resp.data.message);
                                this.editVisible = false;
                            } else {
                                this.$message.error(resp.data.message);
                            }
                            this.search();
                        }).catch((response) => {
                            console.log(response);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }*/
                });

            },

            // 获取当前时间函数
            timeFormate(timeStamp) {
                let year = new Date(timeStamp).getFullYear();
                let month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
                let date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
                let hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
                let mm = new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
                // let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
                // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
                this.formb.chcCreateDate = year + '年' + month + '月' + date + '日' + ' ' + hh + ':' + mm;
                this.formb.chcDueDate = year + '年' + month + '月' + date + '日' + ' ' + hh + ':' + mm;
                // console.log(this.nowTime);
            },
            // 定时器函数
            nowTimes() {
                this.timeFormate(new Date());
                setInterval(this.nowTimes, 30 * 1000);
            },

            //绑定数据方法
            search: function() {
                var url = this.axios.urls.SYS_LOAN_LIST;
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