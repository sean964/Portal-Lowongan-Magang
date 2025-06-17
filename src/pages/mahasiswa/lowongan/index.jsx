import BackButton from "@/components/commons/backButton"
import PageHaead from "@/components/commons/pageHead"
import DashboardLayout from "@/components/layouts/dashboardLayout/dashboardLayout"
import LowonganCari from "@/components/views/mahasiswa/fungtion/lowongan/LowonganCari"

const LowonganCariPage = () =>{
return(
    <DashboardLayout title={'Mahasiswa | Cari Lowongan'} type={'mahasiswa'}>
    <PageHaead title={'Mahasiswa | Cari Lowongan'} />
    <LowonganCari />
    </DashboardLayout>
)
}
export default LowonganCariPage