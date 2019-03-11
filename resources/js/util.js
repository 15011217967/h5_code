var root = window || {};
root.BASE_PATH = '/';
root.API_PATH = root.BASE_PATH + '';
// 公共模块
root.CM_API_PATH = root.BASE_PATH + 'common/v1/';
//公共头尾
root.CI_API_PATH = root.BASE_PATH + 'index/yf/';
//消息模块
root.ME_API_PATH = root.BASE_PATH + 'message/yf/';
// 会员模块
root.MB_API_PATH = root.BASE_PATH + 'member/yf/';
// 资产模块
root.AS_API_PATH = root.BASE_PATH + 'asset/yf/';
// 业务相关
root.BSNS_API_PATH = root.BASE_PATH + 'business/yf/';
// 资源分组
root.RESGRP_API_PATH = root.BASE_PATH + 'webres/v1/';
// 微信公共加
root.WXCM_API_PATH = root.BASE_PATH + 'wxcommon/v1/';
//root.JKX_API_PATH = root.BASE_PATH + 'jkx/v1/';
// 极客修
root.WXP_API_PATH = root.BASE_PATH + 'wxpay/v1/sod/';
// 地区Json文件
root.PVC_API_PATH = root.BASE_PATH + 'json/pvc/';
// 服务地区Json文件
root.SERAREA_API_PATH = root.BASE_PATH + 'json/servicearea/';
// 电子说明书
root.EDOC_API_PATH = root.BASE_PATH + 'edoc/GomeWordWeb/asset/v1/wx/';
// 用户头像图片调用地址
root.USERPIC_API_PATH = root.BASE_PATH + 'member/yf/getheader?id=';
// 留言板地址
root.MSGBOARD_API_PATH = root.BASE_PATH + 'edoc/scmi/scmi/';
// 统计报表地址
root.REPORTCHART_API_PATH = root.BASE_PATH + 'stats/v1/';
// // 内购会地址
// root.PURCHASING_API_PATH = root.BASE_PATH + 'purchasing/v1/';
// // 内购会统计地址
// root.PURCHASDATA_API_PATH = root.BASE_PATH + 'destroy/';
//  回收
root.RECYCLE_API_PATH = root.BASE_PATH + 'recycle/yf/';
//  维修
root.REPAIR_API_PATH = root.BASE_PATH + 'repair/yf/';
//  清洗
root.CLEAN_API_PATH = root.BASE_PATH + 'clean/yf/';
//  安装
root.INSTALL_API_PATH = root.BASE_PATH + 'install/yf/';
//  广告接口
root.CONFIG_API_PATH = root.BASE_PATH + 'config/v1/';
//  订单
root.ORDER_API_PATH = root.BASE_PATH + 'order/yf/';
//  查询服务支持地区范围
root.CE_API_PATH = root.BASE_PATH + 'service/yf/';
// 选择地址区域四级（国美在线）
root.Area_API_PATH = root.BASE_PATH + 'region/yf/';
//  支付接口
root.CHR_API_PATH = root.BASE_PATH + 'cashier/yf/';
// 内购会地址
root.PURCHASING_API_PATH = root.BASE_PATH + 'purchasing/v1/';
// 内购会统计地址
root.PURCHASDATA_API_PATH = root.BASE_PATH + 'destroy/';
// 注册地址
root.REGIST_API_PATH = root.BASE_PATH+'register/';
// 电子发票
root.EINVOICE_API_PATH = root.BASE_PATH +'einvoice/yf/';
//商品接口
root.GOODS_API_PATH = root.BASE_PATH +'order/yf/standard/';
//电子说明书通用
root.INSTRUCTION_API_PATH = root.BASE_PATH+'instruction/yf/';
//登录
root.LOGIN_API_PATH = root.BASE_PATH+'login/yf/';
//个人设置
root.USER_API_PATH = root.BASE_PATH +'member/yf/';

//美豆
root.CLWEED_API_PATH = root.BASE_PATH +'gomedo/yf/';
//虚拟充值
root.VIRTUAL_API_PATH = root.BASE_PATH +'virtual/yf/';
//评价
root.COMMENT_API_PATH = root.BASE_PATH +'comment/yf/';
//管家二手
root.RESELL_API_PATH = root.BASE_PATH +'resell/yf/';
//空调移机加氟
root.YJJF_API_PATH = root.BASE_PATH +'yjjf/yf/';
//配件
root.PARTS_API_PATH = root.BASE_PATH +'parts/yf/';
//在线商品数据映射接口（维修）
root.DATAMAP_API_PATH = root.BASE_PATH +'orderaftersales/yf/';

root.ORDERTRACK_API_PATH = root.BASE_PATH +'order/v2/';
//领券接口
root.TICKET_API_PATH = root.BASE_PATH +'order/v2/';

//以旧换新接口
root.CLEANPACKAGE_PATH = root.BASE_PATH +'cleanPackage/yf/';

root.VERSION = '57';
root.EMPTY_FN = function() {};

// 工具箱
root.util = {
	// 公共定时器
	interval: {},
	// 不进行微信认证登录
	noWxLogin: window.NO_WXLOGIN
		/*,
			// 是否可发送ajax请求
			canSendAjax: true*/
};
// 操作状态
root.util.OPT_STATE = {
	// 启用/新增/修改(带主键)
	UPDATE: 1,
	// 禁用
	DISABLED: 2,
	// 删除
	DELETE: 3
};

/**
 * js小工具
 */
