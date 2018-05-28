var stage;

var loadingPage, p1, p2, p3, p4, p4_1, p4_2, p5, p6;

var dlgPhoto, dlgVoice;

var photoTouch = null;

var shareWords = [
    '情侣二得很招摇，搂搂抱抱傻傻的笑',
    '之后你就会升职加薪，当上总经理，出任CEO，迎娶白富美，走上人生巅峰',
    '好好赚钱才能天天任性',
    '范冰冰的脸，莫文蔚的腿，李嘉欣的气质，舒淇的嘴',
    '学霸苦读百日虐试卷，学渣奋战整晚求及格',
    '新的一年，祝你瘦成闪电，闪瞎所有人的狗眼',
    '身体才是任性的本钱，没身体一切免谈'
];

var shareTitles = [
    '早日脱光',
    '薪水狂涨',
    '买车接房',
    '颜值爆表',
    '逢考必过',
    '瘦成闪电',
    '身体倍棒'
];

$(function () {
    SL.loadImage([
        { name: 'bg', url: 'img/bg.jpg' },
        { name: 'border1', url: 'img/border1.png' },
        { name: 'border2', url: 'img/border2.png' },
        { name: 'logo', url: 'img/logo.png' },
        { name: 'footer', url: 'img/footer.png' },
        { name: 'loading', url: 'img/loading.gif' }
    ], function (images) {
        initBG(images);

        stage = new SL.Stage();
        stage.navigator = new SL.SlideNavigator(1000);
        stage._navigate = (function (page, navigator, options) {
            this.navigate(page, new SL.SlideNavigator(1000), options);
        }).bind(stage);
        document.body.appendChild(stage.element);

        dlgPhoto = new SL.Stage();
        dlgPhoto.element.style.display = 'none';
        dlgPhoto.element.style.backgroundColor = 'rgba(0,0,0,0.7)';
        document.body.appendChild(dlgPhoto.element);

        dlgVoice = new SL.Stage();
        dlgVoice.element.style.display = 'none';
        dlgVoice.element.style.backgroundColor = 'rgba(0,0,0,0.7)';
        document.body.appendChild(dlgVoice.element);

        initLoading(images);

        stage.setPage(loadingPage);

        $('#pages').load('cache.html', '', function () {
            //return;
            SL.checkImage($('#pages img').toArray(), function () {
                

                initPages();

                dlgPhoto.setPage(p4_1);
                dlgVoice.setPage(p4_2);

                stage.setPage(p1);

                $('audio').each(function (index, audio) {
                    audio.addEventListener('pause', function (evt) {
                        evt.target.currentTime = 0;
                    });
                });
            });
        });

        
    });

    
});

function initBG(images) {
    var cxt = document.getCSSCanvasContext('2d', 'pagebg', 640, 1136);

    var cxt1 = document.getCSSCanvasContext('2d', 'pagebg1', 640, 1136);

    var bgzoom = $(window).width() / 640;

    var bottom = Math.ceil($(window).height() / bgzoom);

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
    cxt.drawImage(images.logo, 0, 0);
    cxt.drawImage(images.footer, 0, bottom - images.footer.height);



    cxt1.drawImage(images.bg, 0, 0);

    cxt1.drawImage(images.border2, 0, images.border1.height);
    cxt1.drawImage(images.border2, 0, images.border1.height + images.border2.height);
    cxt1.save();
    cxt1.translate(640, 0);
    cxt1.scale(-1, 1);
    cxt1.drawImage(images.border2, 0, images.border1.height);
    cxt1.drawImage(images.border2, 0, images.border1.height + images.border2.height);
    cxt1.restore();

    cxt1.drawImage(images.border1, 0, 0);
    cxt1.save();
    cxt1.translate(0, bottom);
    cxt1.scale(1, -1);
    cxt1.drawImage(images.border1, 0, 0);
    cxt1.restore();
    
}

var PageBase = function (id, nobg) {
    SL.ZoomedPage.call(this, 640, 1136, 'contain', 'center');

    if (!nobg) {
        this.element.classList.add('page');
    }
    
    if (id)
    {
        this.container.appendChild(document.getElementById(id));
    }
    
};
PageBase.prototype = Object.create(SL.ZoomedPage.prototype);
PageBase.prototype.constructor = PageBase;


