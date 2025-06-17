import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { NEXT_PUBLIC_API_URL } from "../../../../../environment/env"

const useLogBookMap = () =>{
const {data:session} = useSession()
const [logbook, setLogbook] = useState(null)
const [user, setUser] = useState([])

const fetchUser = async () =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/profile?email=${session.user.email}&role=${session.user.role}`)
    const json = await res.json()
    setUser(json.user)
}

const fetchLogbook = async ()=>{
const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/logbook?nim=${user.nim}`)
let json = await res.json()
if(json !== null){
    json = json.data.sort((a,b)=> new Date(b.date) - new Date(a.date))
    setLogbook(json)
}
}

useEffect(()=>{
if(session !== undefined){
    fetchUser()
}
},[session])

useEffect(()=>{
if(user?.length !== 0){
    fetchLogbook()
}
},[user])

return{
    logbook
}

}
export default useLogBookMap