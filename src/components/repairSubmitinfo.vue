<template>
    <div>
        <div class="subinfo" v-show="!time.timeShow">
            <ul class="list-labelvalue">
                <li id="GmTime" v-show="GMtimeTF" class="gmTime">
                    <label>是否过保修期</label>
                    <span class="value" id='result'>{{time.isprotection}}</span>
                    <i class="i i-gt"></i>
                </li>
                <li id="serviceTime" @click="chooseTime">
                    <label>上门时间</label>
                    <span class="value">{{time.isSaveTime}}</span>
                    <i class="i i-gt"></i>
                </li>
                <li class="serviceAddr bdr-bottom" @click="chooseAddr">
                    <label>服务地点</label>
                    <span v-show="!resAddr" class="value">请选择</span>
                    <i class="i i-gt" v-show="!resAddr"></i>
                </li>
                 <li id="serviceAddr" class="serviceAddr bdr-bottom" @click="chooseAddr" v-show="resAddr">
                    <span class="name" v-show="resAddr"><em class="cname">{{resTree.cname}}</em><em class="cphone">{{resTree.cphone}}</em></span>
                    <span class="addr-detail" v-show="resAddr">{{resTree.region}}&nbsp;&nbsp;{{resTree.addr}}&nbsp;&nbsp;{{resTree.hnum}}</span>
                    <i class="i i-gt"></i>
                </li>

            </ul>

        </div>
        <timer v-show="time.timeShow" @changetime="changeTime"></timer>
    </div>
</template>
<script type='text/ecmascript-6'>
import timer from './RepairChooseTime';
import selectAddr from './selectAddr';
    let root = window || {},
    util = root.util || {};
    export default {
        props:{
            page:{
                type: String
            },
            tsup:{},
            showbuytime:{type: String}

        },
        data() {
            return{
               // mas:"",
                resAddr: false,
                resTree: {},
                time:{
                    timeShow:false,
                    timeStamp:"",
                    isSaveTime: "请选择",
                    GMtime: util.getHrefParma().GMtime || '请选择',
                    isprotection:util.getHrefParma().isprotection || '请选择',
                },
                GMtimeTF: true,
                region:'',
                area:'',
                addrinfo:{}
                // <select-addr :region="region" :area="area" @areacode = "areacode" v-model="area"></select-addr>
            }
        },
        watch:{
            'tsup':{
                handler() {
                   this._getAddr(this.tsup);
                }
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
            var re = /repairsubmitorder/g;
            if(re.test(window.location.pathname)){
                this.GMtimeTF = false;
            }
        },
        mounted() {
            var _this = this;
            if(this.GMtimeTF){
                var picker = new mui.PopPicker(); 
                picker.setData([{
    						value: '已过保修期',
    						text: '已过保修期'
    					}, {
    						value: '未过保修期',
    						text: '未过保修期'
                        }]);   
                var showGmTimeButton = document.getElementById('GmTime');
    			// var userResult = document.getElementById('result');
                showGmTimeButton.addEventListener('tap', function(event) {
                    picker.show(function(items) {
                        _this.time.isprotection = items[0].value;
                        //返回 false 可以阻止选择框的关闭
                        //return false;
                        var oDate = new Date(),time;
                        if(items[0].value=="已过保修期"){
                                time="1970-1-1";
                        }else{
                                oDate = new Date();
                                time =oDate.getFullYear() +"-" +(oDate.getMonth() + 1) +"-" +oDate.getDate();
                        }
                        _this.time.GMtime = time;
                        _this.$emit('addtime',[_this.time.GMtime,_this.time.isprotection]);
                    });
                }, false);
            }
            
            
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
                    this.$emit("changecontainer",true, this.time);
               }
            },
            areacode(code){
              this.area = code;
            },
            // 获取地址信息
            _getAddr(tsupPara) {
                let that = this,
                    parmas = that.hrefparma,
                    requestPramas = {},
                    surl;
                // tsup时间戳
                var tsup = parmas.tsup || tsupPara;
                if(!tsup){
                    return false;
                }
                // 请求地址数据
                 util.api({
                    surl: root.MB_API_PATH + 'getAddr?tsup='+tsup,
                    type: 'get',
                    beforeSend: function () {
                        // that.options.requestState.save = false;
                    },
                    success: function (res) {
                        var rpco = res.rpco;
                        var body = res.body;
                        if (rpco==200) {
                            let resTree = res.body || {};
                              that.resTree.tsup=resTree.tsup;   //地址id
                              that.resTree.cname=resTree.cname;   //联系人姓名。
                              that.resTree.cphone =resTree.cphone; //联系电话。
                              that.resTree.area=resTree.area;    //第三级编码
                              that.resTree.region =resTree.region; //常用地址三级地址。注：省+市+区。
                              that.resTree.addr =resTree.addr;   //社区地址。例：霄云路鹏润大厦B座5层。
                              that.resTree.hnum =resTree.hnum;   //门牌号。
                              that.resTree.province =resTree.province;   //第一级编码
                              that.resTree.city =resTree.city;   //第二级编码
                              that.resTree.town =resTree.town ;  //第四级编码

                            that.resAddr = true;
                            that.$emit("getaddr",res.body)

                        };
                    },
                    complete: function () {
                        // that.options.requestState.save = true;
                    }
                });
            },

            // chooseAddr() {
            //     this.$emit('choose')
            //     //util.href('http://wap.dev.gomegj.com/v2/oftenaddress.html?page=quickrepair1')
            // },
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
                    temp.isprotection = this.time.isprotection;
                //ss.setItem('mas',this.mas)
                ss.setItem('GMtime',this.time.GMtime);
                ss.setItem('isprotection',this.time.isprotection);
                this.$emit('choose',tsup);
                util.href('./address.html',temp);
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
            timer,
            selectAddr
        }
    }
</script>

<style lang='less'>
 @import '../util/fs.less';
 body{background: #f5f5f5}
.list-labelvalue {
    margin-top: 0.266667rem;
    margin-bottom: 0.266667rem;
    padding-right: 0;
    line-height: 1.173333rem;
    padding-left: 0.32rem;
    .mixinfont(14px);
    .gmTime{margin-top: 0.266667rem;margin-bottom: 0.266667rem;}
     #serviceTime{margin-bottom: 0.266667rem;}
     /*.serviceAddr{margin-bottom: 0.266667rem;}*/
    li {
        background-color: #fff;
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

.serviceAddr {
    padding-top: 0.373333rem;
    padding-bottom: 0.373333rem;
    line-height: 1;
}
.serviceAddr .name,
.serviceAddr .addr-detail {
    display: inline-block;
    width: 92%;
}
.serviceAddr .name {
    line-height: 0.693333rem;
    font-weight: bold;
    em{display:inline-block;vertical-align:middle;}
    .cname{max-width:5.8rem;padding-right:0.066667rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
}

.serviceAddr .addr-detail {
    line-height: 1.3;
}

#device .i-gt,
#deviceBrand .i-gt,
#deviceModel .i-gt,
#serviceTime .i-gt,
#GmTime .i-gt,
.serviceAddr .i-gt {
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