import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { NEXT_PUBLIC_API_URL } from "../../../../../environment/env"

const useTableStatus = () =>{
const {data:session} = useSession()
const [mahasiswa, setMahasiswa] = useState(null)
const [status, setStatus] = useState([])

const fetchMahasiswa = async () =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/profile?role=${session.user.role}&email=${session.user.email}`)
    const json = await res.json()
    setMahasiswa(json.user)
}

const fetchStatus = async () =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/pendaftar?nim=${mahasiswa.nim}`)
    const json = await res.json()
    if(json===null) return
    setStatus(json.data)
}


useEffect(()=>{
if(session !== undefined){
    fetchMahasiswa()
}
},[session])

useEffect(()=>{
if(mahasiswa !== null && mahasiswa !== undefined ){
    fetchStatus()
    const interval = setInterval(() => {
        fetchStatus()
    }, 5000);
    return()=>clearInterval(interval)
}
},[mahasiswa])

return{
    status
}

}

export default useTableStatus