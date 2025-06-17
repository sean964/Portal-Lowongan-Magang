import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import * as yup from "yup" 
import { NEXT_PUBLIC_API_URL } from "../../../../../environment/env"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

const usePerusahaanDashboard = () =>{
    const [data, setData] = useState([])
    const {data:session} = useSession()
    const [handling, setHandling] = useState(0)


    const fetchData = async () =>{
    const res2 = await fetch(`${NEXT_PUBLIC_API_URL}/get/lowongan?perusahaan=${session.user.name}`)
    const lowongan = await res2.json()
    setData(lowongan.data)
    }

    useEffect(()=>{
        if(session !== undefined){
            fetchData()
            if(data.length !== 0) return
            const interval = setInterval(()=>{fetchData()},10000)
            return ()=> clearInterval(interval)
        }
    },[handling,session])

    const eraseService = async (supervisor) =>{
        if(supervisor === undefined){
            return toast.error('pilih lowongan yang ingin dihapus')
        }else{
            await fetch(`${NEXT_PUBLIC_API_URL}/delete/lowongan`,{
                method:"DELETE",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    supervisor
                })
            })
            toast.success('Berhasil menghapus lowongan')
            setHandling(+1)
        }
    }

    return{
        eraseService,
        data,
        handling,
        setHandling
    }


}
export default usePerusahaanDashboard