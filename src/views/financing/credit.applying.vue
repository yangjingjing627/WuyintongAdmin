<template>
  <div class="app-container calendar-list-container">
    <el-row>
      <el-col :span="3">
        <!-- 步骤条 -->
        <el-steps style='margin-top:50px' direction="vertical" :space="100" :active='stepIndex' finish-status="success">
          <el-step title="融资申请"></el-step>
          <el-step title="授信初审"></el-step>
          <el-step title="授信复审"></el-step>
          <el-step title="授信启用"></el-step>
          <el-step title="授信到期"></el-step>
        </el-steps>
      </el-col>
      <el-col :span="21">
        <el-tabs type="card" @tab-click="changeTab">
          <el-tab-pane label="正在审批">
            <div class="filter-container">
              <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="融资申请编号" v-model="listQuery.supplyNo">
              </el-input>

              <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="企业名称" v-model="listQuery.custName">
              </el-input>

              <!-- <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" placeholder="状态">
                <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
                </el-option>
              </el-select> -->
              <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
            </div>
            <el-table :key='tableKey' :data="list1" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">

              <el-table-column width="150px" align="center" label="融资申请编号">
                <template scope="scope">
                  <span>{{scope.row.applyNo}}</span>
                </template>
              </el-table-column>

              <el-table-column width="100px" align="center" label="企业名称">
                <template scope="scope">
                  <span>{{scope.row.custName}}</span>
                </template>
              </el-table-column>

              <el-table-column width="100px" align="center" label="产品名称">
                <template scope="scope">
                  <span>{{scope.row.prodName}}</span>
                </template>
              </el-table-column>

              <el-table-column width="100px" align="center" label="申请时间">
                <template scope="scope">
                  <span>{{scope.row.creditDt}}</span>
                </template>
              </el-table-column>

              <el-table-column width="100px" align="center" label="初审时间">
                <template scope="scope">
                  <span>{{scope.row.firstTrialTime}}</span>
                </template>
              </el-table-column>

              <el-table-column width="100px" align="center" label="复审时间">
                <template scope="scope">
                  <span>{{scope.row.replyTrialTime}}</span>
                </template>
              </el-table-column>

              <el-table-column width="100px" align="center" label="状态">
                <template scope="scope">
                  <span>{{scope.row.creditStatus}}</span>
                </template>
              </el-table-column>

              <el-table-column width="100px" align="center" label="备注">
                <template scope="scope">
                  <span>{{scope.row.rejectReason}}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="操作" width="220">
                <template scope="scope">
                  <el-button size="small" @click="handleModifyStatus(scope.row,'deleted')">查看企业信息
                  </el-button>
                  <el-button v-if="scope.row.creditStatus=='1'" size="small" type="danger" @click="handleModifyStatus(scope.row,'draft')">授信批复
                  </el-button>
                  <el-button v-if="scope.row.creditStatus>='2'" size="small" @click="handleModifyStatus(scope.row,'draft')">修改授信批复
                  </el-button>
                </template>
              </el-table-column>

            </el-table>

            <div v-show="!listLoading" class="pagination-container">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                :page-size="listQuery.sum" layout="prev, pager, next, jumper" :total="total1">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="审批记录">
            <div class="filter-container">
              <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="融资申请编号" v-model="listQuery.supplyNo">
              </el-input>

              <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="企业名称" v-model="listQuery.custName">
              </el-input>

              <!-- <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" placeholder="状态">
                <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
                </el-option>
              </el-select> -->
              <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
            </div>
            <el-table :key='tableKey' :data="list2" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">

              <el-table-column width="150px" align="center" label="融资申请编号">
                <template scope="scope">
                  <span>{{scope.row.applyNo}}</span>
                </template>
              </el-table-column>

              <el-table-column width="150px" align="center" label="企业名称">
                <template scope="scope">
                  <span>{{scope.row.custName}}</span>
                </template>
              </el-table-column>

              <el-table-column width="150px" align="center" label="产品名称">
                <template scope="scope">
                  <span>{{scope.row.prodName}}</span>
                </template>
              </el-table-column>

              <el-table-column width="140px" align="center" label="申请时间">
                <template scope="scope">
                  <span>{{scope.row.creditDt}}</span>
                </template>
              </el-table-column>

              <el-table-column width="140px" align="center" label="初审时间">
                <template scope="scope">
                  <span>{{scope.row.firstTrialTime}}</span>
                </template>
              </el-table-column>

              <el-table-column width="140px" align="center" label="复审时间">
                <template scope="scope">
                  <span>{{scope.row.replyTrialTime}}</span>
                </template>
              </el-table-column>

              <el-table-column width="100px" align="center" label="状态">
                <template scope="scope">
                  <span>{{scope.row.creditStatus}}</span>
                </template>
              </el-table-column>

              <el-table-column width="100px" align="center" label="备注">
                <template scope="scope">
                  <span>{{scope.row.rejectReason}}</span>
                </template>
              </el-table-column>

              <!-- <el-table-column align="center" label="操作" width="220">
                <template scope="scope">
                  <el-button size="small" @click="handleModifyStatus(scope.row,'deleted')">查看企业信息
                  </el-button>
                  <el-button v-if="scope.row.creditStatus>='2'" size="small" @click="showCreditRecords(scope.row,'draft')">审批记录
                  </el-button>
                </template>
              </el-table-column> -->

            </el-table>

            <div v-show="!listLoading" class="pagination-container">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                 :page-size="listQuery.sum" layout="prev, pager, next, jumper" :total="total2">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>

      </el-col>
    </el-row>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogPvVisible">
      <el-row class='info-detail'>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">提款书编号：</el-col>
            <!-- <el-col :span="16" style="text-align: left;">{{certificationInfo.drawbookNo}}</el-col> -->
          </el-row>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPvVisible = false">返 回</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchApplyING, fetchApplyRecord, creditRecords } from '@/api/credit.applying'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { parseTime } from '@/utils'

