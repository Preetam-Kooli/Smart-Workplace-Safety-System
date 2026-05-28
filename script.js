
// Temperature value
let temperature = 34;

// Update temperature text
document.getElementById("temperature").innerHTML =
temperature + "°C";


// Gas level
document.getElementById("gas").innerHTML =
"Safe";


// Helmet status
document.getElementById("helmet").innerHTML =
"Worn Properly";


// Fall detection
document.getElementById("fall").innerHTML =
"No Fall Detected";

// -------------------------------
// EMERGENCY ALERT DEMO
// -------------------------------

// Simulate emergency after 5 seconds
/*setTimeout(() => {

    // Change emergency message
    document.getElementById(
        "emergency-message"
    ).innerHTML =
    "⚠ FALL DETECTED - WORKER NEEDS HELP";

}, 5000);*/



// -------------------------------
// NAVIGATION BUTTON
// -------------------------------

// When button clicked
/*document.getElementById(
    "navigate-btn"
).addEventListener("click", () => {

    // Open Google Maps navigation
    window.open(
        "https://www.google.com/maps?q=12.9081,77.5655"
    );

});

// ----------------------------------
// WORKERS LOCATION BUTTON
// ----------------------------------

document.getElementById(
    "worker-location-btn"
).addEventListener("click", () => {

    // Show map

    document.getElementById(
        "map"
    ).style.display = "block";



    // Create map

    const map = L.map('map').setView(
        [12.9090, 77.5662],
        17
    );



    // IMPORTANT FIX
    // Recalculate map size after showing div

    setTimeout(() => {
        map.invalidateSize();
    }, 100);



    // Load OpenStreetMap

    L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: 'OpenStreetMap'
    }).addTo(map);



    // Worker Marker

    L.marker(
        [12.9090, 77.5662]
    ).addTo(map)
    .bindPopup(
        "DSCE Worker Location"
    )
    .openPopup();

});*/

// ----------------------------------
// EMERGENCY ALERT BUTTON
// ----------------------------------

document.getElementById(
    "send-alert-btn"
).addEventListener("click", () => {

    alert(
        "Emergency Alert Sent:\\n\\n" +
        "Alert!! Be careful danger detected nearby"
    );

});

// ----------------------------------
// SAVE PHONE NUMBERS
// ----------------------------------

// Get all save buttons

const saveButtons =
document.querySelectorAll(".save-btn");



// Loop through all buttons

saveButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Get parent worker card

        const workerCard =
        button.parentElement;



        // Get phone input

        const phoneInput =
        workerCard.querySelector(
            ".phone-input"
        );



        // Get save message

        const saveMessage =
        workerCard.querySelector(
            ".save-message"
        );



        // Get entered number

       // Worker Name

const workerNameInput =
workerCard.querySelector(
    ".worker-name"
);



// Worker ID

const workerIdInput =
workerCard.querySelector(
    ".worker-id"
);



// Mobile Number

const phoneNumber =
phoneInput.value;



// Get values

const workerName =
workerNameInput.value;

const workerId =
workerIdInput.value;



        // Check if empty

        if(
    workerName === "" ||
    workerId === "" ||
    phoneNumber === ""
) {

            saveMessage.innerHTML =
            "Please enter a number";

            saveMessage.style.color =
            "red";

            return;
        }



        // Save locally in browser

       localStorage.setItem(
    "workerName",
    workerName
);

localStorage.setItem(
    "workerId",
    workerId
);

localStorage.setItem(
    "workerPhone",
    phoneNumber
);



        // Success message

        saveMessage.innerHTML =
        "Saved Successfully";

        // DISPLAY SAVED DATA

document.getElementById(
    "display-name"
).innerHTML = workerName;

document.getElementById(
    "display-id"
).innerHTML = workerId;

document.getElementById(
    "display-phone"
).innerHTML = phoneNumber;

        saveMessage.style.color =
        "#22c55e";

    });

});

// ----------------------------------
// LOAD SAVED WORKER DETAILS
// ----------------------------------

const savedName =
localStorage.getItem(
    "workerName"
);

const savedId =
localStorage.getItem(
    "workerId"
);

const savedPhone =
localStorage.getItem(
    "workerPhone"
);



// If saved data exists

if(
    savedName &&
    savedId &&
    savedPhone
) {

    // Refill input fields

    document.querySelector(
        ".worker-name"
    ).value = savedName;



    document.querySelector(
        ".worker-id"
    ).value = savedId;



    document.querySelector(
        ".phone-input"
    ).value = savedPhone;



    // Display beside form

    document.getElementById(
        "display-name"
    ).innerHTML = savedName;



    document.getElementById(
        "display-id"
    ).innerHTML = savedId;



    document.getElementById(
        "display-phone"
    ).innerHTML = savedPhone;



    // Optional success message

    document.querySelector(
        ".save-message"
    ).innerHTML =
    "Saved Details Loaded";



    document.querySelector(
        ".save-message"
    ).style.color =
    "#22c55e";
}