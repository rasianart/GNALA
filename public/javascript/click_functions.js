var recal = $('#recal');

$(document).on('keypress', function(e) {
    if (e.which == 13 && $(this).find("input").val() !== '') {
        e.preventDefault();
        recal.html('Recallibration');
        recal.css({ 'border': '1px solid grey', 'cursor': 'pointer' });
        recal.addClass('force-hover');
    }
});

$(document).on('click', function(e) {
    if ($(this).find("input").val() === '') {
        recal.html('Enter Data');
        recal.css({ 'border': 'none', 'cursor': 'default' });
        recal.removeClass('force-hover');
    }
});

$('#recal').on('click', function(e) {
    if (recal.html() === 'Recallibration') {
        console.log('hey');
        e.preventDefault();
        $(".dragg .thumbnail").each(function(index, element) {
            function excludeOffset() {
                var oneOrTwo = Math.floor(Math.random() * 2) + 1;
                var randOffset = Math.floor(Math.random() * 450) + 50;
                console.log(oneOrTwo);
                if (oneOrTwo == 1) {
                    return randOffset;
                } else {
                    return randOffset + 830;
                }
            }
            $('#image' + index).offset({ left: excludeOffset() });
            console.log(excludeOffset());
        });
        return false;
    }
});

$('#reset').on('click', function(e) {
	$('.visualizer').css('opacity', '0');
    $('#name').val('');
    e.preventDefault();
    pingPongDelay.bypass = 1;
    overdrive.bypass = 1;
    bitcrusher.bypass = 1;
    tremolo.bypass = 1;
    phaser.bypass = 1;
    var gnala = $('<div id="gnala">GNALA</div>');
    gnala.css('opacity', '0').appendTo('body');
    gnala.fadeIn( "slow", function() {
        gnala.css('opacity', '1');
    });
    $('#sphere1').css({
        'left': $("#sphere1").data('originalLeft'),
        'top': $("#sphere1").data('origionalTop'),
        'width': '60px',
        'height': '60px',
        'background-color': '#999',
        'opacity': '.5'
    });
    $('#sphere2').css({
        'left': $("#sphere2").data('originalLeft'),
        'top': $("#sphere2").data('origionalTop'),
        'width': '60px',
        'height': '60px',
        'background-color': '#999',
        'opacity': '.5'
    });
    $('#sphere3').css({
        'left': $("#sphere3").data('originalLeft'),
        'top': $("#sphere3").data('origionalTop'),
        'width': '60px',
        'height': '60px',
        'background-color': '#999',
        'opacity': '.5'
    });
    $('#sphere4').css({
        'left': $("#sphere4").data('originalLeft'),
        'top': $("#sphere4").data('origionalTop'),
        'width': '60px',
        'height': '60px',
        'background-color': '#999',
        'opacity': '.5'
    });
    $('#sphere5').css({
        'left': $("#sphere5").data('originalLeft'),
        'top': $("#sphere5").data('origionalTop'),
        'width': '60px',
        'height': '60px',
        'background-color': '#999',
        'opacity': '.5'
    });
    $('#sphere6').css({
        'left': $("#sphere6").data('originalLeft'),
        'top': $("#sphere6").data('origionalTop'),
        'width': '60px',
        'height': '60px',
        'background-color': '#999',
        'opacity': '.5'
    });
    $('#sphere7').css({
        'left': $("#sphere7").data('originalLeft'),
        'top': $("#sphere7").data('origionalTop'),
        'width': '60px',
        'height': '60px',
        'background-color': '#999',
        'opacity': '.5'
    });
    $('#sphere8').css({
        'left': $("#sphere8").data('originalLeft'),
        'top': $("#sphere8").data('origionalTop'),
        'width': '60px',
        'height': '60px',
        'background-color': '#999',
        'opacity': '.5'
    });
    $('#sphere9').css({
        'left': $("#sphere9").data('originalLeft'),
        'top': $("#sphere9").data('origionalTop'),
        'width': '60px',
        'height': '60px',
        'background-color': '#999',
        'opacity': '.5'
    });
    $('#sphere10').css({
        'left': $("#sphere10").data('originalLeft'),
        'top': $("#sphere10").data('origionalTop'),
        'width': '60px',
        'height': '60px',
        'background-color': '#999',
        'opacity': '.5'
    });
    $('#image0, #image1, #image2, #image3, #image4, #image5, #image6, #image7, #image8, #image9').css({
        'left': '0px',
        'top': '0px',
        'width': '60px',
        'height': '60px',
        'background-image': 'none'
    });
    $('#reset').css('opacity', '0');
    recal.html('Enter Data');
    recal.css({ 'border': 'none', 'cursor': 'default' });
    recal.removeClass('force-hover');
});

