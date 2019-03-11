/**************************************************************
 说明：此页面为新首页公共地址设置页面。
 **************************************************************/
var root = window || {},
    util = root.util || {};

var SelectArea = function(opt) {
    this.options = $.extend({
        hrefParma: util.getHrefParma(),
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
        arcode:'',
        // 默认选择地区
        dstrict: {
            p: '',
            pn: '',
            c: '',
            cn: '',
            d: '',
            dn: ''

        },
        otherAction:opt.action || function(){}
         }, opt);

    this.sel = this.options.sel;
    this.el = $(this.sel);
    this.init();
};

$.extend(SelectArea.prototype, {

    /**
     * 初始化
     */
    init: function() {
        var that = this;
        that.load();
        // 加载事件
        that.addEvent();
    },
    /**
     * 加载基础数据
     */
    load: function() {
        var that = this;
        //是否显示选择地区
        //如果不是选择地址页面
        console.log(that.options.sel == '#indexnew')
        if(that.options.sel == '#indexnew'){
           that.isFrist();
        }


    },

    /**
     * 是否是第一次进入此页面
     */
    isFrist: function() {
        var that = this,
            frist=window.localStorage.getItem("frist");

        if(!frist){
            window.localStorage.frist='1';
            util.alert('“国美管家”需要您手动添加当前地区以便管家为您提供更好的服务',{
                justOk: false,
                okFn: function() {
                    //弹出层初始化省份
                    that.loadAreaInfo();
                }
            });
        }else{
           //获取第一次选中的地区信息
           var areaStr = localStorage.getItem("dstrict");
           if(areaStr){
                var areaJson = JSON.parse(areaStr),
                    cityName = areaJson.cn,
                    areaName = areaJson.dn,
                    areaCode = areaJson.d;
                that.getArea(that.options.serviceId,that.options.cateid,areaCode);
                //如果服务不支持地区
                if(!that.options.issupport){
                    //如果不是从清洗提交订单页返回的
                    if(!that.options.hrefParma.type==1){
                        util.alert('很抱歉,'+cityName+areaName+'（已定位地区）暂不支持此服务',{justOk: true});
                    }

                    //删除之前已选的
                    localStorage.removeItem("dstrict");
                }
           }


        }
    },
    /**
     * 加载页面地址信息
     */
    loadAreaInfo: function() {
        var that = this;
         //获取城市信息
           that.dialog();
           that.getProvince();
    },

    /**
     * 渲染页面项
     * @parma {array}{1} arr 数据数组
     */
    renderItem: function(arr,el) {
        var html = '';
        arr = arr || [];

        for(var i = 0, j = arr.length; i < j; i++) {
            html += '<li val="' + arr[i].arcode + '">' + arr[i].arname + '</li>';
        }
        $(el).html(html);
    },
    /**
     * 获取省
     */
    getProvince: function() {
        var that = this;

        // 获取省列表
        that.getArea(that.options.serviceId,that.options.cateid,that.options.arcode,'#list');
    },
    /**
     * 获取市
     */
    getCity: function(pId) {
        var that = this;
        //隐藏省份显示城市列表
        $('#list').addClass('dn');
        $('#cityList').scrollTop(0).removeClass('dn');
        // 获取市列表
        that.getArea(that.options.serviceId,that.options.cateid,pId,'#cityList');
    },
    /**
     * 获取区县
     */
    getDistrict: function(cId) {
        var that = this;
        //隐藏城市显示区县列表
        $('#cityList').addClass('dn');
        $('#disList').scrollTop(0).removeClass('dn');
        // 获取区县列表
        that.getArea(that.options.serviceId,that.options.cateid,cId,'#disList');
    },
    /**
     * 如果已经选过渲染页面省份，城市，区县
     *
     */
    renderAllArea: function() {
        var that = this,
            //获取到本地存储的地区信息
            areaStr = localStorage.getItem("dstrict");
       if(areaStr){
           that.renderAreaDialog(areaStr);
       }else{
            that.loadAreaInfo();
       }

    },
    /**
     * 如果已经选过渲染页面省份，城市，区县
     * @parma {string}{1} areaStr 地区
     */
    renderAreaDialog: function(areaStr) {
        var that = this,
            //转成json
            areaJson = JSON.parse(areaStr),
            pId = areaJson.p+'',//省份Id
            pName = areaJson.pn,//省份Id
            cId = areaJson.c+'',//城市Id
            cName = areaJson.cn,//城市Id
            dId = areaJson.d+'',//区县Id
            dName = areaJson.dn;//区县名称
        that.options.dstrict = areaJson;
        //加载弹出层
        that.dialog({
            okFn: function() {
                //加载省份
                that.getProvince();
                //加载城市
                that.getCity(pId);
                //加载区县
                that.getDistrict(cId);
                //显示导航最后一个标红选中
                $('.bar-list li').removeClass('dn').removeClass('cur').last().addClass('cur');
                //所选省份名称
                $('#proName').html(pName);
                //所选城市名称
                $('#cityName').html(cName);
                //所选区县名称
                $('#disName').html(dName);
            }
        });

        //选中省份
        that.checkAllArea(pId,'#list li');
        //选中城市
        that.checkAllArea(cId,'#cityList li');
        //选中区县
        that.checkAllArea(dId,'#disList li');

    },
    /**
     * 获取地区
     * @parma {number}{1} serviceId 服务id
     * @parma {number}{1} cateid 加点分类编号
     * @parma {number}{1} arcode 地区编号
     * @parma {number}{1} ele 地区添加父元素
     */
    getArea: function(serviceId,cateid,arcode,ele) {
        var that = this;
        // 请求...
        util.api({
            surl: root.CE_API_PATH + 'coverageArea',
            type: 'get',
            data:{
                serviceId: serviceId,
                cateid: cateid,
                arcode: arcode
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
                        // 渲染
                        if(body.area && ele){
                            // 渲染页面
                           body.area.chareas && that.renderItem(body.area.chareas,ele);
                        }else{
                            if(body.area){
                                //设置应该显示的城市
                                $(that.options.elval).html(body.area.arname)
                                body.area.arname && ($('#iselregion').html(body.area.arname) || '城区');
                                body.area.arname && ($('#iselregion2').html(body.area.arname) || '城区');
                            }else{
                               that.options.issupport = false;
                            }

                        }
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
    /**
     * 把已经选过的地区标红显示；
     * @parma{number} cityId 城市对应id
     * @parma(string) ele 要执行的元素
     */
    checkAllArea: function(cityId,ele) {
        var that = this;

        $.each($(ele),function(index,item){
            var oValue = $(this).attr('val');
            if(cityId == oValue){
                $(this).css('color','#ff4b46');
            }
        });

    },
    /**
     * 弹出框
     * @parma{object}{1, 0} parmas 参数
     *       {string}{1, 0} title 提示抬头文字，默认：提示
     *       {function}{1, 0} okFn 确认回调
     *       {function}{1, 0} cancelFn 取消回调
     */
    dialog: function(parmas) {
        var that = this,
            click = util.getClick();
        // 配置
        var cfg = $.extend({
                title: '选择地区',
                txtal: 'center',
                okFn: function() {},
                cancelFn: function() {}
            }, parmas),
            alertHTML = '';

        // 清空原层
        $('.area-dialog').remove();

        // 展示
        alertHTML = '<div class="area-dialog">'+
                        '<div class="area-main">'+
                            '<div class="title">'+
                                cfg.title+
                                '<div class="close"></div>'+
                            '</div>'+
                            '<ul class="bar-list">'+
                                '<li class="cur" id="proName">省</li>'+
                                '<li class="dn" id="cityName">市</li>'+
                                '<li class="dn" id="disName">区县</li>'+
                            '</ul>'+
                            '<div class="area-container">'+
                                '<ul class="list-textsingle" id="list"></ul>'+
                                '<ul class="list-textsingle dn" id="cityList"></ul>'+
                                '<ul class="list-textsingle dn" id="disList"></ul>'+
                            '</div>'+
                        '</div>'+
                    '</div> ';
        // 放入dom
        $('body').append(alertHTML);
        $('.container').css('overflow-y','hidden');
        // 取消按钮单击事件
        $('.area-dialog .close').off().on(click, function() {
            // 清空原层
            setTimeout(function(){$('.area-dialog').remove()},350);
            $('.container').css('overflow-y','auto');
            cfg.cancelFn && cfg.cancelFn();
        });

        cfg.okFn && cfg.okFn();
    },
    /**
     * DOM事件
     */
    addEvent: function() {
        var that = this,
            click = util.getClick(),
            frist=window.localStorage.getItem("frist");

        /*省份*/
        that.el.on(click, '#list li', function() {
            var proId = $(this).attr('val') || '',
                proName = $(this).text() || '';
            $(this).siblings().css('color','#333');
            $(this).css('color','#ff4b46');
            $('#proName').text(proName).removeClass('cur');
            if(!frist){
                $('#cityName').removeClass('dn').addClass('cur');
            }else{
                $('#cityName').text('市').removeClass('dn').addClass('cur');
                $('#disName').text('区县').addClass('dn');
            }
            // 省id
            that.options.dstrict.p = proId;
            // 省名称
            that.options.dstrict.pn = proName;
            //加载对应的城市
            that.getCity(proId);
        });
        /*城市*/
        that.el.on(click, '#cityList li', function() {
            // 市id
            var cityId = $(this).attr('val') || '',
                // 市名称
                cityName = $(this).text() || '';
            $(this).siblings().css('color','#333');
            $(this).css('color','#ff4b46');
            if(frist){
                $('#disName').text('区县');
            }
            $('#cityName').text(cityName).removeClass('cur');
            $('#disName').removeClass('dn').addClass('cur');
            // 城市id
            that.options.dstrict.c = cityId;
            // 城市名称
            that.options.dstrict.cn = cityName;
            //加载对应的城市
            that.getDistrict(cityId);
        });
        /*选项单击事件区县*/
        that.el.on(click, '#disList li', function() {
            var areaCityName;//所选城市名字
            $(this).siblings().css('color','#333');
            $(this).css('color','#ff4b46');
            // 县id
            that.options.dstrict.d = $(this).attr('val') || '';
            // 县名称
            that.options.dstrict.dn = $(this).text() || '';
            //存储到localStorage
            window.localStorage.dstrict = JSON.stringify(that.options.dstrict);
            //关闭弹出层
             setTimeout(function(){$('.area-dialog').remove()},350);
             //设置地区
             areaCityName=that.options.dstrict.dn || '城区';
             if($('#selectArea')){
                $('#selectArea').text(areaCityName);
             }
             $('.container').css('overflow-y','auto');
             //如果elval存在说明是点击了选择地址按钮
             if(that.options.sel == '#indexnew'){
                $(that.options.elval).attr({pId:that.options.dstrict.p,cId:that.options.dstrict.c,dId:that.options.dstrict.d});
                $(that.options.elval).html(that.options.dstrict.dn);
             }else{
                $(that.options.elval).attr({pId:that.options.dstrict.p,cId:that.options.dstrict.c,dId:that.options.dstrict.d});
                $(that.options.elval).html(that.options.dstrict.pn+' '+that.options.dstrict.cn+' '+that.options.dstrict.dn);
             }
            // 回调函数
            that.options.otherAction();
        });

        /*地址导航点击事件*/
        that.el.on(click, '.bar-list li', function() {
            var index = $(this).index();
            $(this).addClass('cur').siblings().removeClass('cur');
            $(".area-container > ul").eq(index).removeClass('dn').siblings().addClass('dn');
        });

        //选择地区
        that.el.on(click,'#selectArea',function(){
           that.renderAllArea();
        });

        /*选择地址事件*/
        if(that.options.elid){
            that.el.on(click, that.options.elid, function() {
                $('input').blur();
                var elVal = $(that.options.elval);
                if(elVal.attr('pId')){
                    that.renderAllArea();
                }else{
                    that.loadAreaInfo();
                }
            });
        }


    }
})