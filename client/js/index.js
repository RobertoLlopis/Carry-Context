/*=================================
============ Listeners 
=================================*/

$("#Search").on('keyup', handleKeyUp);
$('#Search').submit(handleFinnishType);
$('#suggestion-container').click(handleSuggestionClick);
$('#result-div').click(handleResultClick);

function handleResultClick(e) {
    var trackId = e.target.closest('.result-card').id;
    console.log(trackId);
    if (e.target.closest('.genius-color')) {
        //display lyrics dropdown

        console.log(QS('#lyric' + trackId));
        if (!QS('#lyric' + trackId)) {

            displayLyricDropdown(trackId);
            return;
        }

        $('#lyric' + trackId).addClass('scale-out-ver-top');
        setTimeout(() => $('#lyric' + trackId).remove(), 500);
    }
    if (e.target.closest('.remove-result')) {
        //remove from result result-card
        var cardToRemove = e.currentTarget.querySelector('#' + trackId);
        cardToRemove.remove();
    }
}

/*=================================
============ Handlers 
=================================*/
function handleSuggestionClick(e) {

    if (e.target.closest('.suggestion')) {
        var targetDiv = e.target.closest('.suggestion');

        var trackInfo = {
            artist_musix_id: targetDiv.dataset.artistid,
            track_musix_id: targetDiv.dataset.trackid,
            track_name: targetDiv.querySelector('.track-name').textContent,
            artist_name: targetDiv.querySelector('.artist-name').textContent
        }

        //search track lyric and spotify info
        get_complete_track(trackInfo)
            .then(res => {
                var completeTrackInfo = JSON.parse(res);
                console.log(completeTrackInfo);

                if (completeTrackInfo.spotify == false) {

                    console.error('Error in Spotify call');

                    $('#suggestion-container').empty();
                    $('#suggestion-container').hide();

                    return;
                };

                createResultCard(completeTrackInfo);

                $('#after-lyric-tracking').attr('src', completeTrackInfo.musix.script_tracking_url);
                $('#suggestion-container').empty();
                $('#suggestion-container').hide();
            });
        return;
    }

    console.log('not single suggestion clicked');
}

function handleFinnishType(e) {
    if (e) e.preventDefault();

    find_by_lyric($("#Search").val()).then(res => {
        console.log(res);
        var trackList = JSON.parse(res);

        if (trackList.length > 0) {
            $('#suggestion-container').empty();

            trackList.forEach(song => {
                createSearchSuggestionDiv(song.track);
            });

            $('#suggestion-container').fadeIn();
            return;
        }

    });
}

var typingTimer; //timer identifier
var doneTypingInterval = 400; //time in ms (400ms)

function handleKeyUp(e) {
    clearTimeout(typingTimer);
    //when last key up was 400ms ago trigger search
    if ($("#Search").val()) {
        typingTimer = setTimeout(handleFinnishType, doneTypingInterval);
    }
}