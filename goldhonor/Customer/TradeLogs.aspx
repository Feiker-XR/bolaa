<%@ Page Title="" Language="C#" MasterPageFile="~/Customer/Customer.Master" AutoEventWireup="true" CodeBehind="TradeLogs.aspx.cs" Inherits="Web.Customer.TradeLogs" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="wrap bg1">
        <img src="img/top.jpg" class="img-responsive" />
        <img src="img/top.png" class="img-responsive" />
        <div class="container">
            <h4 class="text-center text-primary">领取码兑换记录</h4>
            <div class="rank">
                <div class="row active">
                    <div class="col-xs-6">时间</div>
                    <div class="col-xs-6">领取码</div>
                </div>
                <%
                    foreach(System.Data.DataRow row in dtLogs.Rows)
                    {
                %>
                <div class="row">
                    <div class="col-xs-6"><%=CommonLibrary.Convert.ToDateTime(row["use_time"]).ToString("yyyy.MM.dd HH:mm:ss") %></div>
                    <div class="col-xs-6"><%=row["code"] %></div>
                </div>
                <%
                    }
                %>
                
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptArea" runat="server">
</asp:Content>
