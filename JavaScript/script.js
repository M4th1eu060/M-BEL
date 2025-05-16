    function mostrarPopupConRetraso() {
    // Comprobamos si ya se ha mostrado o no, si no se ha mostrado pues se muestra... sino pues no se muestra
    if (!localStorage.getItem("popupMostrado")) {
        setTimeout(() => {
        document.getElementById("popup").style.display = "flex";
        localStorage.setItem("popupMostrado", "true"); // Marquem que ja s’ha mostrat
        }, 3000);
    }
    }

    // Cerrar el popup
    function cerrarPopup() {
      document.getElementById("popup").style.display = "none";
    }

    // Validar y aceptar el formulario
    function aceptar() {
        // Almacenar la información del correo y las cookies
      const correo = document.getElementById("correo").value.trim();
      const cookiesAceptadas = document.getElementById("cookies").checked;

        // Comprobar que el correo no esté vacio... igual faltaría comprobar que sea un correo valido...
        if (!correo) {
            mensaje.innerHTML = "<b>Error:</b> El campo de correo es obligatorio.";
            mensaje.className = "error";
            return;
        }
        // Lo mismo para las cookies
        if (!cookiesAceptadas) {
            mensaje.innerHTML = "Debes <u>aceptar las cookies</u> para continuar.";
            mensaje.className = "error";
            return;
        }

        
        // Mensaje de que todo es correcto
        mensaje.innerHTML = "¡Correo registrado con éxito!";
        mensaje.className = "ok";

 
        // Cerrar el popup tras 2 segundos si todo es correcto
        setTimeout(() => {
            cerrarPopup();
        }, 1000);
    }

// Activar cuando se carga la página
window.addEventListener("load", mostrarPopupConRetraso);