"use strict"
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const uglify = require('gulp-uglify');
const pump = require('pump');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const insert = require('gulp-insert');
const babel = require('gulp-babel');
const replace = require('gulp-replace');
const cleanCSS = require('gulp-clean-css');
const zip = require('gulp-zip');
const runSequence = require('run-sequence');
const argv = require('yargs').argv;
const taskListing = require('gulp-task-listing');
const colors = require('chalk');
const minifycss = require('gulp-minify-css');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const fs = require('fs-extra');
const rev = require('gulp-rev');
const exec = require('child_process').exec;
const co = require('co');
const path = require('path');

gulp.task('html2', function() {
	fs.removeSync('./assets')
	fs.removeSync('./dist')
	fs.ensureDirSync('./dist/resources')
	fs.copy('./resources', './dist/resources', function(err) {
		if (err) return console.error(err)
		console.log("success!")
		gulp.src('dist/resources/js/*.js')
			.pipe(uglify())
			.pipe(gulp.dest('dist/resources/js'))
		gulp.src('dist/resources/css/*.css')
			.pipe(minifycss())
			.pipe(gulp.dest('dist/resources/css'))
		gulp.src('dist/resources/json/*.json')
			.pipe(gulp.dest('dist/json'))
	});
	gulp.src('./src/page/**/*.html')
		.pipe(rename({
			dirname: ''
		}))
		.pipe(gulp.dest('./dist'))
})

