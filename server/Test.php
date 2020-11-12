<?php
require ("utils.php");

class Test extends PHPUnit_Framework_TestCase {
    public function testgetUsersArr() {
        $this->assertEquals(
            is_array(getUsersArr()),
            is_array([])
        ); 
    }
    public function testgetSpotifyToken() {
        $token_length = str_length('BQAbZTPYK2PenJfF37HO9NEXOzBhMI6nq_lCva7lLHJu7X1G2ZQTbR3yYTTl2B8RSFfJqujnhHH-ypAgLOg'); 
        $this->assertEquals(
            str_length(getSpotifyToken()), $token_length
        ); 
    }
}

?>