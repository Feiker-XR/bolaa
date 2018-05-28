<%@ Page Title="" Language="C#" MasterPageFile="~/Customer/Customer.Master" AutoEventWireup="true" CodeBehind="BindFail.aspx.cs" Inherits="Web.Customer.BindFail" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="wrap bg1">
        <img src="img/top.jpg" class="img-responsive" />
        <img src="img/top.png" class="img-responsive" />
        <div class="container">
            <div class="msg text-center text-primary">
                您的车辆信息审核未通过<br />
                <br />
                原因如下：<br />
                <%=Server.HtmlEncode(CommonLibrary.Convert.ToString(RowCallback["reason"])) %>
            </div>
            <div class="row" style="margin-top: 20px;">
                <a href="Bind.aspx"><img src="img/btn_rebind.png" class="col-xs-4 col-xs-offset-4" onclick="submitForm();" /></a>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptArea" runat="server">
</asp:Content>
