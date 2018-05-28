<%@ Page Title="" Language="C#" MasterPageFile="~/Customer/Customer.Master" AutoEventWireup="true" CodeBehind="Bind.aspx.cs" Inherits="Web.Customer.Bind" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
    <link href="../datetimepicker/css/bootstrap-datepicker.min.css" rel="stylesheet" />
    <script src="../js/city.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="wrap bg1">
        <img src="img/top.jpg" class="img-responsive" />
        <img src="img/top.png" class="img-responsive" />

        <div class="container" id="personform">
            <h4 class="text-primary text-center">绑定个人信息</h4>
            <ul class="list-group form">
                <li class="list-group-item icon_person">
                    <input type="text" class="form-control" placeholder="姓名" id="name" maxlength="20" />
                </li>
                <li class="list-group-item icon_call">
                    <input type="tel" class="form-control" placeholder="手机号" id="phone" maxlength="11" />
                </li>
                <li class="list-group-item icon_shield">
                    <div class="input-group">
                        <input type="tel" class="form-control" placeholder="验证码" id="vcode" maxlength="6" />
                        <span class="input-group-btn">
                            <button type="button" class="btn btn-primary" id="btn_vcode" onclick="getVCode();" data-countdown="0">获取验证码</button>
                        </span>
                    </div>
                </li>
                <li class="list-group-item icon_card">
                    <input type="text" class="form-control" placeholder="身份证号" id="idcode" maxlength="18" />
                </li>

                <li class="list-group-item icon_question">
                     <div class="droplist">
                        <select id="prov">
                            <option value="">请选择</option>
                        </select>
                        <input type="text" class="form-control" placeholder="省" />
                    </div>
                    <div class="droplist">
                        <select id="city">
                            <option value="">请选择</option>
                        </select>
                        <input type="text" class="form-control" placeholder="市" />
                    </div>
                    <div class="droplist">
                        <select id="area">
                            <option value="">请选择</option>
                        </select>
                        <input type="text" class="form-control" placeholder="地区" />
                    </div>
                </li>
                
            </ul>

            <div class="row">
                <img src="img/btn_next.png" class="col-xs-4 col-xs-offset-4" onclick="goNext();" />
            </div>
        </div>

        <div class="container" id="carform" style="display: none;">
            <h4 class="text-primary text-center">绑定车辆信息</h4>

            <ul class="list-group form">
                
                <li class="list-group-item icon_car">
                    <div class="droplist">
                        <select id="cartype">
                            <option value="">请选择</option>
                            <option>金欧诺标准型</option>
                            <option>金欧诺精英型</option>
                            <option>金欧诺豪华型</option>
                        </select>
                        <input type="text" class="form-control" placeholder="所购车型" />
                    </div>
                </li>


                <li class="list-group-item icon_star">
                    <input type="text" class="form-control" placeholder="购车日期" id="sale_date" />
                </li>
                <li class="list-group-item icon_info">
                    <input type="text" class="form-control" placeholder="购车发票号" id="receipt_code" />
                </li>

                <li class="list-group-item icon_clock">
                    <input type="text" class="form-control" placeholder="车架号" maxlength="17" id="vin" />
                </li>
                <%
                    if(Web.PageBase.NeedCard(this.Context))
                    {
                %>
                <li class="list-group-item icon_card">
                    <div>
                        <a class="btn btn-primary pull-left" onclick="selectCarCard();">上传行驶证照片</a>
                        <a class="btn btn-success pull-right" onclick="previewCarCard();">查看示例</a>
                        <div class="clearfix"></div>
                    </div>
                    <div class="thumbnail carphoto" style="margin-top: 5px;"></div>
                </li>
                <%
                    }
                %>
            </ul>

            <div class="row">
                <img src="img/btn_prev.png" class="col-xs-4 col-xs-offset-2" onclick="goPrev();" />
                <img src="img/btn_submit.png" class="col-xs-4" onclick="submitForm();" />
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptArea" runat="server">
    <script src="../datetimepicker/js/bootstrap-datepicker.min.js"></script>
    <script src="../datetimepicker/locales/bootstrap-datepicker.zh-CN.min.js"></script>
    
    <script type="text/javascript">
        var photo = null;

        function selectCarCard() {
            wx.chooseImage({
                success: function (res) {
                    photo = res.localIds[0];

                    $('.carphoto').empty().append($('<img />').attr('src', photo));
                }
            });
        }

        function previewCarCard() {
            wx.previewImage({
                current: 'http://goldhonor.e2capp.com/customer/img/example.jpg', // 当前显示的图片链接
                urls: ['http://goldhonor.e2capp.com/customer/img/example.jpg'] // 需要预览的图片链接列表
            });
        }

        $(function () {
            $('#sale_date').datepicker({
                autoclose: true,
                startDate: new Date(2015, 3, 1),
                endDate: new Date(),
                language: 'zh-CN',
                format: 'yyyy/mm/dd'
            });

            for (var i = 0; i < PROV.length; i++) {
                var name = PROV[i].name;
                $('<option></option>').attr('value', name).text(name).appendTo($('#prov'));
            }

            onProvChange();
        });

        function goNext() {
            var data = {
                name: $.trim($('#name').val()),
                phone: $.trim($('#phone').val()),
                idcode: $.trim($('#idcode').val()),
                vcode: $.trim($('#vcode').val()),
                prov: $.trim($('#prov').val()),
                city: $.trim($('#city').val()),
                area: $.trim($('#area').val())
            };

            if (data.name == '') {
                showAlert('请输入姓名');
                return;
            }

            if (data.phone == '') {
                showAlert('请输入手机号');
                return;
            }

            if (data.idcode == '') {
                showAlert('请输入身份证号');
                return;
            }

            if (data.vcode == '') {
                showAlert('请输入验证码');
                return;
            }

            if (data.prov == '' || data.city == '' || data.area == '') {
                showAlert('请选择所在地区');
                return;
            }

            $('#carform').show();
            $('#personform').hide();
        }

        function goPrev() {
            $('#carform').hide();
            $('#personform').show();
        }

        function onProvChange() {
            var prov = $('#prov').val();
            $('#city').empty().append($('<option value="">请选择</option>'));
            if (prov != '') {
                for (var i = 0; i < PROV.length; i++) {
                    if (PROV[i].name == prov) {
                        for (var j = 0; j < PROV[i].cities.length; j++) {
                            var name = PROV[i].cities[j].name;
                            $('<option></option>').attr('value', name).text(name).appendTo($('#city'));
                        }
                        break;
                    }
                }
            }
            $('#city').next('.form-control').val('');
            onCityChange();
        }

        function onCityChange() {
            var prov = $('#prov').val();
            var city = $('#city').val();
            $('#area').empty().append($('<option value="">请选择</option>'));
            if (city != '') {
                for (var i = 0; i < PROV.length; i++) {
                    if (PROV[i].name == prov) {
                        for (var j = 0; j < PROV[i].cities.length; j++) {
                            if (PROV[i].cities[j].name == city) {
                                for (var k = 0; k < PROV[i].cities[j].areas.length; k++) {
                                    var name = PROV[i].cities[j].areas[k];
                                    $('<option></option>').attr('value', name).text(name).appendTo($('#area'));
                                }
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            $('#area').next('.form-control').val('');
        }

        $('#prov').change(onProvChange);
        $('#city').change(onCityChange);

        function getVCode() {
            var phone = $.trim($('#phone').val());

            if (phone.length != 11 || !/1[0-9]{10}/.test(phone)) {
                showAlert('请输入有效手机号');
                return;
            }

            $.ajax({
                url: '../Async.ashx?method=SendVCode',
                type: 'post',
                data: {
                    phone: phone
                },
                dataType: 'json',
                success: function (result) {
                    showAlert('验证码已发送<br />验证码有效期为30分钟<br />仅对当前手机有效。', true);
                    console.log(result.code);
                    //$('#vcode').val(result.code);
                }
            });

            $('#btn_vcode').attr('data-countdown', '60').text('60秒后重新获取')[0].disabled = true;
            $('#btn_vcode')[0].countdownTimer = setInterval(function () {
                var countdown = parseInt($('#btn_vcode').attr('data-countdown'));
                countdown--;
                $('#btn_vcode').attr('data-countdown', countdown);
                if (countdown <= 0) {
                    clearInterval($('#btn_vcode')[0].countdownTimer);
                    $('#btn_vcode').text('获取验证码')[0].disabled = false;
                }
                else {
                    $('#btn_vcode').text(countdown + '秒后重新获取');
                }
            }, 1000);
        }

        function submitForm() {
            showSending();

            var data = {
                cartype: $.trim($('#cartype').val()),
                //engine_no: $.trim($('#engine_no').val()),
                vin: $.trim($('#vin').val()),
                name: $.trim($('#name').val()),
                phone: $.trim($('#phone').val()),
                idcode: $.trim($('#idcode').val()),
                sale_date: $.trim($('#sale_date').val()),
                receipt_code: $.trim($('#receipt_code').val()),
                vcode: $.trim($('#vcode').val()),
                prov: $.trim($('#prov').val()),
                city: $.trim($('#city').val()),
                area: $.trim($('#area').val()),
                photo: ''
            };

            var sendFunc = function (data) {
                $.ajax({
                    url: '../Async.ashx?method=BindCustomer',
                    type: 'post',
                    data: data,
                    dataType: 'json',
                    success: function (result) {
                        hideSending();
                        if (result.result == 1) {
                            if (result.check == 1) {
                                window.location.href = 'BindSuccess.aspx';
                            }
                            else {
                                window.location.href = 'BindWait.aspx';
                            }
                        }
                        else if (result.result == 0) {
                            window.location.reload();
                        }
                        else {
                            showAlert(result.msg);
                        }
                    }
                });
            };

            if (photo != null) {
                wx.uploadImage({
                    localId: photo,
                    isShowProgressTips: 0,
                    success: function (res) {
                        data.photo = res.serverId;

                        sendFunc(data);
                    }
                });
            }
            else {
                sendFunc(data);
            }
        }
    </script>
</asp:Content>
