function IMConstants() {
    this.setHeartBeatTime = function(heartBeat) {
        IMConstants.IM_HEART_BEAT_TIME = heartBeat; //心跳间隔
        return this;
    };
    this.setUid = function(uid) {
        IMConstants.IM_UID = uid;
        return this;
    };
    this.setAppId = function(appId) {
        IMConstants.IM_APP_ID = appId;
        return this;
    };
    this.setClientId = function(clientId) {
        IMConstants.IM_CLIENT_ID = clientId;
        return this;
    };
    this.setDeviceId = function(deviceId) {
        IMConstants.IM_DEVICE_ID = deviceId;
        return this;
    };
    this.setCustomerId = function(customerId) {
        IMConstants.IM_CUSTOMER_ID = customerId;
        return this;
    };
    this.setWebsocketChannel = function(websocketChannel) {
        IMConstants.IM_WEBSOCKET_CHANNEL = websocketChannel;
    };
    this.setLastCommunicateTime = function(lastTime) {
        IMConstants.IM_LAST_COMMUBICATE_TIME = lastTime;
    };
    this.setImServer = function(imGatewayServer) {
        IMConstants.IM_SERVER = imGatewayServer;
        return this;
    };
    this.setToken = function(token){
        IMConstants.IM_TOKEN = token;
        return this;
    };
}
function IMCallBack() {
    this.setConnectLost = function(connectLostFunc) {
        IMCallBack.connectLost = connectLostFunc; //连接断开
        return this;
    };
    this.setDisconnection = function(disconnectionFunc) {
        IMCallBack.disconnection = disconnectionFunc; //网络中断
        return this;
    };
    this.setConnectRebuild = function(connectRebuildFunc) {
        IMCallBack.connectRebuild = connectRebuildFunc; //连接恢复
        return this;
    };
    this.setAckImMsg = function(ackImMsgFunc) {
        IMCallBack.ackImMsg = ackImMsgFunc; //收到回调消息
        return this;
    };
    this.setAckUserLogin = function(ackUserLoginFunc) {
        IMCallBack.ackUserLoginFunc = ackUserLoginFunc; //收到回调消息
        return this;
    };
    this.setAckUserLogout = function(ackUserLogoutFunc) {
        IMCallBack.ackUserLogout = ackUserLogoutFunc; //收到回调消息
        return this;
    };
    this.setUserLogin = function(userLoginFunc) {
        IMCallBack.userLogin = userLoginFunc; //用户登录成功
        return this;
    };
    this.setUserLogout = function(userLogoutFunc) {
        IMCallBack.userLogout = userLogoutFunc; //用户下线成功
        return this;
    };
    this.setUserKicked = function(userKickedFunc) {
        IMCallBack.userKicked = userKickedFunc; //用户强制下线
        return this;
    };
    this.setImMsg = function(receiveImMsgFunc) {
        IMCallBack.imMsg = receiveImMsgFunc; //收到Im消息
        return this;
    };
    this.setUserData = function(userDataFunc) {
        IMCallBack.userData = userDataFunc;
        return this;
    };
}
// _________分割线
function Global() {}
Global.websocketChannel;
Global.lastTime;
Global.loginStatus = false;
Global.retryConnectTime = 0;
Global.messageMap = new Dictionary();
Global.timeoutProcess;
Global.cutNetTimer;
Global.offNetMark = 0;
var IMEventConstants = new Object();
IMEventConstants.WESOCKET_CONNECT_SUCCESS = "websocketConnectSuccess";
//IMEventConstants.REQUERY_WESOCKET_CONNECT = "requeryWebsocketConnect";
//IMEventConstants.GET_TOKEN_SUCCESS = "getTokenSuccess";
//IMEventConstants.REQUERY_GET_TOKEN = "requeryGetToken";
//IMEventConstants.GET_SERVER_SUCCESS = "getServerSuccess";
//IMEventConstants.REQUERY_GET_SERVER = "requeryGetServer";
//IMEventConstants.REQUERY_SEND_LOGIN = "requerySendLogin";
//IMEventConstants.SEND_LOGIN_SUCCESS = "sendLoginSuccess";
//IMEventConstants.UPLOAD_ATTACH_SUCESS = "uploadAttachSuccess";

   //2017-10-13 上线环境
     var DepencyFunc = new Object();
     DepencyFunc.getServer = function(appId, imUserId, token, callBack, args, error) {
     var obj = {option:{token:""}};
     if (typeof arguments[0] != "string") {
     appId = arguments[0][0];
     imUserId = arguments[0][1];
     callBack = arguments[0][2];
     args = arguments[0][3];
     }
         if(token && token!="null" && token!="" && token!=null ){
             $.ajax({
                 type: "GET",
                 // 提交的网址
                 //url : "http://10.125.3.61:8080/im-platform/address/getIMAddress.json?appId="
                 url: IMConf.IM_API_URL + "address/getAddress.json?appId=" + appId + "&imUserId=" + imUserId + "&token=" + IMConstants.IM_TOKEN + "&deviceType=" + IMConf.DEVICE_TYPE,
                 // 返回数据的格式
                 datatype: "application/jsonp",
                 async: false,
                 contentType: false, //这个一定要写
                 processData: false, //这个也一定要写，不然会报错
                 // 成功返回之后调用的函数
                 success: function(data) {
                    if (window.location.host == 'wap.dev.gomegj.com') {
                        IMConstants.IM_Server = ["ws://10.115.1.107:9998/websocket"];
                    }else{
                        IMConstants.IM_Server = data.data.webSocketUrl; //["ws://10.125.2.158:7398/websocket"]
                    }
                     IMConstants.IM_FILESERVERLIST = data.data.webFileUrl;
                     IMConstants.IM_LOADFILEURL = data.data.webCdnUrl;
                     //if (typeof callBack == "function") {
                     //    callBack(args);
                     //}
                 },
                 crossDomain: true,
                 // 调用出错执行的函数
                 error: function(XMLHttpRequest, textStatus, errorThrown, data) {
                     error(data);
                 }
             });
         }else{
             return obj;
         }
     }