var arr = [
	'resources/js/zepto.min.js',
	'resources/js/vue.min.js',
	'resources/js/util.js',
	'resources/js/flexible.js'
];
gulp.task('miniCombinJs', function() {
	return gulp.src(arr)
		.pipe(concat('combined.js'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/resources/js'))
})

var crr = [
	'resources/js/swiper.min.js',
	'resources/js/iscroll.js'
];
gulp.task('miniBaseJs', function() {
	return gulp.src(crr)
		.pipe(concat('base.js'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/resources/js'))
});

gulp.task('rev-css', () => {
	var stream = gulp.src(['dist/resources/css/*.css'])
		.pipe(rev());
	return stream
});

gulp.task('rev-js', () => {
	var stream = gulp.src(['dist/resources/js/*.js'])
		.pipe(rev());
	return stream
});
// gulp.task('rev-js', ['miniCombinJs', 'miniBaseJs'], () => {
//     // by default, gulp would pick `assets/css` as the base,
//     // so we need to set it explicitly:
//     var stream = gulp.src(['dist/resources/js/*.js'])
//         .pipe(rev());
//     return stream
// });

gulp.task('build', ['rev-js', 'rev-css'])

/*配置*/
var isAll = argv.all || false
var isTestServer = argv.ceshi || false
var buildSetting = argv.task;
let workDir, outputDir, outUrl, outDir, outFlag;
let homeCmsKey, //首页cmskey
	dirCmsKey, //说明书首页key
	indexLastName, // 首页接口参数区分尾串
	indexAllName, // 首页接口参数区分名
	homeTopFocusId, ////首页顶部轮播id
	homeAdverFocusId, //首页广告位轮播id
	footCmsKey, //底部导航cmskey
	logoImgUrl, //logo图片路径
	gzhTitle, // 公众号名称
	channelNum, // 下单渠道号
	oRecycleUrl, //爱回收下单接口
	wxChaid, //微信公众号支付chaid
	subDist, //访问页面子目录
	couponUrl, //优惠券领取接口
	couponUrlYwdt, //业务递推优惠券领取接口
	telPhone, //服务电话
	featureFlag, //功能是否显示
	direactionCmsKey, //电子说明书详情页cmskey
	myCenterCmsKey, //个人中心cmskey
	cleanHomeKey, //清洗首页cmskey
	adverMcmsKey, //advertisement组件cmskey
	uniteLogin, //联合登录接口
	myCenterA, //个人中心广告位id1
	myCenterB, //个人中心广告位id2
	myCenterC, //个人中心广告位id3
	cleanTempletIdA, //清洗首页id
	cleanTempletIdB, //清洗首页id
	feescaleCmsKey, //收费标准页面cmskey
	repairHomeKey, //维修首页cmskey
	repairListCms, //维修二级页cmskey
	repairModIdA, //维修二级页模块id
	repairModIdB, //维修二级页模块id
	repairModIdC, //维修二级页模块id
	repairModIdD, //维修二级页模块id
	repairModIdE, //维修二级页模块id
	baiduditch, //百度统计码
	recycleHomeKey, //回收首页cmskey
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
	activityCmskey,//活动cmskey
	activityShareText,//活动分享文案
	appid; //在线客服appid
oRecycleUrl = isTestServer ? '//azd.dev.gomegj.com' : '//open.gomegj.com';
uniteLogin = isTestServer ? 'login.m.atguat.com.cn' : 'login.m.gome.com.cn';
footCmsKey = 'homeNgSTrIOpK9Hdx';
adverMcmsKey = isTestServer ? 'homeNgBd7AcGQuokb' : 'homeNgJbl89SlVm2v';
direactionCmsKey = 'channelNgRu2m4qUAD33';
feescaleCmsKey = 'channelNgASQLAWFdF7A';

switch (buildSetting) {
	// 永乐
	case "ylgj":
		workDir = './dist/';
		outputDir = isTestServer ? "guanjia" : "yolo";
		outUrl = isTestServer ? 'dev.gomegj.com/guanjia/yolo' : 'gomegj.com/yolo/v1';
		subDist = outDir = isTestServer ? "yolo" : "v1";
		outFlag = isTestServer ? "ylgj_testServer" : "ylgj_production";
		homeCmsKey = 'homeNgCGFb8f655Gm';
		dirCmsKey = 'channelNgFmOOXQoK5sG';
		indexLastName = '_yolo';
		indexAllName = 'yolo';
		homeTopFocusId = isTestServer ? 28881 : 4235480;
		homeAdverFocusId = isTestServer ? 28889 : 4235484;
		logoImgUrl = 'http://gfs11.gomein.net.cn/T1NxxQBgDT1RCvBVdK.jpg';
		gzhTitle = '永乐管家';
		repairHomeKey = 'homeNgkttJV6Q7Rdv';
		repairListCms = 'channelNgKLfYTDnEGrs';
		repairModIdA = isTestServer ? 28979 : 4237314;
		repairModIdB = isTestServer ? 28980 : 4237315;
		repairModIdC = isTestServer ? 28983 : 4237318;
		repairModIdD = isTestServer ? 28982 : 4237317;
		repairModIdE = isTestServer ? 28981 : 4237316;
		recycleHomeKey = 'homeNgisrgNnFy5L3';
		channelNum = isTestServer ? 72 : 99;
		wxChaid = isTestServer ? 3 : 8;
		couponUrl = isTestServer ? 'group=COUPON_GROUP&dataId=COUPON_DATA&propCacheKey=couponindex' : 'group=COUPON_GROUP&dataId=COUPON_DATA_NEW&propCacheKey=couponindex';
		couponUrlYwdt = isTestServer ? 'group=COUPON_GROUP&dataId=COUPON_DATA_GJDT&propCacheKey=couponindex' : 'group=COUPON_GROUP&dataId=COUPON_DATA_GJDT&propCacheKey=couponindex';
		telPhone = '4008113336';
		cleanHomeKey = 'homeNgLTDii10G51X';
		cleanTempletIdA = isTestServer ? 33463 : 4237283;
		cleanTempletIdB = isTestServer ? 28880 : 4237284;
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
		workDir = './dist/';
		outputDir = isTestServer ? "guanjia" : "dzgj";
		outUrl = isTestServer ? 'dev.gomegj.com/guanjia/dzgj' : 'gomegj.com/dzgj/v1';
		subDist = outDir = isTestServer ? "dzgj" : "v1";
		outFlag = isTestServer ? "dzgj_testServer" : "dzgj_production";
		homeCmsKey = 'homeNgoIn71UPomdy';
		dirCmsKey = 'channelNgFmOOXQoK5sG';
		indexLastName = '_dz';
		indexAllName = 'dz';
		homeTopFocusId = isTestServer ? 28814 : 4233835;
		homeAdverFocusId = isTestServer ? 28834 : 4233829;
		logoImgUrl = 'http://gfs10.gomein.net.cn/T1Y5YgBCYv1RCvBVdK.jpg';
		gzhTitle = '大中管家';
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
		couponUrl = isTestServer ? 'group=COUPON_GROUP&dataId=COUPON_DATA&propCacheKey=couponindex' : 'group=COUPON_GROUP&dataId=COUPON_DATA_NEW&propCacheKey=couponindex';
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
        sgShareIndexPic = "http://gfs13.gomein.net.cn/T1tSd_ByWv1RCvBVdK.jpg";
		paySuccessCmskey = 'channelNgwnSB3jBIV27';
		nearbystoresType = 13;
		yyjfCmsKey = 'channelNgW5pshBpxOlM';
		partsCmsKey = 'homeNgSU9Gm7m2prp';
		appid = '0RgFcU';
        dissgtxt = 'dzgj';
		activityCmskey = 'homeNgJQPx5Ce1Ych';
		activityShareText = '家电清洗吐血疯抢！1元能抵100元！！手慢无！';
		break;
		// 陕西
	case "sxgm":
		workDir = './dist/';
		outputDir = isTestServer ? 'guanjia' : 'sx';
		outUrl = isTestServer ? 'dev.gomegj.com/guanjia/sxgm' : 'gomegj.com/sx/v1';
		subDist = outDir = isTestServer ? 'sxgm' : 'v1';
		outFlag = isTestServer ? "sxgm_testServer" : "sxgm_production";
		homeCmsKey = 'homeNgNFwQyIlRKyL';
		dirCmsKey = 'channelNgFmOOXQoK5sG';
		indexLastName = '_sx';
		indexAllName = 'sx';
		homeTopFocusId = isTestServer ? 28762 : 4208195;
		homeAdverFocusId = isTestServer ? 28770 : 4208200;
		logoImgUrl = 'http://gfs13.gomein.net.cn/T1tkb_Byhv1RCvBVdK.png';
		gzhTitle = '国美管家';
		repairHomeKey = 'homeNgMreWVNEyCsL';
		repairListCms = 'channelNg8457Dpis8LB';
		repairModIdA = isTestServer ? 28964 : 4235672;
		repairModIdB = isTestServer ? 28965 : 4235673;
		repairModIdC = isTestServer ? 28978 : 4235674;
		repairModIdD = isTestServer ? 28977 : 4235675;
		repairModIdE = isTestServer ? 28976 : 4235676;
		recycleHomeKey = 'homeNgJgf6SzIuJaM';
		channelNum = isTestServer ? 76 : 102;
		wxChaid = isTestServer ? 3 : 30;
		couponUrl = isTestServer ? 'group=COUPON_GROUP&dataId=COUPON_DATA&propCacheKey=couponindex' : 'group=COUPON_GROUP&dataId=COUPON_DATA_NEW&propCacheKey=couponindex';
		couponUrlYwdt = isTestServer ? 'group=COUPON_GROUP&dataId=COUPON_DATA_GJDT&propCacheKey=couponindex' : 'group=COUPON_GROUP&dataId=COUPON_DATA_GJDT&propCacheKey=couponindex';
		telPhone = '4008113333';
		cleanHomeKey = 'homeNg9poWPwLBshy';
		cleanTempletIdA = isTestServer ? 28985 : 4235556;
		cleanTempletIdB = isTestServer ? 28987 : 4235558;
		featureFlag = true;
		myCenterCmsKey = 'channelNgdAD4lBOnlf7';
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
		workDir = './dist/';
		outputDir = isTestServer ? 'guanjia' : 'hte';
		outUrl = isTestServer ? 'dev.gomegj.com/guanjia/hte' : 'gomegj.com/hte/v1';
		subDist = outDir = isTestServer ? "hte" : "v1";
		outFlag = isTestServer ? "hte_testServer" : "hte_production";
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
		cleanTempletIdA = isTestServer ? 31256 : 4278906;//第3个
		cleanTempletIdB = isTestServer ? 31259 : 4278908;//最后一个
		featureFlag = true;
		myCenterCmsKey = 'channelNgHqt8n36tNuy';
		myCenterA = isTestServer ? 31421 : 4280101;
		myCenterB = isTestServer ? 31422 : 4280102;
		myCenterC = isTestServer ? 31423 : 4280103;
		baiduditch = 'https://hm.baidu.com/hm.js?a19956352c90cf726bd49915e2befd74';
		sgShareIndexTit = '黑天鹅闪购，精选爆品低价限时购！';
		sgShareIndexDes = '限时抢购！黑天鹅管家力推当前行业尖货限时让利抢购栏目。新品、爆品更新秒，惊喜价格实时送...';
		defSgBanner = "http://gfs11.gomein.net.cn/T1rZEgBmbv1RCvBVdK.jpg";
		sgShareDetailTit = "黑天鹅管家限时秒杀！";
		sgShareDetailDes = "我在黑天鹅管家发现了一个不错的商品，赶快来看看吧。";
		sgShareIndexPic = "http://gfs10.gomein.net.cn/T1JmEQBjWT1RCvBVdK.jpg";
		paySuccessCmskey = 'channelNgi6NNhGMN7H3';
		nearbystoresType = 10101;
		yyjfCmsKey = 'channelNgi7K7or3dv7e';
		partsCmsKey = 'homeNgPedvp2GbpYG';
		appid = '1lcpYI';
		dissgtxt = 'hte';
		break;
	// 广州管家
	case "gzgj":
		workDir = './dist/';
		outputDir = isTestServer ? 'guanjia' : 'gzgj';
		outUrl = isTestServer ? 'dev.gomegj.com/guanjia/gzgj' : 'gomegj.com/gzgj/v1';
		subDist = outDir = isTestServer ? "gzgj" : "v1";
		outFlag = isTestServer ? "gzgj_testServer" : "gzgj_production";
		homeCmsKey = 'homeNghEGYvpA8Wna';
		dirCmsKey = 'channelNgFmOOXQoK5sG';
		indexLastName = '_gz';
		indexAllName = 'gz';
		homeTopFocusId = isTestServer ?  31277 : 4280004;
		homeAdverFocusId = isTestServer ?  31337 : 4280047;
		logoImgUrl = 'http://gfs11.gomein.net.cn/T1DEAQBXLT1RCvBVdK.jpg';
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
		cleanTempletIdA = isTestServer ? 31290 : 4280064;//第3个
		cleanTempletIdB = isTestServer ? 31293 : 4280068;//最后一个
		featureFlag = true;
		myCenterCmsKey = 'channelNgD4S9lM6aC2J';
		myCenterA = isTestServer ? 31314 : 4280108;
		myCenterB = isTestServer ? 31313 : 4280109;
		myCenterC = isTestServer ? 31412 : 4280110;
		baiduditch = 'https://hm.baidu.com/hm.js?698154b1031952d68a569606492c0fee';
		sgShareIndexTit = '广州管家闪购，精选爆品低价限时购！';
		sgShareIndexDes = '限时抢购！广州管家力推当前行业尖货限时让利抢购栏目。新品、爆品更新秒，惊喜价格实时送...';
		defSgBanner = "http://gfs13.gomein.net.cn/T16E_gBCWv1RCvBVdK.jpg";
		sgShareDetailTit = "广州管家限时秒杀！";
		sgShareDetailDes = "我在广州管家发现了一个不错的商品，赶快来看看吧。";
		sgShareIndexPic = "http://gfs12.gomein.net.cn/T1iR_bB7Vv1RCvBVdK.jpg";
		paySuccessCmskey = 'channelNgi6NNhGMN7H3';
		nearbystoresType = 10101;
		yyjfCmsKey = 'channelNgoPIOwpIpDiK';
		partsCmsKey = 'homeNgzfFxDxSY8rk';
		appid = '15ldkt';
		dissgtxt = 'gzgj';
		break;
	default:
		workDir = './dist/';
		outputDir = 'guanjia';
		outUrl = isTestServer ? 'dev.gomegj.com/guanjia/yf' : 'gomegj.com/guanjia/yf';
		subDist = outDir = 'yf';
		outFlag = isTestServer ? "testServer" : "production";
		homeCmsKey = 'homeNgOnix4eRdAmC';
		dirCmsKey = 'channelNgFmOOXQoK5sG';
		indexLastName = '_gj';
		indexAllName = 'gj';
		homeTopFocusId = isTestServer ? 28286 : 4204378;
		homeAdverFocusId = isTestServer ? 28365 : 4204384;
		logoImgUrl = 'http://gfs16.gomein.net.cn/T17OCgBCDv1RCvBVdK.png';
		gzhTitle = '国美管家';
		repairHomeKey = 'homeNgeXC2OqXWRN5';
		repairListCms = 'channelNgoBDzRy8WRBK';
		repairModIdA = isTestServer ? 28825 : 4235724;
		repairModIdB = isTestServer ? 28826 : 4235725;
		repairModIdC = isTestServer ? 28829 : 4235727;
		repairModIdD = isTestServer ? 28828 : 4235728;
		repairModIdE = isTestServer ? 28827 : 4235729;
		recycleHomeKey = 'homeNgpKDWNKovubO';
		channelNum = isTestServer ? 4 : 0;
		wxChaid = 3;
		couponUrl = isTestServer ? 'group=COUPON_GROUP&dataId=COUPON_DATA&propCacheKey=couponindex' : 'group=COUPON_GROUP&dataId=COUPON_DATA_NEW&propCacheKey=couponindex';
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
		paySuccessCmskey = 'channelNgiveBohQCdwS';
		nearbystoresType = 10101;
		yyjfCmsKey = 'channelNgu6caM9LWgOu';
		partsCmsKey = 'homeNgiQTfeHQvqPy';
		appid = '1oFcB1';
		activityCmskey = 'homeNgoKK3FkJd6sX';
		activityShareText = '足不出户享受上门维修、回收、清洗保养服务，贴心到家服务等您召唤。';
		break;
};
gulp.task('html', function() {
	fs.removeSync('/dev')
	fs.ensureDirSync('/dev/resources')
	fs.copy('./resources', './dev/resources', function(err) {
		if (err) return console.error(err)
		gulp.src('dev/resources/js/*.js')
			.pipe(replace(/mcUniteLoginmc/g, "'" + uniteLogin + "'"))
			.pipe(replace(/mcSubDistmc/g, "'" + subDist + "'"))
			.pipe(replace(/mcLogoImgUrlmc/g, "'" + logoImgUrl + "'"))
			.pipe(replace(/mcBaiduditchmc/g, "'" + baiduditch + "'"))
			.pipe(replace(/mcActivityShareTextmc/g, "'" + activityShareText + "'"))
			.pipe(gulp.dest('dev/resources/js'))
		console.log("success!")
	});
	gulp.src('./src/page/**/*.html')
		.pipe(rename({
			dirname: ''
		}))
		.pipe(gulp.dest('./dev'))
})
let URL = outUrl;
// let serverFlag = outFlag;
let serverFlag = isTestServer ? "testServer" : "production";
let dirUrl = isTestServer ? '.' : '.';
let date = argv.time ? new Date(argv.time * 1000) : new Date(),
	time = date.getTime(),
	day = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate(),
	datetime = date.getFullYear() + '' + (date.getMonth() + 1) + '' + date.getDate() + '_' + date.getHours() + '' + date.getMinutes() + '' + date.getSeconds();
// let dirFile = isTestServer ? '/' : '/home/admin/deploy/';
let dirFile = '/';
let outputBaseDir = 'package/' + day + '/' + serverFlag + dirFile;
let outputAllBaseDir = isAll ? 'package/' + day : isTestServer ? 'package/' + day + '/' + serverFlag + dirFile : 'package/' + day + '/' + serverFlag;
let getOutputDir = (type) => outputBaseDir + '/' + type + '/' + outputDir + '/' + outDir;
let selfInfo = "/* \n * Gomegj" + (isTestServer ? " (Test Server)" : "") + " \n * created by Gomegj on " + day + "\n */ \n";

gulp.task('babel', () => {
	return gulp.src(workDir + 'scripts/*.js')
		.pipe(babel())
		.pipe(gulp.dest(workDir + 'js'));
});

// development server
gulp.task('server', () => {
	browserSync.init({
		server: {
			baseDir: workDir
		}
	});

	gulp.watch(['**/css/*.css', '**/js/*.js', '**/*.html'], reload);
});

gulp.task('clean', () => {
	return del(['package/' + day], {
		force: true
	});
});

gulp.task('uglifyJS', (callback) => {
	pump([
		gulp.src(workDir + 'resources/js/**/*'),
		replace(/(\(|'|")\s*[./]*(img)\/(.+)\.(png|jpg|gif|ico)\s*(\)|'|")/g, (str, p1, p2, p3, p4, p5) => {
			return p1 + '//' + p2 + dirUrl + URL + '/' + p3 + '.' + p4 + p5;
		}),
		// 替换key值
		replace(/mcHomeCmsKeymc/g, "'" + homeCmsKey + "'"),
		replace(/mcDirCmsKeymc/g, "'" + dirCmsKey + "'"),
		replace(/mcIndexLastNamemc/g, "'" + indexLastName + "'"),
		replace(/mcIndexAllNamemc/g, "'" + indexAllName + "'"),
		replace(/mcHomeTopFocusIdmc/g, homeTopFocusId),
		replace(/mcHomeAdverFocusIdmc/g, homeAdverFocusId),
		replace(/mcFootCmsKeymc/g, "'" + footCmsKey + "'"),
		replace(/mcLogoImgUrlmc/g, "'" + logoImgUrl + "'"),
		replace(/mcRepairHomeKeymc/g, "'" + repairHomeKey + "'"),
		replace(/mcRecycleHomeKeymc/g, "'" + recycleHomeKey + "'"),
		replace(/mcTitlemc/g, "'" + gzhTitle + "'"),
		replace(/mcoriginmc/g, channelNum),
		replace(/mcrecycleUrlmc/g, "'" + oRecycleUrl + "'"),
		replace(/mcWxChaidmc/g, wxChaid),
		replace(/mcSubDistmc/g, "'" + subDist + "'"),
		replace(/mcCouponUrlmc/g, "'" + couponUrl + "'"),
		replace(/mcCouponUrlYwdtmc/g, "'" + couponUrlYwdt + "'"),
		replace(/国美管家/g, gzhTitle),
		replace(/mcAdverMcmsKeymc/g, "'" + adverMcmsKey + "'"),
		replace(/mcTelPhonemc/g, "'" + telPhone + "'"),
		replace(/mcCleanHomekeymc/g, "'" + cleanHomeKey + "'"),
		replace(/mcFeatureFlagmc/g, featureFlag),
		replace(/mcDireactionCmsKeymc/g, "'" + direactionCmsKey + "'"),
		replace(/mcMyCenterCmsKeymc/g, "'" + myCenterCmsKey + "'"),
		replace(/mcMyCenterAmc/g, myCenterA),
		replace(/mcMyCenterBmc/g, myCenterB),
		replace(/mcMyCenterCmc/g, myCenterC),
		replace(/mcFeescaleCmsKeymc/g, "'" + feescaleCmsKey + "'"),
		replace(/mcUniteLoginmc/g, "'" + uniteLogin + "'"),
		replace(/mccleanTempletIdAmc/g, cleanTempletIdA),
		replace(/mccleanTempletIdBmc/g, cleanTempletIdB),
		replace(/mcrepairListCmsmc/g, "'" + repairListCms + "'"),
		replace(/mcrepairModIdAmc/g, "'" + repairModIdA + "'"),
		replace(/mcrepairModIdBmc/g, "'" + repairModIdB + "'"),
		replace(/mcrepairModIdCmc/g, "'" + repairModIdC + "'"),
		replace(/mcrepairModIdDmc/g, "'" + repairModIdD + "'"),
		replace(/mcrepairModIdEmc/g, "'" + repairModIdE + "'"),
		replace(/mcBaiduditchmc/g, "'" + baiduditch + "'"),
		replace(/mcPaySuccessCmskeymc/g, "'"+paySuccessCmskey+"'"),
        replace(/mcSgBanDefmc/g, "'"+defSgBanner+"'"),
		replace(/mcNearbystoresTypemc/g, "'"+nearbystoresType+"'"),
		replace(/mcAirConditioningmc/g, "'"+yyjfCmsKey+"'"),
		replace(/mcPartSalemc/g, "'"+partsCmsKey+"'"),
		replace(/mcAppidmc/g, "'"+appid+"'"),
        replace(/mcDissgTxtmc/g, "'"+dissgtxt+"'"),
		replace(/mcActivityCmskeymc/g, "'"+activityCmskey+"'"),
		uglify().on('error', console.log),
		insert.prepend(selfInfo),
		gulp.dest(getOutputDir('js'))
	], callback);
});

gulp.task('uglifyCSS', () => {
	return gulp.src(workDir + 'resources/css/*.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'Android >= 4.0'],
			cascade: true
		}))
		.pipe(replace(/(\(|'|")\s*[./]*(img)\/(.+)\.(png|jpg|gif|ico)\s*(\)|'|")/g, (str, p1, p2, p3, p4, p5) => {
			return p1 + '//' + p2 + dirUrl + URL + '/' + p3 + '.' + p4 + p5;
		}))
		.pipe(cleanCSS({
			compatibility: 'ie8'
		}))
		.pipe(insert.prepend(selfInfo))
		.pipe(gulp.dest(getOutputDir('css')));
});

gulp.task('uglifyHTML', () => {
	return gulp.src(workDir + '*.html')
		.pipe(replace(/(\(|'|")\s*[./]*(img)\/(.+)\.(png|jpg|gif|ico)\s*(\)|'|")/g, (str, p1, p2, p3, p4, p5) => {
			return p1 + '//' + p2 + dirUrl + URL + '/' + p3 + '.' + p4 + p5;
		}))
		.pipe(replace(/['"]\s*(\/resources\/css|\/resources\/js)\/(.+)\.(css|js)\s*['"]/g, (str, p1, p2, p3) => {
			return '"//' + p1.replace("/resources/", "") + dirUrl + URL + '/' + p2 + '.' + p3 + '?v=' + time + '"';
		}))
		.pipe(replace(/['"]\s*(.+wx\.qq\.com.+\.js\?v=)\S+\s*['"]/g, (str, p1) => {
			return '"' + p1 + time + '"';
		}))
		.pipe(replace(/mcLogoImgUrlmc/g, "'" + logoImgUrl + "'"))
		.pipe(replace(/mcTitlemc/g, "'" + gzhTitle + "'"))
		.pipe(replace(/mcCouponUrlmc/g, "'" + couponUrl + "'"))
		.pipe(replace(/mcCouponUrlYwdtmc/g, "'" + couponUrlYwdt + "'"))
		.pipe(replace(/国美管家/g, gzhTitle))
        .pipe(replace(/mcSgIndexTitmc/g,"'"+ sgShareIndexTit + "'"))
        .pipe(replace(/mcSgIndexDesmc/g,"'"+ sgShareIndexDes + "'"))
        .pipe(replace(/mcSgBanDefmc/g,"'"+ defSgBanner + "'"))
        .pipe(replace(/mcSgDetailTitmc/g,"'"+ sgShareDetailTit + "'"))
        .pipe(replace(/mcSgDetailDesmc/g,"'"+ sgShareDetailDes + "'"))
        .pipe(replace(/mcSgIndexPicmc/g,"'"+ sgShareIndexPic + "'"))
		.pipe(replace(/mcActivityShareTextmc/g, "'" + activityShareText + "'"))
		.pipe(htmlmin({
			// collapseWhitespace: true,
			// preserveLineBreaks: true,
			// collapseWhitespace: true
		}))
		.pipe(gulp.dest(getOutputDir('html')))

});

gulp.task('moveIMG', () => {
	return gulp.src(workDir + 'img/*')
		.pipe(gulp.dest(getOutputDir('img')))
});

gulp.task('moveJSON', () => {
	return gulp.src(workDir + 'json/*')
		.pipe(gulp.dest(getOutputDir('html') + '/json/'))
});

gulp.task('zipPackage', () => {
	if (isAll) {
		if (isTestServer) {
			serverFlag = 'all_testServer'
		} else {
			serverFlag = 'all_production'
		}
	}
	return gulp.src(outputAllBaseDir + '/**')
		.pipe(zip(serverFlag + '_' + datetime + '.zip'))
		.pipe(gulp.dest('package'));
});

// production
gulp.task('uglify', (callback) => {
	runSequence('clean', ['uglifyJS', 'uglifyHTML', 'uglifyCSS', 'moveIMG', 'moveJSON'],
		'zipPackage',
		'clean',
		callback);
});

//先清除非打包压缩
gulp.task('compress', (callback) => {
	runSequence('clean', ['uglifyJS', 'uglifyHTML', 'uglifyCSS', 'moveIMG', 'moveJSON'],
		callback);
});

//非清除非打包压缩
gulp.task('compressOne', (callback) => {
	runSequence(['uglifyJS', 'uglifyHTML', 'uglifyCSS', 'moveIMG', 'moveJSON'],
		callback);
});

gulp.task('compressTwo', (callback) => {
	runSequence(['uglifyJS', 'uglifyHTML', 'uglifyCSS', 'moveIMG', 'moveJSON'],
		'zipPackage',
		'clean',
		callback);
});

gulp.task('package', ['uglify']);
gulp.task('packageOne', ['compress']);
gulp.task('packageTwo', ['compressOne']);
gulp.task('packageThree', ['compressTwo']);