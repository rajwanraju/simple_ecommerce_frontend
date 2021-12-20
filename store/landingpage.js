//state
export const state = () => ({
  itemList: [],
});

// getters
export const getters = {
  getItemList: state => {
    return state.itemList;
  },
 
};

//mutations
export const mutations = {

  fetch(state, payload) {
    state.itemList = payload;
  },

  
};

//Actions
export const actions = {
  async fetchItems(context) {
    try {
      let url = "/home";
      await this.$axios.$get(url).then(res => {
        context.commit("fetch", res.data);
      });
    } catch (error) {
      if (error) {
        context.dispatch("snackbar/errorMessage", error.message, {
          root: true
        });
      }
    }
  },


};
