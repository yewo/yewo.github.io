;$(function () {
    'use strict';

    // 登录链接事件
    $('#loginLink').click(function() {
        // 获取登录窗口代码
        var loginHtml = $('#loginHtml').html();
        showLayer(loginHtml,350,280,closeCallback);
        // 登录表单验证
        $('#loginSubmitBtn').click(function() {
            var username = $("input[name='username']").val(),
                password = $("input[name='password']").val();
            if(username === 'imooc' && password === 'imooc') {
                alert('登录成功');
            }else{
                $('.error-msg').html('请输入正确的账号或密码');
            }
        })
    })

    // 注册链接事件
    $('#regeLink').click(function() {
        // 获取注册窗口代码
        var regeHtml = $('#regeHtml').html();
        showLayer(regeHtml,350,330);
    })

    // 弹出层关闭回调函数
    function closeCallback() {
        $('.error-msg').html('');
    }
    // 显示弹出层
    function showLayer(html,width,height,closeCallback) {
        // 显示弹出层遮罩与窗体
        $('#maskup').show();
        $('#layer-pop').show();
        // 设置弹出层窗体样式
        $('#layer-pop').css({
            width: width,
            height: height
        })
        // 填充弹出层窗口内容
        $('#layer-content').html(html);
        // 弹出层关闭按钮绑定事件
        $('#layer-close').click(function() {
            // 弹出层关闭
            hideLayer();
            // 关闭的回调函数
            closeCallback();
        })
    }
    // 隐藏弹出层
    function hideLayer() {
        $('#maskup').hide();
        $('#layer-pop').hide();
    }


    var sidebar = $('#sidebar'),    //选择侧栏
        maskup = $('.maskup'),      //选择遮罩层
        backBtn = $('.back-top'),    //选择返回顶部
        sidebar_trigger = $('#sidebar_trigger'),  //产生触发
        close = $('.close');         //选择关闭图标

    // 侧边栏与遮罩层同时显示
    function showSideBar() {
        maskup.fadeIn();
        sidebar.css('right', 0);
    }

    // 侧边栏隐藏，同时遮罩层也隐藏
    function  hideSideBar() {
        maskup.fadeOut();
        sidebar.css('right', -sidebar.width());
    }

    sidebar_trigger.on('click', showSideBar)
    maskup.on('click', hideSideBar)
    close.on('click', hideSideBar)
    // 返回顶部按钮
    backBtn.on('click', function () {
        $('html, body').animate({
            scrollTop:0}, 10);
    })

    // 滚动出现/隐藏按钮
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > $(window).height())
            backBtn.fadeIn();
        else
            backBtn.fadeOut();
    })

    $(window).trigger('scroll');
})
