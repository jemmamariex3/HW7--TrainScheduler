  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBe1Ac1FkDdb45xD6lIA3ChTIc-eu9yZjU",
    authDomain: "week-7-app-45e85.firebaseapp.com",
    databaseURL: "https://week-7-app-45e85.firebaseio.com",
    storageBucket: "week-7-app-45e85.appspot.com",
  };
  firebase.initializeApp(config);

var database = firebase.database();

// function findNextArrival(firstTime, frequency) {
   
//     //push the time a year back to make sure its way before current time

//     var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
//     console.log(firstTimeConverted);

//     var currentTime = moment();
//     var formatCurrentTime = moment(currentTime).format("hh:mm");

//     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

//     //remainder

//     var remainder = diffTime % frequency;

//     //minutes till train arrive

//     var arrive = frequency - remainder;


//     // time the next train will come
//     var nextTrain = moment().add(arrive, "minutes").format("hh:mm");

//     return nextTrain;

//     console.log(nextTrain);

// }

function findNextArrival(firstTime, frequency) {
    var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");

    var currentTime = moment();
    var convertedTime = moment(currentTime).format("hh:mm");

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     
    var remainder = diffTime % frequency;
        
    var minutesAway = frequency - remainder;
        
    var nextTrain = moment().add(minutesAway, "minutes");
    var arrivalTime = moment(nextTrain).format("hh:mm");

    return(arrivalTime);
}
function findMinutesAway(firstTime, frequency) {
   var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");

    var currentTime = moment();
    var convertedTime = moment(currentTime).format("hh:mm");

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     
    var remainder = diffTime % frequency;
        
    var minutesAway = frequency - remainder;
        
    var nextTrain = moment().add(minutesAway, "minutes");
    var arrivalTime = moment(nextTrain).format("hh:mm");

    return(minutesAway);
}

database.ref().on("child_added", function(childSnapshot) {

        var name = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var frequency = childSnapshot.val().frequency;
        var firstTime = childSnapshot.val().time;
        var nextArrival = findNextArrival(firstTime, frequency);
        var minutesAway = findMinutesAway(firstTime, frequency);

        var $newRow = $("<tr class=\"train\"></tr>");
        var $name = $("<td class=\"train-name\">" + name + "</td>");
        var $destination = $("<td class=\"destination\">" + destination + "</td>");
        var $frequency = $("<td class=\"frequency\">" + frequency + "</td>");
        var $nextArrival = $("<td class=\"next-arrival\">" + nextArrival + "</td>");
        var $minutesAway = $("<td class=\"minutes-away\">" + minutesAway + "</td>");

        $("tbody").append($newRow.append($name).append($destination).append($frequency).append($nextArrival).append($minutesAway));

    return false;
});

$(document).on("click", "#addTrain", function() {
    var $name = $("#trainInput").val();
    var $destination = $("#destinationInput").val();
    var $firstTime = $("#timeInput").val();
    var $frequency = $("#frequencyInput").val();

    database.ref().push({
        name: $name,
        destination: $destination,
        time: $firstTime,
        frequency: $frequency
    });
});