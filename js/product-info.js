//variable comentario
var comentarios= [];
//función que guarda los comentarios
function guardar(){ 
var comentario = {};
var usuario = document.getElementById("nombreusuario").value;
var descripcion = document.getElementById("descripcioncoment").value;

//variables fecha y hora
var fecha = new Date();
var dia = fecha.getDate();
var diaOk = (dia < 10) ? '0' + dia : dia;
var mes = fecha.getMonth() + 1;
var mesOk = (mes < 10) ? '0' + mes : mes;
var fechaOk = fecha.getFullYear() + `-` + mesOk + `-` + diaOk;
var hora = fecha.getHours() + `:` + fecha.getMinutes() + `:` + fecha.getSeconds();

//variable estrellas para la puntuación 
var estrellas = document.getElementsByName("puntuacion");
for (let estrella of estrellas){
    if (estrella.checked){
        var puntuacion = estrella.value;
    }
}

    comentario.user = usuario;
    comentario.description = descripcion;
    comentario.score = puntuacion;
    comentario.dateTime = fechaOk + ` ` + hora;

    if(usuario.trim()!="" && descripcion.trim()!=""){
    comentarios.push(comentario);
    mostrar(comentarios);
    }
    else{
        alert("Por favor, complete todos los campos")
    }
    document.getElementById("nombreusuario").value ="";
    document.getElementById("descripcioncoment").value = "";
}

//función que cuenta las estrellas
function contadorestrellas(i){
    var cestrellas = new String;
    var puntuacion = parseInt(i);
    for (x = 0 ; x<puntuacion ; x++){
       cestrellas +=  `<span class= "fa fa-star" style="color:#d61c6c;"></span>`
    };
    return cestrellas;
}
//funcion mostrar comentarios
function mostrar(comentarios){
    let htmlContentToAppend = "";
    for(comentario of comentarios){
        htmlContentToAppend += 
`<dt><i class="fas fa-user"></i> ` + comentario.user + `</dt>
    <dd> <small>` + comentario.dateTime + `</small></dd>
    <dd> ` + comentario.description + `</dd>
    <dd> Valoración: ` + contadorestrellas(comentario.score) +`</dd> <hr>`;

    document.getElementById("comentarios").innerHTML = htmlContentToAppend;
}
}
//funcion cantidad de valoraciones
function mostrarvaloraciones(array){
    let htmlContentToAppend = "";
    let cvaloraciones = array.length;
    let cestrellas = 0;

    for(let i = 0; i < array.length; i++){
        cestrellas += array[i].score;        
    }

    let pestrellas = Math.round(cestrellas / cvaloraciones)
    let score = "";

        for(let i = 1; i <= pestrellas; i++){
            score += `<span class="fa fa-star" style="color:#d61c6c;"></span>`
        }

        for(let i = pestrellas + 1; i <= 5; i++){
            score += `<span class="fa fa-star not-checked"></span>`
        }

    htmlContentToAppend += score + `<a href="#cvaloraciones" id="valoraciones"> Ver `+ cvaloraciones + ` valoraciones</a> `
    document.getElementById("valoraciones").innerHTML = htmlContentToAppend;

}

//funciones que muestran las imagenes
//1-funcion imagenes carousel
function mostrarCarousel(imgs){
    for(i=0; i<imgs.length; i++){
        document.getElementById("item"+i).src=imgs[i];
    }
}
//2-funcion imagenes galería
function mostrarImagen(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//muestro los comentarios
//fetch que recoge la información de los comentarios y los muestra
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
    if (resultObj.status === "ok"){
    comentarios = resultObj.data;
    mostrar(comentarios);
    mostrarvaloraciones(comentarios);
    }
    });
//fetch que recoge la información de los productos y los muestra 
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            let productCostHTML = document.getElementById("productCost");
            let productCurrencyHTML = document.getElementById("productCurrency");
            
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = `<a href="category-info.html">` + product.category + `</a>`;
            productCostHTML.innerHTML = product.cost;
            productCurrencyHTML.innerHTML = product.currency;
//muestro el carousel
            mostrarCarousel(product.images);
//muestro las iamgenes en forma de galeria (debajo del carousel)
            mostrarImagen(product.images);
        }
//fetch que recoge la lista de los productos y devuelve los relacionados
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            let relatedProduct = resultObj.data;

            let content = "";
            product.relatedProducts.forEach(function(array) {
                let auto = relatedProduct[array];
                content += `
                <div class="col-lg-3 col-md-4 col-6">
                    <div class="d-block mb-4 h-100">
                        <img class="img-fluid img-thumbnail" src="` + auto.imgSrc + `" alt="">
                        <h4 class="mb-1">`+ auto.name +`</h4>
                        <p class="mb-1">` + auto.description + `</p>
                        <a href="product-info.html" class="btn btn-primary">Ver producto</a>
                    </div>
                </div>
                `
                document.getElementById("relatedProducts").innerHTML = content;

            })
        }
    });
    });
});
