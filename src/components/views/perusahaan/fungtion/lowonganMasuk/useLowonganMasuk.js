import { useEffect, useState } from "react"
import { NEXT_PUBLIC_API_URL } from "../../../../../../environment/env"


const useLowonganMasuk = (supervisor) =>{
    const [pendaftar, setPendaftar] = useState([])

const fetchData = async () =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/pendaftar?supervisor=${supervisor}`)
    const data = await res.json()
    setPendaftar(data.data)
}

useEffect(()=>{
    fetchData()
    const interval = setInterval(()=>{fetchData()},2000)
    return ()=> clearInterval(interval)
},[supervisor])

return{
    pendaftar
}
}
export default useLowonganMasuk