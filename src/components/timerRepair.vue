<template>
	<div class="maskTime" :class= "{'on':timershow}"  @click="hideMask">
		<div class="timerbar"  @click.stop='stopper'>
			<h2 class="quickBrandTit bdr-bottom"><span>请选择上门时间</span></h2>
			<ul class="list-labelvalue tTime" >
				<li v-for="(item,index) in timeArr" :class="{'select':selected==index}" class="bdr-bottom" @click="changeTime(item,$event,index)"><label :data-val='item.timeStr'>{{item.day}}&nbsp; {{item.week}}</label></li>
			</ul>
		</div>
	</div>
</template>
<script >
	let root = window || {},
    util = root.util || {};
	export default{
		props:['timershow','selected'],
		data() {
			return {
				timeArr: []
			}
		},
		methods: {
			/**
			 * 获取预约时间
			 */
			getTime: function() {
				let date = new Date();
				// 当前时间
				let nowTime = date.getTime();
				// 中午时间
				let noonTime = null;

				util.api({
					surl:root.BSNS_API_PATH + 'time',
					type:'get',
					data:{},
					async:false,
					success:function(res) {
						// 服务器当前时间
						nowTime = res.rpco == 200 ? res.body.time : new Date().getTime();
					}
				});
				// 将时间设置为下午17点
				date.setHours(17, 0, 0);

				noonTime = date.getTime();
				// 判断是否已过17点
				this.isAfternoon = nowTime > noonTime ? true : false;

				for (var i = 0; i < 7; i++) {
					let timeObj ={};
					timeObj.timeStr = new Date().getTime();
					timeObj.timeStr = timeObj.timeStr + (24 * 60 * 60 * 1000) * (i + (this.isAfternoon ? 1 : 0));
					timeObj.day = util.formateDate(timeObj.timeStr,'yyyy-MM-dd');
					timeObj.week = util.formatWeek(timeObj.timeStr);
					this.timeArr.push(timeObj)
				};
			},
			changeTime(item,event,index) {
				let that = this;
				item.selected = index;
				ripple(event);
				that.$emit("stime",item)

			},
			hideMask() {
				this.$emit("stime")
			},
			// 阻止冒泡
            stopper(){
                return false;
            },
		},
		created() {
			// 获取预约时间
			this.getTime();
		},
		components:{
		}
	}

</script>

<style lang="less">

@import '../util/fs.less';
.maskTime{
		position: fixed;
		top:0;
		bottom:0;
		left: 33.333333rem;
		right:0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.3);
		z-index: 999999;
		/* display: none; */
		opacity: 0;
		-webkit-transition: all .25s linear;
		&.on{
			/* display: block; */
			opacity: 1;
			left: 0;
		};
		.timerbar{
			position: absolute;
			top: 0;
			left: 1.2rem;
			right:0;
			bottom:0;
			background-color: #fff;
			box-shadow: 0 0 10 rgba(255,255,255,0.5);
			.quickBrandTit{
				width: 100%;
				padding-bottom: 2px;
				font-size: 0.37333rem;
				text-align: left;
				text-indent: 0.50667rem;
				margin-top: 0.44rem;
				color: #ff4b41;
				padding-bottom: 0.25rem;
				span{
					padding: 0.2rem;
					border-bottom: 1px solid #ff4b41;
				}
			};
			.list-labelvalue {
				font-size: 0.34667rem;
			    margin-top: 0;
			    margin-bottom: 0.266667rem;
			    line-height: 1.173333rem;
			    background-color: #fff;
			    padding-left: 0.32rem;
			    li {
			    	display: block;
			    	text-align: left;
			        padding-right: 0.32rem;
			        /* border-bottom: 0.013333rem solid rgba(227,227,227,.4); */
			    }
			    li.select{
			    	color: #ff4b41;
			    	background: url('./img/duigou.png') no-repeat 8rem center;
			    	background-size:0.32rem 0.24rem;

			    }
			}

		}
	}
</style>
