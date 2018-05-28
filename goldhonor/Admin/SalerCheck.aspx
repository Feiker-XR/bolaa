<%@ Page Title="销售人员审核" Language="C#" MasterPageFile="~/Admin/AdminMaster.Master" AutoEventWireup="true" CodeBehind="SalerCheck.aspx.cs" Inherits="Web.Admin.SalerCheck" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
    <script type="text/javascript">
        SIDE_MENU = "SalerCheck";
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="page-header">
        <h4>销售人员审核</h4>
    </div>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th>个人信息</th>
                <th>门店信息</th>
                <th>提交时间</th>
                <th>&nbsp;</th>
            </tr>
        </thead>
        <tbody>
            <%
                foreach(System.Data.DataRow row in dtList.Rows)
                {
            %>
            <tr id="row_<%=row["openid"] %>">
                <td>
                    <b><%=Server.HtmlEncode(CommonLibrary.Convert.ToString(row["name"])) %></b> <%=row["phone"] %><br />
                    身份证：<%=row["idcode"] %>
                </td>
                <td>
                    <%=Server.HtmlEncode(CommonLibrary.Convert.ToString(row["dealer_name"])) %>
                </td>
                <td>
                    <%=CommonLibrary.Convert.ToDateTime(row["update_time"]).ToShortDateString() %><br />
                    <%=CommonLibrary.Convert.ToDateTime(row["update_time"]).ToString("HH:mm:ss") %>
                </td>
                <td>
                    <a class="btn btn-success" onclick="checkState('<%=row["openid"] %>', <%=Newtonsoft.Json.JsonConvert.SerializeObject(row["name"]) %>, 1);">通过</a>
                    <a class="btn btn-danger" onclick="checkState('<%=row["openid"] %>', <%=Newtonsoft.Json.JsonConvert.SerializeObject(row["name"]) %>, -1);">不通过</a>
                </td>
            </tr>
            <%
                }
            %>
        </tbody>
    </table>

    <nav>
        <ul class="pagination">
            <li class="disabled"><span>共<%=total %>条记录，总<%=pages %>页</span></li>
            <li><a href="SalerCheck.aspx?p=1">首页</a></li>
            <%
                for (int i = page - 3; i <= page + 3; i++)
                {
                    if (i < 1) continue;
                    if (i > pages) break;
            %>
            <li <%=i == page ? "class=\"active\"" : "" %>><a href="SalerCheck.aspx?p=<%=i %>"><%=i %></a></li>
            <%
                }
            %>
            <li><a href="SalerCheck.aspx?p=<%=pages %>">尾页</a></li>
        </ul>
    </nav>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="DialogArea" runat="server">
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptArea" runat="server">
    <script type="text/javascript">
        function checkState(openid, name, check) {
            if(!confirm('确认要' + (check == 1 ? '' : '不') + '通过【' + name + '】的个人信息？'))
            {
                return;
            }

            $.ajax({
                url: 'Async.ashx?method=SalerCheck',
                type: 'post',
                data: {
                    openid: openid,
                    check: check
                },
                success: function () {
                    $('#row_' + openid).remove();
                }
            });
        }
    </script>
</asp:Content>
