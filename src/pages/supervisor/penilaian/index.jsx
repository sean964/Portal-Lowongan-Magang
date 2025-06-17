import BackButton from "@/components/commons/backButton"
import PageHaead from "@/components/commons/pageHead"
import DashboardLayout from "@/components/layouts/dashboardLayout/dashboardLayout"
import Penilaian from "@/components/views/supervisor/fungtion/penilaian"

const PenilaianPage = () =>{
return(
    <DashboardLayout title={'Supervisor | Penilaian Mahasiswa'} type={'supervisor'}>
    <PageHaead title={'Supervisor | Penilaian Mahasiswa'}/>
    <Penilaian/>
    </DashboardLayout>
)
}

export default PenilaianPage