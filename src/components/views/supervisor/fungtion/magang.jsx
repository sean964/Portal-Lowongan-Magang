import { Card, CardBody, User } from "@heroui/react"
import useMagang from "./useMagang"
import Image from "next/image"

const Magang = () =>{
const {mahasiswa} = useMagang()


return(
    <div className="font-semibold mt-5 w-full h-fit flex flex-col items-start">
        <p className="text-xl font-bold mb-10">Mahasiswa Magang :</p>
        <div className="w-full  grid grid-cols-3 gap-3 ">
        {mahasiswa?.map(({name, nim, jurusan, photo})=>{
            if(photo !== null){                
            // mengambil kode foto
            const imageData = photo.data
            // mengubah kode foto menjadi string
            const binaryString = String.fromCharCode(...imageData)
            // mengubah string foto menjadi base64
            const base64 = btoa(binaryString)
            const imageUrl = `data:image/jpeg;base64,${base64}`
                return(
                    <Card key={nim} className="w-fit">
                        <CardBody className="flex flex-row gap-4 items-center">
                            <Image src={imageUrl} width={300} height={300} className="w-14 h-14 object-cover rounded-full"/>
                            <div className="flex flex-col">
                                <p>Nama : {name}</p>
                                <p>Nim : {nim}</p>
                                <p>Jurusan : {jurusan}</p>
                            </div>
                        </CardBody>
                    </Card>
                )
            }else{
                return(
                    <Card key={nim} className="w-fit">
                        <CardBody className="flex flex-row gap-4 items-center">
                            <Image src={'/logo/defaultPhoto.jpg'} width={300} height={300} className="w-14 h-14 object-cover rounded-full"/>
                            <div className="flex flex-col">
                                <p>Nama : {name}</p>
                                <p>Nim : {nim}</p>
                                <p>Jurusan : {jurusan}</p>
                            </div>
                        </CardBody>
                    </Card>
                )
            }
        })}
        </div>
    </div>
)
}

export default Magang