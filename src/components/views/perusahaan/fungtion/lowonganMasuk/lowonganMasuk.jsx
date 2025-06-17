import { Card, CardBody, User } from "@heroui/react"
import useLowonganMasuk from "./useLowonganMasuk"
import Link from "next/link"

const LowonganMasuk = ({supervisor}) =>{
const {pendaftar} = useLowonganMasuk(supervisor)

return(
    <div className="w-full min-h-screen flex flex-col justify-start items-center  lg:px-20 lg:py-10">
                <p className="lg:text-3xl text-2xl font-bold mb-5">Mahasiswa yang telah mendaftar:</p>
                <div className="lg:w-full w-2/3 flex flex-col lg:grid lg:grid-cols-3 gap-5 text-medium font-semibold">
        {pendaftar !== null ? 
            pendaftar?.map(({photo, pendaftar, nim})=>{
            
            if(photo !==null){
                const baseString = String.fromCharCode(...photo.data)
                const base64 = btoa(baseString)
                const imageUrl = `data:image/jpeg;base64,${base64}`
                return(
                    <Link className="" key={supervisor} 
                    href={{
                    pathname:`/pendaftar/[...identifier]`, 
                    query:{identifier: [supervisor, nim]
                    }}}>
                   <Card className="">
                       <CardBody className="flex items-start gap-2">
                            <User itemType="bordered" avatarProps={{src:imageUrl}} name={`Pendaftar : ${pendaftar}`} description={`nim: ${nim}`}/>
                       </CardBody>
                   </Card>
                    </Link>
                    
                )
                
            }else{
                return(
                    <Link key={supervisor} href={{
                    pathname:`/pendaftar/[...identifier]`, 
                    query:{identifier: [supervisor, nim]
                    }}}>
                   <Card className="">
                       <CardBody className="flex items-start gap-2">
                            <User itemType="bordered" avatarProps={{src:'/logo/defaultPhoto.jpg'}} name={`Pendaftar : ${pendaftar}`} description={`nim: ${nim}`}/>
                       </CardBody>
                   </Card>
                    </Link>
                )
            }
        }):<p className="text-xl font-bold">Belum ada pendaftar</p>}
                </div>
    </div>
    )

}
export default LowonganMasuk