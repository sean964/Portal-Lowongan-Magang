import express from 'express';
import authcontroller, { upload } from '../controller/authcontroller.js';

const router = express.Router();
//api endpoint
router.put('/upPhoto', upload.single('photo'), authcontroller.upPhoto);
router.put('/terimaPendaftar', authcontroller.terimaPendaftar)
router.put('/tolakPendaftar', authcontroller.tolakPendaftar)
router.put('/penilaian', authcontroller.penilaian)
router.post('/auth/register', authcontroller.register);
router.post('/auth/login', authcontroller.login);
router.post('/bimbingan', authcontroller.bimbingan);
router.post('/lowongan', authcontroller.Buatlowongan)
router.post('/pendaftar', upload.single('cv'), authcontroller.postPendaftar)
router.post('/pendaftarNoCV', authcontroller.postPendaftarNoCV)
router.get('/get/mahasiswa', authcontroller.getMahasiswa);
router.get('/get/mahasiswaStatus', authcontroller.getMahasiswaStatus);
router.get('/get/dosen', authcontroller.getDosen);
router.get('/get/profile', authcontroller.getProfile);
router.get('/get/perusahaan', authcontroller.getPerusahaan);
router.get('/get/bimbingan', authcontroller.getBimbingan)
router.get('/get/supervisor', authcontroller.getSupervisor)
router.get('/get/lowongan', authcontroller.getLowongan)
router.get('/get/pendaftar', authcontroller.getPendaftar)
router.get('/get/lowonganMahasiswa', authcontroller.getLowonganMahasiswa)
router.get('/get/CV', authcontroller.getCV)
router.get('/get/magang', authcontroller.getMagang)
router.delete('/delete/bimbingan', authcontroller.deleteBimbingan)
router.delete('/delete/lowongan', authcontroller.deleteLowongan)
router.delete('/delete/pendaftar', authcontroller.deletePendaftar)
router.delete('/delete/account',authcontroller.deleteAccount)

export default router;
