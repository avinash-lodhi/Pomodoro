$(document).ready(function() {
  //setting up global variables
  var totalTime;
  var isSession = 0;
  var time_on = 0;
  var timeout;
  var nextSession, nextBreak;
  var perCent = 0,
    initialTime;
  var color = "#00EE00";
  var audio = new Audio("http://soundbible.com/mp3/Car Alarm-SoundBible.com-2096911689.mp3");

  //function to set next session time and break time
  
  function set_next() {
    nextSession = ($("#session .num").text()) * 60;
    nextBreak = ($("#break .num").text()) * 60;
  }
  //function to decrement respective session/ break length
  $(".dec").on("click", function(event) {
    var currentVal = $(this).next().text();
    if (currentVal > 1)
      currentVal--;
    $(this).next().text(currentVal);
    if (totalTime === undefined){
    $("#time").text($("#session .num").text());
    }
  });

   //function to increment respective session/ break length
  
  $(".inc").on("click", function(event) {
    var currentVal = $(this).prev().text();
    currentVal++;
    $(this).prev().text(currentVal);
    if (totalTime === undefined){
    $("#time").text($("#session .num").text());
    }
  });

  //function of reset button
  
  $("#reset").on("click", function() {
    //cleat timeout and total time 
    clearTimeout(timeout);
    totalTime = undefined;
    
    // clear display
    $("#session .num").text(25);
    $("#break .num").text(5);
    $("#time").text(25);
    $("#txt").text("Session");
    
    //reset global variables to default
    time_on = 0;
    perCent = 0;
    isSession=0;
    color="#00EE00";
    $('#load-bar').css({
      background: "#24272F"
    });
  });

  // timer function to update timer according to session/break
  function timer() {
    //if total time reaches to zero update the time for next session or break length
    if (totalTime == 0) {
      //check if session is next
      if (isSession) {
        set_next();
        totalTime = nextSession;
        initialTime = totalTime;
        $("#txt").text("Session");
        color = "#00EE00";
        audio.play();
        //Switch isSession to zero to indicate break is next
        isSession = 0;
      } else {
        totalTime = nextBreak;
        initialTime = totalTime;
        $("#txt").text("Break!");
        color = "#EE0000";
        audio.play();
        //Switch isSession to 1 to indicate session is next
        isSession = 1;
      }
    }
    if (totalTime > 0) {
      totalTime--;
      //calculating total time in hr, min and sec
      
      var hr = Math.floor(totalTime / 3600);
      var min = Math.floor(totalTime / 60 - hr * 60) < 10 ? "0" + Math.floor(totalTime / 60 - hr * 60) : Math.floor(totalTime / 60 - hr * 60);
      var sec = (totalTime % 60) < 10 ? "0" + (totalTime % 60) : (totalTime % 60);
      hr ? $("#time").html(hr + ":" + min + ":" + sec) : $("#time").html(Math.floor(totalTime / 60) + ":" + sec);
      
      //calculating percentage to fill timer
      perCent = ((initialTime - totalTime) / initialTime) * 100;
      
      //fill timer
      
      $('#load-bar').css({
        background: "linear-gradient(to top, " + color + " " + perCent + "%,#24272F " + perCent + "%)"
      });
      //set Timout to one sec.
      timeout = setTimeout(timer, 1000);
    }
  }

  //function to start timer
  
  function start_timer() {
    time_on = 1;
    timer();
  }
  
//function to stop time
  
  function stop_timer() {
    clearTimeout(timeout);
    time_on = 0;
  }
  
  //Start timer if user clicked div clock and stop if it is clicked again
  
  $("#clock").on("click", function(event) {
    if (!time_on) {
      //defining undefined variable
      if (totalTime === undefined) {
        totalTime = ($("#session .num").text()) * 60;
        //assign initalTime to calculate perCent
        initialTime = totalTime;
        nextBreak = ($("#break .num").text()) * 60;
      }
      start_timer();
    } else if (time_on)
      stop_timer();
  });
});