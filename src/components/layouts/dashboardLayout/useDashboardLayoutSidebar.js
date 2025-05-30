import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { NEXT_PUBLIC_API_URL } from "../../../../environment/env"

const useDashboardLayoutSidebar = () =>{
const {data:session} = useSession()
const [user, setUser] = useState([])
const [photo, setPhoto] = useState(null)
const [hover, setHover] = useState(false)

const fetchData = async () =>{
    if(session !== undefined){
        const res = await fetch(
           `${NEXT_PUBLIC_API_URL}/get/profile?email=${session?.user.email}&role=${session?.user.role}`);
         const data = await res.json();
           setUser(data.user)
    }
}

useEffect(()=>{
    if(session !== undefined){
        fetchData()
        if(user.length !== 0) return
    }
},[session])

useEffect(()=>{
if(user.length !== 0){
    if(user.photo !== null){
        // mengambil kode foto
        const imageData = user.photo.data
        // mengubah kode foto menjadi string
        const binaryString = String.fromCharCode(...imageData)
        // mengubah string foto menjadi base64
        const base64 = btoa(binaryString)
        const imageUrl = `data:image/jpeg;base64,${base64}`
        setPhoto(imageUrl)
        return
    }
    }
},[user])


return{
    photo,
    user,
    hover,
    setHover
}
}
export default useDashboardLayoutSidebar