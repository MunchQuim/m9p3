let sesion = [];
let eventos = [];
let ciudades = [];
/* document.getElementById("buscadorBtn").addEventListener("click",()=>{
    cambiarEstado(document.getElementById("buscadorContent"));
},false);
document.getElementById("buscador").addEventListener("mouseout",()=>{
    cerrar(document.getElementById("buscadorContent"));
},false); */

function toggleFilterMenu() {
    document.getElementById("desplegable").classList.toggle("oculto");
}


// Función para aplicar el filtro seleccionado
function applyFilter() {
    const citySelect = document.getElementById("cityFilter");
    const selectedCities = Array.from(citySelect.selectedOptions).map(option => option.value);

    const cards = document.querySelectorAll(".card");
    cards.forEach(carta => {
        const contieneCiudad = selectedCities.some(ciudad => carta.classList.contains(ciudad));
        if (!contieneCiudad) {
            ocultarCartaYAgregarClase(carta);
        }
        else {
            if (!carta.classList.contains("flex")) {
                carta.classList.add("flex");
            }
            carta.classList.remove("oculto");
        }
    })

}

document.getElementById("user").addEventListener("click",()=>{
    desPulsarElemento(document.getElementById("user"));
},false);

document.getElementById("signUp").addEventListener("click", () => {
    mostrarDiv(document.getElementById("signupContainer"));
    darCierre(document.getElementById("blurrySignin"),document.getElementById("signupContainer"));
    darCierre(document.getElementById("loginLink"),document.getElementById("signupContainer"));
}, false);
document.getElementById("signUp").addEventListener("click",()=>{
    desPulsarElemento(document.getElementById("signUp"));
},false);

document.getElementById("logIn").addEventListener("click", () => {
    mostrarDiv(document.getElementById("loginContainer"));
    darCierre(document.getElementById("blurryLogin"),document.getElementById("loginContainer"));
}, false);
document.getElementById("logIn").addEventListener("click",()=>{
    desPulsarElemento(document.getElementById("logIn"));
},false);
document.getElementById("loginLink").addEventListener("click", () => {
    mostrarDiv(document.getElementById("loginContainer"));
    darCierre(document.getElementById("blurryLogin"),document.getElementById("loginContainer"));
}, false);





function mostrarDiv(elemento) {
    bloquearScroll();
    elemento.childNodes[3].style.animation = "mostrarAgrandar 1s ease-in-out";
    elemento.style.display = "flex";
}
function ocultarDiv(elemento) {
    desbloquearScroll();
    elemento.style.display = "none";
}
function darCierre(cElement,closedElement) {

    cElement.addEventListener("click", () => {

        ocultarDiv(closedElement);
    }, false);
}
function destacado() {
    if (window.scrollY <= 10) {
        if(document.getElementById("heroCard").classList.contains("desApareciendo")){            
           document.getElementById("heroCard").classList.remove("desApareciendo");
        } 
        aparecerElemento(document.getElementById("heroCard"));
        document.getElementById("heroContainer").style.height = "400px";
        // Aquí puedes añadir más acciones, como cambiar el estilo de un elemento, mostrar un mensaje, etc.
    }
    else {
        if(!document.getElementById("heroCard").classList.contains("desApareciendo")){
            desAparecerElemento(document.getElementById("heroCard"));
        }        
        document.getElementById("heroContainer").style.height = "220px";
    }
}

