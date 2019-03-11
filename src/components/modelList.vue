<template>
    <div>
        <div class="play_mask" v-show="toPlay == 1 && fmtplay == 0">
            <video id="ply-video" autoplay :src="listStr.vSrc"
                   controls
                   webkit-playsinline="true" playsinline
                   width="100%" height="100%" style="object-fit:contain;position: absolute;top: 0;bottom: 0;">
            </video>
            <img class="close_mask" src="//gfs11.gomein.net.cn/T1vedgBQVv1RCvBVdK.png" alt="" @click="closeplay">
        </div>

        <div class="play_mask" v-show="toPlay == 1 && fmtplay == 1">
            <video id="my-video" controls autoplay class="video-js vjs-default-skin vjs-big-play-centered"
                   webkit-playsinline="true" playsinline
                   width="100%" height="100%" style="object-fit:contain;position: absolute;top: 0;bottom: 0;">
            </video>
            <img class="close_mask" src="//gfs11.gomein.net.cn/T1vedgBQVv1RCvBVdK.png" alt="" @click="closeplay">
        </div>

        <div class="iscrollpading" :style="{'height':screen}">
            <div class="modellist iscrollpading-list">
                <li v-for="(k,v) in modellist.odlst" class="bdr-bottom" @click="godetail(k,v)">
                    <img :src="'http://'+k.goodsPic" onerror="javascript:this.src='//gfs12.gomein.net.cn/T1.RKjBChT1RCvBVdK.png'" />
                    <div class="right">
                        <span class="brandname">{{k.cname}}</span>
                        <span class="cname">{{k.name}}</span>
                        <span class="collec">{{k.favNum>999999?(k.favNum/100000).toFixed(2)+'万':k.favNum}}人收藏</span>
                    </div>
                    <!--v-show="k.videoId"-->
                    <div v-show="k.videoId" class="play-btn" @click.stop="playing(k.videoId)"><img class="play-icon" src="//gfs14.gomein.net.cn/T13bDvBgJ_1RCvBVdK.png" alt="">视频介绍</div>
                </li>
                <span class="iscrollpading-pulltext"></span>
            </div>
        </div>
        <!-- 热门品牌一期不要了，二期优化-->
        <div v-if="modeloptons.hotbrand" class="hotbrand" @click="hiddenlayer">
            <div class="wrap" @click.stop="return false">
                <div class="brand" :class="{'select':v==index,'mar-btm':v == modeloptons.hotbrandlist.length-1 || v == modeloptons.hotbrandlist-2}" v-for="(k,v) in modeloptons.hotbrandlist" @click.stop="select(k,v)">{{k.name}}</div>
            </div>
            <div class="empty" @click.stop="clearempty">清空筛选</div>
        </div>
    </div>
</template>
<script>

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
import videojs from 'video.js';
import 'videojs-contrib-hls';

