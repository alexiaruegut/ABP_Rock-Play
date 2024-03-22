#include <iostream>
#include <string>
#include <Windows.h>
#include <algorithm>
#include <thread>
#include <chrono>
#pragma comment(lib, "Winmm.lib")

using namespace std;

bool verificarRespuesta(const string& respuesta, const string& estribillo) { //para ver si la respuesta está bien
    return respuesta == estribillo;
}

int main() {
    string canciones[] = { //nombre de las canciones
        "Vampire - Olivia Rodrigo",
        "Amorfoda - Bad Bunny",
        "Best Song Ever - One Direction",
        "Better Now - Post Malone",
        "Blinding Lights - The Weeknd"
    };

    string estribillos[] = { //respuesta de los estribillos
        "YOU ONLY COME OUT AT NIGHT",
        "LAS PALABRAS Y TODO EL TIEMPO QUE PERDI",
        "CAUSE WE DANCED ALL NIGHT TO THE BEST SONG EVER",
        "YOU KNOW I NEVER MEANT TO LET YOU DOWN, LET YOU DOWN",
        "I'M DROWNING IN THE NIGHT"
    };

    string rutas[] = { //ruta de los archivos .wav
        "Vampire-OliviaRodrigo.wav",
        "amorfoda - bad bunny.wav",
        "Best Song Ever-OneDirection.wav",
        "BetterNow-PostMalone.wav",
        "BlindingLights-TheWeeknd.wav"
    };

    int puntos = 0;

    cout << "Bienvenido a TERMINA LA CANCION, un juego musical interactivo de Rock&Play!\n";
    cout << "Escucharas diferentes estribillos y deberas completar la siguiente frase que vendria a continuacion.\n";
    cout << "Por cada respuesta correcta, ganaras un punto.\n";
    cout << "Disfruta del juego y gana diferentes premios!.\n\n";

    cout << "El juego empezara en... ";
    for (int i = 10; i > 0; --i) { //uso el thread sleep para hacer una cuenta atrás
        cout << i << " ";
        this_thread::sleep_for(chrono::seconds(1));
    }

    cout << "\n\nEmpezamos:\n\n";
     
    for (int i = 0; i < 5; ++i) { //bucle para seguir el juego con las 5 canciones
        cout << "Nivel " << i + 1 << ".\n";

        cout << "Reproduciendo la cancion '" << canciones[i] << "':\n";

        //para pasar el string a un formato compatible con PlaySound
        wstring rutaWide(rutas[i].begin(), rutas[i].end());
        LPCWSTR rutaLPCWSTR = rutaWide.c_str();

        PlaySound(rutaLPCWSTR, NULL, SND_FILENAME);

        string respuestaUsuario;
        cout << "Escribe la siguiente frase de la cancion '" << canciones[i] << "': ";
        cout << "\nTu respuesta: ";
        getline(cin, respuestaUsuario); //para que lea toda la respuesta y no solo hasta encontrar el primer espacio

        transform(respuestaUsuario.begin(), respuestaUsuario.end(), respuestaUsuario.begin(), ::toupper);

        if (verificarRespuesta(respuestaUsuario, estribillos[i])) {
            cout << "\nHas acertado! Ganas un punto.\n";
            puntos++;
        }
        else {
            cout << "\nFallaste. La continuacion de la cancion era la siguiente: " << estribillos[i] << "\n";
        }

        cout << "\nPuntuacion actual: " << puntos << " punto(s).\n\n";
    }

    cout << "\n\nHas completado el juego!";
    cout << "\nTu puntuacion final es: " << puntos << " /5.";
    cout << "\n\nMuchas gracias por participar, disfruta de Rock&Play!\n\n";
}
