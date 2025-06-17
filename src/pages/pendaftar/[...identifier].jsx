import BackButton from "@/components/commons/backButton"
import PageHaead from "@/components/commons/pageHead"
import DashboardLayout from "@/components/layouts/dashboardLayout/dashboardLayout"
import PendaftarForm from "@/components/views/pendaftarForm/PendaftarForm"
import { getSession } from "next-auth/react"
import { useRouter } from "next/router"

const PendaftarFormPage = ({role}) =>{
const router = useRouter()
const {identifier = []} = router.query
const [supervisor, nim] = identifier

    return(
        <DashboardLayout title={`Lamaran Masuk`} type={role}>
        <PageHaead title={`Surat Lamaran Magang`}/>
        <BackButton />
        {supervisor !== undefined ? <PendaftarForm supervisor={supervisor} nim={nim} /> : null}
        
        </DashboardLayout>
    )

}

export async function getServerSideProps(context) {
    const session = await getSession(context)

    return{
        props:{
            role:session.user.role
        }
    }
}

export default PendaftarFormPage