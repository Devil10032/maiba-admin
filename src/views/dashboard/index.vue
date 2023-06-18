<template>
  <div class="dashboard-container">
    <el-row class="show-pannel" :gutter="10" type="flex">
      <el-col :span="4" :offset="0">
        <el-card class="red" shadow="always">
          <h4>商品数量</h4>
          <div class="desc">
            <el-row :gutter="20">
              <el-col class="left" :span="9" :offset="0">
                <el-icon><Present /></el-icon>
                <span class="num">{{ totalInfo.totalCommodityNum }}</span>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4" :offset="0">
        <el-card
          class="skyblue"
          shadow="always"
          :body-style="{ padding: '20px' }"
        >
          <h4>求购数量</h4>
          <div class="desc">
            <el-row :gutter="20">
              <el-col class="left" :span="9" :offset="0">
                <el-icon><Tickets /></el-icon>
                <span class="num">{{ totalInfo.totalSeekNum }}</span>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4" :offset="0">
        <el-card class="purple" shadow="always">
          <h4>帖子数量</h4>
          <div class="desc">
            <el-row :gutter="20">
              <el-col class="left" :span="9" :offset="0">
                <el-icon><Document /></el-icon>
                <span class="num">{{ totalInfo.totalTopicNum }}</span>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4" :offset="0">
        <el-card
          class="green"
          shadow="always"
          :body-style="{ padding: '20px' }"
        >
          <h4>平台用户</h4>
          <div class="desc">
            <el-row :gutter="20">
              <el-col class="left" :span="9" :offset="0">
                <el-icon><User /></el-icon>
                <span class="num">{{ totalInfo.userNum.totalUserAllNum }}</span>
              </el-col>
              <el-col class="right" :span="12" :offset="0">
                <div class="top">
                  <p>用户{{ totalInfo.userNum.totalUserAllNum }}</p>
                  <span>管理员{{ totalInfo.userNum.totalAdminNum }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4" :offset="0">
        <el-card class="blue" shadow="always">
          <h4>举报信息</h4>
          <div class="desc">
            <el-row :gutter="20">
              <el-col class="left" :span="9" :offset="0">
                <el-icon><Finished /></el-icon>
                <span class="num">{{
                  totalInfo.informNum.totalInformNum
                }}</span>
              </el-col>
              <el-col class="right" :span="12" :offset="0">
                <div class="top">
                  <p>用户{{ totalInfo.informNum.totalInformUndoNum }}</p>
                  <span>管理员{{ totalInfo.informNum.totalInformdoNum }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4" :offset="0">
        <el-card class="blue" shadow="always">
          <h4>广告图</h4>
          <div class="desc">
            <el-row :gutter="20">
              <el-col class="left" :span="9" :offset="0">
                <el-icon><Share /></el-icon>
                <span class="num">{{ totalAdvNum }}</span>
              </el-col>
              <el-col class="right" :span="12" :offset="0">
                <div class="top">
                  <p>用户 {{ totalInfo.advNum.posLen }}</p>
                  <span>管理员 {{ totalInfo.advNum.imgLen }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="link-pannel" :gutter="10" type="flex">
      <el-col :span="6" :offset="0">
        <el-card shadow="hover" :body-style="{ padding: '0 20px' }">
          <template #header>
            <div class="card-header">
              <span>最新帖子</span>
              <router-link class="link" to="/topic/topic">更多</router-link>
            </div>
          </template>
          <div class="link-body">
            <ul class="link-list">
              <li
                class="link-item"
                v-for="item in newInfo.newTopic"
                :key="item.id"
              >
                {{ item.theme }}
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" :offset="0">
        <el-card shadow="hover" :body-style="{ padding: '0 20px' }">
          <template #header>
            <div class="card-header">
              <span>最新求购信息</span>
              <router-link class="link" to="/goods/seek">更多</router-link>
            </div>
          </template>
          <div class="link-body">
            <ul class="link-list">
              <li
                class="link-item"
                v-for="item in newInfo.newSeek"
                :key="item.id"
              >
                {{ item.title }}
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" :offset="0">
        <el-card shadow="hover" :body-style="{ padding: '0 20px' }">
          <template #header>
            <div class="card-header">
              <span>最新商品</span>
              <router-link class="link" to="/goods/commodity">更多</router-link>
            </div>
          </template>
          <div class="link-body">
            <ul class="link-list">
              <li
                class="link-item"
                v-for="item in newInfo.newCommodity"
                :key="item.id"
              >
                {{ item.title }}
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" :offset="0">
        <el-card shadow="hover" :body-style="{ padding: '0 20px' }">
          <template #header>
            <div class="card-header">
              <span>最新举报信息</span>
              <router-link class="link" to="/info/inform">更多</router-link>
            </div>
          </template>
          <div class="link-body">
            <ul class="link-list">
              <li
                class="link-item"
                v-for="item in newInfo.newInform"
                :key="item.id"
              >
                {{ item.content }}
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="data-pannel" :gutter="10" type="flex">
      <el-col :span="8" :offset="0">
        <el-card shadow="hover" header="各分类下商品数量分析">
          <div class="data-body">
            <category-pie ref="myCategoryPie" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" :offset="0">
        <el-card shadow="hover" header="各分类下求购信息分析">
          <div class="data-body">
            <seek-pie ref="mySeekPie" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" :offset="0">
        <el-card shadow="hover" header="投诉信息分析">
          <div class="data-body">
            <inform-bar ref="myInformBar" />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="data-pannel" type="flex">
      <el-col :offset="0">
        <el-card
          shadow="hover"
          style="width: 100%"
          header="各分类下商品数量分析"
        >
          <div class="data-body">
            <user-bar ref="myUserBar" />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="data-pannel" type="flex">
      <el-col :offset="0">
        <el-card shadow="hover" style="width: 100%">
          <template #header>
            <div class="card-header">
              <span>各分类下商品数量分析</span>
              <el-select
                v-model="year"
                @change="changeYear"
                class="m-2"
                style="width: 120px;"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </template>
          <div class="data-body">
            <topic-line ref="myTopicLine" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import CategoryPie from './components/CategoryPie'
import SeekPie from './components/SeekPie'
import InformBar from './components/InformBar'
import UserBar from './components/UserBar'
import TopicLine from './components/TopicLine'
import { getStatistical } from '@/api/common.js'
import { ref, computed } from 'vue'

// 获取组件实例
const myCategoryPie = ref(null)
const mySeekPie = ref(null)
const myInformBar = ref(null)
const myUserBar = ref(null)
const myTopicLine = ref(null)
// 下拉框选择渲染
const options = [
  { label: '2023年数据', value: '2023' },
  { label: '2022年数据', value: '2022' },
  { label: '2021年数据', value: '2021' },
  { label: '2020年数据', value: '2020' },
]
// 下拉选择绑定
const year = ref('2023')
// 渲染数据
const totalInfo = reactive({
  advNum: {},
  informNum: {},
  advNum: {},
  totalCommodityNum: '',
  totalSeekNum: '',
  totalTopicNum: '',
  userNum: {},
})
// 渲染数据
const newInfo = reactive({
  newCommodity: [],
  newInform: [],
  newSeek: [],
  newTopic: [],
})
// 渲染计算属性
const totalAdvNum = computed(
  () => totalInfo.advNum.imgLen + totalInfo.advNum.posLen
)

const changeYear = () => getData()
// 初始化数据方法
const getData = async () => {
  const res = await getStatistical(year.value)
  Object.keys(newInfo).forEach((key) => (newInfo[key] = res.newInfo[key]))
  Object.keys(totalInfo).forEach((key) => (totalInfo[key] = res.totalInfo[key]))
  myCategoryPie.value.initData(res.echarts.cateCommodityInfo)
  mySeekPie.value.initData(res.echarts.cateSeekInfo)
  myInformBar.value.initData(res.echarts.informNum)
  myUserBar.value.initData(res.echarts.regUserInfo)
  myTopicLine.value.initData(res.echarts.yearTopicPublishNum)
}


// 生命周期调用
onMounted(() => getData())
</script>

<style lang="scss" scoped>
// :deep(){
.dashboard-container {
  padding: 15px;
  .show-pannel {
    margin-bottom: 10px;
    .el-card {
      &.skyblue {
        background-color: skyblue;
      }
      &.red {
        background-color: #f56c6c;
      }
      &.purple {
        background-color: #5470c6;
      }
      &.green {
        background-color: #3dba82;
      }
      &.blue {
        background-color: #409eff;
      }
    }
    :deep() {
      .el-card__body {
        padding: 15px 20px !important;
        color: #fff;
        h4 {
          margin-bottom: 4px;
          font-size: 18px;
          line-height: 22px;
          font-weight: 400;
        }

        .desc {
          i {
            font-size: 26px;
            line-height: 34px;
          }
          .left {
            display: flex;
            align-items: center;
            font-size: 26px;
            .num {
              line-height: 34px;
              margin-left: 8px;
            }
          }
          .right {
            font-size: 13px;
            // p {
            //   margin-bottom: 3px;
            // }
          }
        }
      }
    }
  }

  .link-pannel {
    margin-bottom: 10px;
    :deep() {
      .el-card {
        height: 100%;
        .el-card__header {
          padding: 16px 20px !important;
          .card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0;
            .link {
              font-size: 14px;
              color: #1890ff;
            }
          }
        }

        .el-card__body {
          padding: 0 20px !important;
          .link-body {
            .link-list {
              list-style: none;
              .link-item {
                line-height: 35px;
                font-size: 14px;
                & + .link-item {
                  border-top: 1px solid #f0f0f0;
                }
              }
            }
          }
        }
      }
    }
  }

  .data-pannel {
    margin-bottom: 10px;
    :deep() {
      .el-card {
        height: 100%;
        .el-card__header {
          padding: 16px 20px !important;
          .card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
      }
    }
  }
}
// }
</style>
