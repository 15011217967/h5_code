<template>
    <div class="sharelayer" @click="cancelLayer">
        <div class="share">
            <ul @click.stop="return false">
                <div v-for="(k,v) in shareicon">
                    <li v-for="(m,n) in k" ref="Li" @click.stop="share(m)" :data-clipboard-text="n==5?'sadasdasdasdasdasdas':''">
                        <img :src="m.logo">
                        <span>{{m.des}}</span>
                    </li>
                </div>
            </ul>
            <div class="cancel">
                取消
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            shareicon: [
                [
                    { logo: 'http://gfs12.gomein.net.cn/T1dLYvB5Kg1RCvBVdK.png', des: '微信' },
                    { logo: 'http://gfs12.gomein.net.cn/T1JDDvB7bg1RCvBVdK.png', des: '朋友圈' },
                    { logo: 'http://gfs10.gomein.net.cn/T1J_dvBmYj1RCvBVdK.png', des: 'QQ' }
                ],
                [   
                    { logo: 'http://gfs10.gomein.net.cn/T1aDdvBTEg1RCvBVdK.png', des: 'QQ空间' },
                    { logo: 'http://gfs13.gomein.net.cn/T1KDbvBCdT1RCvBVdK.png', des: '新浪微博' },
                    { logo: 'http://gfs12.gomein.net.cn/T1SDYvBbx_1RCvBVdK.png', des: '复制链接' }
                ]
            ],
            url: ''
        }

    },
    methods: {
        cancelLayer() {
            this.$emit('cancel-layer', false)
        },
        share(item) {
            if (util.isWeiXin()) {
                this.$emit('cancel-layer', true)
                return false;
            }
            switch (item.des) {
                case '微信':
                    util.tip('请打开微信客户端进行分享', 2000);
                    return false;
                    break;
                case '朋友圈':
                    util.tip('请打开微信客户端进行分享', 2000);
                    return false;
                    break;
                case 'QQ':
                    var _shareUrl = 'http://connect.qq.com/widget/shareqq/index.html?';
                    _shareUrl += 'url=www.baidu.com'
                    _shareUrl += '&desc=' + encodeURIComponent('测试');
                    _shareUrl += '&title=' + encodeURIComponent('电子说明书');
                    _shareUrl += '&pics=http://gfs12.gomein.net.cn/T1hbJvByLT1RCvBVdK.png'
                    window.open(_shareUrl)
                    break;
                case 'QQ空间':
                    var _shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
                    _shareUrl += 'url=' + window.location.href;
                    _shareUrl += '&summary=' + encodeURIComponent('啊实打实大苏打实打实打算');
                    _shareUrl += '&content=' + 'utf-8';
                    _shareUrl += '&title=电子说明书';
                    window.open(_shareUrl)
                    break;
                case '新浪微博':
                    var _shareUrl = 'http://v.t.sina.com.cn/share/share.php?';
                    _shareUrl += '&url=' + encodeURIComponent(window.location.href);
                    _shareUrl += '&title=' + encodeURIComponent('测试');
                    _shareUrl += '&content=' + 'utf-8';
                    _shareUrl += '&pic=' + encodeURIComponent('http://gfs12.gomein.net.cn/T1hbJvByLT1RCvBVdK.png');
                    window.open(_shareUrl);
                    break;
                case '复制链接':
                    this.url = window.location.href;
                    $(this.$refs.Li[5]).attr('id', 'copyBtn');
                    console.log()
                    setTimeout(() => {
                        console.log($('#copyBtn'))
                        var clipboard = new Clipboard("#copyBtn");
                        clipboard.on('success', function(e) {
                            //util.tip('复制成功!');
                        });
                        clipboard.on('error', function(e) {
                            console.log(e)
                            //util.tip('浏览器不支持自动复制,请手动复制!');
                        });
                        console.log(clipboard)
                    })

                    break;
            }
        }
    }
}
</script>
<style>
.sharelayer {
    width: 100%;
    position: fixed;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(97, 97, 97, .75);
    z-index: 10000;
}

.share {
    width: 100%;
    background: #fff;
    color: #333;
    position: absolute;
    bottom: 0;
    left: 0;
}

.share ul {
    width: 100%;
    float: left;
}
.share ul>div{
    width: 100%;
    display: flex;
}
.share ul li {
    width: 33%;
    text-align: center;
    margin-top: 0.69333rem;
    margin-bottom: 0.26667rem;
}

.share ul li img {
    width: 1.30667rem;
    height: 1.30667rem;
    display: block;
    margin: 0 auto;
}

.share ul li span {
    font-size: 0.32rem;
}

.cancel {
    width: 100%;
    height: 1.25333rem;
    font-size: 0.4rem;
    text-align: center;
    line-height: 1.25333rem;
    border-top: 2px solid #ddd;
    float: left;
}
</style>