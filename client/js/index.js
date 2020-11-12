/*=================================
=========== Init app
=================================*/
showUserPlaylists();
$('#playlist-info').hide();

/*=================================
========= Results songs  
=================================*/
var currentResults = {};

/*=================================
============ Listeners 
=================================*/

$('body').click(handleCloseElements);
$("#Search").on('keyup', handleKeyUp);
$('#Search').submit(handleFinnishType);
$('#suggestion-container').click(handleSuggestionClick);
$('#result-div').click(handleResultClick);
$('.playlist-from-results').click(handleCreatePlaylistFromResults);
$('.playlists-list').click(handleplaylistClick);

function handleplaylistClick(e) {
    if (e.target.closest('li')) {
        playlistId = e.target.closest('li').id.slice(1);
        console.log(playlistId);
        getOnePlaylist(playlistId)
            .then(text => {
                var playlist = JSON.parse(text);
                $('#result-div').empty();
                toggleMainHeaderDisplay();
                for (var track in playlist.track_list) {
                    createResultCard(playlist.track_list[track]);
                }
            });

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

                if (completeTrackInfo.spotify == false) {

                    console.error('Error in Spotify call');

                    $('#suggestion-container').empty();
                    $('#suggestion-container').hide();

                    return;
                };

                createResultCard(completeTrackInfo);

                currentResults[completeTrackInfo.musix.track_id] = completeTrackInfo;

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
    if (e.target.closest('.result-card')) {
        var trackId = e.target.closest('.result-card').id;
        if (e.target.closest('.genius-color')) {
            //display lyrics dropdown
            if (!QS('#lyric' + trackId)) {

                displayLyricDropdown(trackId);
                return;
            }

            $('#lyric' + trackId).addClass('scale-out-ver-top');
            setTimeout(() => $('#lyric' + trackId).remove(), 500);
            return;
        }

        if (e.target.closest('.remove-result')) {
            //remove from result result-card
            var cardToRemove = e.currentTarget.querySelector('#' + trackId);
            cardToRemove.remove();
            delete currentResults.trackId;
        }
    }
}

function handleCloseElements(e) {
    if (!e.target.closest('#suggestion-container') && $('#suggestion-container').css('display') !== 'none') $('#suggestion-container').fadeOut();
}

function handleCreatePlaylistFromResults(e) {
    var playListName = window.prompt('How do you want to call it?', 'Created: ' + new Date().toLocaleDateString('es-ES') + ' - ' + new Date().toLocaleTimeString('es-ES'));
    var playlistContent = currentResults;
    createPlaylist(playListName, playlistContent).then(text => {
        console.log(text);
        var newPlaylist = JSON.parse(text)
        console.log(newPlaylist);
        createAsidePlaylist(newPlaylist);
    });
}

/*=================================
======== Manager functions
=================================*/

function showUserPlaylists() {
    getUserPlaylists().then(text => {
        console.log(text);
        var playlists = JSON.parse(text);
        for (var playlist in playlists) {
            console.log(playlist);
            if (playlist != 'favourites') {
                createAsidePlaylist(playlists[playlist]);
            }
        };
    });
}