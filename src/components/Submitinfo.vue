<template>
    <div>
        <div class="subinfo" v-show="!time.timeShow">
            <ul class="list-labelvalue">
                <li class="i1 bdr-bottom" id="serviceWay">
                    <label>服务方式</label>
                    <span class="value">上门服务</span>
                </li>
                <li id="GmTime" v-show="GMtimeTF" style="border-bottom: 1px solid #f0f0f0;">
                    <label>购买时间</label>
                    <span class="value" :class="{'col777':!(time.GMtime!='请选择')}" >{{time.GMtime}}</span>
                    <i class="i i-gt"></i>
                    <input type="button" id="GMtime" v-model="time.GMtime">

                </li>
                <li id="serviceAddr" class="bdr-bottom" @click="chooseAddr">
                    <label v-show="!resAddr">服务地址</label>
                    <span v-show="!resAddr" class="value col777">请选择</span>
                    <span class="name" v-show="resAddr">{{resTree.cname}}&nbsp;&nbsp;&nbsp;&nbsp;{{resTree.cphone}}</span>
                    <span class="addr-detail" v-show="resAddr">{{resTree.region}}&nbsp;&nbsp;{{resTree.addr}}&nbsp;&nbsp;{{resTree.hnum}}</span>
                    <i class="i i-gt"></i>
                </li>
                <li id="serviceTime" @click="chooseTime">
                    <label>上门日期</label>
                    <span class="value" :class="{'col777':!(time.isSaveTime!='请选择')}" >{{time.isSaveTime}}</span>
                    <i class="i i-gt"></i>
                </li>
            </ul>
            <!-- 留言 -->
            <ul class="list-labelvalue">
                <li id="serviceMes" >
                    <label>留言（选填）</label>
                    <textarea placeholder="请输入其他要求(100字以内)" maxlength="100" v-model="mas" @blur="setMas"></textarea>
                </li>
            </ul>
        </div>
        <timer v-show="time.timeShow" @changetime="changeTime"></timer>
    </div>
</template>
<script type='text/ecmascript-6'>
import timer from './ChooseTime';
    let root = window || {},
    util = root.util || {};
    export default {
        props:{
            page:{
                type: String
            }
        },
        data() {
            return{
                mas:"",
                resAddr: false,
                resTree: {},
                time:{
                    timeShow:false,
                    timeStamp:"",
                    isSaveTime: "请选择",
                    GMtime: util.getHrefParma().GMtime || '请选择'
                },
                GMtimeTF: true
            }
        },
        created(){

            // 获取地址信息
            this.hrefparma = util.getHrefParma();
            this._getAddr();
            this._setParmasToPage();

            let cateName = util.decodeurl(util.getHrefParma().catename);

            if (cateName == "手机"||cateName == "平板"||cateName == "电脑") {
                this.GMtimeTF = false;
            };
        },
        methods: {
            // 处理URL参数到页面
            _setParmasToPage() {
                let parmas = this.hrefparma,
                day,
                date;
                if (parmas.btime) {
                    this.time.timeStamp = parmas.btime;
                    day = util.formateDate(parseInt(parmas.btime), 'yyyy-MM-dd');
                    date = util.formatWeek(parseInt(parmas.btime));
                    this.time.isSaveTime = day+" "+date;
                    this.$emit("changecontainer",true, this.time)
               }
            },
            // 获取地址信息
            _getAddr() {
                let that = this,
                    parmas = this.hrefparma,
                    requestPramas = {},
                    surl;
                // tsup时间戳
                if(!parmas.tsup){
                    return false
                }
                // 渲染留言
                let ss=window.sessionStorage,
                    mas=ss.getItem('mas');
                if(mas!=null){
                    this.mas = mas;
                    this.$emit("setmas",this.mas)
                };
                   // debugger:start
                    // var res = {
                    //     "rpco":200,
                    //     "tsrp":1492148896873,
                    //     "body":{
                    //         "area":110105,
                    //         "cname":"侯园园",
                    //         "cphone":"132****2412",
                    //         "region":"北京市朝阳区",
                    //         "addr":"三元桥鹏润大厦",
                    //         "hnum":"2203",
                    //         "tsup":1487842077574
                    //         }
                    //     };
                    //     if (res.rpco === 200) {
                    //         let resTree = res.body || {};
                    //         that.resTree.areaCode = resTree.areaCode;
                    //         that.resTree.cname = resTree.cname;
                    //         that.resTree.cphone = resTree.cphone;
                    //         that.resTree.region = resTree.region;
                    //         that.resTree.addr = resTree.addr;
                    //         that.resTree.hnum = resTree.hnum || "";
                    //         that.resAddr = true;
                    //         that.$emit("getaddr",res.body)
                    //     }

                    //     return;
                     // debugger:end
                // 请求地址数据
                surl = root.MB_API_PATH+'getAddr?tsup=' + parmas.tsup;
                util.api({
                    surl:surl,
                    type:'get',
                    success(res) {
                         if (res.rpco === 200) {
                            let resTree = res.body || {};
                            that.resTree.areaCode = resTree.areaCode;
                            that.resTree.cname = resTree.cname;
                            that.resTree.cphone = resTree.cphone;
                            that.resTree.region = resTree.region;
                            that.resTree.addr = resTree.addr;
                            that.resTree.hnum = resTree.hnum || "";
                            that.resAddr = true;
                            that.$emit("getaddr",res.body)
                        }
                    }
                })
            },
            // 选择地址
            chooseAddr() {
                let temp = this.hrefparma,
                tsup = this.hrefparma.tsup ? this.hrefparma.tsup : '',
                ss = window.sessionStorage;
                    temp.tsup= tsup;
                    temp.oid=this.hrefparma.oid;
                    //跳转回来的页面
                    temp.page = this.page;
                    temp.btime = this.time.timeStamp;
                    temp.GMtime = this.time.GMtime;
                ss.setItem('mas',this.mas)
                // ss.setItem('GMtime',this.time.GMtime)
                util.href('./oftenaddress.html', temp);
            },
            // 选择时间
            chooseTime() {
                this.time.timeShow = true;
                // 隐藏父级页面的部分组件,并改变头部内容
                this.$emit("changecon",false,"选择上门时间")
            },
            // 处理时间
            changeTime(val) {
                if(typeof val!="object"){
                    this.$emit("changecontainer",true)
                    this.time.timeShow = false;
                    return  false;
                }
                this.time.timeShow = false;
                this.time.isSaveTime = val.day+" "+val.week;
                this.time.timeStamp = val.timeStr;
                this.$emit("changecontainer",true,this.time)
            },
            setMas() {

                // let EMJi_REG = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
//              let EMJi_REG = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
//              if(EMJi_REG.test(this.mas)){
//                  this.mas = this.mas.replace(EMJi_REG, '')
//              }
                this.$emit("setmas",this.mas)
            }
        },
        components:{
            timer
        }
    }