$.extend(root.util, {
	/**
	 * 清除sessionStorage某个值
	 * @parma {string}{1} name 需要删除的名字
	 */
	 removeSession: function(name) {
	 	var ss = window.sessionStorage;
	 	if(!!ss.getItem(name)){
			ss.removeItem(name);
		}
	 },
	unionLogin:function(){
		var st = util.getCookie("lgst"),
			uid = util.getCookie("userId"),
			scn = util.getCookie("SCN"),
			num = util.getCookie("lgNum"),
			httpText = "http"+(location.href.indexOf("https://")>=0?"s":"")+"://",
			unlogin = mcUniteLoginmc,
			unionUrl = httpText+ unlogin +"/api/guanjia?source=gomegj";//联合登录国美在线接口环境
		if(st === "200"){
			if(util.isWeixin()&&!num){
				util.addCookie("lgNum","1",1);
				$.ajax({
					url:unionUrl,
					type:"post",
					data:{
						DYN_USER_CONFIRM:scn,
						DNY_USER_ID:uid
					},
					crossDomain: true,
					success:function(res){
					},
					error:function(res){
						console.log(res)
					}
				})
			}
		}
	},
	/**
	 * 是否为微信浏览器
	 */
	isWeixin: function() {
		return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger";
	},
	/**
	 * 单击事件
	 */
	getClick: function() {
		return this.checkSupportTouch() ? 'tap' : 'click';
	},
	/**
	 * 手指按下事件
	 */
	getMousedown: function() {
		return this.checkSupportTouch() ? 'touchstart' : 'mousedown';
	},
	/**
	 * 手指抬起事件
	 */
	getMouseup: function() {
		return this.checkSupportTouch() ? 'touchend' : 'mouseup';
	},
	/**
	 * 手指移动事件
	 */
	getMousemove: function() {
		return this.checkSupportTouch() ? 'touchmove' : 'mousemove';
	},
	/**
	 * 是否支持触摸事件
	 * @return {boolean}{1} 是否支持，true：支持；false：不支持。
	 */
	checkSupportTouch: function() {
		//return window.document.hasOwnProperty("ontouchstart");
		return typeof window.document.ontouchstart !== 'undefined';
	},
	/**
	 * 字符显示加密
	 * @parma {string}{1} str 待加密字符串
	 * @parma {number}{1, 0} esi 加密开始下标，默认：0
	 * @parma {number}{1, 0} eco 加密字符数，默认：0
	 * @parma {string}{1, 0} ech 加密符号，默认：*
	 * @return {string} 已加密字符串
	 */
	strEncrypt: function(str, esi, eco, ech) {
		var str = str + '',
			estr = str,
			ech = ech || '*',
			// 结束位置
			eei = esi + eco - 1;
		return str && str.replace(/./g, function(s, i) {
			return (i >= esi && i <= eei) ? ech : s;
		});
	},
	/**
	 * 格式化日期
	 * @parma {number, string}{1} time 时间 number:毫秒数，日期字符串
	 * @parma {string}{1, 0} formate 格式化字符串
	 */
	formateDate: function(time, formate) {
		var result = '',
			year,
			month,
			day,
			hour,
			minute,
			second;

		(typeof time === 'string') && (time = time.replace(/-/g, '/'));
		time = new Date(time);

		// 为有效时间
		if (!isNaN(time.getTime())) {
			// 年
			year = time.getFullYear();
			// 月
			month = time.getMonth() + 1;
			(month < 10) && (month = '0' + month);
			// 日
			day = time.getDate();
			(day < 10) && (day = '0' + day);
			// 时
			hour = time.getHours();
			(hour < 10) && (hour = '0' + hour);
			// 分
			minute = time.getMinutes();
			(minute < 10) && (minute = '0' + minute);
			// 秒
			second = time.getSeconds();
			(second < 10) && (second = '0' + second);

			result = formate.replace(/yyyy/g, year).replace(/MM/g, month).replace(/dd/g, day).
			replace(/hh/g, hour).replace(/mm/g, minute).replace(/ss/g, second);
		}

		return result;
	},
	/**
	 * 获取url参数
	 * @parma {string}{1, 0} url 待解析路径
	 */
	getHrefParma: function(url) {
		var parma = {},
			// 参数数组
			parmaArr = [],
			item = '',
			// 下标
			i,
			j,
			k,
			n;

		if (url) {
			i = url.indexOf('?');
			url = i > -1 ? url.slice(i + 1) : '';
		} else {
			url = decodeURI(window.location.search.slice(1));
		}

		// ou所在下标
		i = url.indexOf('ou=');
		// 截取ou，注：此参数必须位于最后
		if (i > -1) {
			parma.ou = url.slice(i + 3);
			// 清除ou部分
			url = url.slice(0, i);
		}

		// 赋值
		parmaArr = url.split('&');
		for (var i in parmaArr) {
			item = parmaArr[i];

			j = item.indexOf('=');
			// 不存在键值对
			if (j < 0) {
				continue;
			}

			k = item.slice(0, j);
			n = item.slice(j + 1);

			parma[k] = k === 'cbu' ? util.decode(n) : n;
			//item[0] && (parma[item[0]] = item[0] === 'cbu' ? util.decode(item[1]) : item[1]);
		}
		return parma;
	},

	/**解码url中的单词，直到解码出汉字（无法再解码）为止*/
	decodeurl:function(url){
		var that  = this;
        var newUrl = decodeURIComponent(url);
        if(newUrl!=url){
            return that.decodeurl(newUrl)
        } else{
            return newUrl;
        }
    },
	/**
   * 图片预加载处理
   */
	 imgLazyload: function() {
       var that = this;
       $('img[data]').each(function(){
             var _this = $(this);
             var url = _this.attr('data');
             var src = _this.attr('src');
             //这里判断如果图片实际地址不存在或者已经加载不处理
             if(url ==''|| url == src)
             {
                return;
             }
             //实例化一个图片的对象
             var img =new Image();
             //将要显示的图片加载进来
             img.src = url;
             //如果图片已经加载存在浏览器缓存中直接处理
              if(img.complete)
              {
                //将要显示的图片替换过来
                  _this.attr('src',url);
                    return;
              }
              //要显示的图片加载完成后做处理
              img.onload =function(){
                _this.attr('src',url);
              }
        });
    },
	 // 判断是否为微信浏览器
    isWeiXin:function(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    },
	 /**
	  * 取浏览器cookie
	  * @parma {string}{1} name cookie key名
	  */
    getCookie:function(name){
		var strCookie=document.cookie;
		var arrCookie=strCookie.split("; ");
		for(var i=0;i<arrCookie.length;i++){
			var arr=arrCookie[i].split("=");
			if(arr[0]==name)return arr[1];
		}
		return "";
	},
	/**
	 * 添加浏览器cookie
	 * @parma {string}{1} name cookie key名
	 * @parma {string}{1} value cookie key值
	 * @parma {number}{1} expiresDays cookie失效的天数
	 */
	addCookie:function(name,value,expiresDays){
		var cookieString=name+"="+escape(value);
		//判断是否设置过期时间
		if(expiresDays>0){
			var date=new Date();
			date.setTime(date.getTime+expiresDays*24*3600*1000);
			cookieString=cookieString+"; expires="+date.toGMTString();
		}
		document.cookie=cookieString;
	},
	/**
	 * 设置url参数
	 * @parma {string}{1} url 目标路径
	 * @parma {object}{1} parma 参数对象
	 * @return {string} url 操作完成路径
	 */
	setHrefParma: function(url, parma) {
		var parma = parma || {},
			parmaStr = '';

		// 参数
		parma = $.extend(util.getHrefParma(url), parma);

		if (url && parma) {
			// 去除参数
			url = url.replace(/\?.*$/, '');
			// 遍历放入
			for (var key in parma) {

				if (!parma.hasOwnProperty(key)) {
					continue;
				}
				//
				if (key === 'ou' || key === 'cbu') {
					continue;
				}

				parmaStr += key + '=' + parma[key] + '&';
			}

			// 回调页面
			parma.cbu && (parmaStr += 'cbu=' + util.encode(parma.cbu) + '&');
			// 原地址
			parma.ou && (parmaStr += 'ou=' + parma.ou + '&');
			// 去除最后“&”
			parmaStr && (url += '?' + parmaStr.replace(/&$/, ''));
		}

		return url;
	},
	// /**
	//  * 跳转页面
	//  * @parma {string}{1} url 目标路径
	//  * @parma {object}{1, 0} urlParma 追加参数
	//  * @parma {boolean}{1, 0} isReserveParma 是否清除原路径参数
	//  */
	// href: function(url, urlParma, isReserveParma) {
	// 	var parmaStr = '',
	// 		// 获取并解密当前路径
	// 		curUrl = decodeURI(window.location.href),
	// 		pathname = decodeURI(window.location.pathname),
	// 		item;

	// 	urlParma = urlParma || {};

	// 	// 清除原始链接
	// 	curUrl = (isReserveParma ? curUrl.replace(/\?.*$/g, '') : curUrl);
	// 	// 清除域名
	// 	curUrl = curUrl.slice(curUrl.indexOf(pathname));

	// 	// 放入参数
	// 	for (var key in urlParma) {
	// 		if(urlParma.hasOwnProperty(key)) {
	// 			item = urlParma[key];

	// 			// callBackUrl时需base64加密
	// 			(key === 'callBackUrl') && urlParma[key] && (item = util.encode(urlParma[key]));

	// 			parmaStr += '&' + key + '=' + item;
	// 		}
	// 	};

	// 	// 链接存在参数
	// 	parmaStr && (url += (url.indexOf('?') > -1 ? '&' : '?') + parmaStr.slice(1));

	// 	// 拼接当前地址
	// 	url += (url.indexOf('?') > -1 ? '&' : '?') + 'ou=' + curUrl;

	// 	// 加密并跳转
	// 	window.location.href = encodeURI(url);
	// },
	/**
	 * 获取跳转路径
	 * @parma {object}{1} opt 配置参数
	 *        {string}{1} url 目标路径
	 *        {object}{1, 0} urlParma 追加参数
	 *        {boolean}{1, 0} isSaveou 是否保留原路径
	 * @return {string}{1} url 跳转路径
	 */
	getJumpUrl: function(opt) {
		var that = this,
			// 目标路径
			url = opt.url,
			// 追加参数
			urlParma = opt.urlParma,
			// 是否保留原路径
			isSaveou = opt.isSaveou,
			// 获取并解密当前路径
			curUrl = decodeURI(window.location.pathname + window.location.search);

		// url为javascript代码
		if (url.indexOf('javascript:') === 0) {
			// nothing...
		}
		// 正常路径
		else {
			//
			urlParma = urlParma || {};

			// 保留原路径
			isSaveou && (urlParma.ou = curUrl);

			// 页面版本号
			urlParma.v = root.VERSION;

			// 设置参数
			url = util.setHrefParma(url, urlParma);
		}

		return encodeURI(url);
	},
    /**
     * 获取字符串包含汉字length
     * @parma {string}{} str 字符串
     */
    getStrLength: function(str) {
		var strlen = 0;
		for(var i = 0;i < str.length; i++){
			if(str.charCodeAt(i) > 255) {//如果是汉字，则字符串长度加2
				strlen += 2;
			}
			else {
				strlen++;
			}
		}
		return   strlen;
	},
	/**
	 * 跳转页面
	 * @parma {string}{1} url 目标路径
	 * @parma {object}{1, 0} urlParma 追加参数
	 * @parma {boolean}{1, 0} isSaveou 是否保留原路径
	 */
	href: function(url, urlParma, isSaveou) {
		// 跳转
		window.location.href = util.getJumpUrl({
			url: url,
			urlParma: urlParma,
			isSaveou: isSaveou
		});
	},
	/**
	 * 替换页面
	 * @parma {string}{1} url 目标路径
	 * @parma {object}{1, 0} urlParma 追加参数
	 * @parma {boolean}{1, 0} isSaveou 是否保留原路径
	 */
	replace: function(url, urlParma, isSaveou) {
		// 跳转
		window.location.replace(util.getJumpUrl({
			url: url,
			urlParma: urlParma,
			isSaveou: isSaveou
		}));
	},
	/*
	 * 封装ajax
	 */
	api: function(opts) {
		var that = this,
			success = opts.success || root.EMPTY_FN,
			error = opts.error || false,
			complete = opts.complete || root.EMPTY_FN,
			beforeSend = opts.beforeSend || root.EMPTY_FN,
			ct = new Date().getTime();

		//
		//if(!util.canSendAjax) { return false; }

		opts.url = opts.surl ? opts.surl : (root.API_PATH + opts.url);

		opts.url += (opts.url.indexOf('?') > -1 ? '&' : '?') + 'ct=' + ct;

		opts = $.extend({
			"timeout": 10000,
			"type": 'post',
			"async": true, //默认异步请求
			"dataType": 'json',
			"contentType": 'application/json; charset=utf-8'
		}, opts, {
			success: function(responseData, textStatus, jqXHR) {
				if (responseData && responseData.rpco) {
					return responseData.rpco === 401 || responseData.rpco === 40199 ? util.login(responseData.furl) : success.apply(this, arguments);
				} else {
					$('.alert-loading').remove();
					util.addCookie('loginNum','',-1);
					return success.apply(this, arguments);
				}
			},
			beforeSend: function() {
				//加载中
				util.loading();
				return beforeSend.apply(this, arguments);
			},
			error: function(jqXHR, textStatus) {

				// 网络异常
				util.tip('当前网络不可用，请检查网络。',{duration:3000});
				// util.comShow({
				// 	txt: '您的网络异常，加载失败，请您<br>重新尝试',
				// 	link: 'javascript: window.location.reload();',
				// 	btn: '重新加载',
				// 	icl: 'i-abnormal'
				// });
				$('.alert-loading').remove();
				return error.apply(this, arguments);
			},
			complete: function(jqXHR, textStatus) {
				//移除加载中
				$('.alert-loading').remove();
				return complete.apply(this, arguments);
			}
		});
		if (opts.type == "post" && opts.data) {
			opts.data = JSON.stringify(opts.data);
		}
		var jqAjax = $.ajax(opts);
		return jqAjax;
	}
});

