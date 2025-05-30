import { useEffect, useState } from "react"
import { NEXT_PUBLIC_API_URL } from "../../../../../environment/env"
import { useSession } from "next-auth/react"

const useMagang = () =>{
    const {data:session} = useSession()
    const [mahasiswa, setMahasiswa] = useState([])

    const fetchData = async() =>{
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/magang?supervisor=${session.user.email}`)
        if(!res.ok) return
        const json = await res.json()
        setMahasiswa(json.data)
    }

    useEffect(()=>{
        if(session !== undefined){
            fetchData()
            const interval = setInterval(() => {
               fetchData() 
            }, 10000);
            return ()=> clearInterval(interval)
        }
    },[session])


    return{
        mahasiswa
    }
}

export default useMagang