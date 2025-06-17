import BackButton from "@/components/commons/backButton"
import PageHaead from "@/components/commons/pageHead"
import DashboardLayout from "@/components/layouts/dashboardLayout/dashboardLayout"
import PhotoInput from "@/components/views/update/photo/photo"
import { getSession } from "next-auth/react"


const changePhoto = ({role}) =>{
console.log(role)
return(
    <DashboardLayout title={'Ganti Foto'} type={role}>
    <PageHaead title={'Ganti Foto'} />
    <PhotoInput />
    </DashboardLayout>
)
}

export const getServerSideProps = async (context) =>{
    const session = await getSession(context)

    return{
        props:{
            role:session.user?.role
        }
    }
}

export default changePhoto