import BackButton from "@/components/commons/backButton"
import PageHaead from "@/components/commons/pageHead"
import LowonganMasuk from "@/components/views/perusahaan/fungtion/lowonganMasuk/lowonganMasuk"
import { useSession } from "next-auth/react"

const SupervisorLowonganPage = () =>{
const {data:session} = useSession()
if(session !== undefined){
    return(
        <>
        <PageHaead title={'Supervisor | Lamaran Masuk'} />
        <BackButton />
        <LowonganMasuk supervisor={session?.user.email} />
        </>
    )
}
}

export default SupervisorLowonganPage