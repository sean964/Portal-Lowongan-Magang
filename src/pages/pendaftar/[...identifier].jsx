import BackButton from "@/components/commons/backButton"
import PageHaead from "@/components/commons/pageHead"
import PendaftarForm from "@/components/views/pendaftarForm/PendaftarForm"
import { useRouter } from "next/router"

const PendaftarFormPage = () =>{
const router = useRouter()
const {identifier = []} = router.query
const [supervisor, nim] = identifier

    return(
        <>
        <PageHaead title={`Form Pendaftaran`}/>
        <BackButton />
        {supervisor !== undefined ? <PendaftarForm supervisor={supervisor} nim={nim} /> : null}
        
        </>
    )

}

export default PendaftarFormPage