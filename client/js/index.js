/*=================================
============ Listeners 
=================================*/

$('body').click(handleCloseElements);
$("#Search").on('keyup', handleKeyUp);
$('#Search').submit(handleFinnishType);
$('#suggestion-container').click(handleSuggestionClick);
$('#result-div').click(handleResultClick);


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
    if (QS('#lyric_search').checked) {
        musix_find_by('lyrics', $("#Search").val()).then(res => {

            var trackList = JSON.parse(res);
            showSuggestions(trackList);
        });
    }

    musix_find_by('track_artist', $("#Search").val()).then(res => {

        var trackList = JSON.parse(res);
        showSuggestions(trackList);
    })

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

function handleResultClick(e) {

    var trackId = e.target.closest('.result-card').id;
    if (e.target.closest('.genius-color')) {
        //display lyrics dropdown
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

function handleCloseElements(e) {
    if (!e.target.closest('#suggestion-container') && $('#suggestion-container').css('display') !== 'none') $('#suggestion-container').fadeOut();
}