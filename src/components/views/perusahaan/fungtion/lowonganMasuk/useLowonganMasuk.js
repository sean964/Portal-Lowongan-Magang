import { useEffect, useState } from "react"
import { NEXT_PUBLIC_API_URL } from "../../../../../../environment/env"


const useLowonganMasuk = (supervisor) =>{
    const [pendaftar, setPendaftar] = useState(null)

const fetchData = async () =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/pendaftar?supervisor=${supervisor}`)
    const data = await res.json()
    if(data === null) return null
    setPendaftar(data.data)
}

useEffect(()=>{
    if(supervisor !== undefined){
        fetchData()
        const interval = setInterval(()=>{fetchData()},2000)
        return ()=> clearInterval(interval)
    }
},[supervisor])

return{
    pendaftar
}
}
export default useLowonganMasuk