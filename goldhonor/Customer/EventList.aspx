<%@ Page Title="" Language="C#" MasterPageFile="~/Customer/Customer.Master" AutoEventWireup="true" CodeBehind="EventList.aspx.cs" Inherits="Web.Customer.EventList" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="wrap bg4">
        <div class="container">
            <div class="row" style="margin-top: 5px;">
                <a class="col-xs-8 col-xs-offset-2" onclick="showEventText(1);">
                    <img src="img/btn_event1.png" class="img-responsive" />
                </a>
            </div>

            <div class="row" style="margin-top: 5px;">
                <a class="col-xs-8 col-xs-offset-2" onclick="showEventText(2);">
                    <img src="img/btn_event2.png" class="img-responsive" />
                </a>
            </div>

            <div class="row" style="margin-top: 5px;">
                <a class="col-xs-8 col-xs-offset-2" onclick="showEventText(3);">
                    <img src="img/btn_event3.png" class="img-responsive" />
                </a>
            </div>

            <div class="eventintro">
                
                <div class="eventtext" id="evt1" style="display: none;">
                    <b>活动时间：</b>
                    <p>4月1日-6月30日</p>
                    <b>参与对象：</b>
                    <p>活动期间内购金欧诺车主（购车时间以发票开具时间为准）</p>
                    <b>活动规则：</b>
                    <ol>
                        <li>通过活动页面录制“我是金欧诺车主，金欧诺好样的”录音并上传与金欧诺车的合影，分享到朋友圈实现为金欧诺代言；</li>
                        <li>用户代言每分享一个好友，且好友点击播放该代言录音，分享着即可获得1个分享点，每累计5个分享点，可获得1次抽奖机会；</li>
                        <li>同一用户播放同一分享语音只计算1个分享点，不重复计算；</li>
                        <li>用户通过该方式每获得1次抽奖机会，系统将自动以短信形式告知；</li>
                        <li>每位车主每天最多可获得1次抽奖机会，可通过该方式获得抽奖机会上限为5次。</li>
                    </ol>
                    <b>备注：</b>
                    <p>用户需要保证上传的语音和图片的真实性、合法性，若发生侵权、违反国家相关法律法规情况，主办方将有权取消其活动资格并保留追究其法律责任。</p>
                    <div class="portal">
                        <a href="MakeVoice.aspx">立即录制</a>
                    </div>
                </div>
                <div class="eventtext" id="evt2" style="display: none;">
                    <b>活动时间：</b>
                    <p>4月1日-6月30日</p>
                    <b>参与对象：</b>
                    <p>活动期间内购金欧诺车主（购车时间以发票开具时间为准）</p>
                    <b>活动规则：</b>
                    <p>车主可在汽车之家、易车网两大汽车网站的欧诺论坛发布符合规范的帖子即可获得抽奖机会，发帖规范如下<a href="http://club.autohome.com.cn/bbs/thread-c-2566-40121602-1.html" target="_blank">(点击查看发帖模板)</a>：</p>
                    <ol>
                        <li>主标题必须是#我是金欧诺车主，我为金欧诺证言#；</li>
                        <li>文字不少于500字</li>
                        <li>配图不少于3张</li>
                    </ol>
                    <b>抽奖机会领取码发放：</b>
                    <ol>
                        <li>主办方审核通过的帖子将以论坛私信形式发布1次抽奖机会领取码；</li>
                        <li>若该帖子被论坛管理员设置为精华帖，主办方将额外以私信形式发布1次抽奖机会领取码；</li>
                        <li>每位车主可通过该方式获得抽奖机会上限为5次；</li>
                        <li>抽奖号码为8位数数字与字母随机组合，需在72小时之内使用，若未在规定时间内，抽奖号码将自动失效。</li>
                    </ol>
                    <div class="portal">
                        <a href="TradeCode.aspx">输入领取码</a>
                    </div>
                </div>
                <div class="eventtext" id="evt3" style="display: none;">
                    <b>活动时间：</b>
                    <p>4月1日-6月30日</p>
                    <b>参与对象：</b>
                    <p>活动期间内购金欧诺车主（购车时间以发票开具时间为准）</p>
                    <b>活动规则：</b>
                    <ol>
                        <li>车主成功推荐朋友购买金欧诺即可获得1次抽奖机会；</li>
                        <li>车主需先在活动页面填写推荐朋友的个人信息，方可在朋友购车信息登记后成功获得抽奖机会；</li>
                        <li>如车主填写信息晚于朋友购车时间则该推荐无效；</li>
                        <li>如出现两位及两位以上车主推荐同一朋友购车，系统将根据登记推荐时间的先后顺序判断获得抽奖机会的归属，遵循“先推荐先获得”、“用户购车只产生一位有效推荐人”的原则。</li>
                        <li>车主通过本活动获得抽奖机会可累计，无上限；</li>
                    </ol>
                    <div class="portal">
                        <a href="Promotion.aspx">立即推荐</a>
                    </div>
                </div>
            </div>
        </div>
        <img src="img/bg4space.png" class="img-responsive" />
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptArea" runat="server">
    <script type="text/javascript">
        function showEventText(id)
        {
            $('.eventtext').hide();
            $('#evt' + id).show();
        }

        if (window.location.hash != '') {
            var id = window.location.hash.substr(2);
            if($('#evt' + id).length > 0)
            {
                $('#evt' + id).show();
            }
            else
            {
                showEventText(1);
            }
        }
        else
        {
            showEventText(1);
        }
    </script>
</asp:Content>
