import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { NEXT_PUBLIC_API_URL } from '../../../../../../environment/env'
import { useSession } from 'next-auth/react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const lowonganSchema = yup.object().shape({
    judul: yup.string().required('masukkan judul lowongan'),
    kategori: yup.string().required('masukkan kategori jurusan'),
    deskripsi: yup.string().required('masukkan deskripsi lowongan'),
    masaMagang:yup.number().required('masukkan masa lowongan'),
    supervisor:yup.string().required('masukkan supervisor'),
    dibutuhkan:yup.number().required('masukkan jumlah peserta magang yang dibutuhkan')
})

const useBuatLowongan = () => {
const {control, handleSubmit, formState:{errors}} = useForm({resolver:yupResolver(lowonganSchema)})
const {data:session} = useSession()

  const jurusan = [
    { label: 'Teknik Sipil' },
    { label: 'Teknologi Pangan' },
    { label: 'Teknik Metalurgi' },
    { label: 'Teknik Sistem Energi' },
    { label: 'Teknik Arsitektur' },
    { label: 'Matematika' },
    { label: 'Sistem Informasi' },
    { label: 'Sains Akurturia' },
    { label: 'Sains Data' },
    { label: 'Ilmu komputer' },
    { label: 'bioteknologi' },
  ];


const lowonganService = async ({judul, kategori, deskripsi, supervisor, masaMagang, dibutuhkan}) =>{
    const masa = `${masaMagang} Bulan` 
    let formattedDeskripsi = deskripsi.replace(/\n/g, '<br>')
    formattedDeskripsi = formattedDeskripsi.replace(/^\s*[-*]\s+(.*)$/gm, '<li>$1</li>');
    formattedDeskripsi = '<ul>' + formattedDeskripsi + '</ul>'
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/lowongan`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            perusahaan: session?.user.name,
            kategori,
            deskripsi: formattedDeskripsi,
            judul,
            supervisor,
            masaMagang:masa,
            dibutuhkan
        })
    })
    const result = await res.json()
    if(!res.ok){
        throw new Error(result.message)
    }
    return result

}

const {mutate, isPending} = useMutation({
    mutationFn: lowonganService,
    onError(error){
        toast.error(error.message)
    },
    onSuccess:()=>{
        toast.success('Berhasil Membuat Lowongan')
    }
})

const handleLowongan = ({judul, kategori, deskripsi, masaMagang, supervisor, dibutuhkan}) => mutate({judul, kategori, deskripsi, masaMagang, supervisor, dibutuhkan})

return{
    handleLowongan,
    handleSubmit,
    control,
    errors,
    isPending,
    jurusan
}

}

export default useBuatLowongan