const calendarTypeOptions = [
      { key: '0', display_name: '全部' },
      { key: '1', display_name: '融资申请' },
      { key: '2', display_name: '授信初审' },
      { key: '3', display_name: '授信复审' },
      { key: '4', display_name: '退回初审' },
      { key: '5', display_name: '授信拒绝' },
      { key: '6', display_name: '授信启用' },
      { key: '7', display_name: '授信到期' }
]

// arr to obj
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'table_demo',
  directives: {
    waves
  },
  data() {
    return {
      list1: null,
      total1: null,
      list2: null,
      total2: null,
      listLoading: true,
      listQuery: {
        page: 1,
        sum: 20,
        importance: undefined,
        applyNo: undefined,
        custName: undefined
      },
      temp: {
        id: undefined,
        importance: 0,
        remark: '',
        timestamp: 0,
        title: '',
        type: '',
        status: 'published'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogPvVisible: false,
      pvData: [],
      showAuditor: false,
      tableKey: 0,
      stepIndex: 1,
      tabIndex: 0 // 正在审批，审批记录
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      if (this.tabIndex === '0') {
        fetchApplyING(this.listQuery).then(response => {
          if (response.data.data != null) {
            this.list1 = response.data.data.list
            this.total1 = response.data.data.pageCount
          }
          this.listLoading = false
        })
      } else {
        fetchApplyRecord(this.listQuery).then(response => {
          if (response.data.data != null) {
            this.list2 = response.data.data.list
            this.total2 = response.data.data.pageCount
          }
          this.listLoading = false
        })
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.sum = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    timeFilter(time) {
      if (!time[0]) {
        this.listQuery.start = undefined
        this.listQuery.end = undefined
        return
      }
      this.listQuery.start = parseInt(+time[0] / 1000)
      this.listQuery.end = parseInt((+time[1] + 3600 * 1000 * 24) / 1000)
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    showCreditRecords(row) {
      creditRecords(row.creditReplyId).then(response => {
        console.log(response.data)
      })
      this.dialogStatus = 'create'
      this.dialogPvVisible = true
    },
    create() {
      this.temp.id = parseInt(Math.random() * 100) + 1024
      this.temp.timestamp = +new Date()
      this.temp.author = '原创作者'
      this.list1.unshift(this.temp)
      this.dialogFormVisible = false
      this.$notify({
        title: '成功',
        message: '创建成功',
        type: 'success',
        duration: 2000
      })
    },
    update() {
      this.temp.timestamp = +this.temp.timestamp
      for (const v of this.list1) {
        if (v.id === this.temp.id) {
          const index = this.list1.indexOf(v)
          this.list1.splice(index, 1, this.temp)
          break
        }
      }
      this.dialogFormVisible = false
      this.$notify({
        title: '成功',
        message: '更新成功',
        type: 'success',
        duration: 2000
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 0,
        remark: '',
        timestamp: 0,
        title: '',
        status: 'published',
        type: ''
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    changeTab(tab, event) {
      this.tabIndex = tab.index
      if (this.tabIndex === '0') {
        this.stepIndex = 2
      } else {
        this.stepIndex = 4
      }
      console.log(this.stepIndex)
      this.getList()
    }
  }
}
</script>
