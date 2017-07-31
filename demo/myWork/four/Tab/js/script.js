// 封装代替getElementById()的方法
function byId(id) {
    return typeof(id)==='string'?document.getElementById(id):id;
}
window.onload = function() {
    // 获取标题和内容的元素
    var menu = byId('menu').getElementsByTagName('a'),
        slide = byId('slide').getElementsByTagName('a'),
        section = document.getElementById('section');
    // 创建索引与定时器（用于自动轮播）
    var index = 0,
        timer = null;
    // 判断menu与slide不相等则返回
    if(menu.length != slide.length) return;
    // 遍历menu，添加索引属性，并添加鼠标事件方法
    for(var i=0;i<menu.length;i++) {
        menu[i].id=i;
        menu[i].onclick=function() {
            index=this.id;
            changeOption(this.id);
        }
        //鼠标经过时清除计时器
        section.onmouseover=function () {
            clearInterval(timer);
        };
        //鼠标移开后开始计时器
        section.onmouseout=function () {
            timer = setInterval(autoPlay, 1000);
        };
    }

    // 添加定时器切换
    timer=setInterval(autoPlay, 1000);
    // 自动切换轮播
    function autoPlay() {
        index++;
        if(index>=menu.length) index=0;
        changeOption(index);
    }
    // 清除当前所有菜单选项className与轮播图样式
    function changeOption(curindex) {
        for(var j=0;j<menu.length;j++) {
            menu[j].className='';
            slide[j].style.display='none';
        }
        // 设置当前选项高亮显示和内容为块
        menu[curindex].className='select';
        slide[curindex].style.display='block';
    }
}