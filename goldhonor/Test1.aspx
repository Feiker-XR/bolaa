<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Test1.aspx.cs" Inherits="Web.Test1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form method="post" action="Test2.aspx">
        <input type="text" id="openid" name="openid" />
        <input type="hidden" name="action" value="create" />
        <input type="submit" id="submit" value="submit" />
    </form>
</body>
</html>
