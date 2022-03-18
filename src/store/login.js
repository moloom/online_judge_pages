//登录、注册、找回密码配置
export default {
    namespaced: true,//不加命名空间，别的组件拿不到state中的数据
    actions: {
        retrievePassword(miniStoreObj, value) {
            console.log("retrievePassword");
            //miniStoreObj.commit("ADD", value);
        },
        register(miniStoreObj, value) {
            console.log("register");
        },
        login(miniStoreObj, value) {
            console.log("login");
        },
    },
    mutations: {
        // ADD(stateObj, value) {
        //     stateObj.sum += value;
        // },
    },
    state: {
        //注册信息
        rName: "",
        email: "",
        rPassword: "",
        checkPassword: "",
        //登录信息
        lName: "",
        lPassword: "",
        loginMsg: "快点康康吧",
        isLogin: false,
        //找回密码信息
        retrieveName: "",
        retrieveEmail: "",
        verifyCode: "",
        newPassword: "",
        retrieveMsg: "输完邮箱后回车会自动发送邮箱验证码哦~",
    },
    getters: {},
}