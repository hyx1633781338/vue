<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 员工管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>员工信息表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form ref="forma" :model="forma" label-width="70px">
                    <el-button-group>
                        <el-tooltip class="item" effect="dark" content="新增员工" placement="top-start">
                            <el-button type="primary" icon="el-icon-lx-add" class="handle-del mr10"
                                       @click="editVisible=true,nul=false"></el-button>
                        </el-tooltip>
                    </el-button-group>
                    员工账号
                    <el-input v-model="forma.adminNumber" placeholder="请输入内容" class="handle-input mr10"></el-input>
                    员工姓名
                    <el-input v-model="forma.adminName" placeholder="请输入内容" class="handle-input mr10"></el-input>
                    员工电话
                    <el-input v-model="forma.adminPhone" placeholder="请输入内容" class="handle-input mr10"></el-input>
                    <el-select v-model="forma.departmentName" placeholder="部门名称" class="handle-select mr10">
                        <el-option label="董事会" value="1"></el-option>
                        <el-option label="财务部" value="2"></el-option>
                        <el-option label="风控部" value="3"></el-option>
                        <el-option label="产品部" value="4"></el-option>
                        <el-option label="运营部" value="5"></el-option>
                        <el-option label="程序员" value="6"></el-option>
                    </el-select>
                    <el-select v-model="forma.state" placeholder="状态" class="handle-select mr10">
                        <el-option key="正常" label="正常" value="正常"></el-option>
                        <el-option key="非正常" label="非正常" value="非正常"></el-option>
                    </el-select>
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                </el-form>
            </div>

            <el-table :data="tableData" height="330" border class="table" ref="multipleTable"
                      header-cell-class-name="table-header" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column type="index" label="ID" width="40" align="center"
                                 :index="indexMethod"></el-table-column>
                <el-table-column prop="adminNumber" label="员工账号" align="center" width="200"></el-table-column>
                <el-table-column prop="adminName" label="员工姓名" align="center" width="200">
                </el-table-column>
                <el-table-column prop="adminPhone" label="员工电话" align="center">
                </el-table-column>
                <el-table-column prop="departmentName" label="部门" align="center"></el-table-column>
                <el-table-column prop="createDate" label="创建时间" align="center" width="180"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.state==='正常'?'success':(scope.row.state==='非正常'?'danger':'')">
                            {{scope.row.state}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="280" align="center">
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
                <el-form-item label="员工账号">
                    <el-form-item prop="adminNumber">
                        <el-input v-model="formb.adminNumber" :disabled="nul"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="员工姓名">
                    <el-col :span="10">
                        <el-form-item prop="adminName">
                            <el-input v-model="formb.adminName" :disabled="nul"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="4">
                        <center>员工电话</center>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item prop="adminPhone">
                            <el-input v-model="formb.adminPhone" :disabled="nul"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="员工描述">
                    <el-form-item prop="adminDescribe">
                        <el-input type="textarea" v-model="formb.adminDescribe"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="部门">
                    <el-col :span="10">
                        <el-select v-model="formb.departmentName" placeholder="请选择部门">
                            <el-option label="董事会" value="1"></el-option>
                            <el-option label="财务部" value="2"></el-option>
                            <el-option label="风控部" value="3"></el-option>
                            <el-option label="产品部" value="4"></el-option>
                            <el-option label="运营部" value="5"></el-option>
                            <el-option label="程序员" value="6"></el-option>
                        </el-select>
                    </el-col>
                    <el-col class="line" :span="4">
                        <center>创建时间</center>
                    </el-col>
                    <el-col :span="10">
                        <el-input v-model="formb.createDate" :disabled="true"></el-input>
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
                    adminNumber: '', //员工账号
                    adminName: '', //员工姓名
                    adminPhone: '', //员工电话
                    departmentName: '', //部门名称
                    state: '', //状态
                    page: 1,
                    rows: 10
                },
                total: 1,
                tableData: [],
                editVisible: false,
                dialogTitle: '添加',
                nul: "",
                formb: {
                    adminId: '', //员工ID
                    adminNumber: '', //员工账号
                    adminPassword: '', //员工密码
                    salt: '', //盐
                    adminDepartmentId: '', //部门ID
                    adminName: '', //员工姓名
                    adminPhone: '', //员工电话
                    adminDescribe: '', //员工描述
                    state: '', //状态
                    createDate: '',//创建时间
                    departmentName: '' //部门名称
                },
                rules: {
                    adminPhone: [{
                        required: true,
                        message: '请填写内容',
                        trigger: 'blur'
                    },
                        {
                            min: 11,
                            max: 11,
                            message: '长度在11个字符',
                            trigger: 'blur'
                        }
                    ],
                    adminNumber: [{
                        required: true,
                        message: '请填写内容',
                        trigger: 'blur'
                    }],
                    adminName: [{
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
                this.formb.adminNumber = null;
                this.formb.adminName = null;
                this.formb.adminPhone = null;
                this.formb.adminDescribe = null;
                this.formb.state = null;
                this.formb.createDate = null;
                this.formb.departmentName = null;
                this.search();
            },
            handleDialogClose: function() {
                this.resetGergeForm();
            },
            // 保存编辑
            saveEdit() {
                this.$refs['formb'].validate((valid) => {
                    if (valid) {
                        let url = this.axios.urls.ADMIN_UPDATE;
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
            // 获取当前时间函数
            timeFormate(timeStamp) {
                let year = new Date(timeStamp).getFullYear();
                let month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
                let date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
                let hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
                let mm = new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
                if(this.formb.createDate==""||this.formb.createDate==null){
                    this.formb.createDate = year + '年' + month + '月' + date + '日' + ' ' + hh + ':' + mm;
                }
            },
            // 定时器函数
            nowTimes() {
                this.timeFormate(new Date());
                setInterval(this.nowTimes, 30 * 1000);
            },
            //绑定数据方法
            search: function() {
                var url = this.axios.urls.ADMIN_LIST;
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