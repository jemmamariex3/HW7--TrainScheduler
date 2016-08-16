  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBe1Ac1FkDdb45xD6lIA3ChTIc-eu9yZjU",
    authDomain: "week-7-app-45e85.firebaseapp.com",
    databaseURL: "https://week-7-app-45e85.firebaseio.com",
    storageBucket: "week-7-app-45e85.appspot.com",
  };
  firebase.initializeApp(config);

var database = firebase.database();

function changeToHours(time){
    //we will take the military time and then use moment.js to change to 12-hour format
    var result = moment.duration(time, "HH:mm").as('hours');
    console.log(result);    
}

database.ref().on("child_added", function(childSnapshot) {

        // var name = childSnapshot.val().name;
        // var destination = childSnapshot.val().destination;
        // var frequency = childSnapshot.val().frequency;
        var nextArrival = changeToHours(time);
        // var minutesAway = childSnapshot.val().minutesAway;

        var $newRow = $("<tr class=\"train\"></tr>");
        var $name = $("<td class=\"train-name\">" + name + "</td>");
        var $destination = $("<td class=\"destination\">" + destination + "</td>");
        var $frequency = $("<td class=\"frequency\">" + frequency + "</td>");
        var $nextArrival = $("<td class=\"nextArrival\">" + nextArrival + "</td>");
        // var $minutesAway = $("<td class=\"minutesAway\">" + minutesAway + "</td>");append($newRow.append($name)  .append($destination).append($frequency).append($minutesAway)

        $("tbody").append($nextArrival);

    return false;
});

$(document).on("click", "#addTrain", function(snapshot) {
    var $name = $("#trainInput").val();
    var $destination = $("#destinationInput").val();
    var $time = $("#timeInput").val();
    var $frequency = $("#frequencyInput").val();

    database.ref().push({
        name: $name,
        destination: $destination,
        time: $time,
        frequency: $frequency
    });
});