import * as yup from 'yup'
import { NEXT_PUBLIC_API_URL } from '../../../../../environment/env'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'

const PasswordSchema = yup.object().shape({
    password: yup.string().required('Masukkan password anda'),
    newPassword: yup.string().required('Masukkan password anda'),
    confirmNewPassword: yup.string().oneOf([yup.ref('newPassword')], 'Password tidak sama').required('Masukkan password anda')
})

const usePassword = () =>{
const {control, formState:{errors}, handleSubmit} = useForm({resolver:yupResolver(PasswordSchema)})
const {data: session} = useSession()
const router = useRouter()

  const [visiblePass, setvisiblePass] = useState();

  const handleVisiblePass = () => {
    setvisiblePass(!visiblePass);
  };
  
  const [visibleNewPass, setvisibleNewPass] = useState();

  const handleVisibleNewPass = () => {
    setvisibleNewPass(!visibleNewPass);
  };

  const [visibleConfirm, setvisiblecConfirm] = useState();

  const handleVisibleConfirm = () => {
    setvisiblecConfirm(!visibleConfirm);
  };

const changeService = async ({password, newPassword, confirmNewPassword})=>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/changePass`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            email:session.user.email,
            password,
            newPassword,
            role:session.user.role
        })
    })
    const json = res.json()
    if(!res.ok) toast.error(json.message)
}

const {mutate, isPending} = useMutation({

    mutationFn: changeService,
    onSuccess:()=>{
        toast.success('Berhasil mengganti password')
        router.push(`/${session.user.role}`)
    },
    onError(error){
        toast.error(error.message)
    }
})

const handleChange = ({password, newPassword, confirmNewPassword})=>mutate({password, newPassword, confirmNewPassword})

return{
    handleChange,
    handleSubmit,
    isPending,
    control,
    errors,
    handleVisiblePass,
    handleVisibleConfirm,
    visiblePass,
    visibleConfirm,
    handleVisibleNewPass,
    visibleNewPass
}

}

export default usePassword