$('input').on('click', function() {
    $(this).val('');
});
$('#node-selector').mouseenter(function() {
    $('#node-selector2').css({ 'opacity': '1', 'z-index': '3' });
    $('#gnala').css({ 'opacity': '0', 'z-index': '0' });
});
$('#node-selector').mouseleave(function() {
    $('#node-selector2').css({ 'opacity': '0', 'z-index': '0' });
    $('#gnala').css({ 'opacity': '1', 'z-index': '5' });
});
$('#signals').mouseenter(function() {
    $('#signals2').css({ 'opacity': '1', 'z-index': '3' });
    $('#gnala').css({ 'opacity': '0', 'z-index': '0' });
});
$('#signals').mouseleave(function() {
    $('#signals2').css({ 'opacity': '0', 'z-index': '0' });
    $('#gnala').css({ 'opacity': '1', 'z-index': '5' });
});
$('#circleB').mouseenter(function() {
    $('.circle').css('transform', 'scale(.85)');
});
$('#circleB').mouseleave(function() {
    $('.circle').css('transform', 'scale(1)');
});
$('.circle2').mouseenter(function() {
    $('#ping').css('opacity', '.5');
});
$('.circle2').mouseleave(function() {
    $('#ping').css('opacity', '0');
});
$('.circle3').mouseenter(function() {
    $('#overdrive').css('opacity', '.5');
    $('#inner-circle').css('opacity', '1');
});
$('.circle3').mouseleave(function() {
    $('#overdrive').css('opacity', '0');
    $('#inner-circle').css('opacity', '.5');
});
$('.circle4').mouseenter(function() {
    $('#bitcrusher').css('opacity', '.5');
    $(this).css('background-color', 'transparent');
});
$('.circle4').mouseleave(function() {
    $('#bitcrusher').css('opacity', '0');
    $(this).css('background-color', 'rgba(214,204,192, .1)');
});
$('.circle5').mouseenter(function() {
    $('#tremolo').css('opacity', '.5');
});
$('.circle5').mouseleave(function() {
    $('#tremolo').css('opacity', '0');
});
$('.circle6').mouseenter(function() {
    $('#phaser').css('opacity', '.5');
});
$('.circle6').mouseleave(function() {
    $('#phaser').css('opacity', '0');
});
$('#sphere1').data({
    'originalLeft': $('#sphere1').css('left'),
    'origionalTop': $('#sphere1').css('top'),
});
$('#sphere2').data({
    'originalLeft': $('#sphere2').css('left'),
    'origionalTop': $('#sphere2').css('top'),
});
$('#sphere3').data({
    'originalLeft': $('#sphere3').css('left'),
    'origionalTop': $('#sphere3').css('top'),
});
$('#sphere4').data({
    'originalLeft': $('#sphere4').css('left'),
    'origionalTop': $('#sphere4').css('top'),
});
$('#sphere5').data({
    'originalLeft': $('#sphere5').css('left'),
    'origionalTop': $('#sphere5').css('top'),
});
$('#sphere6').data({
    'originalLeft': $('#sphere6').css('left'),
    'origionalTop': $('#sphere6').css('top'),
});
$('#sphere7').data({
    'originalLeft': $('#sphere7').css('left'),
    'origionalTop': $('#sphere7').css('top'),
});
$('#sphere8').data({
    'originalLeft': $('#sphere8').css('left'),
    'origionalTop': $('#sphere8').css('top'),
});
$('#sphere9').data({
    'originalLeft': $('#sphere9').css('left'),
    'origionalTop': $('#sphere9').css('top'),
});
$('#sphere10').data({
    'originalLeft': $('#sphere10').css('left'),
    'origionalTop': $('#sphere10').css('top'),
});

$('.two-down').mouseenter(function() {
    var blip = new Audio('./audio/blip.mp3');
    blip.play();
});

