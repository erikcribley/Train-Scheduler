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
let firstTrainTime = ""
let frequency = 0

//click event
$('#submit-btn').on("click", function(event){
  event.preventDefault()
  let trainName = $('#name-input').val().trim()
  let destination = $('#destination-input').val().trim()
  let firstTrainTime = $('#time-input').val().trim()
  let frequency = $('#frequency-input').val().trim()
  //push to firebase
  database.ref().push({
    train: trainName,
    destination: destination,
    frequency: frequency,
  })

  // let currentTime = dateFns.format(new Date (), 'HH:mm')
  // let nextArrival = dateFns.addMinutes(firstTrainTime, frequency)
  // // let minutesAway = 

  // console.log(firstTrainTime)
  // console.log(frequency)
  // console.log(nextArrival)


  //retreive from firebase
  database.ref().on("child_added", function(snapshot){
    let row = '<tr>'+
                '<td>'+snapshot.val().train+'<td>'+
                '<td>'+snapshot.val().destination+'<td>'+
                '<td>'+snapshot.val().frequency+'<td>'+
                '<td>'+"placeholder"+'<td>'+
                '<td>'+"placeholder"+'<td>'+
              '</tr>'
    $('tbody').append(row)    
  })
})