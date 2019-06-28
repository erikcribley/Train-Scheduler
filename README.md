# Train-Scheduler

This is the assignment for working with Firebase. It both sends data to and recalls from Firebase, appending the html 
with jQuery to display the data in a table.

Using the DateFNS library, this Train Scheduler keeps track of variables in relation to the current time, updating when the
page is refreshed. 

The first train time is entered as a string in 00:00 military time format, the string is split and the hour and minute 
parameters are passed to a setTime function. An additional function findNext, uses the first train time and frequency to 
determine when the next train will arrive in relation to the current time.

A click event takes the values from the form and logs them to firebase. The on_child_added function reacts when new data is 
logged to firebase and appends it to the table. Data already stored in firebase is displayed on the table at pageload.    