<%@ Page Title="论坛抽奖码记录" Language="C#" MasterPageFile="~/Admin/AdminMaster.Master" AutoEventWireup="true" CodeBehind="CodeLogs.aspx.cs" Inherits="Web.Admin.CodeLogs" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
    <script type="text/javascript">
        SIDE_MENU = 'CodeLogs';
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="page-header">
        <h4>论坛抽奖码记录</h4>
    </div>
    <div class="table-responsive">
        <table class="table table-strip">
            <thead>
                <tr>
                    <th>抽奖码</th>
                    <th>生成时间</th>
                    <th>使用状态</th>
                </tr>
            </thead>
            <tbody>
                <%
                    foreach (System.Data.DataRow row in dtList.Rows)
                    {
                %>
                <tr>
                    <td><%=row["code"] %></td>
                    <td><%=CommonLibrary.Convert.ToDateTime(row["expires"]).AddDays(-3).ToString() %></td>
                    <td><%=row["openid"] is DBNull ? "未使用" : "已使用" %></td>
                </tr>
                <%
                    }
                %>
            </tbody>
        </table>
    </div>

    <nav>
        <ul class="pagination">
            <li class="disabled"><span>共<%=total %>条记录，总<%=pages %>页</span></li>
            <li><a href="CodeLogs.aspx?p=1">首页</a></li>
            <%
                for (int i = page - 3; i <= page + 3; i++)
                {
                    if (i < 1) continue;
                    if (i > pages) break;
            %>
            <li <%=i == page ? "class=\"active\"" : "" %>><a href="CodeLogs.aspx?p=<%=i %>"><%=i %></a></li>
            <%
                }
            %>
            <li><a href="CodeLogs.aspx?p=<%=pages %>">尾页</a></li>
        </ul>
    </nav>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="DialogArea" runat="server">
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptArea" runat="server">
</asp:Content>
