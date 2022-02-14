import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: '',
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    // 初始化列表信息功能
    initList(state, list) {
      state.list = list
    },
    // 输入框数据同步更新功能
    setInputValue(state, inputValue) {
      state.inputValue = inputValue
    },
    // 添加事项功能
    addListItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    // 删除单个事项功能
    removeListItem(state, id) {
      const i = state.list.findIndex((item) => item.id === id)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    // 同步复选框勾选状态
    syncCheckboxState(state, param) {
      const i = state.list.findIndex((item) => item.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.state
      }
    },
    // 点击底部按钮切换viewkey值
    syncViewKey(state, str) {
      state.viewKey = str
    },
    // 删除已完成事项
    removeDone(state) {
      state.list = state.list.filter((item) => item.done === false)
    }
  },
  actions: {
    getList(context) {
      axios.get('/list.json').then(({ data }) => {
        console.log(data)
        context.commit('initList', data)
      })
    }
  },
  getters: {
    unDoneCount(state) {
      return state.list.filter((item) => item.done === false).length
    },
    viewList(state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'undone') {
        return state.list.filter((item) => item.done === false)
      }
      if (state.viewKey === 'done') {
        return state.list.filter((item) => item.done === true)
      }
    }
  },
  modules: {}
})
