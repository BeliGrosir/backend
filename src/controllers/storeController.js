const db = require("../models");
const Store = db.store;

const createStore = (req, res) => {
    const store = {
        store_name: req.body.store_name,
        store_location: req.body.store_location,
        store_image: req.file.filename
    }

    Store.create(store)
        .then(data => {
            res.send({
                status: "Success",
                message: "Create store successful"
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Error occurred while creating store"
            });
    });
}

const deleteStore = (req, res) => {
    Store.destroy({
        where: {
            store_id: req.query.store_id
        }
    }).then(data => {
            res.send({
                status: "Success",
                message: "Delete store successful"
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Error occurred while deleting store"
            });
    });
}

module.exports = {
    createStore,
    deleteStore
}