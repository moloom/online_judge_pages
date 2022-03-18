// 要操作的元素
$login = $("#login");
$register = $("#register");
$form_box = $(".form-box");
$register_box = $(".register-box");
$login_box = $(".login-box");

//注册按钮点击事件
$register.click(function() {
        $form_box.css("transform", "translateX(80%)")
        $login_box.addClass('hidden');
        $register_box.removeClass('hidden');
    })
    //登录按钮点击事件
$login.click(function() {
    $form_box.css("transform", "translateX(0%)")
    $register_box.addClass('hidden');
    $login_box.removeClass('hidden');
})

$("#clear").click(function(){
    console.log("clicked");


})