function initLoading(images) {
    loadingPage = new PageBase();
    loadingPage.container.classList.add('loading');
    $(images.loading).appendTo(loadingPage.container);
};

var inited = false;

function initPages() {
    if (inited) return;
    inited = true;

    p1 = new PageBase('p1');

    p1.addEventListener(SL.Events.ACTIVE, function () {
        setTimeout(function () {
            $(p1.container).find('.word .fill').animate({ height: 505 }, {
                duration: 1500,
                easing: null,
                complete: function () {
                    $(p1.container).find('.word .top').animate({ opacity: 1 }, {
                        duration: 1500,
                        easing: null,
                        complete: function () {
                            setTimeout(function () {
                                stage._navigate(p2);
                            }, 1000);
                        }
                    });
                }
            });
        }, 0);
    });


    p2 = new PageBase('p2');
    p2.addEventListener(SL.Events.ACTIVE, function () {
        $(p2.container).find('.sp_1').animate({
            left: 172,
            top: 242,
            opacity: 1
        }, {
            duration: 1500
        });
        $(p2.container).find('.sp_2').animate({
            left: 157,
            top: 361,
            opacity: 1
        }, {
            duration: 1500
        });
        $(p2.container).find('.sp_3').animate({
            left: 342,
            top: 359,
            opacity: 1
        }, {
            duration: 1500
        });
        $(p2.container).find('.sp_4').animate({
            left: 380,
            top: 354,
            opacity: 1
        }, {
            duration: 1500
        });
    });

    p3 = new PageBase('p3');
    p3.element.classList.add('bg1');

    p4 = new PageBase('p4');
    p4.element.classList.add('bg1');
    $(p4.container).find('input').each(function (index, input) {
        input.addEventListener('change', function (evt) {
            if (evt.target.files.length > 0) {
                showMessage('上传中，请稍候');
                var file = evt.target.files[0];

                var thumber = new MegaPixImage(file);
                thumber.onrender = function (canvas) {
                    evt.target.value = '';
                    var encoder = new JPEGEncoder(80);
                    var cxt = canvas.getContext('2d');
                    cxt.setTransform(1, 0, 0, 1, 0, 0);
                    var data = encoder.encode(cxt.getImageData(0, 0, canvas.width, canvas.height)).substr(23);
                    $.ajax({
                        url: 'ImageUpload.ashx',
                        type: 'post',
                        data: {
                            data: data
                        },
                        success: function (resp) {
                            var img = new Image();
                            img.addEventListener('load', function (evt2) {
                                setPhoto(true, evt2.target, resp);
                                hideMessage();
                            });
                            img.src = resp;
                        }
                    });
                };
                thumber.render(document.createElement('canvas'), {
                    maxWidth: 500,
                    maxHeight: 500
                });
            }
        });
    });

    $(p4.container).find('.voice_empty')[0].addEventListener('click', function (evt) {
        if (recoding) {
            return;
        }
        $('.rec').show();
        wx.startRecord();
        recoding = true;
    });

    $('.rec img').click(function () {
        if (recoding) {
            
            wx.stopRecord({
                success: function (res) {
                    
                    stopRecord(res.localId);
                }
            });
        }
    });

    $(p4.container).find('.photo_box')[0].addEventListener('touchstart', function (evt) {
        if (photo != null && photo.custom) {
            if (evt.touches.length == 1) {
                photoTouch = {
                    mode: 'move',
                    x: evt.touches[0].pageX,
                    y: evt.touches[0].pageY,
                    tx: photo.tx,
                    ty: photo.ty
                };
            }
            else {
                var dx = evt.touches[0].pageX - evt.touches[1].pageX;
                var dy = evt.touches[0].pageY - evt.touches[1].pageY;
                photoTouch = {
                    mode: 'scale',
                    len: Math.sqrt(dx * dx + dy * dy),
                    scale: photo.scale
                };
            }
        }
    });

    document.addEventListener('touchmove', function (evt) {
        if (photo != null && photo.custom && photoTouch != null) {
            evt.preventDefault();

            if (photoTouch.mode == 'move') {
                var dx = evt.touches[0].pageX - photoTouch.x;
                var dy = evt.touches[0].pageY - photoTouch.y;

                dx /= p4.scale;
                dy /= p4.scale;

                dx *= 1.12;
                dy *= 1.12;

                photo.tx = photoTouch.tx + dx;
                photo.ty = photoTouch.ty + dy;

                redrawPhoto();
            }
            else {
                var dx = evt.touches[0].pageX - evt.touches[1].pageX;
                var dy = evt.touches[0].pageY - evt.touches[1].pageY;

                var len = Math.sqrt(dx * dx + dy * dy);

                photo.scale = photoTouch.scale * (len / photoTouch.len);

                redrawPhoto();
            }
        }
    });

    document.addEventListener('touchend', function (evt) {
        photoTouch = null;
    });

    p4_1 = new PageBase('p4_1', true);
    $(p4_1.container).find('.photo_item').each(function (index, el) {
        el.index = index;
        el.addEventListener('click', function (evt) {
            setPhoto(false, $(evt.currentTarget).find('img')[0], evt.currentTarget.index);
            $(dlgPhoto.element).hide();
        });
    });
    $('#close1').css({
        position: 'fixed',
        width: '8%',
        top: '0px',
        right: '0px'
    }).appendTo(dlgPhoto.floatLayer).click(function () {
        $(dlgPhoto.element).hide();
    });


    p4_2 = new PageBase('p4_2', true);
    $('#close2').css({
        position: 'fixed',
        width: '8%',
        top: '0px',
        right: '0px'
    }).appendTo(dlgVoice.floatLayer).click(function () {
        stopVoice();
        $(dlgVoice.element).hide();
    });
    $('#music1')[0].addEventListener('playing', function () {
        $($(p4_2.container).find('.voice_item')[0]).find('.mark').addClass('play');
    });
    $('#music1')[0].addEventListener('pause', function () {
        $($(p4_2.container).find('.voice_item')[0]).find('.mark').removeClass('play');
    });

    $('#music2')[0].addEventListener('playing', function () {
        $($(p4_2.container).find('.voice_item')[1]).find('.mark').addClass('play');
    });
    $('#music2')[0].addEventListener('pause', function () {
        $($(p4_2.container).find('.voice_item')[1]).find('.mark').removeClass('play');
    });

    $('#music3')[0].addEventListener('playing', function () {
        $($(p4_2.container).find('.voice_item')[2]).find('.mark').addClass('play');
    });
    $('#music3')[0].addEventListener('pause', function () {
        $($(p4_2.container).find('.voice_item')[2]).find('.mark').removeClass('play');
    });

    $('#music4')[0].addEventListener('playing', function () {
        $($(p4_2.container).find('.voice_item')[3]).find('.mark').addClass('play');
    });
    $('#music4')[0].addEventListener('pause', function () {
        $($(p4_2.container).find('.voice_item')[3]).find('.mark').removeClass('play');
    });

    $($(p4_2.container).find('.voice_item .playbtn')[0]).click(function () {
        var bgm = $('#music1')[0];
        if (bgm.paused) {
            stopVoice();
            bgm.play();
        }
        else {
            bgm.pause();
        }
    });

    $($(p4_2.container).find('.voice_item .playbtn')[1]).click(function () {
        var bgm = $('#music2')[0];
        if (bgm.paused) {
            stopVoice();
            bgm.play();
        }
        else {
            bgm.pause();
        }
    });

    $($(p4_2.container).find('.voice_item .playbtn')[2]).click(function () {
        var bgm = $('#music3')[0];
        if (bgm.paused) {
            stopVoice();
            bgm.play();
        }
        else {
            bgm.pause();
        }
    });

    $($(p4_2.container).find('.voice_item .playbtn')[3]).click(function () {
        var bgm = $('#music4')[0];
        if (bgm.paused) {
            stopVoice();
            bgm.play();
        }
        else {
            bgm.pause();
        }
    });

    $(p4_2.container).find('.voice_item .ok').each(function (index, btn) {
        btn.index = index;
        btn.addEventListener('click', function (evt) {
            stopVoice();
            $(dlgVoice.element).hide();
            setVoice(false, evt.target.index);
        });
    });

    $(p4.container).find('.voice_full').click(function (evt) {
        if (evt.target == evt.currentTarget) {
            playVoice();
        }
        
    });

    p5 = new PageBase('p5');
    p5.element.classList.add('bg1');
    $(p5.container).find('.voice_item .playbtn').click(function () {
        playVoice();
    });
}

