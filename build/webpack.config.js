var path = require('path');
var config = require('./config-base');
var webpack = require('webpack');
var entrys = require('../entry.config.js');
var argv = require('yargs').argv;
var testSetting = argv.task;
var isTestServer = argv.ceshi || false;
let homeCmsKey,//首页cmskey
	dirCmsKey,//说明书首页key
	indexLastName, // 首页接口参数区分尾串
	indexAllName, // 首页接口参数区分名
	homeTopFocusId,////首页顶部轮播id
	homeAdverFocusId,//首页广告位轮播id
	footCmsKey,//底部导航cmskey
	logoImgUrl,//logo图片路径
	gzhTitle,// 公众号名称
	channelNum,// 下单渠道号
	oRecycleUrl,//爱回收下单接口
	wxChaid,//微信公众号支付chaid
	subDist,//访问页面子目录
	couponUrl,//优惠券领取接口
	couponUrlYwdt, //业务递推优惠券领取接口
	telPhone,//服务电话
	featureFlag,//功能是否显示
	direactionCmsKey,//电子说明书详情页cmskey
	myCenterCmsKey,//个人中心cmskey
	cleanHomeKey,//清洗首页cmskey
	adverMcmsKey,//advertisement组件cmskey
	uniteLogin,//联合登录接口
	myCenterA,//个人中心广告位id1
	myCenterB,//个人中心广告位id2
	myCenterC,//个人中心广告位id3
	cleanTempletIdA,//清洗首页id
	cleanTempletIdB,//清洗首页id
	feescaleCmsKey,//收费标准页面cmskey
	repairHomeKey,//维修首页cmskey
	repairListCms,//维修二级页cmskey
	repairModIdA,//维修二级页模块id
	repairModIdB,//维修二级页模块id
	repairModIdC,//维修二级页模块id
	repairModIdD,//维修二级页模块id
	repairModIdE,//维修二级页模块id
	baiduditch,//百度统计码
	recycleHomeKey,//回收首页cmskey
	paySuccessCmskey,//评价成功页cmskey
    sgShareIndexTit,//闪购首页分享title
    sgShareIndexDes,//闪购首页分享描述
    sgShareIndexPic,//山沟首页分享图片
    sgShareDetailTit,//闪购详情页分享title
    sgShareDetailDes,//闪购详情页分享描述
	defSgBanner,//闪购默认banner图
    dissgtxt,//闪购文案区分
	yyjfCmsKey,//移机加氟首页
    partsCmsKey,//配件鲜花首页
    nearbystoresType,//附近门店渠道
    appid; //在线客服appid
oRecycleUrl = isTestServer ? '//azd.dev.gomegj.com' : '//open.gomegj.com';
uniteLogin = isTestServer ? 'login.m.atguat.com.cn':'login.m.gome.com.cn';
footCmsKey = 'homeNgSTrIOpK9Hdx';
adverMcmsKey = isTestServer ? 'homeNgBd7AcGQuokb':'homeNgJbl89SlVm2v';
direactionCmsKey = 'channelNgRu2m4qUAD33';
feescaleCmsKey = 'channelNgASQLAWFdF7A';

