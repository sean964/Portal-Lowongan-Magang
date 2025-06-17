import { useEffect, useState } from "react"
import { NEXT_PUBLIC_API_URL } from "../../../../../../environment/env"
import { toast } from "react-toastify"

const useDelete = () =>{
const [nip, setNip] = useState(null)
const [nim, setNim] = useState(null)
const [dosen, setDosen] = useState([])
const [mahasiswa, setMahasiswa] = useState([])
const [click, setClick] = useState(0)

const fetchMahasiswa = async () =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/mahasiswa`)
    const json = await res.json()
    setMahasiswa(json.mahasiswa)
}
const fetchDosen = async() =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/dosen`)
    const json = await res.json()
    setDosen(json.dosen)
}

useEffect(()=>{
fetchDosen()
fetchMahasiswa()
if(dosen.length !== 0 && mahasiswa.length !== 0) return
const interval = setInterval(() => {
    fetchDosen()
    fetchMahasiswa()
}, 1000);

return()=>clearInterval(interval)

},[click])

const deleteService1 = async () =>{
    setClick(click + 1)
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/delete/account`,{
        method: "DELETE",
        headers:{"Content-Type":'application/json'},
        body:JSON.stringify({
            nim,
        })
    })
    const json = await res.json()
    if(!res.ok) return toast.error(json.message)
        toast.success(json.message)
        setClick(click - 1)
}
const deleteService2 = async () =>{
    setClick(click+1)
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/delete/account`,{
        method: "DELETE",
        headers:{"Content-Type":'application/json'},
        body:JSON.stringify({
            nip,
        })
    })
    const json = await res.json()
    if(!res.ok) return toast.error(json.message)
        toast.success(json.message)
    setClick(click-1)
}


return{
    setNim,
    setNip,
    deleteService1,
    deleteService2,
    mahasiswa,
    dosen,
    setClick,
    click
}

}

export default useDelete