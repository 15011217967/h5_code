<template>
    <div>
        <div class="footer foot-ios-x" v-if="templateShow">
            <a class="footer-a"  v-for="(value,i) in footoptions" :href="value.promsUrl" @click="jumpPage(i)" :style="{'width':100/list.length+'%'}">
                <!-- <i class="icon i-home"><img :src="index==i ? value.selectImageUrl : value.defaultImageUrl" /></i>
                <span class="txt" :style="{'color':index==i ? selectColor : defaultColor}">{{ value.promsName }}</span> -->
                <img :src="index==i ? value.selectImageUrl : value.defaultImageUrl" />
            </a>
        </div>
    </div>
 </template>

<script type='text/ecmascript-6'>
    let root = window || {};
    let util = root.util || {}

    export default {
        props:['index'],
        data(){
            return {
                list: [],
                selectColor:'',
                defaultColor:'',
                templateShow:true,
                footoptions:[],
                cmsKey:''
            }
        },
        created() {
            if(util.isApp()){
                this.templateShow = false;
            }
            this.cmsKey = mcFootCmsKeymc;
            console.log(this.cmsKey)
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
                            _this.defaultColor = body.templetList[0].commonBottomColumnTemplet.defaultFontColor;
                            _this.selectColor = body.templetList[0].commonBottomColumnTemplet.selectFontColor;
                            for(var i = 0; i < body.templetList.length; i++){
                                if(body.templetList[i].templetCode == "commonBottomColumnTemplet"){
                                    _this.footoptions = body.templetList[i].commonBottomColumnTemplet.bottomColumnList || [];
                                }
                            }
                        } else {
                            // util.tip('网络错误')
                        }
                    },
                    error() {
                        // util.tip('网络错误')
                    }
                });
            },
            jumpPage(i){
                var _this = this;
                switch(i){
                    case 0:
                        _hmt.push(['_trackEvent', 'bottom', 'homepage', 'homepage_1']); 
                    break;
                    case 1:
                        _hmt.push(['_trackEvent', 'bottom', 'quick', 'quick_1']); 
                    break;
                    case 2:
                        _hmt.push(['_trackEvent', 'bottom', 'message', 'message_1']); 
                    break;
                    case 3:
                        _hmt.push(['_trackEvent', 'bottom', 'mine', 'mine_1']); 
                    break;
                }
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
/*底部区域*/
.footer {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 99999;
    background: #FDFEFE;
    overflow: hidden;
    border-top:0.013333rem solid #ccc;
    height:1.33333rem;
    width: 100%;
    display: flex;
    display: -ms-box;
    display: -webkit-box;
    display: -webkit-flex;
}
.footer-a {
    flex:1;
    -webkit-flex:1;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    display: block;
    text-align: center;
    width: 25%;
}
.footer-a .nav-bar{
    padding-top:0.08rem;
}
.footer-a .txt{
    font-size: 0.29333rem;
    color:#777;
    line-height:0.34667rem;
    display: block;
    padding-top: 0.08rem;
    text-align: center;
}
.footer-a .icon{
    width: 0.58667rem;
    height: 0.58667rem;
    display: block;
    margin: 0 auto;
    padding-top: 0.18667rem;
}
// .footer-a .icon img{
//     max-width: 0.58667rem;
//     max-height: 0.58667rem;
//     margin:0 auto;
// }
.footer-a img{
    max-height: 1.133333rem;
    width: auto;
    margin:0 auto;
    margin-top: .1rem;
}

</style>