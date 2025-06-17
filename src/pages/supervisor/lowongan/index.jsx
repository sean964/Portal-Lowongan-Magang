import BackButton from "@/components/commons/backButton"
import PageHaead from "@/components/commons/pageHead"
import DashboardLayout from "@/components/layouts/dashboardLayout/dashboardLayout"
import LowonganMasuk from "@/components/views/perusahaan/fungtion/lowonganMasuk/lowonganMasuk"
import { useSession } from "next-auth/react"

const SupervisorLowonganPage = () =>{
const {data:session} = useSession()
if(session !== undefined){
    return(
        <DashboardLayout title={'Supervisor | Lamaran Masuk'} type={'supervisor'}>
        <PageHaead title={'Supervisor | Lamaran Masuk'} />
        <LowonganMasuk supervisor={session?.user.email} />
        </DashboardLayout>
    )
}
}

export default SupervisorLowonganPage