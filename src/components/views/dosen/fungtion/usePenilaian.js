import { useEffect, useState } from "react"
import { NEXT_PUBLIC_API_URL } from "../../../../../environment/env"
import { toast } from "react-toastify"
import useDashboardLayoutSidebar from "@/components/layouts/dashboardLayout/useDashboardLayoutSidebar"

const usePenilaianDosen = () =>{
const {user} = useDashboardLayoutSidebar()
const [mahasiswa, setMahasiswa] = useState([])
const [info, setInfo] = useState(null)
const [nim, setNim] = useState(null)
const [nilaiDosen, setNilaiDosen] = useState(null)
const [click, setClick] = useState(false)

const fetchData = async () =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/bimbingan?nip=${user.nip}`)
    const json = await res.json()
    if(json === null) return 
    setMahasiswa(json.bimbingan)
}
const fetchData2 = async () =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/bimbingan?nim=${nim}`)
    const json = await res.json()
    if(json === null) return setInfo(null)
    setInfo(json.bimbingan)
}


useEffect(()=>{
if(user !== null){
    fetchData()
    const interval = setInterval(() => {
        fetchData()
    }, 10000);
    return()=> clearInterval(interval)
}
},[user, click])

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
            nilaiDosen
        })
    })
    
    const json = await res.json()
    if(!res.ok) return toast.error(json.message)
    toast.success(json.message)
    setClick(!click)
}
console.log(user.nip)
console.log(mahasiswa)
console.log(nim)
console.log(info)
console.log(nilaiDosen)

return{
    setNilaiDosen,
    setNim,
    handleNilai,
    mahasiswa,
    nim,
    info
}
}

export default usePenilaianDosen