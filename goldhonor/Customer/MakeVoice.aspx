<%@ Page Title="" Language="C#" MasterPageFile="~/Customer/Customer.Master" AutoEventWireup="true" CodeBehind="MakeVoice.aspx.cs" Inherits="Web.Customer.MakeVoice" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="wrap bg1">
        <img src="img/top.jpg" class="img-responsive" />
        <img src="img/top.png" class="img-responsive" />
        <div class="container voice">
            <h4 class="title">我为金欧诺代言</h4>
            <div class="intro">录制一段我为金欧诺代言的语音，每分享一个好友且好友点击播放该代言语音分享者即可获得1个分享点，每5个分享点即可累计获得1次抽奖机会；累计最多可获得5次抽奖机会。</div>
            
            <div class="row" style="margin-top: 10px;">
                <div class="col-xs-6 col-xs-offset-3">
                    <a class="btn btn-primary text-center" style="width: 100%;" onclick="selectPhoto();">上传爱车照片</a>
                    
                </div>
                <div class="clearfix"></div>
                <div class="col-xs-6 col-xs-offset-3" style="margin-top: 10px;">
                    <div class="carphoto thumbnail"></div>
                </div>
                <div class="clearfix"></div>
            </div>
            
            <div class="thevoice clearfix center-block">
                <div class="arr">
                    <img src="img/voice_arr.png" />
                </div>
                <div class="block"></div>
            </div>
            <div class="recorder" style="visibility: hidden;">
                <img src="img/record.png" class="img-responsive" />
                <img src="img/record_on.png" class="on" />
                <div class="tip">点击按钮开始录制</div>
                <div class="mask"></div>
            </div>
            <div class="row" style="margin-top: 15px; visibility: hidden;" id="btns">
                <div class="col-xs-5 col-xs-offset-1">
                    <img src="img/btn_record.png" class="img-responsive" onclick="backRecord();" />
                </div>
                <div class="col-xs-5">
                    <img src="img/btn_share.png" class="img-responsive" onclick="uploadMedia();" />
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" data-backdrop="static" id="dlg_uploading">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                            <span class="sr-only">45% Complete</span>
                        </div>
                    </div>
                    <h5 class="text-center">上传中...</h5>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>

    <div class="sharetip" style="display: none;" onclick="$('.sharetip').hide();">
        <img src="img/sharetip.png" />
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptArea" runat="server">
    <script type="text/javascript">
        var recoding = false;
        var media = null;

        var first = true;

        var playing = false;

        var timetick = 0;

        var uploaded = false;

        var photo = null;

        function backRecord() {
            uploaded = false;
            media = null;
            $('.thevoice, #btns').css('visibility', 'hidden');
            $('.recorder').css('visibility', 'visible');

            $('.tip').text('点击按钮开始录制');

            WXENV.shareData.desc = '购长安金欧诺，赢荣耀千足金牌';
            WXENV.shareData.imgUrl = 'http://goldhonor.e2capp.com/customer/img/wxlogo.jpg';
            WXENV.shareData.link = 'http://goldhonor.e2capp.com/customer/';
            WXENV.shareData.title = '购欧诺·赢金牌';
            WXENV.updateShareData();
            //wx.hideAllNonBaseMenuItem();
        }

        function uploadMedia() {
            if (media == null) return;

            if (photo == null) {
                showAlert('请上传爱车照片');
                return;
            }

            if (uploaded)
            {
                $('.sharetip').show();
                return;
            }

            $('#dlg_uploading').modal();

            wx.uploadVoice({
                localId: media,
                isShowProgressTips: 0,
                success: function (res) {
                    var serverId = res.serverId;
                    wx.uploadImage({
                        localId: photo, // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 0, // 默认为1，显示进度提示
                        success: function (res) {
                            var photo_serverId = res.serverId; // 返回图片的服务器端ID
                            alert(photo_serverId);
                            $.ajax({
                                url: '../Async.ashx?method=AddVoice',
                                type: 'post',
                                data: {
                                    media_id: serverId,
                                    photo: photo_serverId,
                                },
                                dataType: 'json',
                                success: function (result) {
                                    $('#dlg_uploading').modal('hide');
                                    if (result.result == 1) {
                                        WXENV.shareData.link = 'http://goldhonor.e2capp.com/customer/playvoice.aspx?id=' + result.id;
                                        WXENV.shareData.imgUrl = 'http://goldhonor.e2capp.com/customer/img/wxlogo.jpg';
                                        WXENV.shareData.title = '我为欧诺代言';
                                        WXENV.shareData.desc = '我录制了一段为欧诺代言的语音，小伙伴们来听听吧！';
                                        WXENV.updateShareData();
                                        //wx.showAllNonBaseMenuItem();
                                        uploaded = true;
                                        $('.sharetip').show();
                                    }
                                }
                            });
                        }
                    });

                    

                    
                }
            });
        }

        document.addEventListener('touchstart', function () {
            if (first) {
                document.removeEventListener('touchstart', arguments.callee);
                wx.stopRecord();
                first = false;
            }
        });

        function selectPhoto() {
            wx.chooseImage({
                success: function (res) {
                    photo = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    $('.carphoto').empty().append($('<img />').attr('src', photo));
                }
            });
        };

        WXENV.addReadyHandler(function () {
            wx.startRecord();
            setTimeout(function () {
                wx.stopRecord({
                    success: function () {
                        first = false;
                    }
                });
                $('.recorder').css('visibility', 'visible');
            }, 500);

            wx.onVoicePlayEnd({
                success: function () {
                    playing = false;
                    stopPlay();
                }
            });
        });

        $(function () {
            $('.recorder .mask').on('click', function (evt) {
                if (media != null) return;
                //evt.preventDefault();
                if (!recoding) {
                    recoding = true;
                    $('.recorder').addClass('on');
                    $('.tip').text('再次点击完成录制');
                    timetick = new Date().valueOf();
                    setTimeout(function () {
                        wx.startRecord();
                    }, 0);
                    //
                }
                else {
                    $('.recorder').removeClass('on');
                    recoding = false;
                    var duration = new Date().valueOf() - timetick;
                    if (duration >= 1000) {
                        setTimeout(function () {
                            wx.stopRecord({
                                success: function (res) {
                                    media = res.localId;
                                    $('.thevoice .block').text(Math.floor(duration / 1000) + '"');
                                    $('.thevoice, #btns').css('visibility', 'visible');
                                    $('.recorder').css('visibility', 'hidden');
                                }
                            });
                        }, 0);

                    }
                    else {
                        setTimeout(function () {
                            wx.stopRecord();
                        }, 0);
                        //wx.stopRecord();
                    }
                }
            });

            //document.addEventListener('touchmove', function (evt) {
            //    if (recoding) {
            //        //evt.preventDefault();

            //        if(evt.touches[0].pageY < $('.recorder').offset().top)
            //        {
            //            $('.recorder').removeClass('on');
            //            recoding = false;
            //            setTimeout(function () {
            //                wx.stopRecord();
            //            }, 0);
            //            //wx.stopRecord();
            //        }
            //    }
            //});

            //document.addEventListener('touchend', function (evt) {
            //    if (recoding) {
            //        $('.recorder').removeClass('on');
            //        recoding = false;
            //        var duration = new Date().valueOf() - timetick;
            //        if (duration >= 1000) {
            //            setTimeout(function () {
            //                wx.stopRecord({
            //                    success: function (res) {
            //                        media = res.localId;
            //                        $('.thevoice, #btns').css('visibility', 'visible');
            //                    }
            //                });
            //            }, 0);

            //        }
            //        else {
            //            setTimeout(function () {
            //                wx.stopRecord();
            //            }, 0);
            //            //wx.stopRecord();
            //        }
            //    }
            //});

            $('.thevoice').click(function () {
                if (playing) {
                    wx.stopVoice({
                        localId: media
                    });
                }
                else {
                    wx.playVoice({
                        localId: media
                    });
                    startPlay();
                }
            });
        });

        var t1 = 0;
        var t2 = 0;
        var t3 = 0;
        var t4;
        function startPlay() {
            $('.play img').hide();
            t1 = setTimeout(function () {
                $('.play img').eq(0).show();
            }, 600);
            t2 = setTimeout(function () {
                $('.play img').eq(1).show();
            }, 1200);
            t2 = setTimeout(function () {
                $('.play img').eq(2).show();
            }, 1800);
            t3 = setTimeout(function () {
                $('.play img').hide();
            }, 2400);
            t4 = setTimeout(startPlay, 3000);
        }

        function stopPlay() {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
            $('.play img').show();
        }
    </script>
</asp:Content>
