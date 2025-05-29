import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { NEXT_PUBLIC_API_URL } from '../../../../../../environment/env'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

const bimbinganSchema = yup.object().shape({
    nip: yup.number().required('pilih dosen pembimbing'),
    nim: yup.number().required('pilih mahasiswa yang dibimbing')
})

const useBimbingan = () =>{
const {control, handleSubmit, formState:{errors}, setError} = useForm({resolver: yupResolver(bimbinganSchema)})
const [mahasiswa, setMahasiswa] = useState([])
const [dosen, setDosen] = useState([])

useEffect(()=>{
    const fetchData = async () =>{
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/mahasiswa`)
            const res2 = await fetch(`${NEXT_PUBLIC_API_URL}/get/dosen`)
            const dosen = await res2.json()
            setDosen(dosen.dosen)
            const mahasiswa = await res.json()
            setMahasiswa(mahasiswa.mahasiswa)
    }

    fetchData()
},[])


const bimbinganService = async ({nim, nip}) =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/bimbingan`,{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            nim,
            nip
        })
    })
    const result = await res.json()
    if(!res.ok){
        throw new Error(result.message)
    }
    return result
}

const {mutate, isPending} = useMutation({
    mutationFn: bimbinganService,
    onError(error){
        toast.error(error.message)
    },
    onSuccess : () =>{
        toast.success('berhasil membuat relasi bimbingan')
    }
})

const handleBimbingan = ({nim, nip}) => mutate({nim, nip})



return{
    handleSubmit,
    handleBimbingan,
    control,
    errors,
    isPending,
    mahasiswa,
    dosen
}
}

export default useBimbingan