function InitConf(imConstants, callback) {
    if (!(imConstants instanceof IMConstants)) {
        throw "need IMConstants instance";
    }
    if (!(callback instanceof IMCallBack)) {
        throw "need IMCallBack instance";
    }
    if (!IMConstants.IM_UID) {
        IMConstants.IM_UID = "";
    }
    if (!IMConstants.IM_APP_ID) {
        IMConstants.IM_APP_ID = IMConf.APPID;
    }
    if (IMConstants.IM_TOKEN) {
        DepencyFunc.getServer(IMConstants.IM_APP_ID,IMConstants.IM_UID,IMConstants.IM_TOKEN,[null, null]);
    }
    if (!IMConstants.IM_CUSTOMER_ID) {
         IMConstants.IM_CUSTOMER_ID = 9999999999;
     }
    if (!IMConstants.IM_CLIENT_ID) {
        IMConstants.IM_CLIENT_ID = 30;
    }
    if (!IMConstants.IM_DEVICE_ID) {
        IMConstants.IM_DEVICE_ID = new Date().getTime() + "!" + Math.random(10000);
    }
    if (!IMConstants.IM_HEART_BEAT_TIME) {
        IMConstants.IM_HEART_BEAT_TIME = 20000;
    }
     IMEvent.on(IMEventConstants.WESOCKET_CONNECT_SUCCESS,sendLogin);
     sendLogin();
    //if (Global.heatbeatTimer) {
    //    clearInterval(Global.heatbeatTimer);
    //}
    //Global.heatbeatTimer = setInterval("sendHeartBeat()",
    //    IMConstants.IM_HEART_BEAT_TIME);
 }
function channelCache() {
}
channelCache._loginChannel;
channelCache.getChannel = function() {
    return channelCache._loginChannel;
}
channelCache.setChannel = function(channel) {
    channelCache._loginChannel = channel;
}
channelCache.removeChannel = function() {
    channelCache._loginChannel = null;
}

function CommandConstants() {}
// 心跳;1
CommandConstants.CMD_HEARTBEAT = 0x0001;
// 用户登录;2
CommandConstants.CMD_USER_LOGIN = 0x0002;
// 用户登出;3
CommandConstants.CMD_USER_LOGOUT = 0x0003;
// 用户登出;4
CommandConstants.CMD_USER_KICK = 0x0004;
// 强制关闭用户连接;5
CommandConstants.CMD_CLOSE_CHANNEL = 0x0005;

//客户端拉取获取聊天群组;256
CommandConstants.CMD_LIST_GROUP = 0x0100;
// 客户端拉取获取系统信息(全站广播)群组;257
CommandConstants.CMD_LIST_SYS_GROUP = 0x0101;

// 客户端发送IM消息，包括group消息和单聊消息;513
CommandConstants.CMD_IM_SEND_MSG = 0x0201;
// 客户端拉取离线消息或增量消息同步;514
CommandConstants.CMD_IM_OFFLINE_MSG = 0x0202;
// 上报/提交readSeqId;515
CommandConstants.CMD_SUBMIT_READ_SEQ = 0x0203;
// 下发/转发readSeqId；转发给在线另一类型终端;516
CommandConstants.CMD_ISSUE_READ_SEQ = 0x0204;

// push消息;768
CommandConstants.CMD_PUSH_MSG = 0x0300;
// 清除push计数;769
CommandConstants.CMD_CLEAN_PUSH_COUNT = 0x0301;

