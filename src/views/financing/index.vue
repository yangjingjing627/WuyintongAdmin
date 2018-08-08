<template>
  <div class="app-container">
    <el-row>
      <el-col :span="3">
        <!-- 步骤条 -->
        <el-steps style='margin-top:50px' direction="vertical" :space="100" :active="1" finish-status="success">
          <el-step title="融资申请"></el-step>
          <el-step title="授信初审"></el-step>
          <el-step title="授信复审"></el-step>
          <el-step title="授信启用"></el-step>
          <el-step title="授信到期"></el-step>
        </el-steps>
      </el-col>
      <el-col :span="21">
        <el-tabs type="card">
          <el-tab-pane label="正在审批">
            <el-row :gutter="20" class="margin-bottom10">
              <el-col :span="7">
                <div class="demo-input-suffix">
                  融资申请编号：
                  <el-input placeholder=""></el-input>
                </div>
              </el-col>
              <el-col :span="7">
                <div class="demo-input-suffix">
                  企业名称：
                  <el-input width='100' placeholder="请输入内容" class="input-with-select">
                    <el-button slot="append" class="el-icon-search"></el-button>
                  </el-input>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="demo-input-suffix">
                  状态：
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-button type="primary">查询</el-button>
              <el-button type="primary">重置</el-button>
            </el-row>
            <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row @selection-change="handleSelectionChange"
            ref="multipleTable">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column align="center" label='融资申请编号' width="95">
              <template scope="scope">
                {{scope.$index}}
              </template>
            </el-table-column>
            <el-table-column label="企业名称">
              <template scope="scope">
                {{scope.row.title}}
              </template>
            </el-table-column>
            <el-table-column label="产品名称" width="95" align="center">
              <template scope="scope">
                <el-tag>{{scope.row.author}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="申请时间" width="115" align="center">
              <i class="el-icon-time"></i>
              <template scope="scope">
                {{scope.row.display_time}}
              </template>
            </el-table-column>
            <el-table-column label="初审时间" width="115" align="center">
              <i class="el-icon-time"></i>
              <template scope="scope">
                {{scope.row.display_time}}
              </template>
            </el-table-column>
            <el-table-column label="复审时间" width="115" align="center">
              <i class="el-icon-time"></i>
              <template scope="scope">
                {{scope.row.display_time}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="状态" width="100">
              <template scope="scope">
                <span>{{scope.row.pageviews}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="备注" width="100">
              <template scope="scope">
                <span>{{scope.row.pageviews}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="100">
              <template scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看企业信息</el-button>
                <!-- 此处授信批复、授信审核、修改授信批复三种状态 -->
                <el-button @click="handleCredit(scope.row)" type="text" size="small">授信批复</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页  -->
          <div class="block margin-top10">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
          </div>
          </el-tab-pane>
          <el-tab-pane label="审批记录">
            <el-row :gutter="20" class="margin-bottom10">
              <el-col :span="7">
                <div class="demo-input-suffix">
                  融资申请编号：
                  <el-input placeholder=""></el-input>
                </div>
              </el-col>
              <el-col :span="7">
                <div class="demo-input-suffix">
                  企业名称：
                  <el-input width='100' placeholder="请输入内容" class="input-with-select">
                    <el-button slot="append" class="el-icon-search"></el-button>
                  </el-input>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="demo-input-suffix">
                  状态：
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-button type="primary">查询</el-button>
              <el-button type="primary">重置</el-button>
            </el-row>
            <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row @selection-change="handleSelectionChange"
            ref="multipleTable">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column align="center" label='融资申请编号' width="95">
              <template scope="scope">
                {{scope.$index}}
              </template>
            </el-table-column>
            <el-table-column label="企业名称">
              <template scope="scope">
                {{scope.row.title}}
              </template>
            </el-table-column>
            <el-table-column label="产品名称" width="95" align="center">
              <template scope="scope">
                <el-tag>{{scope.row.author}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="申请时间" width="115" align="center">
              <i class="el-icon-time"></i>
              <template scope="scope">
                {{scope.row.display_time}}
              </template>
            </el-table-column>
            <el-table-column label="初审时间" width="115" align="center">
              <i class="el-icon-time"></i>
              <template scope="scope">
                {{scope.row.display_time}}
              </template>
            </el-table-column>
            <el-table-column label="复审时间" width="115" align="center">
              <i class="el-icon-time"></i>
              <template scope="scope">
                {{scope.row.display_time}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="状态" width="100">
              <template scope="scope">
                <span>{{scope.row.pageviews}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="备注" width="100">
              <template scope="scope">
                <span>{{scope.row.pageviews}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="100">
              <template scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看企业信息</el-button>
                <!-- 此处授信批复、授信审核、修改授信批复三种状态 -->
                <el-button @click="handleApprovalRecord(scope.row)" type="text" size="small" >审批记录</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页  -->
          <div class="block margin-top10">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
          </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <credit-approval :creditApproval="creditApproval" v-on:updateVisible="updateVisible"></credit-approval>
    <approval-record :approvalRecord="approvalRecord" v-on:recordVisible="recordVisible"></approval-record>
  </div>
</template>
<script>
import { fetchList } from '@/api/article'
import CreditApproval from './credit.approval.vue'
import ApprovalRecord from './approval.record.vue'
import EnterpriseInfo from './enterprise.info.vue'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      multipleSelection: [],
      downloadLoading: false,
      currentPage: 1,
      options: [{
        value: '全部',
        label: '全部'
      }, {
        value: '融资申请',
        label: '融资申请'
      }, {
        value: '授信初审',
        label: '授信初审'
      }, {
        value: '授信复审',
        label: '授信复审'
      }, {
        value: '退回初审',
        label: '退回初审'
      }, {
        value: '授信拒绝',
        label: '授信拒绝'
      }, {
        value: '授信启用',
        label: '授信启用'
      }, {
        value: '授信到期',
        label: '授信到期'
      }],
      value: '',
      creditApproval: {
        dialogTitle: '授信初审批复',
        visible: false
      },
      approvalRecord: {
        dialogTitle: '审批记录',
        visible: false
      }
    }
  },
  created() {
    this.fetchData()
  },
  components: {
    CreditApproval,
    ApprovalRecord,
    EnterpriseInfo
  },
  methods: {
    handleClick(row) {
      console.log(row)
      this.$router.push({ path: '/financing/enterpriseInfo' })
    },
    handleCredit(row) {
      this.creditApproval.visible = true
    },
    handleApprovalRecord(row) {
      this.approvalRecord.visible = true
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
    },
    updateVisible(flag) {
      this.creditApproval.visible = flag
    },
    recordVisible(flag) {
      this.approvalRecord.visible = flag
    },
    //  原有页面方法
    fetchData() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true
        require.ensure([], () => {
          const { export_json_to_excel } = require('vendor/Export2Excel')
          const tHeader = ['序号', '文章标题', '作者', '阅读数', '发布时间']
          const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
          const list = this.multipleSelection
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '列表excel')
          this.$refs.multipleTable.clearSelection()
          this.downloadLoading = false
        })
      } else {
        this.$message({
          message: '请至少选择一条记录',
          type: 'warning'
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>
<style scoped>
.el-input {
  width: 200px;
}
.el-select {
  width: 120px;
}
</style>
