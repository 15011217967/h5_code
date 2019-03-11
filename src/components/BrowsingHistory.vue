<template>
    <div class="brows"  @click="jumpHistory()">
    </div>
 </template>

<script type='text/ecmascript-6'>
    let root = window || {};
    let util = root.util || {}

    export default {
        props:[''],
        data(){
            return {
                
            }
        },
        created() {
          
        },
        methods:{
            jumpHistory() {
                let that = this;
                util.href('./directionhistory.html')
            }
        },
        // 页面加载时
        mounted:function() {
            
        }
    }
</script>
<style lang='less'>
   .brows{
        width: 0.933333rem;
        height: 0.933333rem;
        border: 0.04rem solid #D9DAD9;
        border-radius: 50%;
        background: #fff url(//gfs12.gomein.net.cn/T1slhbBCLv1RCvBVdK.png) no-repeat center center; 
        background-size: contain;
        position: fixed;
        right: 0.32rem;
        bottom: 3.066667rem;
        box-shadow: 0 0 0.093333rem rgba(0,0,0,.3);
        z-index: 999;
   }
</style>