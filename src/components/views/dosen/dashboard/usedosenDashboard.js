import { user } from "@heroui/react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { NEXT_PUBLIC_API_URL } from "../../../../../environment/env"

const useDosenDashboard = () =>{
const {data:session} = useSession()
const [user, setUser] = useState(null)
const [mahasiswa, setMahasiswa] = useState([0])

const fetchUser = async () =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/profile?email=${session.user.email}&role=${session.user.role}`)
    const json = await res.json()
    setUser(json.user)
}

const fetchMahasiswa = async () =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/bimbingan?nip=${user.nip}`)
    const json = await res.json()
    if(json === null) return null
    setMahasiswa(json.bimbingan)
}

useEffect(()=>{
    if(session!== undefined){
        fetchUser()
    }
},[session])

useEffect(()=>{
if(user !== null){
    fetchMahasiswa()
    const interval = setInterval(() => {
        fetchMahasiswa()
    }, 10000);
    return ()=> clearInterval(interval)
}
},[user])

return{
    user,
    mahasiswa
}
}

export default useDosenDashboard