export default {
    props: ["listmsg", "hboptions"],
    data() {
        return {
            iscrollPaging: null,
            curpg: 1,
            screen: '',
            len: 10,
            index: null,
            modellist: {},
            hrefParama: {}, //链接参数
            modelreq: {},
            modeloptons: {
                hotbrand: null
            },
            //默认不播放
            toPlay:0,
            //视频格式  0 正常 1 .m3u8
            fmtplay:0,
            listStr : {
                vSrc:""
            },
            playok:"",
            isFullscreen:false
        };
    },
    mounted() {
        var searchHeight = $('.search').length != 0 ? (parseInt($('.search')[0].offsetHeight) || 0) : 0;

        var headerHeight = $('.header').length != 0 ? (parseInt($('.header')[0].offsetHeight) || 0) : 0;
        this.modelreq = this.listmsg;
        this.modeloptons = this.hboptions;
        this.hrefParama = util.getHrefParma();
        this.screen = window.innerHeight - searchHeight - headerHeight  + "px";
        this.load(this.modelreq);
    },
    watch: {
        'listmsg.name': {
            handler(newval, oldval) {
                this.modellist = {};
                this.modelreq = newval;
                this.load(this.modelreq)
            },
            deep: true
        }
    },
    methods: {
        load(data) {
            var _this = this;
            util.api({
                surl: _this.hboptions.url,
                type: 'get',
                data: data,
                success: function(res) {
                    switch(res.rpco) {
                        case 200:
                        console.log(typeof _this.modellist.odlst)
                        if(typeof res.body != 'object'){//200 没数据
                            $('.iscrollpading').hide()
                            _this.$emit('no-data',true)
                        }else if(typeof _this.modellist.odlst == 'object'){//翻页有数据
                            _this.modellist.odlst.push.apply(_this.modellist.odlst, res.body.odlst);//合并数据
                            _this.$emit('no-data',false)
                        }else{
                            _this.modellist = res.body;//第一页数据
                            _this.$emit('no-data',false)
                        }
                        _this.iscrollpadingInit(data);
                        break;
                        case 404:
                        if(typeof _this.modellist.odlst == 'array'){
                            $('.iscrollpading').hide()
                            _this.$emit('no-data',true)
                        }else{//搜索重新搜索
                            _this.modellist = {}
                            _this.$emit('no-data',true)
                        }
                        break;
                        default:
                        util.tip('网络错误')
                    }
                }
            })
        },
        iscrollpadingInit(data) {
            var _this = this;
            if (!_this.iscrollPaging) {
                _this.iscrollPaging = new IscrollPaging({
                    //总页数
                    totalPage: Math.ceil(_this.modellist.total / _this.len),
                    //每页条数
                    pageDataCount: _this.len,
                    //加载数据方法
                    loadDataFun: function() {
                        //alert(1)
                        // 查询数据
                        _this.curpg++;
                        _this.modelreq.page = _this.curpg;
                        _this.load(data);
                    }
                });
                _this.$nextTick(() => {
                    _this.iscrollPaging.init();
                })
            } else {
                _this.$nextTick(() => {
                    _this.iscrollPaging.reLoadPagingOption({
                        //当前页码
                        currentPage: _this.curpg,
                        // 总页数
                        totalPage: Math.ceil(_this.modellist.total / _this.len)
                    });
                })
            }
        },
        select(item, index) {
            this.index = index;
            this.modellist = {};
            this.modelreq = {
                cateid: item.cateid,
                brandId: item.id,
                page: 1,
                level: item.level
            }
            this.load(this.modelreq);
            this.modeloptons.hotbrand = false;
        },
        godetail(item,index) {
            var parama = this.listmsg;
            parama.docid = item.docid;
            parama.isFav = item.isfav;
            parama.gdid = item.gdid;
            parama.cname = item.cname;
            parama.ename = $('.title').text();
            parama.imgsrc = $('li img').eq(index).attr('src');
            util.href("./directiondetail.html", parama);
        },
        hiddenlayer() {
            this.modeloptons.hotbrand = false;
        },
        clearempty() {
            this.index = null;
            this.modellist = {};
            this.modeloptons.hotbrand = false;
            this.load(this.listmsg)
        },
        playing(vid) {
            let vsrc,that = this,
               myplayer = videojs('my-video', {
                bigPlayButton: false,
                textTrackDisplay: false,
                posterImage: true,
                errorDisplay: false,
                controlBar: true
            });
            //debug
            /*var res = {
                "body": {
                    "clarity": {
                        "cif": "245760",
                        "sd": "491520",
                        "hd": "737280",
                        "fd": "1228800"
                    },
                    "description": "无",
                    "image": "https://gfs10.gomein.net.cn/T1yGdTB5L_1RXrhCrK.jpg",
                    "length": 132841,
                    "title": "VOSONIC群华F600行车记录仪高清功能简介视频",
                    "video_id": "8539",
                    "videos": [{
                        "address": "https://gslb.miaopai.com/stream/3KBrhdmY4R~NISBFHTHZOlDCouwuZASzmtip3A__.mp4"
                    }]
                },
                "rpco": 200,
                "tsrp": 1539760437588
            }
            switch (res.rpco) {
                case 200:
                    that.toPlay = 1;
                    vsrc = res.body.videos[0].address;
                    if (vsrc.endsWith(".m3u8")) {
                        that.fmtplay = 1;
                        myplayer.src({src: vsrc, type: 'application/x-mpegURL'});
                        myplayer.load();
                        myplayer.play();
                    } else {
                        that.fmtplay = 0;
                        Vue.set(that.listStr, 'vSrc', vsrc);
                        window.document.getElementById("ply-video").play();
                    }
                    break;
                case 404:

                    break;
                default:
                    util.tip('网络错误')
            }*/
            //debug
            util.api({
                surl: root.INSTRUCTION_API_PATH + 'video',
                type: 'get',
                data: {
                    videoId: vid
                },
                success: function (res) {
                    switch (res.rpco) {
                        case 200:
                            that.toPlay = 1;
                            vsrc =res.body.videos[0].address;
                            if (vsrc.endsWith(".m3u8")) {
                                that.fmtplay = 1;
                                myplayer.src({src: vsrc, type: 'application/x-mpegURL'});
                                myplayer.load();
                                myplayer.play();
                            } else {
                                that.fmtplay = 0;
                                Vue.set(that.listStr,'vSrc',vsrc);
                                window.document.getElementById("ply-video").play();
                            }
                            break;
                        case 404:

                            break;
                        default:
                            util.tip('网络错误')
                    }
                }
            });
        },
        closeplay() {
            this.toPlay = 0;
            switch(this.fmtplay){
                case 0:
                    document.getElementById("ply-video").pause();
                    break;
                case 1:
                    this.fmtplay = 1;
                    var myplayer =  videojs('my-video', {
                        bigPlayButton: true,
                        textTrackDisplay: false,
                        posterImage: true,
                        errorDisplay: false,
                        controlBar: true
                    });
                    myplayer.pause();
                    break;
                default:
            }
        }

    }
};
</script>
<style lang="less" type="text/less">
@import "../util/fs.less";
.iscrollpading {
    overflow: hidden;
    background: #fff;
}

