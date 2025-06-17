import { toast } from "react-toastify"
import { NEXT_PUBLIC_API_URL } from "../../../../../environment/env"
import { useEffect, useState } from "react"

const useAdminDashboard = () =>{
    const [data, setData] = useState(null)
    const [handling, setHandling] = useState(0)


    const fetchData = async () =>{
    const res2 = await fetch(`${NEXT_PUBLIC_API_URL}/get/bimbingan`)
    const bimbingan = await res2.json()
    if(bimbingan === null) return setData(null)
    setData(bimbingan.bimbingan)
    }

    useEffect(()=>{
        fetchData()
        const interval = setInterval(() => {
            fetchData()
        }, 1000);

        return ()=> clearInterval(interval)
    },[handling])
    const eraseService = async (nim) =>{
            const res = await fetch(`${NEXT_PUBLIC_API_URL}/delete/bimbingan`,{
                method:"DELETE",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    nim
                })
            })
            if(res.ok){
                setHandling(+1)
                toast.success('Berhasil menghapus relasi')
            }
    }

    return{
        eraseService,
        data,
        handling,
        setHandling
    }


}
export default useAdminDashboard