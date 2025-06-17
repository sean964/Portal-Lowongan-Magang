import BackButton from "@/components/commons/backButton"
import PageHaead from "@/components/commons/pageHead"
import DashboardLayout from "@/components/layouts/dashboardLayout/dashboardLayout"
import Password from "@/components/views/update/password/password"
import { getSession } from "next-auth/react"

const ChangePasswordPage = ({role}) =>{
    console.log(role)
return(
    <DashboardLayout title={'Ganti Password'}  type={role}>
    <PageHaead title={'Ganti Password'}/>
    <Password/>
    </DashboardLayout>
)
}

export const getServerSideProps = async (context) =>{
    const session = await getSession(context)

    return{
        props:{
            role:session?.user?.role
        }
    }
}

export default ChangePasswordPage