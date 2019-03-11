<template>
    <div class="picupload">
        <input type="file" id="fileUpload" accept="image/*" capture="camera" multiple>
        <ul class="img-list">
            <li v-for="(item,index) in uploadArr"><img @click="picShow(index)" :src="item" /><span :data-index="index" @click="delpic"></span><span class="master" v-if="index==0">主图</span></li>
            <li id="upload" @click="load"></li>
        </ul>
        <div class="upload-note" v-if="type">评价完成可获得100美豆，晒图片可获得200美豆噢~</div>
    </div>
</template>
<script type="text/ecmascript-6">
let root = window || {},
    util = root.util || {};
export default {
    props: ['type', 'upnum'],
    data() {
        return {
            uploadArr: [],
            // 滚动插件
            iScrollZoom: null,
            uploadObj: []
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                $("#fileUpload").removeAttr("capture");
            } else if (/(Android)/i.test(navigator.userAgent)) {
                console.log("Android");
                $("#fileUpload").attr("capture", "camera");
            }
        })
    },
    methods: {
        //放大后的图片点击、滑动事件
        addEvent: function(ind) {
            $('.dialog-img').click(function() {
                $(this).remove();
                // 销毁缩放插件
                //that.iScrollZoom.destroy();
            });
            if (this.uploadArr.length === 1)　 {
                return false;
            }
            TouchSlide({
                slideCell: "#slideBox1",
                titCell: ".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
                mainCell: ".bd ul",
                effect: "leftLoop", //左滑动循环
                autoPage: true, //自动分页
                autoPlay: false, //自动播放
                interTime: 4000,
                defaultIndex: ind //默认的当前位置索引
            });
        },
        //放大显示图片
        picShow: function(ind) {
            var that = this,
                dlgimgHTML = '',
                tmpAry = that.uploadArr,
                pmH = document.documentElement.clientHeight + 'px';
            // 清除
            $('.dialog-img').remove();
            // 放入
            dlgimgHTML = '<div id="slideBox1" class="dialog-img slideBox">' + '<div class="tablecell bd">' + '<ul>';
            $.each(tmpAry, function(i, n) {
                var imgUrl = n,
                    sty = "",
                    imgNew = new  Image();
                imgNew.src  = imgUrl;
                if (imgNew.width < imgNew.height) {
                    sty = 'height:' + pmH + ';width:auto;margin:0 auto';
                }
                dlgimgHTML += '<li><img style="' + sty + '" src="' + n + '">' + '</li>';
            });
            dlgimgHTML += '</ul></div>' + '<div class="hd"><ul></ul></div></div>';
            // 放入
            $('body').append(dlgimgHTML);
            // 注册放大插件
            /*that.iScrollZoom = new IScroll('.dialog-img', {
                zoom: true,
                scrollX: true
            });*/
            that.addEvent(ind);
        },
        //父组件传值
        getPic(val) {
            this.uploadArr = val;
        },
        //删除图片
        delpic: function(event) {
            var i = event.target.getAttribute("data-index");
            this.uploadArr.splice(i, 1);
            if (this.uploadArr.length < 9) {
                $("#upload").show();
            }
            this.$emit('watchupload', [this.uploadArr, this.upnum])
            //console.log(this.uploadArr);
        },
        //app上传图片
        appload: function(imageData, type) {
            var that = this;
            var maxsize = 100 * 1024;
            var result = 'data:' + type + ';' + 'base64,' + imageData;
            if (result.length > 2 * 1024 * 1024) {
                alert('照片最大尺寸大于2M，请重新上传!');
                return false;
            }
            that.uploadpic(result, type);
        },
        //加载事件
        load: function() {
            var that = this;
            var maxsize = 100 * 1024;
            var fileupload = document.getElementById("fileUpload");
            if (util.isApp()) {
                GomeJSBridge.callPhotoComp(function(data) {
                    switch (data.result) {
                        case '0': //成功
                            if (data.images) {
                                data.images.forEach(function(item) {
                                    var dataURL = item.fileURL;
                                    var imgtype = dataURL.toLowerCase().split('.');
                                    var ptype;
                                    if (imgtype[1] == 'jpg') {
                                        ptype = 'jpeg';
                                    } else {
                                        ptype = imgtype[1];
                                    }
                                    var typeimg = 'image/' + ptype;
                                    if (item.imageData) {
                                        that.appload(item.imageData, typeimg);
                                    }
                                })
                            }
                            break;
                        case '1': //取消
                            GomeJSBridge.toast(null, null, '用户取消');
                            break;
                        case '2': //失败
                            GomeJSBridge.toast(null, null, '调起失败');
                            break;
                    }
                }, function(err) {
                    GomeJSBridge.toast(null, null, '调起失败，错误回调中');
                })
            } else {
                fileupload.click();
            }
            fileupload.onchange = function() {
                if (!this.files.length) return;
                var files = Array.prototype.slice.call(this.files);
                if (files.length + that.uploadArr.length > 9) {
                    alert("最多同时只可上传9张图片");
                    return;
                }
                files.forEach(function(file, i) {
                    if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;
                    var reader = new FileReader();
                    reader.onload = function() {
                        var result = this.result;
                        var img = new Image();
                        img.src = result;
                        //如果图片大小小于100kb，则直接上传
                        if (result.length <= maxsize) {
                            img = null;
                            that.uploadpic(result, file.type);
                            return;
                        }
                        //图片加载完毕之后进行压缩，然后上传
                        if (img.complete) {
                            callback();
                        } else {
                            img.onload = callback;
                        }

                        function callback() {
                            var data = that.compress(img);
                            if (data.length > 2 * 1024 * 1024) {
                                alert('照片最大尺寸大于2M，请重新上传!');
                                return false;
                            }
                            that.uploadpic(data, file.type);
                            img = null;
                        }
                    };
                    reader.readAsDataURL(file);
                })
            };
        },
        getOrientation: function(img) {
            var orient;
            EXIF.getData(img, function() {
                orient = EXIF.getTag(this, 'Orientation');
            });
            return orient;
        },
        //使用canvas对大图片进行压缩
        compress: function(img) {
            //用于压缩图片的canvas
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext('2d');
            var initSize = img.src.length;
            var width = img.width;
            var height = img.height;
            var max_width = 1920;
            var max_height = 1080;
            if (width > height) {
                if (width > max_width) {
                    height = Math.round(height *= max_width / width);
                    width = max_width;
                }
            } else {
                if (height > max_height) {
                    width = Math.round(width *= max_height / height);
                    height = max_height;
                }
            }
            canvas.width = width;
            canvas.height = height;
            //铺底色
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            var orient = this.getOrientation(img);
            if (orient == 6) {
                canvas.width = height;
                canvas.height = width;
                ctx.save(); //保存状态
                ctx.translate(height / 2, width / 2); //设置画布上的(0,0)位置，也就是旋转的中心点
                ctx.rotate(90 * Math.PI / 180); //把画布旋转90度
                // 执行Canvas的drawImage语句
                ctx.drawImage(img, -width / 2, -height / 2, width, height); //把图片绘制在画布translate之前的中心点，
                ctx.restore(); //恢复状态
            } else {
                ctx.drawImage(img, 0, 0, width, height);
            }
            //进行最小压缩
            var ndata = canvas.toDataURL('image/jpeg', 0.5);
            // var result = ((ndata.length/4)*3+1023)/1024;//计算压缩后图片的大小（单位：KB）
            // console.log("result:"+result);
            canvas.width = canvas.height = 0;
            return ndata;
        },
        //图片上传，将base64的图片转成二进制对象，塞进formdata上传
        uploadpic: function(basestr, type) {
            var that = this;
            var text = window.atob(basestr.split(",")[1]);
            var buffer = new Uint8Array(text.length);
            var pecent = 0,
                loop = null;
            for (var i = 0; i < text.length; i++) {
                buffer[i] = text.charCodeAt(i);
            }
            var blob = that.getBlob([buffer], type);
            var xhr = new XMLHttpRequest();
            var formdata = that.getFormData();
            formdata.append('file', blob);
            xhr.open('post', '/pic/yf/upload');
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var res = JSON.parse(xhr.responseText);
                    var rpco = res.rpco,
                        body = res.body || [];
                    if (rpco == 200) {
                        $(".picupload .upload-note").hide();
                        if (body.result == 'N') {
                            util.tip('图片上传失败');
                        } else {
                            that.uploadArr.push(body.url);
                        }
                        if (that.uploadArr.length >= 9) {
                            $("#upload").hide();
                        }
                        //console.log(that.uploadArr);
                        //console.log(that.upnum);
                        that.$emit('watchupload', [that.uploadArr, that.upnum])
                    }
                }
            };
            xhr.send(formdata);
        },
        /**
         * 获取blob对象
         */
        getBlob: function(buffer, format) {
            try {
                return new Blob(buffer, { type: format });
            } catch (e) {
                var bb = new(window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
                buffer.forEach(function(buf) {
                    bb.append(buf);
                });
                return bb.getBlob(format);
            }
        },
        /**
         * 获取formdata
         */
        getFormData: function() {
            var isNeedShim = ~navigator.userAgent.indexOf('Android') &&
                ~navigator.vendor.indexOf('Google') &&
                !~navigator.userAgent.indexOf('Chrome') &&
                navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;
            return isNeedShim ? new FormDataShim() : new FormData()
        },
        /**
         * formdata 补丁, 给不支持formdata上传blob的打补丁
         */
        FormDataShim: function() {
            console.warn('using formdata shim');
            var o = this,
                parts = [],
                boundary = Array(21).join('-') + (+new Date() * (1e16 * Math.random())).toString(36),
                oldSend = XMLHttpRequest.prototype.send;
            this.append = function(name, value, filename) {
                parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');
                if (value instanceof Blob) {
                    parts.push('; filename="' + (filename || 'blob') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n');
                    parts.push(value);
                } else {
                    parts.push('\r\n\r\n' + value);
                }
                parts.push('\r\n');
            };
            // Override XHR send()
            XMLHttpRequest.prototype.send = function(val) {
                var fr,
                    data,
                    oXHR = this;
                if (val === o) {
                    // Append the final boundary string
                    parts.push('--' + boundary + '--\r\n');
                    // Create the blob
                    data = this.getBlob(parts);
                    // Set up and read the blob into an array to be sent
                    fr = new FileReader();
                    fr.onload = function() {
                        oldSend.call(oXHR, fr.result);
                    };
                    fr.onerror = function(err) {
                        throw err;
                    };
                    fr.readAsArrayBuffer(data);
                    // Set the multipart content type and boudary
                    this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
                    XMLHttpRequest.prototype.send = oldSend;
                } else {
                    oldSend.call(this, val);
                }
            };
        }
    }
}
</script>
<style lang='less'>
@import '../util/fs.less';
.dialog-img {
    background-color: rgba(0, 0, 0, 1);
    width: 100%;
    height: 100%;
    display: table;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 9999980;
}
.tablecell {
    text-align: center;
    vertical-align: middle;
    display: table-cell;
}
.dialog-img img {
    max-width: 100%;
}
.slideBox .bd li img {
    vertical-align: middle;
}
.picupload {
    background: #fff;
    position: relative;
}
.upload-note {
    position: absolute;
    color: #999;
    bottom: 0.48rem;
    left: 2.133333rem;
    right: 0.266667rem;
    .mixinfont(14px);
}
#fileUpload {
    display: none;
}
canvas {
    width: 100%;
    border: 1px solid #000000;
}
.img-list {
    padding: 0.4rem 0 0 0;
    li {
        position: relative;
        margin: 0 0.293333rem 0.4rem 0;
        display: inline-block;
        width: 2.08rem;
        height: 2.08rem;
        img {
            width: 100%;
            height: 100%;
        }
        span {
            position: absolute;
            top: -0.28rem;
            right: -0.28rem;
            width: 0.56rem;
            height: 0.56rem;
            background: url(//gfs13.gomein.net.cn/T12H_gBTdT1RCvBVdK.png) no-repeat center;
            background-size: 0.56rem 0.56rem;
            &.master {
                width: 100%;
                height: 0.4rem;
                line-height: 0.4rem;
                text-align: center;
                background: rgba(255, 75, 70, 0.4);
                top: 1.68rem;
                right: 0;
                color: #fff;
            }
        }
    }
}
.img-list li#upload {
    background: url(//gfs13.gomein.net.cn/T1rgAjBX_v1RCvBVdK.png) no-repeat center;
    background-size: 2.133333rem 2.12rem;
}
</style>