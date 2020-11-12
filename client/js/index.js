/*=================================
=========== Init app
=================================*/
showUserPlaylists();
$('#playlist-info').hide();

/*=================================
========= Results songs  
=================================*/
var currentResults = {};
var currentPlaylist = {};

/*=================================
============ Listeners 
=================================*/

$('body').click(handleCloseElements);
$("#Search").on('keyup', handleKeyUp);
$('#Search').submit(handleFinnishType);
$('#suggestion-container').click(handleSuggestionClick);
$('#result-div').click(handleResultClick);
$('.playlists-list').click(handleplaylistClick);
$('#main-header').click(handleMainHeaderClick);

function handleMainHeaderClick(e) {
    if (e.target.closest('.playlist-from-results')) {
        createPlaylistFromResults();
        return;
    }
    if (e.target.closest('.far')) {
        var playlistId = e.target.closest('#playlist-info').dataset.playlist_id;
        if (e.target.closest('.fa-trash-alt')) {
            deletePlaylist(playlistId);
            return;
        }
        if (e.target.closest('.fa-save')) {
            //Take current Result and currentPlaylist,
            //merge them and update playlist
            savePlaylist();
            return;
        }

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
        var trackId = e.target.closest('.result-card').id; // ex: musix-38749827423
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
            //remove from results result-card
            var cardToRemove = e.currentTarget.querySelector('#' + trackId);
            var idJustNumber = trackId.split('-')[1];
            console.log('Id to delete from currentPlaylist', idJustNumber);
            if (currentPlaylist.track_list[idJustNumber]) {
                deleteOneTrackInCurrentPlaylist(idJustNumber);
            }
            cardToRemove.remove();
            delete currentResults.trackId;
        }
    }
}

function handleCloseElements(e) {
    if (!e.target.closest('#suggestion-container') && $('#suggestion-container').css('display') !== 'none') $('#suggestion-container').fadeOut();
}

function createPlaylistFromResults(e) {
    var playListName = window.prompt('How do you want to call it?', 'Created: ' + new Date().toLocaleDateString('es-ES') + ' - ' + new Date().toLocaleTimeString('es-ES'));
    var playlistContent = currentResults;
    createPlaylist(playListName, playlistContent).then(text => {
        console.log(text);
        var newPlaylist = JSON.parse(text)
        console.log(newPlaylist);
        createAsidePlaylist(newPlaylist);
    });
}

function handleplaylistClick(e) {
    if (e.target.closest('li')) {
        playlistId = e.target.closest('li').id.slice(1);

        getOnePlaylist(playlistId)
            .then(text => {
                var playlist = JSON.parse(text);

                currentPlaylist = playlist;
                currentResults = {};

                updatePlaylistDisplayInfo(playlist.id, playlist.name);
                toggleMainHeaderDisplay();

                for (var track in playlist.track_list) {
                    createResultCard(playlist.track_list[track]);
                }
            });

    }
}

/*=================================
======== Manager functions
=================================*/

function showUserPlaylists() {
    getUserPlaylists().then(text => {
        var playlists = JSON.parse(text);
        for (var playlist in playlists) {
            console.log(playlist);
            if (playlist != 'favourites') {
                createAsidePlaylist(playlists[playlist]);
            }
        };
    });
}

function savePlaylist() {
    for (var track in currentResults) {
        console.log(track);
        currentPlaylist.track_list[track] = currentResults[track];
    }
    console.log(currentPlaylist.track_list);
    createPlaylist(currentPlaylist.name, currentPlaylist.track_list, currentPlaylist.id);
}

function deleteOneTrackInCurrentPlaylist(id) {
    for (var track in currentPlaylist.track_list) {
        console.log(track);
        if (id == track) {
            delete currentPlaylist.track_list[id];
        }
    }
}