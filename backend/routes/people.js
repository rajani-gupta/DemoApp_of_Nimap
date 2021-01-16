const express = require("express");
const router = express.Router();
const mysqlConnection = require("./../connection");

router.get('/profile', (req, res) => {
    let query = `select * from register `
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
})

router.get('/profile/:id', (req, res) => {
    let query = `select * from register where id="${req.params.id}"`
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send(rows[0])
            console.log('this is the rows:', rows)
        } else {
            console.log(err);
        }
    })
})

router.post('/register', (req, res) => {
    console.log('this is the req::', req.body)
    console.log('this is the req files::', req.files)
    let path = ""
    for (let file in req.files) {
        path = '/images/' + new Date().getTime();
        req.files[file].mv(__dirname + path, (err) => {
            if (err) {
                console.log('this is the eror::', err)
            }
        })
    }
    let query = `insert into register(first_name,last_name,email,contact,age,state,country,address,
                address1,address2,tags,is_checked,profile_pick_path) values("${req.body.first_name}","${req.body.last_name}","${req.body.email}",
                "${req.body.contact}","${req.body.age}","${req.body.state}","${req.body.country}","${req.body.address}",
                "${req.body.address1}","${req.body.address2}","${req.body.tags}","${req.body.isChecked ? 1 : 0}","${path}")`
    //jwt verify
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
})


// router.put('/todo', (req, res) => {
//     jwt.verify(req.headers.authorization.replace('Bearer ', ''), SECRET_KEY, function (err, decoded) {
//         if (!err) {
//             let query = `update to_do set name='${req.body.name}',discription='${req.body.discription}' where id='${req.body.id}'`
//             mysqlConnection.query(query, (err, rows, fields) => {
//                 if (!err) {
//                     res.send(rows)
//                 } else {
//                     console.log(err);
//                 }
//             })
//         } else {
//             res.status(400).send('token is expired');
//         }
//     });
// })
module.exports = router;