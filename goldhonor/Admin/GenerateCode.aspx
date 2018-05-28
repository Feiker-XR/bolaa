<%@ Page Title="生成论坛抽奖码" Language="C#" MasterPageFile="~/Admin/AdminMaster.Master" AutoEventWireup="true" CodeBehind="GenerateCode.aspx.cs" Inherits="Web.Admin.GenerateCode" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
    <script type="text/javascript">
        SIDE_MENU = "GenerateCode";
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="page-header">
        <h4>生成论坛抽奖码</h4>
    </div>
    <div class="container-fluid">
        <div class="row">
            <label class="control-label col-lg-3">输入要生成的数量</label>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <input type="text" class="form-control" id="num" />
            </div>
            <div class="col-lg-2">
                <a class="btn btn-primary" onclick="doGenerate();">生成</a>
            </div>
            <div class="col-lg-6">
                <p class="help-block">建议每次生成不超过50个</p>
            </div>
        </div>
        <div class="panel panel-default" style="margin-top: 15px;">
            <div class="panel-heading">
                <div class="panel-title">生成的抽奖码</div>
            </div>
            <ul class="list-group" id="codelist"></ul>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="DialogArea" runat="server">
    <div class="modal fade" data-backdrop="static" id="dlg_procing">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                            <span class="sr-only">100% Complete</span>
                        </div>
                    </div>
                    <h4 class="text-center">生成中...</h4>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptArea" runat="server">
    <script type="text/javascript">
        function doGenerate() {
            var count = parseInt($('#num').val());
            if (isNaN(count) || count < 1)
            {
                alert('错误的生成数量');
                return;
            }

            $('#dlg_procing').modal();

            $.ajax({
                url: 'Async.ashx?method=GenerateChanceCodes',
                type: 'post',
                data: {
                    count: count
                },
                dataType: 'json',
                success: function (list) {
                    $('#dlg_procing').modal('hide');

                    $('#codelist').empty();

                    for (var i = 0; i < list.length; i++) {
                        $('<li class="list-group-item"></li>').text(list[i]).appendTo($('#codelist'));
                    }
                }
            });
        }
    </script>
</asp:Content>
