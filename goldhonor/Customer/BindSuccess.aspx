<%@ Page Title="" Language="C#" MasterPageFile="~/Customer/Customer.Master" AutoEventWireup="true" CodeBehind="BindSuccess.aspx.cs" Inherits="Web.Customer.BindSuccess" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="wrap bg1">
        <img src="img/top.jpg" class="img-responsive" />
        <img src="img/top.png" class="img-responsive" />
        <div class="container">
            <div class="msg text-center text-primary">
                您的车辆信息绑定成功<br />
                获得<span class="chance">1</span>次抽奖机会
            </div>
            <div class="row" style="margin-top: 20px;">
                <a href="Play.aspx"><img src="img/btn_play.png" class="col-xs-4 col-xs-offset-4" /></a>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptArea" runat="server">
</asp:Content>
