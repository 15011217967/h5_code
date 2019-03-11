<template>
    <div>
        <div id="banner">
          <a :href="bannerHref"><img id="img" :src="bannerSrc"></a>
        </div>
    </div>
 </template>

<script type='text/ecmascript-6'>
    let root = window || {};
    let util = root.util || {}

    export default {
        // props:['index'],
        data(){
            return {
                cmsKey:'',
                bannerSrc:'',
                bannerHref:''
            }
        },
        created() {
            //更改cmsKey
            this.cmsKey = window.location.host == 'wap.dev.gomegj.com' ?  "homeNgBd7AcGQuokb" : "homeNgbhUGo5So97I";
            console.log(this.cmsKey);
            this.getBottomInfo();
        },
        methods:{
            getBottomInfo(){
                var _this = this;
                util.api({
                    surl: root.CI_API_PATH+'promscms?promscmsKey='+_this.cmsKey,
                    type: 'get',
                    success: function(res) {
                        let body = res.body;
                        if (res.rpco == '200' && body.isSuccess=='Y') {
                           _this.bannerSrc=body.templetList[0].floorPhotoTemplet.imgList[0].imageUrl;
                           _this.bannerHref=body.templetList[0].floorPhotoTemplet.imgList[0].promsUrl;
                        } else {
                            util.tip('网络错误')
                        }
                    },
                    error() {
                        util.tip('网络错误')
                    }
                });
            }
        },
        // 页面加载时
        mounted:function() {
            var _this = this;
            
        }
    }
</script>
<style lang='less'>
    @import '../util/fs.less';
    #banner{
       // height: 2rem;
       a{
          #img{
             width: 9.2rem;
             margin-left: .4rem;
          }
       }
    }
</style>