switch (testSetting) {
    // 永乐
    case "ylgj":
		subDist = isTestServer ? "yolo" : "v1";
		homeCmsKey = 'homeNgCGFb8f655Gm';
		dirCmsKey = 'channelNgFmOOXQoK5sG';
		indexLastName = '_yolo';
		indexAllName = 'yolo';
		homeTopFocusId = isTestServer ?  28881 : 4235480;
		homeAdverFocusId = isTestServer ?  28889 : 4235484;
		logoImgUrl = 'http://gfs11.gomein.net.cn/T1NxxQBgDT1RCvBVdK.jpg';
		gzhTitle   = '永乐管家';
		repairHomeKey = 'homeNgkttJV6Q7Rdv';
		repairListCms = 'channelNgKLfYTDnEGrs';
		repairModIdA = isTestServer ? 28979 : 4237314;
		repairModIdB = isTestServer ? 28980 : 4237315;
		repairModIdC = isTestServer ? 28983 : 4237318;
		repairModIdD = isTestServer ? 28982 : 4237317;
		repairModIdE = isTestServer ? 28981 : 4237316;
		recycleHomeKey = 'homeNgisrgNnFy5L3';
		channelNum = isTestServer ?  72 : 99;
		wxChaid = isTestServer ? 3 : 8;
		couponUrl = isTestServer ? 'group=COUPON_GROUP&dataId=COUPON_DATA&propCacheKey=couponindex':'group=COUPON_GROUP&dataId=COUPON_DATA_NEW&propCacheKey=couponindex';
		couponUrlYwdt = isTestServer ? 'group=COUPON_GROUP&dataId=COUPON_DATA_GJDT&propCacheKey=couponindex' : 'group=COUPON_GROUP&dataId=COUPON_DATA_GJDT&propCacheKey=couponindex';
		telPhone = '4008113336';
		cleanHomeKey = 'homeNgLTDii10G51X';
		cleanTempletIdA = isTestServer ? 33463 : 4235688;
		cleanTempletIdB = isTestServer ? 28880 : 4235691;
		featureFlag = false;
		myCenterCmsKey = 'channelNghpgpQjUes8N';
		myCenterA = isTestServer ? 28304 : 4207936;
		myCenterB = isTestServer ? 28868 : 4235521;
		myCenterC = isTestServer ? 28869 : 4235522;
		baiduditch = 'https://hm.baidu.com/hm.js?2b4ae7b6cc1c75700a30962176593e82';
        sgShareIndexTit = '永乐秒购，精选爆品低价限时购！';
        sgShareIndexDes = '限时抢购！永乐管家力推当前行业尖货限时让利抢购栏目。新品、爆品更新秒，惊喜价格实时送...';
        defSgBanner = "http://gfs10.gomein.net.cn/T1BLWQB4YT1RCvBVdK.jpg";
        sgShareDetailTit = "永乐管家限时秒杀！";
        sgShareDetailDes = "我在永乐管家发现了一个不错的商品，赶快来看看吧。";
        sgShareIndexPic = "http://gfs10.gomein.net.cn/T1BxZgB5ET1RCvBVdK.png";
		paySuccessCmskey = 'channelNgKOIEsoxuuwG';
		nearbystoresType = 10103;
		yyjfCmsKey = 'channelNgn95OdLlk32q';
		partsCmsKey = 'homeNgNdAUERrsgKj';
		appid = '0AQlUl';
        dissgtxt = 'ylgj';
        break;
        // 大中
    case "dzgj":
		subDist = isTestServer ? "dzgj" : "v1";
		homeCmsKey = 'homeNgoIn71UPomdy';
		dirCmsKey = 'channelNgFmOOXQoK5sG';
		indexLastName = '_dz';
		indexAllName = 'dz';
		homeTopFocusId = isTestServer ?  28814 : 4233835;
		homeAdverFocusId = isTestServer ?  28834 : 4233829;
		logoImgUrl = 'http://gfs10.gomein.net.cn/T1Y5YgBCYv1RCvBVdK.jpg';
		gzhTitle   = '大中管家';
		repairHomeKey = 'homeNgA6OkHcAc1KJ';
		repairListCms = 'channelNg3yFHiKTX1uW';
		repairModIdA = isTestServer ? 28959 : 4235608;
		repairModIdB = isTestServer ? 28960 : 4235650;
		repairModIdC = isTestServer ? 28963 : 4235550;
		repairModIdD = isTestServer ? 28962 : 4235552;
		repairModIdE = isTestServer ? 28961 : 4235553;
		recycleHomeKey = 'homeNgf7LHRzps3cE';
		channelNum = 16;
		wxChaid = isTestServer ? 3 : 4;
		couponUrl = isTestServer ? 'group=COUPON_GROUP&dataId=COUPON_DATA&propCacheKey=couponindex':'group=COUPON_GROUP&dataId=COUPON_DATA_NEW&propCacheKey=couponindex';
		couponUrlYwdt = isTestServer ? 'group=COUPON_GROUP&dataId=COUPON_DATA_GJDT&propCacheKey=couponindex' : 'group=COUPON_GROUP&dataId=COUPON_DATA_GJDT&propCacheKey=couponindex';
		telPhone = '4008113339';
		cleanHomeKey = 'homeNgxKNXXKDLHSW';
		cleanTempletIdA = isTestServer ? 28836 : 4234244;
		cleanTempletIdB = isTestServer ? 28839 : 4234246;
		featureFlag = false;
		myCenterCmsKey = 'channelNg4QS5gUlq1Ko';
		myCenterA = isTestServer ? 28850 : 4234113;
		myCenterB = isTestServer ? 28852 : 4234114;
		myCenterC = isTestServer ? 28853 : 4234115;
		baiduditch = 'https://hm.baidu.com/hm.js?18f3bfb9202cadb4c1c9e5958ea293e5';
        sgShareIndexTit = '大中闪购，精选爆品低价限时购！';
        sgShareIndexDes = '限时抢购！大中管家力推当前行业尖货限时让利抢购栏目。新品、爆品更新秒，惊喜价格实时送...';
        defSgBanner = "http://gfs12.gomein.net.cn/T1uqWbB_CT1RCvBVdK.png";
        sgShareDetailTit = "大中管家限时秒杀！";
        sgShareDetailDes = "我在大中管家发现了一个不错的商品，赶快来看看吧。";
        sgShareIndexPic = "http://gfs11.gomein.net.cn/T16v_vByDv1RCvBVdK.png";
		paySuccessCmskey = 'channelNgwnSB3jBIV27';
		nearbystoresType = 13;
		yyjfCmsKey = 'channelNgW5pshBpxOlM';
		partsCmsKey = 'homeNgSU9Gm7m2prp';
		appid = '0RgFcU';
        dissgtxt = 'dzgj';
        break;
        // 陕西
    case "sxgm":
		subDist = isTestServer ? 'sxgm' : 'v1';
		homeCmsKey = 'homeNgNFwQyIlRKyL';
		dirCmsKey = 'channelNgFmOOXQoK5sG';
		indexLastName = '_sx';
		indexAllName = 'sx';
		homeTopFocusId = isTestServer ?  28762 : 4208195;
		homeAdverFocusId = isTestServer ?  28770 : 4208200;
		logoImgUrl = 'http://gfs13.gomein.net.cn/T1tkb_Byhv1RCvBVdK.png';
		gzhTitle   = '国美管家';
		repairHomeKey = 'homeNgMreWVNEyCsL';
		repairListCms = 'channelNg8457Dpis8LB';
		repairModIdA = isTestServer ? 28964 : 4235672;
		repairModIdB = isTestServer ? 28965 : 4235673;
		repairModIdC = isTestServer ? 28978 : 4235674;
		repairModIdD = isTestServer ? 28977 : 4235675;
		repairModIdE = isTestServer ? 28976 : 4235676;
		recycleHomeKey = 'homeNgJgf6SzIuJaM';
		channelNum =  isTestServer ?  76 : 102;
		wxChaid = isTestServer ? 3 : 30;
		couponUrl = isTestServer ? 'group=COUPON_GROUP&dataId=COUPON_DATA&propCacheKey=couponindex':'group=COUPON_GROUP&dataId=COUPON_DATA_NEW&propCacheKey=couponindex';
		couponUrlYwdt = isTestServer ? 'group=COUPON_GROUP&dataId=COUPON_DATA_GJDT&propCacheKey=couponindex' : 'group=COUPON_GROUP&dataId=COUPON_DATA_GJDT&propCacheKey=couponindex';
		telPhone = '4008113333';
		cleanHomeKey = 'homeNg9poWPwLBshy';
		cleanTempletIdA = isTestServer ? 28985 : 4235556;
		cleanTempletIdB = isTestServer ? 28987 : 4235558;
		featureFlag = true;
		myCenterCmsKey = 'channelNg4QS5gUlq1Ko';
		myCenterA = isTestServer ? 28790 : 4231292;
		myCenterB = isTestServer ? 28792 : 4231293;
		myCenterC = isTestServer ? 28791 : 4231294;
		baiduditch = 'https://hm.baidu.com/hm.js?76474ee00674b97e97be862a4c37980f';
        sgShareIndexTit = '陕西国美限时秒杀，精选爆品低价限时购！';
        sgShareIndexDes = '限时抢购！陕西国美管家力推当前行业尖货限时让利抢购栏目。新品、爆品更新秒，惊喜价格实时送...';
        defSgBanner = "http://gfs10.gomein.net.cn/T1TRYbBvCT1RCvBVdK.jpg";
        sgShareDetailTit = "陕西国美限时秒杀！";
        sgShareDetailDes = "我在陕西国美管家发现了一个不错的商品，赶快来看看吧。";
        sgShareIndexPic = "http://gfs10.gomein.net.cn/T1cQVvB4Ev1RCvBVdK.png";
		paySuccessCmskey = 'channelNg8uzyYdAZvYz';
		nearbystoresType = 10101;
		yyjfCmsKey = 'channelNgf08w02EedP2';
		partsCmsKey = 'homeNgV0nsUG36sj2';
		appid = '0VcdEg';
        dissgtxt = 'sxgm';
        break;
	// 黑天鹅管家
	case "hte":
		subDist = isTestServer ? "hte" : "v1";
		homeCmsKey = 'homeNghmokM06mZZc';
		dirCmsKey = 'channelNgFmOOXQoK5sG';
		indexLastName = '_hte';
		indexAllName = 'hte';
		homeTopFocusId = isTestServer ?  31244 : 4278799;
		homeAdverFocusId = isTestServer ?  31336 : 4278804;
		logoImgUrl = 'http://gfs10.gomein.net.cn/T1I_bjBCJ_1RCvBVdK.jpg';
		gzhTitle   = '黑天鹅管家';
		repairHomeKey = 'homeNgKPaIPH7C1lE';
		repairListCms = 'channelNgOajpwSpUmmZ';
		repairModIdA = isTestServer ? 31260 : 4280083;
		repairModIdB = isTestServer ? 31261 : 4280084;
		repairModIdC = isTestServer ? 31264 : 4280085;
		repairModIdD = isTestServer ? 31263 : 4280086;
		repairModIdE = isTestServer ? 31262 : 4280088;
		recycleHomeKey = 'homeNg1ArWqsQw0Mj';
		channelNum =  isTestServer ?  107 : 110;
		wxChaid = isTestServer ? 3 : 32;
		couponUrl = isTestServer ? 'group=COUPON_GROUP&dataId=COUPON_DATA&propCacheKey=couponindex':'group=COUPON_GROUP&dataId=COUPON_DATA_NEW&propCacheKey=couponindex';
		couponUrlYwdt = isTestServer ? 'group=COUPON_GROUP&dataId=COUPON_DATA_GJDT&propCacheKey=couponindex' : 'group=COUPON_GROUP&dataId=COUPON_DATA_GJDT&propCacheKey=couponindex';
		telPhone = '045153632098';
		cleanHomeKey = 'homeNgt8PIQvKIkSh';
		cleanTempletIdA = isTestServer ? 31256 : 4234244;//第3个
		cleanTempletIdB = isTestServer ? 31259 : 4234246;//最后一个
		featureFlag = true;
		myCenterCmsKey = 'channelNgLrwvyItZpPH';
		myCenterA = isTestServer ? 31276 : 4234113;
		myCenterB = isTestServer ? 31275 : 4234114;
		myCenterC = isTestServer ? 31399 : 4234115;
		baiduditch = 'https://hm.baidu.com/hm.js?a19956352c90cf726bd49915e2befd74';
		sgShareIndexTit = '黑天鹅闪购，精选爆品低价限时购！';
		sgShareIndexDes = '限时抢购！黑天鹅管家力推当前行业尖货限时让利抢购栏目。新品、爆品更新秒，惊喜价格实时送...';
		defSgBanner = "http://gfs11.gomein.net.cn/T1rZEgBmbv1RCvBVdK.jpg";
		sgShareDetailTit = "黑天鹅管家限时秒杀！";
		sgShareDetailDes = "我在黑天鹅管家发现了一个不错的商品，赶快来看看吧。";
		sgShareIndexPic = "http://gfs10.gomein.net.cn/T1JmEQBjWT1RCvBVdK.jpg";
		paySuccessCmskey = 'channelNgyFpPmLpIF2G';
		nearbystoresType = 10101;
		yyjfCmsKey = 'channelNgi7K7or3dv7e';
		partsCmsKey = 'homeNgPedvp2GbpYG';
		appid = '1lcpYI';
		dissgtxt = 'hte';
		break;
	// 广州管家
	case "gzgj":
		subDist = isTestServer ? "gzgj" : "v1";
		homeCmsKey = 'homeNghEGYvpA8Wna';
		dirCmsKey = 'channelNgFmOOXQoK5sG';
		indexLastName = '_gz';
		indexAllName = 'gz';
		homeTopFocusId = isTestServer ?  31277 : 4233835;
		homeAdverFocusId = isTestServer ?  31337 : 4233829;
		logoImgUrl = 'http://gfs10.gomein.net.cn/T1Y5YgBCYv1RCvBVdK.jpg';
		gzhTitle   = '广州管家';
		repairHomeKey = 'homeNg1wOqUkLHvKV';
		repairListCms = 'channelNglmneoee6uAP';
		repairModIdA = isTestServer ? 31294 : 4280070;
		repairModIdB = isTestServer ? 31295 : 4280071;
		repairModIdC = isTestServer ? 31298 : 4280072;
		repairModIdD = isTestServer ? 31297 : 4280076;
		repairModIdE = isTestServer ? 31296 : 4280077;
		recycleHomeKey = 'homeNg8eLme12emAq';
		channelNum =  isTestServer ?  106 : 109;
		wxChaid = isTestServer ? 3 : 31;
		couponUrl = isTestServer ? 'group=COUPON_GROUP&dataId=COUPON_DATA&propCacheKey=couponindex':'group=COUPON_GROUP&dataId=COUPON_DATA_NEW&propCacheKey=couponindex';
		couponUrlYwdt = isTestServer ? 'group=COUPON_GROUP&dataId=COUPON_DATA_GJDT&propCacheKey=couponindex' : 'group=COUPON_GROUP&dataId=COUPON_DATA_GJDT&propCacheKey=couponindex';
		telPhone = '02087518000';
		cleanHomeKey = 'homeNgEkAB8pR8XPI';
		cleanTempletIdA = isTestServer ? 31290 : 4234244;//第3个
		cleanTempletIdB = isTestServer ? 31293 : 4234246;//最后一个
		featureFlag = true;
		myCenterCmsKey = 'channelNgD4S9lM6aC2J';
		myCenterA = isTestServer ? 31314 : 4280108;
		myCenterB = isTestServer ? 31313 : 4280109;
		myCenterC = isTestServer ? 31412 : 4280110;
		baiduditch = 'https://hm.baidu.com/hm.js?698154b1031952d68a569606492c0fee';
		sgShareIndexTit = '广州管家闪购，精选爆品低价限时购！';
		sgShareIndexDes = '限时抢购！广州管家力推当前行业尖货限时让利抢购栏目。新品、爆品更新秒，惊喜价格实时送...';
		defSgBanner = "http://gfs15.atguat.net.cn/T1fuYvB7Z_1RCvBVdK.png";
		sgShareDetailTit = "广州管家限时秒杀！";
		sgShareDetailDes = "我在广州管家发现了一个不错的商品，赶快来看看吧。";
		sgShareIndexPic = "http://gfs11.gomein.net.cn/T16v_vByDv1RCvBVdK.png";
		paySuccessCmskey = 'channelNgi6NNhGMN7H3';
		nearbystoresType = 10101;
		yyjfCmsKey = 'channelNgiveBohQCdwS';
		partsCmsKey = 'homeNgzfFxDxSY8rk';
		appid = '15ldkt';
		dissgtxt = 'gzgj';
		break;
    default:
		subDist = 'yf';
		homeCmsKey = 'homeNgOnix4eRdAmC';
		dirCmsKey = 'channelNgFmOOXQoK5sG';
		indexLastName = '_gj';
		indexAllName = 'gj';
		homeTopFocusId = isTestServer ?  28286 : 4204378;
		homeAdverFocusId = isTestServer ?  28365 : 4204384;
		logoImgUrl = 'http://gfs10.gomein.net.cn/T1BUAbB4WT1RCvBVdK.png';
		gzhTitle   = '国美管家';
		repairHomeKey = 'homeNgeXC2OqXWRN5';
		repairListCms = 'channelNgoBDzRy8WRBK';
		repairModIdA = isTestServer ? 28825 : 4235724;
		repairModIdB = isTestServer ? 28826 : 4235725;
		repairModIdC = isTestServer ? 28829 : 4235727;
		repairModIdD = isTestServer ? 28828 : 4235728;
		repairModIdE = isTestServer ? 28827 : 4235729;
		recycleHomeKey = 'homeNgpKDWNKovubO';
		channelNum = isTestServer ?  4 : 0;
		//启动本地服务，测试用
        //channelNum = isTestServer ?  16 : 99;
		wxChaid = 3;
		couponUrl = isTestServer ? 'group=COUPON_GROUP&dataId=COUPON_DATA&propCacheKey=couponindex':'group=COUPON_GROUP&dataId=COUPON_DATA_NEW&propCacheKey=couponindex';
		couponUrlYwdt = isTestServer ? 'group=COUPON_GROUP&dataId=COUPON_DATA_GJDT&propCacheKey=couponindex' : 'group=COUPON_GROUP&dataId=COUPON_DATA_GJDT&propCacheKey=couponindex';
		telPhone = '4008113333';
		cleanHomeKey = 'homeNg8d3ZVDQZENl';
		cleanTempletIdA = isTestServer ? 28734 : 4230751;
		cleanTempletIdB = isTestServer ? 28752 : 4230753;
		featureFlag = true;
		myCenterCmsKey = 'channelNgK6xpnutP2EX';
		myCenterA = isTestServer ? 28304 : 4207936;
		myCenterB = isTestServer ? 28303 : 4207937;
		myCenterC = isTestServer ? 28305 : 4207938;
		baiduditch = 'https://hm.baidu.com/hm.js?8c53e55a2c80f0a400fbe1abb9c60c98';
		paySuccessCmskey = 'channelNgOxRmo53r2gl';
		nearbystoresType = 10101;
		yyjfCmsKey = 'channelNgu6caM9LWgOu';
		partsCmsKey = 'homeNgiQTfeHQvqPy';
		appid = '1oFcB1';
        break;
};
module.exports = {
    entry: entrys,
    output: {
        filename: '[name].js',
        path: './dev/resources/js',
        publicPath: '/dev/resources/js/'
    },
    resolve: {
        extensions: ['.vue', '.js']
    },
    externals: {
        "vue": "Vue"
    },
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        contentBase: '',
        port: config.port,
        disableHostCheck: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': "'development'",
            'mcHomeCmsKeymc': "'"+homeCmsKey+"'",
            'mcDirCmsKeymc': "'"+dirCmsKey+"'",
            'mcIndexLastNamemc': "'"+indexLastName+"'",
            'mcIndexAllNamemc': "'"+indexAllName+"'",
			'mcHomeTopFocusIdmc': "'"+homeTopFocusId+"'",
			'mcHomeAdverFocusIdmc': "'"+homeAdverFocusId+"'",
			'mcFootCmsKeymc': "'"+footCmsKey+"'",
			'mcLogoImgUrlmc': "'"+logoImgUrl+"'",
			'mcRepairHomeKeymc': "'"+repairHomeKey+"'",
			'mcRecycleHomeKeymc': "'"+recycleHomeKey+"'",
			'mcTitlemc': "'"+gzhTitle+"'",
			'mcoriginmc': "'"+channelNum+"'",
			'mcrecycleUrlmc': "'"+oRecycleUrl+"'",
			'mcWxChaidmc': "'"+wxChaid+"'",
			'mcSubDistmc': "'"+subDist+"'",
			'mcCouponUrlmc': "'"+couponUrl+"'",
			'mcCouponUrlYwdtmc': "'"+couponUrlYwdt+"'",
			'国美管家': "'"+gzhTitle+"'",
			'mcAdverMcmsKeymc': "'"+adverMcmsKey+"'",
			'mcTelPhonemc': "'"+telPhone+"'",
			'mcCleanHomekeymc': "'"+cleanHomeKey+"'",
			'mcFeatureFlagmc': "'"+featureFlag+"'",
			'mcDireactionCmsKeymc': "'"+direactionCmsKey+"'",
			'mcMyCenterAmc': "'"+myCenterA+"'",
			'mcMyCenterBmc': "'"+myCenterB+"'",
			'mcMyCenterCmc': "'"+myCenterC+"'",
			'mcFeescaleCmsKeymc': "'"+feescaleCmsKey+"'",
			'mcUniteLoginmc': "'"+uniteLogin+"'",
			'mccleanTempletIdAmc': "'"+cleanTempletIdA+"'",
			'mccleanTempletIdBmc': "'"+cleanTempletIdB+"'",
			'mcrepairListCmsmc': "'"+repairListCms+"'",
			'mcrepairModIdAmc': "'"+repairModIdA+"'",
			'mcrepairModIdBmc': "'"+repairModIdB+"'",
			'mcrepairModIdCmc': "'"+repairModIdC+"'",
			'mcrepairModIdDmc': "'"+repairModIdD+"'",
			'mcrepairModIdEmc': "'"+repairModIdE+"'",
			'mcMyCenterCmsKeymc': "'"+myCenterCmsKey+"'",
			'mcBaiduditchmc': "'"+baiduditch+"'",
			'mcPaySuccessCmskeymc': "'"+paySuccessCmskey+"'",
            'mcSgIndexTitmc': "'"+ sgShareIndexTit + "'",
			'mcSgIndexDesmc': "'"+ sgShareIndexDes + "'",
            'mcSgDetailTitmc': "'"+ sgShareDetailTit + "'",
            'mcSgDetailDesmc': "'"+ sgShareDetailDes + "'",
			'mcSgBanDefmc':"'"+ defSgBanner + "'",
			'mcSgIndexPicmc':"'"+ sgShareIndexPic + "'",
			'mcNearbystoresTypemc': "'"+nearbystoresType+"'",
			'mcAirConditioningmc':"'"+ yyjfCmsKey + "'",
			'mcPartSalemc':"'"+ partsCmsKey + "'",
			'mcAppidmc':"'"+ appid + "'",
            'mcDissgTxtmc': "'"+dissgtxt+"'",
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
		rules: [{
			test: /\.less$/,
			use: ["style-loader", "css-loader", "less-loader"]
		}, {
			test: /\.css$/,
			use: ["style-loader", "css-loader"]
		}, {
			test: /\.vue$/,
			use: [{
				loader: "vue-loader"
			}]
		}, {
			test: /\.js$/,
			loader: "babel-loader",
			options: {
				presets: ["es2015", "stage-2"]
			},
			exclude: /node_modules/
		}, {
			test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: "url-loader",
			options: {
				limit: 10000,
				name: path.join('../img', '[name].[ext]')
			}
		}, {
			test: /vux.src.*?js$/,
			use: [{
				loader: "babel-loader"
			}]
		}]
	}
}