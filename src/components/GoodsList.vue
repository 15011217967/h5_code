<template>
    <!-- 内容明细区 -->
    <div class="goods-list pb5 iscrollpading-list" id="list">
        <div class="goods-show" v-if='render' :class='{"pb0":!timeShow," bdr-bottom":!timeShow}'>
            <!-- <div class="goods-show-header bdr-bottom">
                <span class="fcorange">感谢您选择国美管家</span>
            </div> -->
            <ul class="list-text icon" :class='{"bdr-bottom":timeShow}'>
                <li>
                    <img class="text-icon" :src="iconUrl" alt="">
                    <div class="text-tit tod ellipsis" :class='{"mt24": !orderDetail.gdls[0].desc,"mt15":orderDetail.gdls[0].desc}'>{{orderDetail.title}}</div>
                    <div class="text-desc tod ellipsis">{{orderDetail.gdls[0].desc}}</div>
                </li>
            </ul>
            <div v-show="timeShow" class="goods-show-footer oh">
                费用：<span class="hightlight-text">￥{{(orderDetail.gtam/100).toFixed(2)}}</span>
                <span class="endtime">下单时间： {{orderDetail.gdls[0].dodt}}</span>
            </div>
        </div>
    </div>
</template>
<script type="ecma6.0">
let root = window || {},
    util = root.util || {};
