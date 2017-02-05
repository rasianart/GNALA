var sampleRate = 44100,
    bufferSize = 1024,
    bitDepth = 16,
    channels = 1,
    bytesPerSample = bitDepth >> 3,
    bytesPerSecond = sampleRate * bytesPerSample;

var source,
    canvas,
    ctx,
    max_x,
    max_y,
    colorR = [],
    colorG = [],
    colorB = [],
    colorRA = [],
    colorGA = [],
    colorBA = [],
    colorRGB = [],
    colorToLetter = [];

var imageData,
    maximizer = 0,
    mode = 0,
    min_v = Math.log(200),
    max_v = Math.log(16000);

function analyse(waves) {
    colorR = [];
    colorG = [];
    colorB = [];
    colorRA = [];
    colorGA = [];
    colorBA = [];
    colorRGB = [];
    canvas = document.getElementById('myCanvas');
    canvas2 = document.getElementById('width');



    canvas.width = document.body.clientWidth;
    canvas.height = 150;
    // change canvas.height = wave for a random height generator

    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.drawImage(choice, 0, choice.height / 2);

    imageData = [];

    var canvasData = ctx.getImageData(0, 10, canvas.width, canvas.height);

    for (var i = 0, j = canvasData.width; i < j; i++) {
        imageData[i] = new Array(canvasData.height);
    };

    for (var x = 0; x < canvasData.width; x++) {
        for (var y = 0; y < canvasData.height; y++) {
            var idx = (x + y * canvas.width) * 4;
            var r = canvasData.data[idx + 0];
            var g = canvasData.data[idx + 1];
            var b = canvasData.data[idx + 2];
            if (x % 10 === 0 && colorR.length < 8000) {
                colorR.push(r);
                colorG.push(g);
                colorB.push(b);
            }
            var gray = (r + g + b) / 3;
            var reverse_y = canvasData.height - y - 1;
            imageData[x][reverse_y] = gray;
        };
    };

    max_x = imageData.length;
    max_y = imageData[0].length;
    ctx.closePath();
};

function sine(frequency, amplitude) {
    var samples = new Float32Array(bufferSize);
    var k = 2 * Math.PI * frequency / sampleRate;
    var currentSoundSample = 0;

    for (var i = 0; i < samples.length; i++) {
        samples[i] = Math.sin(k * currentSoundSample++) * amplitude;
    };
    return samples;
};

function generate() {
    var x = 0;
    wave = [];
    if (mode == 1) {
        var scale = (max_v - min_v) / max_y;
    };
    while (x < max_x) {
        var presample = new Float32Array(bufferSize);
        for (var y = 0; y < max_y; y++) {
            var color = imageData[x][y] / 1.5;
            if (color == 0) {} else {
                var frequency = (mode == 0) ? Math.floor(sampleRate / bufferSize * y) : Math.round(Math.exp(min_v + scale * y));
                var amplitude = (color / 255).toFixed(3);
                var singal = sine(frequency, amplitude);
                for (var i = 0; i < singal.length; i++) {
                    presample[i] += singal[i];
                };
            };
        };
        for (var n = 0; n < presample.length; n++) {
            wave.push(Math.floor(presample[n] * 10000 / max_y))
        };
        x++;
    };
    // document.getElementById('o_button').style.display = 'block';
};


var btoa = window.btoa || function(input) {
    /* Base 64 encoding function originally written by Tyler Akins (http://rumkin.com), available in the public domain */
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        };

        output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
    } while (i < input.length);

    return output;
};

var getWaveURI = function() {
    if (maximizer == 1) {
        var max_sample = Math.max.apply(Math, wave);
        var min_sample = Math.abs(Math.min.apply(Math, wave));
        var max_number = (max_sample > min_sample) ? max_sample : min_sample;

        var ratio = Math.floor(32767 / max_number);

        for (var i = 0, j = wave.length; i < j; i++) {
            wave[i] = wave[i] * ratio;
        };
    };

    /* codes below originally written by David Humphrey & Yury Delendik available on http://audioscene.org/scene-files/humph/sfxr/
       Licensed under the Apache License, Version 2.0 - http://www.apache.org/licenses/LICENSE-2.0 */

    function packUInt16(value) {
        var i0 = (value & 255),
            i1 = (value >> 8) & 255;
        return String.fromCharCode(i0, i1);
    };

    function packUInt32(value) {
        var i0 = (value & 255),
            i1 = (value >> 8) & 255,
            i2 = (value >> 16) & 255,
            i3 = (value >>> 24) & 255;
        return String.fromCharCode(i0, i1, i2, i3);
    };

    function packInt16Array(value) {
        var dataItems = [],
            dataItem = "";
        for (var i = 0, length = value.length; i < length; ++i) {
            if (dataItem.length >= 1024) {
                dataItems.push(dataItem);
                dataItem = "";
            };
            dataItem += packUInt16(value[i] & 0xFFFF);
        };
        dataItems.push(dataItem);
        return dataItems.join('');
    };

    var data = packInt16Array(wave);

    var waveFileChunks = [];
    waveFileChunks.push("RIFF");
    waveFileChunks.push(packUInt32(36 + data.length));
    waveFileChunks.push("WAVE");
    waveFileChunks.push("fmt ");
    waveFileChunks.push(packUInt32(16));
    waveFileChunks.push(packUInt16(1));
    waveFileChunks.push(packUInt16(channels));
    waveFileChunks.push(packUInt32(sampleRate));
    waveFileChunks.push(packUInt32(bytesPerSecond));
    waveFileChunks.push(packUInt16(bytesPerSample));
    waveFileChunks.push(packUInt16(bitDepth));
    waveFileChunks.push("data");
    waveFileChunks.push(packUInt32(data.length));
    waveFileChunks.push(data);

    var out = waveFileChunks.join('');
    return "data:audio/wav;base64," + btoa(out);

    /************************************************************************************************************************/
};

var audio = new Audio();

function generateWave() {
    var wavData = getWaveURI();
    audio.src = wavData;
};


var choice;

function handleFiles(image, waves) {
    choice = new Image;
    var files = this.files;
    choice.src = image;
    analyse(waves);
    generate();
    generateWave();
    var wait2 = setTimeout(halfSec, 500);
    function halfSec() {
        $('.visualizer').css('opacity', '1');          
    }

}

function check(value) {
    mode = value;
    if (value == 1) {
        document.getElementById('log_box').style.display = 'block';
    } else {
        document.getElementById('log_box').style.display = 'none';
    };
};

/* Written by ZhangJW [Bypass Netlabel] for friends
   mailto: bypasslabel @ gmail.com || http://bp.bai-hua.org
   Copyright (c) 2011, ZhangJW. All rights reserved.  */
