<%@ Page Title="" Language="C#" MasterPageFile="~/Saler/Saler.Master" AutoEventWireup="true" CodeBehind="Rank.aspx.cs" Inherits="Web.Saler.Rank" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="wrap bg1">
        <img src="img/bg1space.png" class="img-responsive" id="space" />
        <div class="container">
            <div class="row text-primary">
                <div class="col-xs-4 col-xs-offset-1" style="padding: 0px;">
                    销售额：<%=rowSaler["sales"] %>辆<br />
                    金牌数：<%=rowSaler["gold"] %>个<br />
                </div>
                <div class="col-xs-4 col-xs-offset-2" style="padding: 0px;">
                    销售排名：<%=CommonLibrary.Convert.ToInt32(rowSaler["sales"]) == 0 ? "-" : rankSales.ToString() %><br />
                    金牌排名：<%=CommonLibrary.Convert.ToInt32(rowSaler["gold"]) == 0 ? "-" : rankGold.ToString() %><br />
                </div>
            </div>

            <div class="clearfix text-primary" style="margin-top: 20px;">当前参与活动人数：<%=userCount %>人</div>
            <ul class="nav nav-pills nav-justified">
                <li <%=rankType == 0 ? "class=\"active\"" : "" %>><a href="Rank.aspx">销售龙虎榜</a></li>
                <li <%=rankType != 0 ? "class=\"active\"" : "" %>><a href="Rank.aspx?type=1">金牌龙虎榜</a></li>
            </ul>
            <div class="rank">
                <div class="row active">
                    <div class="col-xs-2">排名</div>
                    <div class="col-xs-3">姓名</div>
                    <div class="col-xs-5">手机号</div>
                    <div class="col-xs-2"><%=rankType == 0 ? "销量" : "金牌" %></div>
                </div>
                <%
                    foreach(System.Data.DataRow row in dtRank.Rows)
                    {
                        string phone = CommonLibrary.Convert.ToString(row["phone"]);
                        phone = phone.Substring(0, 3) + "****" + phone.Substring(7);
                %>
                <div class="row">
                    <div class="col-xs-2"><span class="rankno"><%=row["RowNo"] %></span></div>
                    <div class="col-xs-3"><%=Server.HtmlEncode(CommonLibrary.Convert.ToString(row["name"])) %></div>
                    <div class="col-xs-5"><%=phone %></div>
                    <div class="col-xs-2"><%=row["v"] %></div>
                </div>
                <%
                    }
                %>
                
            </div>
        </div>
        <div class="scrollspace"></div>
    </div>
    <div class="scrolltip text-primary">
        下拉查看更多
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptArea" runat="server">
    <script type="text/javascript">
        $(function () {
            SL.checkImage([document.getElementById('space')], function () {
                if(document.body.scrollHeight > $(window).height())
                {
                    $('.scrollspace, .scrolltip').show();

                    $(window).scroll(function () {
                        if($(window).scrollTop() + $(window).height() >= document.body.scrollHeight)
                        {
                            $('.scrolltip').hide();
                        }
                        else {
                            $('.scrolltip').show();
                        }
                    });
                }
            });
        });
    </script>
</asp:Content>
