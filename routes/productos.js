const express = require('express');
const route = express.Router();

// Datos de ejemplo (simulacion base de datos)

let productos = [
    { id: 1, nombre: "producto1", precio: 10.99 },
    { id: 2, nombre: "producto2", precio: 19.99 },
    { id: 3, nombre: "producto3", precio: 5.99 },
];

route.get("/", (req, res, next) => {
    try {
        res.json(productos);
    } catch (err) {
        next(err)
    }
});

// Obtener producto por ID 
route.get("/:id", (req, res, next) => {

    try {
        const id = parseInt(req.params.id);
        const producto = productos.find((p) => p.id === id);

        if (!producto) {
            const error = new Error('producto no encontrado');
            error.status = 404;
            throw error;
        }
        res.json(producto);
    } catch (err) {
        next(err);
    }

});

// Crear un nuevo producto 
route.post("/", (req, res, next) => {
    try {
        const { nombre, precio } = req.body;

        const nuevoProducto = {
            id: productos.length + 1,
            nombre,
            precio,
        };

        productos.push(nuevoProducto);
        res.status(201).json(nuevoProducto);
    } catch (err) {
        next(err);
    }
});

// Actualizar un nuevo producto 
route.put("/:id", (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { nombre, precio } = req.body;

        const producto = productos.find((p) => p.id === id);

        if (!producto) {
            const error = new Error("producto no encontrado");
            error.status = 404;
            throw error;
        }
        producto.nombre = nombre || producto.nombre;
        producto.precio = precio || producto.precio;

        res.json(producto);
    } catch (err) {
        next(err);
    }

});

// Eliminar un producto
route.delete('/:id', (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const index = productos.findIndex((p) => p.id === id);

        if (index === -1) {
            const error = new error("Producto no encontrado");
            error.status = 404;
            throw error;
        }
        const productoEliminado = productos.splice(index, 1);
        res.json(productoEliminado[0]);
    } catch (err) {
        next(err);
    }

});

module.exports = route;