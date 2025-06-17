import { getSession } from "next-auth/react"
import { NEXT_PUBLIC_API_URL } from "../../../../../environment/env"
import { useRouter } from "next/router"
import PageHaead from "@/components/commons/pageHead"
import BackButton from "@/components/commons/backButton"
import DaftarLowongan from "@/components/views/mahasiswa/fungtion/daftar/daftar"
import DashboardLayout from "@/components/layouts/dashboardLayout/dashboardLayout"

const DaftarPage = ({data, email}) =>{
const router = useRouter()
const {supervisor} = router.query

return(
    <DashboardLayout type={'mahasiswa'} title={`Daftar | Lowongan ${supervisor}`}>
    <PageHaead title={`Daftar | Lowongan ${supervisor}`} />
    <BackButton />
    <DaftarLowongan data={data} supervisor={supervisor} email={email}/>
    </DashboardLayout>
)
}

export const getServerSideProps = async (context) =>{
    const session = await getSession(context)
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/profile?role=${session.user.role}&email=${session.user.email}`)
    const json = await res.json()

    return{
        props:{
            data : json.user,
            email: session.user.email
        }
    }
} 

export default DaftarPage