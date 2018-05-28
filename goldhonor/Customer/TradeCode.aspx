<%@ Page Title="" Language="C#" MasterPageFile="~/Customer/Customer.Master" AutoEventWireup="true" CodeBehind="TradeCode.aspx.cs" Inherits="Web.Customer.TradeCode" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="wrap bg4">
        <div class="container">
            <h3 class="text-center text-primary">输入领取码</h3>
            <div class="row">
                <div class="col-xs-6 col-xs-offset-3 form-group-lg">
                    <input type="text" class="form-control text-center" id="code" />
                </div>
            </div>
            
            <div class="row" style="padding-top: 15px;">
                <a class="col-xs-5 col-xs-offset-1">
                    <img src="img/btn_submit2.png" class="img-responsive" onclick="tradeCode();" />
                </a>
                <a class="col-xs-5" href="TradeLogs.aspx">
                    <img src="img/btn_tradelogs.png" class="img-responsive" />
                </a>
            </div>
            <ol class="tradeintro">
                <li>活动时间：4月1日-6月30日</li>
                <li>您可以在汽车之家、易车两大汽车网站欧诺论坛发帖参与活动；</li>
                <li>参与活动的帖子在附标题，即文章开篇处以#我是金欧诺车主，我为金欧诺证言#文字为引言，参考帖子：<a href="http://club.autohome.com.cn/bbs/thread-c-2566-40121602-1.html" target="_blank">点击这里</a>；</li>
                <li>帖子内容形式不限，如提车作业、媳妇当车模、技术贴、游记等均可；</li>
                <li>主办方将对审核通过的帖子作者论坛私信发布1次抽奖机会领取码，如该帖子被两大论坛设置成为精华帖可额外再获得1个抽奖机会的领取码；</li>
                <li>1个领取码可在活动页面兑换1次抽奖机会，用户需在领取后72内小时使用，否则领取码将失效。</li>
            </ol>
        </div>
        <img src="img/bg4space.png" class="img-responsive" />
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptArea" runat="server">
    <script type="text/javascript">
        var trading = false;
        function tradeCode()
        {
            var code = $.trim($('#code').val());
            if(code == '')
            {
                return;
            }
            if (trading) return;
            trading = true;
            $.ajax({
                url: '../Async.ashx?method=UseCode',
                type: 'post',
                data: {
                    code: code
                },
                dataType: 'json',
                success: function (result) {
                    trading = false;
                    if(result.result == 0)
                    {
                        window.location.reload();
                    }
                    else if(result.result == 1)
                    {
                        showAlert('兑换成功<br />您获得1次抽奖机会', true);
                        $('#code').val('');
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
