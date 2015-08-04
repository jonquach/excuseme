// Excuse me main.js

(function () {
    $('.social').on('click', function () {
        return $('.share').toggleClass('active');
    });
    new GetShare({
        root: $('.twitter'),
        network: 'twitter',
        share: {
            url: 'http://excuseme.io/',
            message: 'Excuse Generator - http://excuseme.io'
        }
    });
}.call(this));

$(document).ready(function() {

    var excuseme,
        reloadButton  = $('.reload'),
        reloadSvg     = document.querySelector('svg'),
        reloadEnabled = true,
        rotation      = 0;

    var randomGenerator = function (length) {
        return Math.floor(Math.random() * length);
    };

    var reloadAnimation = function () {

    reloadEnabled = false;
    rotation -= 180;

    reloadSvg.style.webkitTransform = 'translateZ(0px) rotateZ( ' + rotation + 'deg )';
    reloadSvg.style.MozTransform  = 'translateZ(0px) rotateZ( ' + rotation + 'deg )';
    reloadSvg.style.transform  = 'translateZ(0px) rotateZ( ' + rotation + 'deg )';
    }

    reloadButton.click(function() {
        reloadAnimation();
        generateExcuse();
    });

    $.ajax({
        url: "quotes.json",
        dataType: 'json',
        success: function(data) {
            excuseme = data.excuseCreator;
            generateExcuse();
        },
        error: function() { // callback if there's an error
            console.log("error");
        }
    });

    var generateExcuse = function () {

        var leadIn = randomGenerator(excuseme.leadIn.length),
            perpetrator = randomGenerator(excuseme.perpetrator.length),
            delayFactor = randomGenerator(excuseme.delayFactor.length);

        console.log(leadIn, perpetrator, delayFactor);

        var sorry = excuseme.leadIn[leadIn] + " " +
                    excuseme.perpetrator[perpetrator] + " " +
                    excuseme.delayFactor[delayFactor];

        console.log(sorry);

        $(".excuse h1").fadeOut(function() {
            $(this).text(sorry).fadeIn();
        });

        $(".twitter-tweet-button").click(function() {
            var other = '" – Generate excuse on ',
                encodeText = encodeURIComponent('"' + $("h1").html() + other),
                encodeJ = encodeURIComponent("Jonathan_quach_"),
                encodeT = encodeURIComponent("thanhtran32"),
                width = 550,
                height = 400,
                top = ($(window).height() - height) / 2;
                left = ($(window).width() - width) / 2;

            var opts = 'status=1' +
                       ',width=' + width +
                       ',height=' + height +
                       ',top=' + top +
                       ',left=' + left;

            window.open("http://twitter.com/share?url=&text=" + encodeText +
                        "&related=" + encodeJ + "," + encodeT, "twitter", opts);
        });
    };

    $(document).keyup(function(e) {
        if (e.keyCode === 32 || e.keyCode === 82) {
            reloadAnimation();
            generateExcuse();
        } else if (e.keyCode === 84) {
            $(".twitter-tweet-button").click();
        } else if (e.keyCode === 83) {
            $(".twitter-share-button").click();
        }
    });
});

console.log("Sorry, still WIP");
