import { useRouter } from "next/router"
import PageHaead from "@/components/commons/pageHead"
import LowonganMasuk from "@/components/views/perusahaan/fungtion/lowonganMasuk/lowonganMasuk"
import BackButton from "@/components/commons/backButton"

const LowonganMasukPage = () =>{
const router = useRouter()
const {supervisor} = router.query

return(
    <>
    <PageHaead title={'Perusahaan | Lowongan Masuk'} />
    <BackButton />
    <LowonganMasuk supervisor={supervisor} />
    </>
    )
}
export default LowonganMasukPage