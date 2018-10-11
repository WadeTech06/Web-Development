function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}


//Video controls
var myVideo = document.getElementById("video");
var play = document.getElementById("play");
var pause = document.getElementById("pause");

pause.style.display = "none";
function PlayPause() {
  if (myVideo.paused) {
    myVideo.play();
    pause.style.display = "inline";
    play.style.display = "none";
  }
  else {
    myVideo.pause();
    play.style.display = "inline";
    pause.style.display = "none";
  }
}

function Restart() {
  myVideo.pause();
  myVideo.currentTime = 0;
  play.style.display = "inline";
  pause.style.display = "none";
}

function Forward() {
  myVideo.pause();
  myVideo.currentTime += 3;
  myVideo.play();
}

function Rewind() {
  myVideo.pause();
  myVideo.currentTime -= 3;
  myVideo.play();
}

//csv reader
function findStudent()
{
  var file = document.getElementById("csv");
  var reader = new FileReader();
  reader.readAsText(file);
}




//var csv is the CSV file with headers
function csvJSON() {
  
  var csv = document.getElementById("csv").files[0];

  if (csv == null)
    alert("Please select a csv file");
   
  var reader = new  FileReader();
  reader.onload = function (e) {
    var sIDVal = $('#sID').val();
    var sTotal = $('#sTotal');
    var sRank = $('#sRank');

    var text = reader.result;
    var data = $.csv.toObjects(text);

    var result = $.grep(data, function (e) { return e.CSUID == sIDVal; });
    if (result.length == 0) {
      // not found
      alert("Nothing found");
    } else if (result.length == 1) {
      // one found
      sTotal.text("Total Score: " + result[0].Total);
      sRank.text("Rank: " + result[0]["RANK/22"])
    }
    else {
      // multiple items found
      alert("Multiples found");
    }
  };
  reader.readAsText(csv);


}