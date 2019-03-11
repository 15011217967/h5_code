function CitySelect() {
    this.callback = null;
    this.myScroll = null;
}

CitySelect.prototype.init = function(callback) {
    var self = this;
    self.callback = callback;
    //创建静态DOM
    self.domOpration();
    //是否已经手动城市
    var locdata = localStorage.getItem("location");
    if (locdata) {
        //已选择地址
        $(".citySelect-localCity-l").html('所选位置：' + JSON.parse(locdata).cityname + '-' + JSON.parse(locdata).arname);
    } else {
        //未选择 自动定位
        self.getLocation();
    }
    //获取热门城市
    self.getHotData();
    //获取城市 All
    self.getData('');
};

/*获取定位*/
CitySelect.prototype.getLocation = function() {
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
        $.ajax({
            url: "https://api.map.baidu.com/geocoder/v2/?ak=PZdyUpKzqnDH3aTAxXNCHLCjvu3tUwFc&callback=jsonpCallbackBaidu&location=" + r.point.lat + "," + r.point.lng + "&output=json&pois=0",
            type: 'get',
            dataType: "jsonp",
            async: false,
            jsonpCallback: "jsonpCallbackBaidu",
            success: function(res) {
                var body = res.result.addressComponent;
                var citySelected = {
                    cityname: body.city,
                    arname: body.district,
                    arcode: body.adcode,
                    street: body.street,
                    lng: r.point.lng,
                    lat: r.point.lat
                }
                localStorage.setItem("location", JSON.stringify(citySelected));
                $(".citySelect-localCity-l").html('当前位置：' + body.city + '-' + body.district);
                $(".citySelect-localCity-r").removeClass('auto').addClass('gray').html('GPS定位');
                CitySelect.callbackData = JSON.parse(localStorage.getItem("location"));
                history.back();
            }
        });
    }, {
        enableHighAccuracy: true
    });
}

CitySelect.prototype.getHotData = function(divisionCode, index) {
    var self = this;
    //请求热门城市接口
    util.api({
        //surl: 'resources/json/cityhot.json',
        surl: '/region/yf/hotcity',
        type: 'get',
        success: function(res) {
            var rpco = res.rpco;
            // 处理
            switch (rpco) {
                case 200:
                    var body = res.body.templetList[0].dataList || [];
                    var cityHotData = {};
                    cityHotData.listCity = body;
                    CitySelect.cityHotData = cityHotData;
                    self.render(2);
                    break;
                default:
                    util.tip('请求失败');
            }
        }
    });
}

CitySelect.prototype.getData = function(divisionCode, index, type) {
    var self = this;
    //请求城市接口
    util.api({
        //surl: 'apis/region/coverageArea?divisionCode=' + divisionCode,
        surl: '/region/yf/coverageArea?divisionCode=' + divisionCode,
        type: 'get',
        success: function(res) {
            var status = res.rpco,
                body = res.body || [];
            // 处理
            switch (status) {
                case 200:
                    if (divisionCode) {
                        var ls = window.localStorage,
                            secondLevel = JSON.parse(ls.getItem('secondLevel')),
                            allAera;
                        if (secondLevel) {
                            if (secondLevel.lvl == 2) {
                                // 非热门城市
                                allAera = {
                                    parentDivisionName: secondLevel.arname,
                                    arname: '全城',
                                    arcode: secondLevel.arcode,
                                    lvl: secondLevel.lvl
                                }
                            } else {
                                allAera = {
                                    parentDivisionName: secondLevel.cityName,
                                    arname: '全城',
                                    arcode: secondLevel.remark,
                                    lvl: 2
                                }
                            }
                        }
                        body.push(allAera);
                        body.sort(function(a, b) {
                            return a.arname.length - b.arname.length;
                        });
                        var districtData = {};
                        districtData.listCity = body;
                        CitySelect.districtData = districtData;
                        self.childrender(index, type);
                    } else {
                        var finalbody = [];
                        var letters = "abcdefghijklmnopqrstuvwxyz".split('');
                        $.each(letters, function(i) {
                            var k = 0;
                            $.each(body, function(j) {
                                if (body[j].fl == letters[i]) {
                                    k++;
                                }
                            })
                            if (k > 0) {
                                finalbody.push({
                                    arcode: null,
                                    arname: letters[i].toUpperCase(),
                                    fl: 1
                                })
                            }
                            $.each(body, function(j) {
                                if (body[j].fl == letters[i]) {
                                    finalbody.push(res.body[j])
                                }
                            })
                        });
                        var cityData = {};
                        cityData.listCity = finalbody;
                        CitySelect.cityData = cityData;
                        self.render(1);
                    }
                    break;
                default:
                    util.tip('请求失败');
            }
        }
    });
}

