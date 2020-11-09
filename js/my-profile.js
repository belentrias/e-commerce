//defino la variable datos con todos los campos + imagen
var Datos = {
    nombre : "",
    apellido : "",
    edad : "",
    email : "",
    telefono : "",
    celular : "",
    img: "",
};

//var savedData = []
 //funcion que guarda los datos y los valida
function guardarDatos(){
    var elementos_campos = document.getElementsByClassName("form-control");
    invalidos = 0;
//acá los valida con el método is-valid
    for (let i = 0; i < elementos_campos.length; i++){
        if (elementos_campos[i].value === "" || elementos_campos[i].value === "Elegir..."){
            elementos_campos[i].classList.add("is-invalid");
            elementos_campos[i].classList.remove("is-valid");
        } else {
            elementos_campos[i].classList.add("is-valid");
            elementos_campos[i].classList.remove("is-invalid");
        }
    }

    for (let i = 0; i < elementos_campos.length; i++){
        if (elementos_campos[i].classList.contains("is-invalid")){
            invalidos = invalidos + 1;
        }
    }

    if (invalidos){
        swal({
            text: "Debes completar los campos",
            icon: "warning",
           });
    } else {
        Datos.nombre = document.getElementById("inputName").value;
        Datos.apellido = document.getElementById("inputLastName").value;
        Datos.edad = document.getElementById("inputAge").value;
        Datos.email = document.getElementById("inputEmail").value;
        Datos.telefono = document.getElementById("inputTelephone").value;
        Datos.celular = document.getElementById("inputCellphone").value;
        Datos.img = document.getElementById("img").src;
        //creo un item par poder guardar en el localStorage
        localStorage.setItem("datos_usuario", JSON.stringify(Datos));
    }
}
//función que carga los datos
function cargarDatos(){
    //accedo al item datos_usuario que utilicé para guardarlos
    let datos_aux = localStorage.getItem("datos_usuario");
    Datos = JSON.parse(datos_aux);

    document.getElementById("inputName").value = Datos.nombre;
    document.getElementById("inputLastName").value = Datos.apellido;
    document.getElementById("inputAge").value = Datos.edad;
    document.getElementById("inputEmail").value = Datos.email;
    document.getElementById("inputTelephone").value = Datos.telefono;
    document.getElementById("inputCellphone").value = Datos.celular;
    document.getElementById("img").src = Datos.img;
}

//función que cambia la foto desde una URL
//function cambiarFoto(){
  //  var imagen = prompt("Por favor ingresa una URL para usar como nueva foto. Ejemplo: https://i.ibb.co/QrfGCJ9/tree1.jpg");
    //localStorage.setItem("imagen_usuario", imagen);
   //document.getElementById("fotoUsuario").src=imagen;
//}

//función que cambia la foto desde un archivo
$(document).ready(function() {
    var readURL = function(input) {
        if (input.files && input.files[0]) {
//El objeto FileReader permite que las aplicaciones web lean ficheros (o información en buffer) 
//almacenados en el cliente de forma asíncrona, usando los objetos File o Blob dependiendo
//de los datos que se pretenden leer.
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.avatar').attr('src', e.target.result);
            }
    
            reader.readAsDataURL(input.files[0]);
        }
    }
    

    $(".file-upload").on('change', function(){
        readURL(this);
    });
});

//función que borra todos los campos (form control)
function borrarCampos(){
    var confirmacion = confirm("¿Borrar todos los campos (borrara también lo guardado)?");
    if (confirmacion){
        var datos_formulario = document.getElementsByClassName("form-control");
        for (let i = 0; i < datos_formulario.length; i++){
            let datos_formulario_actual = datos_formulario[i];
            if (datos_formulario_actual.id !== "idState"){
                datos_formulario_actual.value = "";
            } else {
                datos_formulario_actual.value = "Elegir...";
            }
    //funcion que borra la imagen
           document.getElementById ("img").src = "";
        }
        localStorage.clear();
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    //si los campos no estan indefinidos, cargo los datos
    if (localStorage.getItem("datos_usuario") != undefined){
        cargarDatos();
}
});