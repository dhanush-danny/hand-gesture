Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

prediction1 = "";
prediction2 = "";

Webcam.attach("#camera");

function takepic() {
    console.log("capturing image ");
    Webcam.snap(function (cam_pic) {
        document.getElementById("result").innerHTML = '<img id="captured_img" src="' + cam_pic + '">';
        console.log("image captured");
    });
}

console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/N05BwSEnW/model.json", model_loaded);

function model_loaded() {
    console.log("model loaded successfuly");
}

function speak() {
    speak_text = "The first prediction is " + prediction1 + " and the second prediction is " + prediction2;
    speak_audio = new SpeechSynthesisUtterance(speak_text);
    window.speechSynthesis.speak(speak_audio);
}

function predict_emotion() {
    img = document.getElementById("captured_img");
    classifier.classify(img, get_result);
}

function get_result(err, result_array) {
    if (err) {
        console.error(err);
    } else {
        console.log(result_array);
        prediction1 = result_array[0].label;
        prediction2 = result_array[1].label;
        document.getElementById("emotion_name1").innerHTML = prediction1;
        document.getElementById("emotion_name2").innerHTML = prediction2;

        if (prediction1 == "Peace") {
            document.getElementById("emotion_emoji1").innerHTML = "&#128522;";
        } else if (prediction1 == "Victory") {
            document.getElementById("emotion_emoji1").innerHTML = "&#128544;";
        } else if (prediction1 == "Ok") {
            document.getElementById("emotion_emoji1").innerHTML = "&#128557;";
        }

        if (prediction2 == "Peace") {
            document.getElementById("emotion_emoji2").innerHTML = "&#128522;";
        } else if (prediction2 == "Victory") {
            document.getElementById("emotion_emoji2").innerHTML = "&#128544;";
        } else if (prediction2 == "Ok") {
            document.getElementById("emotion_emoji1").innerHTML = "&#128557;";
        }

        speak();
    }
}