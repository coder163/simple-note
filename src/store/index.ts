import { createStore } from 'vuex'

export default createStore({
  state: {
    editor: null,
    lineNumber: 1,
    treeList: [],
  },
  getters: {
    getEditor(state) {

      return state.editor;
    },
    getLineNumber(state) { return state.lineNumber; },
    getTreeList(state) { return state.treeList; },

  },
  mutations: {
    updateEditor(state, codemirror) {
      state.editor = codemirror;
    },
    updateLineNumber(state, lineNumber) {
      state.lineNumber = lineNumber;
    },
    updateTreeList(state, treeList) {
      state.treeList = treeList;
    }
  },
  actions: {
  },
  modules: {
  }
})