export default {
    data () {
        return {
            hrefParma:{},
            orderDetail:{},
            iconUrl:'',
            render: false,
            timeShow:true
        }
    },
    created() {
        this.hrefParma = util.getHrefParma();
        if(this.hrefParma.odtype == 2097153){
            this.timeShow = false;
        }
        this._getOrderdetail();
        this._setIconUrl();
    },
    methods:{
        // 请求订单详情
        _getOrderdetail() {
            var that = this;
            // debugger s
            // var res = {"rpco":200,"tsrp":1498722751862,"body":{"spnm":"广州中山八路店","spep":"徐东有","spsr":null,"atdvtt":1487347200000,"atdvte":1487347200000,"atitcts":1487433600000,"atitcte":1487433600000,"ote":null,"ots":null,"cname":"杨家廉","cphone":"13710487847","faddr":"广东广州市荔湾区周门路170号203房(煤气站附近)","dodt":1487235726000,"oprt":null,"sdodt":1487235726000,"dtway":2,"ivifm":1,"gtam":629900,"frgt":0,"ramp":629900,"ordNm":"1501,1658902001","ordsm":null,"odst":0,"otut":0,"msg":null,"imgUrls":null,"discount":0,"userPay":true,"prch":false,"gdls":[{"odste":355,"rfdSta":null,"otn":"1501,1658902001","dodt":1487235726000,"gdsid":"20150100405863","gdnm":"TCL彩电L55P1-CUD黑","gdpr":629900,"gdnu":1,"gdiul":"http://img.gomegj.com/guanjia/GodMS/GSE/GSE01_1_1_1.0","title":null,"desc":null,"imgs":null,"compt":null,"mob":null,"homelocation":null,"late":false}],"payType":null,"aptim":"2017-07-04 00:00:00","iob":null,"sdfmcl":[{"sdfmst":355,"sdfmwd":null,"sdfmtm":1498705119000,"sdct":null},{"sdfmst":353,"sdfmwd":null,"sdfmtm":1498705038000,"sdct":null},{"sdfmst":385,"sdfmwd":null,"sdfmtm":1490424350000,"sdct":null},{"sdfmst":35,"sdfmwd":null,"sdfmtm":1487235726000,"sdct":null}]}}
            //      var rpco = res.rpco,
            //             body = res.body;
            //         // 处理
            //         switch(rpco) {
            //             case 200:
            //                 that.orderDetail = body;
            //                 that.orderDetail.gdls[0].dodt = util.formateDate(that.orderDetail.gdls[0].dodt,'yyyy-MM-dd hh:mm');

            //                 that.orderDetail.title ='';
            //                 $.each(that.orderDetail.gdls,(index,val)=>{
            //                     that.orderDetail.title += "+"+val.title;
            //                 })
            //                 that.orderDetail.title = that.orderDetail.title.slice(1);
            //                 // 如果是实物订单获取图片
            //                 if(that.hrefParma.odtype==2097153){
            //                      that.iconUrl = that.orderDetail.gdls[0].gdiul;
            //                      that.orderDetail.title = that.orderDetail.gdls[0].gdnm;
            //                 }
            //                 that.render = true;
            //                 that.$emit("setotn",body.ordNm);
            //             break;
            //             case 40401:
            //                 util.tip('服务器繁忙，请稍后再试',2000);
            //                 break;
            //             default:
            //                 util.tip('请求失败');
            //         }
            //         return;

            // debugger e
            util.api({
                surl:root.ORDER_API_PATH + 'etoddt',
                type:'get',
                data:{
                    otn: that.hrefParma.otn,
                    odtype: that.hrefParma.odtype,
                    dodt: that.hrefParma.dodt
                },
                success:function(res) {
                    var rpco = res.rpco,
                        body = res.body;
                    // 处理
                    switch(rpco) {
                        case 200:
                            that.orderDetail = body;
                            that.orderDetail.gdls[0].dodt = util.formateDate(that.orderDetail.gdls[0].dodt,'yyyy-MM-dd hh:mm');

                            that.orderDetail.title ='';
                            $.each(that.orderDetail.gdls,(index,val)=>{
                                that.orderDetail.title += "+"+val.title;
                            })
                            that.orderDetail.title = that.orderDetail.title.slice(1);
                            // 如果是实物订单获取图片
                            if(that.hrefParma.odtype==2097153){
                                 that.iconUrl = that.orderDetail.gdls[0].gdiul;
                                 that.orderDetail.title = that.orderDetail.gdls[0].gdnm;
                            }
                            that.gdsid = that.orderDetail.gdls[0].gdsid;
                            that.render = true;
                            that.$emit("setotn",body.ordNm,that.gdsid);
                        break;
                        case 40401:
                            util.tip('服务器繁忙，请稍后再试',2000);
                            break;
                        default:
                            util.tip('请求失败');
                    }
                }
            }) 
        },
        // 设置图片
        _setIconUrl() {
            switch(parseInt(this.hrefParma.odtype)){
                //维修订单
                case 4194305:
                    this.iconUrl = '//gfs9.gomein.net.cn/T1YNYvB_YT1RCvBVdK';
                    break;
                //回收订单
                case 4194307:
                    this.iconUrl = '//gfs8.gomein.net.cn/T1OXdvBybv1RCvBVdK';
                    break;
                //清洗
                case 4194306:
                    this.iconUrl = '//gfs1.gomein.net.cn/T1eFhvBKJv1RCvBVdK';
                    break;
                //安装
                case 4194308:
                    this.iconUrl = '//gfs3.gomein.net.cn/T1BZAvByYv1RCvBVdK';
                    break;
            }
        }
        
    },
    components: {
    }
}

</script>



