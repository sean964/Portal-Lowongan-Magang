import BackButton from "@/components/commons/backButton"
import PageHaead from "@/components/commons/pageHead"
import DashboardLayout from "@/components/layouts/dashboardLayout/dashboardLayout"
import Logbook from "@/components/views/mahasiswa/fungtion/logbook/logbook"

const LogBookPage = () =>{
return(
    <DashboardLayout title={'Mahasiswa | Jurnal Harian'} type={'mahasiswa'}>
    <PageHaead title={'Mahasiswa | Jurnal Harian'}/>
    <Logbook/>
    </DashboardLayout>
)
}

export default LogBookPage