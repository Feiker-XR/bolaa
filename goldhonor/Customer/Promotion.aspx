<%@ Page Title="" Language="C#" MasterPageFile="~/Customer/Customer.Master" AutoEventWireup="true" CodeBehind="Promotion.aspx.cs" Inherits="Web.Customer.Promotion" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
    <script src="../js/city.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="wrap bg1">
        <img src="img/top.jpg" class="img-responsive" />
        <img src="img/top.png" class="img-responsive" />
        <div class="container">
            <h5 class="text-primary">提交您朋友的信息<br />当您朋友购车后，您将获得一次抽奖机会</h5>

            <ul class="list-group form">
                <li class="list-group-item icon_person">
                    <input type="text" class="form-control" placeholder="朋友姓名" id="name" maxlength="20" />
                </li>
                <li class="list-group-item icon_call">
                    <input type="tel" class="form-control" placeholder="朋友手机号" id="phone" maxlength="11" />
                </li>
                <li class="list-group-item icon_star">
                    <div class="droplist">
                        <select id="prov">
                            <option value="">请选择</option>
                        </select>
                        <input type="text" class="form-control" placeholder="省份" />
                    </div>
                </li>
                <li class="list-group-item icon_question">
                    <div class="droplist">
                        <select id="city">
                            <option value="">请选择</option>
                        </select>
                        <input type="text" class="form-control" placeholder="城市" />
                    </div>
                </li>
            </ul>

            <div class="row">
                <a class="col-xs-5 col-xs-offset-1">
                    <img src="img/btn_submit2.png" class="img-responsive" onclick="submitForm();" />
                </a>
                <a class="col-xs-5" href="PromoLogs.aspx">
                    <img src="img/btn_promologs.png" class="img-responsive" />
                </a>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptArea" runat="server">
    
    <script type="text/javascript">
        function onProvChange()
        {
            var prov = $('#prov').val();

            while ($('#city option').length > 1) {
                $('#city option').eq(1).remove();
            }

            for (var i = 0; i < PROV.length; i++) {
                if(PROV[i].name == prov)
                {
                    for (var j = 0; j < PROV[i].cities.length; j++) {
                        $('<option></option>').attr('value', PROV[i].cities[j].name).text(PROV[i].cities[j].name).appendTo($('#city'));
                    }
                    break;
                }
            }

            $('#city').val('');
            $('#city').next('.form-control').val('');
        }

        $(function () {
            for (var i = 0; i < PROV.length; i++) {
                $('<option></option>').attr('value', PROV[i].name).text(PROV[i].name).appendTo($('#prov'));
            }

            $('#prov').change(onProvChange);

            
        });

        var sending = false;

        function submitForm() {
            if (sending) return;

            var data = {
                name: $.trim($('#name').val()),
                phone: $.trim($('#phone').val()),
                prov: $.trim($('#prov').val()),
                city: $.trim($('#city').val())
            };

            if (data.name == '') {
                showAlert('请输入朋友姓名');
                return;
            }

            if (data.phone == '') {
                showAlert('请输入朋友手机号');
                return;
            }

            if (data.prov == '' || data.city == '')
            {
                showAlert('请选择朋友所在地区');
                return;
            }

            sending = true;

            $.ajax({
                url: '../Async.ashx?method=AddPromotion',
                type: 'post',
                data: data,
                dataType: 'json',
                success: function(result) {
                    sending = false;
                    if (result.result == 0) {
                        window.location.reload();
                    }
                    else if (result.result == 1) {
                        showAlert('推荐记录添加成功<br />当您的朋友购车后，您将获得一次抽奖机会', true);
                        $('#name, #phone, #prov, #city').val('');
                        $('#prov').next('.form-control').val('');
                        onProvChange();
                    }
                    else {
                        showAlert(result.msg);
                    }
                }
            });
        }
    </script>
</asp:Content>
