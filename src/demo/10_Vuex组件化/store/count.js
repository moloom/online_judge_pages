//求和配置
export default {
    namespaced: true,//不加命名空间，别的组件拿不到state中的数据
    actions: {
        add(miniStoreObj, value) {
            miniStoreObj.commit("ADD", value);
        },
        decrement(miniStoreObj, value) {
            miniStoreObj.commit("DECREMENT", value);
        },
        addOdd(miniStoreObj, value) {
            //直接传过来两个数值不行，得用对象传多个参数。
            if (value.sum % 2 == 1) {
                miniStoreObj.commit("ADD", value.n);
            }
        },
        addWait(miniStoreObj, value) {
            setTimeout(() => {
                miniStoreObj.commit("ADD", value);
            }, 500)
        },
    },
    mutations: {
        ADD(stateObj, value) {
            stateObj.sum += value;
        },
        DECREMENT(stateObj, value) {
            stateObj.sum -= value;
        },
    },
    state: {
        sum: 0,
    },
    getters: {
        bigSum(state) {
            return state.sum * 10;
        }
    },
}