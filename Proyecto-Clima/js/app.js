const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima)
})

function buscarClima(e) {
    e.preventDefault();

    // Validar formulario
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        //Hubo un error
        mostrarError('Ambos campos son obligatorios');
        return;

    }else {

    }

    //Consultariamos la API
    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){

        //Crear una alerta
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
    
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `
        container.appendChild(alerta);

        //Se elimine esa alerta despues de 3 segundos

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function consultarAPI(ciudad, pais) {
    const appId = '0ae316758e8b36449751f1a65dd7a721';

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    Spinner(); //Muestra el spinner de carga
    fetch(url)
        .then(response => response.json())
        .then(data => {
            limpiarHTML(); //Limpiar el HTML previo
            if(data.cod === "404") {
                mostrarError('Ciudad no encontrada')
                return;
            }

            //Imprime la respuesta en el HTML
            mostrarClima(data);
        })
}   

function mostrarClima(datos) {

        const {name, main: {temp, temp_max, temp_min} } = datos;
    
        const centigrados = KelvinACentigrados(temp);
        const max = KelvinACentigrados(temp_max);
        const min = KelvinACentigrados(temp_min);

        const nombreCiudad = document.createElement('P');
        nombreCiudad.innerHTML = `Clima en: ${name}`;
        nombreCiudad.classList.add('font-bold', 'text-2xl');

        const actual = document.createElement('P');
        actual.innerHTML = `${centigrados} &#8451;`;
        actual.classList.add('font-bold', 'text-6xl');

        const temperaturaMax = document.createElement('P');
        temperaturaMax.innerHTML = `Max: ${max} &#8451;`;
        temperaturaMax.classList.add('text-xl');

        const temperaturaMin = document.createElement('P');
        temperaturaMin.innerHTML = `Min: ${min} &#8451;`;
        temperaturaMin.classList.add('text-xl');

        const resultadoDiv = document.createElement('div');
        resultadoDiv.classList.add('text-center', 'text-white');
        
        resultadoDiv.appendChild(nombreCiudad);
        resultadoDiv.appendChild(actual);
        resultadoDiv.appendChild(temperaturaMax);
        resultadoDiv.appendChild(temperaturaMin);
        

        resultado.appendChild(resultadoDiv);
    }

const  KelvinACentigrados = grados => parseInt(grados - 273.15);


function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner() {
    limpiarHTML();

    const  divSpinner = document.createElement('DIV');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>

    `;

    resultado.appendChild(divSpinner);
}