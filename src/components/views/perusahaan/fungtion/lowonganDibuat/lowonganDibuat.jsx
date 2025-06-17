import { Card, CardBody, User } from "@heroui/react"
import Link from "next/link"
import useLowonganDibuat from "./useLownganDibuat"

const LowonganDibuat = ({user}) =>{
const {lowongan} = useLowonganDibuat(user)
return(
    <div className="w-full h-fit flex flex-col justify-center items-center">
                <p className="lg:text-3xl text-2xl font-bold mb-5">Lowongan yang telah dibuat:</p>
                <div className="lg:w-full w-3/5 flex flex-col lg:grid lg:grid-cols-3 gap-5 text-medium font-semibold">
        {lowongan?.map(({photo, supervisor, judul, diterima, dibutuhkan})=>{
            
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
                            </div>
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
export default LowonganDibuat