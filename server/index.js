const express = require('express');
const cors = require('cors');
const db = require('./database')

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {{
    res.json({status : 'Ok'})
}})

app.get('/models' , (req , res) => {
    const models = db.prepare('SELECT * FROM models').all();
    res.json(models);
})

app.listen(3001, () => console.log('Server running on port 3001'));