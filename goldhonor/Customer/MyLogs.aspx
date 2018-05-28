<%@ Page Title="" Language="C#" MasterPageFile="~/Customer/Customer.Master" AutoEventWireup="true" CodeBehind="MyLogs.aspx.cs" Inherits="Web.Customer.MyLogs" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="wrap bg1">
        <img src="img/top.jpg" class="img-responsive" />
        <img src="img/top.png" class="img-responsive" />
        <div class="container">
            <h4 class="text-center text-primary">我的抽奖记录</h4>
            <div class="rank">
                <div class="row active">
                    <div class="col-xs-6">抽奖时间</div>
                    <div class="col-xs-6">奖项</div>
                </div>
                <%
                    foreach(System.Data.DataRow row in dtLogs.Rows)
                    {
                        
                        string v = string.Empty;
                        switch(CommonLibrary.Convert.ToInt32(row["result"]))
                        {
                            case 1:
                                v = "20g金牌";
                                break;
                            case 2:
                                v = "10g金牌";
                                break;
                            case 3:
                                v = "5g金牌";
                                break;
                            case 4:
                                v = "3g金牌";
                                break;
                            default:
                                v = "未中奖";
                                break;
                        }
                %>
                <div class="row">
                    <div class="col-xs-6"><%=CommonLibrary.Convert.ToDateTime(row["add_time"]).ToString("yyyy.MM.dd HH:mm:ss") %></div>
                    <div class="col-xs-6"><%=v %></div>
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
