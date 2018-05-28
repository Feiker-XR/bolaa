<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Website.Admin.Login" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>后台登录</title>
</head>
<body style="background-color:#FAFFF1;">
    <form id="form1" runat="server">
    <div>
    <table style="margin-top:20%;margin-left:40%; line-height:30px;">
     <tr><td colspan="2" style="text-align:center; font-size:16px; font-weight:bold;">福特预约试驾后台</td></tr>
    <tr><td style="text-align:right;">用户名：</td><td><asp:TextBox ID="Username" runat="server" /></td></tr>
    <tr><td style="text-align:right;">密码：</td><td><asp:TextBox ID="Password" runat="server" TextMode="Password" /></td></tr>
    <tr><td colspan="2" style="text-align:center;"><asp:Button ID="BtnSubmit" runat="server" Text="登录" onclick="BtnSubmit_Click" style="width:150px;" /></td></tr>
   
    </table>
    <br />
    <br />
    
    </div>
    </form>
</body>
</html>
