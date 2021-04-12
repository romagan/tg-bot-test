const {Router} = require('express');
const router = new Router();
const {check, validationResult} = require('express-validator');
const User = require('../model/User');
const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');

const TOKEN = `1772338192:AAG3-0_7OabOyhsBvZrWZUgz64LBqdGAwS8`;

const bot = new TelegramBot(TOKEN, {
    polling: true
});

bot.onText(/\/search/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Enter users ID');

    bot.on('message', async (msg) => {
        console.log(msg)
        try {
            const findedUser = await User.findById(msg.text);

            bot.sendMessage(msg.chat.id, 'Choose data:', {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: 'Name',
                            callback_data: findedUser.name
                        }], [{
                            text: 'Email',
                            callback_data: findedUser.email
                        }], [{
                            text: 'Phone',
                            callback_data: findedUser.phone
                        }],
                    ]
                }
            });

            bot.on('callback_query', (query) => {
                bot.sendMessage(msg.chat.id, query.data);
            })
        } catch (e) {
            bot.sendMessage(msg.chat.id, `There are no users`);
        }    
    });
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        console.warn(e);
        res.send({message: `Server error ${e}`});
    }  
});

router.post('/registration',
    [
        check('email', 'Incorrect email').isEmail(),
        check('name', 'Incorrect email').isLength({min: 2}),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty) {
                return res.status(400).json({message: 'Incorrect request', errors});
            }
            
            const { email, name, phone, birth } = req.body;

            const candidate = await User.findOne({email});
            if (candidate) {
                return res.status(400).json({message: 'The email is already exist'});
            }

            const user = new User({email, name, phone, birth});
            await user.save();

            

            return res.json({message: 'The user was created'})
        } catch (e) {
            console.warn(e);
            res.send({message: `Server error ${e}`});
        }   
    }
);

module.exports = router;