let songs = [
    {
        name: "Daylight",
        artist: "David Kushner",
        file: "./asset/Daylight.mp3",
        image: "./asset/album-img.jpg"
    },
    {
        name: "Song 2",
        artist: "Artist 2",
        file: "./asset/song.mp3",
        image: "./asset/album-img.jpg"
    },
    {
        name: "Song 3",
        artist: "Artist 3",
        file: "./asset/song2.mp3",
        image: "./asset/album-img.jpg"
    },
    {
        name: "Song 4",
        artist: "Artist 4",
        file: "./asset/song3.mp3",
        image: "./asset/album-img.jpg"
    },
    {
        name: "Song 5",
        artist: "Artist 5",
        file: "./asset/song4.mp3",
        image: "./asset/album-img.jpg"
    },
    {
        name: "Song 6",
        artist: "Artist 6",
        file: "./asset/song5.mp3",
        image: "./asset/album-img.jpg"
    }
];


let currentSong = 0;

let audio = new Audio(songs[currentSong]);


// ===============================
// HTML ELEMENTS
// ===============================

let playBtn = document.getElementById("playBtn");
let nextBtn = document.getElementById("nextBtn");
let previousBtn = document.getElementById("previousBtn");

let shuffleBtn = document.getElementById("shuffleBtn");
let repeatBtn = document.getElementById("repeatBtn");

let songName = document.querySelector(".song-name");
let artistName = document.querySelector(".artist");
let albumImage = document.querySelector(".album-image");

let progressBar = document.querySelector(".progress-bar");
let currTime = document.querySelector(".curr-time");
let totTime = document.querySelector(".tot-time");

let volumeBar = document.querySelector(".volume-bar");


// ===============================
// SHUFFLE & REPEAT
// ===============================

let shuffleOn = false;
let repeatOn = false;


// ===============================
// LOAD SONG
// ===============================

function loadSong(index) {

    audio.src = songs[index].file;

    songName.innerText = songs[index].name;

    artistName.innerText = songs[index].artist;

    albumImage.src = songs[index].image;

    progressBar.value = 0;

    currTime.innerText = "0:00";

    totTime.innerText = "0:00";
}


// ===============================
// PLAY / PAUSE
// ===============================

playBtn.addEventListener("click", function () {

    if (audio.paused) {

        audio.play();

    } else {

        audio.pause();

    }

});


// ===============================
// NEXT SONG
// ===============================

nextBtn.addEventListener("click", function () {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    audio.play();

});


// ===============================
// PREVIOUS SONG
// ===============================

previousBtn.addEventListener("click", function () {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

    audio.play();

});


// ===============================
// PROGRESS BAR
// ===============================

audio.addEventListener("loadedmetadata", function () {

    progressBar.max = audio.duration;

    totTime.innerText = formatTime(audio.duration);

});


audio.addEventListener("timeupdate", function () {

    progressBar.value = audio.currentTime;

    currTime.innerText = formatTime(audio.currentTime);

});


progressBar.addEventListener("input", function () {

    audio.currentTime = progressBar.value;

});


// ===============================
// VOLUME
// ===============================

volumeBar.addEventListener("input", function () {

    audio.volume = volumeBar.value / 100;

});


// ===============================
// SHUFFLE BUTTON
// ===============================

shuffleBtn.addEventListener("click", function () {

    shuffleOn = !shuffleOn;

    if (shuffleOn) {

        shuffleBtn.style.opacity = "1";

    } else {

        shuffleBtn.style.opacity = "0.7";

    }

});


// ===============================
// REPEAT BUTTON
// ===============================

repeatBtn.addEventListener("click", function () {

    repeatOn = !repeatOn;

    if (repeatOn) {

        repeatBtn.style.opacity = "1";

    } else {

        repeatBtn.style.opacity = "0.7";

    }

});


// ===============================
// SONG ENDED
// ===============================

audio.addEventListener("ended", function () {

    // Repeat ON
    if (repeatOn) {

        audio.currentTime = 0;

        audio.play();

    }

    // Shuffle ON
    else if (shuffleOn) {

        let randomSong;

        do {

            randomSong =
                Math.floor(Math.random() * songs.length);

        } while (
            randomSong === currentSong &&
            songs.length > 1
        );

        currentSong = randomSong;

        loadSong(currentSong);

        audio.play();

    }

    // Normal mode
    else {

        nextBtn.click();

    }

});


// ===============================
// TIME FORMAT
// ===============================

function formatTime(time) {

    let minutes = Math.floor(time / 60);

    let seconds = Math.floor(time % 60);

    if (seconds < 10) {

        seconds = "0" + seconds;

    }

    return minutes + ":" + seconds;

}


// ===============================
// CARD CLICK TO PLAY
// ===============================

let cards = document.querySelectorAll(".card");

cards.forEach(function (card) {

    card.addEventListener("click", function () {

        let songIndex = card.getAttribute("data-song");

        currentSong = Number(songIndex);

        loadSong(currentSong);

        audio.play();

    });

});


// ===============================
// INITIAL SETTINGS
// ===============================

loadSong(currentSong);

audio.volume = volumeBar.value / 100;