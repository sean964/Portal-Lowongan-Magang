import { useEffect, useState } from "react"
import { NEXT_PUBLIC_API_URL } from "../../../environment/env"

const useHome = () =>{
const [lowongan, setLowongan] = useState([])
const [halaman, setHalaman] = useState(1)
const [totalHalaman, setTotalHalaman] = useState(0)
const [loading, setLoading] = useState(true)

const fetchData = async () =>{
setLoading(true)
try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/pagination?halaman=${halaman}`)
    const json = await res.json()
    if(json === null) return null
    setLowongan(json.data.lowongan)
    setTotalHalaman(json.data.totalHalaman)
} catch (error) {
    console.log('gagal mengambil data')
} finally{
    setLoading(false)
}
}

useEffect(()=>{
fetchData()
},[halaman])


return{
    lowongan,
    setHalaman,
    totalHalaman,
    halaman,
    loading
}
}
export default useHome