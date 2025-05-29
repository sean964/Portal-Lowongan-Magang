import BackButton from "@/components/commons/backButton"
import PageHaead from "@/components/commons/pageHead"
import LowonganDibuat from "@/components/views/perusahaan/fungtion/lowonganDibuat/lowonganDibuat"

import { getSession } from "next-auth/react"

const LowonganDibuatPage = ({user}) =>{

return(
    <>
    <PageHaead title={'Perusahaan | Lowongan'} />
    <BackButton />
    <LowonganDibuat user={user} />
    </>
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