import { useEffect, useState } from "react"
import { NEXT_PUBLIC_API_URL } from "../../../../environment/env"
import { toast } from "react-toastify"

const useLogBook = (id) =>{
const [logbook, setLogbook]= useState([])
const [click, setClick] = useState(false)
const [komentar, setKomentar] = useState(null)

const fetchLogbook = async () =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/logbook?id=${id}`)
    const json = await res.json()
    if(json === null) return null
    setLogbook(json.data)
}

useEffect(()=>{
if(id !== undefined){
    fetchLogbook()
    const interval = setInterval(() => {
        fetchLogbook()
    }, 10000);
    return () => clearInterval(interval)
}
},[id, click])

console.log(komentar);


    const handleKomentar = async (e) =>{
        e.preventDefault()
        if(komentar === null) return toast.error('Masukkan komentar')
        let komen = komentar.replace(/\n/g,'<br>')
        komen = komen.replace((/^\s*[-*]\s+(.*)$/gm, '<li>$1</li>'))
        komen = '<ul>'+ komen +'</ul>'

        const res = await fetch(`${NEXT_PUBLIC_API_URL}/komentar`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({komentar:komen, id})
        })
        const json = await res.json()
        if(!res.ok) return toast.error(json.message)
        setClick(!click)
        toast.success(json.message)
    }

return{
    logbook:logbook[0],
    setClick,
    click,
    setKomentar,
    handleKomentar
}
}

export default useLogBook