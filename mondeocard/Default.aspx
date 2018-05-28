<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Web.Default" %>

<!DOCTYPE html>

<html lang="zh-cn">
<head runat="server">
    <meta name="viewport" content="width=device-width, user-scalable=no,initial-scale=1" />
    <meta charset="utf-8" />
    <title>新蒙迪欧•福运中国年</title>
    <link href="SceneLib/scenelib.css" rel="stylesheet" />
    <link href="main.css" rel="stylesheet" />
    <script src="js/jquery-2.1.1.min.js"></script>
    <script src="SceneLib/SceneLib.js"></script>
    <script src="js/mondeo.js"></script>
    <script src="js/wxshare.js"></script>
    <script src="js/image.js"></script>
    <script>
        var _hmt = _hmt || [];
        (function () {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?3d80c311a912a7edf0dd2ca75eb08f3d";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
</script>

</head>
<body>
    

    

    <div id="pages" style="display: none;">
        
    </div>

    <div class="rec" style="display: none;">
        <table>
            <tr>
                <td><img src="img/icon_rec.png" /><br />录音中<br />点击图标即可完成录音</td>
            </tr>
        </table>
    </div>

    <div class="message" style="display: none;">
        <table>
            <tr>
                <td></td>
            </tr>
        </table>
    </div>

    <div class="sharetip" style="display: none;" onclick="$('.sharetip').hide();">
        <img src="img/sharetip.png" />
    </div>
</body>
</html>
