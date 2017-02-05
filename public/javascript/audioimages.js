var $element;
$('.dragImg').offset({ left: 0 });

function retrieveImages(e) {
    if (e.which == 13 && $(this).find("input").val() !== '') {
        e.preventDefault();
        $('#gnala').remove();
        $('.container').css('opacity', '1');
        var images = $(this).find("input").val().trim();
        var queryURL = "https://api.gettyimages.com/v3/search/images?page_size=10&phrase=" + images
        $.ajax({
                url: queryURL,
                method: 'GET',
                beforeSend: function(request) {
                    request.setRequestHeader("Api-Key", "wtdg2qx9qf3b9fafjr5evcbg")
                }

            })
            .done(function(response) {
                $('#reset').css({ 'opacity': '1', 'z-index': '5' });
                $('.container').css('opacity', '0');
                $('#vid-contain').css('opacity', '0');
                var results = response.images; //storing response in a variable
                $(".dragg .thumbnail").each(function(index, element) {
                    var waveNum = Math.floor(Math.random() * 151) + 50;
                    var randSize = Math.floor(Math.random() * 40) + 15;

                    function excludeOffset() {
                        var oneOrTwo = Math.floor(Math.random() * 2) + 1;
                        var randOffset = Math.floor(Math.random() * 450) + 50;
                        if (oneOrTwo == 1) {
                            return randOffset;
                        } else {
                            return randOffset + 820;
                        }
                    }
                    $element = $(element);
                    var imageUrl = results[index].display_sizes[0].uri;
                    $element.css({
                        backgroundImage: "url(" + imageUrl + ")"
                    });
                    $element.attr('id', "image" + index);
                    $('#image' + index).css({ 'width': randSize, 'height': randSize });
                    $('#image' + index).offset({ left: excludeOffset() });
                    $element.data('url', imageUrl);
                    $element.data('randomWave', waveNum);
                })

            });
    } else if (e.which == 13) {
        e.preventDefault();
    }
}

$(document).on('keypress', retrieveImages);
