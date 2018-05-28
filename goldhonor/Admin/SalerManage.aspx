<%@ Page Title="销售人员名单管理" Language="C#" MasterPageFile="~/Admin/AdminMaster.Master" AutoEventWireup="true" CodeBehind="SalerManage.aspx.cs" Inherits="Web.Admin.SalerManage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
    <script type="text/javascript">
        SIDE_MENU = "SalerManage";
    </script>
    <style type="text/css">
        #shoplist
        {
            margin-top: 10px;
            height: 300px;
            overflow-x: hidden;
            overflow-y: auto;
        }

        #shoplist .list-group-item
        {
            cursor: default;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="container-fluid">
        <div class="page-header">
            <a class="btn btn-success pull-right" onclick="newSaler();">添加新人员</a>
            <h4>销售人员名单管理</h4>

        </div>

        <div class="row">
            <div class="col-xs-4">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="姓名" id="s_name" />
                    <span class="input-group-btn">
                        <a class="btn btn-primary" onclick="searchSaler('name');">搜索</a>
                    </span>
                </div>
            </div>
            <div class="col-xs-4">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="电话" id="s_phone" />
                    <span class="input-group-btn">
                        <a class="btn btn-primary" onclick="searchSaler('phone');">搜索</a>
                    </span>
                </div>
            </div>
            <div class="col-xs-4">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="身份证" id="s_idcode" />
                    <span class="input-group-btn">
                        <a class="btn btn-primary" onclick="searchSaler('idcode');">搜索</a>
                    </span>
                </div>
            </div>
        </div>

        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>姓名</th>
                        <th>电话</th>
                        <th>身份证号</th>
                        <th>门店</th>
                        <th>职位</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody id="salerlist"></tbody>
            </table>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="DialogArea" runat="server">
    <div class="modal fade" id="dlg_edit">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">销售人员信息编辑</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label class="control-label col-xs-2">姓名</label>
                            <div class="col-xs-9">
                                <input type="text" class="form-control" id="p_name" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-xs-2">电话</label>
                            <div class="col-xs-9">
                                <input type="text" class="form-control" id="p_phone" maxlength="11" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-xs-2">身份证号</label>
                            <div class="col-xs-9">
                                <input type="text" class="form-control" id="p_idcode" maxlength="18" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-xs-2">门店</label>
                            <div class="col-xs-9">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="搜索门店" id="f_shop" />
                                    <span class="input-group-btn">
                                        <a class="btn btn-primary" onclick="searchDealer();">搜索</a>
                                    </span>
                                </div>
                                <div class="panel panel-default" id="shoplist">
                                    <ul class="list-group">
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-xs-2">职位</label>
                            <div class="col-xs-9">
                                <div class="btn-group">
                                    <a class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                        <span id="typename">销售顾问</span> <span class="caret"></span>
                                    </a>
                                    <ul class="dropdown-menu" role="menu">
                                        <li><a onclick="$('#typename').text('销售顾问');">销售顾问</a></li>
                                        <li><a onclick="$('#typename').text('门店总经理');">门店总经理</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <a class="btn btn-default" data-dismiss="modal">取消</a>
                    <a class="btn btn-primary" onclick="saveSaler();">保存</a>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptArea" runat="server">
    <script type="text/javascript">
        function searchDealer() {
            var v = $.trim($('#f_shop').val());
            if (v == '') return;

            $.ajax({
                url: 'Async.ashx?method=SearchDealer',
                type: 'post',
                data: {
                    value: v
                },
                dataType: 'json',
                success: function (result) {
                    if (result.length == 0) {
                        alert('没有搜索到任何结果');
                    }
                    else {
                        $('#shoplist ul').empty();
                        for (var i = 0; i < result.length; i++) {
                            $('<li class="list-group-item"></li>').text(result[i].dealer_name).attr('data-id', result[i].id).appendTo($('#shoplist ul')).click(function () {
                                $('#shoplist li').removeClass('active');
                                $(this).addClass('active');
                            });
                        }
                    }
                }
            });
        }

        function saveSaler() {
            var name = $.trim($('#p_name').val());
            var phone = $.trim($('#p_phone').val());
            var idcode = $.trim($('#p_idcode').val());

            if (name == '') {
                alert('姓名不能为空');
                return;
            }

            if (phone == '') {
                alert('电话不能为空');
                return;
            }

            if (idcode == '') {
                alert('身份证不能为空');
                return;
            }

            if ($('#shoplist li.active').length == 0) {
                alert('请选择门店');
                return;
            }

            var type = $('#typename').text() == '门店总经理' ? 1 : 2;

            var shop_id = $('#shoplist li.active').attr('data-id');

            var id = 0;
            if ($('#dlg_edit')[0].target != null) {
                id = $('#dlg_edit')[0].target.id;
            }

            $.ajax({
                url: 'Async.ashx?method=SaveSaler',
                type: 'post',
                data: {
                    id: id,
                    name: name,
                    phone: phone,
                    idcode: idcode,
                    dealer_id: shop_id,
                    type: type
                },
                dataType: 'json',
                success: function (item) {
                    var tr = $('<tr></tr>').attr('id', 'row_' + item.id);

                    $('<td></td>').text(item.name).appendTo(tr);
                    $('<td></td>').text(item.phone).appendTo(tr);
                    $('<td></td>').text(item.idcode).appendTo(tr);
                    $('<td></td>').text(item.dname).appendTo(tr);
                    $('<td></td>').text(item.type == 1 ? '门店总经理' : '销售顾问').appendTo(tr);

                    var td = $('<td></td>').appendTo(tr);

                    $('<a class="btn btn-primary btn-sm"></a>').text('编辑').appendTo(td).click(function () {
                        var data = this.parentNode.parentNode.dataItem;
                        $('#p_name').val(data.name);
                        $('#p_phone').val(data.phone);
                        $('#p_idcode').val(data.idcode);
                        $('#f_shop').val('');
                        $('#shoplist ul').empty();
                        $('<li class="list-group-item active"></li>').text(data.dname).attr('data-id', data.dealer_id).appendTo($('#shoplist ul'));
                        $('#typename').text(data.type == 1 ? '门店总经理' : '销售顾问');
                        $('#dlg_edit').modal()[0].target = data;
                    });

                    tr[0].dataItem = item;

                    var row = $('#row_' + item.id);

                    if (row.length > 0) {
                        row[0].parentNode.insertBefore(tr[0], row[0]);
                        row.remove();
                    }
                    else {
                        $('#salerlist').prepend(tr);
                    }

                    $('#dlg_edit').modal('hide');
                }
            });
        }

        function searchSaler(field) {
            var v = $.trim($('#s_' + field).val());

            if (v == '') return;

            $.ajax({
                url: 'Async.ashx?method=SearchSaler',
                type: 'post',
                data: {
                    field: field,
                    value: v
                },
                dataType: 'json',
                success: function (result) {
                    if (result.length == 0) {
                        alert('没有搜索到任何结果');
                    }
                    else {
                        $('#salerlist').empty();

                        for (var i = 0; i < result.length; i++) {
                            var item = result[i];

                            var tr = $('<tr></tr>').attr('id', 'row_' + item.id).appendTo($('#salerlist'));

                            $('<td></td>').text(item.name).appendTo(tr);
                            $('<td></td>').text(item.phone).appendTo(tr);
                            $('<td></td>').text(item.idcode).appendTo(tr);
                            $('<td></td>').text(item.dname).appendTo(tr);
                            $('<td></td>').text(item.type == 1 ? '门店总经理' : '销售顾问').appendTo(tr);

                            var td = $('<td></td>').appendTo(tr);

                            $('<a class="btn btn-primary btn-sm"></a>').text('编辑').appendTo(td).click(function () {
                                var data = this.parentNode.parentNode.dataItem;
                                $('#p_name').val(data.name);
                                $('#p_phone').val(data.phone);
                                $('#p_idcode').val(data.idcode);
                                $('#f_shop').val('');
                                $('#shoplist ul').empty();
                                $('<li class="list-group-item active"></li>').text(data.dname).attr('data-id', data.dealer_id).appendTo($('#shoplist ul'));
                                $('#typename').text(data.type == 1 ? '门店总经理' : '销售顾问');
                                $('#dlg_edit').modal()[0].target = data;
                            });

                            tr[0].dataItem = item;
                        }


                    }
                }
            });
        }

        function newSaler() {
            

            $('#p_name').val('');
            $('#p_phone').val('');
            $('#p_idcode').val('');
            $('#f_shop').val('');
            $('#shoplist ul').empty();
            //$('<li class="list-group-item active"></li>').text(data.dname).attr('data-id', data.dealer_id).appendTo($('#shoplist ul'));
            $('#typename').text('销售顾问');
            $('#dlg_edit').modal()[0].target = null;
        }
    </script>
</asp:Content>
