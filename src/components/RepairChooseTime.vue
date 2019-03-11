<template>
	<div>
		<div class="header">
		        <a class="goBack" target="_self" @click="changeTime(1)"><i></i></a>
		        <span class="title">选择上门时间</span>
		    </div>
		<ul class="list-labelvalue tTime">
			<li v-for="(item,index) in timeArr" class="waves" :class='{"bdr-bottom": index!=timeArr.length-1}' @click="changeTime(item,$event)"><label :data-val='item.timeStr'>{{item.day}}&nbsp; {{item.week}}</label></li>
		</ul>
	</div>
</template>
<script>
import headerComponent from './/HeaderComponent'
	let root = window || {},
    util = root.util || {};
	export default{
		data() {
			return {
				timeArr: [],
				title: "选择上门时间"
			}
		},
		methods: {
			changeTime(item,event) {
				let that = this;
				if(item===1){
					that.$emit("changetime",false)
					return false;
				}
				ripple(event);
				setTimeout(function(){
					that.$emit("changetime",item)
				}, 200)

			}
		},
		created() {

			let date = new Date();
			for (var i = 1; i < 8; i++) {
				let timeObj ={};
				timeObj.timeStr = new Date().getTime();
				timeObj.timeStr = timeObj.timeStr + (24 * 60 * 60 * 1000) * i;
				timeObj.day = util.formateDate(timeObj.timeStr,'yyyy-MM-dd');
				timeObj.week = util.formatWeek(timeObj.timeStr);
				this.timeArr.push(timeObj)
			}
		},
        mounted(){
            if(util.isApp()){
              $('.tTime').css({'margin-top': '1.12rem'});
            }
        },
		components:{
			headerComponent
		}
	}

</script>
<style lang="less">
.list-labelvalue {
    margin-top: .266667rem;
    margin-bottom: 0.266667rem;
    line-height: 1.173333rem;
    /*background-color: #fff;*/
    padding-left: 0.32rem;
    li {
    	display: block;
    	text-align: left;
        padding-right: 0.32rem;
        /* &:not(:last-child) {
            border-bottom: 1px solid rgba(227,227,227,.4);
        };  */
    }
}
@import '../util/fs.less';
.header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    color: #333;
    .mixinfont(18px);
    text-align: center;
    height: 1.12rem;
    line-height: 1.12rem;
    border-bottom: 1px solid #e3e3e3;
    background-color: #f8f8f8;
    z-index: 1000;
}
/*.header .goBack {
    width: 1.066667rem;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}*/
.header .title {
    max-width: 70%;
    margin: 0 auto;
    display: block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
/*.header .goBack i{
    position: absolute;
    top: 0.306667rem;
    left: 0.32rem;
    width: 0.333333rem;
    height: 0.573333rem;
    background:url(//gfs6.gomein.net.cn/T1hTDTBKWQ1RCvBVdK) no-repeat;
    background-size: 0.333333rem 0.573333rem;
}*/
</style>