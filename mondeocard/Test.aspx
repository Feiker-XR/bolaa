<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Test.aspx.cs" Inherits="Web.Test" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta name="viewport" content="width=device-width, user-scalable=no,initial-scale=1" />
    <meta charset="utf-8" />
    <title>蒙迪欧新春贺卡</title>
    <link href="SceneLib/scenelib.css" rel="stylesheet" />
    <link href="main.css" rel="stylesheet" />
    <script src="js/wxshare.js"></script>
    <script src="js/jquery-2.1.1.min.js"></script>
    <script src="js/image.js"></script>
</head>
<body>
    <div style="padding: 20px;">
        <input type="file" accept="image/jpg;image/jpeg;image/png" id="uploader" />
    </div>
    <script type="text/javascript">
        $('#uploader')[0].addEventListener('change', function (evt) {
            if (evt.target.files.length > 0) {
                var file = evt.target.files[0];

                var thumber = new MegaPixImage(file);
                thumber.onrender = function (canvas) {
                    alert(canvas.width + ',' + canvas.height);
                    alert(JPEGEncoder(canvas).substr(0, 23));
                };
                thumber.render(document.createElement('canvas'), {
                    maxWidth: 500,
                    maxHeight: 500
                });
            }
        });
    </script>
</body>
</html>
