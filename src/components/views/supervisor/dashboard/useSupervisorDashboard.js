import { useEffect, useState } from "react"
import { NEXT_PUBLIC_API_URL } from "../../../../../environment/env"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

const useSuprvisorDashboard = () =>{
const [supervisor, setSupervisor] = useState([])
const {data:session} = useSession()

const fetchData = async () =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/lowongan?supervisor=${session.user.email}`)
    const json = await res.json()
    if(!res.ok) return toast.error(json.message)
    setSupervisor(json.data)
}

useEffect(()=>{
    if(session !== undefined){
        fetchData()

        const interval = setInterval(() => {
            fetchData()
        }, 5000);

        return ()=> clearInterval(interval)
    }
})

return{
    supervisor
}
}

export default useSuprvisorDashboard