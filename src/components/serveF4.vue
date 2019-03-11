<template>
    <div>
        <ul class="Serve clearfix" :class="{ServepTF:servepdtf}">
            <li class="float_l bdr-bottom bdr-r" v-for="(item,index) in serveimgtxtlist" @click="clickHref(item.imageLink)">
                <img :src="item.imageUrl" class="float_l" alt="">
                <div class="float_l">
                    <span>{{ item.txtTitle }}</span>
                    <p>{{ item.txtContent }}</p>
                </div>
            </li>
       <!--      <li class="float_l bdr-bottom">
                <img src="//gfs12.gomein.net.cn/T1qDDbBbxT1RCvBVdK.png" class="float_l" alt="">
                <div class="float_l">
                    <span>手机回收</span>
                    <p>救济当钱花,救济当</p>
                </div>
            </li>
            <li class="float_l bdr-r">
                <img src="//gfs11.gomein.net.cn/T1LLYbBCxT1RCvBVdK.png" class="float_l" alt="">
                <div class="float_l">
                    <span>空调清洗</span>
                    <p>特惠空调季，全机清洗</p>
                </div>
            </li>
            <li class="float_l">
                <img src="//gfs10.gomein.net.cn/T1IYDQBQJv1RCvBVdK.png" class="float_l" alt="">
                <div class="float_l">
                    <span>话费充值</span>
                    <p>充值优惠，快速到账</p>
                </div>
            </li> -->
        </ul>
    </div>
</template>

<script type='text/ecmascript-6'>
    export default {
        props: ['servepdtf','serveimgtxtlist'],
        data(){
            return {
                name: 'hello'
            }
        },
        created(){
        },
        mounted(){

        },
        methods:{
            /**
             * 点击跳转
             */
            clickHref:function(hrefUrl) {
                var _this = this;

                util.href(hrefUrl);
            }
        }
    }
</script>
<style lang='less'>
    @import '../util/fs.less';
    .Serve{
        margin-top: 0.266667rem;
        background: #fff;
        li{
            width: 50%;
            height: 2.133333rem;
            img{
                width:1.306667rem;
                height: 1.306667rem;
                margin:0.426667rem 0 0 0.4rem;
            }
            div{
                padding-top: 0.64rem;
                margin-left: 0.166667rem;
                span{
                    .mixinfont(14px);
                    color:#333;
                }
                p{
                    .mixinfont(9px);
                    color:#999;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
    .ServepTF{
        margin:0.266667rem 0.32rem 0 0.32rem;
        border-radius: 10px;
    }
</style>