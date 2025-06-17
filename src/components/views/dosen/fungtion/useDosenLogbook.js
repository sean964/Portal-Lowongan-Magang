import useDashboardLayoutSidebar from "@/components/layouts/dashboardLayout/useDashboardLayoutSidebar"
import { useEffect, useState } from "react"
import { NEXT_PUBLIC_API_URL } from "../../../../../environment/env"

const useDosenLogbook = () =>{
const {user} = useDashboardLayoutSidebar()
const [mahasiswa, setMahasiswa] = useState(null)

const fetchMahasiswa = async () =>{
const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/bimbingan?nip=${user.nip}&status=Magang`)
const json = await res.json()
if(json === null) return setMahasiswa(null)
setMahasiswa(json.bimbingan)
}

useEffect(()=>{
if(user.length !== 0){
    fetchMahasiswa()
    const interval = setInterval(() => {
        fetchMahasiswa()
    }, 5000);
    return ()=>clearInterval(interval)
}
},[user])
return{
    mahasiswa
}
}
export default useDosenLogbook