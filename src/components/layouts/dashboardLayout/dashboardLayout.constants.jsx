import { CiGrid41 } from 'react-icons/ci';
import { IoDocumentTextSharp, IoPeople, IoGrid } from 'react-icons/io5';
import { GrStatusGood } from 'react-icons/gr';
import { FaBookOpen, FaAddressBook, FaUserCheck } from 'react-icons/fa';
import { BsEraserFill, BsFillMortarboardFill, BsMortarboardFill } from 'react-icons/bs';
import { FaMarker } from 'react-icons/fa6';
import { HiBadgeCheck } from "react-icons/hi";
import {
  MdSupervisorAccount,
  MdOutlineWork,
  MdPeopleAlt,
} from 'react-icons/md';

const MAHASISWA_SIDEBAR = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    href: '/mahasiswa',
    icon: <IoGrid />,
  },
  {
    key: 'daftarLowongan',
    label: 'Mendaftar Lowongan',
    href: '/mahasiswa/lowongan',
    icon: <IoDocumentTextSharp />,
  },
  {
    key: 'jurnal',
    label: 'Jurnal Harian',
    href: '/mahasiswa/logbook',
    icon: <FaBookOpen />,
  },
  {
    key:'nilai',
    label:'Lihat Nilai',
    href:'/mahasiswa/nilai',
    icon: <FaUserCheck />
  }
];

const DOSEN_SIDEBAR = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    href: '/dosen',
    icon: <IoGrid />,
  },
  {
    key: 'jurnal',
    label: 'Jurnal Harian Mahasiswa',
    href: '/dosen/jurnal',
    icon: <FaBookOpen />,
  },
  {
    key: 'penilaianAkhir',
    label: 'Penilaian Akhir',
    href: '/dosen/penilaian',
    icon: <FaMarker />,
  },
];

const PERUSAHAAN_SIDEBAR = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    href: '/perusahaan',
    icon: <IoGrid />,
  },
  {
    key: 'lowongan',
    label: 'Buat Lowongan',
    href: `/perusahaan/lowongan`,
    icon: <MdOutlineWork />,
  },
  {
    key: 'lowonganMasuk',
    label: 'Lowongan Masuk',
    href: '/perusahaan/lowongan/dibuat',
    icon: <FaAddressBook />,
  },
  {
    key: 'supervisor',
    label: 'Daftar Supervisor',
    href: '/perusahaan/register',
    icon: <MdSupervisorAccount />,
  },
];

const SUPERVISOR_SIDEBAR = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    href: '/supervisor',
    icon: <IoGrid />,
  },
  {
    key: 'lowonganMasuk',
    label: 'Lamaran Masuk',
    href: '/supervisor/lowongan',
    icon: <FaAddressBook />,
  },
  {
    key: 'penilaian',
    label: 'Beri Nilai Mahasiswa',
    href: '/supervisor/penilaian',
    icon: <HiBadgeCheck />,
  },
];

const ADMIN_SIDEBAR = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    href: '/admin',
    icon: <IoGrid />,
  },
  {
    key: 'mahasiswa',
    label: 'Registrasi Mahasiswa',
    href: '/admin/register/mahasiswa',
    icon: <BsMortarboardFill />,
  },
  {
    key: 'dosen',
    label: 'Registrasi Dosen',
    href: '/admin/register/dosen',
    icon: <FaMarker />,
  },
  {
    key: 'bimbingan',
    label: 'Buat bimbingan',
    href: '/admin/bimbingan',
    icon: <MdPeopleAlt />,
  },
  {
    key: 'delete',
    label: 'Hapus akun',
    href: '/admin/delete',
    icon: <BsEraserFill />,
  }
];
export {
  MAHASISWA_SIDEBAR,
  DOSEN_SIDEBAR,
  PERUSAHAAN_SIDEBAR,
  SUPERVISOR_SIDEBAR,
  ADMIN_SIDEBAR,
};
