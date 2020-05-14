const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();

app.set('trust proxy', true);
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const pool = new Pool({
    connectionString: 'postgres://rtxwjqapjpqmkq:14e52066d64b65c9c8e3d6e5bd4d61777e925bef9a8960db0029b709c55faa8f@ec2-52-201-55-4.compute-1.amazonaws.com:5432/d12jd6ntoi9gau',
    ssl: { rejectUnauthorized: false }
})


app.get('/', async function (req, res, next) {
    ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.render('index', {ip: ip});
})

app.post('/saveuser', async (req, res, next) =>{
    query = 'INSERT INTO users (username, valami1, valami2, valami3) VALUES ($1, $2, $3, $4)';

    try {
        await pool.query(query,[req.body.username, req.body.valami1, req.body.valami2, req.body.valami3]);
        console.log('success');
        res.redirect('/')
    } catch (error) {
        next(error)
    }
})



// error handling
app.use(function (error, req, res, next) {
    res.locals.error = error;

    if (req.originalUrl == '/') {
        res.render('error')
    } else {
        res.render(req.url.slice(1))
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Az alkamazas fut port:  ${process.env.PORT}`)
});
