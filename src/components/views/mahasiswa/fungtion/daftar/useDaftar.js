import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { NEXT_PUBLIC_API_URL } from '../../../../../../environment/env'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useState } from 'react'

const daftarSchema = yup.object().shape({
    alasan: yup.string().required('Masukkan alasan anda'),
})

const useDaftar = (name, nim, supervisor, birth, adress, jurusan, email) =>{
const {control, formState:{errors}, setError, handleSubmit} = useForm({resolver:yupResolver(daftarSchema)})
const [cv, setCv] = useState(null)

const handleCv = (e) =>{
    setCv(e.target.files[0])
}


const daftarService = async ({alasan}) =>{
    
    let formattedText = alasan.replace(/\n/g,'<br>')
    formattedText = formattedText.replace(/^\s*[-*]\s+(.*)$/gm, '<li>$1</li>')
    formattedText = '<ul>' + formattedText + '</ul>'

    const formData = new FormData()
    formData.append('pendaftar', name)
    formData.append('nim', nim)
    formData.append('supervisor', supervisor)
    formData.append('birth', birth)
    formData.append('adress', adress)
    formData.append('jurusan', jurusan)
    formData.append('email', email)
    formData.append('alasan', formattedText)
    formData.append('cv', cv)
    if(cv === null){
        const res1 = await fetch(`${NEXT_PUBLIC_API_URL}/pendaftarNoCV`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            pendaftar:name, nim, supervisor, birth, adress, jurusan, email, alasan: formattedText
        })
        })
        const result1 = await res1.json()
        if(!res1.ok){
            throw new Error(result1.message)
    }}else{
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/pendaftar`,{
            method:"POST",
            body:formData
        })
        const result = await res.json()
        if(!res.ok){
            throw new Error(result.message)
        }}
}

const {mutate, ispending} = useMutation({
mutationFn: daftarService,
onError(error){
    toast.error(error.message)
},
onSuccess:()=>{
    toast.success('Berhasil mendaftar')
}
})

const handleDaftar = ({alasan})=> mutate({alasan})
console.log(name, nim, supervisor, birth, adress, jurusan, email)
return{
    handleDaftar,
    ispending,
    control,
    errors,
    handleSubmit,
    handleCv
}
}

export default useDaftar