<template>
  <div id="app">
    <!-- 表头 -->
    <div class="header">
      <input
        class="event_info"
        type="text"
        :value="inputValue"
        @change="inputValueChange($event)"
      />,
      <button class="add_btn" @click="addEvent">添加事项</button>
    </div>
    <!-- 事件列表 -->
    <ul class="content" v-for="item in viewList" :key="item.id">
      <li class="list_item">
        <input
          type="checkbox"
          :checked="item.done"
          @change="
            (e) => {
              checkboxChange(e.target.checked, item.id)
            }
          "
        />
        <span>{{ item.info }}</span>
        <a href="#" @click="removeEvent(item.id)">删除</a>
      </li>
    </ul>
    <!-- 底部 -->
    <div class="footer">
      <p>{{ unDoneCount }}条剩余</p>
      <a-button-group>
        <a-button
          :type="viewKey === 'all' ? 'primary' : 'default'"
          @click="viewKeyChange('all')"
          >全部</a-button
        >
        <a-button
          :type="viewKey === 'undone' ? 'primary' : 'default'"
          @click="viewKeyChange('undone')"
          >未完成</a-button
        >
        <a-button
          :type="viewKey === 'done' ? 'primary' : 'default'"
          @click="viewKeyChange('done')"
          >已完成</a-button
        >
      </a-button-group>
      <a href="#" @click="removeDone">清除已完成</a>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {},
  computed: {
    ...mapState(['inputValue', 'viewKey']),
    ...mapGetters(['unDoneCount', 'viewList'])
  },
  methods: {
    ...mapMutations([
      'setInputValue',
      'addListItem',
      'removeListItem',
      'syncCheckboxState',
      'syncViewKey',
      'removeDone'
    ]),
    // 输入框信息变化处理函数
    inputValueChange(e) {
      this.setInputValue(e.target.value)
    },
    // 添加事件处理函数
    addEvent() {
      if (this.inputValue.trim() === '') {
        return this.$message.warning('输入信息为空！')
      } else {
        this.addListItem()
      }
    },
    // 移除单个事件处理函数
    removeEvent(id) {
      this.removeListItem(id)
    },
    // 同步完成状态，（复选框）
    checkboxChange(checked, id) {
      const param = {
        state: checked,
        id: id
      }
      this.syncCheckboxState(param)
    },
    // 底部view切换
    viewKeyChange(str) {
      this.syncViewKey(str)
    }
  },
  created() {
    this.$store.dispatch('getList')
  }
}
</script>

<style lang="less" scoped>
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
#app {
  background-color: #eee;
  margin: auto;
  width: 600px;
  .header .event_info {
    width: 500px;
    height: 40px;
  }
  .header .add_btn {
    width: 80px;
    height: 40px;
    background-color: rgb(134, 134, 247);
  }
  .content {
    width: 500px;
    list-style: none;
    .list_item {
      width: 500px;
      line-height: 40px;
      height: 40px;
      padding: 0 30px;
      border: 1px solid #000;
      input {
        float: left;
        width: 20px;
        height: 20px;
        margin: 10px;
      }
      span {
        height: 40px;
        float: left;
        line-height: 40px;
      }
      a {
        float: right;
      }
    }
  }
  .footer {
    width: 500px;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #000;
    button {
      width: 80px;
      height: 30px;
      border: 1px solid #000;
    }
  }
}
</style>
