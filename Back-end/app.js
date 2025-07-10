const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Importa el módulo File System de Node.js
const path = require('path'); // Importa el módulo Path para manejar rutas de archivos

const app = express();
const PORT = process.env.PORT || 3000;

// --- Configuración de persistencia ---
const BOOKS_FILE = path.join(__dirname, 'books.txt'); // Ruta al archivo de texto
let books = []; // Array que contendrá nuestros libros en memoria
let nextId = 1; // Para asignar IDs únicos


function loadBooks() {
    try {
        if (fs.existsSync(BOOKS_FILE)) { 
            const data = fs.readFileSync(BOOKS_FILE, 'utf8'); 
            if (data) {
                // Cada línea es un libro, parseamos como JSON
                const loadedBooks = data.split('\n')
                                        .filter(line => line.trim() !== '') 
                                        .map(line => JSON.parse(line));
                books = loadedBooks;
                if (books.length > 0) {
                    const maxId = Math.max(...books.map(book => book.id));
                    nextId = maxId + 1;
                }
                console.log('Libros cargados desde', BOOKS_FILE);
            } else {
                console.log('El archivo de libros está vacío.');
            }
        } else {
            console.log('El archivo de libros no existe, se creará uno nuevo al guardar.');
            fs.writeFileSync(BOOKS_FILE, '', 'utf8'); 
        }
    } catch (error) {
        console.error('Error al cargar los libros:', error);
        books = []; 
        nextId = 1;
    }
}

// --- Función para guardar libros en el archivo ---
function saveBooks() {
    try {
        const data = books.map(book => JSON.stringify(book)).join('\n');
        fs.writeFileSync(BOOKS_FILE, data, 'utf8'); 
        console.log('Libros guardados en', BOOKS_FILE);
    } catch (error) {
        console.error('Error al guardar los libros:', error);
    }
}

// --- Cargar los libros al iniciar el servidor ---
loadBooks();


app.use(cors());
app.use(express.json());

// --- Endpoint POST para guardar un libro ---
app.post('/books', (req, res) => {
    const { name } = req.body;
    // Validación básica
    if (!name) {
        return res.status(400).json({ message: 'El nombre del libro es requerido.' });
    }
    // Crea el objeto libro
    const newBook = {
        id: nextId++,
        name: name
    };
    // Guarda el libro en nuestro "almacén" en memoria
    books.push(newBook);

    // --- ¡Persistencia! Guarda los libros en el archivo después de añadir uno nuevo ---
    saveBooks();

    // Responde con el libro creado y un estado 201 (Created)
    res.status(201).json({
        message: 'Libro guardado exitosamente',
        book: newBook
    });
});

// --- Endpoint GET para obtener todos los libros ---
app.get('/books', (req, res) => {
    // Los libros ya están cargados en la variable 'books' por loadBooks()
    res.status(200).json({
        message: 'Lista de libros obtenida exitosamente',
        books: books
    });
});

// --- Iniciar el servidor ---
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
    console.log('Endpoints disponibles:');
    console.log(`  POST /books para guardar un libro`);
    console.log(`  GET /books para obtener todos los libros`);
});