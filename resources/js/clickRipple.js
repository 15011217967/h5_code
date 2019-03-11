var ripple = new Ripple();
// 构造函数
function Ripple() {}

$.extend(Ripple.prototype,{
    /**
     * 初始化
     * @return {[str]} 需要添加效果的元素集合
     */
    init: function(arr) {
        var that = this,
            str = '';
        for (var i = 0; i < arr.length; i++) {
            str += arr[i] + ',';
        };
        str = str.substring(0,str.length-1);
        that.addEvent(str);
    },
    /**
     * 加载事件
     */
    addEvent:function(str) {
        $('body').on('click',str,function(e) {
            var target = e.target,
                pageX = e.pageX,
                pageY = e.pageY,
                that = $(this),
                $span = $('<span class="ripple"></span>'),
                offsetLeft = that.offset().left,
                offsetTop = that.offset().top;
            $span.css(
                'width',Math.max(that.width(),that.height())
            );
            $span.css(
                'height',Math.max(that.width(),that.height())
            );
            $span.css('top',pageY - offsetTop - parseInt($span.css('height'))/2 +'px');
            $span.css('left', pageX - offsetLeft - parseInt($span.css('width'))/2 +'px');

            $span.appendTo(target);
            // console.log(1);
            setInterval(function() {
               $span.remove();
            },1000)
        })
    }
})

ripple.init(['.r']);
