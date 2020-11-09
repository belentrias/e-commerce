
   function login(){
        var usuario = document.getElementById("user").value;
        var contrasena = document.getElementById("pass").value;

        
        
        if (usuario==""&& contrasena=="" || usuario=="" || contrasena=="" ){ 

            alert("Usuario y/o contraseña incorrectos. Por favor intente de nuevo");
            
        } 
        else{ 

            localStorage.setItem("user", usuario); 
            window.location.href="cover.html";
        } 
    };

