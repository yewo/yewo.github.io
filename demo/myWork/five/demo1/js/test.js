
// 屏幕动画元素
var screenAnimateElements = {
    'screen-1': [
        '.screen-1__heading',
        '.screen-1__phone',
        '.screen-1__shadow',
    ]
};
function setScreenAnimate(screenCls) {
    var screen = document.querySelector(screenCls);  // 获取当前屏的元素
    var animateElements = screenAnimateElements[screenCls];  // 需要设置动画的元素
    // 是否有初始化子元素的样式
    var isSetAnimateClass = false;
    screen.onclick = function() {
        if(isSetAnimateClass === false) {
            for(var i=0;i<animateElements.length;i++) {

            }
        }
    }
}