<style lang="less">
@import '../util/fs.less';
.pb0{
    padding-bottom: 0!important;
    margin-bottom:0!important;
}
.fcorange{
    color: #ff4b46!important;
}
.goods-list .goods-show {
    margin-bottom: 0.266667rem;
}
.goods-show {
    margin-bottom: 0.266667rem;
    padding: 0 0.32rem;
    background-color: #fff;
    .mt15{
        margin-top: 0.266667rem;
    };
    .goods-show-header {
        .mixinfont(14px);
        line-height: 1.173333rem;
        position: relative;
    };
    .goods-show-date {
        color: #777;
    };
    .goods-show-type{
        position: absolute;
        right: 0;
    }
    .list-text.icon {
        padding: 0;
        li {
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            min-height: 2.4rem;
            padding: 0.4rem 0 0.4rem 1.6rem;
        }
         .text-icon {
            top: 0.533333rem;
            width: 1.333333rem;
            height: 1.333333rem;
            margin-top: 0;
            display:block;
            -webkit-border-radius: 2px;
            border-radius: 2px;
        }

        .text-detail {
            /* font-size: .12rem; */
            .mixinfont(12px);
            line-height: 0.506667rem;
            color: #333;
        }

        .text-tit{
            /* font-size:.14rem; */
            .mixinfont(14px);
            line-height: 0.586667rem;
        }
        .text-desc{
            /* font-size:.12rem; */
            .mixinfont(12px);
            color: #777777;
            line-height: 0.506667rem;
        }

        .right-top-txt {
            /* font-size: .12rem; */
            .mixinfont(12px);
            position: absolute;
            top: .15rem;
            right: .1rem;
        }

        .right-center-txt {
            /* font-size: .12rem; */
            .mixinfont(12px);
            position: absolute;
            top: 1.04rem;
            right: 0.266667rem;
            color: #999;
        }
    }
    .i-gt {
        width: 0.266667rem;
        height: 0.266667rem;
        top: 50%;
        right: 0.453333rem;
        margin-top: -0.133333rem;
    }

    .goods-show-footer {
        .mixinfont(14px);
        line-height: 1.173333rem;
        position: relative;
        .endtime{
            float: right;
            .mixinfont(12px);
            color: #777;
        }
        .hightlight-text {
            .mixinfont(18px);
            padding-right: 0.266667rem;
            padding-left: 0.053333rem;
        }
    }

    .goods-show-imglist {
        position: relative;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        height: 0.24rem;
        padding: 0.4rem 0.88rem 0.4rem 0;
        border-bottom: 1px solid #e3e3e3;
    }

    .goods-show-imglist-img {
        float: left;
        width: 1.6rem;
        height: 1.6rem;
        margin-right: 0.186667rem;
        margin-bottom: 0.533333rem;
        -webkit-border-radius: 2px;
        border-radius: 2px;
    }
    .comment-txt-text{
        color: #777;
    }

}
/* 文字列表 */
.list-text {
    line-height: 100%;
    background-color: #fff;
    padding: 0 0.32rem;
     li {
        padding: 0.32rem 0 0.213333rem;
        position: relative;
    }
     li:not(:last-of-type) {
        border-bottom: 1px solid rgba(227, 227, 227, .4);
    }
     li a {
        color: #333;
    }
    .text-detail {
        color: #666;
        .mixinfont(13px);
        line-height: 0.853333rem;
    }
    &.icon li {
        padding-left: 1.466667rem;
    }
     .text-icon  {
        width: 1.2rem;
        height: 1.2rem;
        margin-top: -0.613333rem;
        position: absolute;
        top: 50%;
        left: 0;
    }
     .text-smallgray {
        color: #999;
        .mixinfont(12px);
        line-height: 0.586667rem;   
    }
     .i-delete1 {
        top: 0.293333rem;
        right: 0;
        z-index: 10;
    }
     .btn-del,
     .btn-edt,
     .btn-operate {
        width: 1.066667rem;
        height: 1.066667rem;
        position: absolute;
        top: 0;
        right: -0.32rem;
        z-index: 20;
    }
     .btn-del:after,
     .btn-edt:after,
     .btn-operate:after {
        content: ' ';
        width: 100%;
        height: 100%;
        background-color: transparent;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 20;
    }
     .btn-del .i-delete1,
     .btn-edt .i-edit2,
     .btn-operate .i {
        top: 0.586667rem;
        right: 0.32rem;
    }
     .i-del {
        top: -0.293333rem;
        right: -0.213333rem;
        z-index: 10;
    }
}

.btn-linear {
    color: #ff4b46;
    .mixinfont(14px);
    border: 1px solid #ff4b46;
    padding: 0.16rem  0.373333rem;
    display: inline-block;
    line-height: 100%;
    -webkit-border-radius: 2px;
    border-radius: 2px;
}
</style>