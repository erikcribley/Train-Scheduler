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

$('#submit-btn').on("click", function(event){
    event.preventDefault()
    let trainName = $('#name-input').val().trim()
    let destination = $()
})