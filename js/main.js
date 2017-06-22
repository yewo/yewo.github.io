;$(function () {
    'use strict';

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