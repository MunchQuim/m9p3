async function userExists( nombre, contra) {
    let response = await fetch("./jsons/users.json");
    let usuarios = await response.json();
    let devolucion = false;
    usuarios.forEach(usuario => {

        if(usuario["nombre"]==nombre && usuario["contraseña"]==contra){
            devolucion = true;
            
        }
    });
    return devolucion;
}
async function userExists(nombre) {
    let response = await fetch("./jsons/users.json");
    let usuarios = await response.json();
    let devolucion = false;
    usuarios.forEach(usuario => {

        if(usuario["nombre"]==nombre){
            devolucion = true;
            
        }
    });
    return devolucion;
}

async function crearUsuario(nombre, contra, mail) {
    let response = await fetch("./jsons/users.json");
    let usuarios = await response.json();
    
    let index = usuarios[usuarios.length-1]["id"];
    let newUser = {
        "id": index+1,
        "nombre": nombre,
        "contraseña":contra,
        "email": mail
    }
    usuarios.push(newUser);
    //si quiero guardar los datos deberia tener un lado servidor
}   
async function name() {
    let response = await fetch("./jsons/users.json");
    let usuarios = await response.json();
    console.log(usuarios[usuarios.length-1]["id"]);
}
name();