// 上报/提交initSeqId;521
CommandConstants.CMD_SUBMIT_INIT_SEQ = 0x0209;
// 下发/转发initSeqId；转发给在线另一类型终端;522
CommandConstants.CMD_ISSUE_INIT_SEQ = 0x0210;
// 根据群组id获取群组消息；返回数据在UserData ImGroup列表中;523
CommandConstants.CMD_GROUP_BY_ID = 0x0211;
// 客户端收取消息
// CommandConstants.CMD_USER_DATA = 0;
//全站广播;518
CommandConstants.CMD_BROADCAST_IM_MSG = 0x0206;
// 已读消息上报
CommandConstants.CMD_READ_REPORT_MSG = 0x0207;
//添加好友
CommandConstants.CMD_ADD_FRIENT_MSG = 0x0605;
//已读消息通知
CommandConstants.CMD_READ_REPORT_SYNC_MSG = 0x0208;
//发起咨询
CommandConstants.CMD_INIT_CONSULT_ATION = 0x0500;
//技能组选择提交
CommandConstants.CMD_SEL_SKILL_CONSULT_ATION = 0x0501;
//客服聊天消息
CommandConstants.CMD_CUSTOMER_MSG = 0x0502;
//转接请求消息
CommandConstants.CMD_TRANSFER_REQ = 0x0503;
//转接通知消息
CommandConstants.CMD_TRANSFER_NOTICE = 0x0504;
//转接接受/拒绝通知
CommandConstants.CMD_TRANSFER_RESP = 0x0505;
//加入旁观
CommandConstants.CMD_JOIN_SIDE_LINES = 0x0506;
//旁观者抢答
CommandConstants.CMD_SIDE_LINES_ANSWER = 0x0507;
//旁观者抢答通知，被抢者离开
CommandConstants.CMD_NOTICE_ROBBED = 0x0508;
//改变在线状态
CommandConstants.CMD_CHANGE_ONLINE = 0x0509;
//同步群成员，服务已结束
CommandConstants.CMD_SYNC_END_CONSULTATION = 0x0510;
function msgFactory() {}
msgFactory.getProto = function(command, param) {
    switch (command) {
        case CommandConstants.CMD_HEARTBEAT:
            var heartbeat = new Heartbeat(param);
            return heartbeat;
        case CommandConstants.CMD_USER_LOGIN:
            var userLogin = new UserLogin(param);
            return userLogin;
        case CommandConstants.CMD_USER_LOGOUT:
            var userLogout = new UserLogout(param);
            return userLogout;
        case CommandConstants.CMD_USER_KICK:
            var kickUser = new KickUser(param);
            return kickUser;
        case CommandConstants.CMD_CLOSE_CHANNEL:
            var closeChannel = new CloseChannel(param);
            return closeChannel;
        case CommandConstants.CMD_INIT_CONSULT_ATION:
            // var initConsultation = new InitConsultation(param);
            // return initConsultation;
        case CommandConstants.CMD_SEL_SKILL_CONSULT_ATION:
            var selSkill = new SelSkillConsultation(param);
            return selSkill;
        case CommandConstants.CMD_CUSTOMER_MSG:
            var imMsg = new CustomerMsg(param);
            return imMsg;
        case CommandConstants.CMD_TRANSFER_REQ:
            var transferReq = new TransferReq(param);
            return transferReq;
        case CommandConstants.CMD_TRANSFER_NOTICE:
            var transferNotice = new TransferNotice(param);
            return transferNotice;
        case CommandConstants.CMD_TRANSFER_RESP:
            var transferResp = new TransferResp(param);
            return transferResp;
        case CommandConstants.CMD_JOIN_SIDE_LINES:
            var joinSideLines = new JoinSidelines(param);
            return joinSideLines;
        case CommandConstants.CMD_SIDE_LINES_ANSWER:
            var sideLinesAns = new SidelinesAnswer(param);
            return sideLinesAns;
        case CommandConstants.CMD_NOTICE_ROBBED:
            var noticeRobb = new NoticeRobbed();
            return noticeRobb;
        case CommandConstants.CMD_CHANGE_ONLINE:
            var changeOnline = new ChangeOnline(param);
            return changeOnline;
        case CommandConstants.CMD_GROUP_BY_ID:
            var getGroupByIdMsg = new GetGroupByIdMsg(param);
            return getGroupByIdMsg;
        case CommandConstants.CMD_READ_REPORT_MSG:
            var readReportMsg = new ReadReportMsg(param);
            return readReportMsg;
        case CommandConstants.CMD_LIST_SYS_GROUP:
            var listSysGroupMsg = new ListSysGroupMsg(param);
            return listSysGroupMsg;
        case CommandConstants.CMD_SYNC_END_CONSULTATION:
            var syncEndConsultation = new SyncEndConsultation(param);
            return syncEndConsultation;
    }
}
function MsgUtils() {}
MsgUtils.initHead = function(headParam) {
    var head = new Head();
    assemble.call(head, headParam);
    return head;
};
MsgUtils.initMsgBody = function(cmd, param) {
    var msg = msgFactory.getProto(cmd, param);
    assemble.call(msg, param);
    //simpleTrim.call(msg);
    return msg;
};
MsgUtils.initJsonMsg = function(headParam, cmd, param) {
    var msgJson = new MsgJson();
    if (headParam == null) {
        headParam = new Object();
    }
    headParam.command = cmd;
    msgJson.head = MsgUtils.initHead(headParam);
    msgJson.msg = MsgUtils.initMsgBody(cmd, param);
    return msgJson;
};
function getRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.floor(Rand * Range));
}

