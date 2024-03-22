//para seleccionar los elementos de la web
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

//para saber la cantidad de elementos en 'items'
let countItem = items.length;

//para inicializar el ínidice del elemento activo
let itemActive = 0;

//esta función es para la flechita de next al hacer click
next.onclick = function(){
    //se va sumando al elemento activo un 1 para que vaya pasando al siguiente cada vezs que se de a la flechita
    itemActive = itemActive + 1;

    //cuando se llega al último elemento activo, se reinicia y vuelve al primero
    if(itemActive >= countItem){
        itemActive = 0;
    }

    showSlider();
}

//misma funcíon que antes pero con la flechita de ir hacia atrás
prev.onclick = function(){
    //se va restando al elemento activo un 1 para que vaya pasando al anterior cada vez que se de a la flechita
    itemActive = itemActive - 1;

    //cuando se llega al primer elemento activo, vuelve al último
    if(itemActive < 0){
        itemActive = countItem - 1;
    }

    showSlider();
}

//este es el intervalo de tiempo entre cada elemento del slider, en este caso, 7 segundos
let refreshInterval = setInterval(() => {
    //esto es para simular que alguien presiona la flechita de next cada 7 segundos
    next.click();
}, 7000)

function showSlider(){
    //para saber cuál fue el elemento activo anterior
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');

    //esto se usa para quitar el activo del elemento anterior (thumbnail también)
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

   //y esto para añadir activo al elemento actual (thumbnail también)
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    //se reinicia el intervalo de tiempo para que vuelvan a pasar 7 segundos
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 7000)
}

//para que pase en cada foto del thumbnail y cambie el slider si se clica en alguna de las img
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;

        showSlider();
    })
})

//mensaje de alerta cuando un usuario se registra
document.getElementById('enviarRegistro').onclick = function(){
    alert('Te has registrado correctamente.');
}

//mensaje de alerta cuando un usuario se pone en contacto
document.getElementById('enviarContacto').onclick = function(){
    alert('Tu mensaje se ha mandado correctamente..');
}

//para añadir un scroll suave cuando se hace click a algún enlace interno
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); //para prevenir el compartamineto habitual de los enlaces

        //esto es lo que añade el movimeinto suave
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});