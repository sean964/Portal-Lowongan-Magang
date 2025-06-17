import BackButton from "@/components/commons/backButton"
import PageHaead from "@/components/commons/pageHead"
import DashboardLayout from "@/components/layouts/dashboardLayout/dashboardLayout"
import JurnalMahasiswa from "@/components/views/dosen/fungtion/jurnalMahasiswa"
import { useRouter } from "next/router"

const JurnalMahasiswaPage = () =>{
    const router = useRouter() 
    const {nim} = router.query
    if(nim !== undefined){
        return(
            <DashboardLayout title={'Dosen | Jurnal Mahasiswa'} type={'dosen'}>
            <PageHaead title={'Dosen | Jurnal Mahasiswa'} />
            <BackButton path={'dosen/jurnal'} />
            <JurnalMahasiswa nim={nim} />
            </DashboardLayout>
        )
    }
}

export default JurnalMahasiswaPage