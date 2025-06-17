import PageHaead from "@/components/commons/pageHead"
import DashboardLayout from "@/components/layouts/dashboardLayout/dashboardLayout"
import PenilaianDosen from "@/components/views/dosen/fungtion/penilaian"

const PenilaianDosenPage = () =>{
    return(
    <DashboardLayout type={'dosen'} title={'Dosen | Penilaian'}>
        <PageHaead title={'Dosen | Penilaian'}/>
        <PenilaianDosen/>
    </DashboardLayout>
    )
}

export default PenilaianDosenPage