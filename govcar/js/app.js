var stage;

var scl = null;

var touch = null;

var DEPLIST;

var DEALERS;

var cat_name;

var dep_name;

var auto_timer = 0;

$(function () {
    $.ajax({
        url: 'DepList.ashx',
        dataType: 'json',
        success: function (list) {
            DEPLIST = list;

            var sidebar = $('.sidebar')[0];
            for (var i = 0; i < DEPLIST.length; i++) {
                
                var a = $('<a></a>').text(DEPLIST[i].name)[0];
                sidebar.insertBefore(a, $('.sidebar .bg')[0]);
                $($('.sidebar a')[0]).addClass('active');

                var sublist = $('<div class="sublist"></div>').attr('id', 'cat_' + i).hide().appendTo($('.scroll'))[0];

                var table = document.createElement('table');
                sublist.appendChild(table);

                var tbody = table.appendChild(document.createElement('tbody'));

                var tr = null;

                for (var j = 0; j < DEPLIST[i].list.length; j++) {
                    if (j % 3 == 0) {
                        tr = document.createElement('tr');
                        tbody.appendChild(tr);
                    }

                    $('<td></td>').text(DEPLIST[i].list[j]).appendTo(tr);
                }

                while (tr.cells.length < 3) {
                    $('<td class="empty"></td>').appendTo(tr);
                }
            }

            $('.sublist')[0].style.display = 'block';

            var listSize = $('.scroll td').outerWidth();
            $('.scroll td').css({
                height: listSize + 'px'
            });

            var scrollSize = $(window).height() - 10 - 25 - 40 - 40;

            $('.list .scroll').css({
                height: scrollSize + 'px'
            });

            $('.sidebar a').click(function () {
                $('.sidebar a').removeClass('active');
                $(this).addClass('active');
                var list = $('.sidebar a').toArray();
                $('.sublist').hide();
                for (var i = 0; i < list.length; i++) {
                    if (list[i] == this) {
                        $('.sublist')[i].style.display = 'block';
                        break;
                    }
                }

                $('.scroll td').removeClass('active');

                calcScroll();
            });

            calcScroll();

            $('.scroll td').click(function () {
                if ($(this).hasClass('empty')) return;
                $('.scroll td').removeClass('active');
                $(this).addClass('active');
            });
        }
    });

    $.ajax({
        url: 'DealerList.ashx',
        dataType: 'json',
        success: function (list) {
            DEALERS = list;

            for (var i = 0; i < list.length; i++) {
                $('<option></option>').attr('value', list[i].name).text(list[i].name).appendTo($('#p_prov'));
            }
        }
    });

    stage = new SL.Stage($('.sl-stage')[0]);

    var sideZoom = $(window).width() / 640;
    $('.category').css({
        transform: 'scale(' + sideZoom + ',' + sideZoom + ')',
        webkitTransform: 'scale(' + sideZoom + ',' + sideZoom + ')'
    });

    

    var scl = $('.scroll')[0];

    scl.addEventListener('touchstart', function (evt) {
        scl = {
            scroll: $('.scroll').scrollTop(),
            y: evt.touches[0].pageY
        };
    });

    scl.addEventListener('touchmove', function (evt) {
        evt.preventDefault();
        $('.scroll').scrollTop(scl.scroll + (scl.y - evt.touches[0].pageY));
    });

    

    $('#p1, #p2').each(function (index, el) {
        el.addEventListener('touchstart', function (evt) {
            touch = {
                y: evt.touches[0].pageY
            };
        });

        el.addEventListener('touchmove', function (evt) {
            evt.preventDefault();
            if (touch == null) return;
            var delta = evt.touches[0].pageY - touch.y;
            if (delta < 0 - $(window).height() / 5) {
                touch = null;
                switch(stage.currentPage.id)
                {
                    case 'p1':
                        stage.navigate('p2', 'bottom');
                        break;
                    case 'p2':
                        stage.navigate('p3', 'bottom');
                        break;
                }
            }
            else if (delta > $(window).height() / 5) {
                //touch = null;
                //switch (stage.currentPage.id) {
                //    case 'p2':
                //        stage.navigate('p1', 'top');
                //        break;
                //}
            }
        });
    });

    stage.addEventListener('navigatestart', function () {
        $('.arrow').hide();

        clearTimeout(auto_timer);
    });
    stage.addEventListener('change', function () {
        if (stage.currentPage.id == 'p1' || stage.currentPage.id == 'p2') {
            $('.arrow').show();
        }
        if (stage.currentPage.id == 'p2') {
            setTimeout(function () {
                $('.p2_tip1').show();
                $('.p2_tip2').show();
            }, 600);
            setTimeout(function () {
                $('.p2_tip3').show();
                $('#p2').addClass('run');
            }, 1200);
            auto_timer = setTimeout(function () {
                stage.navigate('p3', 'bottom');
            }, 15000);
        }
    });

    stage.showPage('p1');

    SL.loadImage([
    //{ name: 'bg', url: 'img/bg.jpg' },
    { name: 'p1', url: 'img/p1.jpg' }
    ], function (imgs) {
        //var cxt = document.getCSSCanvasContext('2d', 'page', 800, 1136);
        //cxt.drawImage(imgs.bg, 0, 0);

        var cxt = document.getCSSCanvasContext('2d', 'p1', 1000, 1136);
        cxt.drawImage(imgs.p1, 0, 0);

        SL.checkImage($('#p1 img').toArray(), function () {
            $('#p1').addClass('run');
            auto_timer = setTimeout(function () {
                stage.navigate('p2', 'bottom');
            }, 15000);
        });
    });
});



