'use strict';

// 全局变量
var data = ['iPhone7s','佳能相机','索尼电视','Apple笔记本','谢谢参与','500超市购物券','现金888元','小米平衡车','大疆无人机','200元话费卡'],
    timer = null,
    flag = 0;

window.onload = function() {
    // 获取title，play，stop
    var title = document.getElementById('title'),
        play = document.getElementById('play'),
        stop = document.getElementById('stop');

    // 绑定点击事件，开始与停止抽奖
    play.onclick = playFun;
    stop.onclick = stopFun;

    //键盘事件
    document.onkeyup = function(event) {
        event = event || window.event;
        if(event.keyCode==13) {
            if(flag==0) {
                playFun();
                flag=1;
            }else {
                stopFun();
                flag=0;
            }
        }
    }

    // 封装开始
    function playFun() {
        // 清除定时器，解决多次点击增速bug
        clearInterval(timer);
        // 设置定时器与随机数
        timer = setInterval(function() {
            var random = Math.floor(Math.random()*data.length);
            title.innerHTML = data[random];
        },80);
        // 定义开始按钮背景颜色
        play.style.background = '#aaa';
    }
    // 封装暂停
    function stopFun() {
        // 清除定时器
        clearInterval(timer);
        // 定义开始按钮背景颜色
        play.style.background = '#00da5e';
    }
}
