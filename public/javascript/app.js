navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
var tuna = new Tuna(audioCtx);
var voiceSelect = document.getElementById("voice");
var source;
var stream;

var soundSource, concertHallBuffer;

function loadSound(url, gain) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
        audioCtx.decodeAudioData(request.response, function(buffer) {
            soundBuffer = buffer;
            FilterSample.play(soundBuffer, gain);
        });
    }
    request.send();
}

//set up the different audio nodes we will use for the app
var analyser = audioCtx.createAnalyser();
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;

var pingPongDelay = new tuna.PingPongDelay({
    wetLevel: 1, //0 to 1
    feedback: .5, //0 to 1
    delayTimeLeft: 150, //1 to 10000 (milliseconds)
    delayTimeRight: 200, //1 to 10000 (milliseconds)
    bypass: 1
});

var chorus = new tuna.Chorus({
    rate: 1.5,
    feedback: 0.2,
    delay: 0.0045,
    bypass: 0
});

var delay = new tuna.Delay({
    feedback: 0.45, //0 to 1+
    delayTime: 150, //1 to 10000 milliseconds
    wetLevel: 0.25, //0 to 1+
    dryLevel: 1, //0 to 1+
    cutoff: 2000, //cutoff frequency of the built in lowpass-filter. 20 to 22050
    bypass: 0
});

var bitcrusher = new tuna.Bitcrusher({
    bits: 4, //1 to 16
    normfreq: 0.1, //0 to 1
    bufferSize: 4096, //256 to 16384
    bypass: 1
});

var overdrive = new tuna.Overdrive({
    outputGain: 0.5, //0 to 1+
    drive: 0.7, //0 to 1
    curveAmount: 1, //0 to 1
    algorithmIndex: 3, //0 to 5, selects one of our drive algorithms
    bypass: 1
});

var panner = new tuna.Panner({
    pan: 0 // -1 (left) to 1 (right)
});

var moog = new tuna.MoogFilter({
    cutoff: 0.065, //0 to 1
    resonance: 3.5, //0 to 4
    bufferSize: 4096 //256 to 16384
});

var wahwah = new tuna.WahWah({
    automode: true, //true/false
    baseFrequency: 0.5, //0 to 1
    excursionOctaves: 2, //1 to 6
    sweep: 0.2, //0 to 1
    resonance: 10, //1 to 100
    sensitivity: 0.5, //-1 to 1
    bypass: 0
});

var tremolo = new tuna.Tremolo({
    intensity: 0.3, //0 to 1
    rate: 4, //0.001 to 8
    stereoPhase: 0, //0 to 180
    bypass: 1
});

var cabinet = new tuna.Cabinet({
    makeupGain: 1, //0 to 20
    impulsePath: "impulses/impulse_guitar.wav", //path to your speaker impulse
    bypass: 0
});

var phaser = new tuna.Phaser({
    rate: 1.2, //0.01 to 8 is a decent range, but higher values are possible
    depth: 0.8, //0 to 1
    feedback: 0.8, //0 to 1+
    stereoPhase: 30, //0 to 180
    baseModulationFrequency: 700, //500 to 1500
    bypass: 1
});

var FilterSample = {
    FREQ_MUL: 7000,
    QUAL_MUL: 30,
    playing: false
};

var limiter = audioCtx.createDynamicsCompressor();
limiter.threshold.value = 0.0;

var distortion = audioCtx.createWaveShaper();
var gainNode = audioCtx.createGain();
var filter = audioCtx.createBiquadFilter();
var convolver = audioCtx.createConvolver();

FilterSample.play = function(buffer, gain) {
    var showCanvas = $('.visualizer');
    showCanvas.css('display', 'block');
    var source = audioCtx.createBufferSource();
    source.buffer = buffer;
    filter.detune.value = 100;
    distortion.curve = makeDistortionCurve(400);
    distortion.oversample = '4x';
    gainNode.gain.value = 10;
    convolver.normalize = true; // must be set before the buffer, to take effect
    convolver.buffer = soundBuffer;
    source.connect(overdrive);
    overdrive.connect(bitcrusher);
    bitcrusher.connect(tremolo);
    tremolo.connect(phaser);
    phaser.connect(pingPongDelay);
    pingPongDelay.connect(gainNode);
    gainNode.connect(limiter);
    limiter.connect(analyser);
    analyser.connect(audioCtx.destination);
    source.start(0);
    source.loop = false;
    visualize();
};

// distortion curve for the waveshaper, thanks to Kevin Ennis
// http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion

function makeDistortionCurve(amount) {
    var k = typeof amount === 'number' ? amount : 50,
        n_samples = 44100,
        curve = new Float32Array(n_samples),
        deg = Math.PI / 180,
        i = 0,
        x;
    for (; i < n_samples; ++i) {
        x = i * 2 / n_samples - 1;
        curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
    }
    return curve;
};

// set up canvas context for visualizer

var canvas = document.querySelector('.visualizer');
var canvasCtx = canvas.getContext("2d");

var intendedWidth = document.querySelector('.wrapper').clientWidth;

canvas.setAttribute('width', intendedWidth);

var visualSelect = document.getElementById("visual");

var drawVisual;

function visualize() {
    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    var visualSetting = visualSelect.value;
    analyser.fftSize = 2048;
    var bufferLength = analyser.fftSize;
    var dataArray = new Uint8Array(bufferLength);

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    function draw() {

        drawVisual = requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

        var r_a = 0.0;
        canvasCtx.fillStyle = 'rgba(214, 204, 192,' + r_a + ' )';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(255, 255, 255)';

        canvasCtx.beginPath();

        var sliceWidth = WIDTH * 1.0 / bufferLength;
        var x = 0;

        for (var i = 0; i < bufferLength; i++) {

            var v = dataArray[i] / 128.0;
            var y = v * HEIGHT;

            if (i === 0) {
                canvasCtx.moveTo(x, y);
            } else {
                canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
    };
    draw();
}
