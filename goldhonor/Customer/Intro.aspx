<%@ Page Title="" Language="C#" MasterPageFile="~/Customer/Customer.Master" AutoEventWireup="true" CodeBehind="Intro.aspx.cs" Inherits="Web.Customer.Intro" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="wrap bg2">
        <img src="img/space.png" class="img-responsive" style="width: 100%;" />

        <div class="container">
            <div class="ruleblock">
                <div class="title"><span>第1期（<%=DateTime.Today.Month %>月）活动奖品</span></div>
                <div class="rulemain">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-5">
                                <img src="img/gold.png" class="img-responsive" id="goldimg" style="transform: scale(1.2, 1.2); -webkit-transform: scale(1.2, 1.2);" />
                            </div>
                            <div class="col-xs-7 gifts">
                                <span>特等奖：</span>20g金牌<%=rowGift != null ? rowGift["gift1"] : "" %>个<br />
                                <span>一等奖：</span>10g金牌<%=rowGift != null ? rowGift["gift2"] : "" %>个<br />
                                <span>二等奖：</span>5g金牌<%=rowGift != null ? rowGift["gift3"] : "" %>个<br />
                                <span>三等奖：</span>3g金牌<%=rowGift != null ? rowGift["gift4"] : "" %>个
                            </div>
                        </div>
                        <div class="row text-center" style="font-size: 10px;">
                            <div class="col-xs-5">
                            图片仅供参考<br />
                            金牌以实物为准
                        </div>
                    </div>
                </div>
            </div>

            <div class="ruleblock">
                <div class="title"><span>活动规则</span></div>
                <div class="rulemain">
                    <div class="container fold">
                        <b>活动时间：</b>
                        <p>4月1日 - 6月30日（每月一期，共三期）</p>
                        <b>参与对象：</b>
                        <p>活动期间购金欧诺用户（购车时间以发票开具时间为准）</p>
                        <b>抽奖机会获取：</b>
                        <p>活动期间购买金欧诺的车主在“长安欧诺”官方微信提交正确购车信息即可获得1次抽奖机会；同时，参与“我为金欧诺代言”、“论坛发帖”、“推荐朋友购车”三个活动（详细活动说明见具体活动页）可获得额外抽奖机会。</p>
                        <b>抽奖机会使用：</b>
                        <p>每期用户抽奖截止时间自购车日起60日内有效，如2015年4月30日购车，则其有效抽奖时间截止到6月28日止；本次活动抽奖最终截止时间为8月28日。</p>
                        <b>抽奖方式：</b>
                        <p>活动将采用线上“大转盘”抽奖。</p>
                        <b>中奖名单公布：</b>
                        <p>所有抽奖结果将在使用“大转盘”后以实时弹窗出现，同时系统将在活动页面对中奖用户名单进行实时公布。</p>
                        <b>奖品发放：</b>
                        <p>抽奖结果公布后7个工作日内，主办方将安排专人联系中奖用户,请保持电话畅通；如在7个工作日内无法联系，将视为自动弃权，同时会在活动页面公布弃权申明。</p>
                        <b>领奖：</b>
                        <ol>
                            <li>金牌由指定机构(银行)发放，中奖者需本人持个人有效身份证原件、行驶证原件领奖，不得代领；</li>
                            <li>消费者金牌为私人定制金牌，中奖用户需提供个人或全家福照片进行金牌制作(允许使用用户提供的全家福、个人等相关照片用于金牌制作)；</li>
                            <li>中奖用户需在主办方客服通知后30天内到指定地点领取奖品，超过30天不领取，视为自动放弃中奖资格；</li>
                            <li>领奖费用和奖品个人所得税由中奖者自理。</li>
                        </ol>
                        <b>备注：</b>
                        <p>
                            若对本活动有任何疑问，请拨打咨询热线：<a href="tel:023-67680083" style="color: #fff; text-decoration: underline;">023-67680083</a>，请在9:00-17:30拨打（周一到周五，节假日除外）；
                        </p>
                        <p>
                            本活动参与者需确保提交的信息为真实有效，若发现与系统信息不符或无效，主办方有权取消其中奖资格。
                        </p>
                        <p>
                            活动最终解释权归重庆长安汽车股份有限公司所有。
                        </p>
                    </div>
                    <div class="container unfold text-right">
                        <a onclick="$('.fold').removeClass('fold'); $('.unfold').hide();">查看详细</a>
                    </div>
                    
                </div>
            </div>

            <div class="row">
                <div class="col-xs-6 col-xs-offset-3">
                    <%
                        if(rowCustomer != null && CommonLibrary.Convert.ToInt32(rowCustomer["is_check"]) == 1)
                        {
                    %>
                    <a href="Play.aspx"><img src="img/btn_play.png" class="img-responsive" /></a>
                    <%
                        }
                        else
                        {
                    %>
                    <a href="CheckBind.ashx"><img src="img/btn_join.png" class="img-responsive" /></a>
                    <%        
                        }
                    %>
                    
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptArea" runat="server">
    <script type="text/javascript">

        $(function () {
            SL.checkImage($('#goldimg').toArray(), function () {
                var h = $('#goldimg').height();
                $('.gifts').css('line-height', h / 4 + 'px');
            });
        });
    </script>
</asp:Content>
