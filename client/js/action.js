
//fetch('server/utils.php').then(res => res.text()).then(text => console.log(text));


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