<?php
include 'utils.php';
session_start();

if(isset($_POST['name'])){
    $users = getUsersArr();

    $new_playlist = [
        'id'=> $_POST['update'] !== 'false' ? $_POST['update'] : rand(),
        'name' => $_POST['name'],
        'track_list' => json_decode($_POST['track_list'])
    ];
    
    if(array_key_exists($_SESSION['logged']['id'], $users)) $users[$_SESSION['logged']['id']]['playlists'][$new_playlist['id']] = $new_playlist;

    file_put_contents('JSON/users.json', json_encode($users));

    echo json_encode($new_playlist);
    exit;
}
if(isset($_GET['playlist_id'])){
    $users = getUsersArr();
    echo json_encode($users[$_SESSION['logged']['id']]['playlists'][$_GET['playlist_id']]);
    exit;
}
if(isset($_POST['delete_id'])){
    $users = getUsersArr();

    if(array_key_exists($_SESSION['logged']['id'], $users)) unset($users[$_SESSION['logged']['id']]['playlists'][$_POST['delete_id']]);

    file_put_contents('JSON/users.json', json_encode($users));

    echo 'deleted playlist: ' . $_POST['delete_id'];
}
if(isset($_SESSION['logged'])){
    $users = getUsersArr();
    echo json_encode($users[$_SESSION['logged']['id']]['playlists']);
}

