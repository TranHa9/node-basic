import pool from "../configs/connectDB"

let getHomepage = async (req, res) => {

    // let data = [];
    // connection.query(
    //     'SELECT * FROM `users`',
    //     function (err, results, fields) {
    //         data = results.map((row) => {
    //             return (row)
    //         })
    //         return res.render('index.ejs', { dataUser: data })
    //     });
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.render('index.ejs', { dataUser: rows })
}
let getDetailPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute(`select * from users where id = ?`, [id])
    res.send(JSON.stringify(user))
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    await pool.execute(`insert into users (firstName, lastName, email,address) values(?,?,?,?)`, [firstName, lastName, email, address])
    return res.redirect('/')
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute(`delete from users where id = ?`, [userId])
    return res.redirect('/')
}
let getEditUser = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute(`select * from users where id = ?`, [id])
    return res.render('update.ejs', { dataUser: user[0] })
}
let postUpdateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    await pool.execute(`UPDATE users SET firstName = ?, lastName = ?, email = ?, address =? WHERE id=?;`,
        [firstName, lastName, email, address, id])
    return res.redirect('/')
}
module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, getEditUser, postUpdateUser
}