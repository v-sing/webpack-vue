<template>

<header id="header" class="main-header">
    <!-- Logo -->
    <a href="javascript:;" class="logo">
        <!-- 迷你模式下Logo的大小为50X50 -->
        <span class="logo-mini">FAST</span>
        <!-- 普通模式下Logo -->
        <span class="logo-lg"><b>Fast</b>Admin</span>
    </a>

    <!-- 顶部通栏样式 -->
    <nav class="navbar navbar-static-top">

        <!--第一级菜单-->
        <div id="firstnav">
            <!-- 边栏切换按钮-->
            <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                <span class="sr-only">Toggle navigation</span>
            </a>

            <!--如果不想在顶部显示角标,则给ul加上disable-top-badge类即可-->
            <ul class="nav nav-tabs nav-addtabs disable-top-badge hidden-xs" role="tablist" style="width: 812px;"><li class="dropdown pull-right hide tabdrop"><a class="dropdown-toggle" data-toggle="dropdown" href="javascript:;"><i class="glyphicon glyphicon-align-justify"></i> <b class="caret"></b></a><ul class="dropdown-menu"></ul></li>
                <li role="presentation" id="tab_1" class="active"><a href="#con_1" node-id="1" aria-controls="1" role="tab" data-toggle="tab" @dblclick="reloadIframe"><i class="fa fa-dashboard fa-fw fa-fw"></i> <span>控制台</span> </a></li>        </ul>

            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">

                    <li>
                        <a href="/" target="_blank"><i class="fa fa-home" style="font-size:14px;"></i></a>
                    </li>

                    <!-- 账号信息下拉框 -->
                    <li class="hidden-xs">
                        <a href="javascript:;" data-toggle="checkupdate" title="检测更新">
                            <i class="fa fa-refresh"></i>
                        </a>
                    </li>

                    <!-- 清除缓存 -->
                    <li>
                        <a href="javascript:;" data-toggle="dropdown" title="清空缓存">
                            <i class="fa fa-trash"></i>
                        </a>
                        <ul class="dropdown-menu wipecache">
                            <li><a href="javascript:;" data-type="all"><i class="fa fa-trash"></i> 一键清除缓存</a></li>
                            <li class="divider"></li>
                            <li><a href="javascript:;" data-type="content"><i class="fa fa-file-text"></i> 清空内容缓存</a></li>
                            <li><a href="javascript:;" data-type="template"><i class="fa fa-file-image-o"></i> 清除模板缓存</a></li>
                            <li><a href="javascript:;" data-type="addons"><i class="fa fa-rocket"></i> 清除插件缓存</a></li>
                        </ul>
                    </li>

                    <!-- 多语言列表 -->
                    <li class="hidden-xs">
                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-language"></i></a>
                        <ul class="dropdown-menu">
                            <li class="active">
                                <a href="?ref=addtabs&amp;lang=zh-cn">简体中文</a>
                            </li>
                            <li class="">
                                <a href="?ref=addtabs&amp;lang=en">English</a>
                            </li>
                        </ul>
                    </li>

                    <!-- 全屏按钮 -->
                    <li class="hidden-xs">
                        <a href="#" data-toggle="fullscreen"><i class="fa fa-arrows-alt"></i></a>
                    </li>

                    <!-- 账号信息下拉框 -->
                    <li class="dropdown user user-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <img src="/static/assets/img/avatar.png" class="user-image" alt="Admin">
                            <span class="hidden-xs">Admin</span>
                        </a>
                        <ul class="dropdown-menu">
                            <!-- User image -->
                            <li class="user-header">
                                <img src="/static/assets/img/avatar.png" class="img-circle" alt="">

                                <p>
                                    Admin                                <small>2019-09-27 17:44:07</small>
                                </p>
                            </li>
                            <!-- Menu Body -->
                            <li class="user-body">
                                <div class="row">
                                    <div class="col-xs-4 text-center">
                                        <a href="https://www.fastadmin.net" target="_blank">FastAdmin</a>
                                    </div>
                                    <div class="col-xs-4 text-center">
                                        <a href="https://forum.fastadmin.net" target="_blank">交流社区</a>
                                    </div>
                                    <div class="col-xs-4 text-center">
                                        <a href="https://doc.fastadmin.net" target="_blank">官方文档</a>
                                    </div>
                                </div>
                            </li>
                            <!-- Menu Footer-->
                            <li class="user-footer">
                                <div class="pull-left">
                                    <a href="general/profile" class="btn btn-primary addtabsit"><i class="fa fa-user"></i>
                                        个人资料</a>
                                </div>
                                <div class="pull-right">
                                    <a href="/admin/index/logout" class="btn btn-danger"><i class="fa fa-sign-out"></i>
                                        注销</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <!-- 控制栏切换按钮 -->
                    <li class="hidden-xs">
                        <a href="javascript:;" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
                    </li>
                </ul>
            </div>
        </div>

    </nav>
</header>

</template>

<script>


    export default {
        name: 'admin-header',
        created: function () {

        },
        methods: {
            //双击重新加载页面
            reloadIframe:function (e) {

            }
        }
    }
</script>