import { Button, Card, CardBody, Select, SelectItem, Spinner } from "@heroui/react"
import Image from "next/image"
import useBimbingan from "./useBimbingan"
import { cn } from "../../../../../../utils/cn"
import { Controller } from "react-hook-form"
import { TbCirclesRelation } from "react-icons/tb";


const Bimbingan = () =>{
  const {
    handleSubmit,
    handleBimbingan,
    control,
    errors,
    isPending,
    dosen,
    mahasiswa
  } = useBimbingan()

return(
    <div className="flex h-screen w-full flex-col px-20 lg:px-60 items-center justify-center">
      <div className="w-full">
        <Card className="m-10">
          <CardBody className="flex w-full gap-1 flex-col items-center text-center justify-center px-10 py-8">
            <Image
              className="mb-2"
              src="/logo/logoIth.png"
              width={30}
              height={30}
              alt=""
            />
            <h2 className="mb-2 text-2xl text-center font-bold text-primary-500">
              Membuat Relasi Bimbingan
            </h2>
            
            <form
              onSubmit={handleSubmit(handleBimbingan)}
              className={cn(
                'flex flex-col w-full',
                Object.keys(errors).length > 0 ? 'gap-2' : 'gap-4'
              )}
            >
                <div className="flex min-w-full flex-col lg:flex-row gap-2">

              <Controller
                name="nim"
                control={control}
                render={({ field }) => (
                  <Select
                    label="mahasiswa"
                    {...field}
                    items={mahasiswa}
                    isInvalid={errors.nim !== undefined}
                    errorMessage={errors.nim?.message}
                    className="w-full"
                  >
                    {mahasiswa.map((mahasiswa) => (
                      <SelectItem key={mahasiswa.nim}>
                        {mahasiswa.name}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />

              <div className="w-full flex items-center justify-center text-center lg:w-10 lg:h-16 lg:rotate-180 rotate-90">
             <TbCirclesRelation  size={20} />
              </div>
              
              <Controller
                name="nip"
                control={control}
                render={({ field }) => (
                  <Select
                    label="dosen"
                    {...field}
                    items={dosen}
                    isInvalid={errors.nip !== undefined}
                    errorMessage={errors.nip?.message}
                    >
                    {dosen.map((dosen) => (
                        <SelectItem key={dosen.nip}>
                        {dosen.name}
                      </SelectItem>
                    ))}
                  </Select>
                )}
                />
                </div>

              <Button color="primary" size="lg" type="submit">
                {isPending ? <Spinner color="white" size="sm" /> : 'Register'}
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
)
}
export default Bimbingan