</script>

<style lang='less'>
 @import '../util/fs.less';
.list-labelvalue {
    margin-top: 0.266667rem;
    margin-bottom: 0.266667rem;
    padding-right: 0;
    line-height: 1.173333rem;
    background-color: #fff;
    padding-left: 0.32rem;
    .mixinfont(14px);
    li {
        position: relative;
        padding-right: 0.32rem;
       /*  &:not(:last-child) {
            border-bottom: 1px solid rgba(227,227,227,.4);
        }; */
        #GMtime{
            position: absolute;
            top: 0;
            right: 0;
            opacity: 0;
            width: 7.666667rem;
        }
        #GmTime{
            border-bottom: 1px solid #f0f0f0;
        }
        .value{
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            float: right;
            padding-right: 0.32rem;
            color: #333333;
            &.col777{
                color:#d0d0d0;
            }
        };
        textarea {
            overflow-y: hidden;
            box-sizing: border-box;
            width: 65%;
            height: 1.173333rem;
            line-height: 1;
            resize: none;
            padding: 0.45rem 0;
            overflow-y: auto;
            color: #333333;
            .mixinfont(14px);
        };
        ::-webkit-input-placeholder{
            color:#d0d0d0;
        }
    }
    #serviceMes{
        position: relative;
    }
    #serviceMes textarea{
        position: absolute;
        left:2.586667rem;
    }
}
#serviceWay .value {
    padding-right: 0;
}

#serviceAddr {
    padding-top: 0.373333rem;
    padding-bottom: 0.373333rem;
    line-height: 1;
}
#serviceAddr .name,
#serviceAddr .addr-detail {
    display: inline-block;
    width: 92%;
}
#serviceAddr .name {
    line-height: 0.693333rem;
    font-weight: bold;
}

#serviceAddr .addr-detail {
    line-height: 1.3;
}

#device .i-gt,
#deviceBrand .i-gt,
#deviceModel .i-gt,
#serviceTime .i-gt,
#GmTime .i-gt,
#serviceAddr .i-gt {
    width: 0.2rem;
    height:  0.373333rem;
    position: absolute;
    right: 0.32rem;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    background: url('//gfs6.gomein.net.cn/T15eYTBXhb1RCvBVdK') no-repeat;
    background-size: 0.2rem 0.373333rem;
}
</style>