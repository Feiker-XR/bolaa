<%@ Page Title="导出抽奖码" Language="C#" MasterPageFile="~/Admin/AdminMaster.Master" AutoEventWireup="true" CodeBehind="ExportCodes.aspx.cs" Inherits="Web.Admin.ExportCodes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
    <script type="text/javascript">
        SIDE_MENU = "ExportCodes";
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="page-header">
        <h4>导出销售人员抽奖码</h4>
    </div>
    <ul class="list-group">
        <li class="list-group-item">
            <a href="Async.ashx?method=ExportCodes&month=20150415" target="_blank">开奖日：2015.04.15</a>
        </li>
        <li class="list-group-item">
            <a href="Async.ashx?method=ExportCodes&month=20150430" target="_blank">开奖日：2015.04.30</a>
        </li>
        <li class="list-group-item">
            <a href="Async.ashx?method=ExportCodes&month=20150515" target="_blank">开奖日：2015.05.15</a>
        </li>
        <li class="list-group-item">
            <a href="Async.ashx?method=ExportCodes&month=20150530" target="_blank">开奖日：2015.05.30</a>
        </li>
        <li class="list-group-item">
            <a href="Async.ashx?method=ExportCodes&month=20150615" target="_blank">开奖日：2015.06.15</a>
        </li>
        <li class="list-group-item">
            <a href="Async.ashx?method=ExportCodes&month=20150630" target="_blank">开奖日：2015.06.30</a>
        </li>
    </ul>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="DialogArea" runat="server">
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptArea" runat="server">
</asp:Content>
