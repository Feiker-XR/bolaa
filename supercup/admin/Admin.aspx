<%@ Page Title="" Language="C#" MasterPageFile="~/admin/admin.Master" AutoEventWireup="true" CodeBehind="Admin.aspx.cs" Inherits="FordQuiz.admin.Admin" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
         <div class="row-fluid">
		    <div class="span12">
                <div class="widget-box">
                  <div class="widget-title"> <span class="icon"> <i class="icon-th"></i> </span>
                    <h5>用户信息</h5>
                  </div>
                  <div class="widget-content nopadding">
                    <table class="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>用户姓名</th>
                          <th>手机号码</th>
                          <th>提交答案</th>
                          <th>分数</th>
                          <th>参与时间</th>
                        </tr>
                      </thead>
                      <tbody>
                          <tr><td colspan="5">合计：<%= count %></td></tr>
                         <%=trList %>
                      </tbody>
                    </table>
                  </div>
                </div>
            </div>
        </div>
    </div>	
</asp:Content>
