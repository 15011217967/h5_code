<template>
<div>
  <div class="set-addr bdr-bottom" @click="areaSelect">
      <label>所在地区：</label>
      <span class="value" id="region" :pid="dstrict.p" :cid="dstrict.c" :did="dstrict.d" :tid="dstrict.t" v-if="showaddinfo" :class="{'add-info':showaddinfo}">{{regiontxt}}</span>
      <span class="value" v-else>请选择</span>
      <i class="i i-gt"></i>
  </div>
  <div class="area-dialog" v-show="addrListShow">
    <div class="area-main">
        <div class="title">
            <!-- cfg.title+ -->
            选择地址
            <div class="close" @click="close"></div>
        </div>
        <ul class="bar-list bdr-bottom">
            <li :class="{'cur': isShowProvince}" id="proName" @click="showProvince" v-show="provinceArea.chareas">{{dstrict.pn?dstrict.pn:"省"}}</li>
            <li :class="{'cur': isShowCity}" id="cityName" @click="showCity" v-show="cityArea.chareas">{{dstrict.cn?dstrict.cn:"市"}}</li>
            <li :class="{'cur': isShowDistrict}" id="disName" @click="showDistrict" v-show="districtArea.chareas">{{dstrict.dn?dstrict.dn:"区县"}}</li>
            <li :class="{'cur': isShowTown}" id="disName" @click="showTown" v-show="townArea.chareas">{{dstrict.tn?dstrict.tn:"街道"}}</li>
        </ul>
        <div class="area-container">
            <ul class="list-textsingle" id="list" @click="getCity" v-show="isShowProvince">
              <li :val="item.divisionCode" :class='{"on":provinceCode == item.divisionCode}' :pro="provinceCode" :prod="item.divisionCode" v-for='item in provinceArea.chareas'>{{item.arname}}</li>
            </ul>
            <ul class="list-textsingle" id="cityList" @click="getDistrict" v-show="isShowCity">
              <li :val="item.divisionCode" :class='{"on":cityCode == item.divisionCode}' :pro="cityCode" :prod="item.divisionCode" v-for='item in cityArea.chareas'>{{item.arname}}</li>
            </ul>
            <ul class="list-textsingle" id="disList" @click="getTown"  v-show="isShowDistrict">
              <li :val="item.divisionCode" :class='{"on":areaCode == item.divisionCode}' v-for='item in districtArea.chareas'>{{item.arname}}</li>
            </ul>
            <ul class="list-textsingle" id="townList" @click="completeSelect"  v-show="isShowTown">
              <li :val="item.divisionCode" :class='{"on":townCode == item.divisionCode}' v-for='item in townArea.chareas'>{{item.arname}}</li>
        </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    props:['region','province','city','area','town'],
    data () {
        return {
          provinceCode:'',
          cityCode:'',
          areaCode:'',
          townCode:'',

          addrListShow:false,
          showaddinfo:false,
          provinceArea:{},
          cityArea:{},
          districtArea:{},
          townArea:{},
          isFrist:true,

          isShowProvince:true,
          isShowCity:false,
          isShowDistrict:false,
          isShowTown:false,
          // isTown:false,

          hrefParma: util.getHrefParma(),
          regiontxt:this.region||'',
          areatxt:this.area,
          tsup:util.getHrefParma().tsup,
          isFrist:true,

          sel: '',
          //已选地区服务是否支持
          issupport: true,
          //触发事件的元素Id/class
          elid: '',
          //要添加地址的元素Id/class
          elval: '',
          //业务id 清洗 回收 维修
          serviceId:'',
          //家电分类号（允许为空）。手机为12，其他家电类统一为15
          cateid:'',
          //行政区划代码。允许为空，表示查询所有省的信息
          divisionCode:'',
          // 默认选择地区
          p:'',
          pn:'',
          c:'',
          cn:'',
          d:'',
          dn:'',
          dstrict: {
              p: '',
              pn: '',
              c: '',
              cn: '',
              d: '',
              dn: '',
              t: '',
              tn: '',
          },
        }
    },
    watch: {
     'region': function (n, o) {
      this.updata()
     },
     'province': function (n, o) {
      this.updatap()
     },
     'city': function (n, o) {
      this.updatac()
     },
     'area': function (n, o) {
      this.updataa()
     },
     'town': function (n, o) {
      this.updatat()
     }
    },
    created() {
      let that = this;
    },

    methods:{
      updata () {
        this.regiontxt = this.region;
      },
      updatap () {
        this.provinceCode = this.province;
        this.dstrict.p = this.province;
      },
      updatac () {
        this.cityCode = this.city;
        this.dstrict.c = this.city;

      },
      updataa () {
        this.areaCode = this.area;
        this.dstrict.d = this.area;

      },
      updatat () {
        // debugger;
        this.townCode = this.town;
        this.dstrict.t = this.town;
        this.getProvince();
        this.getCity(this.provinceCode);
        this.getDistrict(this.cityCode);
        this.getTown(this.areaCode);
        this.completeSelect(this.townCode);
        this.showaddinfo = true
        this.addrListShow = false;
      },
      areaSelect:function(){
        var that = this;
        if(that.isFrist){
          if (that.hrefParma.tsup>0) {
            //编辑地址
            // debugger
            that.editaddress();
          } else{
            //新增地址
            that.getProvince();
          }
          if(that.dstrict.t){
            that.isFrist = false;
          }

        } else{
            that.addrListShow = true;
            that.showaddinfo =true;
        }
      },

      editaddress:function(){
        var that = this;
        that.addrListShow = true;
        that.dstrict.p = $('#list .on').attr('val');
        that.dstrict.pn = $('#list .on').text();
        that.dstrict.c = $('#cityList .on').attr('val');
        that.dstrict.cn = $('#cityList .on').text();
        that.dstrict.d = $('#disList .on').attr('val');
        that.dstrict.dn = $('#disList .on').text();
        that.dstrict.t = $('#townList .on').attr('val');
        that.dstrict.tn = $('#townList .on').text();

        that.regiontxt = that.dstrict.pn+' '+that.dstrict.cn+' '+that.dstrict.dn+' '+that.dstrict.tn;
        window.localStorage.dstrict = JSON.stringify(that.dstrict);


      },
      setAddr:function(){
          this.addrListShow = true;
      },
      showProvince:function(){
        this.isShowProvince = true;
        this.isShowCity=false;
        this.isShowDistrict=false;
        this.isShowTown=false;
      },
      showCity:function(){
        this.isShowProvince = false;
        this.isShowCity=true;
        this.isShowDistrict=false;
        this.isShowTown=false;
      },
      showDistrict:function(){
        this.isShowProvince = false;
        this.isShowCity=false;
        this.isShowDistrict=true;
        this.isShowTown=false;
      },
      showTown:function(){
        this.isShowProvince = false;
        this.isShowCity=false;
        this.isShowDistrict=false;
        this.isShowTown=true;
      },

      close:function(){
        this.addrListShow = false;
      },

     /**
     * 获取省
     */
    getProvince: function() {
        var that = this;
        that.isShowProvince = true;
        that.isShowCity = false;
        that.isShowDistrict = false;
        that.isShowTown = false;

        that.provinceArea={};
        that.cityArea={};
        that.districtArea={};
        that.townArea={};
        that.getArea({'divisionCode':'','sel':'provinceArea'})
    },
    /**
     * 获取市
     */
    getCity: function(e) {
      // pId
        var that = this;
        var targetEle = $(e.target)||'';
        if(targetEle.length>0){
          if (targetEle[0].nodeName.toLowerCase()!='li') {
            return false;
          };
        }
       // if(!that.provinceArea.chareas){return false;}
        that.isShowProvince = false;
        that.isShowCity = true;
        that.isShowDistrict = false;
        that.isShowTown = false;
        if(targetEle){
          $('#list li').removeClass('on');
          targetEle.addClass('on');
        }
        var divisionCode = targetEle.length>0 ?targetEle.attr('val'):e;
        that.dstrict.p = divisionCode;
        that.dstrict.pn = targetEle.text();
        that.dstrict.c = '';
        that.dstrict.cn = '';
        that.dstrict.d = '';
        that.dstrict.dn = '';
        that.dstrict.t = '';
        that.dstrict.tn = '';

        if(!that.dstrict.p){util.tip(that.dstrict.p+'点击太快,慢一点哦');return false;}
        // 获取市列表
        that.cityArea={};
        that.districtArea={};
        that.townArea={};
        that.getArea({'divisionCode':divisionCode,'sel':'cityArea'});
    },
    /**
     * 获取区县
     */
    getDistrict: function(e) {

        var that = this;
        var targetEle = $(e.target);
        if(targetEle.length>0){
          if (targetEle[0].nodeName.toLowerCase()!='li') {
            return false;
          };
        }
       // if(!that.cityArea.chareas){return false;}
        that.isShowProvince = false;
        that.isShowCity = false;
        that.isShowDistrict = true;
        that.isShowTown = false;
        var divisionCode = targetEle.length>0 ?targetEle.attr('val'):e;
        if(targetEle){
          targetEle.addClass('on').siblings().removeClass('on');
        }
        that.dstrict.c = divisionCode;
        that.dstrict.cn = targetEle.text();
        that.dstrict.d = '';
        that.dstrict.dn = '';
        that.dstrict.t = '';
        that.dstrict.tn = '';

        if(!that.dstrict.c){util.tip('d点击太快,慢一点哦');return false;}
        that.districtArea={};
        that.townArea={};
        that.getArea({'divisionCode':divisionCode,'sel':'districtArea'})
    },
    getTown: function(e) {
        var that = this;
        var targetEle = $(e.target);
        if(targetEle.length>0){
          if (targetEle[0].nodeName.toLowerCase()!='li') {
            return false;
          };
        }
        that.isShowProvince = false;
        that.isShowCity = false;
        that.isShowDistrict = false;
        that.isShowTown = true;
        if(targetEle){
          targetEle.addClass('on').siblings().removeClass('on');
        }
        var divisionCode = targetEle.length>0 ?targetEle.attr('val'):e;
        that.dstrict.d = divisionCode;
        that.dstrict.dn = targetEle.text();
        that.dstrict.t = '';
        that.dstrict.tn = '';
        that.townArea={};
        that.getArea({'divisionCode':divisionCode,'sel':'townArea'})
    },
    /**
     * [completeSelect description]
     */
    completeSelect: function(e){
      var that = this;
      var targetEle = $(e.target);
        if(targetEle.length>0){
          if (targetEle[0].nodeName.toLowerCase()!='li') {
            return false;
          };
        }

      if(targetEle.length>0){
        that.dstrict.t = targetEle.attr('val');
        that.dstrict.tn = targetEle.text();
        $('#townList li').removeClass('on');
        targetEle.addClass('on');
        // that.dstrict.p = $('#list .on').attr('val');
        // that.dstrict.pn = $('#list .on').text();
        // that.dstrict.c = $('#cityList .on').attr('val');
        // that.dstrict.cn = $('#cityList .on').text();
        // that.dstrict.d = $('#disList .on').attr('val');
        // that.dstrict.dn = $('#disList .on').text();
        that.dstrict.t = $('#townList .on').attr('val');
        that.dstrict.tn = $('#townList .on').text();
        that.regiontxt = that.dstrict.pn+' '+that.dstrict.cn+' '+that.dstrict.dn+' '+that.dstrict.tn;
        window.localStorage.dstrict = JSON.stringify(that.dstrict);
      } else{
        that.dstrict.t = that.townCode;
      }
      if($('#townList .on').length>0){
        that.$emit('iscomplete',true);
        that.addrListShow = false;
        that.showaddinfo = true;

      }
      // that.$emit({'areacode',areaId});
    },
/**
     * 获取地区
     * @parma {number}{1} serviceId 服务id
     * @parma {number}{1} cateid 加点分类编号
     * @parma {number}{1} divisionCode 地区编号
     * @parma {number}{1} ele 地区添加父元素
     */
    getArea: function(para) {
        var that = this;
        that.addrListShow = true;
        // 请求...
        util.api({
            surl: root.Area_API_PATH + 'commonArea',
            type: 'get',
            data:{
              divisionCode: para.divisionCode
            },
            async: false,
            beforeSend: function() {
                // 加载提示
                util.comShow({txt: '正在努力加载中…', icl: 'i-load ro360'});
            },
            success: function(response) {
                var rpco = response.rpco,
                    body = response.body || {};
                // 处理
                switch(rpco) {
                    case 200:
                      that[para.sel].arcode = body.arcode;
                      that[para.sel].arname = body.arname;
                      that[para.sel].chareas = body.chareas;
                        // 渲染
                        // if(body.area && ele){
                        //     // 渲染页面
                        //    body.area.chareas && that.renderItem(body.area.chareas,ele);
                        // }else{
                        //     if(body.area){
                        //         //设置应该显示的城市
                        //         body.area.arname && ($('#selectArea').html(body.area.arname) || '城区');
                        //     }else{
                        //        that.options.issupport = false;
                        //     }
                        // }
                        break;
                    default:
                        util.tip('请求失败')
                }

            },
            complete: function() {
                // 移除提示
                util.remComShow();
            }
        });
    },
  }

}

