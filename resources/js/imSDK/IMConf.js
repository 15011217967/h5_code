var IMConf = new Object();

if (window.location.host == 'wap.dev.gomegj.com') {
    IMConf.APPID = "gomeplus_pre";
    IMConf.IM_API_URL = "http://api-imrh.pre.gomeplus.com/im-platform/";
}else{
    IMConf.APPID = "gomeplus_pro";
    IMConf.IM_API_URL = "https://api-imrh.gomeplus.com/im-platform/";
};
// IMConf.APPID = "TEST_APP_ID";
// IMConf.IM_API_URL = "http://10.112.178.125:8080/im-platform/";

IMConf.OSTYPE = 20;
IMConf.VERSION = 1;
IMConf.DEVICE_TYPE = 30;
