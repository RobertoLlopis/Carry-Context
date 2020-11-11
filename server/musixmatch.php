<?php
include 'utils.php';

if (isset($_POST['search_value']) && isset($_POST['search_kind'])){
    $URI_TO_SEARCH = "track.search?q_". $_POST['search_kind'] . "=" . str_replace(" ", "%20", $_POST['search_value']) . "&apikey=428a08e0865ff96590f41fa6a7d0d3e8&page_size=6&page=1&s_track_rating=desc";
    echo json_encode(curl_musix($URI_TO_SEARCH, 'track_list'));
    exit;
}
