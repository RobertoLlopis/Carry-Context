
function createSearchSuggestionDiv(song) {
    var div = `
    <div class="suggestion w-100" data-artistId="${song.artist_id}" data-trackId="${song.track_id}">
        <p>Song: <span class="track-name font-weight-bold">${song.track_name}</span> - Artist: <span class="artist-name font-weight-bold">${song.artist_name}</span></p>
        <i class="fas fa-plus"></i>
    </div>
    `;
    $('#suggestion-container').append($(div));
}

function createResultCard(track) {
    var resultCard = `
    <div id="${track.musix.track_id}" class="result-card w-100 p-1 shadow-sm" data-lyric="${track.musix.lyrics_body}" data-spotify="${track.spotify.external_urls.spotify}">
        <img src="${track.spotify.album.images[1].url}" alt="album-image" class="p-0 h-100">
        <div class="d-flex flex-column mr-2 h-100 w-100 ">
            <div class="d-flex flex-column ml-2">
                <h3 class="result-title">${track.musix.track_name}</h3>
                <p class="result-artist">${track.musix.artist_name} </p>
            </div>
            <div class="action-container d-flex justify-content-around align-items-center px-4">
                <div class="rounded-circle text-align-center genius-color">
                    <i class="far fa-file-alt"></i>
                </div>
                <a href="${track.spotify.external_urls.spotify}" target="_blank" class="rounded-circle text-align-center spotify-color">
                    <i class="fab fa-spotify "></i> 
                </a>
                <div class="nav-item dropdown">
                    <div class="nav-link dropdown-toggle" id="dropdown${track.musix.track_id}" data-toggle="dropdown" aria-expanded="false">
                        <i class="fas fa-plus"></i>
                    </div>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown${track.musix.track_id}">
                        <p>Add to:    
                        <div class="dropdown-item">
                            Favourites
                        </div>
                    </div>
                </div>
                <div class="remove-result text-align-center">
                    <i class="far fa-trash-alt"></i>
                    Quit from list
                </div>
            </div>
        </div>
    </div>
    `

    $('#result-div').append(resultCard);
}