function msgHandle(msg) {
    if (typeof msg == "string") {
        msg = JSON.parse(msg);
    }
    var head = msg.head;
    var command = head.command;
    var ack = head.ack;
    if (ack != 0) {
        msgAckHandle(msg);
        return;
    }
    switch (command) {
        // case CommandConstants.CMD_INIT_CONSULT_ATION:
            // imMsgHandle(msg);
            // return;
        case CommandConstants.CMD_SEL_SKILL_CONSULT_ATION:
            imMsgHandle(msg);
            return;
        case CommandConstants.CMD_SYNC_END_CONSULTATION:
            imMsgHandle(msg);
            return;
        case CommandConstants.CMD_CUSTOMER_MSG:
            imMsgHandle(msg);
            return;
        case CommandConstants.CMD_TRANSFER_REQ:
            imMsgHandle(msg);
            return;
        case CommandConstants.CMD_TRANSFER_NOTICE:
            imMsgHandle(msg);
            return;
        case CommandConstants.CMD_TRANSFER_RESP:
            imMsgHandle(msg);
            return;
        case CommandConstants.CMD_JOIN_SIDE_LINES:
            imMsgHandle(msg);
            return;
        case CommandConstants.CMD_SIDE_LINES_ANSWER:
            imMsgHandle(msg);
            return;
        case CommandConstants.CMD_NOTICE_ROBBED:
            imMsgHandle(msg);
            return;
        case CommandConstants.CMD_CHANGE_ONLINE:
            imMsgHandle(msg);
            return;
        case CommandConstants.CMD_IM_OFFLINE_MSG:
            if (typeof IMCallBack.userData == "function") {
                IMCallBack.userData(msg);
            }
            return;
        case CommandConstants.CMD_USER_KICK:
        case CommandConstants.CMD_CLOSE_CHANNEL:
            if (Global.heatbeatTimer) {
                clearInterval(Global.heatbeatTimer);
            }
            if(Global.cutNetTimer){
                clearInterval(Global.cutNetTimer);
            }
            if (typeof IMCallBack.userKicked == "function") {
                IMCallBack.userKicked(msg);
            }
            return;
        default:
            return;
    }
}
function msgAckHandle(msg,state) {
    if(state == 1){
        if (typeof IMCallBack.ackImMsg == "function") {
            IMCallBack.ackImMsg(msg);
        }
    }else{
        var command = msg.head.command;
        switch (command) {
            // case CommandConstants.CMD_INIT_CONSULT_ATION:
                // if (typeof IMCallBack.ackImMsg == "function") {
                //     IMCallBack.ackImMsg(msg);
                // }
                // return;
            case CommandConstants.CMD_SEL_SKILL_CONSULT_ATION:
                if (typeof IMCallBack.ackImMsg == "function") {
                    IMCallBack.ackImMsg(msg);
                }
                return;
            case CommandConstants.CMD_CUSTOMER_MSG:
                if (typeof IMCallBack.ackImMsg == "function") {
                    var interValMarks = Global.messageMap.get(msg.msg.msgId);
                    if(interValMarks){
                        clearInterval(Global.messageMap.get(msg.msg.msgId));
                    }
                    console.info("ack"+"         "+ CommandConstants.CMD_CUSTOMER_MSG +"            "+ Global.messageMap.get(msg.msg.msgId));
                    msg.state = 2;
                    msg.msgId = msg.msg.msgId;
                    var msg = getServerVideoAndPicPath(msg);
                    IMCallBack.ackImMsg(msg);
                    Global.messageMap.remove(msg.msg.msgId);
                }
                return;
            case CommandConstants.CMD_TRANSFER_REQ:
                if (typeof IMCallBack.ackImMsg == "function") {
                    IMCallBack.ackImMsg(msg);
                }
                return;
            case CommandConstants.CMD_TRANSFER_NOTICE:
                if (typeof IMCallBack.ackImMsg == "function") {
                    IMCallBack.ackImMsg(msg);
                }
                return;
            case CommandConstants.CMD_TRANSFER_RESP:
                if (typeof IMCallBack.ackImMsg == "function") {
                    IMCallBack.ackImMsg(msg);
                }
                return;
            case CommandConstants.CMD_JOIN_SIDE_LINES:
                if (typeof IMCallBack.ackImMsg == "function") {
                    IMCallBack.ackImMsg(msg);
                }
                return;
            case CommandConstants.CMD_SYNC_END_CONSULTATION:
                if (typeof IMCallBack.ackImMsg == "function") {
                    IMCallBack.ackImMsg(msg);
                }
                return;
            case CommandConstants.CMD_SIDE_LINES_ANSWER:
                if (typeof IMCallBack.ackImMsg == "function") {
                    IMCallBack.ackImMsg(msg);
                }
                return;
            case CommandConstants.CMD_NOTICE_ROBBED:
                if (typeof IMCallBack.ackImMsg == "function") {
                    IMCallBack.ackImMsg(msg);
                }
                return;
            case CommandConstants.CMD_CHANGE_ONLINE:
                if (typeof IMCallBack.ackImMsg == "function") {
                    IMCallBack.ackImMsg(msg);
                }
                return;
            case CommandConstants.CMD_IM_OFFLINE_MSG:
                if (typeof IMCallBack.userData == "function") {
                    IMCallBack.userData(msg);
                }
                return;
            case CommandConstants.CMD_USER_LOGIN:
            if (msg.head.result == 0) {
                    Global.loginStatus = true;
                    if (typeof IMCallBack.userLogin == "function") {
                        IMCallBack.userLogin();
                    }
                    if(Global.cutNetTimer){
                        clearInterval(Global.cutNetTimer);
                    }
                    if (Global.heatbeatTimer) {
                        clearInterval(Global.heatbeatTimer);
                    }
                    Global.heatbeatTimer = setInterval("sendHeartBeat()",IMConstants.IM_HEART_BEAT_TIME);
                    console.info("CommandConstants.CMD_USER_LOGIN" +"                   "+"Global.heatbeatTimer "+msg.head.result+"        "+Global.heatbeatTimer);
                } else {
                    if(msg.head.result == -2 || msg.head.result == -3 || msg.head.result == -4){
                        console.info("CommandConstants.CMD_USER_LOGIN.erro" +"                   "+msg.head.result);
                        IMConstants.IM_TOKEN = null;
                        Global.loginStatus = false;
                        //sendLogin();
                        if (typeof IMCallBack.ackImMsg == "function") {
                            IMCallBack.ackImMsg(msg);
                        }
                    }
               }
                return;
            case CommandConstants.CMD_USER_LOGOUT:
                if (Global.heatbeatTimer) {
                    clearInterval(Global.heatbeatTimer);
                }
                if(Global.cutNetTimer){
                    clearInterval(Global.cutNetTimer);
                }
                if (typeof IMCallBack.userLogout == "function") {
                    IMCallBack.userLogout(msg);
                    console.info("userLogout"+"                       "+new Date().getTime()+"                            "  +msg);
                    Global.loginStatus = false;
                }
                return;
             default:
                return;
        }
    }
}
function imMsgHandle(msg) {
    if (typeof IMCallBack.imMsg == "function") {
        var msg = getServerVideoAndPicPath(msg);
        IMCallBack.imMsg(msg);
    }
}
function sendHeartBeat() {
    if (Global.loginStatus && Global.loginStatus == true) {
        console.info("sendHeartBeat()"+"loginStatus"+"                    "+Global.loginStatus);
        var msg = MsgUtils.initJsonMsg(null, CommandConstants.CMD_HEARTBEAT,null);
        sendMsg(msg);
        console.info("sendHeartBeat()"+"Global.loginStatus"+"                           "+Global.loginStatus);
       }
       //else{
        //    sendLogin();
        //}
 }
