var width, height;
var zoom;

var stage;

$(function () {
    width = $(window).width();
    height = $(window).height();

    $('.wrap').css({
        width: width + 'px',
        height: height + 'px'
    });

    zoom = Math.min(width / 640, height / 1136);
    $('.page .main').css({
        transform: 'scale(' + zoom + ',' + zoom + ')',
        webkitTransform: 'scale(' + zoom + ',' + zoom + ')',
        left: (width - 640 * zoom) / 2 + 'px',
        top: (height - 1136 * zoom) / 2 + 'px',
        display: 'block'
    });

    SL.loadImage([
        { name: 'bg', url: 'img/bg.jpg' },
        { name: 'border1', url: 'img/border1.png' },
        { name: 'border2', url: 'img/border2.png' }
    ], function (images) {
        var cxt = document.getCSSCanvasContext('2d', 'pagebg', 640, 1136);
        
        var bgzoom = width / 640;

        var bottom = Math.ceil(height / bgzoom);

        cxt.drawImage(images.bg, 0, 0);

        cxt.drawImage(images.border2, 0, images.border1.height);
        cxt.drawImage(images.border2, 0, images.border1.height + images.border2.height);
        cxt.save();
        cxt.translate(640, 0);
        cxt.scale(-1, 1);
        cxt.drawImage(images.border2, 0, images.border1.height);
        cxt.drawImage(images.border2, 0, images.border1.height + images.border2.height);
        cxt.restore();

        cxt.drawImage(images.border1, 0, 0);
        cxt.save();
        cxt.translate(0, bottom);
        cxt.scale(1, -1);
        cxt.drawImage(images.border1, 0, 0);
        cxt.restore();

        loadingTimer = setTimeout(loadingSteps, 800);

        $('#loading').show();

        var flag = true;
        var imgs = $('#pages img');
        imgs.each(function (index, el) {
            if (!el.complete) {
                flag = false;
            }
        });

        if (!flag) {
            imgs.load(function (evt) {
                var flag = true;
                imgs.each(function (index, el) {
                    if (!el.complete) {
                        flag = false;
                    }
                });
                if (flag) {
                    onInit();
                }
            });
        }
        else
        {
            onInit();
        }
    });
});

var loadingIndex = 0;
var loadingTimer = 0;
function loadingSteps() {
    loadingIndex = (loadingIndex + 1) % 4;
    $('.loading img').hide();
    $('.loading img')[loadingIndex].style.display = 'block';
    loadingTimer = setTimeout(loadingSteps, 800);
};

var loaded = false;

var scroller;

function onInit() {
    if (loaded) return;
    loaded = true;

    clearTimeout(loadingTimer);
    $('#loading').remove();
    
    $('#pages').show();

    window.addEventListener('webkitTransitionEnd', function (evt) {
        if(evt.target == $('#main .fill')[0])
        {
            $('#main_word').css('opacity', 1);
        }
    });

    $('#main').addClass('run');
}