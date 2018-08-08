<template>
  <div class="app-container calendar-list-container">
    <!-- <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="标题" v-model="listQuery.title">
      </el-input>

      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.importance" placeholder="重要性">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>

      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" placeholder="类型">
        <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
        </el-option>
      </el-select>

      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort" placeholder="排序">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
      <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>
      <el-checkbox class="filter-item" @change='tableKey=tableKey+1' v-model="showAuditor">显示审核人</el-checkbox>
    </div> -->
    <!-- 用款申请信息 -->
    <div class="loan-apply mb10">
      <p class='title'>用款申请详情</p>
      <el-row class='info-detail'>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">融资申请编号：</el-col>
            <el-col :span="16" style="text-align: center;">1123456784567</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" style="text-align: left;">企业名称：</el-col>
            <el-col :span="18" style="text-align: center;">2013-06-15 12:00:00</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class='info-detail'>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">产品名称：</el-col>
            <el-col :span="16" style="text-align: center;">1123456784567</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" style="text-align: left;">授信额度（元）：</el-col>
            <el-col :span="18" style="text-align: center;">1123456784567</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class='info-detail'>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">剩余额度（元）：</el-col>
            <el-col :span="16" style="text-align: center;">1123456784567</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" style="text-align: left;">授信期限：</el-col>
            <el-col :span="18" style="text-align: center;">1123456784567</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class='info-detail'>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">提款书编号：</el-col>
            <el-col :span="16" style="text-align: center;">1123456784567</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" style="text-align: left;">提款书金额（元）：</el-col>
            <el-col :span="18" style="text-align: center;">1123456784567</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class='info-detail'>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">提款书生成日期：</el-col>
            <el-col :span="16" style="text-align: center;">1123456784567</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" style="text-align: left;">申请提款时间：</el-col>
            <el-col :span="18" style="text-align: center;">1123456784567</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class='info-detail'>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">申请提款金额（元）：</el-col>
            <el-col :span="16" style="text-align: center;">1123456784567</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" style="text-align: left;">区块高度：</el-col>
            <el-col :span="18" style="text-align: center;">1123456784567</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class='info-detail'>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">TX ID：</el-col>
            <el-col :span="16" style="text-align: center;">1123456784567</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" style="text-align: left;">上链时间：</el-col>
            <el-col :span="18" style="text-align: center;">1123456784567</el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="序号" type="index" width="65"></el-table-column>

      <el-table-column width="180px" align="center" label="运单号">
        <template scope="scope">
          <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="标题">
        <template scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.title}}</span>
          <el-tag>{{scope.row.type | typeFilter}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="作者">
        <template scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" v-if='showAuditor' align="center" label="审核人">
        <template scope="scope">
          <span style='color:red;'>{{scope.row.auditor}}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" label="重要性">
        <template scope="scope">
          <icon-svg v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></icon-svg>
        </template>
      </el-table-column>

      <el-table-column align="center" label="阅读数" width="95">
        <template scope="scope">
          <span class="link-type">{{scope.row.pageviews}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态" width="90">
        <template scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
          <el-button v-if="scope.row.status!='published'" size="small" type="success" @click="handleModifyStatus(scope.row,'published')">发布
          </el-button>
          <el-button v-if="scope.row.status!='draft'" size="small" @click="handleModifyStatus(scope.row,'draft')">草稿
          </el-button>
          <el-button v-if="scope.row.status!='deleted'" size="small" type="danger" @click="handleModifyStatus(scope.row,'deleted')">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container mb10">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[5,10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <div class="loan-apply mb10">
      <p class='title'>账户信息</p>
      <el-row class='info-detail'>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">账户名称：</el-col>
            <el-col :span="16" style="text-align: center;">1123456784567</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" style="text-align: left;">账号：</el-col>
            <el-col :span="18" style="text-align: center;">2013-06-15 12:00:00</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class='info-detail'>
        <el-col :span="12">
          <el-row>
            <el-col :span="8" style="text-align: left;">开户行：</el-col>
            <el-col :span="16" style="text-align: center;">1123456784567</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" style="text-align: left;"></el-col>
            <el-col :span="18" style="text-align: center;"></el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="合同编号" type="index" width="100">
        <template scope="scope">
          <span>{{scope.row.timestamp}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="合同名称">
        <template scope="scope">
          <span>{{scope.row.timestamp}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="签约平台" width="90">
        <template scope="scope">
          <el-tag :type="scope.row.statusr">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="上链时间">
        <template scope="scope">
          <span>{{scope.row.timestamp}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="区块高度">
        <template scope="scope">
          <span>{{scope.row.timestamp}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="文件哈希">
        <template scope="scope">
          <span>{{scope.row.timestamp}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="TX ID">
        <template scope="scope">
          <span>{{scope.row.timestamp}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template scope="scope">
          <span @click='handleFetchPv(scope.row)'>查看</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="类型">
          <el-select class="filter-item" v-model="temp.type" placeholder="请选择">
            <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-select class="filter-item" v-model="temp.status" placeholder="请选择">
            <el-option v-for="item in  statusOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="时间">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="标题">
          <el-input v-model="temp.title"></el-input>
        </el-form-item>

        <el-form-item label="重要性">
          <el-rate style="margin-top:8px;" v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
        </el-form-item>

        <el-form-item label="点评">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="temp.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="阅读数统计" :visible.sync="dialogPvVisible" size="small">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="渠道"> </el-table-column>
        <el-table-column prop="pv" label="pv"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList, fetchPv } from '@/api/article'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { parseTime } from '@/utils'

const calendarTypeOptions = [
      { key: 'CN', display_name: '中国' },
      { key: 'US', display_name: '美国' },
      { key: 'JP', display_name: '日本' },
      { key: 'EU', display_name: '欧元区' }
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
        limit: 5,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
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
      tableKey: 0
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
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
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
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    create() {
      this.temp.id = parseInt(Math.random() * 100) + 1024
      this.temp.timestamp = +new Date()
      this.temp.author = '原创作者'
      this.list.unshift(this.temp)
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
      for (const v of this.list) {
        if (v.id === this.temp.id) {
          const index = this.list.indexOf(v)
          this.list.splice(index, 1, this.temp)
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
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('vendor/Export2Excel')
        const tHeader = ['时间', '地区', '类型', '标题', '重要性']
        const filterVal = ['timestamp', 'province', 'type', 'title', 'importance']
        const data = this.formatJson(filterVal, this.list)
        export_json_to_excel(tHeader, data, 'table数据')
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
<style lang="scss">
  .title {
    background: #333953;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #B4BAC6;
    letter-spacing: 0;
    height: 40px;
    line-height: 40px;
    text-indent: 20px;
    margin: 0;
  }
  .info-detail {
    text-indent: 20px;
    height: 34px;
    line-height: 34px;
    background: #272D4A;
    border-bottom: 1px solid black;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #B4BAC6;
  }
  .mb10 {
    margin-bottom: 10px;
  }
</style>