</script>

<style lang="less">
    @import '../util/fs.less';
    /*.mixinfont(16px);*/
    .set-addr{
        display: flex;
        align-items: center;
        background: #fff;
        padding: 0.266667rem 0.32rem;
        height: 0.666667rem;
        line-height:0.666667rem;
        .mixinfont(14px);
        /*input{
            margin-left: 0.533333rem;
            width:3.466667rem;
        };*/
        .value{width: 6.6rem;text-align: right;color: #ccc; overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
        .add-info{color: #333;text-align: left;}
        .i{background: url(//gfs12.gomein.net.cn/T1yQhvBTbg1RCvBVdK.png) no-repeat;width: 0.186667rem;height: 0.373333rem;background-size:100%;margin-left: 0.293333rem;}
      }
    /*选择地区弹出层样式 start*/
    .area-dialog{
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
        display: table;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9999980;
    }
    .area-main{
       width:100%;
       height:54%;
       background:#fff;
       position:absolute;
       bottom:0;
       left:0;
    }
    .area-main .title{
        position:relative;
        width:100%;
        height:1.173333rem;
        line-height: 1.173333rem;
        text-align: center;
        .mixinfont(16px);
        color: #777;
        background: #f5f5f5;
    }
    .area-main .close{
        width:0.48rem;
        height:0.48rem;
        padding:0.346667rem;
        background: url(//gfs10.gomein.net.cn/T1JuEvBbCg1RCvBVdK.png) center center no-repeat;
        background-size: 45%;
        position: absolute;
        top: 0;
        right: 0;
    }
    .area-main .bar-list{
        width:100%;
        height:1.066667rem;
        line-height: 1.066667rem;
        overflow: hidden;
    }
    .area-main .bar-list li{
        /*margin-left:0.32rem;*/
        /*margin-right:0.453333rem;*/
        padding:0 0.066667rem;
        color:#333;
        .mixinfont(16px);
        float: left;
        position: relative;

    }
    .area-main .bar-list li.cur{
        color:#ff4b46;
    }
    .area-main .bar-list li.cur:after{
        content: '';
        width:100%;
        height:0.013333rem;
        background: #ff4b46;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
    }
    .area-container{
        width: 100%;
        /*min-width: 320px;*/
        /*min-width: 4.266667rem;*/
        background-color: #fff;
        overflow-x: hidden;
        overflow-y: auto;
        position: absolute;
        top: 2.24rem;
        bottom: 0;
    }
    .area-dialog .list-textsingle{
        line-height:1.066667rem;
         .on{color: #ff323a}
    }
    .area-dialog .list-textsingle li,.area-dialog .list-textsingle{
        border:none;
    }

    /*选择地区弹出层样式 end*/
</style>