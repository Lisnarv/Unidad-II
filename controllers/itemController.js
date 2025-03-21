const Item = require('../models/item');

class ItemController {
  static getAll() {
    return new Promise((resolve, reject) => {
      Item.find({}, (err, items) => {
        if (err) return reject(err);
        resolve(items);
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      Item.findById(id, (err, item) => {
        if (err) return reject(err);
        resolve(item);
      });
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      const newItem = new Item(data);
      newItem.save((err, savedItem) => {
        if (err) return reject(err);
        resolve(savedItem);
      });
    });
  }

  static update(id, data) {
    return new Promise((resolve, reject) => {
      Item.findByIdAndUpdate(id, data, { new: true }, (err, updatedItem) => {
        if (err) return reject(err);
        resolve(updatedItem);
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      Item.findByIdAndDelete(id, (err, deletedItem) => {
        if (err) return reject(err);
        resolve(deletedItem);
      });
    });
  }
}

module.exports = ItemController;