async function cargarEventos() {
    let response = await fetch("http://localhost:3000/events");
    eventos = await response.json();
    ciudades = [...new Set(eventos.map(evento => evento.ciudad))];
    ciudades.forEach(ciudad => {
        const opcion = document.createElement("option");
        opcion.value = ciudad;
        opcion.innerText = ciudad;
        document.getElementById("cityFilter").appendChild(opcion);
    })
    eventos.forEach(element => {
        // Crear el div principal con la clase 'card'
        const card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("flex");
        card.classList.add(element["ciudad"]);
        // Crear el div con la clase 'cardBigPart'
        const cardBigPart = document.createElement("div");
        cardBigPart.classList.add("cardBigPart");

        // Crear el contenedor de la imagen de la tarjeta 'cardImgCont' y la imagen dentro
        const cardImgCont = document.createElement("div");
        cardImgCont.classList.add("cardImgCont");

        const cardImg = document.createElement("img");
        cardImg.classList.add("cardImg");
        cardImg.src = element["url"];
        cardImg.alt = element["nombre"];
        cardImgCont.appendChild(cardImg);

        // Crear el contenedor del corazón 'cardHeart' y la imagen del corazón dentro
        const cardHeart = document.createElement("div");
        cardHeart.classList.add("cardHeart");

        const heart = document.createElement("img");
        heart.classList.add("heart");
        heart.src = "./img/baseHeart.png";
        heart.alt = "";
        heart.addEventListener("click", () => {
            unirse(heart);
        }, false);
        cardHeart.appendChild(heart);

        // Crear el contenedor de los datos 'cardDataContainer' y sus elementos hijos
        const cardDataContainer = document.createElement("div");
        cardDataContainer.classList.add("cardDataContainer");

        const cardData = document.createElement("div");
        cardData.classList.add("cardData");
        cardData.innerHTML = "<h2>" + element["nombre"] + "</h2>" +
            "<p>" + element["ubicacion"] + ": " + element["fecha"] + "  " + element["hora"] + "</p>";

        const cardDescription = document.createElement("div");
        cardDescription.classList.add("cardDescription");
        cardDescription.innerText = element["descripcion"];

        cardDataContainer.appendChild(cardData);
        cardDataContainer.appendChild(cardDescription);

        // Añadir todos los elementos al 'cardBigPart'
        cardBigPart.appendChild(cardImgCont);
        cardBigPart.appendChild(cardHeart);

        // Añadir el 'cardBigPart' al 'card'
        card.appendChild(cardBigPart);
        card.appendChild(cardDataContainer);

        // Finalmente, agregar el 'card' al DOM, por ejemplo, al cuerpo o a un contenedor específico
        document.getElementById("cardContainer").appendChild(card); // O sustituir con otro contenedor como document.getElementById('miContenedor')


    });

    /*
                <div class="card">
                <div class="cardBigPart">
                    <div class="cardImg">
                        
                    </div>
                    <div class="cardDataContainer">
                        <div class="cardHeart">
                            <img class="heart" src="./img/baseHeart.png" alt="">
                        </div>
                        <div class="cardData"></div>
                    </div>
                </div>
                <div class="cardDescription"></div>
            </div>
    */
    /*
        <div class="card">
            <div class="cardBigPart">
                <div class="cardImgCont">
                    <img class="cardImg">
                </div>
                <div class="cardHeart">
                    <img class="heart" src="./img/baseHeart.png" alt="">
                </div>                 
            </div>   
            <div class="cardDataContainer">
                     <div class="cardData"></div>
                     <div class="cardDescription"></div>
            </div>          
        </div>
 */
}
function bloquearScroll() {
    document.body.style.overflow = "hidden";
}
function desbloquearScroll() {
    document.body.style.overflow = "scroll";
}
window.addEventListener("scroll", destacado);
cargarEventos();

//login signup /// api

const signForm = document.getElementById("signInForm");
signForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    let user = document.getElementById("SignUsername").value;
    let mail = document.getElementById("SignEmail").value;
    let password = document.getElementById("SignPassword").value;
    let confirm_password = document.getElementById("SignConfirm_password").value;
    if (password === confirm_password) {
        let coincidencias = await buscarUsuarioPorNombre(user);
        console.log(coincidencias);
        if (coincidencias === null) {
            await añadirUsuario(user, password, mail);
            await intentarIniciarSesion(user, password);
        } else {
            console.log("El nombre de usuario ya está en uso");
        }
    }
});



