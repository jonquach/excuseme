// Excuse me main.js

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

    console.log(excuseme);

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
    };
});

console.log("Sorry, still WIP");
