import BackButton from "@/components/commons/backButton"
import PageHaead from "@/components/commons/pageHead"
import DashboardLayout from "@/components/layouts/dashboardLayout/dashboardLayout"
import DosenLogbook from "@/components/views/dosen/fungtion/dosenLogbook"

const JurnalDosenPage = () =>{
return(
    <DashboardLayout title={'Dosen | Daftar jurnal Mahasiswa'} type={'dosen'}>
    <PageHaead title={'Dosen | Daftar jurnal Mahasiswa'} />
    <DosenLogbook/>
    </DashboardLayout>
)
}
export default JurnalDosenPage