import Bimbingan from "@/components/views/admin/fungtion/bimbingan/bimbingan"
import BackButton from "@/components/commons/backButton"
import PageHaead from "@/components/commons/pageHead"
import DashboardLayout from "@/components/layouts/dashboardLayout/dashboardLayout"

const BimbinganPage = ({dosen, mahasiswa}) =>{
return(
    <>
    <DashboardLayout type={'admin'} title={'Admin || Relasi Bimbingan'}>
    <PageHaead title={'Admin || Relasi Bimbingan'} />
    <Bimbingan />
    </DashboardLayout>
    </>
)
}

export default BimbinganPage