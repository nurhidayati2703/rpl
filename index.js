//create server
const express = require('express'); //import module express
const app = express(); //eksekusi module express
const bodyParser = require('body-Parser'); 


//  //harus berada diatas semua endpoint
app.use(bodyParser.urlencoded({extended: false})) //harus berada diatas semua endpoint

//endpoint get dengan menggunakan parameter
app.get('/siswa/:nama', (request, response)=>{ //:nama merupakan parameter
    let namaSiswa= request.params.nama; //deklarasi variabel namaSiswa
    response.end('Menampilkan nama siswa'+namaSiswa);
});

//endpoint post, dengan menggunakan body-Parser untuk mengirimkan data
app.post('/siswa', (request, response)=>{
    let namaSiswa = request.body.name;
    let alamat = request.body.address;
    response.end('Menampilkan siswa baru '+namaSiswa + ', yang beralamat di '+alamat);
});

//endpoint delete, data yang diakses secara spesifik dengan menggunakan parameter
app.delete('/siswa/:id', (request, response)=>{
    let id =request.params.id;
    let namaSiswa = request.body.name;
    response.end('id'+ id + 'Telah dihapus, dengan nama: '+ namaSiswa);
});

//endpoint update
app.put('/siswa/:id', (request, response)=>{
    let id =request.params.id;
    let namaSiswa = request.body.name;
    response.end('siswa dengan id: ' +id+'telah diupdate');
});

// //eksekusi express dengan memanggil variable app
// app.get('/test', function(req, res){ //simbol / yang berarti "root" atau halaman utama, function req(request) dan res(respone)
//     res.send("abcdefg") //mengirimkan response dari http dan dikembalikan
// })

app.listen('7777'); //definisi halaman port