var wordId = 1;
var fontId = 1;

var voice = null;
var photo = null;

var updated = true;

function wordNext() {
    wordId = (wordId + 1) % 7;
    $(p3.container).find('.word_show').hide();
    $(p3.container).find('.word_show')[wordId].style.display = 'block';
    switchPreview();
}

function wordPrev() {
    wordId = (wordId + 6) % 7;
    $(p3.container).find('.word_show').hide();
    $(p3.container).find('.word_show')[wordId].style.display = 'block';
    switchPreview();
}


function fontNext() {
    fontId = (fontId + 1) % 3;
    $(p3.container).find('.font_show').hide();
    $(p3.container).find('.font_show')[fontId].style.display = 'block';
    switchPreview();
}

function fontPrev() {
    fontId = (fontId + 2) % 3;
    $(p3.container).find('.font_show').hide();
    $(p3.container).find('.font_show')[fontId].style.display = 'block';
    switchPreview();
}

function switchPreview() {
    $(p3.container).find('.word_preview').hide();
    $(p3.container).find('.word_preview')[fontId * 7 + wordId].style.display = 'block';

    $(p5.container).find('.word_finish').empty().append($($(p3.container).find('.word_preview')[fontId * 7 + wordId]).clone().removeClass('word_preview'));

    updated = true;
}

