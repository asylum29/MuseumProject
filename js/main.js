/* Header animation*/
$(function () {

    var allText = $('.about').text().trim();
    var firstLetter = allText.charAt(0);
    $('.about').html("<span style='font-size: 36px; font-family: OpenSans-Regular;'>" + firstLetter + "</span>" + allText.slice(1));

    $('.xPoTryMN_0').animate(
        {
            'stroke-dashoffset': 0
        }, 2000, 'linear').animate(
        {
            'stroke-width': 0,
            'fill-opacity': 1
        }, 500);

    $('.xPoTryMN_1').delay(500).animate(
        {
            'stroke-dashoffset': 0
        }, 1500, 'linear').animate(
        {
            'stroke-width': 0,
            'fill-opacity': 1
        }, 500);

    $('.xPoTryMN_2').delay(1000).animate(
        {
            'stroke-dashoffset': 0
        }, 1000, 'linear').animate(
        {
            'stroke-width': 0,
            'fill-opacity': 1
        }, 500);

    $('.xPoTryMN_3').delay(1000).animate(
        {
            'stroke-dashoffset': 0
        }, 1000, 'linear');


    $('.xPoTryMN_4').delay(750).animate(
        {
            'stroke-dashoffset': 0
        }, 1000, 'linear');

    // $("._1text").animate({opacity: 1},4000, 'easeInOutSine');

    $(".header-text").delay(2000).animate({opacity: 1}, 1500, 'easeInSine');
    $(".header-line").delay(2000).animate({width: 340}, 1500, 'easeOutQuad');


    var currentPage = $("#main").data("location");
    if (currentPage != "museum" && currentPage != "history") {
        switch (currentPage) {
            case "new":
            case "exhibition":
                currentPage += 's';
                break;
        }
        $('#' + currentPage).addClass('sub-menu').find('span').css('color', '#494952');
    }

    var museum =  ["museum", "museumabout", "news", "exhibitions", "geologic"];
    var history = ["history", "books", "book"];

    if ($.inArray(currentPage, museum) >= 0) {
        $('#museum').addClass('active');
        $('#museumnav').show();
    }
    if ($.inArray(currentPage, history) >= 0) {
        $('#history').addClass('active');
        $('#historynav').show();
    }

    $('#mouse').delay(3000).animate(
        {
            opacity: 0.5
        }, 1000, function () {
            loop()
        });

    //jQuery.scrollSpeed(100, 1500, 'easeOutQuint');


    imageTransfiguration();

    tinymce.init({
        selector: '.tiny', plugins: 'link image',
        language: 'ru', file_browser_callback: RoxyFileBrowser,
        style_formats: [
            {title: 'Цвет текста', items: [
                {title: 'Основной', inline: 'span', styles:{'color': '#494952'}},
                {title: 'Серый светлый', inline: 'span', styles:{'color': '#989797'}},
                {title: 'Синий Сибгиу', inline: 'span', styles:{'color': '#007bc6'}}
            ]},
            {title: 'Headers', items: [
                {title: 'Header 3', block: 'h3', styles:{'color': '#ff0000', 'font-size': '32px' }},
                {title: 'Header 4', format: 'h4'},
                {title: 'Header 5', format: 'h5'}
            ]},
            {title: 'Inline', items: [
                {title: 'Bold', icon: 'bold', format: 'bold'},
                {title: 'Italic', icon: 'italic', format: 'italic'},
                {title: 'Underline', icon: 'underline', format: 'underline'},
                {title: 'Strikethrough', icon: 'strikethrough', format: 'strikethrough'},
                {title: 'Superscript', icon: 'superscript', format: 'superscript'},
                {title: 'Subscript', icon: 'subscript', format: 'subscript'},
                {title: 'Code', icon: 'code', format: 'code'}
            ]},
            {title: 'Blocks', items: [
                {title: 'Paragraph', format: 'p'},
                {title: 'Blockquote', format: 'blockquote'},
                {title: 'Div', format: 'div'},
                {title: 'Pre', format: 'pre'}
            ]},
            {title: 'Alignment', items: [
                {title: 'Left', icon: 'alignleft', format: 'alignleft'},
                {title: 'Center', icon: 'aligncenter', format: 'aligncenter'},
                {title: 'Right', icon: 'alignright', format: 'alignright'},
                {title: 'Justify', icon: 'alignjustify', format: 'alignjustify'}
            ]}
        ]
    });

});


