<template>
  <div class="app-container calendar-list-container">
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

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="序号" width="65">
        <template scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>

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

      <el-table-column width="110px" v-if='showAuditor' align="center" label="申请提款金额（元）">
        <template scope="scope">
          <span>{{scope.row.applyAmt}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="申请提款时间">
        <template scope="scope">
          <span>{{scope.row.applyTm}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" v-if='showAuditor' align="center" label="放款金额（元）">
        <template scope="scope">
          <span>{{scope.row.applyAmt}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="放款时间">
        <template scope="scope">
          <span>{{scope.row.loanTm}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态" width="90">
        <template scope="scope">
          <el-tag v-if="scope.row.loanState=='1'" >放款中</el-tag>
          <el-tag v-if="scope.row.loanState=='2'" >还款中</el-tag>
          <el-tag v-if="scope.row.loanState=='3'" >结束</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="250">
        <template scope="scope">
          <el-button size="small" @click="openLoanInfoToChain(scope.row,'deleted')">查看用款详情
          </el-button>
          <el-button v-if="scope.row.loanState=='1'" size="small" type="danger" @click="openLoanInfoToChain(scope.row,'draft')">确认放款
          </el-button>
          <el-button v-if="scope.row.loanState>='2'" size="small" @click="getCertification(scope.row,'draft')">查看放款凭证
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
       :page-size="listQuery.sum" layout="prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="certificationDialog">
      <el-row class='info-detail'>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">提款书编号：</el-col>
            <el-col :span="16" style="text-align: left;">{{certificationInfo.drawbookNo}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">企业名称：</el-col>
            <el-col :span="16" style="text-align: left;">{{certificationInfo.custName}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class='info-detail'>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">申请提款时间：</el-col>
            <el-col :span="16" style="text-align: left;">{{certificationInfo.applyTm}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">申请提款金额：</el-col>
            <el-col :span="16" style="text-align: left;">{{certificationInfo.applyAmt}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class='info-detail'>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">放款时间：</el-col>
            <el-col :span="16" style="text-align: left;">{{certificationInfo.loanTm}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">放款金额：</el-col>
            <el-col :span="16" style="text-align: left;">{{certificationInfo.loanAmt}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class='info-detail'>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">贷款利率：</el-col>
            <el-col :span="16" style="text-align: left;">{{certificationInfo.loanRate}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">利息：</el-col>
            <el-col :span="16" style="text-align: left;">{{certificationInfo.interest}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class='info-detail'>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">还款金额：</el-col>
            <el-col :span="16" style="text-align: left;">{{certificationInfo.repayAmt}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">还款日期：</el-col>
            <el-col :span="16" style="text-align: left;">{{certificationInfo.repayDt}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class='info-detail'>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">区块高度：</el-col>
            <el-col :span="16" style="text-align: left;">{{certificationInfo.chainHeight}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class='info-detail'>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">TX ID：</el-col>
            <el-col :span="16" style="text-align: left;">{{certificationInfo.TXID}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="certificationDialog = false">返 回</el-button>
      </div>
    </el-dialog>

<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-row class='info-detail'>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">融资申请编号：</el-col>
            <el-col :span="16" style="text-align: left;">{{certificationInfo.drawbookNo}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" style="text-align: left;">企业名称：</el-col>
            <el-col :span="18" style="text-align: left;">{{certificationInfo.custName}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class='info-detail'>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">申请提款时间：</el-col>
            <el-col :span="16" style="text-align: left;">{{certificationInfo.applyTm}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">申请提款金额：</el-col>
            <el-col :span="16" style="text-align: left;">{{certificationInfo.applyAmt}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class='info-detail'>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">放款时间：</el-col>
            <el-col :span="16" style="text-align: left;">{{certificationInfo.loanTm}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">放款金额：</el-col>
            <el-col :span="16" style="text-align: left;">{{certificationInfo.loanAmt}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class='info-detail'>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">贷款利率：</el-col>
            <el-col :span="16" style="text-align: left;">{{certificationInfo.loanRate}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">利息：</el-col>
            <el-col :span="16" style="text-align: left;">{{certificationInfo.interest}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class='info-detail'>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">还款金额：</el-col>
            <el-col :span="16" style="text-align: left;">{{certificationInfo.repayAmt}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">还款日期：</el-col>
            <el-col :span="16" style="text-align: left;">{{certificationInfo.repayDt}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="success" @click="handleModifyStatus(certificationInfo.drawbookNo)">确认
          </el-button>
        <el-button size="small" @click="dialogFormVisible = false">返 回</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList, certification, updateStatus } from '@/api/loan'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { parseTime } from '@/utils'

const calendarTypeOptions = [
      { key: '0', display_name: '全部' },
      { key: '1', display_name: '放款中' },
      { key: '2', display_name: '还款中' },
      { key: '3', display_name: '结束' }
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
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        sum: 20,
        importance: undefined,
        title: undefined,
        type: undefined
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
      statusOptions: ['published', 'draft', 'deleted'],
      certificationDialog: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '确认放款',
        create: '放款凭证'
      },
      dialogPvVisible: false,
      pvData: [],
      showAuditor: false,
      tableKey: 0,
      certificationInfo: {
        custName: '',
        drawbookNo: '',
        applyTm: '',
        applyAmt: '',
        finanName: '',
        loanTm: '',
        loanAmt: '',
        interest: '',
        loanRate: '',
        repayDt: '',
        repayAmt: '',
        chainHeight: '',
        TXID: '',
        chainTime: ''
      }
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
      fetchList(this.listQuery).then(response => {
        this.list = response.data.data.infoList
        this.total = response.data.data.pageCount
        this.listLoading = false
      })
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
    openLoanInfoToChain(row, status) {
      certification(row.drawbookNo).then(response => {
        this.certificationInfo = response.data.data
      })
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    getCertification(row, status) {
      certification(row.drawbookNo).then(response => {
        this.certificationInfo = response.data.data
      })
      this.dialogStatus = 'create'
      this.certificationDialog = true
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
    handleModifyStatus(drawbookNo) {
      this.dialogFormVisible = false
      this.listLoading = true
      updateStatus(drawbookNo).then(response => {
        this.listLoading = false
      })
    }
  }
}
</script>
