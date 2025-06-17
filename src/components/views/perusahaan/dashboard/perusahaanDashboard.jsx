import { Button, Card, CardBody, Select, SelectItem, Spinner, User } from "@heroui/react"
import Link from "next/link"
import usePerusahaanDashboard from "./usePerusahaanDashboard"
import { Controller } from "react-hook-form"
import { IoTrash } from "react-icons/io5"
import { FaTrash } from "react-icons/fa"

const PerushaanDashboard = () =>{
  const {        
        eraseService,
        data,
        handling,
        setHandling} = usePerusahaanDashboard()
        console.log(data)
return(
  <div className="w-full min-h-screen flex flex-col justify-start items-start ">
                    {data.length === 0 ? (
                      <p className="lg:text-3xl text-2xl font-bold flex w-full justify-center mb-8">Belum Membuat Lowongan</p>
                    ):(
                      <p className="lg:text-3xl text-2xl font-bold flex w-full justify-center mb-8">Lowongan yang telah dibuat:</p>
                    )}
                  <div className="w-full mb-10 flex flex-col items-center lg:grid lg:grid-cols-2 gap-5 text-medium font-semibold">
          {data?.map(({photo, supervisor, judul, diterima, dibutuhkan, pendaftar})=>{
              
              if(photo !==null){
                  const baseString = String.fromCharCode(...photo.data)
                  const base64 = btoa(baseString)
                  const imageUrl = `data:image/jpeg;base64,${base64}`
                  return(
                      <Link key={supervisor} href={{pathname:`/perusahaan/lowongan/masuk/[supervisor]`, query:{supervisor: supervisor}}}>
                     <Card className="">
                         <CardBody className="relative z-0 flex items-start gap-2">
                              <User itemType="bordered" avatarProps={{src:imageUrl}} name={`Supervisor : ${supervisor}`} description={`Lowongan: ${judul}`}/>
                              <div className="flex flex-col">
                                  <p>Dibutuhkan : {dibutuhkan} orang</p>
                                  <p>Diterima : {diterima} orang</p>
                                  <p>Pendaftar : {pendaftar} orang</p>
                              </div>
                              <Button className="absolute right-5 top-1/2" color="danger" size="lg" variant="ghost" onClick={(e)=>{
                                e.preventDefault()
                                eraseService(supervisor)
                                setHandling(-1)}}> <FaTrash size={25} /></Button>
                         </CardBody>
                     </Card>
                      </Link>
                      
                  )
                  
              }else{
                  return(
                      <Link key={supervisor} href={{pathname:`/perusahaan/lowongan/masuk/[supervisor]`, query:{supervisor: supervisor}}}>
                      <Card className="">
                         <CardBody className="flex relative z-0 items-start gap-2">
                              <User itemType="bordered" avatarProps={{src:'/logo/defaultPhoto.jpg'}} name={`Supervisor : ${supervisor}`} description={`Lowongan : ${judul}`}/>
                              <div className="flex flex-col">
                                  <p>Dibutuhkan : {dibutuhkan} orang</p>
                                  <p>Diterima : {diterima} orang</p>
                                  <p>Pendaftar : {pendaftar} orang</p>
                              </div>
                              <Button className="absolute right-5 top-1/2" color="danger" size="lg" variant="ghost" onClick={(e)=>{
                                e.preventDefault()
                                eraseService(supervisor)
                                setHandling(-1)}}> <FaTrash size={25} /></Button>
                         </CardBody>
                     </Card>
                      </Link>
                  )
                }
          })}
                  </div>
      </div>
)
}
export default PerushaanDashboard