const logInForm = document.getElementById("logInForm");
logInForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    let user = document.getElementById("logUsername").value;
    let password = document.getElementById("logPassword").value;
    await intentarIniciarSesion(user, password);

});
async function intentarIniciarSesion(user, password) {
    console.log("intentando iniciar sesion");
    let bool = await comprobarUsuario(user, password);
    if (bool) {
        console.log("Inicio de sesión exitoso");
        sesion = [{
            "nombre": user,
            "password": password
        }]
        logeado();
    } else {
        console.log("Error: usuario no encontrado");
    }
}
function logeado() {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("signupContainer").style.display = "none";
    document.getElementById("signUp").style.display = "none";
    document.getElementById("logIn").style.display = "none";

    document.getElementById("user").style.display = "flex";
    pulsarElemento(document.getElementById("user"));
    
    desbloquearScroll();
}



//añadir usuario
async function añadirUsuario(nombre, password, mail) {
    try {
        const response = await fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, password, mail }),
        });

        if (!response.ok) {
            throw new Error('Error al añadir usuario');
        }
        const data = await response.json();
        console.log('Usuario añadido:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para buscar usuario por nombre
function buscarUsuarioPorNombre(nombre) {
    return fetch(`http://localhost:3000/usuarios/nombre/${nombre}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                console.log('No se encontraron usuarios con ese nombre');
                return null; // o un array vacío, dependiendo de tu preferencia
            } else {
                console.log('Usuarios encontrados:', data);
                return data; // Devuelve los usuarios encontrados
            }
        })
        .catch(error => {
            console.error('Error:', error);
            return null; // Manejo de error
        });
}

async function buscarUsuarioPorNombreYContraseña(nombre, contraseña) {
    const response = await fetch(`http://localhost:3000/usuarios/nombre/${nombre}`);
    const usuarios = await response.json();

    // Busca el usuario que coincide con el nombre y la contraseña
    const usuarioEncontrado = usuarios.find(u => u.contraseña === contraseña);

    if (usuarioEncontrado) {
        return usuarioEncontrado; // Devuelve el usuario encontrado
    } else {
        return null; // Devuelve null si no se encuentra
    }
}


async function comprobarUsuario(nombre, contraseña) {
    const usuario = await buscarUsuarioPorNombreYContraseña(nombre, contraseña);
    if (usuario) {
        return true;
    } else {
        return false;
    }
}

//
function cambiarEstado(element) {
    if (element.style.display == "none") {
        abrir(element);
    }
    else {
        cerrar(element);
    }
}
function cerrar(element) {
    element.style.display = "none";
}
function abrir(element) {
    element.style.display = "flex";
}

function ocultarCartaYAgregarClase(carta) {
    // Iniciar la animación
    carta.classList.add("animOculto");

    // Escuchar el final de la animación para agregar la nueva clase
    carta.addEventListener("animationend", () => {
        carta.classList.add("oculto");
        carta.classList.remove("flex");
        carta.classList.remove("animOculto");
    }, { once: true }); // `{ once: true }` asegura que se ejecute solo una vez

}
function pausar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function unirse(corazon) {
    if (sesion.length == 0) {
        mostrarDiv(document.getElementById("signupContainer"));

        darCierre(document.getElementById("blurrySignin"));
    } else {
        corazon.classList.toggle("meGusta");
        if (corazon.classList.contains("meGusta")) {

            pulsarElemento(corazon);

            corazon.src = "./img/likeHeart.png";
        } else {
            corazon.src = "./img/baseHeart.png";
            desPulsarElemento(corazon);
        }
    }


    
}
function pulsarElemento(element){
    element.classList.add("pulsado");
    element.addEventListener("animationend", () => {
        element.classList.remove("pulsado");
    }, { once: true });
}
function desPulsarElemento(element){
    element.classList.add("desPulsado");
    element.addEventListener("animationend", () => {
        element.classList.remove("desPulsado");
    }, { once: true });
}
function aparecerElemento(element) {
    element.classList.add("apareciendo");
    element.addEventListener("animationend", () => {
        element.classList.remove("apareciendo");
    }, { once: true });
}
function desAparecerElemento(element) {
    element.classList.add("desApareciendo");
/*     element.addEventListener("animationend", () => {
        element.classList.remove("desApareciendo");
    }, { once: true }); */
}
aparecerElemento(document.getElementById("heroCard"));