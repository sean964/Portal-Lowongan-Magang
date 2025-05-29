import PageHaead from "@/components/commons/pageHead"
import BuatLowongan from "@/components/views/perusahaan/fungtion/buatLowongan/buat"
import { getSession } from "next-auth/react"
import { NEXT_PUBLIC_API_URL } from "../../../../environment/env"
import BackButton from "@/components/commons/backButton"

const BuatLowonganPage = ({supervisor}) =>{
    console.log(supervisor)
    return(
<>
<PageHaead title={'Perusahaan | Buat Lowongan'}/>
<BackButton />
<BuatLowongan supervisor={supervisor} />
</>
    )
}

export async function getServerSideProps(context){
    const session = await getSession(context)
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/supervisor?perusahaan=${session.user.name}`)
    const json = await res.json()
    const supervisor = json.data


    return{
        props:{
            supervisor: supervisor
        }
    }
}

export default BuatLowonganPage