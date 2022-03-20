//消息提示1
export function messageTips(obj, message, type) {
    obj.$message({
        showClose: true,
        message: message,
        type: type,
    })
}