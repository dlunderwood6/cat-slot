import Vuex from 'vuex';
import vue from 'vue';

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

vue.use(Vuex);

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});
