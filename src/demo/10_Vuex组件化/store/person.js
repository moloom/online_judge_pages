import {nanoid} from "nanoid";

export default {
    namespaced: true,
    actions: {
        addPerson(miniStoreObj, value) {
            const personOjb = {id: nanoid(), name: value};
            miniStoreObj.commit("ADDPERSON", personOjb);
        },
    },
    mutations: {
        ADDPERSON(stateObj, value) {
            stateObj.personList.unshift(value);
        },
    },
    state: {
        personList: [
            {id: "001", name: "张三",}
        ]
    },
    getters: {},
}