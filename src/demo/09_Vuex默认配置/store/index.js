//该文件用于创建vuex中最为核心的store

import Vue from 'vue'
Vue.use(Vuex);
import Vuex from 'vuex'

// vuex 默认方式
const actions = {
    add(miniStoreObj,value){
        miniStoreObj.commit("ADD",value);
    },
    decrement(miniStoreObj,value){
        miniStoreObj.commit("DECREMENT",value);
    },
    addPerson(miniStoreObj,value){
        miniStoreObj.commit("ADDPERSON",value);
    },
};
const mutations={
    ADD(stateObj,value){
        stateObj.sum+=value;
    },
    DECREMENT(stateObj,value){
        stateObj.sum-=value;
    },
    ADDPERSON(stateObj,value){
        stateObj.personList.unshift(value);
    },
};
const state={
    sum:0,
    personList:[
        {id:"001",name:"张三",}
    ]
};

//类似计算属性，不过这个getter是共享的属性
//用法:$store.getters.sum()
const getters={
    bigSum(state){
        return state.sum*10;
    }
}

const store =new Vuex.Store({
    actions:actions,
    mutations,
    state,
    getters,
})
export default store;

