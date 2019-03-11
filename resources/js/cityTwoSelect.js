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
    var locdata = localStorage.getItem("twolocation");
    if (locdata) {
        //已选择地址
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
                localStorage.setItem("twolocation", JSON.stringify(citySelected));
                CitySelect.callbackData = citySelected;
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
                    if (body.length > 0) {
                        for (var i = 0; i < body.length; i++) {　　
                            if (i == 0) {
                                body[i].char = 1;
                            } else {
                                body[i].char = 0;
                            }
                        }
                    }
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
        surl: '/region/yf/coverageArea?divisionCode=' + divisionCode,
        type: 'get',
        success: function(res) {
            var status = res.rpco,
                body = res.body || [];
            // 处理
            switch (status) {
                case 200:
                    var finalbody = [];
                    var letters = "abcdefghijklmnopqrstuvwxyz".split('');
                    $.each(letters, function(i) {
                        var k = 0;
                        $.each(body, function(j) {
                            if (body[j].fl == letters[i]) {
                                k++;
                                if (k == 1) {
                                    res.body[j].char = letters[i].toUpperCase();
                                } else {
                                    res.body[j].char = 0;
                                }
                                finalbody.push(res.body[j])
                            }
                        })
                    });
                    var cityData = {};
                    cityData.listCity = finalbody;
                    CitySelect.cityData = cityData;
                    self.render(1);
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
    var topHeight = $('.feed-store').height() + $('.feed-space').height() + $('.feed-hint').height(),
        listheight = $(window).height() - topHeight;
    $('#city-list').append(self.templateHtml());
    $('#city-list').css("height", listheight);
    //DOM操作
    $citySelect = $('#citySelectComponent');
    $citySelect.width($(window).width());
    $citySelect.height(listheight);

    $wrapper = $('#citySelectComponent .wrapper');
    $wrapper.height(listheight);
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
    $letterList.height($wrapper.height() - $citySelect.find('.citySelect-hotCity li.citySelect-text').height() / 3);
    $letterList.css("top", $('#header').height() + $('.feed-hint').height() + $('.feed-space').height() + 10);
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
        var position = touch.clientY;
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
            '           {{if cityList.char==0}}' +
            '           <li data-first={{j}} class="citySelect-text bdr-bottom">{{cityList.arname}}</li>' +
            '           {{else}}' +
            '           <li letter={{cityList.char}} data-first={{j}} class="citySelect-text bdr-bottom"><i class="font-28">{{cityList.char}}</i>{{cityList.arname}}</li>' +
            '           {{/if}}' +
            '           {{/each}}' +
            '         </ul>' +
            '         <div class="clear"></div>';
    } else {
        var source = '<ul class="font-30">' +
            '           {{each listCity as cityList j}}' +
            '           {{if cityList.char==1}}' +
            '           <li letter="热门" data-hot={{j}} class="citySelect-text bdr-bottom">{{cityList.cityName}}</li>' +
            '           {{else}}' +
            '           <li data-hot={{j}} class="citySelect-text bdr-bottom">{{cityList.cityName}}</li>' +
            '           {{/if}}' +
            '           {{/each}}' +
            '         </ul>' +
            '         <div class="clear"></div>';
    }
    return source;
}

CitySelect.prototype.templateHtml = function() {
    var source = '<div id="citySelectComponent">' +
        '         <div class="relative-position">' +
        '            <div class="wrapper">' +
        '                <div class="scroller">' +
        '                   <article class="citySelect-content">' +
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

CitySelect.prototype.selectAnimate = function(state, callback) {
    var $citySelectComponent = $('#citySelectComponent');
    if (state == "show") {
        var topHeight = $('.feed-store').height() + $('.feed-space').height() + $('.feed-hint').height();
        $citySelectComponent.css("left", 0);
        $citySelectComponent.css("top", $(window).height() - topHeight);
        setTimeout(function() {
            $citySelectComponent.show();
            $citySelectComponent.animate({
                top: topHeight
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
    var preHandler = function(e) {
        e.preventDefault();
    }
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
        //热门城市选择
        $(document).on(util.getClick(), '#citySelectComponent .citySelect-hotCity li', function(e) {
            var curIndex = $(this).attr("data-hot"),
                onIndex = JSON.parse(localStorage.getItem("twolocation"));
            var citySelected = {
                cityname: CitySelect.cityHotData.listCity[curIndex].cityName,
                arcode: CitySelect.cityHotData.listCity[curIndex].remark,
                lng: onIndex.lng,
                lat: onIndex.lat
            };
            CitySelect.callbackData = citySelected;
            // 缓存选择城市
            localStorage.setItem("twolocation", JSON.stringify(citySelected));
            $('#city-list').css("height", 0);
            $(".city-title b").removeClass('up');
            // $(".city-title em").addClass('none');
            $(".container").css("z-index", 0);
            history.back();
            e.preventDefault();
        });
        //城市选择
        $(document).on(util.getClick(), '#citySelectComponent .citySelect-allCity li.citySelect-text', function(e) {
            var curIndex = $(this).attr("data-first"),
                onIndex = JSON.parse(localStorage.getItem("twolocation"));
            // console.log(CitySelect.districtData.listCity[curIndex])
            var citySelected = {
                cityname: CitySelect.cityData.listCity[curIndex].arname,
                arname: CitySelect.cityData.listCity[curIndex].arname,
                arcode: CitySelect.cityData.listCity[curIndex].arcode,
                daId: CitySelect.cityData.listCity[curIndex].daId,
                divisionCode: CitySelect.cityData.listCity[curIndex].divisionCode,
                fl: CitySelect.cityData.listCity[curIndex].fl,
                lvl: CitySelect.cityData.listCity[curIndex].lvl,
                parentDivisionCode: CitySelect.cityData.listCity[curIndex].parentDivisionCode,
                parentDivisionName: CitySelect.cityData.listCity[curIndex].parentDivisionName,
                pinyinCode: CitySelect.cityData.listCity[curIndex].pinyinCode,
                lng: onIndex.lng,
                lat: onIndex.lat
            };
            CitySelect.callbackData = citySelected;
            // 缓存选择城市
            localStorage.setItem("twolocation", JSON.stringify(citySelected));
            $('#city-list').css("height", 0);
            $(".city-title b").removeClass('up');
            // $(".city-title em").addClass('none');
            $(".container").css("z-index", 0);
            history.back();
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
            jsonpCallback: "jsonpCallbackBaidu",
            success: function(res) {
                var body = res.result.addressComponent;
                var citySelected = {
                    cityname: body.city,
                    arname: body.district,
                    arcode: body.adcode,
                    lng: r.point.lng,
                    lat: r.point.lat
                }
                localStorage.setItem("twolocation", JSON.stringify(citySelected));
                $('#citySelectComponent').remove();
                $('#city-list').css("height", 0);
                $(".city-title b").removeClass('up');
                // $(".city-title em").addClass('none');
                $(".container").css("z-index", 0);
                callback && callback(citySelected);
            }
        });
    }, {
        enableHighAccuracy: true
    });
}