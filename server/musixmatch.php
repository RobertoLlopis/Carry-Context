<?php
include 'utils.php';

if (isset($_POST['search_value'])){

    $URI_SEARCH_LYRIC = "track.search?q_lyrics=". str_replace(" ", "%20", $_POST['search_value']) . "&apikey=428a08e0865ff96590f41fa6a7d0d3e8&page_size=6&page=1&s_track_rating=desc";
    echo json_encode(curl_musix($URI_SEARCH_LYRIC, 'track_list'));
}
