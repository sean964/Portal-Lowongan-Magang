import BackButton from "@/components/commons/backButton"
import PageHaead from "@/components/commons/pageHead"
import Logbook from "@/components/views/mahasiswa/fungtion/logbook/logbook"

const LogBookPage = () =>{
return(
    <>
    <PageHaead title={'Mahasiswa | Jurnal Harian'}/>
    <BackButton />
    <Logbook/>
    </>
)
}

export default LogBookPage