function calcScroll() {
    var list = $('.sidebar a').toArray();
    var cur = $('.sidebar .active')[0];
    var index = 0;
    for (var i = 0; i < list.length; i++) {
        if (list[i] == cur) {
            index = i;
            break;
        }
    }

    if ($('.scroll').height() < $('#cat_' + index).height()) {
        $('.btn .arrows').show();
    }
    else {
        $('.btn .arrows').hide();
    }
}

function submitDep() {
    if ($('.scroll td.active').length == 0) {
        alert('请选择您所在的部门');
        return;
    }

    cat_name = $('.sidebar .active').text();

    dep_name = $('.scroll td.active').text();

    if (cat_name != '其它机关')
    {
        $('.result_1').show();
        $('.result_2').hide();
        $('.form_tip').show();
    }
    else {
        $('.result_1').hide();
        $('.result_2').show();
        $('.form_tip').hide();
    }

    stage.navigate('p4', 'bottom');
}

function onProvChange()
{
    var prov = $('#p_prov').val();
    $('#prov').text(prov == '' ? '请选择省份' : prov);

    $('#p_city').empty();
    $('#p_city').append($('<option></option>').attr('value', '').text('请选择城市'));

    for (var i = 0; i < DEALERS.length; i++) {
        if (DEALERS[i].name == prov) {
            for (var j = 0; j < DEALERS[i].cities.length; j++) {
                $('#p_city').append($('<option></option>').attr('value', DEALERS[i].cities[j].name).text(DEALERS[i].cities[j].name));
            }
            break;
        }
    }

    onCityChange();
}

function onCityChange() {
    var prov = $('#p_prov').val();
    var city = $('#p_city').val();
    $('#city').text(city == '' ? '请选择城市' : city);

    $('#p_dealer').empty();
    $('#p_dealer').append($('<option></option>').attr('value', '').text('请选择'));

    for (var i = 0; i < DEALERS.length; i++) {
        if (DEALERS[i].name == prov) {
            for (var j = 0; j < DEALERS[i].cities.length; j++) {
                if (DEALERS[i].cities[j].name == city) {

                    for (var k = 0; k < DEALERS[i].cities[j].dealers.length; k++) {
                        $('#p_dealer').append($('<option></option>').attr('value', DEALERS[i].cities[j].dealers[k]).text(DEALERS[i].cities[j].dealers[k]));
                    }

                    
                    return;
                }
            }
        }
    }

    onDealerChange();
}

function onDealerChange()
{
    var dealer = $('#p_dealer').val();
    $('#s_dealer').text(dealer == '' ? '请选择' : dealer);
}

function submitForm()
{
    var prov = $('#p_prov').val();
    var city = $('#p_city').val();
    var dealer = $('#p_dealer').val();
    var name = $.trim($('#p_name').val());
    var phone = $.trim($('#p_phone').val());

    if (name == '') {
        alert('请输入姓名');
        return;
    }

    if (phone.length != 11 || !/1[0-9]{10}/.test(phone)) {
        alert('请输入有效手机号');
        return;
    }

    if (prov == '' || city == '' || dealer == '') {
        alert('请选择经销商');
        return;
    }

    $.ajax({
        url: 'SendInfo.ashx',
        type: 'post',
        data: {
            cat: cat_name,
            dep: dep_name,
            name: name,
            phone: phone,
            prov: prov,
            city: city,
            dealer: dealer
        }
    });

    stage.navigate('p5', 'bottom');
}