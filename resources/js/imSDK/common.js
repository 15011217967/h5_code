
   function ajaxFileUpload(objUpload) {
         var nowTime = (new Date()).valueOf();
         var keyStr = objUpload.option.appId + objUpload.option.uid + nowTime;
         var keys = md5(keyStr);
         var formData = new FormData();
         // 修改：伍云江
         // FROM：
         // formData.append('file', $(objUpload.option.file)[0].files[0]);
         // TO
         // formData.append('file', objUpload.option.file);
         // 原因：因为要实现重新发送图片功能，而input file不能动态设置值，所以这里由以前的通过id获取改成直接传入file
         formData.append('file', objUpload.option.file);
         // formData.append('appId', objUpload.option.appId);
         // formData.append('uid', objUpload.option.uid);
         // formData.append('currentTime', nowTime);
         // formData.append('key', keys);
         // formData.append('traceId', new Date().getTime() + "!" + Math.random(10000));
         $.ajax({
             type: "post",
             url: IMConstants.IM_FILESERVERLIST + "/im-upload/ImageUploadServlet.do",
             // url: 'http://gfs.ds.gfsuat.com.cn/api/fileup',
             // url:'/pic/yf/upload',
             contentType: false, //这个一定要写
             processData: false, //这个也一定要写，不然会报错
             data: formData,
             dataType: 'json', //返回类型，有json，text，HTML。这里并没有jsonp格式，所以别妄想能用jsonp做跨域了。
             success: function(data) {
                 // data.data.imgUrl = IMConstants.IM_LOADFILEURL + "/v1/img/" + data.data.imgSmallName;
                 objUpload.option.fileUpload(data);
             },
             error: function(XMLHttpRequest, textStatus, errorThrown, data) {
                 objUpload.option.error(data);
             }
         });
    };
  function ajaxIMFileUpload(objUpload) {
    var nowTime = new Date().valueOf();
    var keyStr = IMConf.APPID + objUpload.option.uid + nowTime;
    var keys = md5(keyStr);
    var formData = new FormData();
    formData.append('file', objUpload.option.file);
    //将文件转成二进制形式
    formData.append('appId', IMConf.APPID);
    if (objUpload.option.uid == null || objUpload.option.uid == undefined || objUpload.option.uid < 0) {
        objUpload.option.uid = this.getRandomNum(1000, 10000);
    }
    formData.append('uid', objUpload.option.uid);
    formData.append('currentTime', nowTime);
    formData.append('key', keys);
    formData.append('traceId', new Date().getTime() + '!' + Math.random(10000));
    $.ajax({
        type: 'post',
        url: IMConstants.IM_FILESERVERLIST + '/im-upload/ImageUploadServlet.do',
        contentType: false,
        //这个一定要写
        processData: false,
        //这个也一定要写，不然会报错 gome_ic
        data: formData,
        dataType: 'json',
        //返回类型，有json，text，HTML。这里并没有jsonp格式，所以别妄想能用jsonp做跨域了。
        success: function success(data) {
            void 0;
            // var imageUrl = IMConstants.IM_LOADFILEURL + "/v1/img/" + data.data.imgSmallName;
            // console.log("==imageUrl:" + imageUrl);
            //return imageUrl;
            objUpload.option.fileUpload(data);
        },
        error: function error(XMLHttpRequest, textStatus, errorThrown, data) {
            objUpload.option.error(data);
        }
    });
};
   function sendListOffileMsgs(obj) {
       var msgSeqId = obj.option.msgSeqId;
       if(msgSeqId==0){
           sendCustomInfo(obj);
       }else{
           $.ajax({
               type: "POST",
               url: IMConf.IM_API_URL + "customerMsg/jsPullCustomerMsg.json?appId="+IMConf.APPID+"&scn="+obj.option.token+"&imUserId="+obj.option.imUserId+
               "&groupId="+obj.option.groupId+"&time="+obj.option.time+"&channelId="+obj.option.channelId+"&seqId="+obj.option.msgSeqId+"&pageSize="+obj.option.pageSize+"&osType="+IMConf.OSTYPE+"&version="+IMConf.VERSION,
               //data: {
               //    "appId": IMConf.APPID,
               //    "groupId": obj.option.groupId,
               //    "imUserId": obj.option.imUserId,
               //    "token": obj.option.token,
               //    "deviceType": IMConf.DEVICE_TYPE,
               //    "pageSize": obj.option.pageSize,
               //    "msgSeqId": obj.option.msgSeqId
               //},
               dataType: 'json',
               success: function(data) {
                   obj.option.listOfficeMsg(data);
                   console.log(data)
               },
               error: function(XMLHttpRequest, textStatus, errorThrown, data) {
                   obj.option.error(data);
               }
           });
       }
   }
   function sendCustomInfo(obj) {
       $.ajax({
           type: "POST",
           url: IMConf.IM_API_URL + "customerMsg/jsGetCustomInfo.json?appId="+IMConf.APPID+"&scn="+obj.option.token+"&imUserId="+obj.option.imUserId+
           "&groupId="+obj.option.groupId+"&channelId=gome&osType="+IMConf.OSTYPE+"&version="+IMConf.VERSION,
           //data: {
           //    "appId": IMConf.APPID,
           //    "groupId": obj.option.groupId,
           //    "imUserId": obj.option.imUserId,
           //    "token": obj.option.token,
           //    "deviceType": IMConf.DEVICE_TYPE,
           //    "pageSize": obj.option.pageSize,
           //    "msgSeqId": obj.option.msgSeqId
           //},
           dataType: 'json',
           success: function(data) {
               obj.option.customInfo(data);
           },
           error: function(XMLHttpRequest, textStatus, errorThrown, data) {
               obj.option.error(data);
           }
       });
   }
     function sendListGroupMsgs(obj) {
         $.ajax({
             type: "POST",
             url:IMConf.IM_API_URL + "customerMsg/jsListCustomerGroupPage.json?appId="+IMConf.APPID+"&scn="+obj.option.token+"&imUserId="+obj.option.uid+"&lastGroupId="+obj.option.lastGroupId+ "&osType="+IMConf.OSTYPE+"&version="+IMConf.VERSION,
             //data: {
             //    "appId":IMConf.APPID,
             //    "imUserId":obj.option.uid,
             //    "scn":obj.option.token,
             //    "osType":IMConf.OSTYPE,
             //    "version":IMConf.VERSION,
             //    "lastGroupId":0
             //},
             dataType: 'json',
             success: function(data) {
                 obj.option.listGroupMsg(data);
             },
             error: function(XMLHttpRequest, textStatus, errorThrown, data) {
                 obj.option.error(data);
             }
         });
     }
     /**
      * 获取网络视频截图：视频文件
      */
     function getServerVideoAndPicPath(message) {
         var videopic = "";
         var videoName = "";
         if (message.attach !== undefined && message.attach[0].attachUrl !== undefined) {
             videopic = message.attach["0"].attachUrl;
             if (videopic.toLowerCase().indexOf("_vedio.mp4") !== -1) {
                 videoName = videopic.replace("_vedio.mp4", "_img.jpg");
                 message.attach["0"].attachUrl = videoName;
             }
         }
         return message;
     }

     function Dictionary() {
         this.data = new Array();
         this.put = function(key, value) {
             this.data[key] = value;
         };

         this.get = function(key) {
             return this.data[key];
         };

         this.remove = function(key) {
             this.data[key] = null;
         };

         this.isEmpty = function() {
             return this.data.length == 0;
         };

         this.size = function() {
             return this.data.length;
         };
     }
     Date.prototype.Format = function (fmt) { //author: meizz
         var o = {
             "M+": this.getMonth() + 1, //月份
             "d+": this.getDate(), //日
             "h+": this.getHours(), //小时
             "m+": this.getMinutes(), //分
             "s+": this.getSeconds(), //秒
             "q+": Math.floor((this.getMonth() + 3) / 3), //季度
             "S": this.getMilliseconds() //毫秒
         };
         if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
         for (var k in o)
             if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
         return fmt;
     }
     function dateDiff(date1, date2){
         var type1 = typeof date1, type2 = typeof date2;
         if(type1 == 'string')
             date1 = stringToTime(date1);
         else if(date1.getTime)
             date1 = date1.getTime();
         if(type2 == 'string')
             date2 = stringToTime(date2);
         else if(date2.getTime)
             date2 = date2.getTime();
         return (date1 - date2) / 1000;//结果是秒
     }
     function get_time_format(timestamp){
         if(timestamp){
             var date = new Date(timestamp);
         }else{
             var date = new Date();
         }
         Y = date.getFullYear(),
             m = date.getMonth()+1,
             d = date.getDate(),
             H = date.getHours(),
             i = date.getMinutes(),
             s = date.getSeconds();
         if(m<10){
             m = '0'+m;
         }
         if(d<10){
             d = '0'+d;
         }
         if(H<10){
             H = '0'+H;
         }
         if(i<10){
             i = '0'+i;
         }
         if(s<10){
             s = '0'+s;
         }
         var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
         return t;
     }
function unique(arr) {
    var result = [], isRepeated;
    for (var i = 0, len = arr.length; i < len; i++) {
        isRepeated = false;
        for (var j = 0, len = result.length; j < len; j++) {
            if (arr[i] == result[j]) {
                isRepeated = true;
                break;
            }
        }
        if (!isRepeated) {
            result.push(arr[i]);
        }
    }
    return result;
}