function webSocketRebuild() {
    if (Global.websocketChannel) {
        Global.websocketChannel.close();
        channelCache.removeChannel();
        Global.websocketChannel = null;
    }
    WebsocketChannel();
}
function sendLogin() {
    var callback;
    var args;
    if (arguments && arguments.length > 0) {
        if (arguments[0] && arguments[0].length > 1) {
            if (typeof arguments[0][0] == "function") {
                callback = arguments[0][0];
            }
            args = arguments[0][1];
        } else {
            if (arguments[0]) {
                callback = arguments[0];
            }
            if (arguments[1]) {
                args = arguments[1];
            }
        }
    }
        if (IMConstants.IM_Server) {   //IMConstants.IM_TOKEN
        var now = new Date().getTime();
        console.info("sendLogin()"  +"                      "+"now"+"           "+now);
        // console.info("sendLogin()"  +"                      "+"Global.lastLoginTime" +"           "+Global.lastLoginTime);
        //if (Global.lastTime && now - Global.lastTime < 35) {    //0.3 * IMConstants.IM_HEART_BEAT_TIME
        //} else {   //}
        //  if(Global.lastLoginTime && now - Global.lastLoginTime >200 ){
        //
        //  }else{}
        var msg = MsgUtils.initJsonMsg(null,CommandConstants.CMD_USER_LOGIN, null);
        sendMsg(msg);
        //if(Global.websocketChannel != null) {
        //    console.info("Global.websocketChannel != null"+"            "+Global.websocketChannel);
        //    Global.websocketChannel.close();
        //    console.info("Global.websocketChannel.close()"+"             " +new Date().Format("yyyy-MM-dd hh:mm:ss"));
        //    setTimeout(function() {
        //        sendMsg(msg);
        //    }, 50000);
        //}else{
        //sendMsg(msg);
        //}
        if (typeof callback == "function") {
            if (callback.name == "send") {
                sendMsg(args);
            } else {
                callback(args);
            }
        }
    } else {
        DepencyFunc.getServer(IMConstants.IM_APP_ID,IMConstants.IM_UID,IMConstants.IM_TOKEN,
            sendLogin, [callback, args]);
    }
}
function sendImMsg(obj) {
    var msg = "";
    var msgId = "";
    if(!obj.option.msgId){
        msgId = "" + new Date().getTime() + "!" + Math.random(10000);
    }else{
        msgId = obj.option.msgId;
    }
     msg = new CustomerMsg().setGroupId(obj.option.groupId).setChannelId(obj.option.channelId).setPlatformId(obj.option.platformId)
         .setShopId(obj.option.shopId).setMsgId(msgId).setMsgType(obj.option.msgType).setMsgBody(obj.option.msgBody).setSenderId(obj.option.senderId).setSenderName(obj.option.senderName).setGroupType(obj.option.groupType)
         .setSendTime(obj.option.sendTime).setMsgSeqId(obj.option.msgSeqId).setMsgUrl(obj.option.msgUrl).setAttach(obj.option.attach).setOrigiImg(obj.option.origiImg).setLocation(obj.option.location).setWhetherHide(obj.option.whetherHide).setReceiveUids(obj.option.receiveUids)
         .setMsgStatus(obj.option.msgStatus).setGroupChatType(obj.option.groupChatType)
         .setSourceType(obj.option.sourceType).setExtra(obj.option.extra);
         var msgStr = MsgUtils.initJsonMsg(null, CommandConstants.CMD_CUSTOMER_MSG, msg);
         var interValMark = Global.messageMap.get(msgId);
         if(interValMark){
            Global.messageMap.remove(msgId);
         }
         Global.timeoutProcess  = setInterval(timingCallback(msgId, JSON.stringify(msgStr)) ,10000);
         Global.messageMap.put(msgId,Global.timeoutProcess);
         sendMsg(msgStr);
         return msgId;
   }
