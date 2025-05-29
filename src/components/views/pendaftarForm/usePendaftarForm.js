import { useEffect, useState } from "react"
import { NEXT_PUBLIC_API_URL } from "../../../../environment/env"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
const usePendaftarForm = (supervisor, nim) =>{
    const [pendaftar, setPendaftar] = useState([])
    const [pdf, setPdf] = useState(null)
    const [click, setClick] = useState(false)
    const [diterima , setDiterima] = useState([])
    const [mahasiswa , setMahasiswa] = useState(null)
    const [handling, setHandling] = useState(false)
    const router = useRouter()

    const fetchDiterima = async () =>{
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/lowongan?supervisor=${supervisor}`)
            const json = await res.json()
            setDiterima(json.data)
    }

    const fetchMahasiswa = async () =>{
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/mahasiswaStatus?nim=${nim}`)
            const json = await res.json()
            setMahasiswa(json.data)
    }

    const fetchData = async () =>{
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/pendaftar?supervisor=${supervisor}&nim=${nim}`)
        const json = await res.json()
        setPendaftar(json.data)
    }

    const fetchCV = async () =>{
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/CV?supervisor=${supervisor}&nim=${nim}`)
        const blob = await res.blob()
        if(blob.size !== 0){
            const objectUrl = URL.createObjectURL(blob);
            setPdf(objectUrl)
        }
        if(!res.ok) setPdf(null)
    }
    
    const handleClick = () =>{
        setClick(!click)
    }

    useEffect(()=>{
        if(supervisor !== undefined && nim !== undefined){
            fetchData()
            fetchCV()
            fetchDiterima()
            fetchMahasiswa()
        }
        if(pendaftar.length !== 0) return
    },[supervisor, nim, handling])

    const handleTerima = async (e) =>{
        e.preventDefault()
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/terimaPendaftar`,{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                supervisor,
                nim
            })
        })
        const response = await res.json()
        if(!res.ok) toast.error(response.message)
        await fetch(`${NEXT_PUBLIC_API_URL}/delete/pendaftar`,{
        method: "DELETE",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({nim})
        })

        toast.success(response.message)
        
        if(diterima[0].diterima === diterima[0].dibutuhkan){
            const res2 = await fetch(`${NEXT_PUBLIC_API_URL}/delete/lowongan`,{
                method:"DELETE",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({supervisor})
            })
            const response2 = await res2.json()
            if(res.ok) toast.success(response2.message)
                router.push('/supervisor')
        }
        
        router.push('/supervisor/lowongan')
        setHandling(!handling)
    }

    const handleTolak = async (e) =>{
        e.preventDefault()
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/tolakPendaftar`,{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                supervisor,
                nim
            })
        })
        const response = await res.json()
        if(!res.ok) toast.error(response.message)
        toast.success(response.message)
        setHandling(!handling)
    }


    return{pdf, pendaftar, handleClick, click, handleTerima, handling, handleTolak, mahasiswa}

    
}

export default usePendaftarForm