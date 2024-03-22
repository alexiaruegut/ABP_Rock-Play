//variable con el ínidce de la canción actual
let currentMusic = 0;

//para seleccionar el elemento de audio del html
const music = document.querySelector('#audio');

//estos son los elementos de mi reproductor de música
const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');

//lista con la info de las canciones
const songs = [
    {
        name: 'Better Now',
        path: 'music/BetterNow-PostMalone.mp3',
        artist: 'Post Malone',
        cover: 'img/cover1.jpg',
    },
    {
        name: 'A Thousand Bad Times',
        path: 'music/A Thousand Bad Times-postmalone.mp3',
        artist: 'Post Malone',
        cover: 'https://images.genius.com/e5ff99bdbe52cdb142ac91fad7b79a5e.822x822x1.jpg',
    },
    {
        name: 'Die for Me',
        path: 'music/die for me-post malone.mp3',
        artist: 'Post Malone',
        cover: 'https://images.genius.com/e5ff99bdbe52cdb142ac91fad7b79a5e.822x822x1.jpg',
    },
    {
        name: 'Sunflower',
        path: 'music/sunflower-postmalone.mp3',
        artist: 'Post Malone',
        cover: 'https://www.hoyesarte.com/constelac10n/files/2020/11/Post-Malone-Sunflower.jpg',
    },
];

//un evento que uso para el boton de reproducir, interactua al hacer clic en él
playBtn.addEventListener('click', () => {
    if (playBtn.className.includes('pause')) {
        music.play(); //si se hace clic, se reproduce la música
    } else {
        music.pause(); //si se hace clic, se para la música
    }
    playBtn.classList.toggle('pause'); //para cambiar el icono de reproducción
    disk.classList.toggle('play'); //si la canción se está reproduciendo, el disco girará, pero se quedará quieto si la música no se está reproduciendo
})

//una función para la configuración de la info de la canción que esté sonando
const setMusic = (i) => {
    seekBar.value = 0; //para poner el valor de la barra a 0
    let song = songs[i];
    currentMusic = i;
    music.src = song.path; //para relacionar el audio con la ruta del archivo .mp3

    //para modificar el contenido del html según los datos de la canción
    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    //el tiempo actual de la canción se establece al princpio en 00:00
    currentTime.innerHTML = '00:00';

    //para que el navegador pueda cargar la canción
    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration); //para formatear la duración de la canción
    }, 300);
}

setMusic(0); //se configura la primera canción cuando carga la página

//para formatear el tiempo en mins y segundos
const formatTime = (time) => {
    let min = Math.floor(time / 60); //para sacar los mins
    if (min < 10) {
        min = `0${min}`;
    }

    let sec = Math.floor(time % 60); //para sacar los segundos
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}

//se actualiza la barra de duración y el tiempo actual de la música
setInterval(() => {
    seekBar.value = music.currentTime; //se va actualizando la posición de la barra según el tiempo de reproducción actual
    currentTime.innerHTML = formatTime(music.currentTime); //se modifica el tiempo actual del html según el fromateo del tiempo de reproducción actual

    //cuando el current time y la barra llegan al máximo de duración, se pasa a la siguiente canción
    if (Math.floor(music.currentTime) == Math.floor(seekBar.max)) {
        forwardBtn.click();
    }
}, 500)

//esto es para que al cambiar de tiempo la barra de reproducción, la canción se actualice al punto en el que está la barra posicionada
seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
})

//para iniciar la música
const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause'); //cuando suene la música, se verá el icono de pausa
    disk.classList.add('play'); //para que se inicia la animación del disco
}

//al hacer clic, avanzará a la siguiente canción
forwardBtn.addEventListener('click', () => {
    //si se está reproduciendo la última canción, vuelve a la primera, sino, pasa  a la siguiente canción
    if (currentMusic >= songs.length - 1) {
        currentMusic = 0;
    } else {
        currentMusic++;
    }

    setMusic(currentMusic); //para reproducir la siguiente canción
    playMusic();
})

//al hacer clic, retrocederá a la canción anterior
backwardBtn.addEventListener('click', () => {
    //si se está reproduciendo la primera canción, pasa a la última, sino, pasa  a la anterior canción
    if (currentMusic <= 0) {
        currentMusic = songs.length - 1;
    } else {
        currentMusic--;
    }

    setMusic(currentMusic); //para reproducir la canción anterior
    playMusic();
})

