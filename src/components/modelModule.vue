<template>
	<div class="model_module">
		<h1 class="model_module_title">热门回收机型</h1>
		<div class="model_module_warp">
			<ul>
				<li 
				v-for="(k,v) in cmsdata"
				:class="{'col3':v>1}"
				>
					<a href="">
						<img src="" />
						<p></p>
						<span></span>
						<button></button>
					</a>
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
	.model_module{
		width: 100%;
		.model_module_title{
			width: 100%;
			.px2rem(height,75);
			.px2rem(text-indent,30);
			.px2rem(font-size,32);
			overflow: hidden;
			.px2rem(line-height,115)
		}
		.model_module_warp{
			width: 100%;
			margin: (32/75)*1rem (15/75)*1rem (40/75)*1rem (15/75)*1rem;
			ul li {
				.px2rem(width,216);
				.px2rem(height,452);
				.px2rem(margin-right,20);
				float: left;
				border: 1px solid #e8e8e8;
			}
			.col3{
				margin-right: 0;
			}
		}
	}
</style>