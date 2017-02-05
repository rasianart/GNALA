
var URL;
var update_img;
var newSrc;
var x = document.getElementById("putImageHere");
var countColor = 0;


const setApp = () => {

    let imagesSent = {};


    var canvas = document.getElementById('viewport')
    var context = canvas.getContext('2d');
    const theImageHoldThing = document.getElementById('putImageHere');


    const make_base = (imgUrl, imageIDD) => {
        var base_image = new Image();
        base_image.src = imgUrl;

        base_image.onload = () => {
            context.drawImage(base_image, 0, 0);
        }
    }
    const xhrPost = (imageURL, cb) => {
        var data = JSON.stringify({ imgSrc: imageURL });

        var request = new XMLHttpRequest();
        request.open('POST', '/storeimage', true);
        request.setRequestHeader("Content-type", "application/json");
        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                var resp = request.responseText;

                cb(JSON.parse(resp));

            } else {

            }
        };
        request.onerror = () => {
            console.log('things happened');
        };
        request.send(data);

    };

    const createImgTagString = (imgOBJ) => {
        return '<img  id="' + imgOBJ.imageID + '" src="' + imgOBJ.newImgSrc + '">';
    }

    function takeImageAndDoStuff(imageObject) {
        theImageHoldThing.innerHTML += createImgTagString(imageObject);
        make_base(imageObject.newImgSrc, imageObject.imageID);
        newSrc = imageObject.newImgSrc;
    }

    var randScale = 20;
    $('.node').on('click', function() {
        randScale = Math.floor(Math.random() * 30) + 5;
    })

    var $dragg = $(".dragg"),
        $dropp = $(".dropp"),
        $dropp2 = $(".dropp2"),
        $dropp3 = $(".dropp3"),
        $dropp4 = $(".dropp4");
        $dropp5 = $(".dropp5");
        $dropp6 = $(".dropp6");

    var counts = [0];
    var resizeOpts = {
        handles: "all",
        autohide: true
    };
    // Let the dragg items be draggable
    $(".dragImg, .node", $dragg).draggable({
        opacity: 0.35, //setting opacity on drag
        // revert: "invalid", // when not dropped, the item will revert back to its initial position
        containment: "document", //contained within DOM
        // helper: "clone", //cloning what user drags in
        cursor: "move", //cursor indicates moving
    });

    $dropp2.droppable({
        drop: function(event, ui) {
            if (ui.draggable.hasClass("node")) {
                // gainNode.gain.value = 1;
                // gain = gainNode.gain.value;
                pingPongDelay.bypass = 0;
                $(ui.draggable.context).css({
                    'background-color': 'white',
                    'width': randScale,
                    'height': randScale
                });
            }
        }
    });

    $dropp3.droppable({
        drop: function(event, ui) {
            if (ui.draggable.hasClass("node")) {
                overdrive.bypass = 0;
                $(ui.draggable.context).css({
                    'background-color': 'white',
                    'width': randScale,
                    'height': randScale
                });
            }
        }
    });

    $dropp4.droppable({
        drop: function(event, ui) {
            if (ui.draggable.hasClass("node")) {
                bitcrusher.bypass = 0;
                $(ui.draggable.context).css({
                    'background-color': 'white',
                    'width': randScale,
                    'height': randScale
                });
            }
        }
    });

    $dropp5.droppable({
        drop: function(event, ui) {
            if (ui.draggable.hasClass("node")) {
                tremolo.bypass = 0;
                $(ui.draggable.context).css({
                    'background-color': 'white',
                    'width': randScale,
                    'height': randScale
                });
            }
        }
    });

    $dropp6.droppable({
        drop: function(event, ui) {
            if (ui.draggable.hasClass("node")) {
                phaser.bypass = 0;
                $(ui.draggable.context).css({
                    'background-color': 'white',
                    'width': randScale,
                    'height': randScale
                });
            }
        }
    });

    // Let the dropp be droppable, accepting the dragg items
    $dropp.droppable({
        accept: "*",
        classes: {
            "ui-droppable-active": "ui-state-highlight"
        },
        drop: function(event, ui) {
            if (ui.draggable.hasClass("dragImg")) {
                var imgThing = $(ui.draggable.context).data('url');
                var chosenWave = $(ui.draggable.context).data('randomWave');
                $(".dropp .dragImg").addClass("item-" + counts[0]);
                $(".dropp .img").addClass("imgSize-" + counts[0]);
                $(".dropp .item-" + counts[0]).removeClass("dragImg ui-draggable ui-draggable-dragging");
                $(".item-" + counts[0]).dblclick(function() {
                    $(this).remove();
                });
                make_draggable($(".item-" + counts[0]), 'parent');
                $(".imgSize-" + counts[0]).resizable(resizeOpts);
                xhrPost(imgThing, takeImageAndDoStuff);

                function arrayAverage(callback) {
                    colorRGB = [];
                    colorToLetter = [];
                    var varLetter = Math.floor(Math.random() * 35) + 65;
                    for (var x = 0; x < colorR.length; x++) {
                        if (x % 100 === 0 & colorR[x] !== 0) {
                            var avR = (colorR[x] + colorR[x - 100]) / 20 + 65;
                            var avG = (colorG[x] + colorG[x - 100]) / 20 + 65;
                            var avB = (colorB[x] + colorB[x - 100]) / 20 + 65;
                            var avRGB = Math.floor((avR + avG + avB) / 3);
                            colorRGB.push(avRGB);
                            colorToLetter.push(String.fromCharCode(avRGB));
                        }
                    }
                    $('input').val(colorToLetter.toString());
                    callback();
                }

                // function startWorker(chosenWave) {
                //     var w = new Worker("worker.js");
                // }
                var wait = setTimeout(oneSec, 1000);
                
                function oneSec() {
                    handleFiles(newSrc, chosenWave);
                    loadSound(audio.src);
                    arrayAverage(run);
                }

                function run() {
                    counter = setInterval(decrement, 1);
                }

                function decrement() {
                    $('#color-sphere').css('background-color', 'rgb(' + colorR[countColor] + ',' + colorG[countColor] + ',' + colorB[countColor] + ')');
                    countColor++;
                    if (countColor > colorR.length / 8) {
                        stop();
                    }
                }

                function stop() {
                    clearInterval(counter);
                    countColor = 0;
                    $('#color-sphere').css('background-color', 'transparent');
                } 
            }
        }
    });

    //set to position absolute
    var zIndex = 0;

    function make_draggable(elements, containment) {
        elements.draggable({
            containment: containment || 'document',
            start: function(event, ui) { ui.helper.css('z-index', ++zIndex); },
            stop: function(event, ui) {}
        });
    }
};
setApp();
