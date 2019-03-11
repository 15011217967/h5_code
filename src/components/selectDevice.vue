<template>
    <div class="device" @click="selectDevice">
        <img :src="brandlist.logo" :onerror="defaultImg">
        <span>{{brandlist.brand+brandlist.model||'请选择需服务产品'}}</span>
        <i></i>
    </div>
</template>

<script>
export default {
    props:{
        model:{
            type:Object
        }
    },
    mounted() {
        this.brandlist=this.model;
    },
    data() {
        return {
            brandlist:{},
            brandmsg:'请选择服务产品',
            defaultImg:'this.src="//gfs13.gomein.net.cn/T1.ZYQBChT1RCvBVdK.png"'
        }
    },
    methods:{
        selectDevice() {
            this.$emit('select-device',{deviceshow:true})
        }
    },
    watch:{
        'brandlist':{
            handler(newval) {
                console.log(newval)
            }
        }
    }
}
</script>

<style>
.device{
    width: 100%;
    height: 2.08rem;
    background: #fff;
    position: relative;
    text-indent: 2.16rem;
    line-height: 2.08rem;
    font-size: 0.37333rem;
    color: #333;
}
.device img{
    width: 1.65333rem;
    height: 1.65333rem;
    position: absolute;
    top: 0.26667rem;
    left: 0.4rem;
}
.device span{
    position: absolute;
    width: 5.33333rem;
    height: 2.08rem;
    top: 0;
    left: 2.29333rem;
    display: inline-block;
    overflow: hidden;
    text-indent: 0;
    text-overflow: ellipsis;
}
.device i{
    position: absolute;
    right: 0.37333rem;
    top: 0.88rem;
    bottom: 0.88rem;
    width: 0.32rem;
    height: 0.32rem;
    background: url(./img/next.png) no-repeat center center;
    background-size:cover; 
}
</style>