function timingCallback(mesgId,msgStr){
    var msg = JSON.parse(msgStr);
    return function(){
        console.info("begin"+"             "+mesgId+"          "+Global.messageMap.size());
        var state = 1;
        msg.state = 1;
        msg.mesgId = mesgId;
        msgAckHandle(msg,state);
        console.info("msgAckHandle"+"                "+msg+ "               "+mesgId);
        clearInterval(Global.messageMap.get(mesgId));
        console.info("end"+"             "+ Global.messageMap.size())
    }
}
function initConsultation(obj){
        var msg = "";
        msg = new InitConsultation().setUid(obj.option.uid).setGroupId(obj.option.groupId).setChannelId(obj.option.channelId).setPlatformId(obj.option.platformId).setShopId(obj.option.shopId).setEntryType(obj.option.entryType).setExtra(obj.option.extra);
        var msgStr = MsgUtils.initJsonMsg(null,CommandConstants.CMD_INIT_CONSULT_ATION, msg);
        sendMsg(msgStr);
}

function selSkillConsultation(obj){
    var msg = "";
    msg = new SelSkillConsultation().setUid(obj.option.uid).setGroupId(obj.option.groupId).setChannelId(obj.option.channelId).setPlatformId(obj.option.platformId).setShopId(obj.option.shopId).setSkillGroup(obj.option.skillGroup).setExtra(obj.option.extra);
    var msgStr = MsgUtils.initJsonMsg(null, CommandConstants.CMD_SEL_SKILL_CONSULT_ATION, msg);
    sendMsg(msgStr);
}
function transferReq(obj){
    var msg = "";
    msg = new TransferReq().setReqUid(obj.option.reqUid).setReqName(obj.option.reqName).setReceUid(obj.option.receUid).setGroupId(obj.option.groupId).setPlatformId(obj.option.platformId).setExtra(obj.option.extra);
    var msgStr = MsgUtils.initJsonMsg(null, CommandConstants.CMD_TRANSFER_REQ, msg);
    sendMsg(msgStr);
}
function transferNotice(obj){
    var msg = "";
    msg = new TransferNotice().setReqUid(obj.option.reqUid).setReqName(obj.option.reqName).setReceUid(obj.option.receUid).setGroupId(obj.option.groupId).setPlatformId(obj.option.platformId).setSendTime(obj.option.sendTime).setExtra(obj.option.extra);
    var msgStr = MsgUtils.initJsonMsg(null, CommandConstants.CMD_TRANSFER_NOTICE, msg);
    sendMsg(msgStr);
}
function transferResp(obj){
    var msg = "";
    msg = new TransferResp().setRespUid(obj.option.respUid).setRespName(obj.option.respName).setReqUid(obj.option.reqUid).setGroupId(obj.option.groupId).setPlatformId(obj.option.platformId).setSendTime(obj.option.sendTime).setExtra(obj.option.extra);
    var msgStr = MsgUtils.initJsonMsg(null, CommandConstants.CMD_TRANSFER_RESP, msg);
    sendMsg(msgStr);
}