/**
 * 公共展示工具
 */
$.extend(root.util, {
	/**
	 * 弹出框
	 * @parma{string}{1} content 提示信息
	 * @parma{object}{1, 0} parmas 参数
	 *       {string}{1, 0} title 提示抬头文字，默认：提示
	 *       {boolean}{1, 0} justOk 只有确定按钮，默认：true
	 *       {string}{1, 0} txtal 文字对齐方式，默认：center
	 *       {number}{1, 0} defBtnIndex 默认按钮下标，默认：-1
	 *       {string}{1, 0} okBtnText 确认按钮文案，默认：确认
	 *       {string}{1, 0} cancelBtnText 取消按钮文案，默认：取消
	 *       {function}{1, 0} okFn 确认回调
	 *       {function}{1, 0} cancelFn 取消回调
	 */
	alert: function(content, parmas) {
		// 配置
		var cfg = $.extend({
				content: '',
				title: '',
				txtal: 'center',
				justOk: true,
				defBtnIndex: -1,
				okBtnText: '确定',
				cancelBtnText: '取消',
				okFn: function() {},
				cancelFn: function() {}
			}, parmas),
			alertHTML = '';

		// 清空原层
		$('.dialog').remove();

		// 展示
		alertHTML = '<div class="dialog">' + '<div class="tablecell">' + '<div class="alert">' + '<div class="alert-title">' + cfg.title + '</div>' + '<div class="alert-content" style="text-align: ' + cfg.txtal + ';">' + content + '</div>'
			//<div class="alert-input">账户：<input id="lgtk" type="text" placeholder="请输入姓名" maxlength="16"></div>
			//<div class="alert-input mb20">密码：<input id="lgpwd" type="password" placeholder="请输入密码" maxlength="18"></div>
			+ '<div class="alert-btn">' + '<span id="alert-ok">' + cfg.okBtnText + '</span>' + '<span id="alert-cancel">' + cfg.cancelBtnText + '</span>' + '</div>' + '</div>' + '</div>' + '</div>';
		// 放入dom
		$('body').append(alertHTML);

		// 仅显示确认按钮
		cfg.justOk && $('#alert-cancel').remove();
		// 高亮按钮
		(cfg.defBtnIndex > -1) && $('.alert-btn span:eq(' + cfg.defBtnIndex + ')').css('font-weight', 'bold');

		// 确认按钮单击事件
		$('#alert-ok').off().on('click', function() {
			// 清空原层
			$('.dialog').remove();
			cfg.okFn && cfg.okFn();
		});

		// 取消按钮单击事件
		$('#alert-cancel').off().on('click', function() {
			// 清空原层
			$('.dialog').remove();
			cfg.cancelFn && cfg.cancelFn();
		});
	},
	/**
	 * 录入弹出框
	 * @parma{string}{1} content 提示信息
	 * @parma{object}{1, 0} parmas 参数
	 *       {array}{1, 0} inpuPlaceholderArray 文本框placeholder
	 *       {string}{1, 0} title 提示抬头文字，默认：提示
	 *       {boolean}{1, 0} justOk 只有确定按钮，默认：true
	 *       {string}{1, 0} txtal 文字对齐方式，默认：center
	 *       {number}{1, 0} defBtnIndex 默认按钮下标，默认：-1
	 *       {string}{1, 0} okBtnText 确认按钮文案，默认：确认
	 *       {string}{1, 0} cancelBtnText 取消按钮文案，默认：取消
	 *       {function}{1, 0} okFn 确认回调
	 *       {function}{1, 0} cancelFn 取消回调
	 */
	prompt: function(content, parmas) {
		// 配置
		var cfg = $.extend({
				content: '',
				inpuPlaceholderArray: [],
				title: '提示',
				txtal: 'center',
				justOk: true,
				defBtnIndex: -1,
				okBtnText: '确定',
				cancelBtnText: '取消',
				okFn: function() {},
				cancelFn: function() {}
			}, parmas),
			alertHTML = '',
			// 文本框html
			inputHTML = '';

		// 清空原层
		$('.dialog').remove();

		// 放入文本框
		for (var i = 0, j = cfg.inpuPlaceholderArray.length; i < j; i++) {
			inputHTML += '<div class="alert-input ' + (i === j - 1 ? 'mb20' : '') + '"><input class="wl100" id="lgtk" type="text" placeholder="' + cfg.inpuPlaceholderArray[i] + '" maxlength="32"></div>';
		}

		// 展示
		alertHTML = '<div class="dialog">' + '<div class="tablecell">' + '<div class="alert prompt">' + '<div class="alert-title">' + cfg.title + '</div>' + '<div class="alert-content" style="text-align: ' + cfg.txtal + ';">' + content + '</div>' + inputHTML

		/*+'<div class="alert-input">账户：<input id="lgtk" type="text" placeholder="请输入姓名" maxlength="16"></div>'
		+'<div class="alert-input mb20">密码：<input id="lgpwd" type="password" placeholder="请输入密码" maxlength="18"></div>'*/

			+ '<div class="alert-btn">' + '<span id="alert-ok">' + cfg.okBtnText + '</span>' + '<span id="alert-cancel">' + cfg.cancelBtnText + '</span>' + '</div>' + '</div>' + '</div>' + '</div>';


		// 放入dom
		$('body').append(alertHTML);

		// 仅显示确认按钮
		cfg.justOk && $('#alert-cancel').remove();
		// 高亮按钮
		(cfg.defBtnIndex > -1) && $('.alert-btn span:eq(' + cfg.defBtnIndex + ')').css('font-weight', 'bold');

		// 确认按钮单击事件
		$('#alert-ok').off().on('click', function() {
			/*// 先执行回调
			cfg.okFn && cfg.okFn();
			// 清空原层
			$('.dialog').remove();*/

			// 存在回调方法
			if (cfg.okFn) {
				//
				(cfg.okFn() !== false) && $('.dialog').remove();
			}
			// 不存在回调
			else {
				// 清空原层
				$('.dialog').remove();
			}
		});

		// 取消按钮单击事件
		$('#alert-cancel').off().on('click', function() {
			/*// 先执行回调
			cfg.cancelFn && cfg.cancelFn();
			// 清空原层
			$('.dialog').remove();*/

			// 存在回调方法
			if (cfg.cancelFn) {
				//
				(cfg.cancelFn() !== false) && $('.dialog').remove();
			}
			// 不存在回调
			else {
				// 清空原层
				$('.dialog').remove();
			}
		});
	},
	/**
	 * 加载中
	 */
	loading: function() {
		// 清空原层
		$('.alert-loading').remove();
		$('.alert-tip').remove();

		var	tipHTML = '<div class="alert-loading"><span class="loading-icon"></span><span class="loading-text">加载中...</span></div>';
		// 放入dom
		$('body').append(tipHTML);

	},
	/**
	 * 小提示
	 * @parma {string}{1} text 提示内容
	 * @parma {object}{1, 0} opt 配置
	 *        {number}{1, 0} duration 持续时间，单位：毫秒
	 *        {number}{1, 0} iconClass 图标的类名
	 */
	tip: function(text, opt) {
		var text = text || '',
			tipHTML = '',
			// 参数
			opt = opt || {},
			// 持续时间
			duration = opt.duration || '1000',
			// 图标类名
			iconClass = opt.iconClass || '',
			noShow = opt.noShow || false;

		// 清空原层
		$('.alert-tip').remove();

		// 存在图标
		if (iconClass) {
			tipHTML = '<div class="alert-tip"><span class="msg msg-icon"><i class="i ' + iconClass + '"></i>' + text + '</span></div>';
		}
		// 普通消息提示
		else {
			tipHTML = '<div class="alert-tip"><span class="msg">' + text + '</span></div>';
		}

        if(noShow){
           tipHTML = '';
        }
		// 放入dom
		$('body').append(tipHTML);


		// 自动消失
		clearInterval(util.interval);
		util.interval = setTimeout(function() {
			util.interval = setInterval(function() {
				var opacity = parseFloat($('.alert-tip').css('opacity') - 0.1).toFixed(1);
				if (opacity > 0) {
					$('.alert-tip').css('opacity', opacity);
				} else {
					clearInterval(util.interval);
					$('.alert-tip').remove();
				}
			}, 50);
		}, duration);
        //回调函数
	},
	/**
	 * 倒计时
	 * @parma {object}{1} elem 元素
	 * 		  {number}{1, 0} downTime 倒计时长，单位：秒。默认60
	 * 		  {string}{1, 0} formate 格式化
	 * 		  {function}{1, 0} callback 回调函数
	 */
	countDown: function(options) {
		var elem = options.elem || {},
			// 默认60s
			downTime = options.downTime || 60,
			formate = options.formate || 'count',
			callback = $.isFunction(options.callback) ? options.callback : function() {},
			// 倒计时时间
			interval = elem.get(0).id + 'Interval',
			// 原显示
			oldText = elem.text();
		// 清空定时器
		clearInterval(util[interval]);
		// 初始化倒计时时间
		elem.html(formate.replace(/count/, downTime)).addClass('countdown');

		// 开启定时器
		util[interval] = setInterval(function() {
			// 循环次数累加
			downTime--;

			// 递减
			if (downTime > 0) {
				elem.html(function(i, n) {
					return formate.replace(/count/, downTime);
				});
			}
			// 清空定时器
			else {
				clearInterval(util[interval]);
				//
				elem.removeClass('countdown').html(oldText);
				// 回调
				callback();
			}
		}, 1000);
	},
	/**
	 * 公共显示
	 * @parma {string}{1} opts
	 * 		  {string}{1} txt 提示文字
	 * 		  {string}{1} btn 按钮文字
	 * 		  {string}{1} link 跳转链接
	 * 		  {string}{1} icl 图标类样式
	 *                        网络已断开: 'i-disconnect',
	 *                        网络异常: 'i-abnormal',
	 *                        没有数据: 'i-order',
	 *                        没有找到页面: 'i-page',
	 *                        加载中: 'i-load ro360'
	 */
	comShow: function(opts) {
		var opts = opts || {},
			txt = opts.txt || '',
			btn = opts.btn || '',
			link = opts.link || 'javascript:;',
			icl = opts.icl || '',
			html = '';
		html += '<div class="tuwen maxtop bcgray" id="commonShow">' + '<div class="tu">' + '<i class="i ' + icl + '"></i>' + '</div>';
		// 标题
		txt && (html += '<p class="wen">' + txt + '</p>');
		// 按钮
		btn && (html += '<a class="btn btn-footer" href="' + link + '" >' + btn + '</a>');
		html += '</div>';
		// 移除
		util.remComShow();
		$('body').append(html);

		// 设置显示位置、大小
		$('#commonShow').css({
			'top': $('.container').css('top'),
			'bottom': '0'
		});
	},
	/**
	 * 移除“公共显示”
	 */
	remComShow: function() {
		$('#commonShow').remove();
	},
	/**
	 * 单击灰底效果
	 * @parma {bject}{1} el 目标元素
	 */
	clickGrayEffect: function(el) {
		var y = el.offset().top,
			h = el.height();

		// 移除效果
		util.remClickGrayEffect();
		// 放入效果
		$('body').append('<div id="clickGrayEffect" style="width: 100%; height: ' + (h + 1) + 'px; position: absolute; top: ' + (y - 1) + 'px; left: 0; background-color: rgba(0, 0, 0, .1);"></div>');
		// 抬起时，移除效果
		$('#clickGrayEffect').on(util.getMouseup(), function() {
			util.remClickGrayEffect();
		});
	},
	/**
	 * 移除“单击灰底效果”
	 */
	remClickGrayEffect: function() {
		// 移除效果
		$('#clickGrayEffect').remove();
	},
	/**
	 * [formatWeek description]
	 *  得到周几
	 * @return {[type]} [description]
	 */
	formatWeek:function(time){
		var weekArr = ['日', '一', '二', '三', '四', '五', '六'],
			time = weekArr[new Date(parseInt(time)).getDay()];
			return '星期' + time
	},
	/**
	 * 选择服务时间,
	 * @param  {[type]} id [description]
	 * 参数id是当前container的ID
	 */
	setSelectedTime: function(id) {
		var date = new Date(),
			day,
			week,
			time,
			weekArr = ['日', '一', '二', '三', '四', '五', '六'],
			html = '<div class="header">'+
						'<a class="js-t-close" target="_self">&nbsp;<i class="i i-return"></i></a>'+
						'<span class="title" id="title">选择上门时间</span>'+
					'</div>'+
					'<ul class="list-labelvalue">';
		for (var i = 1; i < 8; i++) {
			time = new Date().getTime();
			time = time + (24 * 60 * 60 * 1000) * i;
			day = util.formateDate(time,'yyyy-MM-dd');
			week = util.formatWeek(time);
			html += '<li><label data-val = '+ time +'>' + day + '&nbsp;' + week + '</label></li>'
		}
		html += '</ul>';
		$(id).html(html);
	},
    /**
     *字符串过滤手机自带表情
     * @param string  content 输入的字符串
     */
    filteremoji:function(content){
        var ranges = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
        var emojireg = content.replace(ranges, '');
        return emojireg;
    }


});

