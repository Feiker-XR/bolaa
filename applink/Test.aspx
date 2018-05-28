<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Test.aspx.cs" Inherits="Web.Test" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <style type="text/css">
        #block
        {
            position: absolute;
            width: 50px;
            height: 50px;
            display: block;
            background: red;
            transition: left 1s;
            -webkit-transition: left 1s;
            left: 0px;
            top: 0px;
        }

        #output
        {
            position: absolute;
            top: 60px;
        }
    </style>
    <script src="js/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="SceneLib/SceneLib.js"></script>
    <script type="text/javascript" src="SceneLib/EventDispatcher.js"></script>
    <script type="text/javascript" src="SceneLib/TransitionManager.js" ></script>
   	<script type="text/javascript" src="SceneLib/AnimationManager.js" ></script>
   	<script type="text/javascript" src="SceneLib/Stage.js" ></script>
   	<script type="text/javascript" src="SceneLib/Page.js" ></script>
   	<script type="text/javascript" src="SceneLib/Content.js" ></script>
   	<script type="text/javascript" src="SceneLib/Navigator.js" ></script>
   	<script type="text/javascript" src="SceneLib/CustomNavigator.js" ></script>
   	<script type="text/javascript" src="SceneLib/SlideNavigator.js" ></script>
</head>
<body>
    <div id="block" onclick="$(this).css('left', '150px');"></div>
    <div class="output"></div>
    <script type="text/javascript">
        $(function () {
            SL.TransitionManager.addEventListener(document.getElementById('block'), '', function (evt) {
                $('.output').text('complete');
            });
        });
    </script>
</body>
</html>
