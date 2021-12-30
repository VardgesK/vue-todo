import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
		createPersistedState({
			reducer: state => ({
        notes: state.notes
			}),
		})
	],
  state: {
    notes:[]
  },
  mutations: {
    addNewNote(state, note){
      state.notes.push(note)
    },
    deleteNote(state, note){
      state.notes = state.notes.filter( n => n != note)
    },
    updateNote(state, updatedNote){
      state.notes[updatedNote.idx] = updatedNote.note
    }
  },
  getters:{
      getNotes:(state)=>{
        return state.notes
    },
  },
  actions: {
  },
  modules: {
  }
})
