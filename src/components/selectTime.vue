<template>
    <div class="selecttime">
        <li id="GMtime" class="bdr-bottom" v-show="'repair'==type">
            <span>是否过保修期</span>
            <i id="result">{{isprotection}}</i>
            <img src="//gfs13.gomein.net.cn/T1lSYjBXCT1RCvBVdK.png" />
        </li>
        <li @click="servertime" class="servertime bdr-bottom">
            <span>上门时间</span>
            <i>{{serverTime.day==null?'请选择':serverTime.day+' '+serverTime.week}}</i>
            <img src="//gfs13.gomein.net.cn/T1lSYjBXCT1RCvBVdK.png" />
        </li>
        <li class="serveraddr bdr-bottom">
            <div class="mask" v-show="!addOn" @click="chooseAddr"></div>
            <span>服务地点</span>
            <i v-show="!addOn">请选择</i>
            <img v-show="!addOn" src="//gfs13.gomein.net.cn/T1lSYjBXCT1RCvBVdK.png" />
        </li>
        <div class="addr bdr-bottom" v-show="addOn">
            <div class="bottom" @click="chooseAddr">
                <span class="name">
                  {{(addr.cname.length>4 ? addr.cname.substr(0,4) + '...' : addr.cname )+ '     '+ addr.cphone.substr(0,3) + '*****' + addr.cphone.substr(7,4)}}
                </span>
                <span class="address">
                  {{addr.region+''+addr.addr}}
                </span>
                <img src="//gfs13.gomein.net.cn/T1lSYjBXCT1RCvBVdK.png" />
            </div>
        </div>
        <div class="mess-tip" v-show=" frompage=='tgservice' ">
            <p>请填写真实有效的姓名、手机号和地址，以保证增值服务的有效性；如因为信息填写有误导致无法享受增值服务，管家不承担任何责任。
            </p>
        </div>
        <timer :timershow="timershow" :selected="selected" @stime="select_Time"></timer>
    </div>
