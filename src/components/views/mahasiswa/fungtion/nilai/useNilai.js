import { useEffect, useState } from "react"
import { NEXT_PUBLIC_API_URL } from "../../../../../../environment/env"
import { useSession } from "next-auth/react"

const useNilai = () =>{
const [nilai, setNilai] = useState(null)
const [nim, setNim] = useState(null)
const {data:session} = useSession()

const fetchData1 = async () =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/profile?email=${session.user.email}&role=${session.user.role}`)
    const json = await res.json()
    setNim(json.user.nim)
}

const fetchData2 = async () =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/penilaian?nim=${nim}`)
    const json = await res.json()
    setNilai(json.data)
}

useEffect(()=>{
    if(session !== undefined){
        fetchData1()
    }
},[session])

useEffect(()=>{
    if(nim !== null){
        fetchData2()
    }
},[nim])
return{
    nilai
}
}

export default useNilai