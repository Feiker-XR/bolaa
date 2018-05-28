<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Web.Admin.Login" %>

<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>用户登录</title>
    <link href="js/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="signin.css" rel="stylesheet" />
    <link href="admin.css" rel="stylesheet" />
    
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="js/bootstrap/html5shiv.min.js"></script>
      <script src="js/bootstrap/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <div class="container">

      <form class="form-signin" role="form" id="form1" runat="server">
        <h2 class="form-signin-heading">用户登录</h2>
        <input id="username" runat="server" type="text" class="form-control" placeholder="帐号" required="required" autofocus="autofocus" />
        <input id="password" runat="server" type="password" class="form-control" placeholder="密码" required="required" />
        <button class="btn btn-lg btn-primary btn-block" type="submit">登 录</button>
      </form>

    </div>
  </body>
</html>
