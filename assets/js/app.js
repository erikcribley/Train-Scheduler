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
let timeInput = ""
let frequency = 0
let currentTime = new Date ()

//function to set first train time
function setTime (h, m) {
  return dateFns.setHours(dateFns.setMinutes(new Date(), m), h)
}

//function to find next arrival
function findNext (t, f) {
  if (dateFns.isAfter(t, currentTime) === true) {
    return t
  } else if (dateFns.isAfter(dateFns.addMinutes(t, f), currentTime) === true) {
    return dateFns.addMinutes(t, f) 
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
  //push to firebase
  database.ref().push({
    train: trainName,
    destination: destination,
    frequency: frequency,
  })

  let timeInput = $('#time-input').val().trim()
  let hoursMins = timeInput.split(':')
  let firstTrain = setTime(hoursMins[0], hoursMins[1])
  console.log(currentTime)
  console.log(findNext(firstTrain, frequency))
  


  // let nextArrival = 
  // // let minutesAway = 
 
  //retreive from firebase
  database.ref().on("child_added", function(snapshot){
    let row = '<tr>'+
                '<td>'+snapshot.val().train+'<td>'+
                '<td>'+snapshot.val().destination+'<td>'+
                '<td>'+snapshot.val().frequency+'<td>'+
                '<td>'+""+'<td>'+
                '<td>'+""+'<td>'+
              '</tr>'
    $('tbody').append(row)    
  })
})