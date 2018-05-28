<%@ Page Title="" Language="C#" MasterPageFile="~/Saler/Saler.Master" AutoEventWireup="true" CodeBehind="My.aspx.cs" Inherits="Web.Saler.My" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="wrap bg1">
        <div class="space"></div>
        <div class="container profile">
            <h4 class="text-center text-primary"><%=Server.HtmlEncode(CommonLibrary.Convert.ToString(rowSaler["name"])) %>：<%=CommonLibrary.Convert.ToInt32(rowSaler["type"]) == 1 ? "门店总经理" : "销售顾问" %></h4>
            <h4 class="text-center text-primary">当前积分：<span class="profile_point"><%=rowSaler["point"] %></span>分</h4>
            <div class="text-center text-danger">消耗5积分兑换一个抽奖号码</div>
            <div class="row" style="margin-top: 15px;">
                <div class="col-xs-6 col-xs-offset-3">
                    <img src="img/btn_getcode.png" class="img-responsive" onclick="GetGiftCode();" />
                </div>
            </div>
            <div class="clearfix text-primary" style="margin-top: 20px;">
                <span class="pull-left">本期登记总销量：<%=ticketCount %></span>
                <span class="pull-right">本期金牌总数：<%=goldCount %></span>
            </div>
            
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title">我获取的抽奖号码</h3>
                </div>
                <ul class="list-group" id="ticketlist">
                    <%
                        foreach(System.Data.DataRow row in dtTickets.Rows)
                        {
                    %>
                    <li class="list-group-item">
                        <span class="pull-right"><%
                            switch(CommonLibrary.Convert.ToInt32(row["status"]))
                            {
                                case 0:
                                    Response.Write("待抽奖");
                                    break;
                                case 1:
                                    Response.Write("20g金牌");
                                    break;
                                case 2:
                                    Response.Write("10g金牌");
                                    break;
                                case 3:
                                    Response.Write("5g金牌");
                                    break;
                                case 4:
                                    Response.Write("3g金牌");
                                    break;
                                case -1:
                                    Response.Write("未中奖");
                                    break;
                            }
                                                     %></span>
                        <%=row["month"] %><%=row["id"].ToString().PadLeft(4, '0') %>
                    </li>
                    <%
                        }
                    %>
                </ul>
            </div>
        </div>
    </div>

    <div class="modal fade" data-backdrop="static" id="dlg_success">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <h4 class="text-center">抽奖码兑换成功</h4>
                    <p class="text-center">
                        <br />
                        您获得的抽奖码为<br />
                        <span id="newcode"></span><br />
                        <br />
                        开奖日期为：<span id="thedate"></span>
                    </p>
                </div>
                <div class="modal-footer">
                    <a class="btn btn-primary" data-dismiss="modal">确定</a>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptArea" runat="server">
    <script type="text/javascript">
        var codegeting = false;
        function GetGiftCode()
        {
            if (codegeting) return;
            codegeting = true;
            $.ajax({
                url: '../Async.ashx?method=GetGiftCode',
                type: 'post',
                dataType: 'json',
                success: function (result) {
                    codegeting = false;
                    if(result.result == 0)
                    {
                        window.location.reload();
                    }
                    else if(result.result == 1)
                    {
                        $('<li class="list-group-item"></li>').text(result.code).prepend($('<span class="pull-right">待抽奖</span>')).prependTo($('#ticketlist'));
                        $('.profile_point').text(result.point);
                        $('#month').text(result.month);
                        $('#newcode').text(result.code);
                        $('#thedate').text(result.thedate);
                        $('#dlg_success').modal();
                    }
                    else
                    {
                        showAlert(result.msg);
                    }
                }
            });
        }
    </script>
</asp:Content>
