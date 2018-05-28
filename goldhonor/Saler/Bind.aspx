<%@ Page Title="" Language="C#" MasterPageFile="~/Saler/Saler.Master" AutoEventWireup="true" CodeBehind="Bind.aspx.cs" Inherits="Web.Saler.Bind" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="wrap bg1">
        <div class="space"></div>
        <div class="container">
            <ul class="list-group form">
                <li class="list-group-item icon_person">
                    <input type="text" class="form-control" placeholder="姓名" id="name" maxlength="20" />
                </li>
                <li class="list-group-item icon_call">
                    <input type="tel" class="form-control" placeholder="手机号" id="phone" maxlength="11" />
                </li>
                <li class="list-group-item icon_shield">
                    <div class="input-group">
                        <input type="tel" class="form-control" placeholder="验证码" id="vcode" maxlength="6" />
                        <span class="input-group-btn">
                            <button type="button" class="btn btn-primary" id="btn_vcode" onclick="getVCode();" data-countdown="0">获取验证码</button>
                        </span>
                    </div>
                </li>
                <li class="list-group-item icon_card">
                    <input type="text" class="form-control" placeholder="身份证号" id="idcode" maxlength="18" />
                </li>
                <li class="list-group-item icon_star" onclick="showShopList();">
                    <div style="position: absolute; width: 100%; left: 0px; padding-left: 56px; padding-right: 15px;">
                        <input class="form-control fake" placeholder="所属经销商" id="shop_id" />
                    </div>
                    <p class="form-control-static" id="shop_name"></p>
                </li>
            </ul>
            <br />
            <div class="row">
                <img src="img/btn_submit.png" class="col-xs-4 col-xs-offset-4" onclick="submitForm();" />
            </div>
        </div>
    </div>

    <div class="modal fade" id="shop_list">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="输入经销商名称" id="shop_search" />
                            <span class="input-group-btn">
                                <a class="btn btn-primary" id="btn_shop_search" onclick="doShopSearch();">搜索</a>
                            </span>
                        </div>
                        <div class="help-block text-center" id="searching" style="display: none;"></div>
                    </div>
                    <ul class="list-group" id="shop_list_group"></ul>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->


    <div class="modal fade" data-backdrop="static" id="dlg_success">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <h4 class="text-center">您的信息验证成功</h4>
                    <p class="text-center">
                        <br />
                        <a class="btn btn-primary" href="Default.aspx">进入活动</a>
                    </p>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <div class="modal fade" id="dlg_fail">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <h4 class="text-center">您的信息验证失败</h4>
                    <p class="text-center">
                        <br />
                        您可以<br />
                        <a class="btn btn-primary" data-dismiss="modal">返回修改内容</a><br />
                        <br />
                        或者<br />
                        <br />
                        <a class="btn btn-success" href="tel:023-67680083">拨打热线 023-67680083</a><br />
                        联系工作人员
                    </p>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptArea" runat="server">
    <script type="text/javascript">
        function showShopList() {
            $('#shop_list').modal();
        }

        var photo = null;

        function selectCarCard() {
            wx.chooseImage({
                success: function (res) {
                    photo = res.localIds[0];

                    $('.carphoto').empty().append($('<img />').attr('src', photo));
                }
            });
        }

        function doShopSearch() {
            var word = $.trim($('#shop_search').val());
            if (word == '') {
                return;
            }

            $('#shop_list_group').empty();
            $('#btn_shop_search')[0].disabled = true;
            $('#searching').text('搜索中，请稍候...').show();

            $.ajax({
                url: '../Async.ashx?method=SearchDealer',
                type: 'post',
                data: {
                    word: word
                },
                dataType: 'json',
                success: function (list) {
                    $('#btn_shop_search')[0].disabled = false;
                    if (list.length == 0) {
                        $('#searching').text('未能找到满足条件的经销商');
                    }
                    else {
                        $('#searching').hide();
                        for (var i = 0; i < list.length; i++) {
                            var li = $('<li class="list-group-item"></li>').appendTo($('#shop_list_group'));

                            var a = $('<a></a>').appendTo(li);
                            a.text(list[i].name);
                            a.attr('data-id', list[i].id);
                            a.click(function () {
                                $('#shop_id').val($(this).attr('data-id'));
                                $('#shop_name').text($(this).text());
                                $('#shop_list').modal('hide');
                            });
                        }
                    }
                }
            });
        }

        function getVCode() {
            var phone = $.trim($('#phone').val());

            if (phone.length != 11 || !/1[0-9]{10}/.test(phone)) {
                showAlert('请输入有效手机号');
                return;
            }

            $.ajax({
                url: '../Async.ashx?method=SendVCode',
                type: 'post',
                data: {
                    phone: phone
                },
                dataType: 'json',
                success: function (result) {
                    showAlert('验证码已发送<br />验证码有效期为30分钟<br />仅对当前手机有效。', true);
                    //$('#vcode').val(result.code);
                    console.log(result.code);
                }
            });

            $('#btn_vcode').attr('data-countdown', '60').text('60秒后重新获取')[0].disabled = true;
            $('#btn_vcode')[0].countdownTimer = setInterval(function () {
                var countdown = parseInt($('#btn_vcode').attr('data-countdown'));
                countdown--;
                $('#btn_vcode').attr('data-countdown', countdown);
                if (countdown <= 0) {
                    clearInterval($('#btn_vcode')[0].countdownTimer);
                    $('#btn_vcode').text('获取验证码')[0].disabled = false;
                }
                else {
                    $('#btn_vcode').text(countdown + '秒后重新获取');
                }
            }, 1000);
        }

        function submitForm() {
            var data = {
                name: $.trim($('#name').val()),
                phone: $.trim($('#phone').val()),
                vcode: $.trim($('#vcode').val()),
                idcode: $.trim($('#idcode').val()),
                shop_id: $.trim($('#shop_id').val())
            };

            if (data.name == '') {
                showAlert('请输入您的姓名');
                return;
            }

            if(data.phone.length != 11 || !/1[0-9]{10}/.test(data.phone))
            {
                showAlert('请输入有效的手机号');
                return;
            }

            if(data.vcode.length != 6 || !/[0-9]{6}/.test(data.vcode))
            {
                showAlert('请输入验证码');
                return;
            }

            if (data.idcode.length != 15 && data.idcode.length != 18) {
                showAlert('请输入有效的身份证号');
                return;
            }

            if (data.shop_id == '') {
                showAlert('请选择所属经销商');
                return;
            }

            //if (photo == null) {
            //    showAlert('请上传个人照片');
            //    return;
            //}

            showSending();

            $.ajax({
                url: '../Async.ashx?method=BindSaler',
                type: 'post',
                data: data,
                dataType: 'json',
                success: function (result) {
                    hideSending();

                    if (result.result == 1) {
                        $('#dlg_success').modal();
                    }
                    else if (result.result == -4) {
                        $('#dlg_fail').modal();
                    }
                    else {
                        showAlert(result.msg);
                    }
                }
            });

            
        }
    </script>
</asp:Content>
