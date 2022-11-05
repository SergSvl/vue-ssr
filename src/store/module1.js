import axios from "axios"

async function backend() {
  const data = {
    data: [
      {
        id: 1,
        name: 'Prod-01',
        cont: 5
      },
      {
        id: 2,
        name: 'Prod-02',
        cont: 10
      },
      {
        id: 3,
        name: 'Prod-03',
        cont: 50
      },
      {
        id: 4,
        name: 'Prod-05',
        cont: 100
      },
    ]
  };
  // console.log('backend data: ', data);
  return data;
}

export default {
  namespaced: true,
  state: {
    products: null
  },
  getters: {
    getAllProducts: state => state.products,
    getProduct: state => id => state.products.find(prod => prod.id === id),
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    }
  },
  actions: {
    async getProducts({ commit }) {
      const products = await backend();
      console.log('store products: ', products);
      commit('setProducts', products.data);
      return products.data;
    }
  },
}

