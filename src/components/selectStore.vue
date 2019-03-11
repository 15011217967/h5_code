<template>
    <div class="maskLayer">
        <h2 class="timerTitle bdr-bottom"><a class="goBack" @click.stop="closeLayer"><i></i></a><span>请选择门店</span></h2>
        <div class="wrapper" ref='wrapper'>
            <div class="scroller">
                <ul class="list-labelvalue">
                    <li v-for="(item,index) in storelist" class="bdr-bottom" :class="{'select':selected==index}" @click.stop="changeStore(item,$event,index)">
                        <label>{{ item.name }}</label>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script type='text/ecmascript-6'>
    let root = window || {},
        util = root.util || {};
    export default {
        props: ['storeshow', 'lists', 'selected'],
        data() {
            return {
                storelist: [],
                showstore: false,
                myScroll: null,
                myHeight: 0
            }
        },
        methods: {
            closeLayer: function() {
                this.$emit("selectstore");
                this.selectAnimate(0);
            },
            initScroll() {
                $('.maskLayer').show();
                $('.maskLayer').css({
                    width: $(window).width(),
                    height: $(window).height()
                })
                this.myHeight = document.documentElement.clientHeight - $(".timerTitle").height();
                $('.wrapper').css("height", this.myHeight);
                this.myScroll = new IScroll(this.$refs.wrapper, {
                    // scrollbars: true,
                    // shrinkScrollbars: 'scale',
                    // fadeScrollbars: true,
                    click: true
                });
            },
            selectAnimate: function(state) {
                var $storeComponent = $('.maskLayer');
                if (state == 1) {
                    $storeComponent.css("left", $(window).width());
                    $storeComponent.css("top", 0);
                    setTimeout(function() {
                        $storeComponent.show();
                        $storeComponent.animate({
                            left: '0px'
                        }, 300, 'ease-out');
                    }, 100);
                } else {
                    $storeComponent.animate({
                        left: $(window).width()
                    }, 200, 'ease-out', function() {
                        // $('.iScrollVerticalScrollbar').remove();
                        $storeComponent.hide();
                    })
                }
            },
            changeStore(item, event, index) {
                let that = this;
                item.selected = index;
                that.selectAnimate(0);
                that.$emit("selectstore", item);
            }
        },
        watch: {
            lists: {　　　　
                handler(newValue, oldValue) {
                    this.storelist = newValue;
                },
                deep: true　　
            },
            storeshow: {　　　　
                handler(newValue, oldValue) {
                    this.showstore = newValue;
                    if (this.showstore) {
                        this.selectAnimate(1);
                    }
                },
                deep: true　　
            }
        },
        created() {
            this.storelist = this.lists;
            this.showstore = this.storeshow;
        }
    }
</script>
<style lang="less">
    @import '../util/fs.less';
    .maskLayer {
        position: fixed;
        top: 0;
        background-color: #fff;
        z-index: 9999;
        display: none;
        .timerTitle {
            width: 100%;
            .mixinfont(18px);
            text-align: center;
            height: 1.173333rem;
            line-height: 1.173333rem;
            color: #333;
            .goBack {
                height: 100%;
                position: absolute;
                top: 0;
                left: 0.48rem;
                i {
                    position: absolute;
                    top: 50%;
                    margin-top: -0.3rem;
                    width: 0.58667rem;
                    height: 0.58667rem;
                    background: url('//gfs13.gomein.net.cn/T1jhZvBvLT1RCvBVdK.png') center no-repeat;
                    background-size: .586667rem .586667rem;
                }
            }
        }
        .wrapper {
            position: relative;
            overflow: hidden;
            height: 615px;
            .scroller {
                position: absolute;
                width: 100%;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                -webkit-overflow-scrolling: auto;
                transform: translateZ(0);
                transform: translate3d(0, 0, 0);
                text-size-adjust: none;
                user-select: none;
            }
        }
        .list-labelvalue {
            .mixinfont(15px);
            margin-top: 0;
            margin-bottom: 0.266667rem;
            line-height: 1.333333rem;
            padding-left: 0.4rem;
            li {
                display: block;
                text-align: left;
                color: #262626;
            }
            li.select {
                color: #FF4B46;
            }
        }
    }
</style>