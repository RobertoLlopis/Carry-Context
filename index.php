<?php
session_start();
 if(!isset($_SESSION['logged'])){
  header('Location: client/html/login.html');
} 
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <link rel="apple-touch-icon" sizes="76x76" href="">
  <link rel="icon" type="image/png" href="">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <title>
    Carry - Context
  </title>
  <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
  <!--     Fonts and icons     -->
  <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
  <!-- CSS Files -->
  <link href="client/assets/css/bootstrap.min.css" rel="stylesheet" />
  <link href="client/assets/css/now-ui-kit.css?v=1.3.0" rel="stylesheet" />
  <link rel="stylesheet" href="client/css/index.css">
</head>

<body class="index-page container-fluid p-0">
  <!-- Navbar -->
  <nav class="navbar">
    <img src="client/assets/img/Carry-Context2.png" class="h-100" alt="">
    <form>
      <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span>
      <input type="text" id="Search" value="" placeholder="Search for any song´s lyric or title" role="searchbox" class="InputBox" autocomplete="off">
      <input type="submit" id="submit-search" class="Button" value="GO">
      <div id="suggestion-container">

      </div>
    </form>
  
    <div id="search-radio-container" class="d-flex flex-column ">
      <div class="mt-2">
        <label>
          <input class="" type="radio" name="song_lyric_search" id="song_search" >
          I know the song´s name
        </label>
      </div>

      <div>
        <label>
          <input class="" type="radio" name="song_lyric_search" id="lyric_search"  checked="true">
          I rather prefer search by lyric
        </label>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
  <div class="row content-wrapper">
    <aside class="aside col-3 p-0">
      <div class="aside-title">
        <h3>Playlists</h3>
        <button id="add-playlist" class="btn rounded-circle">
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <ul class="playlists-list">
        <li>
          <div>
            <i class="fas fa-star" style="color: #ffd800"></i>&nbsp; Favourites
          </div> 
          <div>
            <i class="far fa-eye"></i>&nbsp;&nbsp;
            <i class="fab fa-spotify"><div class="tooltip">Create it on Spotify!</div></i>
          </div>
        </li>
      </ul>
    </aside>
      <main class="main col-9 p-0">
        <div id="main-header" class="w-100 d-flex justify-content-center mt-2">
          <button class="playlist-from-results btn">Create playlist from results</button>
        </div>
        <div id="result-div" class="container">
          <div id="_2045572" class="result-card w-100 p-1 shadow-sm" data-lyric="I've been cheated by you since I don't know when
          So I've made up my mind it must come to an end
          Look at me now, will I ever learn
          I don't know how, but I suddenly lose control
          There's a fire within my soul
          Just one look and I can hear a bell ring
          One more look and I forget everything, oh
          
          Mama mia, here I go again
          My my, how can I resist ya
          Mama mia, does it show again
          My my, just how much I missed ya
          There's something broken-hearted
          New since the day we parted
          Why why, did I ever let you go
          Why why, did I ever let you go
          
          So when you're near me
          Darling can't you hear me
          S.O.S
          The love you gave me
          Nothing else can save me
          S.O.S
          When you're gone
          How can I even try to go on
          When you're gone
          Though I try, how can I, carry on
          
          Knowing me, knowing you
          There is nothing we can do
          Knowing me, knowing you
          We just had to face it
          This time we're through
          Breaking up is never easy, I know
          But I had to go
          Knowing me, knowing you
          It's the best I can do
          
          If you change your mind
          I'm the first in line
          ...
          
          ******* This Lyrics is NOT for Commercial use *******
          (1409620797604)" data-spotify="https://open.spotify.com/track/49J0w4O2wTigMRenIRGNKa">
                  <img src="https://i.scdn.co/image/ab67616d00001e02063c6bf8d05bfdc175c58b77" alt="album-image" class="p-0 h-100">
                  <div class="d-flex flex-column mr-2 h-100 w-100 ">
                      <div class="d-flex flex-column ml-2">
                          <h3 class="result-title">Abba Medley</h3>
                          <p class="result-artist">Dana Winner </p>
                      </div>
                      <div class="action-container d-flex justify-content-around align-items-center px-4">
                          <div class="rounded-circle text-align-center genius-color">
                              <i class="far fa-file-alt"></i>
                          </div>
                          <a href="https://open.spotify.com/track/49J0w4O2wTigMRenIRGNKa" target="_blank" class="rounded-circle text-align-center spotify-color">
                              <i class="fab fa-spotify "></i> 
                          </a>
                          <div class="nav-item dropdown">
                              <div class="nav-link dropdown-toggle" id="dropdown2045572" data-toggle="dropdown" aria-expanded="false">
                                  <i class="fas fa-plus"></i>
                              </div>
                              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown2045572" x-placement="bottom-end" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(-108px, 50px, 0px);">
                                  <p>Add to:    
                                  </p><div class="dropdown-item">
                                      Favourites
                                  </div>
                              </div>
                          </div>
                          <div class=" text-align-center">
                              <i class="far fa-trash-alt"></i>
                              Quit from list
                          </div>
                      </div>
                  </div>
          </div>
        </div>
      </main>
  </div>

    <footer class="footer" data-background-color="black">
      <div class=" container ">
        <nav>
          <ul>
            <li>
              <a href="https://www.creative-tim.com">
                Creative Tim
              </a>
            </li>
            <li>
              <a href="http://presentation.creative-tim.com">
                About Us
              </a>
            </li>
            <li>
              <a href="http://blog.creative-tim.com">
                Blog
              </a>
            </li>
          </ul>
        </nav>
        <div class="copyright" id="copyright">
          &copy;
          <script>
            document.getElementById('copyright').appendChild(document.createTextNode(new Date().getFullYear()))
          </script>, Designed by
          <a href="https://www.invisionapp.com" target="_blank">Invision</a>. Coded by
          <a href="https://www.creative-tim.com" target="_blank">Creative Tim</a>.
        </div>
      </div>
    </footer>
  </div>
  <!--   Core JS Files   -->
  <script src="./client/assets/js/core/jquery.min.js" type="text/javascript"></script>
  <script src="./client/assets/js/core/popper.min.js" type="text/javascript"></script>
  <script src="./client/assets/js/core/bootstrap.min.js" type="text/javascript"></script>
  <script src="client/js/display.js"></script>
  <script src="client/js/action.js"></script>
  <script src="client/js/index.js"></script>
  <!--   SRC must change every time you look for a lyric   -->
  <script id="after-lyric-tracking" type="text/javascript" src="http://tracking.musixmatch.com/t1.0/AMa6hJCIEzn1v8RuOP"></script>
  
</body>

</html>