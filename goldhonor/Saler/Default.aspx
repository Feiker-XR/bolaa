<%@ Page Title="" Language="C#" MasterPageFile="~/Saler/Saler.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Web.Saler.Default" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="wrap bg1">
        <div class="space"></div>
        <div class="container">
            <div class="row">
                <div class="col-xs-3 col-xs-offset-1">
                    <%
                        string avatar = CommonLibrary.Convert.ToString(rowSaler["photo"]);
                        if(string.IsNullOrEmpty(avatar))
                        {
                            avatar = "img/avatar.png";
                        }
                        else
                        {
                            avatar = "../" + avatar;
                        }
                    %>
                    <div id="avatararea" style="background-image: url(<%=avatar %>);">
                        <img src="img/avatar_space.png" class="img-responsive" id="avatar" />
                    </div>
                </div>
                <div class="col-xs-4 stat">
                    销<span style="visibility: hidden;">销</span>量:<%=rowSaler["sales"] %>辆<br />
                    金牌数:<%=rowSaler["gold"] %>枚
                </div>
                <div class="col-xs-3 stat">
                    排名:<%=CommonLibrary.Convert.ToInt32(rowSaler["sales"]) == 0 ? "-" : rankSales.ToString() %><br />
                    排名:<%=CommonLibrary.Convert.ToInt32(rowSaler["gold"]) == 0 ? "-" : rankGold.ToString() %>
                </div>
                <div class="col-xs-3 col-xs-offset-1 text-center"><%=Server.HtmlEncode(CommonLibrary.Convert.ToString(rowSaler["name"])) %></div>
                <div class="clearfix"></div>
            </div>
            <div class="row">
                <div class="col-xs-5 col-xs-offset-1">
                    <a href="Sale.aspx"><img src="img/btn_input.png" class="img-responsive" /></a>
                </div>
                <div class="col-xs-5">
                    <a href="My.aspx"><img src="img/btn_profile.png" class="img-responsive" /></a>
                </div>
            </div>
            <div class="btns">
                <a class="thebtn" href="Intro.aspx">
                    <img src="img/btn_intro.png" class="img-responsive" />
                </a>
                <a class="thebtn" href="Rank.aspx">
                    <img src="img/btn_rank.png" class="img-responsive" />
                </a>
                <a class="thebtn" href="Building.aspx">
                    <img src="img/btn_news.png" class="img-responsive" />
                </a>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptArea" runat="server">
    <script type="text/javascript">
        SL.checkImage([document.getElementById('avatar')], function () {
            var h = $('#avatar').height();
            $('.stat').css({
                lineHeight: h / 2 + 'px'
            });
        });

        $('#avatararea').click(function () {
            wx.chooseImage({
                success: function (res) {
                    showSending('头像上传中');
                    var localId = res.localIds[0];

                    wx.uploadImage({
                        localId: localId,
                        isShowProgressTips: 0,
                        success: function (res2) {
                            var photo = res2.serverId;

                            $.ajax({
                                url: '../Async.ashx?method=UploadAvatar',
                                type: 'post',
                                data: {
                                    photo: photo
                                },
                                dataType: 'json',
                                success: function (result) {
                                    hideSending();

                                    $('#avatararea').css('background-image', 'url(../' + result.url + ')');
                                }
                            });
                        }
                    });
                }
            });
        });
    </script>
</asp:Content>
