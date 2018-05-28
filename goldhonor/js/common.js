$(function () {
    $('.droplist').each(function (index, el) {
        el._change = (function () {
            var val = $(this).find('select').val();
            var text = $(this).find('select option:selected').text();

            if (val == '') {
                $(this).find('.form-control').val('');
            }
            else {
                $(this).find('.form-control').val(text);
            }
        }).bind(el);

        $(el).find('select').change(el._change);

        el._change();
    });
});

function showSending(text) {
    text = text ? text : '提交中...';

    var modal = $('<div class="modal fade" data-backdrop="static"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"><span class="sr-only">45% Complete</span></div></div><h5 class="text-center">上传中...</h5></div></div></div></div>');
    modal.find('h5').text(text);
    window.lastSending = modal.appendTo(document.body).modal();
}

function hideSending() {
    if (window.lastSending != undefined) {
        window.lastSending.on('hidden.bs.modal', function () {
            this.remove();
        });
        window.lastSending.modal('hide');
        window.lastSending = undefined;
    }
}

function showAlert(text, ishtml, callback) {
    var modal = $('<div class="modal fade"></div>');

    var dlg = $('<div class="modal-dialog"></div>').appendTo(modal);

    var content = $('<div class="modal-content"></div>').appendTo(dlg);

    var body = $('<div class="modal-body"></div>').appendTo(content);

    var h4 = $('<h4 class="text-center"></h4>').appendTo(body);
    if (ishtml)
    {
        h4.html(text);
    }
    else
    {
        h4.text(text);
    }

    $('<div class="modal-footer"><a class="btn btn-primary" data-dismiss="modal">确定</a></div>').appendTo(content);

    modal.on('hidden.bs.modal', function () {
        this.remove();
        if(callback)
        {
            callback();
        }
    });

    modal.modal();
}

function uploadImage(src, complete) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.addEventListener('load', function (evt) {
        var blob = evt.target.response;

        var xhr2 = new XMLHttpRequest();
        xhr2.send
    });
    xhr.open('get', src, true);
    xhr.send();
}