/**
 * 公共模块代码
 */
$.extend(root.util, {
	/**
	 * 通用功能
	 */
	loadCommonActionLoad: function() {
		// 微信登录
		util.noWxLogin || util.wxlogin();
		// 加载返回按钮
		util.loadGoBack();
		// 加载菜单事件
		util.loadMenuEvent();
		// 加载文本框清空按钮
		util.loadInputClearBtn();
		// 加载“回车键”提交表单
		util.loadEnterKeySubmit();
		// 加载点击变灰效果
		util.loadClickGrayEffect();
		// 加载数字文本框输入限制
		util.loadNumberInputLimit();
		//util.inputClear();
		//加载百度统计代码
		util.loadBaiduditch();
		//加载大数据区分渠道代码
		util.distinguishDitch();
		//微信联合登录
		util.unionLogin();
		// // 加载判断是否为微信浏览器代码
		// util.isWeiXin()
	},
	/**
	 * 加载返回按钮
	 */
	loadGoBack: function() {
		var ou = util.getHrefParma().ou;
		// 加载返回按钮
		//ou && $('.goBack').attr('href', ou).show();
		$('.goBack').attr('href') || $('.goBack').attr('href', 'javascript:window.history.back();');

	},
	/**
	 * 加载菜单单击事件
	 */
	loadMenuEvent: function() {
		var menu = $('.header .menu');
		if (!menu.length) {
			return false;
		}

		$(document).on(util.getClick(), function(e) {
			var tag = $(e.target);
			if (tag.is('.header .btn') || tag.is('.header .btn .i-more') && menu.is(':hidden')) {
				menu.show();
				return;
			}
			menu.hide();
		});
	},
	/**
	 * 加载文本框清空按钮
	 */
	loadInputClearBtn: function() {
		$('.js-clearInput').off().on(util.getClick(), function() {
			$(this).parent().find('input').val('');
		});
	},
	/**
	 * 加载“回车键”提交表单
	 */
	loadEnterKeySubmit: function() {

		$('input, textarea').on('keyup', function(e) {
			// 13是回车键值
			(e.keyCode === 13) && $('.js-entersave').trigger(util.getClick());
		});
	},
	/**
	 * 清空页面文本框
	 */
	/*inputClear: function() {
		// 文本框
		$('input').val('');
		// 文本域
		$('textarea').html('');
	},*/
	/**
	 * 加载点击变灰效果
	 */
	loadClickGrayEffect: function() {
		// 绑定按下事件
		$('[cge]').on('touchstart', 'li:not([nocge])', function() {
			// 新增效果
			util.clickGrayEffect($(this));
		});
		// 绑定抬起事件
		$('[cge]').on('touchend', 'li:not([nocge])', function() {
			// 移除效果
			util.remClickGrayEffect();
		});
		// 绑定移动事件
		$('[cge]').on('touchmove', function() {
			// 移除效果
			util.remClickGrayEffect();
		});
	},
	/**
	 * 加载数字文本框输入限制*/
	loadNumberInputLimit: function() {
		//
		$(document).on('input propertychange', 'input.js-number', function() {
			var value = $(this).val().replace(/[^0-9]/g, '');
			$(this).val(value);
		});
	},
    /**
     * 加载在线大数据统计代码
     */
    loadStatistics: function() {
        var _hmt = _hmt || [],
        	ss=location.pathname.split('/');
        	if(ss[ss.length-1]!='appointresult.html'){
        		(function() {
        		    var hm = document.createElement("script");
        		    hm.src = "//js.gomegj.com/guanjia/v2/gomegjwap.js";
        		    var s = document.getElementsByTagName("script")[0];
        		    s.parentNode.insertBefore(hm, s);
        		})();
        	}

    },
	/**
	 * 加载百度统计代码
	 */
	loadBaiduditch: function() {
		var _hmt = _hmt || [];
		(function() {
			var hm = document.createElement("script");
			if(util.getHost() == 'app.gomegj.com'){
				hm.src = "https://hm.baidu.com/hm.js?59e53dc8ebf42826d8fc75e8f4230f2f";
			}else{
				hm.src = mcBaiduditchmc;
			}
			var s = document.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(hm, s);
		})();
	},
    /**
     * 大数据区分来源渠道
     */
    distinguishDitch:function(){
    	var _hmt = _hmt || [],
    		ifdev=location.href.split('.');
    		(function() {
    			   var hm = document.createElement("script");
    			   if(ifdev[1]!="dev"){
    			    hm.src = "https://js.gomein.net.cn/sitemonitor/bigdata-mgj.js";
    			   }else{
    			    hm.src = "https://js.uatplus.com/sitemonitor/bigdata-mgj.js";
    			   }
    			   var s = document.getElementsByTagName("script")[0];
    			   s.parentNode.insertBefore(hm, s);
    		})();
    	var that=this,
    		href=util.getHrefParma(),
    		ls=window.sessionStorage;
   		window.BPConfig = window.BPConfig || {};
    	if(href.channel!=undefined){
    		ls.setItem("channel",href.channel)
    	}
    	if(ls.getItem("channel")!=null){
    		window.BPConfig.channel = ls.getItem("channel");
    	}
    	//console.log(window.BPConfig.channel)
    },

	/**
	 * 微信认证登录
	 */
	wxlogin: function() {
		// 微信回调码
		var hrefParma = util.getHrefParma(),
			wxcode = hrefParma.code,
			wxstate = hrefParma.state;

		// 认证登录
		if (wxcode) {
			// 请求...
			util.api({
				surl: root.CM_API_PATH + 'wxlogin',
				data: {
					wxcode: wxcode,
					wxstate: wxstate
				},
				type: 'post',
				async: false,
				success: function(response) {
					// 状态码
					if (!response) {
						return;
					}
					var rpco = response.rpco;
					//
					switch (rpco) {
						// 用户未关注国美管家
						case 201:
							// 提示用户
							//util.alert('您还没有关注我们的微信公众号，<br>赶快关注吧~');
							util.href('./accsmfail.html');
							// 取消后续ajax操作
							//util.canSendAjax = false;
							break;
							// 微信回调码错误
						case 40001: // 省略break
							// 域名错误
						case 40002: // 省略break
							// 用户登录信息写入失败
						case 50001:
							// 重新登录
							//util.login();
					}
				}
			});
		}
	},
	/**
	 * 登录
	 * @parma {string}{1, 0} ou 登录成功跳转页面
	 */
	login: function(ou) {
		//app登录
		if (util.isApp()) {
			console.error("APP")
			GomeJSBridge.login(null, null);
		} else if (util.isWeixin()) {
			//缓存当前网址
			window.localStorage.setItem("curUrl", window.location.href);
			//微信登录
			var subdist = mcSubDistmc;
			var oUrl = window.location.protocol + '//' + window.location.host + '/' + subdist +'/login.html';
			var tUrl = root.WXCM_API_PATH + "wxrc?furl=" + encodeURIComponent(oUrl);
			util.href(tUrl);
		} else {
			// 系统登录
			ou ? util.href('./login.html',{ou:ou}) : util.href('./login.html',{},true);
		}
	},
	/**
	 * [jikexiuwxlogin description]
	 * @param  {[type]} ou [极客修推送消息调用验证微信登录方法]
	 */
	jikexiuwxlogin: function(ou) {
		var b = root.WXCM_API_PATH + "wxrc?furl=" + (ou || window.location.href);
		util.href(b);
	},
	/*
	获取微信登录回跳地址
	 */
	getWXUrl: function(){
		var httpText = "http"+(location.href.indexOf("https://")>=0?"s":"")+"://",
			parmas = util.getHrefParma(),
		    subdist = mcSubDistmc,
			search = "/"+subdist+"/index.html";
			if(parmas.ou){
				search = decodeURIComponent(parmas.ou);
			}
		return httpText+document.domain+search;
	}
});