function imageTransfiguration() {
    $('.image-proportional-resizing img').each(function () {
        var maxWidth = $('.image-proportional-resizing').width(),
            maxHeight = $('.image-proportional-resizing').height(),
            ratio = 0,
            width = $(this).width(),
            height = $(this).height();

        if (width / maxWidth <= height / maxHeight) {
            ratio = maxWidth / width;
            $(this).css("width", maxWidth);
            $(this).css("height", height * ratio);
            height = height * ratio;
        }
        width = $(this).width();
        /*height = $(this).height();*/
        if (width / maxWidth > height / maxHeight) {
            ratio = maxHeight / height;
            $(this).css("height", maxHeight);
            $(this).css("width", width * ratio);
            width = width * ratio;
        }

        var center = $('.image-proportional-resizing'),
            imgPos = $(this, center),
            imgW = imgPos.width(),
            imgH = imgPos.height();
        imgPos.css({
            marginLeft: (center.width() - imgW) / 2,
            marginTop: (center.height() - imgH) / 2
        });

    });
}

function ChangePosition() {

    var burger = $('#openNav').css('display');
    var id = 0;

    if (burger == 'none') {
        id = 1;
        var target = $('.mynav');
    }
    else {
        id = 2;
        var target = $('#openNav');
    }

    var hHeight = $('header').outerHeight();
    var scroll_top = $(this).scrollTop(); // get scroll position top
    var height_element_parent = $("main").outerHeight(); //get high parent element
    var position_fixed_max = height_element_parent; //- height_element; // get the maximum position of the elemen

    if (scroll_top < hHeight) {
        $(target).css("position", "absolute");
        var position_fixed = hHeight;

    }
    else {
        if (position_fixed_max > scroll_top) {
            $(target).css("position", "fixed");
            $('.mynav').css('height', $(window).height());
            position_fixed = 0;
        }
        else {
            $(target).css("position", "absolute");

            if ($('main').height() <= $(window).height()) {
                position_fixed = hHeight;
                $('.mynav').css('height', height_element_parent);
            }
            else {
                position_fixed = position_fixed_max;
                $('.mynav').css('height', $(window).height());
            }
        }
    }


    $(target).css("top", position_fixed);
}

$(window).scroll(function () {
    ChangePosition();
});

$(window).resize(function () {
    ChangePosition();
    imageTransfiguration();
    tinyImgSize();

});

function w3_open() {
    $(".mynav").css({display: 'block', left: -300}).animate({left: 0}, 350, 'easeOutCubic');
    $('#openNav').css({display: 'none'});
}

function w3_close() {
    $('#openNav').css({display: 'inline-block'});
    $('#main').css({marginLeft: '0%'});
    $('.mynav').animate({left: -300}, 350, 'easeInCubic',
        function () {
            $(this).css({display: "none", left: 0});
        });
    ChangePosition();
}

function scrollToTitle() {
    jQuery('body,html').animate({scrollTop: $("header").height()}, 750, 'easeOutQuart');
}

$(window).resize(function () {
    var mainPosition = $("#main").offset();
    var width = $(window).width();
    if (width >= 1840) {
        $(".mynav").css({marginLeft: mainPosition.left - 320});
    }
    else {
        $(".mynav").css({marginLeft: 0});
    }

}).resize();


function loop() {
    var pst = $("p:first");
    var scrollPosition = pst.position();
    var spTop = scrollPosition.top - 285;

    $('#scroll_btn').css(
        {
            opacity: 0.5,
            top: spTop
        }).animate(
            {
                opacity: 0.0,
                top: spTop + 15
            }, 1000, 'easeOutQuad', function () {
                loop();
            });
}


// для отображение, но в редакторе не так выглядит маленько, поправить
function tinyImgSize() {
    $('.post-tiny img').each(function () {
        if ($(this).width() >= $('.post-tiny').width()) {
            $(this).css({'max-width': '100%', height: 'auto'});
        }
        else {

        }
    });
}

function RoxyFileBrowser(field_name, url, type, win) {
    var roxyFileman = '../fileman/index.html';
    if (roxyFileman.indexOf("?") < 0) {
        roxyFileman += "?type=" + type;
    }
    else {
        roxyFileman += "&type=" + type;
    }
    roxyFileman += '&input=' + field_name + '&value=' + win.document.getElementById(field_name).value;
    if (tinymce.activeEditor.settings.language) {
        roxyFileman += '&langCode=' + tinymce.activeEditor.settings.language;
    }
    tinymce.activeEditor.windowManager.open({
        file: roxyFileman,
        title: 'Файловый менеджер',
        width: 850,
        height: 650,
        resizable: "yes",
        plugins: "media",
        inline: "yes",
        close_previous: "no"
    }, {window: win, input: field_name});
    return false;
}