CitySelect.prototype.domOpration = function() {
    var self = this;
    //插入DOM中
    if ($('#citySelectComponent').length > 0) {
        return;
    }
    $('body').append(self.templateHtml());
    //DOM操作
    $citySelect = $('#citySelectComponent');
    $citySelect.width($(window).width());
    $citySelect.height($(window).height());

    $wrapper = $('#citySelectComponent .wrapper');
    $wrapper.height($(window).height() - $citySelect.find('.citySelect-search').height());
    //滚动条
    self.myScroll = new IScroll('#citySelectComponent .wrapper', {
        scrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true,
        click: true
    })

    //动画显示
    self.selectAnimate("show");

    //字母提示框
    $tipsLetter = $citySelect.find('.tipsLetter');
    //字母列表操作
    $letterList = $citySelect.find('.citySelect-letterList');
    $letterList.height($wrapper.height() - $citySelect.find('.citySelect-localCity').height() - $citySelect.find('.citySelect-hotCity li.citySelect-letter').height() - $citySelect.find('.citySelect-hotCity li.citySelect-text').height() / 3);
    $letterList.css("top", $citySelect.find('.citySelect-search').height() + $citySelect.find('.citySelect-localCity').height() + $citySelect.find('.citySelect-hotCity li.citySelect-letter').height() + $citySelect.find('.citySelect-hotCity li.citySelect-text').height() / 3);
    $letterList.css("right", "0px");
    //将所有字母元素保存到数组中
    var letterArr = $letterList.find('div');
    //触摸事件处理
    $letterList.on("touchstart", function(e) {
        e.preventDefault();
        $tipsLetter.text($(e.target).text());
        $tipsLetter.show();
        self.myScroll.scrollToElement('.scroller li[letter="' + $(e.target).text() + '"]', 100);
    });
    $letterList.on("touchmove", function(e) {
        e.preventDefault();
        var touch = e.targetTouches[0];
        var position = touch.clientY - ($citySelect.find('.citySelect-search').height());
        var index = parseInt(position / ($(letterArr[0]).height()));
        if (index < 0) {
            index = 0;
        } else if (index > letterArr.length - 1) {
            index = letterArr.length - 1;
        }
        $tipsLetter.text($(letterArr[index]).text());
        //console.log($(letterArr[index]).text());
        self.myScroll.scrollToElement('.scroller li[letter="' + $(letterArr[index]).text() + '"]', 100);
    });
    $letterList.on("touchend", function(e) {
        e.preventDefault();
        $tipsLetter.hide();
    });

    //关闭按钮
    $citySelect.find('.citySelect-close-btn').click(function(e) {
        CitySelect.callbackData = null;
        history.back();
    });

    //监听hash变化
    $(window).on('hashchange', function(e) {
        if (e.newURL + "#hide" == e.oldURL) {
            self.selectAnimate("hide", function() {
                if (CitySelect.callbackData) {
                    self.callback(CitySelect.callbackData);
                }
            });
        }
    });
}

CitySelect.prototype.ajaxTemplateHtml = function(type) {
    if (type == 1) {
        var source = '<ul class="font-30">' +
            '           {{each listCity as cityList j}}' +
            '           {{if cityList.fl==1}}' +
            '           <li letter={{cityList.arname}} data-first={{j}} class="citySelect-letter font-28">{{cityList.arname}}</li>' +
            '           {{else}}' +
            '           <li letter={{cityList.arname}} data-first={{j}} class="citySelect-text">{{cityList.arname}}<span></span>' +
            '               <dl class="none"></dl>' +
            '           </li>' +
            '           {{/if}}' +
            '           {{/each}}' +
            '         </ul>' +
            '         <div class="clear"></div>';
    } else {
        var source = '<ul class="font-30">' +
            '           <li letter="热门" class="citySelect-letter font-28">热门城市</li>' +
            '           {{each listCity as cityList j}}' +
            '           <li letter={{cityList.cityName}} data-hot={{j}} class="citySelect-text">{{cityList.cityName}}<span></span>' +
            '               <dl class="none"></dl>' +
            '           </li>' +
            '           {{/each}}' +
            '         </ul>' +
            '         <div class="clear"></div>';
    }
    return source;
}

CitySelect.prototype.ajaxChildTemplateHtml = function() {
    var source = '{{each listCity as cityList i}}' +
        '           {{if cityList.arname.length>6}}' +
        '           <dd class="long" data-index={{i}}>{{cityList.arname}}</dd>' +
        '           {{else}}' +
        '           <dd data-index={{i}}>{{cityList.arname}}</dd>' +
        '           {{/if}}' +
        '         {{/each}}';
    return source;
}

