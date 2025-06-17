import { Button, Card, CardBody, input, Input, Textarea } from "@heroui/react"
import useLogbook from "./useLogbook"
import { Controller } from "react-hook-form"
import Image from "next/image"
import { FaBookOpen } from "react-icons/fa"

const Logbook = () =>{
const {control,errors,handle,isPending,handleSubmit} = useLogbook()

return(
    <div className="w-full flex justify-center items-center">
        <Card className="w-6/12 h-fit">
            <CardBody className="w-full flex items-center justify-center p-4 lg:p-8">
                <FaBookOpen className="absolute left-3 top-3" size={40}/>
                <p className="w-full flex justify-center text-2xl font-bold mb-3 ">Jurnal Harian</p>
                <div className="w-full lg:w-10/12 h-full flex flex-col gap-3">
                    <Controller control={control} name="judul" render={({field})=>(
                        <Input 
                        {...field}
                        label="Judul"
                        variant="bordered"
                        className="w-3/5"
                        isInvalid={errors.judul !== undefined}
                        errorMessage={errors.judul?.message}
                        />
                    )} />
                <form className="w-full h-full font-semibold flex flex-col gap-3" onSubmit={handleSubmit(handle)}>   
                <Controller control={control} name="date" render={({field})=>(
                    <Input
                    {...field}
                    type="date"
                    variant="bordered"
                    autoComplete="off"
                    label="Tanggal"
                    isInvalid={errors.date !== undefined}
                    errorMessage={errors.date?.message}
                    className="w-2/5"
                    />
                )} />

                <Controller control={control} name="deskripsi" render={({field})=>(
                    <Textarea
                    {...field}
                    type="text"
                    variant="bordered"
                    autoComplete="off"
                    label="Isi jurnal"
                    isInvalid={errors.deskripsi !== undefined}
                    errorMessage={errors.deskripsi?.message}
                    className="resize-y"
                    />
                )} />  

                <div className="w-full flex justify-center">
                <Button type="submit" color="primary" size="lg" className="w-3/5" >Buat jurnal</Button>
                </div>
                </form>
                </div>
            
            </CardBody>
        </Card>
    </div>
)
}


export default Logbook