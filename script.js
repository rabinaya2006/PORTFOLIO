const imageInput = document.getElementById("imageInput");
const cameraPreview = document.getElementById("cameraPreview");


// IMAGE UPLOAD
imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {

        cameraPreview.innerHTML = `
            <img src="${event.target.result}" alt="Uploaded Waste">
        `;

    };

    reader.readAsDataURL(file);
});


// AI CLASSIFICATION
function runAI() {

    if (!imageInput.files.length) {

        alert("Please upload an image first.");

        return;
    }

    const categories = [
        "Plastic",
        "Paper",
        "Metal",
        "Glass",
        "Organic Waste",
        "E-Waste"
    ];

    const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

    const confidence =
        Math.floor(Math.random() * 15) + 85;


    document.getElementById("category").innerText =
        randomCategory;

    document.getElementById("confidence").innerText =
        confidence + "%";

    document.getElementById("confidenceBar").style.width =
        confidence + "%";

    document.getElementById("aiStatus").innerText =
        "Waste Detected";


    updateRecyclability(randomCategory);

    moveConveyor();

}


// RECYCLABILITY
function updateRecyclability(category) {

    const status =
        document.getElementById("recycleStatus");

    const reason =
        document.getElementById("recycleReason");


    if (
        category === "Plastic" ||
        category === "Paper" ||
        category === "Metal" ||
        category === "Glass"
    ) {

        status.innerText = "Recyclable";

        reason.innerText =
            category + " can be processed for recycling.";

    } else {

        status.innerText = "Non-Recyclable";

        reason.innerText =
            category + " requires special processing.";

    }
}


// CONVEYOR
function moveConveyor() {

    const motor =
        document.getElementById("motorStatus");

    motor.innerText = "MOTOR ACTIVE";

    motor.style.color = "#00e676";


    setTimeout(function () {

        motor.innerText = "MOTOR READY";

    }, 3000);

}


// MOISTURE SENSOR SIMULATION
function updateMoisture() {

    const moisture =
        Math.floor(Math.random() * 70) + 10;

    document.getElementById("moistureValue")
        .innerText = moisture + "%";

    document.getElementById("moistureBar")
        .style.width = moisture + "%";


    const status =
        document.getElementById("moistureStatus");


    if (moisture > 50) {

        status.innerText = "WET";
        status.style.color = "#ff5252";

    } else {

        status.innerText = "DRY";
        status.style.color = "#00e676";

    }

}


// UPDATE SENSOR EVERY 5 SECONDS
setInterval(updateMoisture, 5000);


// INITIAL SENSOR UPDATE
updateMoisture();