import { useEffect, useState } from "react"
import { NEXT_PUBLIC_API_URL } from "../../../../../environment/env"

const useJurnalMahasiswa = (nim) => {
const [logbook, setLogbook] = useState(null)
const [mahasiswa, setMahasiswa] = useState(null)

const fetchData = async () =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/logbook?nim=${nim}`)
    let json = await res.json()
    if(json !== null){
        json = json.data.sort((a,b)=> new Date(b.date) - new Date(a.date))
        setLogbook(json)
    }
}

const fetchMahasiswa = async () =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/bimbingan?nim=${nim}`)
    const json = await res.json()
    if(json === null) return null
    setMahasiswa(json.bimbingan.mahasiswa)
}

useEffect(()=>{
if(nim !== undefined){
    fetchMahasiswa()
    fetchData()
    const interval = setInterval(() => {
        fetchData()
    }, 5000);
    return ()=> clearInterval(interval)
}
},[nim])

return{
    logbook,
    mahasiswa
}
}

export default useJurnalMahasiswa