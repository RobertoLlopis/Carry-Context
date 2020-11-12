
//fetch('server/utils.php').then(res => res.text()).then(text => console.log(text));
function newFormData(objectToAppend) {
    var formData = new FormData();
    var keyValuePairs = Object.entries(objectToAppend);
    keyValuePairs.forEach(pair => {
        console.log(pair);
        formData.append(
            pair[0],
            typeof pair[1] != 'string'
                ? JSON.stringify(pair[1])
                : pair[1]);
    });
    return formData;
}

function musix_find_by(kind, search_value) {
    var formData = new FormData();
    formData.append('search_value', search_value);
    formData.append('search_kind', kind);
    return fetch('server/musixmatch.php', { method: 'POST', body: formData }).then(res => res.text());
}

function get_complete_track(trackInfo) {
    var formData = new FormData();
    formData.append('track_info', JSON.stringify(trackInfo));
    return fetch('server/complete_track.php', {
        method: 'POST',
        body: formData
    }).then(res =>
        res.text()
    );
};

function getUserPlaylists() {
    return fetch('server/playlist.php')
        .then(res => res.text())
}

function createPlaylist(playListName, playlistContent) {
    var formData = newFormData({
        'name': playListName,
        'track_list': playlistContent
    });
    return fetch('server/playlist.php', {
        method: 'POST', body: formData
    }).then(res => res.text());
}