/**
 * Base64 encode / decode
 */
$.extend(root.util, {
	_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	// public method for encoding
	encode: function(input) {

		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = this._utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output +
				util._keyStr.charAt(enc1) + util._keyStr.charAt(enc2) +
				util._keyStr.charAt(enc3) + util._keyStr.charAt(enc4);
		}
		return output;
	},
	//host
	getHost: function() {
		return window.location.host;
	},
	// public method for decoding
	decode: function(input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = util._keyStr.indexOf(input.charAt(i++));
			enc2 = util._keyStr.indexOf(input.charAt(i++));
			enc3 = util._keyStr.indexOf(input.charAt(i++));
			enc4 = util._keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = this._utf8_decode(output);
		return output;
	},
	//login encryption
	getRsaKey : function() {
		return 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlDhh11MUIWLen/IVoLi1wFAQmUETTRyd2qLPhsItW43IjwVUVkGABgcy30FMkSA4/AuLLpHmfrmToKk+FvjIBdsaUT3yBfd3VwSfDzai+6a4C59w52fm/kMog2plGjS2yHhhoRsbELH40f9EI0raGZUkMFVR87uNNH+EfoKMhAxG8s/59hUvenxfIPxFiCvO8hWBE2CfJzYwDnV77ue9fnAT23gSbWzp3JebypHEczwNBI2W3oXT/9p+dtv4CVMeF0iJt4crsh1u3qR8G13/WvneswdILRak3zRISTtBmO4VYhx6C2EREbsPWQzN5UPxq+fzyFPUVpyZAtHDOKBAvQIDAQAB';
	},
	// private method for UTF-8 encoding
	_utf8_encode: function(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}
		return utftext;
	},
	// private method for UTF-8 decoding
	_utf8_decode: function(utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while (i < utftext.length) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if ((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	},
	//判断是否在app浏览
    isApp: function() {
        var u = navigator.userAgent;
        if (u.indexOf('gomeplus') > -1 || u.indexOf('gome') > -1) {
            return true
        } else {
            return false
        }
    },
    //设置app头部标题
    setHeadBar: function(param) {
        GomeJSBridge.setHeadBar(function(data) {
            console.log(data)
        }, function(err) {
            console.log(err)
        }, param)
    },
    //app打开新页面
	pushWindow: function(url) {
		cordova.exec(ok, fail, "Route", "open", [url]);
		function ok(data) {
			console.log(data)
		}
		function fail(err) {
			GomeJSBridge.toast(null, null, '打开新页面失败')
		}
	},
	deleteHeadBtn: function() {
		GomeJSBridge.ready(function(){
			var param = {
				menus : {
					rightMenus:[]
				}
			};
			util.setHeadBar(param);
		},null);
	},
	//判断是否是大于等于10版本的ios系统
	gt_ios10: function() {
		// 判断是否 iPhone 或者 iPod
		if((navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i))) {
			// 判断系统版本号是否大于 10
			return Boolean(/OS [5-9]_\d[_\d]* like Mac OS X/i.test(navigator.userAgent));
		} else {
		  return false;
		}
	},
	specialPhone: function() {
		var ua = navigator.userAgent,
		isQB = /(?:MQQBROWSER|QQ)/i.test(ua),
		isOpen = /(?:OPERA MINI)/i.test(ua),
		isUC = /(?:UCWEB|UCBROWSER)/i.test(ua),
		isOne = /ONEPLUS/i.test(ua),
		isHw = /HUAWEI/i.test(ua),
		isGome=/GOME/i.test(ua),
		isOwn = (!util.isWeixin() && !isQB && !isOpen && !isUC && isGome && !util.isApp()) || (!util.isWeixin() && !isQB && !isOpen && !isUC && isHw && !util.isApp()) || (!util.isWeixin() && !isQB && !isOpen && !isUC && isOne && !util.isApp());
		if(isOwn){
			if(isOne)return "ONEPLUS"
			if(isGome)return "ONEPLUS"//这两种机型问题一样，返回出去等同处理

			if(isHw)return "HUAWEI"
		}else{
			return false;
		}
	},
	//调用封装好的 唤起相机 返回的结果处理生成File对象
	getImgFile: function (imgItem){
		var dataURL=imgItem.fileURL;
    var imgtype = dataURL.substring(dataURL.lastIndexOf('.')+1)
    const fileName = dataURL.substring(dataURL.lastIndexOf('/')+1)
    imgtype==='jpg'?'jpeg':imgtype
    var typeimg='image/'+imgtype;
    var bytes=window.atob(imgItem.imageData),
      n=bytes.length,
      u8arr=new Uint8Array(n);
   	while(n--){
      u8arr[n]=bytes.charCodeAt(n);
   	}
    return new File([new Blob([u8arr])],fileName,{
    	type: typeimg,
    	lastModified: new Date().getTime
    })
	},
	weChatTime:function (msgTime){
		msgTime = new Date(msgTime)
		nowMsgTime = new Date()
		const year = msgTime.getFullYear()//年
		const month = msgTime.getMonth()+1<10?"0"+(msgTime.getMonth()+1):msgTime.getMonth()+1
		const day = msgTime.getDate()<10?"0"+msgTime.getDate():msgTime.getDate()
		const hour = msgTime.getHours()<10?"0"+msgTime.getHours():msgTime.getHours()
		const minute = msgTime.getMinutes()<10?"0"+msgTime.getMinutes():msgTime.getMinutes()
		if(nowMsgTime.getFullYear()-year>0)//去年
			return year+"年"+month+"月"+day+"日 "+hour+":"+minute;
		if(nowMsgTime.getDate()-day>0&&nowMsgTime.getMonth()-month>=-1)//昨天
			return month+"月"+day+"日 "+hour+":"+minute;
		// if(nowMsgTime.getMinutes()-minute>2)//三分钟前
			return hour+":"+minute;
	}
});

