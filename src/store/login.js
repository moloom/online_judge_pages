//登录、注册、找回密码配置
import axios from "axios";
import {validateEMail, validateEmpty, validateName, validatePassword} from "@/utils/validate";
import {messageTips} from "@/utils/messageTip";
import qs from 'qs';

export default {
    namespaced: true,//不加命名空间，别的组件拿不到state中的数据
    actions: {
        login(miniStoreObj, value) {
            //校验数据
            value.lName = value.lName.trim();
            value.lPassword = value.lPassword.trim();
            let nameFlag = !validateEmpty(value.lName, value.thisObj, "请输入昵称或邮箱");
            let passwordFlag = !validateEmpty(value.lPassword, value.thisObj, "请输入密码");
            if (nameFlag && passwordFlag)
                miniStoreObj.commit("LOGIN", value);
        },
        retrievePassword(miniStoreObj, value) {
            //校验数据，去空格
            value.retrieveEmail = value.retrieveEmail.trim();
            value.newPassword = value.newPassword.trim();
            value.retrieveName = value.retrieveName.trim();
            value.verifyCode = value.verifyCode.trim();
            let emailFlag = validateEMail(value.retrieveEmail, value.thisObj);
            let passwordFlag = validatePassword(value.newPassword, value.thisObj);
            let nameFlage = validateName(value.retrieveName, value.thisObj);
            let codeFlag = !validateEmpty(value.verifyCode, value.thisObj, "请输入邮箱验证码");
            if (nameFlage && passwordFlag && emailFlag && codeFlag)
                miniStoreObj.commit("RETRIEVEPASSWORD", value);
        },
        register(miniStoreObj, value) {
            //校验数据，去空格
            value.rName = value.rName.trim();
            value.email = value.email.trim();
            value.rPassword = value.rPassword.trim();
            value.checkPassword = value.checkPassword.trim();
            let pFlag = true;
            if (value.rPassword !== value.checkPassword) {
                messageTips(value.thisObj, '两次密码输入不一致', "error");
                pFlag = false;
            }
            let nameFlage = validateName(value.rName, value.thisObj);
            let emailFlag = validateEMail(value.email, value.thisObj);
            let passwordFlag = validatePassword(value.rPassword, value.thisObj);
            if (nameFlage && passwordFlag && emailFlag && pFlag)
                miniStoreObj.commit("REGISTER", value);
        },
    },
    mutations: {
        LOGIN(stateObj, value) {
            axios({
                url: "/user/login",
                method: "post",
                data: qs.stringify({
                    name: value.lName,
                    password: value.lPassword,
                })
            }).then(response => {
                    //   登录成功，三秒后转到主页，
                    //    登录失败，调用提示接口，需判断下用户是邮箱还是昵称登录。
                    if (response.data) {
                        stateObj.users.isLogin = true;
                        stateObj.users.id=response.data.id;
                        stateObj.users.name = response.data.name;
                        stateObj.users.point = response.data.point;
                        stateObj.users.role = response.data.role;
                        stateObj.users.picture = response.data.picture;
                        localStorage.setItem("id", stateObj.users.id);
                        localStorage.setItem("name", stateObj.users.name);
                        localStorage.setItem("isLogin", stateObj.users.isLogin);
                        localStorage.setItem("point", stateObj.users.point);
                        localStorage.setItem("role", stateObj.users.role);
                        localStorage.setItem("picture", stateObj.users.picture);
                        value.thisObj.$router.push({
                            name: 'home',
                        });

                    } else {
                        if (value.lName.indexOf("@") == -1)
                            messageTips(value.thisObj, '昵称或密码错误', "error");
                        else
                            messageTips(value.thisObj, '邮箱或密码错误', "error");
                    }
                },
                error => {
                    console.log("login请求失败", error);
                    messageTips(value.thisObj, '啊哦，网络打了个盹', "error");
                })
        },
        RETRIEVEPASSWORD(stateObj, value) {
            axios({
                url: "/user/retrievePassword",
                method: "post",
                data: qs.stringify({
                    name: value.retrieveName,
                    email: value.retrieveEmail,
                    password: value.newPassword,
                    verify_code: value.verifyCode,
                })
            }).then(response => {
                    //   修改密码成功，回到登录界面，提示成功
                    if (response.data) {
                        messageTips(value.thisObj, '找回密码成功', "success");
                        //回到登录界面
                        value.thisObj.isDisplay.splice(0, 3, false, true, false);
                        value.thisObj.atLogin = true;
                        value.thisObj.resetAllData();
                    } else
                        messageTips(value.thisObj, '验证码错误', "error");
                },
                error => {
                    console.log("retrievePassword请求失败", error);
                    messageTips(value.thisObj, '啊哦，网络打了个盹', "error");
                })
        },
        REGISTER(stateObj, value) {
            axios({
                url: "/user/register",
                method: "post",
                data: qs.stringify({
                    name: value.rName,
                    email: value.email,
                    password: value.rPassword,
                })
            }).then(response => {
                    //   注册密码成功，回到登录界面，提示成功
                    if (response.data === "success") {
                        messageTips(value.thisObj, '注册成功', "success");
                        //回到登录界面
                        value.thisObj.isDisplay.splice(0, 3, false, true, false);
                        value.thisObj.atLogin = true;
                        value.thisObj.resetAllData();
                    } else if (response.data === "emailError")
                        messageTips(value.thisObj, '您的邮箱已被注册！', "warning");
                    else if (response.data === "nameError")
                        messageTips(value.thisObj, '啊哦，不好意思，您的昵称已被注册！', "warning");
                    else
                        messageTips(value.thisObj, '啊哦，未知错误，请重试！', "error");
                },
                error => {
                    console.log("register", error);
                    messageTips(value.thisObj, '啊哦，网络打了个盹', "error");
                })
        },
    },
    state: {
        users: {id:null,name: null, point: null, isLogin: false, role: null, picture: null,},
        isAtLogin: false,//是否在登录界面，用于显示和隐藏界面。
    },
    getters: {},
}