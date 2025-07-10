
const BASE_URL = 'http://localhost:3000'; 

// Elementos del DOM
const bookForm = document.getElementById('bookForm');
const bookNameInput = document.getElementById('bookName');
const bookList = document.getElementById('bookList');
const messageArea = document.getElementById('message-area');
const durationMessage = 3000;

// --- Funciones para manejar mensajes de UI ---
function showMessage(msg, type) {
    messageArea.textContent = msg;
    messageArea.className = `message ${type}`; // Añade un estilo dependiendo de la solicitud 'success' o 'error'
    messageArea.style.display = 'block';
    setTimeout(() => {
        messageArea.style.display = 'none';
        messageArea.textContent = '';
    }, durationMessage); 
}

// --- Función para obtener y mostrar todos los libros ---
async function fetchBooks() {
    try {
        bookList.innerHTML = '<li>Cargando libros...</li>'; 
        const response = await fetch(`${BASE_URL}/books`);

        if (!response.ok) {
            // Si la respuesta no es OK (ej. 404, 500), lanza un error
            const errorData = await response.json();
            throw new Error(errorData.message || `Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        const books = data.books; // El array de libros está dentro de la propiedad 'books'

        bookList.innerHTML = ''; // Limpia la lista antes de añadir los nuevos
        if (books.length === 0) {
            bookList.innerHTML = '<li>No hay libros registrados aún.</li>';
        } else {
            books.forEach(book => {
                const li = document.createElement('li');
                li.innerHTML = `<span>${book.name} (ID: ${book.id})</span>`;
                bookList.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Error al obtener los libros:', error);
        bookList.innerHTML = `<li>Error al cargar los libros: ${error.message}</li>`;
        showMessage(`Error: ${error.message}`, 'error');
    }
}

// --- Función para enviar un nuevo libro al backend ---
async function addBook(name) {
    try {
        const response = await fetch(`${BASE_URL}/books`, {
            method: 'POST', // Método HTTP POST
            headers: {
                'Content-Type': 'application/json' // Indicamos que el cuerpo es JSON
            },
            body: JSON.stringify({ name: name }) // Convertimos el objeto a cadena JSON
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log('Libro guardado:', data.book);
        showMessage('Libro guardado exitosamente!', 'success');
        bookNameInput.value = ''; // Limpia el input del formulario
        fetchBooks(); // Vuelve a cargar la lista para mostrar el nuevo libro
    } catch (error) {
        console.error('Error al guardar el libro:', error);
        showMessage(`Error al guardar el libro: ${error.message}`, 'error');
    }
}

// --- Event Listeners ---
// Cuando se envía el formulario
bookForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que la página se recargue
    const bookName = bookNameInput.value.trim(); // Obtiene el valor y elimina espacios en blanco

    if (bookName) {
        addBook(bookName);
    } else {
        showMessage('Por favor, ingresa el nombre del libro.', 'error');
    }
});

// Cargar los libros cuando la página se carga por primera vez
document.addEventListener('DOMContentLoaded', fetchBooks);