import BackButton from "@/components/commons/backButton"
import PageHaead from "@/components/commons/pageHead"
import DashboardLayout from "@/components/layouts/dashboardLayout/dashboardLayout"
import LowonganDibuat from "@/components/views/perusahaan/fungtion/lowonganDibuat/lowonganDibuat"

import { getSession } from "next-auth/react"

const LowonganDibuatPage = ({user}) =>{

return(
    <DashboardLayout type={'perusahaan'} title={'Perusahaan | Lowongan'}>
    <PageHaead title={'Perusahaan | Lowongan'} />
    <LowonganDibuat user={user} />
    </DashboardLayout>
)
}


export const getServerSideProps = async (context) =>{
    const session = await getSession(context)


    return{
        props:{
            user:session.user.name
        }
    }
}

export default LowonganDibuatPage