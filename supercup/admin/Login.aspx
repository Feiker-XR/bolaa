<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="FordQuiz.admin.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="stylesheet" href="css/bootstrap.min.css" />
	<link rel="stylesheet" href="css/bootstrap-responsive.min.css" />
    <link rel="stylesheet" href="css/maruti-login.css" />
</head>
<body>
   <div id="logo">
        <img src="img/login-logo.png" alt="" />
    </div>
    <div id="loginbox">            
        <form id="loginform" class="form-vertical" action="Admin.aspx">
				<div class="control-group normal_text"><h3>福特问题竞猜</h3></div>
            <div class="control-group">
                <div class="controls">
                    <div class="main_input_box">
                        <span class="add-on"><i class="icon-user"></i></span><input type="text" name="username" placeholder="用户名" />
                    </div>
                </div>
            </div>
            <div class="control-group">
                <div class="controls">
                    <div class="main_input_box">
                        <span class="add-on"><i class="icon-lock"></i></span><input type="password" name="pwd" placeholder="密码" />
                    </div>
                </div>
            </div>
            <div class="form-actions">
                <span class="pull-left"><a href="#" class="flip-link btn btn-warning" id="to-recover">忘记密码</a></span>
                <span class="pull-right"><input type="submit" class="btn btn-success" value="登录" /></span>
            </div>
        </form>
          
    </div>
    <script>
        if ("<%= msg%>" == "error") {
            alert("用户名或者密码不对！");
        }
    </script>
</body>
</html>
