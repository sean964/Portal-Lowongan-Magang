import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { NEXT_PUBLIC_API_URL } from "../../../../../environment/env"
import { toast } from "react-toastify"

const usePenilaian = () =>{
const {data: session} = useSession()
const [mahasiswa, setMahasiswa] = useState([])
const [info, setInfo] = useState([])
const [nim, setNim] = useState(null)
const [nilaiSupervisor, setNilaiSupervisor] = useState(null)
const [click, setClick] = useState(false)

const fetchData = async () =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/magang?supervisor=${session.user.email}`)
    const json = await res.json()
    setMahasiswa(json.data)
}
const fetchData2 = async () =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/magang?nim=${nim}`)
    const json = await res.json()
    setInfo(json.data)
}


useEffect(()=>{
if(session !== undefined){
    fetchData()
    const interval = setInterval(() => {
        fetchData()
    }, 10000);
    return()=> clearInterval(interval)
}
},[session, click])

useEffect(()=>{
    if(nim !== null){
        fetchData2()
        const interval = setInterval(() => {
        fetchData2()
        }, 10000);
        return()=> clearInterval(interval)
    }
},[nim])

const handleNilai = async () =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/penilaian`,{
        method:"PUT",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({
            nim,
            nilaiSupervisor
        })
    })
    
    const json = await res.json()
    if(!res.ok) return toast.error(json.message)
    toast.success(json.message)
    setClick(!click)
}

console.log(nim)
console.log(info)
console.log(nilaiSupervisor)

return{
    setNilaiSupervisor,
    setNim,
    handleNilai,
    mahasiswa,
    nim,
    info
}
}

export default usePenilaian