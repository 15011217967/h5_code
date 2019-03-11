<template>
  <div id="message">
      <div class="des">
          <h1>{{mestitle?mestitle:"问题描述"}}</h1>
      </div>
      <div class="text_wrap">
          <div class="textWrap">
              <textarea v-if="mestitle" ref="text" @focus="focus()" @keyup="keyup" v-model="message"  class="text" placeholder="请您在此留言..." >
              </textarea>
              <textarea v-else ref="text" @focus="focus()" @keyup="keyup" v-model="message"  class="text" placeholder="请您在此描述问题...">
              </textarea>
              <div class="block"></div>
          </div>
          <p class="fontnum"><span>{{len}}</span>/<i>500</i></p>
      </div>
  </div>
</template>
<script>
export default {
  props:['msg',"mestitle"],
  data() {
    return {
      len: 0,
      message:''
    };
  },
  created() {
    var _this=this;
    this.message = this.msg;
    this.length = this.msg.length;
  },
  methods: {
    focus() {
      var _this = this;
      this.$refs.text.placeholder = ''
      this.$refs.text.onpaste = function() {
        setTimeout(()=>{
          if(_this.message.length > 256){
            util.tip('提示，您复制的内容超限，已帮您截取掉超出部分内容。');
            _this.message = _this.message.substr(0,256)
            _this.len = _this.message.length;
            _this.$emit('onmsg',_this.message)
          }
        })
      }
    },
    keyup() {
      var _this = this;
      _this.message = _this.message.substr(0,256)
      _this.len = _this.message.length;
      _this.$emit('onmsg',_this.message)
    }
  },
  watch:{
      message:{
        handler(newval) {
          this.len = newval.length;
          this.message = newval.substr(0,256);
          this.$emit('onmsg',this.message);
        }
      }
    }
};
</script>
<style lang="less">
@import "../util/fs.less";

#message {
  background: #fff;
  margin-top: 0.29333rem;
  .des {
    width: 100%;
    margin-top: 0.30667rem;
    h1 {
      padding: 0.30667rem 0 0.30667rem 0.4rem;
      font-size: 0.37333rem;
      color: #333;
    }
  }
  div.text_wrap {
    position: relative;
    margin: 0 0.4rem 0 0.4rem;
    height: 2.48rem;
    background: #f6f6f6;
    border-radius: 3px;
    div.textWrap {
      height: 2rem;
      overflow-y: scroll;
      position: relative;
      .text {
        width: 100%;
        text-indent: 0.35rem;
        padding-top: 0.187rem;
        min-height: 1.6rem;
        background: #f6f6f6;
        min-height: 1.6rem;
        line-height:inherit;
        -webkit-appearance:inherit;
        margin-bottom:0;
        border:none;
        border-radius:0;
      }
      div.block{
          width: 0.6rem;
          height: 0.6rem;
          position: absolute;
          bottom: 0;
          right: 0;
          background: #f6f6f6;
        }
    }
    .text:empty:before {
      content: attr(placeholder);
      color: #bbb;
    }
    .text:focus:before {
      content: none;
    }
    .fontnum {
      position: absolute;
      bottom: 0.16rem;
      right: 0.24rem;
      color: #999;
      font-size: 0.32rem;
    }
  }
}
</style>
