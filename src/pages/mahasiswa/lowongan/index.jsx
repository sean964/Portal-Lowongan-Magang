import BackButton from "@/components/commons/backButton"
import PageHaead from "@/components/commons/pageHead"
import LowonganCari from "@/components/views/mahasiswa/fungtion/lowongan/LowonganCari"

const LowonganCariPage = () =>{
return(
    <>
    <PageHaead title={'Mahasiswa | Cari Lowongan'} />
    <BackButton />
    <LowonganCari />
    </>
)
}
export default LowonganCariPage