CitySelect.prototype.templateHtml = function() {
    var source = '<div id="citySelectComponent">' +
        '         <div class="relative-position">' +
        '            <section class="citySelect-search bdr-bottom">' +
        '                <div class="citySelect-search-content">' +
        '                    <span class="citySelect-close-btn"></span>' +
        '                    <span class="citySelect-title font-30">选择城市</span>' +
        '                </div>' +
        '            </section>' +
        '            <div class="wrapper">' +
        '                <div class="scroller">' +
        '                   <article class="citySelect-content">' +
        '                       <section class="citySelect-localCity bdr-bottom">' +
        '                            <div class="citySelect-localCity-l font-30">所选位置：北京市-朝阳区</div>' +
        '                            <div class="citySelect-localCity-r font-26 auto">获取定位</div>' +
        '                       </section>' +
        '                       <section class="citySelect-hotCity">' +
        '                       </section>' +
        '                       <section class="citySelect-allCity">' +
        '                       </section>' +
        '                   </article>' +
        '                </div>' +
        '            </div>' +
        '            <!--首字母导航-->' +
        '            <section class="citySelect-letterList font-22">' +
        '                <div>热门</div>' +
        '                <div>A</div>' +
        '                <div>B</div>' +
        '                <div>C</div>' +
        '                <div>D</div>' +
        '                <div>E</div>' +
        '                <div>F</div>' +
        '                <div>G</div>' +
        '                <div>H</div>' +
        '                <div>I</div>' +
        '                <div>J</div>' +
        '                <div>K</div>' +
        '                <div>L</div>' +
        '                <div>M</div>' +
        '                <div>N</div>' +
        '                <div>O</div>' +
        '                <div>P</div>' +
        '                <div>Q</div>' +
        '                <div>R</div>' +
        '                <div>S</div>' +
        '                <div>T</div>' +
        '                <div>U</div>' +
        '                <div>V</div>' +
        '                <div>W</div>' +
        '                <div>X</div>' +
        '                <div>Y</div>' +
        '                <div>Z</div>' +
        '            </section>' +
        '            <!--滑动时提示字母-->' +
        '            <div class="tipsLetter font-48"></div>' +
        '        </div>' +
        '    </div>';
    return source;
};

/*二级地区渲染*/
CitySelect.prototype.render = function(type) {
    var self = this;
    if (type == 1) {
        //所有城市
        var render = template.compile(self.ajaxTemplateHtml(type));
        var html = render(CitySelect.cityData);
        $('#citySelectComponent .scroller .citySelect-allCity').html(html);
        self.myScroll.refresh();
        $letterList.show();
    } else {
        //热门城市
        var render = template.compile(self.ajaxTemplateHtml(type));
        var html = render(CitySelect.cityHotData);
        $('#citySelectComponent .scroller .citySelect-hotCity').html(html);
        self.myScroll.refresh();
    }
}

/*三级地区渲染*/
CitySelect.prototype.childrender = function(index, type) {
    var self = this;
    //模板引擎生成页面
    var render = template.compile(self.ajaxChildTemplateHtml());
    var html = render(CitySelect.districtData);
    if (type == 1) {
        $('#citySelectComponent .citySelect-allCity li').eq(index).find("dl").html(html);
    } else {
        $('#citySelectComponent .citySelect-hotCity li').eq(index).find("dl").html(html);
    }
    self.myScroll.refresh();
}

CitySelect.prototype.selectAnimate = function(state, callback) {
    var $citySelectComponent = $('#citySelectComponent');
    if (state == "show") {
        $citySelectComponent.css("left", $(window).width());
        $citySelectComponent.css("top", 0);
        setTimeout(function() {
            $citySelectComponent.show();
            $citySelectComponent.animate({
                left: '0px'
            }, 300, 'ease-out');
        }, 100);
    } else {
        $citySelectComponent.animate({
            left: $(window).width()
        }, 200, 'ease-out', function() {
            $citySelectComponent.remove();
            if (callback) {
                callback();
            }
        });
    }
}