function selectVoice() {
    stopVoice();
    $(dlgVoice.element).show();
}

function stopVoice() {
    $('#music1, #music2, #music3, #music4').each(function (index, audio) {
        try
        {
            audio.pause();
        }
        catch(e)
        {

        }
    });
    if (voice && voice.custom && customPlaying) {
        wx.stopVoice({
            localId: voice.data
        });
        $(p4.container).find('.voice_full').removeClass('play');
        $(p5.container).find('.voice_item .mark').removeClass('play');
        customPlaying = false;
    }
}

function clearVoice()
{
    voice = null;
    stopVoice();
    $(p4.container).find('.voice_full').hide();
    $(p4.container).find('.voice_empty').show();
    $(p4.container).find('.voice_empty_mask').show();

    $(p4.container).find('.selectvoice').show();
    $(p4.container).find('.clearvoice').hide();

    $('.voice_tip').show();
}

function setVoice(custom, data) {
    voice = {
        custom: custom,
        data: data
    };

    $(p4.container).find('.voice_full').show();
    $(p4.container).find('.voice_empty').hide();

    $(p4.container).find('.selectvoice').hide();
    $(p4.container).find('.clearvoice').show();

    $('.voice_tip').hide();

    updated = true;
}

var customPlaying = false;

function playVoice() {
    if (voice == null) return;
    var music;
    if (voice.custom) {
        if (customPlaying) {
            wx.stopVoice({
                localId: voice.data // 需要停止的音频的本地ID，由stopRecord接口获得
            });
            $(p4.container).find('.voice_full').removeClass('play');
            $(p5.container).find('.voice_item .mark').removeClass('play');
            customPlaying = false;
        }
        else {
            wx.playVoice({
                localId: voice.data // 需要播放的音频的本地ID，由stopRecord接口获得
            });
            $(p4.container).find('.voice_full').addClass('play');
            $(p5.container).find('.voice_item .mark').addClass('play');
            customPlaying = true;
        }
    }
    else
    {
        music = document.getElementById('music' + (voice.data + 1));
        music.addEventListener('playing', function (evt) {
            evt.target.removeEventListener('playing', arguments.callee);
            $(p4.container).find('.voice_full').addClass('play');
            $(p5.container).find('.voice_item .mark').addClass('play');
        });
        music.addEventListener('pause', function (evt) {
            evt.target.removeEventListener('pause', arguments.callee);
            $(p4.container).find('.voice_full').removeClass('play');
            $(p5.container).find('.voice_item .mark').removeClass('play');
        });
        if (music.paused) {
            music.play();
        }
        else {
            music.pause();
        }
    }
}

