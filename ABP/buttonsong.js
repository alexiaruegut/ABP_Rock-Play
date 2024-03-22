document.addEventListener('DOMContentLoaded', function () {
    // Función para reproducir la canción con un límite de 20 segundos y a un volumen del 20%
    function reproducirCancion(ruta, tiempoInicioSegundos) {
        var sound = new Audio();
        sound.src = ruta;
        sound.currentTime = tiempoInicioSegundos;
        sound.volume = 0.20;
        sound.play();

        // Detener la reproducción después de 20 segundos
        var tiempoInicio = new Date().getTime();
        sound.addEventListener('timeupdate', function() {
            if (new Date().getTime() - tiempoInicio > 30000) {
                sound.pause();
            }
        });
    }
    document.getElementById('BetterNow').addEventListener('click', function () {
        reproducirCancion('./music/BetterNow-PostMalone.mp3', 10); 
    });

    document.getElementById('DejaVu').addEventListener('click', function () {
        reproducirCancion('./music/deja vu - olivia rodrigo.mp3', 137); 
    });

    document.getElementById('SaveYourTears').addEventListener('click', function () {
        reproducirCancion('./music/save your tears - the weeknd.mp3', 8); 
    });

    document.getElementById('OjitosLindos').addEventListener('click', function () {
        reproducirCancion('./music/ojitos lindos - bad bunny.mp3', 10); 
    });

    document.getElementById('BestSongEver').addEventListener('click', function () {
        reproducirCancion('./music/Best Song Ever-OneDirection.mp3', 23); 
    });
});