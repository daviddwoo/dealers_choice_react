const express = require('express');
const { syncAndSeed, models: {Country, Food} } = require('./db');
const app = express();
const path = require('path');
const cors = require('cors');

app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(cors());
app.use(express.json());
app.use(require('method-override')('_method')); 
app.use(express.urlencoded({ extended: true })); 

app.get('/api/foods', async(req, res, next) => {
    try {
        const foods = await Food.findAll({
            include: [Country]
        });
        res.send(foods);
    }
    catch(ex) {
        next(ex);
    }
});

app.get('/api/foods/:id', async(req, res, next) => {
    try {
        const food = await Food.findByPk(req.params.id, {
            include: [Country]
        });
        res.send(food);
    }
    catch(ex) {
        next(ex);
    }
});

app.post('/api/foods', async(req, res, next) => {
    try {
        res.send(await Food.create(req.body))
    }
    catch(ex) {
        next(ex);
    }
});

app.delete('/api/foods/:id', async(req, res, next) => {
    try {
        const food = await Food.findByPk(req.params.id);
        await food.destroy();

        const foods = await Food.findAll({
            include: [Country]
        });
        res.send(foods);
    }
    catch(ex) {
        next(ex);
    }
});


app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'src', 'index.html'))
});


const init = async() => {
    try {
        await syncAndSeed();
        const PORT = 3000;
        app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
    }
    catch(ex) {
        console.log(ex);
    }
};

init();