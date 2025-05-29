import { getSession, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { NEXT_PUBLIC_API_URL } from "../../../../../../environment/env"

const useLowonganDibuat = (perusahaan) =>{
const [lowongan, setLowongan] = useState([])


const fetchData = async () => {
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/lowongan?perusahaan=${perusahaan}`)
        const json = await res.json()
        setLowongan(json.data)
}

useEffect( ()=>{
        fetchData()
        const interval = setInterval(fetchData,5000)
        return ()=> clearInterval(interval)
},[])

return{
    lowongan
}
}
export default useLowonganDibuat