</template>
<script>
import timer from "./timer";
import "../../resources/js/datePicker";
export default {
    props: ['type', 'hxtime', 'frompage'],
    data() {
        return {
            hrefParma: {},
            timershow: false,
            addOn: false,
            selected:null,
            serverTime: {
                day: null,
                week: null,
                timeStr: null,
            },
            addr: {
                addr: "XXXXXX收",
                areaCode: undefined,
                cname: "啦啦啦啦",
                cphone: "170****0000",
                hnum: "",
                region: "西藏自治区阿里地区普兰县",
            },
            GMtime: "请选择购买时间",
            isprotection:"请选择",
            tsup: null
        };
    },
    mounted() {
        var _this = this;
        var ss = window.sessionStorage;
        if (_this.hxtime) {
            _this.GMtime = _this.hxtime.GmTime;
            _this.isprotection=_this.hxtime.isprotection;
            _this.serverTime = _this.hxtime.serverTime || _this.hxtime.SelectTime;

        }
        _this.hrefParma = util.getHrefParma();
        _this.reqAddr();
        if(_this.type=="repair"){
            var picker = new mui.PopPicker(); 
            picker.setData([{
						value: '已过保修期',
						text: '已过保修期'
					}, {
						value: '未过保修期',
						text: '未过保修期'
                    }]);   
            var showGmTimeButton = document.getElementById('GMtime');
            showGmTimeButton.addEventListener('tap', function(event) {
                picker.show(function(items) {
                    _this.isprotection = items[0].value;
                    //返回 false 可以阻止选择框的关闭
                    //return false;
                    var oDate = new Date(),time;
                    if(items[0].value=="已过保修期"){
                            time="1970-1-1";
                    }else{
                        oDate = new Date();
                        time =oDate.getFullYear() +"-" +(oDate.getMonth() + 1) +"-" +oDate.getDate();
                    }
                    _this.GMtime = time;
                     _this.$emit('addtime', [_this.serverTime, _this.GMtime, _this.addr,_this.isprotection])
                });
            }, false);
        }else{
            var calendar = new datePicker(),
            oDate = new Date(),
            time =
            oDate.getFullYear() +
            "-" +
            (oDate.getMonth() + 1) +
            "-" +
            oDate.getDate();

        calendar.init({
            trigger: "#GMtime" /*按钮选择器，用于触发弹出插件*/ ,
            type: "date" /*模式：date日期；datetime日期时间；time时间；ym年月；*/ ,
            minDate: "1970-1-1",
            maxDate: time /*最大日期*/ ,
            onSubmit: function() {
                /*确认时触发事件*/
                _this.GMtime = this.value
                _this.$emit('addtime', [_this.serverTime, _this.GMtime, _this.addr,_this.isprotection])
                var theSelectData = calendar.value;
            },
            finishMobileDate() {
                console.log(this)
            },
            onClose: function() {
                /*取消时触发事件*/
            }
        });
        }
        
    },
    methods: {
        reqAddr() {
            var _this = this,
                limitAreaArr;
            if (this.hrefParma.tsup) {
                util.api({
                    surl: root.USER_API_PATH + '/getAddr?tsup=' + this.hrefParma.tsup,
                    type: 'get',
                    dataType: 'json',
                    success: function(res) {
                        console.log(res)
                        if (res.rpco == 200) {
                            _this.tsup = res.body.tsup;
                            if (_this.tsup != 0) { //有默认地址
                                _this.addr = res.body;
                                _this.addOn = true;
                                _this.$emit('addtime', [_this.serverTime, _this.GMtime, _this.addr,_this.isprotection]);
                            }
                        } else if (res.rpco == 404) {

                        }
                    }
                })
                return false;
            }
            //获取默认地址
            util.api({
                surl: root.USER_API_PATH + '/getDefAddr',
                type: 'get',
                dataType: 'json',
                success: function(res) {
                    console.log(res)
                    if (res.rpco == 200) {
                        _this.tsup = res.body.tsup;
                        if (_this.tsup != 0) { //有默认地址
                            _this.addr = res.body;
                            _this.addOn = true;
                            _this.$emit('addtime', [_this.serverTime, _this.GMtime, _this.addr,_this.isprotection]);
                        }
                    } else if (res.rpco == 404) {

                    }
                }
            })
        },
        getAddr() {
            util.api({
                surl: root.USER_API_PATH + '/getAddr?tsup=' + _this.tsup,
                type: 'get',
                success: function(res) {
                    if (res.rpco == 200) {
                        _this.addr = res.body;
                        _this.addOn = true;
                        _this.$emit('addtime', [_this.serverTime, _this.GMtime, _this.addr,_this.isprotection]);
                    } else {
                        _this.addr.tsup = false;
                        _this.$emit('addtime', [_this.serverTime, _this.GMtime, _this.addr,_this.isprotection]);
                    }
                }
            })
        },
        servertime() {
            this.timershow = true;
        },
        select_Time(item) {
            this.timershow = false;
            if (item) {
                this.serverTime = item;
                this.selected = item.selected;
             }
             if(this.type == 'recycle'){
                this.$emit('select-time', this.serverTime);
            }else{
                this.$emit('addtime', [this.serverTime, this.GMtime, this.addr,this.isprotection])
            }
        },
        chooseAddr() {
            this.$emit('choose')
            //util.href('http://wap.dev.gomegj.com/v2/oftenaddress.html?page=quickrepair1')
        }
    },
    components: {
        timer
    }
};
</script>
<style>
.selecttime {
    width: 100%;
    color: #333;
    font-size: 0.3733rem;
    margin-top: 0.29333rem;
}

.selecttime>li {
    width: 100%;
    line-height: 1.17333rem;
    height: 1.173333rem;
    position: relative;
    background: #fff;
}

li .mask {
    position: absolute;
    width: inherit;
    height: inherit;
    top: 0;
    left: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0);
}

.selecttime li span {
    position: absolute;
    left: 0.4rem;
}

.selecttime li i {
    position: absolute;
    right: .8rem;
    color: #666;
}

.addr {
    width: 100%;
    background: none;
}

.addr .bottom {
    width: 100%;
    background: #fff;
    height: 1.8133rem;
    position: relative;
    text-indent: 0.4rem;
}

.addr .bottom .name {
    position: absolute;
    top: 0.3733rem;
    left: 0;
    font-size: 0.32rem;
    height: 0.45333rem;
    display: inline-block;
}

.addr .bottom .address {
    position: absolute;
    width: 7rem;
    bottom: 0.3733rem;
    left: 0;
    font-size: 0.3733rem;
    height: 0.533rem;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.mess-tip{
    /*height: 0.96rem;*/
    padding: 0.266667rem 0;
    background-color: #fff;
}
.mess-tip p{
    font-size: 0.266667rem;
    line-height: 0.44rem;
    color: #999;
    padding-left: 0.613333rem;
    box-sizing: border-box;
    padding-right: 0.4rem;
    position: relative;
}
.mess-tip p:before{
    height: 0.106667rem;
    width: 0.106667rem;
    content: '';
    border-radius: 50%;
    position: absolute;
    top: 45%;
    left: 0.4rem;
    z-index: 10;
    background-color: #CFCFCF;
}
.selecttime img {
    width: .32rem;
    height: .32rem;
    position: absolute;
    top: .426667rem;
    right: 0.4rem;
}

.addr .bottom img {
    top: .74777rem;
}



</style>