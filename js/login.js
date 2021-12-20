// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
    var correo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }else if(!correo.test(form.usuario.value)){
                    document.getElementById('errorUser').innerText="* Email no valido";
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
})()

/*---------------------------------------
            Login
----------------------------------------*/
jQuery(document).on("submit", "#login", function(event){
    event.preventDefault();
    let user = $($("#login")[0].usuario).val();
    let pass =$($("#login")[0].contrasena).val();
    console.log(user);
    console.log(pass);
    $.ajax({
        url:"http://129.151.108.94:8080/api/user/"+user+"/"+pass,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            if(!respuesta.error){
                if(respuesta.name!=null){
                    console.log("entro")
                    location.href='privado.html';
                }else{
                    $("#alertUser").html("<div class='alert alert-danger' role='alert'>No exite el usuario, verifique sus credenciales</div>").slideDown('slow');
                    setTimeout(function(){
                        $("#alertUser").slideUp("slow");
                    },3000)
                }
            }
        }
    })
})