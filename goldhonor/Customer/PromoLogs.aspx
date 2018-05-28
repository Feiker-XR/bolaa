<%@ Page Title="" Language="C#" MasterPageFile="~/Customer/Customer.Master" AutoEventWireup="true" CodeBehind="PromoLogs.aspx.cs" Inherits="Web.Customer.PromoLogs" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="wrap bg1">
        <img src="img/top.jpg" class="img-responsive" />
        <img src="img/top.png" class="img-responsive" />
        <div class="container">
            <h4 class="text-center text-primary">我的推荐记录</h4>
            <div class="rank">
                <div class="row active">
                    <div class="col-xs-3">时间</div>
                    <div class="col-xs-2">姓名</div>
                    <div class="col-xs-4">手机号</div>
                    <div class="col-xs-3">状态</div>
                </div>
                <%
                    foreach(System.Data.DataRow row in dtLogs.Rows)
                    {
                        string phone = CommonLibrary.Convert.ToString(row["phone"]);
                        //phone = phone.Substring(0, 3) + "****" + phone.Substring(7);
                        string v = string.Empty;
                        switch(CommonLibrary.Convert.ToInt32(row["status"]))
                        {
                            case 1:
                                v = "已购车";
                                break;
                            default:
                                v = "未购车";
                                break;
                        }
                %>
                <div class="row">
                    <div class="col-xs-3"><%=CommonLibrary.Convert.ToDateTime(row["add_time"]).ToString("MM.dd") %></div>
                    <div class="col-xs-2"><%=Server.HtmlEncode(CommonLibrary.Convert.ToString(row["name"])) %></div>
                    <div class="col-xs-4"><%=phone %></div>
                    <div class="col-xs-3"><%=v %></div>
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
