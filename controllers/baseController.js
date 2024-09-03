import DB from '../db/DB.js';

class BaseController {
    constructor(tableName) {
        this.db = new DB(`${tableName}.db`);
    }

    async getAll(req, res) {
        try {
            const docs = await this.db.find({});
            res.send(docs);
        } catch (err) {
            res.status(500).send({ error: 'Failed to fetch data', details: err });
        }
    }

    async create(req, res) {
        try {
            const newDoc = await this.db.insert(req.body);
            res.status(201).send(newDoc);
        } catch (err) {
            res.status(500).send({ error: 'Failed to create data', details: err });
        }
    }

    async getById(req, res) {
        try {
            const doc = await this.db.findOne({ _id: req.params.id });
            if (!doc) return res.status(404).send({ error: 'Not found' });
            res.send(doc);
        } catch (err) {
            res.status(500).send({ error: 'Failed to fetch data', details: err });
        }
    }

    async update(req, res) {
        try {
            const numReplaced = await this.db.update({ _id: req.params.id }, req.body);
            if (numReplaced === 0) return res.status(404).send({ error: 'Not found' });
            res.send({ message: 'Updated' });
        } catch (err) {
            res.status(500).send({ error: 'Failed to update data', details: err });
        }
    }

    async delete(req, res) {
        try {
            const numRemoved = await this.db.remove({ _id: req.params.id });
            if (numRemoved === 0) return res.status(404).send({ error: 'Not found' });
            res.send({ message: 'Deleted' });
        } catch (err) {
            res.status(500).send({ error: 'Failed to delete data', details: err });
        }
    }
}

export default BaseController;
