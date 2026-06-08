let database;

window.onFirebaseReady((db) => {

    database = db;

    const sensorRef =
    window.ref(database, "sensorData");

    window.onValue(
        sensorRef,
        (snapshot) => {

            const data =
            snapshot.val();

            if(!data) return;

            document.getElementById(
                "temperature"
            ).innerHTML =
            data.temperature + "°C";

            document.getElementById(
                "gas"
            ).innerHTML =
            data.gasLevel;

            document.getElementById(
                "helmet"
            ).innerHTML =
            data.helmetStatus;

            document.getElementById(
                "fall"
            ).innerHTML =
            data.fallStatus;
        }
    );

});

window.addEventListener("load", () => {

    // remove any #hash like #dashboard-section
    if (window.location.hash) {
        history.replaceState(null, null, " ");
    }

    // force page to start from top
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);

});


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


// SAVE TO FIREBASE

const workersRef =
window.ref(
    window.database,
    "workers"
);

window.push(
    workersRef,
    {
        name: workerName,
        id: workerId,
        phone: phoneNumber,
        timestamp: Date.now()
    }
).then(() => {

    loadWorkers();

});


// SUCCESS MESSAGE

saveMessage.innerHTML =
"Saved Successfully";

saveMessage.style.color =
"#22c55e";

setTimeout(() => {

    saveMessage.innerHTML = "";

}, 4000);



// CLEAR INPUT FIELDS

workerNameInput.value = "";

workerIdInput.value = "";

phoneInput.value = "";

    });

});


function loadWorkers() {

    const container =
    document.getElementById(
        "worker-data-container"
    );

    container.innerHTML = "";

    const dbRef =
    window.ref(
        window.database
    );

    window.get(
        window.child(
            dbRef,
            "workers"
        )
    ).then((snapshot) => {

        if (snapshot.exists() && snapshot.val()) {

            const workers =
            snapshot.val();

            Object.values(workers)
            .forEach((worker) => {

                container.innerHTML += `

                <div class="table-row">

                    <span>${worker.name}</span>

                    <span>${worker.id}</span>

                    <span>${worker.phone}</span>

                </div>

                `;

            });

        }

    });

}

window.addEventListener("load", loadWorkers);

function showEmergencyPopup(type,message)
{
    document.getElementById("alertType").innerText = type;

    document.getElementById("alertMessage").innerText = message;

    document.getElementById("emergencyPopup").style.display = "block";
}

function closePopup()
{
    document.getElementById("emergencyPopup").style.display = "none";
}

// ----------------------------------
// LIVE TRACKING MAP
// ----------------------------------

const map = L.map('map').setView(
    [20.5937, 78.9629],
    5
);

L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: 'OpenStreetMap'
    }
).addTo(map);

if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
            position.coords.latitude;

            const longitude =
            position.coords.longitude;

            map.setView(
                [latitude, longitude],
                18
            );

            // Accuracy Circle

L.circle(
    [latitude, longitude],
    {
        radius: 30,
        color: '#4285F4',
        fillColor: '#4285F4',
        fillOpacity: 0.2,
        weight: 2
    }
).addTo(map);


// Blue Live Dot

L.circleMarker(
    [latitude, longitude],
    {
        radius: 8,
        color: 'white',
        weight: 2,
        fillColor: '#4285F4',
        fillOpacity: 1
    }
).addTo(map);

        },

        function(error) {

            console.log(
                "Location permission denied"
            );

        }

    );

}
