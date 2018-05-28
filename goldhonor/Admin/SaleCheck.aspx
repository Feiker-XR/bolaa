<%@ Page Title="销售记录审核" Language="C#" MasterPageFile="~/Admin/AdminMaster.Master" AutoEventWireup="true" CodeBehind="SaleCheck.aspx.cs" Inherits="Web.Admin.SaleCheck" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
    <script type="text/javascript">
        SIDE_MENU = "SaleCheck";
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="page-header">
        <h4>销售记录审核</h4>
    </div>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th>销售人员信息</th>
                <th>车主信息</th>
                <th>车辆信息</th>
                <th>购买信息</th>
                <th>提交时间</th>
                <th>&nbsp;</th>
            </tr>
        </thead>
        <tbody>
            <%
                foreach(System.Data.DataRow row in dtList.Rows)
                {
            %>
            <tr id="row_<%=row["id"] %>">
                <td>
                    <%=Server.HtmlEncode(CommonLibrary.Convert.ToString(row["dealer_name"])) %><br />
                    <%=Server.HtmlEncode(CommonLibrary.Convert.ToString(row["saler_name"])) %>
                </td>
                <td>
                    <b><%=Server.HtmlEncode(CommonLibrary.Convert.ToString(row["customer_name"])) %></b> <%=row["customer_phone"] %><br />
                    身份证：<%=row["customer_idcode"] %>
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
                    <%=CommonLibrary.Convert.ToDateTime(row["add_time"]).ToShortDateString() %><br />
                    <%=CommonLibrary.Convert.ToDateTime(row["add_time"]).ToString("HH:mm:ss") %>
                </td>
                <td>
                    <a class="btn btn-primary" onclick="previewImage('<%=row["carimg"] %>');">查看行驶证</a>
                    <a class="btn btn-success" onclick="checkState(<%=row["id"] %>, '<%=row["vin"] %>', 1);">通过</a>
                    <a class="btn btn-danger" onclick="checkState(<%=row["id"] %>, '<%=row["vin"] %>', -1);">不通过</a>
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
            <li><a href="SaleCheck.aspx?p=1">首页</a></li>
            <%
                for (int i = page - 3; i <= page + 3; i++)
                {
                    if (i < 1) continue;
                    if (i > pages) break;
            %>
            <li <%=i == page ? "class=\"active\"" : "" %>><a href="SaleCheck.aspx?p=<%=i %>"><%=i %></a></li>
            <%
                }
            %>
            <li><a href="SaleCheck.aspx?p=<%=pages %>">尾页</a></li>
        </ul>
    </nav>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="DialogArea" runat="server">
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptArea" runat="server">
    <script type="text/javascript">
        function previewImage(url) {
            if (url == '' || url == null || url == undefined) {
                alert('该用户并未上传行驶证照片');
                return;
            }

            $('#dlg_preview').find('.thumbnail').empty().append($('<img />').attr('src', '../' + url));
            $('#dlg_preview').modal();
        }

        function checkState(id, vin, check) {
            if (!confirm('确认要' + (check == 1 ? '' : '不') + '通过车架号为【' + vin + '】的销售信息？')) {
                return;
            }

            var reason = null;

            if (check == -1)
            {
                reason = prompt('请输入审核不通过的原因。');
            }

            $.ajax({
                url: 'Async.ashx?method=SaleCheck',
                type: 'post',
                data: {
                    id: id,
                    check: check,
                    reason: reason
                },
                success: function () {
                    $('#row_' + id).remove();
                }
            });
        }
    </script>
</asp:Content>
