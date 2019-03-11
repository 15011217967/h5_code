<template>
    <div class="serviceSteps" ref="stepWrapper">
        <ul class="ban-list ma pr">
            <li class="one" :class="{'active': active==1}"><p>选择设备</p></li>
            <li class="two"></li>
            <li class="thr" :class="{'active': active==2}"><p>{{name}}</p></li>
            <li class="four"></li>
            <li class="five" :class="{'active': active==3}"><p>填写地址</p></li>
            <li class="six"></li>
            <li class="seven" :class="{'active': active==4}"><p>提交订单</p></li>
        </ul>
    </div>
</template>

<script type='text/ecmascript-6'>
    var root = window || {},
    util = root.util || {};
    export default {
        props: {
            active: {
                type: Number
            },
            sertype: {
                type: Number
            }
        },
        data(){
            return {
                name: ''
            }
        },
        methods:{

        },
        created(){
            // this.name = this.sertype === 1 ? "选择估价" ："确认故障"
            if( this.sertype === 1 ){
                this.name='选择估价'
            }else{
                this.name='确认故障'
            }
        }
    }
</script>

<style lang='less'>
    @import '../util/fs.less';
    .serviceSteps{
        width: 100%;
        background:url(//gfs7.gomein.net.cn/T1T9ETBXbT1RCvBVdK) no-repeat;
        background-size: 10.0rem 1.866667rem;
        /* border-bottom: 1px solid #dedede; */
        .ban-list {
            width: 100%;
            height: 1.866667rem;
            position: relative;
            li {
                color: rgba(255,255,255,0.5);
                .mixinfont(12px);
                height: 1.866667rem;
                float: left;
                &:nth-child(2n+1) {
                    width: 17.5%;
                };
                &:nth-child(2n) {
                    width: 10%;
                    height: 1.866667rem;
                   /*  .mixinfont(16px);
                    text-align: center;
                    line-height: 1.866667rem; */
                    background: url(./img/_.png) no-repeat center 0.76rem;
                    background-size: 0.12rem 0.186667rem;
                };
                &.one {
                    background: url(./img/1equipment.png) no-repeat center 0.333333rem;
                    background-size: 0.746667rem 0.746667rem;
                };
                &.thr {
                    background: url(./img/2valuation.png) no-repeat center 0.333333rem;
                    background-size: 0.746667rem 0.746667rem;
                };

                &.five {
                    background: url(./img/3address.png) no-repeat center 0.333333rem;
                    background-size: 0.746667rem 0.746667rem;
                };
                &.seven {
                    background: url(./img/4submit-order.png) no-repeat center 0.333333rem;
                    background-size: 0.746667rem 0.746667rem;
                };
                &.one.active {
                    background: url(./img/1equipment1.png) no-repeat center 0.333333rem;
                    background-size: 0.746667rem 0.746667rem;
                };
                &.thr.active {
                    background: url(./img/2valuation1.png) no-repeat center 0.333333rem;
                    background-size: 0.746667rem 0.746667rem;
                };

                &.five.active {
                    background: url(./img/3address1.png) no-repeat center 0.333333rem;
                    background-size: 0.746667rem 0.746667rem;
                };
                &.seven.active {
                    background: url(./img/4submit-order1.png) no-repeat center 0.333333rem;
                    background-size: 0.746667rem 0.746667rem;
                };
                &.active{
                    color: #ffffff;
                };
                p {
                    width: 17.5%;
                    height: 0.773333rem;
                    line-height: 0.773333rem;
                    text-align: center;
                    position: absolute;
                    bottom: 0;
                }

            }

        }
    }

</style>