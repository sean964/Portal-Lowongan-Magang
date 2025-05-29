import BackButton from "@/components/commons/backButton"
import PageHaead from "@/components/commons/pageHead"
import Penilaian from "@/components/views/supervisor/fungtion/penilaian"

const PenilaianPage = () =>{
return(
    <>
    <PageHaead title={'Supervisor | Penilaian Mahasiswa'}/>
    <BackButton/>
    <Penilaian/>
    </>
)
}

export default PenilaianPage