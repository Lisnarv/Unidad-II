const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/itemController');

// GET /items - Obtener todos los items
router.get('/', (req, res) => {
  ItemController.getAll()
    .then(items => res.json(items))
    .catch(err => res.status(500).json({ error: err.message }));
});

// GET /items/:id - Obtener un item por ID
router.get('/:id', (req, res) => {
  ItemController.getById(req.params.id)
    .then(item => {
      if (!item) return res.status(404).json({ error: 'Item no encontrado' });
      res.json(item);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// POST /items - Crear un nuevo item
router.post('/', (req, res) => {
  ItemController.create(req.body)
    .then(createdItem => res.status(201).json(createdItem))
    .catch(err => res.status(500).json({ error: err.message }));
});

// PUT /items/:id - Actualizar un item existente
router.put('/:id', (req, res) => {
  ItemController.update(req.params.id, req.body)
    .then(updatedItem => {
      if (!updatedItem) return res.status(404).json({ error: 'Item no encontrado' });
      res.json(updatedItem);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// DELETE /items/:id - Eliminar un item
router.delete('/:id', (req, res) => {
  ItemController.delete(req.params.id)
    .then(deletedItem => {
      if (!deletedItem) return res.status(404).json({ error: 'Item no encontrado' });
      res.json({ message: 'Item eliminado', item: deletedItem });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Endpoints adicionales 

// GET /items/search/:text - Buscar items por nombre
router.get('/search/:text', (req, res) => {
  const searchText = req.params.text.toLowerCase();
  ItemController.getAll()
    .then(items => {
      const filtered = items.filter(item =>
        item.name.toLowerCase().includes(searchText)
      );
      res.json(filtered);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// GET /items/count/all - Contar total de items
router.get('/count/all', (req, res) => {
  ItemController.getAll()
    .then(items => res.json({ count: items.length }))
    .catch(err => res.status(500).json({ error: err.message }));
});

// GET /items/top/expensive - Obtener los 5 items con mayor precio
router.get('/top/expensive', (req, res) => {
    Item.find({})
      .sort({ price: -1 }) // Ordena de mayor a menor precio
      .limit(5)            // Limita el resultado a 5 items
      .then(items => res.json(items))
      .catch(err => res.status(500).json({ error: err.message }));
  });
  

module.exports = router;
