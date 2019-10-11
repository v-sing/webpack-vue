<template>
    <div class="wrapper">
        <admin-header></admin-header>
        <admin-left-menu></admin-left-menu>
        <admin-sidebar></admin-sidebar>
    </div>
</template>

<script>
    export default {
        name: 'index',
        created:function () {

            var that=this;
            //双击重新加载页面
            that.$(document).on("dblclick", ".sidebar-menu li > a", function (e) {
                that.$("#con_" + that.$(this).attr("addtabs") + " iframe").attr('src', function (i, val) {
                    return val;
                });
                e.stopPropagation();
            });

            //修复在移除窗口时下拉框不隐藏的BUG
            that.$(window).on("blur", function () {
                that.$("[data-toggle='dropdown']").parent().removeClass("open");
                if (that.$("body").hasClass("sidebar-open")) {
                    that.$(".sidebar-toggle").trigger("click");
                }
            });

            //快捷搜索
            that.$(".menuresult").width(that.$("form.sidebar-form > .input-group").width());
            var searchResult =that.$(".menuresult");
            that.$("form.sidebar-form").on("blur", "input[name=q]", function () {
                searchResult.addClass("hide");
            }).on("focus", "input[name=q]", function () {
                if (that.$("a", searchResult).length() > 0) {
                    searchResult.removeClass("hide");
                }
            }).on("keyup", "input[name=q]", function () {
                searchResult.html('');
                var val = that.$(this).val();
                var html = [];
                if (val != '') {
                    that.$("ul.sidebar-menu li a[addtabs]:not([href^='javascript:;'])").each(function () {
                        if (that.$("span:first", this).text().indexOf(val) > -1 || that.$(this).attr("py").indexOf(val) > -1 || that.$(this).attr("pinyin").indexOf(val) > -1) {
                            html.push('<a data-url="' + that.$(this).attr("href") + '" href="javascript:;">' + that.$("span:first", this).text() + '</a>');
                            if (html.length >= 100) {
                                return false;
                            }
                        }
                    });
                }
                that.$(searchResult).append(html.join(""));
                if (html.length > 0) {
                    searchResult.removeClass("hide");
                } else {
                    searchResult.addClass("hide");
                }
            });
            //快捷搜索点击事件
            that.$("form.sidebar-form").on('mousedown click', '.menuresult a[data-url]', function () {
                that.$Backend.api.addtabs(that.$(this).data("url"));
            });

            //切换左侧sidebar显示隐藏
            that.$(document).on("click fa.event.toggleitem", ".sidebar-menu li > a", function (e) {
                that.$(".sidebar-menu li").removeClass("active");
                //当外部触发隐藏的a时,触发父辈a的事件
                if (!that.$(this).closest("ul").is(":visible")) {
                    //如果不需要左侧的菜单栏联动可以注释下面一行即可
                    that.$(this).closest("ul").prev().trigger("click");
                }

                var visible = that.$(this).next("ul").is(":visible");
                if (!visible) {
                    that.$(this).parents("li").addClass("active");
                } else {
                }
                e.stopPropagation();
            });

            //清除缓存
            that.$(document).on('click', "ul.wipecache li a", function () {
                that.$.ajax({
                    url: 'ajax/wipecache',
                    dataType: 'json',
                    data: {type: that.$(this).data("type")},
                    cache: false,
                    success: function (ret) {
                        if (ret.hasOwnProperty("code")) {
                            var msg = ret.hasOwnProperty("msg") && ret.msg != "" ? ret.msg : "";
                            if (ret.code === 1) {
                                that.$Toastr.success(msg ? msg : 'Wipe cache completed');
                            } else {
                                that.$Toastr.error(msg ? msg : 'Wipe cache failed');
                            }
                        } else {
                            that.$Toastr.error('Unknown data format');
                        }
                    }, error: function () {
                        that.$Toastr.error('Network error');
                    }
                });
            });

            //全屏事件
            that.$(document).on('click', "[data-toggle='fullscreen']", function () {
                var doc = document.documentElement;
                if (that.$(document.body).hasClass("full-screen")) {
                    that.$(document.body).removeClass("full-screen");
                    document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen();
                } else {
                    that.$(document.body).addClass("full-screen");
                    doc.requestFullscreen ? doc.requestFullscreen() : doc.mozRequestFullScreen ? doc.mozRequestFullScreen() : doc.webkitRequestFullscreen ? doc.webkitRequestFullscreen() : doc.msRequestFullscreen && doc.msRequestFullscreen();
                }
            });

            var multiplenav =true;

            var firstnav = that.$("#firstnav .nav-addtabs");
            var nav = multiplenav ? that.$("#secondnav .nav-addtabs") : firstnav;

            //刷新菜单事件
            that.$(document).on('refresh', '.sidebar-menu', function () {
                that.$Fast.api.ajax({
                    url: 'index/index',
                    data: {action: 'refreshmenu'}
                }, function (data) {
                    that.$(".sidebar-menu li:not([data-rel='external'])").remove();
                    that.$(".sidebar-menu").prepend(data.menulist);
                    if (multiplenav) {
                        firstnav.html(data.navlist);
                    }
                    that.$("li[role='presentation'].active a", nav).trigger('click');
                    return false;
                }, function () {
                    return false;
                });
            });

            if (multiplenav) {
                //一级菜单自适应
                that.$(window).resize(function () {
                    var siblingsWidth = 0;
                    firstnav.siblings().each(function () {
                        siblingsWidth +=that.$(this).outerWidth();
                    });
                    firstnav.width(firstnav.parent().width() - siblingsWidth);
                    firstnav.refreshAddtabs();
                });

                //点击顶部第一级菜单栏
                firstnav.on("click", "li a", function () {
                    that.$("li", firstnav).removeClass("active");
                    that.$(this).closest("li").addClass("active");
                    that.$(".sidebar-menu > li.treeview").addClass("hidden");
                    if (that.$(this).attr("url") == "javascript:;") {
                        var sonlist = that.$(".sidebar-menu > li[pid='" + that.$(this).attr("addtabs") + "']");
                        sonlist.removeClass("hidden");
                        var sidenav;
                        var last_id = that.$(this).attr("last-id");
                        if (last_id) {
                            sidenav =that.$(".sidebar-menu > li[pid='" + that.$(this).attr("addtabs") + "'] a[addtabs='" + last_id + "']");
                        } else {
                            sidenav = that.$(".sidebar-menu > li[pid='" + that.$(this).attr("addtabs") + "']:first > a");
                        }
                        if (sidenav) {
                            sidenav.attr("href") != "javascript:;" && sidenav.trigger('click');
                        }
                    } else {

                    }
                });

                //点击左侧菜单栏
                that.$(document).on('click', '.sidebar-menu li a[addtabs]', function (e) {
                    var parents = that.$(this).parentsUntil("ul.sidebar-menu", "li");
                    var top = parents[parents.length - 1];
                    var pid = that.$(top).attr("pid");
                    if (pid) {
                        var obj = that.$("li a[addtabs=" + pid + "]", firstnav);
                        var last_id = obj.attr("last-id");
                        if (!last_id || last_id != pid) {
                            obj.attr("last-id", $(this).attr("addtabs"));
                            if (!obj.closest("li").hasClass("active")) {
                                obj.trigger("click");
                            }
                        }
                    }
                });

                var mobilenav = that.$(".mobilenav");
                that.$("#firstnav .nav-addtabs li a").each(function () {
                    mobilenav.append(that.$(this).clone().addClass("btn btn-app"));
                });

                //点击移动端一级菜单
                mobilenav.on("click", "a", function () {
                    that.$("a", mobilenav).removeClass("active");
                    that.$(this).addClass("active");
                    that.$(".sidebar-menu > li.treeview").addClass("hidden");
                    if ($(this).attr("url") == "javascript:;") {
                        var sonlist = that.$(".sidebar-menu > li[pid='" + that.$(this).attr("addtabs") + "']");
                        sonlist.removeClass("hidden");
                    }
                });
            }

            //这一行需要放在点击左侧链接事件之前
            var addtabs = Config.referer ? localStorage.getItem("addtabs") : null;

            //绑定tabs事件,如果需要点击强制刷新iframe,则请将iframeForceRefresh置为true,iframeForceRefreshTable只强制刷新表格
            nav.addtabs({iframeHeight: "100%", iframeForceRefresh: false, iframeForceRefreshTable: true, nav: nav});

            if (that.$("ul.sidebar-menu li.active a").length > 0) {
                that.$("ul.sidebar-menu li.active a").trigger("click");
            } else {
                if (multiplenav) {
                    that.$("li:first > a", firstnav).trigger("click");
                } else {
                    that.$("ul.sidebar-menu li a[url!='javascript:;']:first").trigger("click");
                }
            }

            //如果是刷新操作则直接返回刷新前的页面
            if (Config.referer) {
                if (Config.referer === $(addtabs).attr("url")) {
                    var active = $("ul.sidebar-menu li a[addtabs=" + $(addtabs).attr("addtabs") + "]");
                    if (multiplenav && active.size() == 0) {
                        active = $("ul li a[addtabs='" + $(addtabs).attr("addtabs") + "']");
                    }
                    if (active.size() > 0) {
                        active.trigger("click");
                    } else {
                        that.$(addtabs).appendTo(document.body).addClass("hide").trigger("click");
                    }
                } else {
                    //刷新页面后跳到到刷新前的页面
                    that.$Backend.api.addtabs(Config.referer);
                }
            }


            var my_skins = [
                "skin-blue",
                "skin-white",
                "skin-red",
                "skin-yellow",
                "skin-purple",
                "skin-green",
                "skin-blue-light",
                "skin-white-light",
                "skin-red-light",
                "skin-yellow-light",
                "skin-purple-light",
                "skin-green-light"
            ];
            setup();

            function change_layout(cls) {
                that.$("body").toggleClass(cls);
                that.AdminLTE.layout.fixSidebar();
                //Fix the problem with right sidebar and layout boxed
                if (cls == "layout-boxed")
                    that.AdminLTE.controlSidebar._fix($(".control-sidebar-bg"));
                if ($('body').hasClass('fixed') && cls == 'fixed') {
                    that.AdminLTE.pushMenu.expandOnHover();
                    that.AdminLTE.layout.activate();
                }
                that.AdminLTE.controlSidebar._fix($(".control-sidebar-bg"));
                that.AdminLTE.controlSidebar._fix($(".control-sidebar"));
            }

            function change_skin(cls) {
                if (!that.$("body").hasClass(cls)) {
                    that.$("body").removeClass(my_skins.join(' ')).addClass(cls);
                    localStorage.setItem('skin', cls);
                    var cssfile = Config.site.cdnurl + "/assets/css/skins/" + cls + ".css";
                    that.$('head').append('<link rel="stylesheet" href="' + cssfile + '" type="text/css" />');
                }
                return false;
            }

            function setup() {
                var tmp = localStorage.getItem('skin');
                if (tmp && that.$.inArray(tmp, my_skins) != -1)
                    change_skin(tmp);

                // 皮肤切换
                that.$("[data-skin]").on('click', function (e) {
                    if (that.$(this).hasClass('knob'))
                        return;
                    e.preventDefault();
                    change_skin($(this).data('skin'));
                });

                // 布局切换
                that.$("[data-layout]").on('click', function () {
                    change_layout(that.$(this).data('layout'));
                });

                // 切换子菜单显示和菜单小图标的显示
                that.$("[data-menu]").on('click', function () {
                    if (that.$(this).data("menu") == 'show-submenu') {
                        that.$("ul.sidebar-menu").toggleClass("show-submenu");
                    } else {
                        nav.toggleClass("disable-top-badge");
                    }
                });

                // 右侧控制栏切换
                that.$("[data-controlsidebar]").on('click', function () {
                    change_layout($(this).data('controlsidebar'));
                    var slide = !that.AdminLTE.options.controlSidebarOptions.slide;
                    that.AdminLTE.options.controlSidebarOptions.slide = slide;
                    if (!slide)
                        that.$('.control-sidebar').removeClass('control-sidebar-open');
                });

                // 右侧控制栏背景切换
                that.$("[data-sidebarskin='toggle']").on('click', function () {
                    var sidebar = that.$(".control-sidebar");
                    if (sidebar.hasClass("control-sidebar-dark")) {
                        sidebar.removeClass("control-sidebar-dark")
                        sidebar.addClass("control-sidebar-light")
                    } else {
                        sidebar.removeClass("control-sidebar-light")
                        sidebar.addClass("control-sidebar-dark")
                    }
                });

                // 菜单栏展开或收起
                that.$("[data-enable='expandOnHover']").on('click', function () {
                    that.$(this).attr('disabled', true);
                    AdminLTE.pushMenu.expandOnHover();
                    if (!that.$('body').hasClass('sidebar-collapse'))
                        that.$("[data-layout='sidebar-collapse']").click();
                });

                // 重设选项
                if (that.$('body').hasClass('fixed')) {
                    that.$("[data-layout='fixed']").attr('checked', 'checked');
                }
                if (that.$('body').hasClass('layout-boxed')) {
                    that.$("[data-layout='layout-boxed']").attr('checked', 'checked');
                }
                if (that.$('body').hasClass('sidebar-collapse')) {
                    that.$("[data-layout='sidebar-collapse']").attr('checked', 'checked');
                }
                if (that.$('ul.sidebar-menu').hasClass('show-submenu')) {
                    that.$("[data-menu='show-submenu']").attr('checked', 'checked');
                }
                if (nav.hasClass('disable-top-badge')) {
                    that.$("[data-menu='disable-top-badge']").attr('checked', 'checked');
                }

            }

            that.$(window).resize();

        } 
    }

</script>