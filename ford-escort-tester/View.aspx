<%@ Page Title="经销商详情" Language="C#" MasterPageFile="~/SiteMaster.Master" AutoEventWireup="true" CodeBehind="View.aspx.cs" Inherits="Website.View" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
    <script type="text/javascript" src="http://api.map.baidu.com/api?type=quick&ak=81E78A58341797295ad59211beb58670&v=1.0"></script>
    <script type="text/javascript">
        function showMap(element, name, lat, lng) {
            var map = new BMap.Map(element);
            var point = new BMap.Point(lng, lat);
            var marker = new BMap.Marker(point);
            map.centerAndZoom(point, 15);
            //map.addOverlay(marker);

            var opts = {
                width: 100,     // 信息窗口宽度      
                height: 50,     // 信息窗口高度      
                title: ''  // 信息窗口标题     
            }
            var infoWindow = new BMap.InfoWindow(name, opts);  // 创建信息窗口对象      
            map.openInfoWindow(infoWindow, point);
        }
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Main" runat="server">
    <div class="map" id="map"></div>
    <script type="text/javascript">
        var pInfo = {
            name: '<%=CommonLibrary.Convert.ToString(rowInfo["Name"]) %>',
            address: '<%=CommonLibrary.Convert.ToString(rowInfo["Address"]) %>',
            phone: '<%=CommonLibrary.Convert.ToString(rowInfo["Phone"]) %>',
            lat: <%=rowInfo["Lat"] %>,
            lng: <%=rowInfo["Lng"] %>
        };

        showMap('map', pInfo.name, pInfo.lat, pInfo.lng);
	</script>
    <div class="info">
    	<div class="name"><%=Server.HtmlEncode(CommonLibrary.Convert.ToString(rowInfo["Name"])) %></div>
        <p>
        <b>地址</b><br />
        <%=Server.HtmlEncode(CommonLibrary.Convert.ToString(rowInfo["Address"])) %><br />
        <br />
<%--        <b>邮编</b><br />
        <%=Server.HtmlEncode(CommonLibrary.Convert.ToString(rowInfo["PostCode"])) %><br />--%>
        <br />
        <b>电话</b><br />
        <%=Server.HtmlEncode(CommonLibrary.Convert.ToString(rowInfo["Phone"])) %>
        </p>
    </div>
</asp:Content>
