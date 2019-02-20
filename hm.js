//import modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');  //import body-parser
const MongoClient = require('mongodb').MongoClient; //import driver mongodb
const ObjectID = require('mongodb').ObjectID; //import objectID
const DBurl = "mongodb://127.0.0.1:27017/"; //url DB -> port mongo : 27017
const DBname = "sekolah";

let dbo = null; //object koneksi database
//koneksi database
MongoClient.connect(DBurl, (error, db) => {
    if (error) throw error;
    dbo = db.db(DBname);
});

app.use(bodyParser.urlencoded({extended: false})) //harus berada di atas semua endpoint


//endpoint get : mengambil data dari database yang telah dibuat sebelumnya
app.get('/siswa', (request, response) => {
    dbo.collection("siswa").find().toArray((err, res) => { //mengambil data dari collection dalam bentuk array
        if(err) throw err;
        response.json(res); //menampilkan data
    })
});

// //endpoint get dengan menggunakan parameter
// app.get('/siswa/:nama', (request, response)=> { // :nama merupakan parameter
//     let namaSiswa = request.params.nama; // deklarasi variabel namaSiswa
//     response.end("menampilkan nama siswa "+ namaSiswa);
// });


//endpoint insert data ke database
app.post('/siswa', (request, response)=>{
    let namaSiswa = request.body.nama;
    let kelasSiswa = request.body.kelas;
    let jurusanSiswa   = request.body.jurusan;
    dbo.collection("siswa").insertOne({
        nama : namaSiswa,
        kelas : kelasSiswa,
        jurusan : jurusanSiswa

        }, (err, res) => {
        if(!err) {
            response.json(res);
            response.end("data berhasil masuk");
        }
        else
        {
            throw err; //apabila error akan dilempar ke nodejs
        }
    })
});

//endpoint delete data dari database
app.delete('/siswa/:id', (request, response)=>{
    let id = request.params.id;
    let id_object = new ObjectID(id);
    dbo.collection("siswa").deleteOne({ //perintah hapus mongodb
        _id : id_object //mengambil id data untuk dihapus
    }, (err, res) => {
        if(err) throw err;
        response.end("data berhasil dihapus");
    })
});

//endpoint update
app.put('/siswa/:id', (request, response)=>{
    let id = request.params.id;
    let id_object = new ObjectID(id);
    let namaSiswa = request.body.nama;
    let kelasSiswa = request.body.kelas;
    let jurusanSiswa = request.body.jurusan;
    dbo.collection("siswa").updateOne({
        _id : id_object     //mengambil data yang akan diedit berdasarkan ID
    }, {$set:{              //proses update data pada database
        nama : namaSiswa,
        kelas: kelasSiswa,
        jurusan : jurusanSiswa
    }},
        (err,res) => {
            if(err) throw err;
            response.end("data berhasl diupdate");
        })
});

app.listen('2227');