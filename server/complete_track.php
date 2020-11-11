<?php
include 'utils.php';
require 'vendor/autoload.php';

if (isset($_POST['track_info'])){

    $track_info = json_decode($_POST['track_info'], true);

    $complete_track = [];

    $complete_track['musix'] = get_musix_track($track_info);

    $complete_track['spotify'] = curl_spotify($track_info);

    echo json_encode($complete_track);
}
function curl_spotify($track_info){

    $api = new SpotifyWebAPI\SpotifyWebAPI();
    $token_file = 'spotify_token.txt';

    //Check if token expired and if so create new one
    /* echo time();
    echo '<br/>';
    echo filemtime($token_file);
    echo '<br/>';
    echo 55 * 60000;
    echo '<br/>';
    echo time() - filemtime($token_file) > 55 * 60000; */
    //if( time() - filemtime($token_file) > 55 * 60000 ){
    //    $api->setAccessToken(getSpotifyToken());
    //} else {
        $api->setAccessToken(file_get_contents('spotify_token.txt'));
    //}
    
    // It's now possible to request data from the Spotify catalog
    $formatted_track_name = str_contains($track_info['track_name'], '(') 
        ? explode('(', $track_info['track_name'])[0]
        :  $track_info['track_name'];

    $spotify_results = $api->search($formatted_track_name, 'track', ['limit'=> '6']);
    //var_dump($spotify_results);
    $spotify_results_array = json_decode(json_encode($spotify_results), TRUE);

    foreach($spotify_results_array['tracks']['items'] as $track){
        $artists = $track['artists'];
        foreach($artists as $single_artist){
            if(str_contains(strtolower ($track_info['artist_name']), strtolower ($single_artist['name']))){
                return $track;
            }
        }
    }

    return false;
    //var_dump($spotify_results);
    //echo json_encode($track_info);
}
function get_musix_track($track_info){
    $musix_track = [];
    
    $URI_CURL_TRACK = "track.get?track_id=". $track_info['track_musix_id'] . "&apikey=428a08e0865ff96590f41fa6a7d0d3e8";
    $URI_CURL_LYRIC = "track.lyrics.get?track_id=". $track_info['track_musix_id'] . "&apikey=428a08e0865ff96590f41fa6a7d0d3e8";

    $musix_track = array_merge(curl_musix($URI_CURL_TRACK, 'track'), curl_musix($URI_CURL_LYRIC, 'lyrics'));

    return $musix_track;
}
function search_by_lyric_musix($track_info){
    $URI_TO_SEARCH = "track.search?q_lyrics=". str_replace(" ", "%20", $_POST['search_value']) . "&apikey=428a08e0865ff96590f41fa6a7d0d3e8&page_size=6&page=1&s_track_rating=desc";
    
}

