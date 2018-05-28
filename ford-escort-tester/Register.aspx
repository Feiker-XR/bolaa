<%@ Page Title="预约试驾" Language="C#" MasterPageFile="~/SiteMaster.Master" AutoEventWireup="true" CodeBehind="Register.aspx.cs" Inherits="Website.Register" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
    <script type="text/javascript" src="http://ip.bitauto.com/iplocation/setcookie.ashx"></script>
    <script type="text/javascript">
        var regions = <%=Newtonsoft.Json.JsonConvert.SerializeObject(regions) %>;
        var lastProv = "";
        var lastCity = "";

        window.addEvent('domready', function () {
            var mask = $('dealermask');
            var fdealer = $('fdealer');
            var fsize = fdealer.getSize();
            mask.setStyles({
                width: fsize.x + 'px',
                height: fsize.y + 'px'
            });

            var cityname = bit_locationInfo.cityName;
            var provname = "";
            if (bit_locationInfo.originLocation.indexOf("省") == -1)
                provname = bit_locationInfo.originLocation.substring(0, bit_locationInfo.originLocation.indexOf("市"));
            else
                provname = bit_locationInfo.originLocation.substring(0, bit_locationInfo.originLocation.indexOf("省"));

            if (cityname == "" || provname == "") {
                provname = "北京";
                cityname = "北京";
            }

            $('fprov').value = provname;
            onProvChange();
            $('fcity').value = cityname;
            onCityChange();
        });

        function onProvChange() {
            if(lastProv == $('fprov').value) return;
            lastProv = $('fprov').value;
            lastCity = "";
            var provs = regions[lastProv];
            var fcity = $('fcity');
            fcity.empty();
            for(var i = 0; i < provs.length; i++)
            {
                fcity.appendChild(new Element('option', {
                    text: provs[i],
                    value: provs[i]
                }));
            }
            
        }

        function onCityChange() {
            if(lastCity == $('fcity').value) return;
            lastCity = $('fcity').value;
            $('fdealer').empty();
            $('fdealer').appendChild(new Element('option', {
                value: '',
                text: '选择经销商'
            }));
        }
        function onbands(){
        var Code=$('bands').value;
             new Request.JSON({
                url: 'HandlerCar.ashx',
                onSuccess: function (result) {
                    var dlist = $('types');$('types').empty();
                    var select = document.getElementById("types"); 
                    for (var i = 0; i < result.length; i++) {
                        var data = result[i];
                            var theOption=document.createElement("option");
                            theOption.innerHTML=data.name;
                            theOption.value=data.name;
                        select.appendChild(theOption);
                    }
                }
            }).send(Object.toQueryString({ Code: Code }));
        }
        function selectDealer() {
            var city = $('fcity').value;
            if (city == '') {
                alert('请先选择城市');
                return;
            }

            $('listmask').show();
            $('dlist').empty();

            new Request.JSON({
                url: 'GetDealers.ashx',
                onSuccess: function (result) {
                    var dlist = $('dlist');
                    for (var i = 0; i < result.length; i++) {
                        var data = result[i];

                        var a = new Element('a');
                        var span = a.appendChild(new Element('span'));
                        span.appendChild(new Element('b', {
                            text: data.name
                        }));
                        span.appendChild(new Element('div',{
                            text:"地址："+data.address
                        }));
                        span.appendChild(new Element('div',{
                            text:"电话："+data.Phone
                        }));
                        //span.appendText('地址：' + data.address);
                        a.binddata = data;
                        dlist.appendChild(a);

                        a.addEvent('click', (function () {
                            $('fdealer').empty();
                            $('fdealer').appendChild(new Element('option', {
                                text: this.binddata.name,
                                value: this.binddata.name
                            }));
                            $('listmask').hide();
                            $('dealerlist').hide();
                        }).bind(a));
                    }

                    $('dealerlist').show();
                }
            }).send(Object.toQueryString({ city: city }));
            window.scrollTo(0, 0);
        }
        function sub(){
           document.getElementById("form1").submit();
        }
    </script>
<style type="text/css">
  .rline label{ float:left; padding-top:6px; width:30%; text-align:right;font-size: large;font-family: 微软雅黑; margin-right:10px;color:#6a3900; font-weight: bolder;text-shadow: 2px 2px 1px #fff;}
  .rline .rbox{ width:60%; height:30px;}
  .rline .prov, .rline .city{ width:29%; margin-right:5px; height:30px;}
  .rline .btnx{text-align: center;padding-top: 35px;width: 50%;margin-left: 32%;}
  .rline .btnx img{ width:100%;}
  .listmask{background-color: #aa7f5d;}
  .dealerlist{ width:90%; margin-left:5%;}
  .dlist{background:#f2f2f2;}
   #dealermask{ margin-left:30%;}
  .dealerlist .head{ text-align:left;color:#fff;}
  .dlist a {border-bottom: 1px solid #672c00; background:#f2f2f2; margin-left:10px;margin-right: 10px;}
  .dlist a span{padding-top: 10px;padding-bottom: 10px;}
  .dlist a span div{ font-weight:bold;}
  .dlist a b{color:#824c22;}
</style>    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Main" runat="server">

    <div class="reg" style="padding-top:20px;">
        <form id="form1" action="DoRegister.ashx" method="post">
        <input type="hidden" name="type" id="ftype" value="<%=BrandCode %>" />
        <div class="rline">
            <label>姓名</label>
            <input type="input" class="rbox" name="name" id="fname" />
        </div>
        <div class="rline">
            <label>联系电话</label>
            <input type="input" class="rbox" name="phone" id="fphone" />
        </div>
        <div class="rline">
            <% 
                string type=Request.QueryString["type"];
 
                string address = "";
                if (type == "fordXd" || type == "fordHz") { address = "所在地选择"; } else { address = "经销商选择"; }
                
             %>
            <label><%=address%></label>
            <select class="prov" name="prov" id="fprov" onchange="onProvChange();">
            <% foreach (string prov in regions.Keys)
             {
            %>
            <option><%=Server.HtmlEncode(prov)%></option>
            <% } %>
            </select>
            <select class="city" name="city" id="fcity" onchange="onCityChange();" style="float:left;"><option value="">选择城市</option></select>
        </div>
        <div class="rline">
            <label>&nbsp;&nbsp;</label>
            <div id="dealermask" onclick="selectDealer();"></div>
            <select class="rbox" id="fdealer" name="dealer"><option>选择经销商</option></select>
        </div>
        <div class="rline">
            <label>备注</label>
            <input type="text" class="rbox"  name="note" id="fnode" />
        </div>
        <div class="rline">
            <%--<input type="submit" value="提交" class="btnx" style="background:url(img/btn.png)" />--%>
            <div class="btnx"><img src="img/btn.png"  onclick="sub()" /></div>
            
        </div>
        </form>
    </div>
 
    <div class="listmask" id="listmask" style="display: none;"></div>
    <div class="dealerlist" id="dealerlist" style="display: none;">
        <a class="close" onclick="$('listmask').hide(); $('dealerlist').hide();"></a>
        <div class="head">选择经销商</div>
        <div id="dlist" class="dlist"></div>
    </div>
</asp:Content>
