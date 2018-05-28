<%@ Page Title="" Language="C#" MasterPageFile="~/Customer/Customer.Master" AutoEventWireup="true" CodeBehind="ShowGift.aspx.cs" Inherits="Web.Customer.ShowGift" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
    <link href="http://wx.app.bolaa.net/scenelib/scenelib.css" rel="stylesheet" />
    <script type="text/javascript">
        WXENV.addReadyHandler(function () {
            WXENV.shareData.desc = '我获得了长安金欧诺提供的<%=giftname%>荣耀千足金牌，赶快来购长安金欧诺，赢荣耀千足金牌。';
            WXENV.updateShareData();
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="sl-stage" id="gift">
        <div class="sl-container">
            <div class="sl-page">
                <div class="sl-content">
                    <img src="GiftImage.ashx?id=<%=id %>" class="giftimg" />
                    <div class="giftimg_tip"></div>

                    <a href="EventList.aspx#p1"><img src="img/btn_event1.png" class="btn_event1" /></a>
                    <a href="EventList.aspx#p2"><img src="img/btn_event2.png" class="btn_event2" /></a>
                    <a href="EventList.aspx#p3"><img src="img/btn_event3.png" class="btn_event3" /></a>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptArea" runat="server">
    <script type="text/javascript">
        $(function () {
            var stage = new SL.Stage(document.getElementById('gift'));
            stage.showPage(stage.pages[0]);
        });
    </script>
</asp:Content>
