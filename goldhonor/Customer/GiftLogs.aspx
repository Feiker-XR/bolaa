<%@ Page Title="" Language="C#" MasterPageFile="~/Customer/Customer.Master" AutoEventWireup="true" CodeBehind="GiftLogs.aspx.cs" Inherits="Web.Customer.GiftLogs" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="wrap bg1">
        <img src="img/top.jpg" class="img-responsive" />
        <img src="img/top.png" class="img-responsive" />
        <div class="container">
            <h4 class="text-center text-primary">中奖名单</h4>
            <div class="rank">
                <div class="row active">
                    <div class="col-xs-2">时间</div>
                    <div class="col-xs-7">中奖者</div>
                    <div class="col-xs-3">奖项</div>
                </div>
                <%
                    foreach(System.Data.DataRow row in dtLogs.Rows)
                    {
                        string phone = CommonLibrary.Convert.ToString(row["phone"]);
                        phone = phone.Substring(0, 3) + "****" + phone.Substring(7);
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
                        }
                %>
                <div class="row">
                    <div class="col-xs-2 m"><%=CommonLibrary.Convert.ToDateTime(row["add_time"]).ToString("MM.dd") %></div>
                    <div class="col-xs-7 m2"><%=row["prov"] %> <%=row["city"] %> <%=row["area"] %><br /><%=Server.HtmlEncode(CommonLibrary.Convert.ToString(row["name"])) %> <%=phone %></div>
                    <div class="col-xs-3 m"><%=v %></div>
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
