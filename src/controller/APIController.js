import pool from "../configs/connectDB";

let getAllUsers = async (req, res) => {
    //status: trạng thái connect
    //200: kết nối thành công
    //404: không tìm thấy tài nguyên
    //500-501: sập sevrer
    //json/xml
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.status(200).json({
        message: 'ok',
        data: { rows }
    })
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    if (!firstName || !lastName || !email || !address) {
        return res.status(200).json({
            message: 'miss'
        })
    }
    await pool.execute(`insert into users (firstName, lastName, email,address) values(?,?,?,?)`, [firstName, lastName, email, address])

    return res.status(200).json({
        message: 'ok'
    })
}

let updateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;

    await pool.execute(`UPDATE users SET firstName = ?, lastName = ?, email = ?, address =? WHERE id=?;`,
        [firstName, lastName, email, address, id])
    return res.status(200).json({
        message: 'ok'
    })
}
let deleteUser = async (req, res) => {
    let userId = req.params.id;
    if (!userId) {
        return res.status(200).json({
            message: 'miss'
        })
    }
    await pool.execute(`delete from users where id = ?`, [userId])
    return res.status(200).json({
        message: 'ok'
    })
}
module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
}