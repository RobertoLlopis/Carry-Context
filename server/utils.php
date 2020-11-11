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

function redirect($url)
{
    ob_start();
    header('Location: ' . $url);
    ob_end_flush();
}
