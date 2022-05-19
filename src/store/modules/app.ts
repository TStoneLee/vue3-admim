import { ActionTree, Module, MutationTree } from 'vuex'
import { IRootState } from '../index'

export interface IAppState {
  sidebar: {  // 定义sidebar相关状态
    opened: boolean;  // 菜单导航展开时true 收缩时false 
  }
}
// 定义mutations
const mutations: MutationTree<IAppState> = {
  TOGGLE_SIDEBAR (state) {
    state.sidebar.opened = !state.sidebar.opened
  }
}

// 定义actions
const actions: ActionTree<IAppState, IRootState> = {
  toggleSidebar ({ commit }) {  // action如果有payload自己定义类型就行
    commit('TOGGLE_SIDEBAR')
  }
}

// 定义module
const app: Module<IAppState, IRootState> = {
  // 用了命名空间 store.dispatch('模块名/action函数名')
  // 获取state就要 store.state.app.sidebar (store.state.模块名.状态)
  namespaced: true,
  state: {
    sidebar: {
      opened: true
    }
  },
  mutations,
  actions
}

export default app


