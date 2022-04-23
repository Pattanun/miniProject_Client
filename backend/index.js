const express = require('express'),
    app = express(),
    passport = require('passport'),
    port = process.env.PORT || 80,
    cors = require('cors'),
    cookie = require('cookie')

const bcrypt = require('bcrypt')

const db = require('./database.js')
let users = db.users

let Yans = {
    list:
        [
            { id: "001", name: 'ยันต์ฉัตรเพชร', detail: 'โดดเด่นด้านโชคลาภการเงิน แก้ดวงชะตาที่ตกต่ำ และเสริมดวงชะตา เหมาะสำหรับผู้ที่ทำงานห้างร้าน ค้าขาย บริษัท มีบริวาร (ลูกน้อง) เยอะ ควบคุมอยู่', price: "4500 ฿" },
            { id: "002", name: 'ยันต์ห้าแถว', detail: 'ยันต์ หนุนดวง หรือ ยันต์โภค ทรัพย์ 5 แถว ความหมาย ความเชื่อ เป็นอักขระขอมโบราณ 5 แถว ความยาว 7 นิ้ว กว้าง 2 นิ้วครึ่ง', price: "3500 ฿" },
            { id: "003", name: 'ยันต์เก้ายอด', detail: 'ยันต์เก้ายอด ความหมาย ความเชื่อ ของยันต์หมายถึงคุณวิเศษของพระพุทธเจ้าทั้ง 9 ประการ ซึ่งแสดงให้เห็นในรูปของยอดแหลมทั้ง 9 ยอด ลายสักยันต์นี้ดีในการป้องกันศาสตราวุธทั้งหลาย ยันต์มหาศิริมงคล ยันต์มหาศิริมงคล', price: "4500 ฿" },
        ]
}

require('./passport.js')

const router = require('express').Router(),
    jwt = require('jsonwebtoken')

app.use('/api', router)
router.use(cors({ origin: 'http://localhost:3000', credentials: true }))
// router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))


//ฟังก์ชั่นใหม่
//Yan
router.route('/Yans')
    .get((req, res) => res.json(Yans))
    .post((req, res) => {
        console.log(req.body)
        let newYan = {}
        newYan.id = (Yans.list.length) ? Yans.list[Yans.list.length-1].id+1 : 1
        newYan.name = req.body.name
        newYan.detail = req.body.detail
        newYan.price  = req.body.price
        Yans = { list: [...Yans.list, newYan] }
        res.json(Yans)
    })

router.route('/Yans/:yan_id') //params
    .get((req, res) => {
        let id = Yans.list.findIndex((item) => (+item.id === +req.params.yan_id))
        
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            res.json(Yans.list[id])
        }
        

    })
    .put((req, res) => {
        let id = Yans.list.findIndex((item) => (+item.id === +req.params.yan_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            Yans.list[id].name = req.body.name
            Yans.list[id].detail = req.body.detail
            Yans.list[id].price = req.body.price
            res.json(Yans)
        }


    })
    .delete((req, res) => {
       
        let id = Yans.list.findIndex((item) => (+item.id === +req.params.yan_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            Yans.list = Yans.list.filter((item) => +item.id !== +req.params.yan_id)
            res.json(Yans)
        }
    })






    let BuyYans = {
        list:
            [
                { id: "001", name: 'ยันต์ฉัตรเพชร', detail: 'โดดเด่นด้านโชคลาภการเงิน แก้ดวงชะตาที่ตกต่ำ และเสริมดวงชะตา เหมาะสำหรับผู้ที่ทำงานห้างร้าน ค้าขาย บริษัท มีบริวาร (ลูกน้อง) เยอะ ควบคุมอยู่', price: "5000" },
    
            ]
    }

    router.route('/BuyYans')
    .get((req, res) => res.json(BuyYans))
    .post((req, res) => {
        console.log(req.body)
        let newYan = {}
        newYan.id = (BuyYans.list.length) ? BuyYans.list[BuyYans.list.length-1].id+1 : 1
        newYan.name = req.body.name
        newYan.detail = req.body.detail
        newYan.price  = req.body.price
        BuyYans = { list: [...BuyYans.list, newYan] }
        res.json(BuyYans)
    })

router.route('/BuyYans/:yan_id')
    .get((req, res) => {
        let id = BuyYans.list.findIndex((item) => (+item.id === +req.params.yan_id))
        
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            res.json(BuyYans.list[id])
        }
        

    })
    .put((req, res) => {
        let id = BuyYans.list.findIndex((item) => (+item.id === +req.params.yan_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            BuyYans.list[id].name = req.body.name
            BuyYans.list[id].detail = req.body.detail
            BuyYans.list[id].price = req.body.price
            res.json(BuyYans)
        }


    })
    .delete((req, res) => {
       
        let id = BuyYans.list.findIndex((item) => (+item.id === +req.params.yan_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            BuyYans.list = BuyYans.list.filter((item) => +item.id !== +req.params.yan_id)
            res.json(BuyYans)
        }
    })


    
router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log('Login: ', req.body, user, err, info)
        if (err) return next(err)
        if (user) {
            const token = jwt.sign(user, db.SECRET, {
                expiresIn: (req.body.rememberme === "on") ?'7d' : '1d'
            })
            // req.cookie.token = token
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: 60 * 60,
                    sameSite: "strict",
                    path: "/",
                })
            );
            res.statusCode = 200
            return res.json({ user, token })
        } else
            return res.status(422).json(info)
    })(req, res, next)
})





router.get('/logout', (req, res) => { 
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: -1,
            sameSite: "strict",
            path: "/",
        })
    );
    res.statusCode = 200
    return res.json({ message: 'Logout successful' })
})

/* GET user profile. */
router.get('/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.send(req.user)
    });

router.get('/foo',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        return res.json({ message: "Foo" })
    });

router.post('/register',
    async (req, res) => {
        try {
            const SALT_ROUND = 10
            const { username, email, password } = req.body 
            if (!username || !email || !password)
                return res.json( {message: "Cannot register with empty string"})
            if (db.checkExistingUser(username) !== db.NOT_FOUND)
                return res.json({ message: "Duplicated user" })

            let id = (users.users.length) ? users.users[users.users.length - 1].id + 1 : 1
            hash = await bcrypt.hash(password, SALT_ROUND)
            users.users.push({ id, username, password: hash, email })
            res.status(200).json({ message: "Register success" })
        } catch {
            res.status(422).json({ message: "Cannot register" })
        }
    })

router.get('/alluser', (req,res) => res.json(db.users.users))

router.get('/', (req, res, next) => {
    res.send('Respond without authentication');
});


// Error Handler
app.use((err, req, res, next) => {
    let statusCode = err.status || 500
    res.status(statusCode);
    res.json({
        error: {
            status: statusCode,
            message: err.message,
        }
    });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))

