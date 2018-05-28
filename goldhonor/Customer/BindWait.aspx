<%@ Page Title="" Language="C#" MasterPageFile="~/Customer/Customer.Master" AutoEventWireup="true" CodeBehind="BindWait.aspx.cs" Inherits="Web.Customer.BindWait" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="wrap bg1">
        <img src="img/top.jpg" class="img-responsive" />
        <img src="img/top.png" class="img-responsive" />
        <div class="container">
            <div class="msg text-center text-primary">
                您的车辆信息已提交<br />
                我们将在24小时内完成审核<br />
                稍后将会以短信通知您
            </div>
            <div class="row" style="margin-top: 20px;">
                <a href="Bind.aspx"><img src="img/btn_rebind.png" class="col-xs-4 col-xs-offset-4" onclick="submitForm();" /></a>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptArea" runat="server">
</asp:Content>