// 通用功能加载
util.loadCommonActionLoad();
/*微信配置文件 res.wx.qq.com/open/js/jweixin-1.0.0.js*/
!function(e,n){"function"==typeof define&&(define.amd||define.cmd)?define(function(){return n(e)}):n(e,!0)}(this,function(e,n){function i(n,i,t){e.WeixinJSBridge?WeixinJSBridge.invoke(n,o(i),function(e){c(n,e,t)}):d(n,t)}function t(n,i,t){e.WeixinJSBridge?WeixinJSBridge.on(n,function(e){t&&t.trigger&&t.trigger(e),c(n,e,i)}):t?d(n,t):d(n,i)}function o(e){return e=e||{},e.appId=L.appId,e.verifyAppId=L.appId,e.verifySignType="sha1",e.verifyTimestamp=L.timestamp+"",e.verifyNonceStr=L.nonceStr,e.verifySignature=L.signature,e}function r(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function c(e,n,i){delete n.err_code,delete n.err_desc,delete n.err_detail;var t=n.errMsg;t||(t=n.err_msg,delete n.err_msg,t=a(e,t),n.errMsg=t),(i=i||{})._complete&&(i._complete(n),delete i._complete),t=n.errMsg||"",L.debug&&!i.isInnerInvoke&&alert(JSON.stringify(n));var o=t.indexOf(":");switch(t.substring(o+1)){case"ok":i.success&&i.success(n);break;case"cancel":i.cancel&&i.cancel(n);break;default:i.fail&&i.fail(n)}i.complete&&i.complete(n)}function a(e,n){var i=e,t=g[i];t&&(i=t);var o="ok";if(n){var r=n.indexOf(":");"confirm"==(o=n.substring(r+1))&&(o="ok"),"failed"==o&&(o="fail"),-1!=o.indexOf("failed_")&&(o=o.substring(7)),-1!=o.indexOf("fail_")&&(o=o.substring(5)),"access denied"!=(o=(o=o.replace(/_/g," ")).toLowerCase())&&"no permission to execute"!=o||(o="permission denied"),"config"==i&&"function not exist"==o&&(o="ok"),""==o&&(o="fail")}return n=i+":"+o}function s(e){if(e){for(var n=0,i=e.length;n<i;++n){var t=e[n],o=m[t];o&&(e[n]=o)}return e}}function d(e,n){if(!(!L.debug||n&&n.isInnerInvoke)){var i=g[e];i&&(e=i),n&&n._complete&&delete n._complete,console.log('"'+e+'",',n||"")}}function l(e){0!=A.preVerifyState&&(v||w||L.debug||M<"6.0.2"||A.systemType<0||V||(V=!0,A.appId=L.appId,A.initTime=b.initEndTime-b.initStartTime,A.preVerifyTime=b.preVerifyEndTime-b.preVerifyStartTime,C.getNetworkType({isInnerInvoke:!0,success:function(e){A.networkType=e.networkType;var n="http://open.weixin.qq.com/sdk/report?v="+A.version+"&o="+A.preVerifyState+"&s="+A.systemType+"&c="+A.clientVersion+"&a="+A.appId+"&n="+A.networkType+"&i="+A.initTime+"&p="+A.preVerifyTime+"&u="+A.url;(new Image).src=n}})))}function u(){return(new Date).getTime()}function p(n){I&&(e.WeixinJSBridge?n():h.addEventListener&&h.addEventListener("WeixinJSBridgeReady",n,!1))}function f(){C.invoke||(C.invoke=function(n,i,t){e.WeixinJSBridge&&WeixinJSBridge.invoke(n,o(i),t)},C.on=function(n,i){e.WeixinJSBridge&&WeixinJSBridge.on(n,i)})}if(!e.jWeixin){var m={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest"},g=function(){var e={};for(var n in m)e[m[n]]=n;return e}(),h=e.document,y=h.title,S=navigator.userAgent.toLowerCase(),_=navigator.platform.toLowerCase(),v=!(!_.match("mac")&&!_.match("win")),w=-1!=S.indexOf("wxdebugger"),I=-1!=S.indexOf("micromessenger"),T=-1!=S.indexOf("android"),k=-1!=S.indexOf("iphone")||-1!=S.indexOf("ipad"),M=function(){var e=S.match(/micromessenger\/(\d+\.\d+\.\d+)/)||S.match(/micromessenger\/(\d+\.\d+)/);return e?e[1]:""}(),V=!1,x=!1,b={initStartTime:u(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},A={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",preVerifyState:1,systemType:k?1:T?2:-1,clientVersion:M,url:encodeURIComponent(location.href)},L={},P={_completes:[]},W={state:0,data:{}};p(function(){b.initEndTime=u()});var C={config:function(e){L=e,d("config",e);var n=!1!==L.check;p(function(){if(n)i(m.config,{verifyJsApiList:s(L.jsApiList)},function(){P._complete=function(e){b.preVerifyEndTime=u(),W.state=1,W.data=e},P.success=function(e){A.preVerifyState=0},P.fail=function(e){P._fail?P._fail(e):W.state=-1};var e=P._completes;return e.push(function(){l()}),P.complete=function(n){for(var i=0,t=e.length;i<t;++i)e[i]();P._completes=[]},P}()),b.preVerifyStartTime=u();else{W.state=1;for(var e=P._completes,t=0,o=e.length;t<o;++t)e[t]();P._completes=[]}}),L.beta&&f()},ready:function(e){0!=W.state?e():(P._completes.push(e),!I&&L.debug&&e())},error:function(e){M<"6.0.2"||x||(x=!0,-1==W.state?e(W.data):P._fail=e)},checkJsApi:function(e){var n=function(e){var n=e.checkResult;for(var i in n){var t=g[i];t&&(n[t]=n[i],delete n[i])}return e};i("checkJsApi",{jsApiList:s(e.jsApiList)},(e._complete=function(e){if(T){var i=e.checkResult;i&&(e.checkResult=JSON.parse(i))}e=n(e)},e))},onMenuShareTimeline:function(e){t(m.onMenuShareTimeline,{complete:function(){i("shareTimeline",{title:e.title||y,desc:e.title||y,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){t(m.onMenuShareAppMessage,{complete:function(n){"favorite"===n.scene?i("sendAppMessage",{title:e.title||y,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""}):i("sendAppMessage",{title:e.title||y,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){t(m.onMenuShareQQ,{complete:function(){i("shareQQ",{title:e.title||y,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){t(m.onMenuShareWeibo,{complete:function(){i("shareWeiboApp",{title:e.title||y,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){t(m.onMenuShareQZone,{complete:function(){i("shareQZone",{title:e.title||y,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},startRecord:function(e){i("startRecord",{},e)},stopRecord:function(e){i("stopRecord",{},e)},onVoiceRecordEnd:function(e){t("onVoiceRecordEnd",e)},playVoice:function(e){i("playVoice",{localId:e.localId},e)},pauseVoice:function(e){i("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){i("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){t("onVoicePlayEnd",e)},uploadVoice:function(e){i("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){i("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){i("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){i("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},(e._complete=function(e){if(T){var n=e.localIds;n&&(e.localIds=JSON.parse(n))}},e))},previewImage:function(e){i(m.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){i("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){i("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getNetworkType:function(e){var n=function(e){var n=e.errMsg;e.errMsg="getNetworkType:ok";var i=e.subtype;if(delete e.subtype,i)e.networkType=i;else{var t=n.indexOf(":"),o=n.substring(t+1);switch(o){case"wifi":case"edge":case"wwan":e.networkType=o;break;default:e.errMsg="getNetworkType:fail"}}return e};i("getNetworkType",{},(e._complete=function(e){e=n(e)},e))},openLocation:function(e){i("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)},getLocation:function(e){e=e||{},i(m.getLocation,{type:e.type||"wgs84"},(e._complete=function(e){delete e.type},e))},hideOptionMenu:function(e){i("hideOptionMenu",{},e)},showOptionMenu:function(e){i("showOptionMenu",{},e)},closeWindow:function(e){i("closeWindow",{},e=e||{})},hideMenuItems:function(e){i("hideMenuItems",{menuList:e.menuList},e)},showMenuItems:function(e){i("showMenuItems",{menuList:e.menuList},e)},hideAllNonBaseMenuItem:function(e){i("hideAllNonBaseMenuItem",{},e)},showAllNonBaseMenuItem:function(e){i("showAllNonBaseMenuItem",{},e)},scanQRCode:function(e){i("scanQRCode",{needResult:(e=e||{}).needResult||0,scanType:e.scanType||["qrCode","barCode"]},(e._complete=function(e){if(k){var n=e.resultStr;if(n){var i=JSON.parse(n);e.resultStr=i&&i.scan_code&&i.scan_code.scan_result}}},e))},openProductSpecificView:function(e){i(m.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)},addCard:function(e){for(var n=e.cardList,t=[],o=0,r=n.length;o<r;++o){var c=n[o],a={card_id:c.cardId,card_ext:c.cardExt};t.push(a)}i(m.addCard,{card_list:t},(e._complete=function(e){var n=e.card_list;if(n){for(var i=0,t=(n=JSON.parse(n)).length;i<t;++i){var o=n[i];o.cardId=o.card_id,o.cardExt=o.card_ext,o.isSuccess=!!o.is_succ,delete o.card_id,delete o.card_ext,delete o.is_succ}e.cardList=n,delete e.card_list}},e))},chooseCard:function(e){i("chooseCard",{app_id:L.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},(e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e))},openCard:function(e){for(var n=e.cardList,t=[],o=0,r=n.length;o<r;++o){var c=n[o],a={card_id:c.cardId,code:c.code};t.push(a)}i(m.openCard,{card_list:t},e)},chooseWXPay:function(e){i(m.chooseWXPay,r(e),e)}};return n&&(e.wx=e.jWeixin=C),C}});

var root = window || {},
	util = root.util || {};
root.EMP_FUN = function() {};

//  微信js通用参数
//  success：接口调用成功时执行的回调函数。
//  fail：接口调用失败时执行的回调函数。
//  complete：接口调用完成时执行的回调函数，无论成功或失败都会执行。
//  cancel：用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到。
//  trigger: 监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。

// 微信js配置
var WxConfig = function(opt) {
	// 注入权限验证配置
	var cfg = {
		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId: '', // 必填，公众号的唯一标识
		timestamp: '', // 必填，生成签名的时间戳
		nonceStr: '', // 必填，生成签名的随机串
		signature: '', // 必填，签名，见附录1
		jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	};

	this.options = {};
	// 配置
	//
	//
	this.options.cfg = {};
	// 验证成功执行
	this.options.ready = opt.ready || root.EMP_FUN;
	// 验证失败执行
	this.options.error = opt.error || root.EMP_FUN;

	// 扩展
	$.extend(this.options.cfg, cfg, opt.cfg, this.getWxConfigParmas());
};

$.extend(WxConfig.prototype, {
	/**
	 * 初始化
	 */
	init: function() {
		var that = this;
		that.load();
	},
	/**
	 * 加载
	 */
	load: function() {
		var that = this;
		// 微信配置
		wx.config(that.options.cfg);
		// 成功回调
		wx.ready(that.options.ready);
		// 失败回调
		wx.error(that.options.error);
	},
	/**
	 * 获取微信配置参数
	 * @return {object} result 微信配置参数
	 */
	getWxConfigParmas: function() {
		if(window.location.host=="gfs19.gomein.net.cn") return;
		var that = this,
			// 当前网页的URL，不包含#及其后面部分
			curl = location.href.split('#')[0],
			result = {};
		// 请求...
		util.api({
			surl: root.WXCM_API_PATH + 'wxpm',
			data: {
				curl: curl
			},
			type: 'post',
			async: false,
			success: function(response) {
				var rpco = response.rpco,
					body;

				// 处理
				switch (rpco) {
					case 200:
						body = response.body || {};
						// 公众号的唯一标识
						body.appId && (result.appId = body.appId);
						// 生成签名的时间戳
						body.timestamp && (result.timestamp = body.timestamp);
						// 生成签名的随机串
						body.nonceStr && (result.nonceStr = body.nonceStr);
						// 签名
						body.signature && (result.signature = body.signature);
						break;
				}
			}
		});

		return result;
	}
});
/*微信分享*/
if (util.isWeixin()) {
	var wc = new WxConfig({
		cfg: {
			'jsApiList': ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone','getLocation']
		},
		// 验证成功
		ready: readyCbk
	});
	// 初始化
	wc.init();

	function readyCbk() {
		// 分享标题
		var title = '国美管家',
			// 分享链接
			link = window.location.href,
			// 分享描述
			desc = decodeURI("足不出户享受上门维修、回收、清洗保养服务，贴心到家服务等您召唤。"),
			// 分享图标
			imgUrl = mcLogoImgUrlmc;

		// 分享到朋友圈
		wx.onMenuShareTimeline({
			title: desc,
			link: link,
			imgUrl: imgUrl
		});
		// 分享给朋友
		wx.onMenuShareAppMessage({
			title: title,
			desc: desc,
			link: link,
			imgUrl: imgUrl
		});
		// 分享到QQ
		wx.onMenuShareQQ({
			title: title,
			desc: desc,
			link: link,
			imgUrl: imgUrl
		});
		// 分享到腾讯微博
		wx.onMenuShareWeibo({
			title: title,
			desc: desc,
			link: link,
			imgUrl: imgUrl
		});
		// 分享到QQ空间
		wx.onMenuShareQZone({
			title: title,
			desc: desc,
			link: link,
			imgUrl: imgUrl
		});

	}
}
/*
* android禁止微信浏览器调整字体大小

*  这种方法会导致网页延迟大约1S

*/
(function () {
	var ua = window.navigator.userAgent.toLowerCase();
	if(ua.indexOf("android")!=-1) {
		if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {

			handleFontSize();

		} else {
			if (document.addEventListener) {

				document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);

			} else if (document.attachEvent) {

				document.attachEvent("WeixinJSBridgeReady", handleFontSize);

				document.attachEvent("onWeixinJSBridgeReady", handleFontSize);

			}

		}
	}

	function handleFontSize() {

		// 设置网页字体为默认大小
		WeixinJSBridge.invoke('setFontSizeCallback', {

			'fontSize': 0

		});


		// 重写设置网页字体大小的事件
		WeixinJSBridge.on('menu:setfont', function () {

			WeixinJSBridge.invoke('setFontSizeCallback', {

				'fontSize': 0

			});

		});

	}
})();