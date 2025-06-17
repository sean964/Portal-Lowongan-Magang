import PageHaead from "@/components/commons/pageHead"
import DashboardLayout from "@/components/layouts/dashboardLayout/dashboardLayout"
import Nilai from "@/components/views/mahasiswa/fungtion/nilai/nilai"

const NilaiPage = () =>{
return(
    <DashboardLayout title={'Mahasiswa | Lihat Nilai'} type={'mahasiswa'}>
        <PageHaead title={'Mahasiswa | Lihat Nilai'}/>
        <Nilai/>
    </DashboardLayout>
)
}

export default NilaiPage