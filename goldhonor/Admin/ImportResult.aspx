<%@ Page Title="导入现场抽奖结果" Language="C#" MasterPageFile="~/Admin/AdminMaster.Master" AutoEventWireup="true" CodeBehind="ImportResult.aspx.cs" Inherits="Web.Admin.ImportResult" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
    <script type="text/javascript">
        SIDE_MENU = "ImportResult";
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="page-header">
        <h4>导入现场抽奖结果</h4>
    </div>
    <form id="importform" action="ImportResult.aspx" method="post" enctype="multipart/form-data">
        <input type="hidden" id="month" name="month" value="20150415" />
        <div class="row">
            <label class="control-label col-xs-3">选择开奖日</label>
            <label class="control-label col-xs-3">选择Excel文件</label>
        </div>
        <div class="row">
            <div class="col-xs-3">
                <div class="btn-group">
                    <a class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                        <span id="monthname">2015.04.15</span> <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a onclick="setMonth(20150415, '2015.04.15');">2015.04.15</a></li>
                        <li><a onclick="setMonth(20150430, '2015.04.30');">2015.04.30</a></li>
                        <li><a onclick="setMonth(20150515, '2015.05.15');">2015.05.15</a></li>
                        <li><a onclick="setMonth(20150530, '2015.05.30');">2015.05.30</a></li>
                        <li><a onclick="setMonth(20150615, '2015.06.15');">2015.06.15</a></li>
                        <li><a onclick="setMonth(20150630, '2015.06.30');">2015.06.30</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-xs-3">
                <input type="file" class="form-control" name="data" id="datafile" />
            </div>
            <div class="col-xs-3">
                <a class="btn btn-primary" onclick="sendForm();">导入</a>
                <a class="btn btn-default" href="template.xls" target="_blank">模板下载</a>
            </div>
        </div>
    </form>

    <%
        if(submitComplete)
        {
    %>
    <div class="page-header">
        <h4>导入结果</h4>
    </div>
    <table class="table">
        <thead>
            <tr>
                <th>开奖日</th>
                <th>特等奖</th>
                <th>一等奖</th>
                <th>二等奖</th>
                <th>三等奖</th>
                <th>合计</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><%=Request["month"] %></td>
                <td><%=gift1 %></td>
                <td><%=gift2 %></td>
                <td><%=gift3 %></td>
                <td><%=gift4 %></td>
                <td><%=total %></td>
            </tr>
        </tbody>
    </table>
    <%
        }
    %>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="DialogArea" runat="server">
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptArea" runat="server">
    <script type="text/javascript">
        function setMonth(month, text) {
            $('#month').val(month);
            $('#monthname').text(text);
        }

        function sendForm() {
            var file = $('#datafile')[0];
            if(file.value == '')
            {
                alert('请上传Excel结果文档');
                return;
            }

            $('#importform').submit();
        }
    </script>
</asp:Content>
