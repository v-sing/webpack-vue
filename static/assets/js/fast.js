const Fast = {
    config: {
        //toastr默认配置
        toastr: {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-center",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    },
    api: {
        //修复URL
        fixurl: function (url) {
            if (url.substr(0, 1) !== "/") {
                var r = new RegExp('^(?:[a-z]+:)?//', 'i');
                if (!r.test(url)) {
                    url = Config.moduleurl + "/" + url;
                }
            } else if (url.substr(0, 8) === "/addons/") {
                url = Config.__PUBLIC__.replace(/(\/*$)/g, "") + url;
            }
            return url;
        },
        //获取修复后可访问的cdn链接
        cdnurl: function (url, domain) {
            var rule = new RegExp("^((?:[a-z]+:)?\\/\\/|data:image\\/)", "i");
            var url = rule.test(url) ? url : Config.upload.cdnurl + url;
            if (domain && !rule.test(url)) {
                domain = typeof domain === 'string' ? domain : location.origin;
                url = domain + url;
            }
            return url;
        },
        //获取参数
        query: function (url,name) {
            if (!url) {
                url = window.location.href;
            }
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&/]" + name + "([=/]([^&#/?]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results)
                return null;
            if (!results[2])
                return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },
        //获取当前路由
        router: function () {
            var path='';
            path= window.document.location.pathname
            path=path.replace(/\/+/g,'\/').replace(/^\//,'')
            var model=[];
            model=path.split('/');
            Config['mouldname']=model[0]
           if(!model[1]){
               model[1]='index'
           }
            if(!model[2]){
                model[2]='index'
            }
            Config['controllername']=model[1]
            Config['actionname']=model[2]
        },
        //打开一个弹出窗口
        open: function (url, title, options) {
            title = options && options.title ? options.title : (title ? title : "");
            url = Fast.api.fixurl(url);
            url = url + (url.indexOf("?") > -1 ? "&" : "?") + "dialog=1";
            var area = Fast.config.openArea != undefined ? Fast.config.openArea : [$(window).width() > 800 ? '800px' : '95%', $(window).height() > 600 ? '600px' : '95%'];
            options = $.extend({
                type: 2,
                title: title,
                shadeClose: true,
                shade: false,
                maxmin: true,
                moveOut: true,
                area: area,
                content: url,
                zIndex: Layer.zIndex,
                success: function (layero, index) {
                    var that = this;
                    //存储callback事件
                    $(layero).data("callback", that.callback);
                    //$(layero).removeClass("layui-layer-border");
                    Layer.setTop(layero);
                    try {
                        var frame = Layer.getChildFrame('html', index);
                        var layerfooter = frame.find(".layer-footer");
                        Fast.api.layerfooter(layero, index, that);

                        //绑定事件
                        if (layerfooter.size() > 0) {
                            // 监听窗口内的元素及属性变化
                            // Firefox和Chrome早期版本中带有前缀
                            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                            if (MutationObserver) {
                                // 选择目标节点
                                var target = layerfooter[0];
                                // 创建观察者对象
                                var observer = new MutationObserver(function (mutations) {
                                    Fast.api.layerfooter(layero, index, that);
                                    mutations.forEach(function (mutation) {
                                    });
                                });
                                // 配置观察选项:
                                var config = {attributes: true, childList: true, characterData: true, subtree: true}
                                // 传入目标节点和观察选项
                                observer.observe(target, config);
                                // 随后,你还可以停止观察
                                // observer.disconnect();
                            }
                        }
                    } catch (e) {

                    }
                    if ($(layero).height() > $(window).height()) {
                        //当弹出窗口大于浏览器可视高度时,重定位
                        Layer.style(index, {
                            top: 0,
                            height: $(window).height()
                        });
                    }
                }
            }, options ? options : {});
            if ($(window).width() < 480 || (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && top.$(".tab-pane.active").size() > 0)) {
                options.area = [top.$(".tab-pane.active").width() + "px", top.$(".tab-pane.active").height() + "px"];
                options.offset = [top.$(".tab-pane.active").scrollTop() + "px", "0px"];
            }
            return Layer.open(options);
        },
        //关闭窗口并回传数据
        close: function (data) {
            var index = parent.Layer.getFrameIndex(window.name);
            var callback = parent.$("#layui-layer" + index).data("callback");
            //再执行关闭
            parent.Layer.close(index);
            //再调用回传函数
            if (typeof callback === 'function') {
                callback.call(undefined, data);
            }
        },
        layerfooter: function (layero, index, that) {
            var frame = Layer.getChildFrame('html', index);
            var layerfooter = frame.find(".layer-footer");
            if (layerfooter.size() > 0) {
                $(".layui-layer-footer", layero).remove();
                var footer = $("<div />").addClass('layui-layer-btn layui-layer-footer');
                footer.html(layerfooter.html());
                if ($(".row", footer).size() === 0) {
                    $(">", footer).wrapAll("<div class='row'></div>");
                }
                footer.insertAfter(layero.find('.layui-layer-content'));
                //绑定事件
                footer.on("click", ".btn", function () {
                    if ($(this).hasClass("disabled") || $(this).parent().hasClass("disabled")) {
                        return;
                    }
                    var index = footer.find('.btn').index(this);
                    $(".btn:eq(" + index + ")", layerfooter).trigger("click");
                });

                var titHeight = layero.find('.layui-layer-title').outerHeight() || 0;
                var btnHeight = layero.find('.layui-layer-btn').outerHeight() || 0;
                //重设iframe高度
                $("iframe", layero).height(layero.height() - titHeight - btnHeight);
            }
            //修复iOS下弹出窗口的高度和iOS下iframe无法滚动的BUG
            if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
                var titHeight = layero.find('.layui-layer-title').outerHeight() || 0;
                var btnHeight = layero.find('.layui-layer-btn').outerHeight() || 0;
                $("iframe", layero).parent().css("height", layero.height() - titHeight - btnHeight);
                $("iframe", layero).css("height", "100%");
            }
        },
    },
    init: function () {
        // 对相对地址进行处理
        $.ajaxSetup({
            beforeSend: function (xhr, setting) {
                setting.url = Fast.api.fixurl(setting.url);
            }
        });
        Layer.config({
            skin: 'layui-layer-fast'
        });
        // 绑定ESC关闭窗口事件
        $(window).keyup(function (e) {
            if (e.keyCode == 27) {
                if ($(".layui-layer").size() > 0) {
                    var index = 0;
                    $(".layui-layer").each(function () {
                        index = Math.max(index, parseInt($(this).attr("times")));
                    });
                    if (index) {
                        Layer.close(index);
                    }
                }
            }
        });

        //公共代码
        //配置Toastr的参数
        Toastr.options = Fast.config.toastr;
    }
};

Fast.init();

window.Fast = Fast;
export default Fast;