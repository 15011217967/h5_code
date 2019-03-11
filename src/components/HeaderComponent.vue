<template>
    <div class="header bdr-bottom" id="header" v-show="isShow">
        <a class="goBack" @click="fnHref" v-if="isback!==1"><i></i></a>
        <span class="gps" v-if="isgps" @click="citySelect">
            <b></b>
        </span>
        <span class="title">{{ title }}</span>
        <span class="right" v-if="rightmenus">
            <div v-if="rightmenus.type=='text'" @click="toPage">{{ rightmenus.content }}</div>
            <div v-else @click="toPage"><img :src="rightmenus.content"/></div>
        </span>
    </div>
</template>

<script type="ecma6.0">
    export default {
        props: ['title', 'h', 'rightmenus', 'direction', 'isback', 'isgps','lineupcode','userid'],
        data(){
            return {
                isShow: true,
                isZxApi:null
            }
        },
        mounted(){
            // 坐席接口切换
            this.isZxApi = window.location.host == 'wap.dev.gomegj.com' ? '//lark.atguat.com.cn' : '//ocsapi.gome.com.cn';
            //app隐藏标题栏
            if (util.isApp()) {
                this.isShow = false;
                $(".wapper").css("padding-top", 0);
                $(".container").css("top", 0);
            } else {
                if (this.isgps) {
                    var cityStorage = localStorage.getItem("location");
                    if (cityStorage) {
                        //有缓存
                        $('.gps b').html(JSON.parse(cityStorage).arname);
                    } else {
                        setTimeout(function() {
                            getGps(function(result) {
                                $('.gps b').html(result.arname);
                            })
                        }, 200)
                    }
                }
            }
        },
        methods:{
            fnHref: function () {
                let that = this,
                    i = util.getHrefParma(),
                    ct = new Date().getTime();
                if(this.direction){
                    this.$emit("watchdirection")
                    return false;
                }
                // 点击返回按钮判断跳转的问题
                if (that.h) {
                    util.href(that.h,{ct:ct});
                }else{
                    if(i.href){
                        util.href(i.href)
                    }else{
                        util.href("javascript:window.history.go(-1)");
                    };
                };
            },
            toPage: function() {
                this.$emit("watchlist")
            },
            /*选择城市*/
            citySelect: function() {
                let that = this;
                citySelect(function(result) {
                    $('.gps b').html(result.arname);
                    that.$emit("freshcode",result.arcode)
                });
            }
        }
    }
</script>
<style lang='less'>
    @import '../util/fs.less';
    .header {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        color: #333;
        .mixinfont(18px);
        text-align: center;
        height: 1.173333rem;
        line-height: 1.173333rem;
        /*border-bottom: 1px solid #ddd;*/
        background-color: #fff;
        z-index: 1000;
    }
    .header .goBack {
        height: 100%;
        position: absolute;
        top: 0;
        left: 0.48rem;
    }
    .header .title {
        max-width: 70%;
        margin: 0 auto;
        display: block;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .header .goBack i{
        position: absolute;
        top: 50%;
        margin-top: -0.3rem;
        background: url(//gfs14.gomein.net.cn/T1W6VgB4Cv1RCvBVdK.png) center center;
        width: 0.58667rem;
        height: 0.58667rem;
        background-size:0.58667rem 0.58667rem;
    }
    .header .gps{
        position: absolute;
        top: 0;
        left: 0.426667rem;
        color: #666;
        .mixinfont(14px);
        background: url(//gfs12.gomein.net.cn/T1o4ZgBXAT1RCvBVdK.png) center left no-repeat;
        background-size: 0.586667rem 0.586667rem;
    }
    .header .gps b{
        display: block;
        padding-left: 0.746667rem;
        width: 2.373333rem;
        text-align: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .header .right {
        position: absolute;
        top: 0;
        right: 0.4rem;
        color: #333;
        .mixinfont(15px);
        text-align: right;
        min-width: .4rem;
        line-height: 1.173333rem;
    }
    .header .right img{
        width: 0.586667rem;
        height: 0.586667rem;
        margin-top: 0.293333rem;
    }
</style>