import { Card, CardBody, Select, SelectItem, Spinner, User } from "@heroui/react"
import Link from "next/link"
import usePerusahaanDashboard from "./usePerusahaanDashboard"
import { Controller } from "react-hook-form"
import { IoTrash } from "react-icons/io5"

const PerushaanDashboard = () =>{
  const {        
        handleErase,
        isPending,
        control,
        handleSubmit,
        eraseService,
        data} = usePerusahaanDashboard()
        console.log(data)
return(
  <div className="w-full min-h-screen flex flex-col justify-start items-start p-10 lg:px-20 lg:py-10">
                    {data.length === 0 ? (
                      <p className="lg:text-3xl text-2xl font-bold mb-5">Belum Membuat Lowongan</p>
                    ):(
                      <p className="lg:text-3xl text-2xl font-bold mb-5">Lowongan yang telah dibuat:</p>
                    )}
                  <div className="w-full mb-10 flex flex-col lg:grid lg:grid-cols-2 gap-5 text-medium font-semibold">
          {data?.map(({photo, supervisor, judul, diterima, dibutuhkan, pendaftar})=>{
              
              if(photo !==null){
                  const baseString = String.fromCharCode(...photo.data)
                  const base64 = btoa(baseString)
                  const imageUrl = `data:image/jpeg;base64,${base64}`
                  return(
                      <Link key={supervisor} href={{pathname:`/perusahaan/lowongan/masuk/[supervisor]`, query:{supervisor: supervisor}}}>
                     <Card className="">
                         <CardBody className="flex items-start gap-2">
                              <User itemType="bordered" avatarProps={{src:imageUrl}} name={`Supervisor : ${supervisor}`} description={`Lowongan: ${judul}`}/>
                              <div className="flex flex-col">
                                  <p>Dibutuhkan : {dibutuhkan} orang</p>
                                  <p>Diterima : {diterima} orang</p>
                                  <p>Pendaftar : {pendaftar} orang</p>
                              </div>
                         </CardBody>
                     </Card>
                      </Link>
                      
                  )
                  
              }else{
                  return(
                      <Link href={{pathname:`/perusahaan/lowongan/masuk/[supervisor]`, query:{supervisor: supervisor}}}>
                      <Card>
                         <CardBody className="flex items-start gap-2">
                              <User itemType="bordered" avatarProps={{src:'/logo/defaultPhoto.jpg'}} name={`Supervisor : ${supervisor}`} description={`Lowongan : ${judul}`}/>
                              <div className="flex flex-col">
                                  <p>Dibutuhkan : {dibutuhkan} orang</p>
                                  <p>Diterima : {diterima} orang</p>
                                  <p>Pendaftar : {pendaftar} orang</p>
                              </div>
                         </CardBody>
                     </Card>
                      </Link>
                  )
                }
          })}
                  </div>
          {data.length !== 0 && (
          <form className="w-full flex" onSubmit={handleSubmit(handleErase)}>
          <Controller control={control} name="supervisor" render={({field})=>(
                  <Select
                  className="w-1/2"
                  label="Hapus Lowongan"
                  {...field}
                  items={data}
                  >
                              {data.map((data) => (
                                  <SelectItem key={data.supervisor}>
                                  {data.judul}
                                </SelectItem>
                              ))}
                            </Select>
                )}/>
                <button type="submit">{isPending? <Spinner color="primary" size="20" /> : <IoTrash color="danger" size={30}/>}</button>
          </form>
          )}
      </div>
)
}
export default PerushaanDashboard