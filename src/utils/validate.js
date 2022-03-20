import {messageTips} from "@/utils/messageTip";

//校验邮箱格式
export function validateEMail(value, obj) {
    const reg = /^([a-zA-Z0-9]+[-_\\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
    if (isEmpty(value)) {
        messageTips(obj, "请输入邮箱", "warning");
        return false;
    } else {
        if (!reg.test(value)) {
            messageTips(obj, '请输入正确的邮箱地址', "error");
            return false;
        } else {
            return true;
        }
    }
}

//数字、26个英文字母组成的字符串
export function validateName(value, obj) {
    const reg = /^[A-Za-z0-9]+$/;
    if (isEmpty(value)) {
        messageTips(obj, "请输入昵称", "warning");
        return false;
    } else if (!reg.test(value)) {
        messageTips(obj, '请输入由英文、数字和下划线组成的昵称', "error");
        return false;
    }
    return true;
}

//数字、26个英文字母或者下划线组成的7-20位字符串
export function validatePassword(value, obj) {
    const reg = /^[A-Za-z0-9]+$/;
    if (isEmpty(value)) {
        messageTips(obj, "请输入密码", "warning");
        return false;
    } else if (value.length > 6 && value.length < 21 && reg.test(value)) {
        return true;
    } else {
        messageTips(obj, '请输入由英文和数字组成的7-20位密码', "error");
        return false;
    }
}


//校验数据是否为空
export function validateEmpty(value, obj, tips) {
    if (isEmpty(value)) {
        messageTips(obj, tips, "warning");
        return true;
    } else return false;
}


//判空 供函数用
function isEmpty(value) {
    if (value == null || value == undefined || value.trim() == '')
        return true;
    else return false;
}