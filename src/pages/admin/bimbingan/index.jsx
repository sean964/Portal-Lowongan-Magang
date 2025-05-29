import Bimbingan from "@/components/views/admin/fungtion/bimbingan/bimbingan"
import BackButton from "@/components/commons/backButton"
import PageHaead from "@/components/commons/pageHead"

const BimbinganPage = ({dosen, mahasiswa}) =>{
return(
    <>
    <PageHaead title={'Admin || Relasi Bimbingan'} />
    <BackButton />
    <Bimbingan />
    </>
)
}

export default BimbinganPage