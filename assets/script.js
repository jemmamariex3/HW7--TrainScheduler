  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBe1Ac1FkDdb45xD6lIA3ChTIc-eu9yZjU",
    authDomain: "week-7-app-45e85.firebaseapp.com",
    databaseURL: "https://week-7-app-45e85.firebaseio.com",
    storageBucket: "week-7-app-45e85.appspot.com",
  };
  firebase.initializeApp(config);

var database = firebase.database();

function findNextArrival(firstTime, frequency) {
   
    //push the time a year back to make sure its way before current time

    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    var formatCurrentTime = moment(currentTime).format("hh:mm");

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    //remainder

    var remainder = diffTime % frequency;

    //minutes till train arrive

    var arrive = frequency - remainder;


    // time the next train will come
    var nextTrain = moment().add(arrive, "minutes");

    return arrive, nextTrain;

    console.log(arrive, nextTrain);

}


// function calcTotalBilled(months, rate) {
//     return (months * rate).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
// }

database.ref().on("child_added", function(childSnapshot) {

        var name = childSnapshot.val().name;
        var destination = childSnapshot.val().role;
        var frequency = childSnapshot.val().date;
        var nextArrival = findNextArrival(frequency, firstTime);
        // var minutesAway = calcTotalBilled(calcMonthsWorked(date), rate);

        var $newRow = $("<tr class=\"employee\"></tr>");
        var $name = $("<td class=\"employee-name\">" + name + "</td>");
        var $destination = $("<td class=\"role\">" + destination + "</td>");
        var $frequency = $("<td class=\"start-date\">" + frequency + "</td>");
        var $nextArrival = $("<td class=\"months-worked\">" + nextArrival + "</td>");
        // var $minutesAway = $("<td class=\"monthly-rate\">$" + minutesAway + "</td>");.append($minutesAway)

        $("tbody").append($newRow.append($name).append($destination).append($frequency).append($nextArrival));

    return false;
});

$(document).on("click", "#addTrain", function(snapshot) {
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