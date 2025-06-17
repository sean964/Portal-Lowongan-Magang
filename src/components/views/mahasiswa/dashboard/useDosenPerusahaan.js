import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { NEXT_PUBLIC_API_URL } from "../../../../../environment/env"

const useDosenPerusahaan =()=>{
const [perusahaan, setPerusahaan] = useState(null)
const [photoPerusahaan, setPhotoPerusahaan] = useState(null)
const [supervisor, setSupervisor] = useState(null)
const [supervisorData, setSupervisorData] = useState(null)
const [judul, setJudul] = useState(null)
const [dosen, setDosen] = useState(null)
const [nim, setNim] = useState(null)
const {data:session} = useSession()

const fetch1= async ()=>{
const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/profile?email=${session.user.email}&role=${session.user.role}`)
const json = await res.json()

setPerusahaan(json.user.perusahaan)
setSupervisor(json.user.supervisor)
setNim(json.user.nim)

}

const fetch2 = async() =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/bimbingan?nim=${nim}`)
    const json = await res.json()
    if(json=== null) return
    setDosen(json.bimbingan)
    
}

const fetch3 = async () =>{
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/perusahaan?name=${perusahaan}`)
        const json = await res.json()
        setPhotoPerusahaan(json.perusahaan[0].photo)
}

const fetch4 = async () =>{
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/supervisor?perusahaan=${perusahaan}&supervisor=${supervisor}`)
        const json = await res.json()
        setSupervisorData(json.data[0])

        const res2 = await fetch(`${NEXT_PUBLIC_API_URL}/get/lowongan?supervisor=${supervisor}`)
        const json2 = await res2.json()
        setJudul(json2.data[0].judul)
}

useEffect(()=>{
if(session !== undefined){
    fetch1()
}
},[session])

useEffect(()=>{
if(nim !== null){
    fetch2()
}
},[nim])

useEffect(()=>{
if(perusahaan !== null){
    fetch3()
    fetch4()
}
},[perusahaan])

console.log(judul)
return{
    nim,
    dosen,
    perusahaan,
    supervisor,
    photoPerusahaan,
    supervisorData,
    judul
}
}

export default useDosenPerusahaan