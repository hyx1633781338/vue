<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i>财务管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>账单流水</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <div class="container">
                <div class="handle-box" style="width:100%; height:50px">
                    <el-form rules="" ref="form" :model="forma" label-width="70px" :inline="true">
                        <el-form-item label="">
                            <el-button-group>

                            </el-button-group>
                        </el-form-item>
                        <el-form-item label="时间">
                            <el-col :span="24">
                                <el-form-item :prop="form.b">
                                    <el-date-picker v-model="forma.dateb" type="month"
                                                    placeholder="选择月"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="saveEdit()">搜索</el-button>
                    </el-form>
                </div>
            </div>
            <div class="container">
                <div id="echartContainer" style="width:100%; height:400px"></div>
            </div>
        </div>
        <div class="container" style=" height:500px">
            <div class="handle-box">
                <el-form ref="forma" :model="formc" label-width="70px">
                    <el-select v-model="formc.nsState" placeholder="状态" class="handle-select mr10">
                        <el-option key="1" label="收入" value="已扣款"></el-option>
                        <el-option key="2" label="支出" value=""></el-option>
                    </el-select>
                    客户名称
                    <el-input v-model="formc.accountName" placeholder="请输入内容" class="handle-input mr10"></el-input>
                    身份证号码
                    <el-input v-model="formc.accountIdentityCard" placeholder="请输入内容"
                              class="handle-input mr10"></el-input>
                    电话号码
                    <el-input v-model="formc.accountNumber" placeholder="请输入内容" class="handle-input mr10"></el-input>
                    产品名字
                    <el-input v-model="formc.productName" placeholder="请输入内容" class="handle-input mr10"></el-input>

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
                <el-table-column prop="account.accountNumber" label="电话号码" align="center" width="200">
                </el-table-column>
                <el-table-column prop="product.productName" label="产品名字" align="center" width="200"></el-table-column>
                <el-table-column :prop="lnAmount" label="金额(元)" align="center" width="200">

                </el-table-column>
                <el-table-column :prop="lnFdate" label="时间" align="center" width="200"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="currentPage4" :page-sizes="[10, 20, 50, 100]" :page-size="10"
                               layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    var echarts = require('echarts');
    var year = '';
    var month = '';
    var data = [];
    var dataya= [];
    var datayb = [];
    export default {
        data() {
            return {
                lnAmount: 'lnAmount',
                lnFdate: 'lnFdate',
                type: 'danger',
                symbol: '-',
                tableData: [],
                total: 1,
                formb: {
                    accountName: '',
                    accountIdentityCard: '',
                    accountNumber: '',
                    productName: '',
                    statea: '审核通过',
                    stateb: '',
                    page: 1,
                    rows: 10
                },
                formc: {
                    accountName: '',
                    accountIdentityCard: '',
                    accountNumber: '',
                    productName: '',
                    statea: '审核通过',
                    stateb: '',
                    nsState: '',
                    page: 1,
                    rows: 10
                },
                id: '',
                forma: {
                    datea: '',
                    dateb: '2019-11'
                },
                form: {
                    a: 'datea',
                    b: 'dateb',
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
                }

            };
        },
        methods: {
            a() {
                data = [];
                console.log(this.forma.dateb);
                console.log(this.forma.dateb);
                year = '';
                month = '';
                year = this.forma.dateb.toString().substring(0, 4);
                month = this.forma.dateb.toString().substring(5, 7);
                console.log(year);
                console.log(month);
                var max = 0;
                if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                    max = 31;
                } else if (month == 4 || month == 6 || month == 9 || month == 11) {
                    max = 30;
                } else if (month == 2) {
                    if (year / 4 == 0 && year / 100 !== 0) {
                        max = 29;
                    } else {
                        max = 28;
                    }
                }
                for (var i = 1; i <= max; i++) {
                    data.push(month + '月' + i + '日');
                }
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('echartContainer'));
                // 绘制图表
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['支出', '收入']
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
                        data: data
                    }],
                    yAxis: [{
                        type: 'value'
                    }],
                    series: [{
                        name: '支出',
                        type: 'line',
                        stack: '总量',
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: 'default'
                                }
                            }
                        },
                        data: [300, 200, 101, 134, 90, 230, 210, 300, 200, 101, 134, 90, 230, 210, 300, 200, 101, 134, 90, 230, 210, 300, 200, 101, 134, 90, 230, 210, 100, 100, 100]
                    },
                        {
                            name: '收入',
                            type: 'line',
                            stack: '总量',
                            itemStyle: {
                                normal: {
                                    areaStyle: {
                                        type: 'default'
                                    }
                                }
                            },
                            data: [300, 182, 191, 234, 290, 330, 310, 300, 182, 191, 234, 290, 330, 300, 182, 191, 234, 290, 330, 300, 182, 191, 234, 290, 330, 300, 182, 191, 234, 290, 330]
                        }
                    ]
                });
            }, b() {
                data = [];
                dataya = [];
                console.log(this.forma.dateb);
                console.log(this.forma.dateb);
                year = '';
                month = '';
                year = this.forma.dateb.toString().substring(11, 15);
                month = this.forma.dateb.toString().substring(4, 7);
                console.log(year);
                console.log(month);
                var max = 0;
                if (month == 'Jan' || month == 'Mar' || month == 'May' || month == 'Jul' || month == 'Aug' || month == 'Oct' || month == 'Dec') {
                    max = 31;
                } else if (month == 'Apr' || month == 'Jun' || month == 'Sep' || month == 'Nov') {
                    max = 30;
                } else if (month == 'Feb') {
                    if (year / 4 == 0 && year / 100 !== 0) {
                        max = 29;
                    } else {
                        max = 28;
                    }
                }
                for (var i = 1; i <= max; i++) {
                    var a = 0;
                    if (month == 'Jan') {
                        a = 1;
                    } else if (month == 'Feb') {
                        a = 2;
                    } else if (month == 'Mar') {
                        a = 3;
                    } else if (month == 'Apr') {
                        a = 4;
                    } else if (month == 'May') {
                        a = 5;
                    } else if (month == 'Jun') {
                        a = 6;
                    } else if (month == 'Jul') {
                        a = 7;
                    } else if (month == 'Aug') {
                        a = 8;
                    } else if (month == 'Sep') {
                        a = 9;
                    } else if (month == 'Oct') {
                        a = 10;
                    } else if (month == 'Nov') {
                        a = 11;
                    } else if (month == 'Dec') {
                        a = 12;
                    }
                    data.push(a + '月' + i + '日');
                    var a=this.randomNum(40, 100)
                    var b=this.randomNum(20, 50)
                    dataya.push((100+i)*a);
                    datayb.push((100+i)*b);
                }
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('echartContainer'));
                // 绘制图表
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['支出', '收入']
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
                        data: data
                    }],
                    yAxis: [{
                        type: 'value'
                    }],
                    series: [{
                        name: '支出',
                        type: 'line',
                        stack: '总量',
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: 'default'
                                }
                            }
                        },
                        data: dataya
                    },
                        {
                            name: '收入',
                            type: 'line',
                            stack: '总量',
                            itemStyle: {
                                normal: {
                                    areaStyle: {
                                        type: 'default'
                                    }
                                }
                            },
                            data:datayb
                        }
                    ]
                });
            },
            handleSearch() {
                if ('' == this.formc.nsState) {
                    this.lnFdate = 'lnFdate';
                    this.lnAmount = 'lnAmount';
                    this.search();
                } else {
                    this.lnFdate = 'normalloanps.osWithhold';
                    this.lnAmount = 'normalloanps.nsReturn';
                    this.searchb();
                }

            },
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min)
            },
            //绑定数据方法
            search: function() {
                var url = this.axios.urls.SYS_LOAN_LIST;
                this.axios.post(url, this.formc).then((response) => {
                    this.tableData = response.data.result;

                    this.total = response.data.total;
                    console.log(response.data.result);
                }).catch((response) => {

                });
            },
            //绑定数据方法
            searchb: function() {
                var url = this.axios.urls.SYS_LOAN_ZLIST;
                this.axios.post(url, this.formc).then((response) => {
                    this.tableData = response.data.result;
                    this.total = response.data.total;
                    console.log(response.data.result);
                }).catch((response) => {

                });
            },
            // 搜索
            saveEdit() {
                this.b();

            }

        },
        mounted() {
            this.a();
        },
        created() {
            this.search();
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