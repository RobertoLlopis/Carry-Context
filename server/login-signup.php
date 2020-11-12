<?php
session_start();
include 'utils.php';

if (isset($_POST['checkError'])) {
    if (isset($_SESSION['log-error'])) {
        echo 'true';
        unset($_SESSION['log-error']);
    } else {
        echo 'false';
    }
    exit;
}
if (isset($_POST['confirm'])) {
    //TODO:
    //logic for sign up
}
if (isset($_POST['username'])) {
    $users = file_get_contents('JSON/users.json');
    //var_dump($users);
    //echo '<br/>';
    $users_array = json_decode($users, true);
    //var_dump($users_array); 

    foreach ($users_array as $user) {
        if ($user['name'] == $_POST['username'] && $user['password'] == $_POST['password']) {
            $userLogged = ['id' => array_search($user, $users_array),  'name' => $user['name'], 'password' => $user['password']];
            $_SESSION['logged'] = $userLogged;

            unset($_SESSION['log-error']);
            redirect('../index.php');
        }
    }

    if (!isset($_SESSION['logged'])) {
        echo 'Something did not pass';
        $_SESSION['log-error'] = 'true';
        redirect('../client/html/login.html');
    }
}
