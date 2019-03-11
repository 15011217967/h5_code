<template>
	<ul class="assement">
		<li class="assementList">
			<h2 class="assementTitle">2.添加故障</h2>
            <!-- <transition enter-active-class="slideInDown" > -->
                <ul class="assementContent grid clearfix">
                    <li class="column6" v-for='(item, index) in fault' :class="{'border': item.on}" @click='selectCheckbox(index)'>{{item.mlfnm}}</li>
                </ul>
            <!-- </transition> -->
		</li>
	</ul>

</template>

<script>
export default {
	props:{
		// fault:{
		// 	type: Array
		// }
	},
    data (){
    	return{
			onIndex: null,
			onShow: false,
			display: false,
			activeNum: 0,
			assementdata: {},
			subFaultObj:[],
			fault:[]
    	}
    },
    methods: {
    		// 获取故障信息
		_getFault() {
			let that = this,
				surl = root.REPAIR_API_PATH+'malfunction?brdid='+this.hrefParma.brdid+'&&eacid='+this.hrefParma.eacid +'&&mdld='+this.hrefParma.mdld;
			util.api({
	            surl: surl,
	            type: 'post',
	            data:{
	            	brdid:this.hrefParma.brdid,
	            	eacid:this.hrefParma.eacid,
	            	mdld:this.hrefParma.mdld,
	            	attrsjson:{"attrs":[{"attrgrpid":null,"attrid":null}]}
	            },
	            success: function(res) {
	            	console.log(res);
	            	if (res.rpco === 200) {
	                	$.each(res.body.mlfs,(index,item)=>{
	                		$.each(item.subs,(i,val)=>{
	                			val.on = false;
	                			that.fault.push(val);
	                		})
	                	})
	                }
	            },
	            error: function(res) {
	            }
	        });
		},
    	// 多选逻辑
    	selectCheckbox(index) {
    		let currentObj=this.fault[index];
    		currentObj.on = !currentObj.on;
    		//提交数据对象
			if(this.subFaultObj.indexOf(currentObj.mlfid)<=-1){
				this.subFaultObj.push(currentObj.mlfid);
			}else{
				this.subFaultObj.splice(this.subFaultObj.indexOf(currentObj.mlfid),1);
			}
			this.$emit("selectcheckbox",this.subFaultObj)
    	}
    },
    created() {
    	this.hrefParma = util.getHrefParma();
    	this._getFault();
    },
    mounted () {

    }
}
</script>

<style lang="less">
	@import '../util/fs.less';
	.assement{
		padding-left: 0.266667rem;
		background-color: #fff;
		&:nth-of-type(1){
			margin: 0.266667rem 0 0;
		};
		/*&:nth-of-type(2){
			margin: 0 0 1.306667rem;
		}*/
		.assementList{
			border-bottom: 1px solid #E9E9E9;
			padding-right: 0.266667rem;
			box-sizing: border-box;
			.assementTitle{
                text-align: center;
				position: relative;
				width: 100%;
				height: 1.173333rem;
				line-height: 1.173333rem;
				background-color: #fff;
				box-sizing: border-box;
				.mixinfont(14px);
				.assementText{
					position: absolute;
					width: 60%;
					overflow:hidden;
					white-space:nowrap;
					text-overflow:ellipsis;
				};
				i{
					color: #777777;
					.mixinfont(12px);
				};
				.assementModify{
					color: #0060FF;
				}
			}
			.assementContent{
				width: 100%;
				padding: 0 0.133333rem;
				li {
					width: 4.466667rem;
					height: 1.2rem;
					line-height: 1.2rem;
					border-radius: 0.106667rem;
					margin: 0 0 0.266667rem;
					text-align: center;
					background-color: #F6F6F6;
					overflow:hidden;
					white-space:nowrap;
					text-overflow:ellipsis;
					.mixinfont(12px);
					&:nth-child(2n){
						float: right;
					};
					&.on {
						background-color: #FFF1F1;
						border: 1px solid #FF9897;
					};
				}
			}
		};
	}
    .border {
        position: relative;
    }
    .border:before {
        content: "";/* 注意这里为双引号 */
        position: absolute;
        width: 200%;
        height: 200%;
        border: 1px solid #ff0000;
        border-radius:5px;/* 也可以设置圆角 */
        -webkit-transform-origin: 0 0;
        -moz-transform-origin: 0 0;
        -ms-transform-origin: 0 0;
        -o-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scale(0.5, 0.5);
        -ms-transform: scale(0.5, 0.5);
        -o-transform: scale(0.5, 0.5);
        transform: scale(0.5, 0.5);
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    @-webkit-keyframes slideInDown {
      from {
        -webkit-transform: translate3d(0, -10%, 0);
        transform: translate3d(0, -10%, 0);
        visibility: visible;
        opacity:0;

      }

      to {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        opacity:1;
      }
    }

    @keyframes slideInDown {
        from {
            -webkit-transform: translate3d(0, -10%, 0);
            transform: translate3d(0, -10%, 0);
            visibility: visible;
            opacity:0;

        }

        to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
             opacity:1;
        }
    }

    .slideInDown {
          -webkit-animation: slideInDown 1s;
          animation: slideInDown 1s;
    }

</style>