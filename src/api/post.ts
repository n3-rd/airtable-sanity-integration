/* eslint-disable @typescript-eslint/indent */
import Airtable from 'airtable';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();


const router = express.Router();
const apiKey = process.env.AIRTABLE_API_KEY || '';
const baseId = process.env.AIRTABLE_BASE_ID || '';
//@ts-ignore
var base = new Airtable({ apiKey, baseId }).base(baseId);

router.get('/', (req, res) => {
    res.json({ message: 'Hello, world!' });
});

router.post('/', (req, res) => {
    let title: string = req.body.title;
    let name: string = req.body.name;
    let postLink: string = req.body.postLink;
    base('posts').create([
        {
            'fields': {
                'Name': name.slice(0, 20),
                'title': title,
                'post link': postLink,
            },
        },
    ], function (err, records) {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error creating record', error: err });
            return;
        } else if (records) {
            records.forEach(function (record) {
                console.log(record.getId());
                res.status(200).json({ message: 'Record created', recordId: record.getId() });
            });
        }
    });

});

export default router;