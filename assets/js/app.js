// configure firebase
var firebaseConfig = {
    apiKey: "AIzaSyCEZngRh28qxfvyP6uSMzLlvvMin4s4Vn0",
    authDomain: "test-db-900c9.firebaseapp.com",
    databaseURL: "https://test-db-900c9.firebaseio.com",
    projectId: "test-db-900c9",
    storageBucket: "test-db-900c9.appspot.com",
    messagingSenderId: "293681796902",
    appId: "1:293681796902:web:7a4e16fc6f3af451"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

//set constant for database
const database = firebase.database()

//initial values
let trainName = ""
let destination = ""
let frequency = 0
let timeInput = ""
let currentTime = new Date ()

//function to set first train time
function setTime (h, m) {
  return dateFns.setHours(dateFns.setMinutes(new Date(), m), h)
}

//function to find next arrival
function findNext (t, f) {
  if (dateFns.isAfter(t, currentTime) === true) {
    return t
  } else {
    while (dateFns.isAfter(dateFns.addMinutes(t, f), currentTime) === false) {
      t = dateFns.addMinutes(t, f)
      dateFns.addMinutes(t, f)
    }
    t = dateFns.addMinutes(t, f)
    dateFns.addMinutes(t, f)
    return t
  }
}

//click event
$('#submit-btn').on("click", function(event){
  event.preventDefault()
  let trainName = $('#name-input').val().trim()
  let destination = $('#destination-input').val().trim()
  let frequency = $('#frequency-input').val().trim() 
  let timeInput = $('#time-input').val().trim()

  //push to firebase
  database.ref().push({
    train: trainName,
    destination: destination,
    time: timeInput,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP,
  })  

  //clear values of form
  $('#name-input').val("")
  $('#destination-input').val("")
  $('#time-input').val("")
  $('#frequency-input').val("")
})

//retrieve info from firebase
  database.ref().on("child_added", function(childSnapshot){
    let hoursMins = childSnapshot.val().time.split(':')
    let firstTrain = setTime(hoursMins[0], hoursMins[1])
    let nextTrain = findNext(firstTrain, childSnapshot.val().frequency)
    let nextArrival = dateFns.format(nextTrain, 'HH:mm')
    let minutesAway = dateFns.differenceInMinutes(nextTrain, currentTime)
    let row = '<tr>'+
                '<td>'+childSnapshot.val().train+'<td>'+
                '<td>'+childSnapshot.val().destination+'<td>'+
                '<td>'+childSnapshot.val().frequency+'<td>'+
                '<td>'+nextArrival+'<td>'+
                '<td>'+minutesAway+'<td>'+
              '</tr>'
    $('tbody').append(row)  
  }, function (errorObject) {
    console.log("Errors:" + errorObject.code)
  })