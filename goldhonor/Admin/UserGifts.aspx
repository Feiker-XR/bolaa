<%@ Page Title="车主中奖名单" Language="C#" MasterPageFile="~/Admin/AdminMaster.Master" AutoEventWireup="true" CodeBehind="UserGifts.aspx.cs" Inherits="Web.Admin.UserGifts" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
    <script type="text/javascript">
        SIDE_MENU = "UserGifts";
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="page-header">
        <h4>车主中奖名单</h4>
    </div>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th>个人信息</th>
                <th>车辆信息</th>
                <th>购车信息</th>
                <th>中奖信息</th>
            </tr>
        </thead>
        <tbody>
            <%
                foreach(System.Data.DataRow row in dtList.Rows)
                {
                    string v = string.Empty;
                    switch(CommonLibrary.Convert.ToInt32(row["result"]))
                    {
                        case 1:
                            v = "20g金牌";
                            break;
                        case 2:
                            v = "10g金牌";
                            break;
                        case 3:
                            v = "5g金牌";
                            break;
                        case 4:
                            v = "3g金牌";
                            break;
                    }
            %>
            <tr id="row_<%=row["openid"] %>">
                <td>
                    <b><%=Server.HtmlEncode(CommonLibrary.Convert.ToString(row["name"])) %></b> <%=row["phone"] %><br />
                    身份证：<%=row["idcode"] %>
                </td>
                <td>
                    发动机号：<%=row["engine_no"] %><br />
                    车架号：<%=row["vin"] %>
                </td>
                <td>
                    发票号：<%=row["receipt_code"] %><br />
                    购车日期：<%=CommonLibrary.Convert.ToDateTime(row["sale_date"]).ToShortDateString() %>
                </td>
                <td>
                    <%=v %><br />
                    <%=CommonLibrary.Convert.ToDateTime(row["add_time"]).ToString() %>
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
            <li><a href="CustomerCheck.aspx?p=1">首页</a></li>
            <%
                for (int i = page - 3; i <= page + 3; i++)
                {
                    if (i < 1) continue;
                    if (i > pages) break;
            %>
            <li <%=i == page ? "class=\"active\"" : "" %>><a href="CustomerCheck.aspx?p=<%=i %>"><%=i %></a></li>
            <%
                }
            %>
            <li><a href="CustomerCheck.aspx?p=<%=pages %>">尾页</a></li>
        </ul>
    </nav>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="DialogArea" runat="server">
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptArea" runat="server">
</asp:Content>
