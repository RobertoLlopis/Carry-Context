<?php
include 'utils.php';
session_start();

if(isset($_POST['name'])){
    $users = json_decode(file_get_contents('JSON/users.json'), true);
    $new_playlist = ['id'=> rand(), 'name' => $_POST['name'], 'track_list' => json_decode($_POST['track_list'])];
    
    if(array_key_exists($_SESSION['logged']['id'], $users)) $users[$_SESSION['logged']['id']]['playlists'][$new_playlist['id']] = $new_playlist;

    file_put_contents('JSON/users.json', json_encode($users));

    echo json_encode($new_playlist);
    exit;
}
if(isset($_GET['playlist_id'])){
    $users = json_decode(file_get_contents('JSON/users.json'), true);
    echo json_encode($users[$_SESSION['logged']['id']]['playlists'][$_GET['playlist_id']]);
    exit;
}
if(isset($_SESSION['logged'])){
    $users = json_decode(file_get_contents('JSON/users.json'), true);
    echo json_encode($users[$_SESSION['logged']['id']]['playlists']);
}

