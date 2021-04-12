const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const URL = `mongodb+srv://admin:qazwsxZX123@cluster0.ob35d.mongodb.net/myFirstDatabase?retryWrites=true&w=1`;

const app = express();
const router = require('./routes/');

app.use(express.json());
app.use(cors());
app.use(express.static('./public'));
app.use(router);

const port = process.env.PORT || 8080;
process.env.NTBA_FIX_319 = 1;

const start = async () => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(port, () => console.log(`Server started on port ${port}`));

    } catch (e) {
        console.warn(e);
    }
}

start();