import { createStore } from 'vuex'
import module1 from './module1'
import module2 from './module2'

export default createStore({
  modules: {
    module1,
    module2,
  },
  strict: process.env.NODE_ENV !== 'production'
})
