import { useRouter } from "next/router"
import PageHaead from "@/components/commons/pageHead"
import LowonganMasuk from "@/components/views/perusahaan/fungtion/lowonganMasuk/lowonganMasuk"
import BackButton from "@/components/commons/backButton"
import DashboardLayout from "@/components/layouts/dashboardLayout/dashboardLayout"

const LowonganMasukPage = () =>{
const router = useRouter()
const {supervisor} = router.query

return(
    <DashboardLayout title={'Perusahaan | Lowongan Masuk'} type={'perusahaan'}>
    <PageHaead title={'Perusahaan | Lowongan Masuk'} />
    <BackButton />
    <LowonganMasuk supervisor={supervisor} />
    </DashboardLayout>
    )
}
export default LowonganMasukPage