import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import * as yup from "yup" 
import { NEXT_PUBLIC_API_URL } from "../../../../../environment/env"
import { useEffect, useState } from "react"



const eraseSchema = yup.object().shape({
    nim:yup.number()
})

const useAdminDashboard = () =>{
    const [data, setData] = useState([])
    const [handling, setHandling] = useState(false)


    const fetchData = async () =>{
    const res2 = await fetch(`${NEXT_PUBLIC_API_URL}/get/bimbingan`)
    const bimbingan = await res2.json()
    setData(bimbingan.bimbingan)
    }

    useEffect(()=>{
        fetchData()
        if(data.length !== 0) return
        const interval = setInterval(() => {
        fetchData();
        }, 100);

        return () => clearInterval(interval)
    },[handling])

    const {control, handleSubmit} = useForm({resolve:yupResolver(eraseSchema)})
    const eraseService = async ({nim}) =>{
        setHandling(!handling)
        console.log(nim)
        if(nim === undefined){
            return toast.error('pilih relasi yang ingin dihapus')
        }else{
            await fetch(`${NEXT_PUBLIC_API_URL}/delete/bimbingan`,{
                method:"DELETE",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    nim
                })
            })
            toast.success('Berhasil menghapus relasi')
        }
    }
    const {mutate, isPending} = useMutation({
        mutationFn:eraseService,
    })
    
    const handleErase = ({nim}) => mutate({nim})

    return{
        handleErase,
        isPending,
        control,
        handleSubmit,
        eraseService,
        data
    }


}
export default useAdminDashboard