function setPhoto(custom, image, data) {
    photo = {
        custom: custom,
        image: image,
        data: data
    };

    $('.photo_empty').hide();

    var canvas = $(p4.container).find('#photocanvas')[0];
    photo.scale = Math.max(canvas.width / photo.image.width, canvas.height / photo.image.height);
    photo.tx = 0;
    photo.ty = 0;

    redrawPhoto();

    updated = true;

    if (custom) {
        $('.touchtip').show();
    }
    else {
        $('.touchtip').hide();
    }
}

function redrawPhoto() {
    var canvas = $(p4.container).find('#photocanvas')[0];
    var cxt = canvas.getContext('2d');
    cxt.setTransform(1, 0, 0, 1, 0, 0);
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    cxt.setTransform(photo.scale, 0, 0, photo.scale, canvas.width / 2, canvas.height / 2);
    cxt.drawImage(photo.image, 0 - photo.image.width / 2 + photo.tx / photo.scale, 0 - photo.image.height / 2 + photo.ty / photo.scale);
    updated = true;
}

function showMessage(text) {
    $('.message td').text(text);
    $('.message').show();
}

function hideMessage() {
    $('.message').hide();
}

function goPreview() {
    if (photo == null) {
        showMessage('请选择或上传照片');
        $('.message')[0].addEventListener('click', function () {
            $('.message')[0].removeEventListener('click', arguments.callee);
            hideMessage();
        });
        return;
    }

    if (voice == null) {
        showMessage('请选择或录制语音');
        $('.message')[0].addEventListener('click', function () {
            $('.message')[0].removeEventListener('click', arguments.callee);
            hideMessage();
        });
        return;
    }

    var canvas = $(p5.container).find('#photo_show')[0];
    var cxt = canvas.getContext('2d');
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    cxt.drawImage($(p4.container).find('#photocanvas')[0], 0, 0);
    cxt.globalCompositeOperation = 'destination-in';
    cxt.drawImage(document.getElementById('photo_mask'), 0, 0);
    cxt.globalCompositeOperation = 'source-over';

    if (!updated) {
        updateShare();
    }

    stopVoice();

    stage._navigate(p5);
}

function reset() {
    stage._navigate(p3, null, { direction: 'top' });
    wxShare.link = 'http://mondeocard.ser2.ford001.com/';
    wxShare.title = '2015福运中国年';
    wxShare.desc = '新的一年祝你福到运到，心想事成';
    setShareData();
    stopVoice();
}


var logid = 0;

var recwaiting = false;
var rectimer = 0;
var recoding = false;

function stopRecord(id) {
    $('.rec').hide();
    recoding = false;
    setVoice(true, id);
}

function publish() {
    if (updated) {
        showMessage('福贴保存中，请稍候');
        if (voice.custom) {
            wx.uploadVoice({
                localId: voice.data, // 需要上传的音频的本地ID，由stopRecord接口获得
                isShowProgressTips: 0, // 默认为1，显示进度提示
                success: function (res) {
                    voice.media_id = res.serverId; // 返回音频的服务器端ID

                    doPublish();
                }
            });
        }
        else
        {
            doPublish();
        }
    }
    else
    {
        $('.sharetip').show();
    }
}

function doPublish() {
    var photoData = '';

    if (photo.custom) {
        var canvas = $(p4.container).find('#photocanvas')[0];
        var cxt = canvas.getContext('2d');
        cxt.save();
        cxt.setTransform(1, 0, 0, 1, 0, 0);
        var data = cxt.getImageData(0, 0, canvas.width, canvas.height);
        cxt.restore();

        photoData = new JPEGEncoder(80).encode(data).substr(23);
    }
    

    $.ajax({
        url: 'Publish.ashx',
        type: 'post',
        data: {
            word: wordId,
            font: fontId,
            photo_custom: photo.custom,
            photo_data: photo.custom ? photoData : photo.data,
            voice_custom: voice.custom,
            voice_data: voice.custom ? voice.media_id : voice.data
        },
        success: function (result) {
            updated = false;
            logid = result;
            hideMessage();
            $('.sharetip').show();
            updateShare();
        }
    });
}

function updateShare() {
    wxShare.link = 'http://mondeocard.ser2.ford001.com/show.aspx?id=' + logid;
    wxShare.title = '新的一年祝你' + shareTitles[wordId];
    wxShare.desc = shareWords[wordId];
    setShareData();
}