const contenedor = document.getElementById('pokedex-container');
const cantidadPokemon = 150;

// Práctica 8: Bucle asíncrono para traer a los 150
const obtenerPokemons = async () => {
    for (let i = 1; i <= cantidadPokemon; i++) {
        await consultarPokemon(i);
    }
};

// Práctica 7: Consumo de la PokéAPI
const consultarPokemon = async (id) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const respuesta = await fetch(url);
        const pokemon = await respuesta.json();
        crearTarjetaAPI(pokemon);
    } catch (error) {
        console.error("Error al obtener el Pokémon", error);
    }
};

//Localiza  esta función de tus prácticas anteriores y modifica la asi:
function crearTarjetaAPI(pokemon) {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('card');
    const tipo = pokemon.types[0].type.name;

    tarjeta.innerHTML = `
        <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
        <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
        <h2 class="pokemon-name">${pokemon.name.toUpperCase()}</h2>
        <p>Tipo: ${tipo}</p>
    `;

    // ¡ESTA ES LA LÍNEA NUEVA MÁGICA!
    // Le decimos a esta tarjeta específica que al darle clic, ejecute abrirModal con SUS datos.
    tarjeta.addEventListener('click', () => abrirModal(pokemon));

    contenedor.appendChild(tarjeta);
}
// Práctica 9: Buscador en tiempo real
const inputBuscador = document.getElementById('buscador');

inputBuscador.addEventListener('keyup', (evento) => {
    // Convertimos lo que escribe el usuario a minusculas
    const textoBusqueda = evento.target.value.toLowerCase();

    // Seleccionamos todas las tarjetas generadas
    const tarjetas = document.querySelectorAll('.card');

    tarjetas.forEach(tarjeta => {
        // Buscamos el nombre dentro de la tarjeta
        const nombrePokemon = tarjeta.querySelector('.pokemon-name').innerText.toLowerCase();

        // Si el nombre incluye el texto buscado, la mostramos, si no, la ocultamos
        if (nombrePokemon.includes(textoBusqueda)) {
            tarjeta.style.display = 'block';
        } else {
            tarjeta.style.display = 'none';
        }
    });
});
// Practica 10: lógica de la Ventana Modal

// 1. Seleccionamos los elementos del Modal
Const modal = document.getElementById(‘modal-pokemon’);
Const botonCerrar = document.getElementById(‘cerrar-modal’);

// 2. Función para inyectar datos y mostrar el modal
Function abrirModal(pokemon) {
  // Cambiamos la imagen y el nombre
  Document.getElementById(‘modal-img’).src = pokemon.sprites.other[‘official-artwork’].front_default;
  Document.getElementById(‘modal-nombre’).innerText = pokemon.name.toUpperCase();

  // Dato curioso para los alumnos: La PokeAPI devuelve peso y altura en decímetros y hectogramos.
  // Lo dividimos entre 10 para mostrar metros y kilos reales.
  Document.getElementById(‘modal-altura’).innerText = pokemon.height / 10;
  Document.getElementById(‘modal-peso’).innerText = pokemon.weight / 10;

  // Buscamos las estadísticas en el arreglo ‘stats’ de la API
  Document.getElementById(‘modal-hp’).innerText = pokemon.stats[0].base_stat;
  Document.getElementById(‘modal-ataque’).innerText = pokemon.stats[1].base_stat;
  Document.getElementById(‘modal-defensa’).innerText = pokemon.stats[2].base_stat;

  // Cambiamos el display de ‘none’ a ‘flex’ para que se vea
  Modal.style.display = ‘flex’;
}

// 3. Eventos para cerrar el modal
botonCerrar.addEventListener(‘click’, () => {
  modal.style.display = ‘none’;
});

// Extra: Cerrar el modal si el usuario hace clic fuera de la caja blanca
Window.addEventListener(‘click’, (evento) => {
  If (evento.target === modal) {
    Modal.style.display = ‘none’;
  }
});
// Iniciamos la descarga
obtenerPokemons();