function joinSidelines(obj){
    var msg = "";
    msg = new JoinSidelines().setRespUid(obj.option.respUid).setRespName(obj.option.respName).setReqUid(obj.option.reqUid).setGroupId(obj.option.groupId).setPlatformId(obj.option.platformId).setSendTime(obj.option.sendTime).setExtra(obj.option.extra);
    var msgStr = MsgUtils.initJsonMsg(null, CommandConstants.CMD_JOIN_SIDE_LINES, msg);
    sendMsg(msgStr);
}
function sidelinesAnswer(obj){
       var msg = "";
       msg = new SidelinesAnswer().setBystander(obj.option.bystander).setGroupId(obj.option.groupId).setPlatformId(obj.option.platformId).setExtra(obj.option.extra);
       var msgStr = MsgUtils.initJsonMsg(null,CommandConstants.CMD_SIDE_LINES_ANSWER,msg);
      sendMsg(msgStr);
 }
function noticeRobbed(obj){
    var msg = "";
    msg = new NoticeRobbed().setBystander(obj.option.bystander).setRobbedUid(obj.option.robbedUid).setGroupId(obj.option.groupId).setPlatformId(obj.option.platformId).setExtra(obj.option.extra);
    var msgStr = MsgUtils.initJsonMsg(null,CommandConstants.CMD_NOTICE_ROBBED,msg);
    sendMsg(msgStr);
}
function changeOnline(obj){
    var msg = "";
    msg = new ChangeOnline().setUid(obj.option.uid).setStatus(obj.option.status);
    var msgStr = MsgUtils.initJsonMsg(null,CommandConstants.CMD_CHANGE_ONLINE,msg);
    sendMsg(msgStr);
 }
