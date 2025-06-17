import { Controller } from "react-hook-form"
import useBuatLowongan from "./useBuat"
import { Card, CardBody, Input, Button, Select, SelectItem, Textarea, Spinner } from "@heroui/react"

const BuatLowongan = ({supervisor}) =>{

    const {handleLowongan,
    handleSubmit,
    control,
    errors,
    isPending,
    jurusan} = useBuatLowongan()
return(
    <div className="w-full flex items-center justify-center py-10 min-h-screen ">
    <Card className="w-4/5 min-h-screen">
        <CardBody className="w-full min-h-screen">
            <form className="w-full min-h-screen justify-center flex flex-col p-8 lg:p-16" onSubmit={handleSubmit(handleLowongan)}>
                <div className="w-full h-1/5 flex flex-col justify-start items-center mb-10">
                    <Controller control={control} name="judul" render={({field})=>(
                        <Input 
                        {...field}
                        type="text"
                        label="Judul Lowongan"
                        variant="bordered"
                        autoComplete="off"
                        className="lg:w-2/5 w-3/5 text-center text-lg"
                        isInvalid={errors.judul !== undefined}
                        errorMessage={errors.judul?.message}/>
                    )}/>
                </div>
                
                <div className="lg:w-2/5 w-3/5 h-1/5 flex flex-col justify-start items-center gap-3 mb-10">
                    <Controller
                name="supervisor"
                control={control}
                render={({ field }) => (
                  <Select
                    label="supervisor"
                    {...field}
                    items={supervisor}
                    isInvalid={errors.supervisor !== undefined}
                    errorMessage={errors.supervisor?.message}
                    className="w-full"
                  >
                    {supervisor.map((data) => (
                      <SelectItem key={data.email}>
                        {data.name}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
                    <Controller
                name="kategori"
                control={control}
                render={({ field }) => (
                  <Select
                    label="kategori Jurusan"
                    {...field}
                    items={jurusan}
                    isInvalid={errors.kategori !== undefined}
                    errorMessage={errors.kategori?.message}
                    className="w-full"
                  >
                    {jurusan.map((data) => (
                      <SelectItem key={data.label}>
                        {data.label}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
                
                <div className="w-full flex items-center gap-2">
              <Controller control={control} name="masaMagang" render={({field})=>(
                  <Input
                {...field}
                        type="number"
                        label="Masa Magang"
                        variant="bordered"
                        autoComplete="off"
                        className="w-full text-center text-lg"
                        isInvalid={errors.masaMagang !== undefined}
                        errorMessage={errors.masaMagang?.message}                
                />
              )} />
              <p className="text-medium text-center font-semibold">Bulan</p>
                  </div>
                
                <div className="w-full flex items-center gap-2">
              <Controller control={control} name="dibutuhkan" render={({field})=>(
                <Input 
                {...field}
                type="number"
                label='Dibutuhkan'
                variant= 'bordered'
                autoComplete="off"
                className="w-full text-center text-lg"
                isInvalid={errors.dibutuhkan !== undefined}
                errorMessage={errors.dibutuhkan?.message}
                />
              )} />
              <p className="text-medium text-center font-semibold">Orang</p>
                  </div>

              

                </div>

                <div className="w-full min-h-full flex flex-col justify-start items-center gap-3 mb-10">
                    <Controller control={control} name="deskripsi" render={({field})=>(
                        <Textarea 
                        {...field}
                        autoComplete="off"
                        variant="bordered"
                        type="text"
                        label='Deskripsi Lowongan'
                        isInvalid={errors.deskripsi !== undefined}
                        errorMessage={errors.deskripsi?.message}
                        className="resize-none"

                        />
                    )} />
                </div>

                <Button color="primary" size="lg" type="submit">
                    {isPending ? <Spinner color="white" size="sm" /> : 'Buat Lowongan'}
                </Button>
            </form>
        </CardBody>
    
    </Card>
    </div>
)
}

export default BuatLowongan