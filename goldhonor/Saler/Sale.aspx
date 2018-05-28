<%@ Page Title="" Language="C#" MasterPageFile="~/Saler/Saler.Master" AutoEventWireup="true" CodeBehind="Sale.aspx.cs" Inherits="Web.Saler.Sale" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
    <link href="../datetimepicker/css/bootstrap-datepicker.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="wrap bg2">
        <div class="space"></div>
        <div class="container">
            <ul class="list-group form">
                <li class="list-group-item icon_person">
                    <input type="text" class="form-control" placeholder="客户姓名" id="name" maxlength="20" />
                </li>
                <li class="list-group-item icon_call">
                    <input type="tel" class="form-control" placeholder="客户手机号" id="phone" maxlength="11" />
                </li>
                <li class="list-group-item icon_card">
                    <input type="text" class="form-control" placeholder="客户身份证号" id="idcode" maxlength="18" />
                </li>
                <li class="list-group-item icon_car">
                    <div class="droplist">
                        <select id="cartype">
                            <option value="">请选择</option>
                            <option>金欧诺标准型</option>
                            <option>金欧诺精英型</option>
                            <option>金欧诺豪华型</option>
                        </select>
                        <input type="text" class="form-control" placeholder="所购车型" />
                    </div>
                </li>
                <li class="list-group-item icon_star">
                    <input type="text" class="form-control" placeholder="客户购车日期" id="sale_date" />
                </li>
                <li class="list-group-item icon_info">
                    <input type="text" class="form-control" placeholder="购车发票号" id="receipt_code" />
                </li>
                <li class="list-group-item icon_question">
                    <input type="text" class="form-control" placeholder="车架号" maxlength="17" id="vin" />
                </li>
                <%
                    if(true)//Web.PageBase.NeedCard(this.Context))
                    {
                %>
                <li class="list-group-item icon_shield">
                    <div>
                        <a class="btn btn-primary pull-left" onclick="selectCarCard();">上传行驶证照片</a>
                        <a class="btn btn-success pull-right" onclick="previewCarCard();">查看示例</a>
                        <div class="clearfix"></div>
                    </div>
                    <div class="thumbnail carphoto" style="margin-top: 5px;"></div>
                </li>
                <%
                    }
                %>

                
            </ul>
            <div class="row">
                <img src="img/btn_submit.png" class="col-xs-4 col-xs-offset-4" onclick="submitForm();" />
            </div>
        </div>
    </div>

    <div class="modal fade" data-backdrop="static" id="dlg_success">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <p>
                        您的销售信息录入成功<br />我们将在24小时之内完成审核<br />通过后我们将通过短信通知您，并且您将获得5积分
                    </p>
                </div>
                <div class="modal-footer">
                    <a class="btn btn-primary" onclick="window.location.reload();">继续录入</a>
                    <a class="btn btn-success" href="Default.aspx">返回个人中心</a>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptArea" runat="server">
    <script src="../datetimepicker/js/bootstrap-datepicker.min.js"></script>
    <script src="../datetimepicker/locales/bootstrap-datepicker.zh-CN.min.js"></script>
    <script type="text/javascript">
        var photo = null;

        function selectCarCard() {
            wx.chooseImage({
                success: function (res) {
                    photo = res.localIds[0];

                    $('.carphoto').empty().append($('<img />').attr('src', photo));
                }
            });
        }

        function previewCarCard() {
            wx.previewImage({
                current: 'http://goldhonor.e2capp.com/customer/img/example.jpg', // 当前显示的图片链接
                urls: ['http://goldhonor.e2capp.com/customer/img/example.jpg'] // 需要预览的图片链接列表
            });
        }

        $(function () {
            $('#sale_date').datepicker({
                autoclose: true,
                startDate: new Date(2015, 2, 1),
                endDate: new Date(),
                language: 'zh-CN',
                format: 'yyyy/mm/dd'
            });
        });

        function submitForm()
        {
            showSending();

            var data = {
                cartype: $.trim($('#cartype').val()),
                //engine_no: $.trim($('#engine_no').val()),
                photo: null,
                vin: $.trim($('#vin').val()),
                name: $.trim($('#name').val()),
                phone: $.trim($('#phone').val()),
                idcode: $.trim($('#idcode').val()),
                sale_date: $.trim($('#sale_date').val()),
                receipt_code: $.trim($('#receipt_code').val())
            };

            var sendFunc = function (data) {
                $.ajax({
                    url: '../Async.ashx?method=AddSale',
                    type: 'post',
                    data: data,
                    dataType: 'json',
                    success: function (result) {
                        hideSending();
                        if (result.result == 1) {
                            $('#dlg_success').modal();
                        }
                        else if (result.result == 0) {
                            window.location.reload();
                        }
                        else {
                            showAlert(result.msg);
                        }
                    }
                });
            }

            if (photo != null) {
                wx.uploadImage({
                    localId: photo,
                    isShowProgressTips: 0,
                    success: function (res) {
                        data.photo = res.serverId;

                        sendFunc(data);
                    }
                });
            }
            else {
                sendFunc(data);
            }
        }
    </script>
</asp:Content>
