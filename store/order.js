//state
export const state = () => ({
    itemList: [],
    invoice: null,
    orderCreated: false,

})

// getters
export const getters = {
    getItemList: state => {
        return state.itemList;
    },
 
}

//mutations
export const mutations = {
    create(state, payload) {
        state.itemList.splice(0, 0, payload);
    },
 

}

//Actions
export const actions = {


}