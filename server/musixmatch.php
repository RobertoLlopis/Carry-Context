<?php


if (isset($_POST['search_value'])){

    $BASE_URL = "http://api.musixmatch.com/ws/1.1/";
    $URI_SEARCH_LYRIC = "track.search?q_lyrics=". str_replace(" ", "%20", $_POST['search_value']) . "&apikey=428a08e0865ff96590f41fa6a7d0d3e8&page_size=6&page=1&s_track_rating=desc";
    $headers = array(
        'Accept: application/json',
        'Content-Type: application/json',
        );
    // create curl resource
    $ch = curl_init();

    // set url
    curl_setopt($ch, CURLOPT_URL, $BASE_URL.$URI_SEARCH_LYRIC);
    //return the transfer as a string
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    // $output contains the output string
    $output = curl_exec($ch);

    // close curl resource to free up system resources
    curl_close($ch);

    echo $output;
}
