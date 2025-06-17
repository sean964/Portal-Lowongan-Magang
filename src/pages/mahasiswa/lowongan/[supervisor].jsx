import PageHaead from "@/components/commons/pageHead"
import { NEXT_PUBLIC_API_URL } from "../../../../environment/env"
import LowonganForm from "@/components/views/mahasiswa/fungtion/lowonganForm/lowonganForm"
import BackButton from "@/components/commons/backButton"
import DashboardLayout from "@/components/layouts/dashboardLayout/dashboardLayout"

const LowonganFormPage = ({lowongan, supervisor}) =>{

return(
    <DashboardLayout title={`Mahasiswa | Lowongan ${lowongan[0].judul}`} type={'mahasiswa'} >
    <PageHaead title={`Lowongan | ${supervisor}`} />
    <BackButton />
    <LowonganForm lowongan={lowongan} />
    </DashboardLayout>
)}

export const getServerSideProps = async (context) =>{
const {supervisor} = context.params

const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/lowongan?supervisor=${supervisor}`)
const json = await res.json()

return{
    props:{
        lowongan: json.data,
        supervisor
    }
}

}

export default LowonganFormPage