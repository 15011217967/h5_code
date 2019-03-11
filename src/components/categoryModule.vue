<template>
	<div class="category_module">
		<h1 class="category_module_title">1111</h1>
		<div class="category_module_warp">
			<ul>
				<li 
				v-for="(k,v) in this.cmsdata" 
				:class="{'col2':v<=1,'col4':v>1}" 
				class="category_module_brand"
				>
					<a href=""></a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props:["cmsdata"],
		data() {
			return {

			}
		}
	}
</script>

<style lang="less">
	@import '../util/fs.less';
	.category_module{
		width:100%;
		color: #333;
		overflow: hidden;
		.category_module_title{
			width: 100%;
			.px2rem(height,75);
			.px2rem(text-indent,30);
			.px2rem(font-size,32);
			overflow: hidden;
			.px2rem(line-height,115)
		}
		.category_module_warp{
			padding: (15/75)*1rem (30/75)*1rem;
		}
		.category_module_warp:after{
			content: "";
			height: 0;
			line-height: 0;
			display: block;
			visibility: hidden;
			clear: both;
		}
		.category_module_brand {
			.px2rem(width,165);
			.px2rem(height,214);
			.px2rem(margin-right,10);
			.px2rem(margin-bottom,10);
			float: left;
		}
		.category_module_brand:nth-child(4n+2){
			margin-right: 0;
		}
		.col2{
			.px2rem(width,340);
			.px2rem(height,214);
		}
		.col2:nth-child(2){
			margin-right: 0;
		}
		.category_module_brand a{
			width: 100%;
			height: 100%;
			display: inline-block;
		}
	}
</style>