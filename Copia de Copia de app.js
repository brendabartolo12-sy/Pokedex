const contenedor = document.getElementById('pokedex-container');
const cantidadPokemon = 150; // Aquí defines cuántos quieres traer de la PokéAPI

// Módulo 3: Bucle asíncrono para traer los Pokémon
async function traerPokemons() {
    for (let i = 1; i <= cantidadPokemon; i++) {
        await obtenerPokemon(i);
    }
}

async function obtenerPokemon(id) {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const respuesta = await fetch(url);
        const pokemon = await respuesta.json();
        crearTarjetaAPI(pokemon);
    } catch (error) {
        console.error("Error trayendo datos de la API:", error);
    }
}

// Módulo 3 y 4: Función modificada para renderizar y escuchar el Click
function crearTarjetaAPI(pokemon) {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('card');
    
    // Obtener el primer tipo del Pokémon
    const tipo = pokemon.types[0].type.name;
    tarjeta.classList.add(tipo); // Añade el tipo como clase CSS (por si quieres darle colores)

    // Formatear ID a tres dígitos (ej. 001)
    const idFormateado = pokemon.id.toString().padStart(3, '0');

    tarjeta.innerHTML = `
        <span class="number">#${idFormateado}</span>
        <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
        <h3 class="pokemon-name">${pokemon.name}</h3>
        <p>Tipo: ${tipo}</p>
    `;

    // Escucha el click para abrir la ventana modal pasándole todo el objeto pokemon
    tarjeta.addEventListener('click', () => abrirModal(pokemon));

    contenedor.appendChild(tarjeta);
}

// Módulo 4: Lógica de la Ventana Modal
const modal = document.getElementById('modal-pokemon');
const botonCerrar = document.getElementById('cerrar-modal');

function abrirModal(pokemon) {
    // Inyectar imagen y nombre (en mayúsculas)
    document.getElementById('modal-img').src = pokemon.sprites.other['official-artwork'].front_default;
    document.getElementById('modal-nombre').innerText = pokemon.name.toUpperCase();

    // La API devuelve peso en hectogramos y altura en decímetros. Dividimos entre 10 para metros y kg.
    document.getElementById('modal-altura').innerText = pokemon.height / 10;
    document.getElementById('modal-peso').innerText = pokemon.weight / 10;

    // Estadísticas base del arreglo stats de la API
    document.getElementById('modal-hp').innerText = pokemon.stats[0].base_stat;
    document.getElementById('modal-ataque').innerText = pokemon.stats[1].base_stat;
    document.getElementById('modal-defensa').innerText = pokemon.stats[2].base_stat;

    // Cambiar display para que se vea
    modal.style.display = 'flex';
}

// Cerrar el modal al dar clic en la X
botonCerrar.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Extra: Cerrar si el usuario hace clic fuera de la caja blanca
window.addEventListener('click', (evento) => {
    if (evento.target === modal) {
        modal.style.display = 'none';
    }
});

// Módulo 4: Buscador en tiempo real
const inputBuscador = document.getElementById('buscador');

inputBuscador.addEventListener('keyup', (evento) => {
    const textoBusqueda = evento.target.value.toLowerCase();
    const tarjetas = document.querySelectorAll('.card');

    tarjetas.forEach(tarjeta => {
        const nombrePokemon = tarjeta.querySelector('.pokemon-name').innerText.toLowerCase();

        if (nombrePokemon.includes(textoBusqueda)) {
            tarjeta.style.display = 'block';
        } else {
            tarjeta.style.display = 'none';
        }
    });
});

// Iniciamos la descarga de los datos
traerPokemons();
