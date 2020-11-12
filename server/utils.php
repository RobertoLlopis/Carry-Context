<?php
require 'vendor/autoload.php';

getSpotifyToken();
function getSpotifyToken(){
    $session = new SpotifyWebAPI\Session(
        'e3aceea3aa034b2e8ad92a78ebc0ab07',
        '5d915400bc71440ba2ef757840102136'
    );
    
    $session->requestCredentialsToken();
    $accessToken = $session->getAccessToken();
    
    // Store the access token somewhere. In a database for example.
    file_put_contents('spotify_token.txt', $accessToken);

    return $accessToken;
    // Send the user along and fetch some data!
}

function curl_musix($URI, $filter_response){
    $BASE_URL = "http://api.musixmatch.com/ws/1.1/";
    $headers = array(
        'Accept: application/json',
        'Content-Type: application/json',
        );
    $ch = curl_init();
    // set url
    curl_setopt($ch, CURLOPT_URL, $BASE_URL.$URI);
    //return the transfer as a string
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    
    // $output contains the output json
    $output = curl_exec($ch);

    // close curl resource to free up system resources
    curl_close($ch);

    // create curl resource
    return json_decode($output, true)['message']['body'][$filter_response];
}

function redirect($url)
{
    ob_start();
    header('Location: ' . $url);
    ob_end_flush();
}

function convertObjToArray($class){
    return json_decode(json_encode($class));
}