function syncEndConsultation(obj){
    var msg = "";
    msg = new SyncEndConsultation().setGroupId(obj.option.groupId).setServiceType(obj.option.serviceType).setExtra(obj.option.extra);
    var msgStr = MsgUtils.initJsonMsg(null,CommandConstants.CMD_SYNC_END_CONSULTATION,msg);
    sendMsg(msgStr);
}
function sendUserLogout() {
    var msg = MsgUtils.initJsonMsg(null, CommandConstants.CMD_USER_LOGOUT, {});
    sendMsg(msg);
}
function sendMsg(msg) {
    if (typeof msg == "string") {
        msg = JSON.parse(msg);
    }
    if (Global.websocketChannel == undefined || Global.websocketChannel == null && Global.loginStatus == false ) {
        var cb = function() {
            if (msg.head.command != CommandConstants.CMD_USER_LOGIN && msg.head.command == CommandConstants.CMD_USER_LOGOUT) {
                sendLogin(Global.websocketChannel.send, JSON.stringify(msg));
            } else {
                Global.websocketChannel.send(JSON.stringify(msg));
            }
        };
        WebsocketChannel(cb);
    }else{
        try {
            Global.websocketChannel.send(JSON.stringify(msg));
            console.info("sendMsg"+"                              "+ new Date().Format("yyyy-MM-dd hh:mm:ss") +"                          "+JSON.stringify(msg));
        } catch (e) {
            webSocketRebuild();
        }
    }
}
function WebsocketChannel(cb) {
    if (IMConstants.IM_Server && IMConstants.IM_Server.length > 0) {
        var socketChannel;
        if (Global.retryConnectTime && Global.retryConnectTime > 4) {
            var now = new Date().getTime();
            if (now - Global.lastTryOpenConnectTime < 10 * IMConstants.IM_HEART_BEAT_TIME) {
                // return;
            } else {
                Global.retryConnectTime = 1;
            }
        } else {
            Global.lastTryOpenConnectTime = new Date().getTime();
        }
        // Global.retryConnectTime = Global.retryConnectTime + 1;
        if ((arguments.length == 0) || typeof cb != "string") {
            var url = IMConstants.IM_Server[getRandomNum(0,
                IMConstants.IM_Server.length)];
            socketChannel = new WebSocket(url);
            console.info("createSocketChannel" +"                                   "+new Date().Format("yyyy-MM-dd HH:mm:ss")+url);
        }else if (typeof cb == "string") {
            socketChannel = new WebSocket(arguments[0]);
        }
        socketChannel.onopen = function() {
            Global.websocketChannel = socketChannel;
            console.info("onopen"+"                   "+new Date().Format("yyyy-MM-dd hh:mm:ss") +"                                "+ cb.toString());
            Global.retryConnectTime = 0;
            //if (typeof IMCallBack.connectRebuild == "function") {
            //    IMCallBack.connectRebuild();
            //}
            channelCache.setChannel(this);
            if (typeof cb == "function") {
                cb();
            } else {
                IMEvent.trigger(IMEventConstants.WESOCKET_CONNECT_SUCCESS);
            }
        };
        socketChannel.onmessage = function(msg) {
            msgHandle(msg.data);
            Global.lastTime = new Date().getTime();
            console.info("onmessage"+"        "+ get_time_format(Global.lastTime) +"            "+msg.data);
        };
        socketChannel.onclose = function(msg) {
            console.info("onclose"+"              "+ new Date().Format("yyyy-MM-dd hh:mm:ss")+"                  "+JSON.stringify(msg));
            channelCache.removeChannel();
            Global.websocketChannel = null;
            Global.loginStatus = false;
            if (msg.type == "close") {
                IMCallBack.disconnection(msg);
            }
        };
        socketChannel.onerror = function(msg) {
            channelCache.removeChannel();
            Global.websocketChannel = null;
            Global.loginStatus = false;
            if (typeof IMCallBack.connectLost == "function") {
                IMCallBack.connectLost();
            }
            console.info("onerror"+"                     "+new Date().Format("yyyy-MM-dd hh:mm:ss")+"                "+JSON.stringify(msg));
        };
        WebsocketChannel.prototype = socketChannel;
        return socketChannel;
    } else {
        DepencyFunc.getServer(IMConstants.IM_APP_ID, IMConstants.IM_UID, IMConstants.IM_TOKEN,
            WebsocketChannel, cb);
    }
}
function copyAndOverWrite(copier, temple) {
    for (var arg in temple) {
        var param = temple[arg];
        var paramType = typeof param;
        if (param == null || param == undefined) {
            continue;
        }
        if (typeof param === "function") {
            continue;
        }
        if (paramType == "number" || paramType == "string" || paramType == "boolean") {
            copier[arg] = param;
            continue;
        }
        if (param instanceof Array) {
            copier[arg] = [];
        } else {
            copier[arg] = new Object();
        }
        copyAndOverWrite(copier[arg], param);
    }
}
function assemble() {
    var args = arguments.callee.arguments;
    if (args.length != 0 && args != undefined && args != null && args != "") {
        if (args.length == 1) {
            for (var key in args) {
                copyAndOverWrite(this, args[key]);
            }
        }
        if (args.length % 2 == 0) {
            for (var i = 0; i < args.length;) {
                this[arg[i++]] = args[i++];
            }
        }
    }
    if (this.uid !== undefined && (this.uid == null || !isNaN(this.uid) || this.uid == 0)) {
        this.uid = IMConstants.IM_UID;
    }
    if (this.appId !== undefined && (this.appId == "" || this.appId == null)) {
        this.appId = IMConstants.IM_APP_ID;
    }
    if (this.token !== undefined && (this.token == "" || this.token == null)) {
        this.token = IMConstants.IM_TOKEN;
    }
    if (this.deviceId !== undefined && (this.deviceId == "" || this.deviceId == null)) {
        this.deviceId = IMConstants.IM_DEVICE_ID;
    }
    if (this.clientId !== undefined && (this.clientId == "" || this.clientId == null)) {
        this.clientId = IMConstants.IM_CLIENT_ID;
    }
}
var net = onlinenetwork({
    "time":1000,
    //"url":"wss://10.125.2.158:8443/websocket"
    "url":"https://www.gomeplus.com/"
})
net.onLineHandler(function(){
    console.info("onLineHandler"+"       "+"Global.offNetMark"+"     "+Global.offNetMark);
    if(Global.offNetMark == 1){
        console.info("onLineHandler"+"       "+"Global.offNetMark"+"     "+Global.offNetMark);
        Global.cutNetTimer = setInterval("sendLogin()",5000);
    }
})
net.offLineHandler(function(){
    console.info("offLineHandler"+"         ");
    Global.websocketChannel.close();
    if (Global.loginStatus) {
        clearInterval(Global.heatbeatTimer);
    }
    Global.offNetMark = 1;
})
function simpleTrim() {
    for (var field in this) {
        var value = this[field];
        if (value == [] || value == {} || value == null || value == undefined) {
            delete this[field];
        }
    }
}
