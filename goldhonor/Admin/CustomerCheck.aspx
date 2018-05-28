<%@ Page Title="车主审核" Language="C#" MasterPageFile="~/Admin/AdminMaster.Master" AutoEventWireup="true" CodeBehind="CustomerCheck.aspx.cs" Inherits="Web.Admin.CustomerCheck" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
    <script type="text/javascript">
        SIDE_MENU = "CustomerCheck";
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="page-header">
        <h4>车主审核</h4>
    </div>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th>个人信息</th>
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
                    <%=CommonLibrary.Convert.ToDateTime(row["update_time"]).ToShortDateString() %><br />
                    <%=CommonLibrary.Convert.ToDateTime(row["update_time"]).ToString("HH:mm:ss") %>
                </td>
                <td>
                    <a class="btn btn-primary" onclick="previewImage('<%=row["carimg"] %>');">查看行驶证</a>
                    <a class="btn btn-success" onclick='checkState("<%=row["openid"] %>", <%=Newtonsoft.Json.JsonConvert.SerializeObject(row["name"]) %>, 1);'>通过</a>
                    <a class="btn btn-danger" onclick='checkState("<%=row["openid"] %>", <%=Newtonsoft.Json.JsonConvert.SerializeObject(row["name"]) %>, -1);'>不通过</a>
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
    <div class="modal fade" id="dlg_preview">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="thumbnail"></div>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
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

        function checkState(openid, name, check) {
            if (!confirm('确认要' + (check == 1 ? '' : '不') + '通过【' + name + '】的个人信息？')) {
                return;
            }

            var reason = null;

            if (check == -1) {
                reason = prompt('请输入审核不通过的原因。');
            }

            $.ajax({
                url: 'Async.ashx?method=CustomerCheck',
                type: 'post',
                data: {
                    openid: openid,
                    check: check,
                    reason: reason
                },
                success: function () {
                    $('#row_' + openid).remove();
                }
            });
        }
    </script>
</asp:Content>
