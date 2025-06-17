import BackButton from "@/components/commons/backButton"
import PageHaead from "@/components/commons/pageHead"
import DashboardLayout from "@/components/layouts/dashboardLayout/dashboardLayout"
import LogBook from "@/components/views/logbook/logbook"
import { getSession, useSession } from "next-auth/react"
import { useRouter } from "next/router"

const LogBookPage = ({role}) =>{
    const router = useRouter()
    const {id} = router.query
    console.log(role)
    if(role !== undefined){
        if(role !== null){
            return(
                <DashboardLayout type={role} title={'Jurnal harian'} >
                <PageHaead title={'Jurnal harian'} />
                {role === 'dosen' ? <BackButton path={"dosen/jurnal"}/>:<BackButton path={'/mahasiswa/logbook'}/>}
                
                <LogBook id={id} /> 
                </DashboardLayout>
            )
        }
    }
}


export async function getServerSideProps (context) {
    const session = await getSession(context)
    return{
        props:{
            role:session.user.role
        }
    }
}

export default LogBookPage