import { Button, Card, CardBody, Input, Select, SelectItem, Spinner, Textarea } from "@heroui/react"
import useDaftar from "./useDaftar"
import { Controller } from "react-hook-form"
import { toast } from "react-toastify"

const DaftarLowongan = ({data, email, supervisor}) =>{
    const {name, nim, angkatan, adress, jurusan} = data
    const {
    handleDaftar,
    ispending,
    control,
    errors,
    handleSubmit,
    handleCv} = useDaftar(name, nim,supervisor, angkatan, adress, jurusan, email)

    return(
    <div className="w-full flex items-center justify-center py-10 min-h-screen ">
        <Card className="w-4/5 min-h-screen">
            <CardBody className="w-full min-h-screen">
                <form className="w-full min-h-screen flex flex-col p-8 lg:p-16" onSubmit={handleSubmit(handleDaftar)}>

                <p className="lg:text-3xl w-full flex justify-center font-bold mb-20">Form Pendaftaran Magang</p>
                
                <div className="w-full mb-20">
  <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 font-semibold text-md lg:text-lg">
    <span>Nama</span>
    <span>: {name}</span>
    
    <span>Nim</span>
    <span>: {nim}</span>
    
    <span>Alamat</span>
    <span>: {adress}</span>
    
    <span>Angkatan</span>
    <span>: {angkatan}</span>
    
    <span>Email</span>
    <span>: {email}</span>
    
    <span>Jurusan</span>
    <span>: {jurusan}</span>
  </div>
</div>

                <div className="w-full flex flex-col items-center">
                <Controller control={control} name="alasan" render={({field})=>(
                    <Textarea
                    {...field} 
                        autoComplete="off"
                        variant="bordered"
                        type="text"
                        label='Alasan melamar magang disini '
                        isInvalid={errors.alasan !== undefined}
                        errorMessage={errors.alasan?.message}
                        className="w-10/12 mb-2 font-semibold text-lg"
                    />
                )} />
                
                <Input type="file" className="font-semibold text-lg w-1/3 mb-10" onChange={handleCv} accept=".pdf" label='CV (pdf) max 1mb' variant="bordered" />                
                </div>

                    <div className="w-full flex justify-center">
                    <Button color="primary" className="w-1/4 font-semibold text-lg" size="lg" type="submit">
                        {ispending ? <Spinner color="white" size="sm" /> : 'Daftar'}
                    </Button>
                    </div>
                </form>
            </CardBody>
        
        </Card>
        </div>
    )
}

export default DaftarLowongan