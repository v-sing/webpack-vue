<template>

    <!-- 左侧菜单栏 -->
    <aside class="main-sidebar">
        <!-- 左侧菜单栏 -->
        <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 318px;">
            <section class="sidebar" style="height: 318px; overflow: hidden; width: auto;">
                <!-- 管理员信息 -->
                <div class="user-panel hidden-xs">
                    <div class="pull-left image">
                        <a href="general/profile" class="addtabsit"><img src="/static/assets/img/avatar.png"
                                                                         class="img-circle"></a>
                    </div>
                    <div class="pull-left info">
                        <p>Admin</p>
                        <i class="fa fa-circle text-success"></i> 在线
                    </div>
                </div>

                <!-- 菜单搜索 -->
                <form action="" method="get" class="sidebar-form" onsubmit="return false;">
                    <div class="input-group">
                        <input type="text" name="q" class="form-control" placeholder="搜索菜单">
                        <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
            </span>
                        <div class="menuresult list-group sidebar-form hide" style="width: 210px;">
                        </div>
                    </div>
                </form>

                <!-- 移动端一级菜单 -->
                <div class="mobilenav visible-xs">

                </div>

                <!--如果想始终显示子菜单,则给ul加上show-submenu类即可,当multiplenav开启的情况下默认为展开-->
                <ul class="sidebar-menu ">

                    <!-- 菜单可以在 后台管理->权限管理->菜单规则 中进行增删改排序 -->
                    <li class="active"><a href="/admin/dashboard?ref=addtabs" addtabs="1" url="/admin/dashboard" py="kzt"
                                          pinyin="kongzhitai"><i class="fa fa-dashboard fa-fw"></i> <span>控制台</span> <span
                            class="pull-right-container"> <small class="label pull-right bg-blue">hot</small></span></a>
                    </li>
                    <li class="treeview"><a href="javascript:;" addtabs="2" url="javascript:;" py="cggl"
                                            pinyin="changguiguanli"><i class="fa fa-cogs fa-fw"></i> <span>常规管理</span> <span
                            class="pull-right-container"> <small class="label pull-right bg-purple">new</small></span></a>
                        <ul class="treeview-menu">
                            <li class=""><a href="/admin/general/config?ref=addtabs" addtabs="6" url="/admin/general/config"
                                            py="xtpz" pinyin="xitongpeizhi"><i class="fa fa-cog fa-fw"></i>
                                <span>系统配置</span> <span class="pull-right-container"> </span></a></li>
                            <li class=""><a href="/admin/general/attachment?ref=addtabs" addtabs="7"
                                            url="/admin/general/attachment" py="fjgl" pinyin="fujianguanli"><i
                                    class="fa fa-file-image-o fa-fw"></i> <span>附件管理</span> <span
                                    class="pull-right-container"> </span></a></li>
                            <li class=""><a href="/admin/general/profile?ref=addtabs" addtabs="8"
                                            url="/admin/general/profile" py="grzl" pinyin="gerenziliao"><i
                                    class="fa fa-user fa-fw"></i> <span>个人资料</span> <span
                                    class="pull-right-container"> </span></a></li>
                        </ul>
                    </li>
                    <li class=""><a href="/admin/category?ref=addtabs" addtabs="3" url="/admin/category" py="flgl"
                                    pinyin="fenleiguanli"><i class="fa fa-leaf fa-fw"></i> <span>分类管理</span> <span
                            class="pull-right-container"> </span></a></li>
                    <li class="treeview"><a href="javascript:;" addtabs="5" url="javascript:;" py="qxgl"
                                            pinyin="quanxianguanli"><i class="fa fa-group fa-fw"></i> <span>权限管理</span>
                        <span class="pull-right-container"><i class="fa fa-angle-left"></i> </span></a>
                        <ul class="treeview-menu">
                            <li class=""><a href="/admin/auth/admin?ref=addtabs" addtabs="9" url="/admin/auth/admin"
                                            py="glygl" pinyin="guanliyuanguanli"><i class="fa fa-user fa-fw"></i> <span>管理员管理</span>
                                <span class="pull-right-container"> </span></a></li>
                            <li class=""><a href="/admin/auth/adminlog?ref=addtabs" addtabs="10" url="/admin/auth/adminlog"
                                            py="glyrz" pinyin="guanliyuanrizhi"><i class="fa fa-list-alt fa-fw"></i> <span>管理员日志</span>
                                <span class="pull-right-container"> </span></a></li>
                            <li class=""><a href="/admin/auth/group?ref=addtabs" addtabs="11" url="/admin/auth/group"
                                            py="jsz" pinyin="juesezu"><i class="fa fa-group fa-fw"></i> <span>角色组</span>
                                <span class="pull-right-container"> </span></a></li>
                            <li class=""><a href="/admin/auth/rule?ref=addtabs" addtabs="12" url="/admin/auth/rule"
                                            py="cdgz" pinyin="caidanguize"><i class="fa fa-bars fa-fw"></i>
                                <span>菜单规则</span> <span class="pull-right-container"> <small
                                        class="label pull-right bg-purple">菜单</small></span></a></li>
                        </ul>
                    </li>
                    <li class=""><a href="/admin/addon?ref=addtabs" addtabs="4" url="/admin/addon" py="cjgl"
                                    pinyin="chajianguanli"><i class="fa fa-rocket fa-fw"></i> <span>插件管理</span> <span
                            class="pull-right-container"> <small class="badge pull-right bg-red">new</small></span></a></li>
                    <li class="treeview"><a href="javascript:;" addtabs="66" url="javascript:;" py="hygl"
                                            pinyin="huiyuanguanli"><i class="fa fa-list fa-fw"></i> <span>会员管理</span> <span
                            class="pull-right-container"><i class="fa fa-angle-left"></i> </span></a>
                        <ul class="treeview-menu">
                            <li class=""><a href="/admin/user/user?ref=addtabs" addtabs="67" url="/admin/user/user"
                                            py="hygl" pinyin="huiyuanguanli"><i class="fa fa-user fa-fw"></i>
                                <span>会员管理</span> <span class="pull-right-container"> </span></a></li>
                            <li class=""><a href="/admin/user/group?ref=addtabs" addtabs="73" url="/admin/user/group"
                                            py="hyfz" pinyin="huiyuanfenzu"><i class="fa fa-users fa-fw"></i>
                                <span>会员分组</span> <span class="pull-right-container"> </span></a></li>
                            <li class=""><a href="/admin/user/rule?ref=addtabs" addtabs="79" url="/admin/user/rule"
                                            py="hygz" pinyin="huiyuanguize"><i class="fa fa-circle-o fa-fw"></i>
                                <span>会员规则</span> <span class="pull-right-container"> </span></a></li>
                        </ul>
                    </li>
                    <!--以下4行可以删除或改成自己的链接,但建议你在你的网站上添加一个FastAdmin的链接-->
                    <li class="header" data-rel="external">相关链接</li>
                    <li data-rel="external"><a href="https://doc.fastadmin.net" target="_blank"><i
                            class="fa fa-list text-red"></i> <span>官方文档</span></a></li>
                    <li data-rel="external"><a href="https://forum.fastadmin.net" target="_blank"><i
                            class="fa fa-comment text-yellow"></i> <span>交流社区</span></a></li>
                    <li data-rel="external"><a href="https://jq.qq.com/?_wv=1027&amp;k=487PNBb" target="_blank"><i
                            class="fa fa-qq text-aqua"></i> <span>QQ交流群</span></a></li>
                </ul>
            </section>
            <div class="slimScrollBar"
                 style="background: rgba(0, 0, 0, 0.2); width: 8px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 184.87px;"></div>
            <div class="slimScrollRail"
                 style="width: 8px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;"></div>
        </div>
    </aside>


</template>