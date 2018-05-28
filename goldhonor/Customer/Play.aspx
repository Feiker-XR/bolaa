<%@ Page Title="" Language="C#" MasterPageFile="~/Customer/Customer.Master" AutoEventWireup="true" CodeBehind="Play.aspx.cs" Inherits="Web.Customer.Play" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
    <link href="http://wx.app.bolaa.net/scenelib/scenelib.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="sl-stage" id="game" sl-zoom-height="1008" style="position: fixed;">
        <div class="sl-container">
            <div class="sl-page" id="p1">
                <div class="sl-content">
                    <div class="play_chance">
                        我的抽奖机会：<span><%=rowCustomer["chance"] %>次</span>
                    </div>
                    <div class="play_range">
                        本期活动时间：<%=mStart.ToString("yyyy.MM.dd") %>-<%=mEnd.ToString("yyyy.MM.dd") %>
                    </div>
                    <a class="mylogs" href="MyLogs.aspx">
                        我的抽奖记录
                    </a>

                    <div class="copyright">
                        
                        最终金牌样式以实物为准
                    </div>

                    <div class="rotate">
                        <img src="img/rotate.png" class="circle" />
                        <img src="img/rotate_point.png" class="pointer" onclick="goPlay();" />
                    </div>

                    <div class="container" style="width: 100%; top: 821px; position: absolute;">
                        <div class="row">
                            <a class="col-xs-4" href="Intro.aspx"><img src="img/btn_intro.png" class="img-responsive" /></a>
                            <a class="col-xs-4" href="GiftLogs.aspx"><img src="img/btn_logs.png" class="img-responsive" /></a>
                            <a class="col-xs-4" href="EventList.aspx"><img src="img/btn_getchance.png" class="img-responsive" /></a>
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" data-backdrop="static" id="dlg_nogift">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <h4 class="text-center">很遗憾，您这次没能抽中金牌，再来一次？</h4>
                </div>
                <div class="modal-footer">
                    <a class="btn btn-danger" href="EventList.aspx">获取更多抽奖机会</a>
                    <a class="btn btn-default" data-dismiss="modal" onclick="$('.circle')[0].className = 'circle';">下次再说</a>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptArea" runat="server">
    <script type="text/javascript">
        document.addEventListener('touchmove', function(evt){
            evt.preventDefault();
        });

        var chances = <%=rowCustomer["chance"] %>;
        var stage;
        $(function () {
            stage = new SL.Stage(document.getElementById('game'));
            stage.showPage('p1');
        });

        var playing = false;

        function goPlay() {
            if(playing) return;
            playing = true;
            $.ajax({
                url: '../Async.ashx?method=GetGift',
                type: 'post',
                dataType: 'json',
                success: function(result) {
                    if(result.result == 0)
                    {
                        window.location.reload();
                    }
                    else if(result.result == 1)
                    {
                        chances = result.chance;
                        $('.play_chance span').text(chances + '次');

                        $('.circle').addClass('rotate_' + result.gift_result);

                        setTimeout((function(){
                            if(this.gift_result == 0)
                            {
                                
                                $('#dlg_nogift').modal();
                                playing = false;
                            }
                            else {
                                window.location.href = 'ShowGift.aspx?id=' + this.logid;
                            }
                        }).bind(result), 6000);
                    }
                    else
                    {
                        showAlert(result.msg);
                        playing = false;
                    }
                }
            });
        }
    </script>
</asp:Content>