/*供调用接口*/
var citySelect = function(callback) {
    var preHandler = function(e){e.preventDefault();}
    if (typeof callback === 'function') {
        if ($('#citySelectComponent').length == 0) { //如果dom中已经存在该控件
            var citySelect = new CitySelect();
            citySelect.init(callback);
        }
        //添加hash
        if (window.location.href.search("#hide") == -1) {
            window.location.href = window.location.href + "#hide";
        }
        //首先移除监听事件
        $(document).off(util.getClick());
        //热门城市展开三级
        $(document).on(util.getClick(), '#citySelectComponent .citySelect-hotCity li', function(e) {
            var curIndex = $(this).attr("data-hot");
            $('#citySelectComponent .citySelect-allCity li.citySelect-text').find("span").removeClass("up");
            $('#citySelectComponent .citySelect-allCity li.citySelect-text').find("dl").addClass("none");
            $(this).siblings(".citySelect-text").find("span").removeClass("up");
            $(this).siblings(".citySelect-text").find("dl").addClass("none");
            $(this).find("span").toggleClass('up');
            $(this).find("dl").toggleClass('none');
            // 缓存选中二级城市
            localStorage.setItem("secondLevel", JSON.stringify(CitySelect.cityHotData.listCity[curIndex]));
            citySelect.getData(CitySelect.cityHotData.listCity[curIndex].onlineAreaCode, $(this).index(), 2);
            e.preventDefault();
        });
        //城市展开三级
        $(document).on(util.getClick(), '#citySelectComponent .citySelect-allCity li.citySelect-text', function(e) {
            var curIndex = $(this).attr("data-first");
            $('#citySelectComponent .citySelect-hotCity li').find("span").removeClass("up");
            $('#citySelectComponent .citySelect-hotCity li').find("dl").addClass("none");
            $(this).siblings(".citySelect-text").find("span").removeClass("up");
            $(this).siblings(".citySelect-text").find("dl").addClass("none");
            $(this).find("span").toggleClass('up');
            $(this).find("dl").toggleClass('none');
            // 缓存选中二级城市
            localStorage.setItem("secondLevel", JSON.stringify(CitySelect.cityData.listCity[curIndex]));
            citySelect.getData(CitySelect.cityData.listCity[curIndex].divisionCode, $(this).index(), 1);
            e.preventDefault();
        });
        //三级选择事件
        $(document).on(util.getClick(), '#citySelectComponent .citySelect-allCity li.citySelect-text dd,#citySelectComponent .citySelect-hotCity li.citySelect-text dd', function(e) {
            var curIndex = $(this).attr("data-index");
            var onIndex = JSON.parse(localStorage.getItem("location"));
            // console.log(CitySelect.districtData.listCity[curIndex])
            var citySelected = {
                cityname: CitySelect.districtData.listCity[curIndex].parentDivisionName,
                arname: CitySelect.districtData.listCity[curIndex].arname,
                arcode: CitySelect.districtData.listCity[curIndex].arcode,
                daId: CitySelect.districtData.listCity[curIndex].daId,
                divisionCode: CitySelect.districtData.listCity[curIndex].divisionCode,
                fl: CitySelect.districtData.listCity[curIndex].fl,
                lvl: CitySelect.districtData.listCity[curIndex].lvl,
                parentDivisionCode: CitySelect.districtData.listCity[curIndex].parentDivisionCode,
                parentDivisionName: CitySelect.districtData.listCity[curIndex].parentDivisionName,
                pinyinCode: CitySelect.districtData.listCity[curIndex].pinyinCode,
                street: null,
                lng: onIndex.lng,
                lat: onIndex.lat
            };
            CitySelect.callbackData = citySelected;
            // 缓存选择城市
            localStorage.setItem("location", JSON.stringify(citySelected));
            history.back();
            e.preventDefault();
        });
        // //点击定位位置
        // $(document).on(util.getClick(), '#citySelectComponent .citySelect-localCity .citySelect-localCity-l', function(e) {
        //     CitySelect.callbackData = JSON.parse(localStorage.getItem("location"));
        //     history.back();
        //     e.preventDefault();
        // });
        //点击获取定位
        $(document).on(util.getClick(), '#citySelectComponent .citySelect-localCity .citySelect-localCity-r.auto', function(e) {
            //清除城市缓存
            localStorage.removeItem("location");
            citySelect.getLocation();
            e.preventDefault();
        });
    } else {
        console.log("错误：该函数只接受回调方法！");
    }
}

/*获取定位接口*/
var getGps = function(callback) {
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
        util.api({
            surl: "https://api.map.baidu.com/geocoder/v2/?ak=PZdyUpKzqnDH3aTAxXNCHLCjvu3tUwFc&callback=jsonpCallbackBaidu&location=" + r.point.lat + "," + r.point.lng + "&output=json&pois=0",
            type: 'get',
            dataType: "jsonp",
            async: false,
            cache: false,
            jsonpCallback: "jsonpCallbackBaidu",
            success: function(res) {
                var body = res.result.addressComponent;
                var citySelected = {
                    cityname: body.city,
                    arname: body.district,
                    arcode: body.adcode,
                    street: body.street,
                    lng: r.point.lng,
                    lat: r.point.lat
                }
                localStorage.setItem("location", JSON.stringify(citySelected));
                callback && callback(citySelected);  
            }
        });
    }, {
        enableHighAccuracy: true
    });
}