.iscrollpading-pulltext {
    width: 100%;
    text-align: center;
    line-height: 1rem;
    height: 1rem;
    display: block;
}

.hotbrand {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .6);
    .wrap:after {
        clear: both;
        content: '';
        visibility: hidden;
        height: 0;
        display: block;
        line-height: 0;
    }
    .wrap {
        width: 100%;
        background: #fff;
        max-height: 4.8rem;
        overflow-y: scroll;
        margin-top: 1.1733rem;
        .brand {
            float: left;
            width: 4.21333rem;
            height: 0.74667rem;
            text-align: center;
            line-height: 0.74667rem;
            color: #666;
            font-size: 0.34667rem;
            background: #f2f2f2;
            border: 1px solid #f2f2f2;
            border-radius: 3px;
            margin: 0.4rem 0 0 0.52rem;
        }
        .mar-btm{
            margin-bottom: 0.4rem;
        }
        .select {
            border: 1px solid #ff4b41;
            color: #ff4b41;
            background: #fff url(./img/selected.png) no-repeat 3.25333rem center;
            background-size: 0.26667rem 0.21333rem;
        }
    }
    .empty {
        width: 100%;
        height: 1.2rem;
        background: #ff4b41;
        color: #fff;
        font-size: 0.42667rem;
        text-align: center;
        line-height: 1.2rem;
    }
}

.modellist {
    width: 100%;
    font-size: 0.4rem;
    color: #333;
    li {
        widows: inherit;
        height: 3.76rem;
        margin-bottom: 2px;
        position: relative;
        img {
            float: left;
            width: 3.33333rem;
            height: 3.33333rem;
            margin: 2px;
        }
        div.right {
            float: left;
            height: inherit;
            position: relative;
            .brandname {
                width: 6.0rem;
                text-overflow: ellipsis;
                overflow: hidden;
                word-break: break-all;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                margin: 0.346rem 0 0 0.2667rem;
            }
            .cname {
                margin-top: 0.1867rem;
                margin-left: 0.2667rem;
                color: #999;
                font-size: 0.32rem;
            }
            .collec {
                width: 6rem;
                height: 0.42667rem;
                line-height: 0.42667rem;
                position: absolute;
                bottom: 0.32rem;
                left: 0.2667rem;
                background: url(//gfs11.gomein.net.cn/T1Czx_BmCT1RCvBVdK.png) no-repeat left center;
                text-indent: 0.5rem;
                background-size: 0.42667rem 0.42667rem;
                font-size: 0.32rem;
                color: #999;
            }
        }
        div.play-btn {
            height: .64rem;
            font-size: 12px;
            color: #333333;
            line-height: .64rem;
            position: absolute;
            right: 0.53333rem;
            bottom: 0.26666rem;
            background: #F0F0F0;
            border-radius: 2px;
            padding-right: .16rem;
            .play-icon {
                margin:.16rem .08rem 0 .16rem;
                width: .32rem;
                height: .32rem;
            }
        }
    }
}

    /*播放视频*/
.play_mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    z-index: 999999999;
    .close_mask {
        position: absolute;
        width: 0.52rem;
        height: 0.52rem;
        top: 0.64rem;
        left: 0.64rem;
    }
}
.my-video-dimensions {
    width:100%;
    height: 100%;
}
.video-js .vjs-control-bar {
    bottom: .5em;
}
/*.video-js .vjs-time-control {
     line-height: 8em;
 }
.video-js .vjs-control-bar {
    height: 8.0em;
    bottom: 1em;
}
.video-js .vjs-control:before {
    font-size: 3.0em;
    line-height: 3.0em;
}
.video-js .vjs-play-control {
    width:6em;
}*/

</style>