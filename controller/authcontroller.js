import multer from 'multer';
import db from '../utils/database.js';
import { encrypt } from '../utils/encrypt.js';

export default {
  // post
  async register(req, res) {
    const { role } = req.body;

    if (role === 'mahasiswa') {
      const {
        name,
        role,
        birthFormatted,
        gender,
        adress,
        jurusan,
        email,
        nim,
        password,
        confirmPassword,
      } = req.body;
      const [nimCheck] = await db.query(
        `SELECT * FROM mahasiswa WHERE nim = ?`,
        [nim]
      );
      const [nipCheck] = await db.query(`SELECT * FROM dosen WHERE nip = ?`, [
        nim,
      ]);

      const [emailCheck] = await db.query(
        `SELECT * FROM mahasiswa WHERE email = ?`,
        [email]
      );
      const [emailCheck2] = await db.query(
        `SELECT * FROM dosen WHERE email = ?`,
        [email]
      );
      const [emailCheck3] = await db.query(
        `SELECT * FROM perusahaan WHERE email = ?`,
        [email]
      );
      const [emailCheck4] = await db.query(
        `SELECT * FROM supervisor WHERE email = ?`,
        [email]
      );

      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'password tidak sama' });
      }
      if (nimCheck.length !== 0 || nipCheck.length !== 0) {
        return res.status(401).json({ message: 'pengguna telah terdaftar' });
      }

      if (
        emailCheck.length !== 0 ||
        emailCheck2.length !== 0 ||
        emailCheck3.length !== 0 ||
        emailCheck4.length !== 0
      ) {
        return res.status(401).json({ message: 'email telah terdaftar' });
      }

      const encryptPass = encrypt(password);
      const sql = `INSERT INTO \`mahasiswa\` (name, birth, gender, jurusan, email, nim, adress, role, password) VALUES (?,?,?,?,?,?,?,?,?)`;
      const [result] = await db.query(sql, [
        name,
        birthFormatted,
        gender,
        jurusan,
        email,
        nim,
        adress,
        role,
        encryptPass,
      ]);

      await db.execute('INSERT INTO penilaian (nim) values (?)',[nim])

      const user = result[0];

      res.status(200).json({ message: 'berhasil mendaftarkan akun', user });
    }

    if (role === 'dosen') {
      const { name, role, adress, email, nip, password, confirmPassword } =
        req.body;
      const [nimCheck] = await db.query(
        `SELECT * FROM mahasiswa WHERE nim = ?`,
        [nip]
      );
      const [nipCheck] = await db.query(`SELECT * FROM dosen WHERE nip = ?`, [
        nip,
      ]);

      const [emailCheck] = await db.query(
        `SELECT * FROM mahasiswa WHERE email = ?`,
        [email]
      );
      const [emailCheck2] = await db.query(
        `SELECT * FROM dosen WHERE email = ?`,
        [email]
      );
      const [emailCheck3] = await db.query(
        `SELECT * FROM perusahaan WHERE email = ?`,
        [email]
      );
      const [emailCheck4] = await db.query(
        `SELECT * FROM supervisor WHERE email = ?`,
        [email]
      );

      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'password tidak sama' });
      }
      if (nimCheck.length !== 0 || nipCheck.length !== 0) {
        return res.status(401).json({ message: 'pengguna telah terdaftar' });
      }

      if (
        emailCheck.length !== 0 ||
        emailCheck2.length !== 0 ||
        emailCheck3.length !== 0 ||
        emailCheck4.length !== 0
      ) {
        return res.status(401).json({ message: 'email telah terdaftar' });
      }

      const encryptPass = encrypt(password);
      const sql = `INSERT INTO \`dosen\` (nip, email, adress, name, role, password) VALUES (?,?,?,?,?,?)`;
      const [result] = await db.query(sql, [
        nip,
        email,
        adress,
        name,
        role,
        encryptPass,
      ]);

      const user = result[0];

      res.status(200).json({ message: 'berhasil mendaftarkan akun', user });
    }

    if (role === 'perusahaan') {
      const { name, role, adress, email, password, confirmPassword } = req.body;
      const [emailCheck] = await db.query(
        `SELECT * FROM mahasiswa WHERE email = ?`,
        [email]
      );
      const [emailCheck2] = await db.query(
        `SELECT * FROM dosen WHERE email = ?`,
        [email]
      );
      const [emailCheck3] = await db.query(
        `SELECT * FROM perusahaan WHERE email = ?`,
        [email]
      );
      const [emailCheck4] = await db.query(
        `SELECT * FROM supervisor WHERE email = ?`,
        [email]
      );

      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'password tidak sama' });
      }

      if (
        emailCheck.length !== 0 ||
        emailCheck2.length !== 0 ||
        emailCheck3.length !== 0 ||
        emailCheck4.length !== 0
      ) {
        return res.status(401).json({ message: 'email telah terdaftar' });
      }

      const [checkName] = await db.execute('SELECT * FROM perusahaan where name = ?', [name])
      if(checkName.length !==0) return res.status(401).json({message:'Nama perusahaan telah ada'})

      const encryptPass = encrypt(password);
      const sql = `INSERT INTO \`perusahaan\` (name, adress, email, role, password) VALUES (?,?,?,?,?)`;
      const [result] = await db.query(sql, [
        name,
        adress,
        email,
        role,
        encryptPass,
      ]);

      const user = result[0];

      res.status(200).json({ message: 'berhasil mendaftarkan akun', user });
    }

    if (role === 'supervisor') {
      const { name, role, perusahaan, email, password, confirmPassword } =
        req.body;

      const [emailCheck] = await db.query(
        `SELECT * FROM mahasiswa WHERE email = ?`,
        [email]
      );
      const [emailCheck2] = await db.query(
        `SELECT * FROM dosen WHERE email = ?`,
        [email]
      );
      const [emailCheck3] = await db.query(
        `SELECT * FROM perusahaan WHERE email = ?`,
        [email]
      );
      const [emailCheck4] = await db.query(
        `SELECT * FROM supervisor WHERE email = ?`,
        [email]
      );

      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'password tidak sama' });
      }

      if (
        emailCheck.length !== 0 ||
        emailCheck2.length !== 0 ||
        emailCheck3.length !== 0 ||
        emailCheck4.length !== 0
      ) {
        return res.status(401).json({ message: 'email telah terdaftar' });
      }

      const encryptPass = encrypt(password);
      const sql = `INSERT INTO \`supervisor\` (name, email, perusahaan, role, password) VALUES (?,?,?,?,?)`;
      const [result] = await db.query(sql, [
        name,
        email,
        perusahaan,
        role,
        encryptPass,
      ]);

      const user = result[0];

      res.status(200).json({ message: 'berhasil mendaftarkan akun', user });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    const encryptPass = encrypt(password);


    if (!email || !password) {
      return res.status(401).json('masukkan email dan password');
    }

    // mahasiswa
    const sql = `SELECT name, email, password, role FROM mahasiswa WHERE email = ?`;
    const [mahasiswa] = await db.query(sql, [email]);
    if (mahasiswa.length !== 0) {
      const user = mahasiswa[0];
      if (encryptPass !== user.password) {
        return res.status(401).json({ message: 'password salah' });
      }
      return res.status(200).json({ message: 'login berhasil', data: user });
    }

    // dosen
    const sql2 = `SELECT name, email, password, role FROM dosen WHERE email = ?`;
    const [dosen] = await db.query(sql2, [email]);
    if (dosen.length !== 0) {
      const user = dosen[0];
      if (encryptPass !== user.password) {
        return res.status(401).json({ message: 'password salah' });
      }
      return res.status(200).json({ message: 'login berhasil', data: user });
    }

    // perusahaan
    const sql3 = `SELECT name, email, password, role FROM perusahaan WHERE email = ?`;
    const [perusahaan] = await db.query(sql3, [email]);
    if (perusahaan.length !== 0) {
      const user = perusahaan[0];
      if (encryptPass !== user.password) {
        return res.status(401).json({ message: 'password salah' });
      }
      return res.status(200).json({ message: 'login berhasil', data: user });
    }

    // supervisor
    const sql4 = `SELECT name, email, password, role FROM supervisor WHERE email = ?`;
    const [supervisor] = await db.query(sql4, [email]);
    if (supervisor.length !== 0) {
      const user = supervisor[0];
      if (encryptPass !== user.password) {
        return res.status(401).json({ message: 'password salah' });
      }
      return res.status(200).json({ message: 'login berhasil', data: user });
    }

    // admin
    const sql5 = `SELECT name, email, password, role FROM admin WHERE email = ?`;
    const [admin] = await db.query(sql5, [email]);
    if (admin.length !== 0) {
      const user = admin[0];
      if (encryptPass !== user.password) {
        return res.status(401).json({ message: 'password salah' });
      }
      return res.status(200).json({ message: 'login berhasil', data: user });
    }

    return res.status(401).json({ message: 'user tidak ditemukan' });
  },

  async upPhoto(req, res) {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const {email, role} = req.body;
    const { buffer } = req.file;
    

    if (!email) {
      return res.status(400).json({ error: 'Missing email in request body' });
    }

    const sql = `UPDATE ${role} SET photo = ? WHERE email = ?`
    const [result] = await db.execute(sql, [buffer, email])
    if(result.length === 0){
      return res.status(401).json({message:'foto gagal diupload'})
    }

    return res.status(200).json({message:'sukses mengganti foto', result})

  },

  async bimbingan(req, res) {
    const { nim, nip } = req.body;

    const [nimConfig] = await db.query(
      `SELECT * FROM bimbingan WHERE nim = ?`,
      [nim]
    );

    if (nimConfig.length !== 0) {
      return res
        .status(401)
        .json({ message: 'mahasiswa telah mempunyai dosen pembimbing' });
    }

    const [mahasiswaData] = await db.execute(`SELECT name, photo FROM mahasiswa WHERE nim = ?`,[nim])
    const mahasiswa = mahasiswaData[0]
    const mahasiswaName = mahasiswa.name
    const mahasiswaPhoto = mahasiswa.photo
   
    const [dosenData] = await db.execute(`SELECT name, photo FROM dosen WHERE nip = ?`,[nip])
    const dosen = dosenData[0]
    const dosenName = dosen.name
    const dosenPhoto = dosen.photo
    const sql = `INSERT INTO \`bimbingan\` (nip, nim, mahasiswa, dosen, status, mahasiswaPhoto, dosenPhoto ) VALUES (?,?,?,?,?,?,?)`;
    const status = 'Belum Magang'

    const [result] = await db.execute(sql, [nip, nim, mahasiswaName, dosenName, status, mahasiswaPhoto, dosenPhoto ]);

    const bimbingan = result[0];
    res
      .status(200)
      .json({ message: 'berhasil membuat bimbingan', data: bimbingan });
  },

  async Buatlowongan(req,res){
    const {kategori, perusahaan, deskripsi, judul, masaMagang, supervisor, dibutuhkan} = req.body
    const [supervisorPhoto] = await db.execute('SELECT photo from supervisor WHERE email = ? AND perusahaan = ?',[supervisor, perusahaan])
    const supervisorData =  supervisorPhoto[0]
    const photo = supervisorData.photo

    
    const [hasLowongan] = await db.execute(`SELECT * FROM lowongan WHERE supervisor = ?`, [supervisor])
    if(hasLowongan.length !== 0){
    return res.status(401).json({message:'supervisor sudah memiliki lowongan'})
    }

    const sql = `INSERT INTO lowongan (perusahaan, deskripsi, kategori, supervisor, judul, masaMagang, dibutuhkan, diterima, photo, pendaftar) VALUES (?,?,?,?,?,?,?,?,?,?)`
    const [result] = await db.execute(sql, [perusahaan, deskripsi, kategori, supervisor, judul, masaMagang, dibutuhkan, 0, photo, 0])
    const lowongan = result[0] 

    res
   .status(200)
   .json({ message: 'berhasil membuat bimbingan', data: lowongan })
    
    res.status(401).json({message:' supervisor telah memiliki lowongan'})
   

  },

  async postPendaftar(req, res){
    const {pendaftar, nim, supervisor, alasan, birth, adress, jurusan, email} = req.body
    
    const [check] = await db.execute('SELECT * FROM pendaftar WHERE nim = ? AND supervisor = ?',[nim, supervisor])
    if(check.length !== 0){
      return res.status(401).json({message: 'Pendaftaran telah ada'})
    }

    const [bimbingan] = await db.execute('SELECT * FROM bimbingan WHERE nim = ?',[nim])
    if(bimbingan.length === 0) return res.status(401).json({meessage:'Belum mempunyai dosen pembimbing'})

    const [photoMahasiswa] = await db.execute('SELECT photo, magang FROM mahasiswa WHERE nim = ?', [nim])
    const photo = photoMahasiswa[0].photo
    if(photoMahasiswa[0].magang !== null) return res.status(401).json({message:"Telah diterima di suatu lowongan"})

    const [supervisors] = await db.execute('SELECT pendaftar FROM lowongan WHERE supervisor = ?', [supervisor])
    const jumlah = supervisors[0].pendaftar + 1
    await db.execute('UPDATE lowongan SET pendaftar = ? WHERE supervisor = ?', [jumlah, supervisor])
    const {buffer, mimetype} = req.file
    if(mimetype !== 'application/pdf'){
      return res.status(401).json({message: 'Format CV harus Pdf'})
    }

    const [result] = await db.execute(`INSERT INTO pendaftar (pendaftar, nim, supervisor, photo, alasan, cv, birth, adress, jurusan, email, status) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,[pendaftar, nim, supervisor,  photo.photo, alasan, buffer, birth, adress, jurusan, email, 'Menunggu'])


    res.json({message:'berhasil mendaftar lowongan', data:result})
  },

  async postPendaftarNoCV(req, res){
    const {pendaftar, nim, supervisor, alasan, birth, adress, jurusan, email} = req.body
    
    const [check] = await db.execute('SELECT * FROM pendaftar WHERE nim = ? AND supervisor = ?',[nim, supervisor])
    if(check.length !== 0){
      return res.status(401).json({message: 'Pendaftaran telah ada'})
    }

    const [bimbingan] = await db.execute('SELECT * FROM bimbingan WHERE nim = ?',[nim])
    if(bimbingan.length === 0) return res.status(401).json({meessage:'Belum mempunyai dosen pembimbing'})

    const [photoMahasiswa] = await db.execute('SELECT photo, magang FROM mahasiswa WHERE nim = ?', [nim])
    const photo = photoMahasiswa[0].photo
    if(photoMahasiswa[0].magang !== null) return res.status(401).json({message:"Telah diterima di suatu lowongan"})

    const [supervisors] = await db.execute('SELECT pendaftar FROM lowongan WHERE supervisor = ?', [supervisor])
    const jumlah = supervisors[0].pendaftar + 1
    await db.execute('UPDATE lowongan SET pendaftar = ? WHERE supervisor = ?', [jumlah, supervisor])

    const [result] = await db.execute(`INSERT INTO pendaftar (pendaftar, nim, supervisor, photo, alasan, birth, adress, jurusan, email, status) VALUES (?,?,?,?,?,?,?,?,?,?)`,[pendaftar, nim, supervisor, photo.photo, alasan, birth, adress, jurusan, email, 'Menunggu'])


    res.json({message:'berhasil mendaftar lowongan', data:result})
  },

  async terimaPendaftar(req, res){
    const {supervisor, nim} = req.body

    const [supervisorData] = await db.execute('SELECT perusahaan, email FROM supervisor WHERE email = ?',[supervisor])
    const perusahaanName = supervisorData[0].perusahaan
    const supervisorEmail = supervisorData[0].email

    // ubah status magang di bimbingan
    const [bimbingan] = await db.execute('UPDATE bimbingan SET status = ? WHERE nim = ?',['Magang', nim])
    if(bimbingan.length === 0) return res.status(401).json({message:'gagal mengubah status bimbingan'})
    
      // ubah status magang dan supervisor di mahasiswa
    const [mahasiswa] = await db.execute('UPDATE mahasiswa SET magang = ?, supervisor = ? WHERE nim = ?',[perusahaanName, supervisorEmail, nim])
    if(mahasiswa.length === 0) return res.status(401).json({message:'gagal mengubah status mahasiswa'})
    
      // ubah status magang di pendaftar
    const [pendaftar] = await db.execute('UPDATE pendaftar SET status = ? WHERE nim = ? AND supervisor = ?',['Diterima', nim, supervisor])
    if(pendaftar.length === 0) return res.status(401).json({message:'gagal mengubah status mahasiswa'})

    const [lowongan] = await db.execute('SELECT dibutuhkan ,diterima FROM lowongan where supervisor = ?',[supervisor])
    
    const tambahan = lowongan[0].diterima + 1

    const [diterima] = await db.execute('UPDATE lowongan SET diterima = ? WHERE supervisor = ?',[tambahan, supervisor])
    
    if(diterima.length === 0) return res.status(401).json({message: 'gagal menerima peserta'})
    
    res.status(200).json({message:"Berhasil Menerima Peserta"})

  },

  async tolakPendaftar(req, res){
    const {nim, supervisor} = req.body
    const [result] = await db.execute('UPDATE pendaftar SET status = ? WHERE nim = ? AND supervisor = ?', ['Ditolak', nim, supervisor])
    if(result.length === 0) return res.status(401).json({message:'gagal menolak lamaran'})
      res.status(200).json({message:'Berhasil menolak lamaran'})
  },

  async penilaian(req,res){
    const {nim, nilaiSupervisor, nilaiDosen} = req.body
    const [check] = await db.execute('SELECT * FROM penilaian WHERE nim = ?',[nim])
    if(nim === '') return res.status(401).json({message:'Pilih mahasiswa'})
    if(nilaiDosen === null || nilaiSupervisor === null) return res.status(401).json({message:'Masukkan nilai mahasiswa'})

    if(nilaiDosen === undefined){
      if(check[0].nilaiSupervisor !== null) return res.status(401).json({message:'Telah memasukkan nilai'})
      if(nilaiSupervisor > 100) return res.status(401).json({message:'Nilai lebih dari 100'})
      if(nilaiSupervisor <= 0) return res.status(401).json({message:'Nilai kurang dari 1'})
      if(nilaiSupervisor === null) return res.status(401).json({message:'Masukkan Nilai'})
      const [result] = await db.execute('UPDATE penilaian SET nilaiSupervisor = ? WHERE nim = ?',[nilaiSupervisor, nim])
      if(result.length === 0) return res.status(401).json({message:'Gagal memberi nilai'})
      res.status(200).json({message:'Berhasil memberikan nilai'})
    }
    
    if(nilaiSupervisor === undefined){
      if(check[0].nilaiDosen !== null) return res.status(401).json({message:'Telah meamasukkan nilai'})
      if(nilaiDosen > 100) return res.status(401).json({message:'Nilai lebih dari 100'})
      if(nilaiDosen <= 0) return res.status(401).json({message:'Nilai kurang dari 0'})
      if(nilaiDosen === null) return res.status(401).json({message:'Masukkan nilai'})
      const [result] = await db.execute('UPDATE penilaian SET nilaiDosen = ? WHERE nim = ?',[nilaiDosen, nim])
      if(result.length === 0) return res.status(401).json({message:'Gagal memberi nilai'})
      res.status(200).json({message:'Berhasil memberikan nilai'})
    }
  },

  async logBook(req,res){
    const {nim, judul, nip, date, deskripsi} = req.body
    const [check] = await db.execute('SELECT * FROM logbook WHERE nim = ? AND nip = ? AND date = ?',[nim, nip, date])
    if(check.length !== 0) return res.status(401).json({message:'Telah membuat jurnal harian di tanggal yang sama'})
    
    const [check2] = await db.execute('SELECT magang FROM mahasiswa where nim = ?',[nim])
    if(check2[0].magang === null) return res.status(401).json({message:'Belum magang'})

    const [response] = await db.execute(`INSERT INTO logbook (nim, nip, date, deskripsi, judul) VALUES (?,?,?,?,?)`,[nim, nip, date, deskripsi, judul])
    if(response.length === 0) return res.status(401).json({message:'Gagal membuat Logbook'})
    res.status(200).json({message:"Berhasil membuat jurnal harian"})
  },

  // get
  async getMahasiswa(req, res) {
    const [result] = await db.execute('SELECT name,nim FROM mahasiswa');
    res.json({ mahasiswa: result });
  },

  async getMahasiswaStatus(req,res){
    const {nim} = req.query
    const [result] = await db.execute('SELECT magang FROM mahasiswa WHERE nim = ?',[nim]);
    res.json({data: result[0].magang });
  },

  async getDosen(req, res) {
    const [result] = await db.execute('SELECT name,nip FROM dosen');
    res.json({ dosen: result });
  },

  async getBimbingan(req, res){
    const {nim} = req.query
    if(nim !== undefined){
    console.log('check nim',nim)
    const [result] = await db.execute('SELECT * FROM bimbingan WHERE nim = ?',[nim])
    return res.json({bimbingan: result[0]})
    }
    if(nim === undefined){
      const [result] = await db.execute('SELECT * FROM bimbingan')
      return res.json({bimbingan: result})
    }
  },

  async getProfile(req, res) {
    const { email, role } = req.query;
    // mahasiswa
    const sql = `SELECT * FROM ${role} WHERE email = ?`;
    const [result] = await db.execute(sql, [email]);
    const data = result[0]

    if (result.length !== 0 && role==='mahasiswa') {
      const response = {
        user: {
          name: data.name,
          birth: data.birth,
          gender: data.gender,
          jurusan: data.jurusan,
          adress: data.adress,
          nim: data.nim,
          lowongan:data.idLowongan,
          photo:data.photo,
          magang:data.magang,
          supervisor:data.supervisor
        }
      };

      res.status(200).json(response);
    }
    // dosen

    if (result.length !== 0 && role==='dosen') {
      const response = {
        user: {
          name: data.name,
          adress: data.adress,
          nip: data.nip,
          photo: data.photo
        }
      };

      res.status(200).json(response);
    }

    // supervisor
    if (result.length !== 0 && role==='supervisor') {
      const response = {
        user: {
          name: data.name,
          photo: data.photo,
          lowongan:data. lowongan
        }
      };

      res.status(200).json(response);
    }
    // perusahaan, dan admin
    if (result.length !== 0 && role === 'perusahaan') {
      const response = {
        user: {
          name: data.name,
          adress: data.adress,
          photo: data.photo
        }
      };

      res.status(200).json(response);
    }
    if (result.length !== 0 && role === 'admin') {
      const response = {
        user: {
          name: data.name,
          adress: data.adress,
          photo: data.photo
        }
      };

      res.status(200).json(response);
    }

    res.status(401).json({message:"user not found"})

  },

  async getPerusahaan(req, res) {
    const [result] = await db.execute('SELECT name FROM perusahaan');
    res.json({ perusahaan: result });

  },

  async getSupervisor(req, res){
    const {perusahaan} = req.query
    const [result] = await db.execute('SELECT name, email FROM supervisor WHERE perusahaan = ?',[perusahaan]);
    res.json({ data: result });
  },

  async getLowongan(req,res){
    const {perusahaan, supervisor} = req.query
    if(supervisor === undefined){
      const [result] = await db.execute('SELECT * FROM lowongan WHERE perusahaan = ?',[perusahaan]);
      res.json({ data: result })
    }
    if(perusahaan === undefined){
      const [result] = await db.execute('SELECT * FROM lowongan WHERE supervisor = ?',[supervisor]);
      res.json({ data: result })
    }
  },

  async getPendaftar(req, res){
    const {supervisor, nim} = req.query
    if(nim === undefined){
      const [result] = await db.execute('SELECT * FROM pendaftar WHERE supervisor = ? AND status = ?',[supervisor, 'Menunggu']);
      res.json({ data: result })
    }else{
      const [result] = await db.execute('SELECT * FROM pendaftar WHERE supervisor = ? AND nim = ?',[supervisor, nim])
      res.json({ data: result })
    }
  },

  async getCV(req, res){
    const {supervisor, nim} = req.query
    const [result] = await db.execute('SELECT cv, pendaftar FROM pendaftar WHERE supervisor = ? AND nim = ?', [supervisor, nim])
    if(result.length === 0){
      return res.status(200).send(null)
    }
    const file = result[0]
    res.setHeader('Content-Type',"application/pdf")
    res.setHeader('Content-Disposition', `inline; filename="${file.pendaftar}"`)
    res.send(file.cv)
  },

  async getLowonganMahasiswa(req,res){
    const {kategori, masaMagang, perusahaan} = req.query
    const masa = `${masaMagang} Bulan`
    // render 1 identifier
    if(kategori && !masaMagang && !perusahaan){
    const [result] = await db.execute('SELECT * FROM lowongan where kategori = ?', [kategori])
        if(result.length === 0 ){return res.json({message:'Lowongan dengan kategori ini belum ada'})}
    res.json({data:result})
    }

    if(masaMagang && !kategori && !perusahaan){
    const [result] = await db.execute('SELECT * FROM lowongan where masaMagang = ?', [masa])
        if(result.length === 0 ){return res.json({message:'Lowongan dengan kategori ini belum ada'})}
    res.json({data:result})
    }

    if( perusahaan && !kategori && !masaMagang){
    const [result] = await db.execute('SELECT * FROM lowongan where perusahaan = ?', [perusahaan])
        if(result.length === 0 ){return res.json({message:'Lowongan dengan kategori ini belum ada'})}
    res.json({data:result})
    }

    // render 2 identifier

    if(masaMagang && kategori && !perusahaan ){
      const [result] = await db.execute('SELECT * FROM lowongan where masaMagang = ? AND kategori = ?', [masa, kategori])
        if(result.length === 0 ){return res.json({message:'Lowongan dengan kategori ini belum ada'})}
    res.json({data:result})
    }

    if(masaMagang && perusahaan && !kategori ){
      const [result] = await db.execute('SELECT * FROM lowongan where masaMagang = ? AND perusahaan = ?', [masa, perusahaan])
        if(result.length === 0 ){return res.json({message:'Lowongan dengan kategori ini belum ada'})}
    res.json({data:result})
    }

    if(perusahaan && kategori && !masaMagang ){
      const [result] = await db.execute('SELECT * FROM lowongan where perusahaan = ? AND kategori = ?', [perusahaan, kategori])
        if(result.length === 0 ){return res.json({message:'Lowongan dengan kategori ini belum ada'})}
    res.json({data:result})
    }

    // render 3 identifier
    if(perusahaan && kategori && masaMagang){
      const [result] = await db.execute('SELECT * FROM lowongan WHERE perusahaan = ? AND kategori = ? AND masaMagang = ?',[perusahaan, kategori, masa])
      if(result.length === 0 ){return res.json({message:'Lowongan dengan kategori ini belum ada'})}
      res.json({data:result})
    }

    // render default
    if(!perusahaan && !kategori && !masaMagang){
      const [result] = await db.execute('SELECT * FROM lowongan');
      res.json({ data: result })
    }

    
  },

  async getMagang(req,res){
    const {supervisor, nim} = req.query
    if(nim === undefined){
      const [result] = await db.execute('SELECT name, nim, jurusan, photo FROM mahasiswa WHERE supervisor = ?',[supervisor])
      if(result.length===0) return res.status(20).json({message:'Mahasiswa Magang tidak ada'})
      res.status(200).json({data:result})
    }
    if(supervisor === undefined){
      const [result] = await db.execute('SELECT name, nim, jurusan, photo FROM mahasiswa WHERE nim = ?',[nim])
      if(result.length===0) return res.status(401).json({message:'Mahasiswa Magang tidak ada'})
      res.status(200).json({data:result})
    }
  },

  // delete
  async deleteBimbingan(req,res){
    const {nim} = req.body
    const [result] = await db.execute('DELETE FROM bimbingan WHERE nim = ?',[nim])
    return res.status(200).json({message:'sukses menghapus bimbingan', result})
  },

  async deleteLowongan(req,res){
    const {supervisor} = req.body
    const [result] = await db.execute(`DELETE FROM lowongan WHERE supervisor = ?`,[supervisor])
    return res.status(200).json({message:'sukses menghapus lowongan', result})
  },

  async deletePendaftar(req,res){
    const {nim} = req.body
    const [result] = await db.execute(`DELETE FROM pendaftar WHERE nim = ?`,[nim])
    return res.status(200).json({message:'sukses menerima pendaftar', result})
  },

  async deleteAccount(req, res){
    const {nim, nip, supervisor} = req.body
    if(nim === undefined && supervisor === undefined){
      const [response] = await db.execute('DELETE FROM dosen WHERE nip = ?',[nip])
      const [response2] = await db.execute('DELETE FROM bimbingan WHERE nip = ?',[nip])
      if(response.length === 0 && response2.length === 0) return res.status(401).json({message:'Dosen tidak ditemukan'})
      res.status(200).json({message:'berhasil menghapus akun dosen'})
    }
    if(nip === undefined && supervisor === undefined){
      const [response] = await db.execute('DELETE FROM mahasiswa WHERE nim = ?',[nim])
      const [response2] = await db.execute('DELETE FROM mahasiswa WHERE nim = ?',[nim])
      if(response.length === 0 && response2.length === 0) return res.status(401).json({message:'Mahasiswa tidak ditemukan'})
      res.status(200).json({message:'berhasil menghapus akun mahasiswa'})
    }

    // if(nim === undefined && nip === undefined){
    //   const [response] = await db.execute('DELETE FROM supervisor WHERE email = ?',[supervisor])
    //   if(response.length) return res.status(401).json({message:'Mahasiswa tidak ditemukan'})
    
    //   const [response2] = await db.execute('DELETE FROM pendaftar WHERE supervisor = ?',[supervisor])
    //   if(response2.length) return res.status(401).json({message:'Mahasiswa tidak ditemukan'})
      
    //   const [response3] = await db.execute('DELETE FROM lowongan WHERE supervisor = ?',[supervisor])
    //   if(response3.length) return res.status(401).json({message:'Mahasiswa tidak ditemukan'})
    //   res.status(200).json({message:'berhasil menghapus akun supervisor'})
    // }
  }
};

// middleware
export const upload = multer({ storage: multer.memoryStorage() });
