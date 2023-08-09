import pool from "../configs/connectDB"
import multer from 'multer';

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

let getUploadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs')
}


const upload = multer().single('profile_pic');

let hendleUploadFile = async (req, res) => {
    upload(req, res, function (err) {

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });
}

let handleUploadMultipleFlile = async (req, res) => {

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }
    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);
}
module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, getEditUser, postUpdateUser,
    getUploadFilePage, hendleUploadFile, handleUploadMultipleFlile
}