<template>
    <div ref="wrapper">
        <div class="wrapper-content">
            <div v-if="pulldown" class="pulldown-tip">{{pulldownTip}}</div>
            <slot></slot>
            <div v-if="pullup" class="pullup-tip">{{pullupTip}}</div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
    export default {
        props: {
            /**
             * 1 滚动的时候会派发scroll事件，会截流。
             * 2 滚动的时候实时派发scroll事件，不会截流。
             * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
             */
            probeType: {
                type: Number,
                default: 1
            },
            /**
             * 点击列表是否派发click事件
             */
            click: {
                type: Boolean,
                default: true
            },
            /**
             * 是否开启横向滚动
             */
            scrollX: {
                type: Boolean,
                default: false
            },
            /**
             * 是否派发滚动事件
             */
            listenScroll: {
                type: Boolean,
                default: false
            },
            /**
             * 列表的数据
             */
            data: {
                type: Array,
                default: null
            },
            /**
             * 是否派发滚动到底部的事件，用于上拉加载
             */
            pullup: {
                type: Boolean,
                default: false
            },
            /**
             * 是否派发顶部下拉的事件，用于下拉刷新
             */
            pulldown: {
                type: Boolean,
                default: false
            },
            /**
             * 是否派发列表滚动开始的事件
             */
            beforeScroll: {
                type: Boolean,
                default: false
            },
            /**
             * 当数据更新后，刷新scroll的延时。
             */
            refreshDelay: {
                type: Number,
                default: 100
            },
            nomore: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                pulldownTip: '下拉刷新',
                pullupTip: '上拉加载更多...'
            }
        },
        mounted() {

            if (this.nomore) {
                this.pullupTip = "没有更多了"
            }
            this.$nextTick(() => {
                this._initScroll()
            })
        },
        methods: {
            _initScroll() {
                if (!this.$refs.wrapper) {
                    return
                }
                // 初始化
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click,
                    scrollX: this.scrollX
                })

                // 是否派发滚动事件
                // if (this.listenScroll) {
                //     let me = this
                //     this.scroll.on('scroll', (pos) => {
                //         me.$emit('scroll', pos)
                //     })
                // }

                // 是否派发滚动事件
                if (this.listenScroll || this.pulldown) {
                    let me = this;
                    this.scroll.on('scroll', (pos) => {
                        if (this.listenScroll) {
                            me.$emit('scroll', pos);
                        }
                        if (this.pulldown) {
                            // 下拉动作
                            if (pos.y > 50) {
                                this.pulldownTip = '松开立即刷新';
                            } else {
                                this.pulldownTip = '下拉刷新';
                            }
                        }
                    })
                }

                // 是否派发滚动到底部事件，用于上拉加载
                if (this.pullup) {
                    this.scroll.on('scrollEnd', () => {
                        // 滚动到底部
                        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                            this.$emit('scrolltoend')
                        }
                    })
                }

                // 是否派发顶部下拉事件，用于下拉刷新
                if (this.pulldown) {
                    this.scroll.on('touchend', (pos) => {
                        // 下拉动作
                        if (pos.y > 50) {
                            setTimeout(() => {
                                this.pulldownTip = '下拉刷新';
                            }, 600);
                            this.$emit('pulldown')
                        }
                    })
                }

                // 是否派发列表滚动开始的事件
                if (this.beforeScroll) {
                    this.scroll.on('beforeScrollStart', () => {
                        this.$emit('beforescroll')
                    })
                }
            },
            disable() {
                // disable方法
                this.scroll && this.scroll.disable()
            },
            enable() {
                // enable方法
                this.scroll && this.scroll.enable()
            },
            refresh() {
                // refresh方法
                this.scroll && this.scroll.refresh()
            },
            scrollTo() {
                // scrollTo方法
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
            },
            scrollToElement() {
                // scrollToElement方法
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            }
        },
        watch: {
            // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
            data() {
                setTimeout(() => {
                    this.refresh()
                }, this.refreshDelay)
            },
            nomore:  {  　　　　
                handler(newValue,  oldValue)  { 
                    if (newValue) {
                        this.pullupTip = "没有更多了"
                    } else {
                        this.pullupTip = "上拉加载更多..."
                    }　　　
                },
                deep:  true  　　
            }
        }
    }
</script>
<style lang="less">
    @import '../util/fs.less';
    .pulldown-tip {
        position: absolute;
        left: 0;
        top: -0.8rem;
        width: 100%;
        color: #333;
        text-align: center;
        z-index: 9999;
        .mixinfont(12px);
    }
    .pullup-tip {
        position: absolute;
        left: 0;
        bottom: -0.8rem;
        width: 100%;
        color: #333;
        text-align: center;
        z-index: 9999;
        .mixinfont(12px);
    }
</style>