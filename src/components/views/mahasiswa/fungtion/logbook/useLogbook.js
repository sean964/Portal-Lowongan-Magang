import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { NEXT_PUBLIC_API_URL } from "../../../../../../environment/env"
import * as yup from 'yup'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "react-toastify"
import { useMutation } from "@tanstack/react-query"

const logBookSchema = yup.object().shape({
    judul: yup.string().required('Masukkan judul'),
    date: yup.date().required('Masukkan tanggal pembuatan jurnal'),
    deskripsi: yup.string().required('Masukkan hal yang ingin dilaporkan')
})

const useLogbook = () =>{
const {data: session} = useSession()
const [nim, setNim] = useState(null)
const [nip, setNip] = useState(null)
const {control, formState:{errors}, handleSubmit} = useForm({resolver:yupResolver(logBookSchema)})


const fetchData = async () =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/profile?role=${session.user.role}&email=${session.user.email}`)
    const datas = await res.json()
    const res2= await fetch(`${NEXT_PUBLIC_API_URL}/get/bimbingan?nim=${datas.user.nim}`)
    const json = await res2.json()
    setNim(json.bimbingan.nim)
    setNip(json.bimbingan.nip)
}


useEffect(()=>{
    if(session !== undefined){
        fetchData()
    }
},[session])

const logbookSubmit = async ({judul, date, deskripsi}) =>{
    const dateFormatted = date.toISOString().split('T')[0];
    let formattedDeskripsi = deskripsi.replace(/\n/g, '<br>')
    formattedDeskripsi = formattedDeskripsi.replace(/^\s*[-*]\s+(.*)$/gm, '<li>$1</li>');
    formattedDeskripsi = '<ul>' + formattedDeskripsi + '</ul>'
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/logbook`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({judul, nim, nip, deskripsi: formattedDeskripsi, date:dateFormatted})
    })
    const json = await res.json()
    if(!res.ok) return toast.error(json.message)
    toast.success(json.message)
} 

const {mutate, isPending} = useMutation({
    mutationFn:logbookSubmit
})
const handle = ({judul, date, deskripsi}) => mutate({judul, date, deskripsi})
return{
    handle,
    isPending,
    control,
    errors,
    handleSubmit
}
}

export default useLogbook