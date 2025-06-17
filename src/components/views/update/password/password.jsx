import { Button, Card, CardBody, Input, Spinner } from "@heroui/react"
import usePassword from "./usePassword"
import { Controller } from "react-hook-form"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import Image from "next/image"

const Password = () =>{
const {control,errors,handleChange,handleSubmit,isPending, handleVisiblePass,
    handleVisibleConfirm, visiblePass, visibleConfirm,handleVisibleNewPass,
    visibleNewPass} = usePassword()

return(
    <div className="w-full h-full flex items-center justify-center">
    <Card className="w-1/2 h-3/4 flex items-center justify-center">
        <CardBody className="font-semibold w-full h-full flex justify-center items-center p-5">
            <Image
            src={'/logo/logoIth.png'}
            alt=""
            width={40}
            height={40}
            />
            <p className="text-2xl font-bold text-primary-500">Ganti password</p>
            <form className="lg:w-1/2 w-3/4 h-full flex flex-col gap-4 justify-center items-center" onSubmit={handleSubmit(handleChange)}>
                <Controller 
                control={control}
                name="password"
                render={({field})=>(
                    <Input
                    {...field}
                    type={visiblePass? 'text': 'password'}
                    label="Password lama"
                    isInvalid={errors.password !== undefined}
                    errorMessage={errors.password?.message}
                    endContent={
                      <button
                        className="focus:outline-none h-full flex items-center"
                        type="button"
                        onClick={handleVisiblePass}
                      >
                        {visiblePass ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    }                    
                    />
                )}
                />
                <Controller 
                control={control}
                name="newPassword"
                render={({field})=>(
                    <Input
                    {...field}
                    type={visibleNewPass? 'text': 'password'}
                    label="Password baru"
                    isInvalid={errors.newPassword !== undefined}
                    errorMessage={errors.newPassword?.message}
                    endContent={
                      <button
                        className="focus:outline-none h-full flex items-center"
                        type="button"
                        onClick={handleVisibleNewPass}
                      >
                        {visibleNewPass ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    }    
                    />
                )}
                />
                <Controller 
                control={control}
                name="confirmNewPassword"
                render={({field})=>(
                    <Input
                    {...field}
                    type={visibleConfirm? 'text' : 'password'}
                    label="Konfirmasi password baru"
                    isInvalid={errors.confirmNewPassword !== undefined}
                    errorMessage={errors.confirmNewPassword?.message}
                    endContent={
                      <button
                        className="focus:outline-none h-full flex items-center"
                        type="button"
                        onClick={handleVisibleConfirm}
                      >
                        {visibleConfirm ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    }    
                    />
                )}
                />

                <Button className="mt-10" color="primary" size="lg" type="submit">{isPending? <Spinner color="white" size="sm"/>:'Ganti Password'}</Button>
            </form>
        </CardBody>
    </Card>
    </div>
)
}

export default Password