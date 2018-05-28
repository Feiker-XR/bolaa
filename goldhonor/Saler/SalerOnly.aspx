<%@ Page Title="" Language="C#" MasterPageFile="~/Saler/Saler.Master" AutoEventWireup="true" CodeBehind="SalerOnly.aspx.cs" Inherits="Web.Saler.SalerOnly" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="wrap bg1">
        <div class="space">

        </div>
        <div class="container">
            <h3 class="text-center text-primary">对不起</h3>
            <p class="text-center text-primary">您的身份是门店总经理，无法直接录入销售信息<br />详情请联系客服热线：<a class="text-primary" href="tel:023-67680083">023-67680083</a></p>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptArea" runat="server">
</asp:Content>
