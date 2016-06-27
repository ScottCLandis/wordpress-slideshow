var lastOrientation = "portrait";
var slideshowHeight;
var slideshowWidth;
var number;

document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("DOMContentLoaded", setTimeout(function () {calculateImages()}, 1000), false);

function onDeviceReady() {
    navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
}

function calculateImages(){
    console.log("calculating sizes");
    $('body').css('background-color', '#000');
    $('.slideshow img').each(function (index) {
        if ($(this).width() == 0){
            console.log("recalculating");
            calculateImages();
        } else {
            console.log(index, $(this).width());
            $(this).attr("aspect", $(this).width() / $(this).height());
            $(this).attr("height", $(this).height());
            $(this).attr("width", $(this).width());
        }
    });
    
    setTimeout(function () {
        setSizes("portrait");
    }, 1000);
}

// onSuccess: Get a snapshot of the current acceleration
//
function onSuccess(acceleration) {
    x = Math.abs(acceleration.x);
    y = Math.abs(acceleration.y);

    if ((x > y) && (Math.abs(x-y) > 5)) {
        landscape();
    }
    if ((y > x) && (Math.abs(y-x) > 5)){
        portrait();
    }

    checkOrientation();
}

// onError: Failed to get the acceleration
//
function onError() {
    alert('onError!');
}

function checkOrientation() {
    setTimeout(function () {
        navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
    }, 100);
}

function landscape() {
    slideshowHeight = $('.slideshow').height();
    slideshowWidth = $('.slideshow').width();
    if (lastOrientation !== "landscape") {
        $('.slideshow').css({
            'height': '85vw',
            'width': '100vh'
        });
        setSizes("landscape");
        
         $(".container-fluid").addClass('landscape');
        var h = $(window).height();
        var w = $(window).width();
        var diff = (h - w) / 2;
        $(".container-fluid").css({
            'top': diff + 'px',
            'left': diff * -1 + 'px'
        });
        $('footer').css({
            'height': '15vw',
            'padding': '0 10px'
        });

        $('.slideshow, .captions').slick('slickSetOption','verticalSwiping',true,true);
    }

    lastOrientation = "landscape";

}

function portrait() {
    slideshowHeight = $('.slideshow').height();
    slideshowWidth = $('.slideshow').width();

    if (lastOrientation !== "portrait") {
        $('.slideshow').css({
            'height': '88vh',
            'width': '100vw'
        });
        setSizes("portrait");
        
        $(".container-fluid").removeClass('landscape');
        $(".container-fluid").css({
            'top': 0,
            'left': 0
        });
        $('footer').css({
            'height': '15vh',
            'padding':''
        });

        $('.slideshow, .captions').slick('slickSetOption','verticalSwiping',false,true);
    }

    lastOrientation = "portrait";
    //fitScreen();
}

function setSizes(newOrientation) {
    slideshowHeight = $('.slideshow').height();
    slideshowWidth = $('.slideshow').width();
    $('.slideshow img').each(function (index) {
        if (newOrientation === "portrait") {
            //console.log("setting sizes to portrait\n");
            if (slideshowHeight > $(this).attr('height') && (slideshowHeight - $(this).attr('height') > 30)) {
                //console.log("tall\n");
                //console.log(slideshowHeight, $(this).attr('height'));
                marginTop = (slideshowHeight - $(this).attr('height')) / 2;
            } else {
               // console.log("wide\n");
                marginTop = 0;
            }
            $(this).css({
                'width': slideshowWidth,
                'height': slideshowWidth / $(this).attr("aspect"),
                'margin-left': 0,
                'margin-right': 0,
                'margin-top': marginTop
            });
        }
        if (newOrientation === "landscape") {
            //console.log("setting sizes to landscape");
            marginTop = 0;
            $(this).css({
                'width': $(this).attr("aspect") * slideshowHeight,
                'height': slideshowHeight,
                'margin-left': 'auto',
                'margin-right': 'auto',
                'margin-top': 0
            });
        }
    });
}