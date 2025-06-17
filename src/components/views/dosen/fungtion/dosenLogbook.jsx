import { Card, CardBody } from "@heroui/react"
import useDosenLogbook from "./useDosenLogbook"
import Link from "next/link"
import Image from "next/image"


const DosenLogbook = () =>{
const {mahasiswa} = useDosenLogbook()
return(
    <div className="w-full h-fit flex flex-col px-10 ">
        {mahasiswa !== null?<p className="font-bold text-2xl mb-10">Mahasiswa yang telah magang : </p>:<p className="font-bold text-2xl mb-10">Belum ada mahasiswa yang telah magang : </p>}
        <div className="w-full grid grid-cols-4 gap-4">
            {mahasiswa !== null? mahasiswa.map(({nim, mahasiswa, mahasiswaPhoto})=>{
                if(mahasiswaPhoto !== null){
                    // mengambil kode foto
                    const imageData = mahasiswaPhoto.data
                    // mengubah kode foto menjadi string
                    const binaryString = String.fromCharCode(...imageData)
                    // mengubah string foto menjadi base64
                    const base64 = btoa(binaryString)
                    const imageUrl = `data:image/jpeg;base64,${base64}`

                    return(
                        <Link href={{pathname:'/dosen/jurnal/[nim]', query:{nim : nim}}}>
                        <Card key={nim} className="w-full h-fit">
                            <CardBody className="w-full flex flex-row justify-center gap-3 items-center h-fit p-3">
                                <Image 
                                src={imageUrl}
                                alt=""
                                width={200}
                                height={200}
                                className="w-12 h-12 rounded-full"
                                />
                                <div className="w-fit font-semibold text-lg flex flex-col">
                                    <p>Nama : {mahasiswa}</p>
                                    <p>NIM : {nim}</p>
                                </div>
                            </CardBody>
                        </Card>
                        </Link>
                    )
                }else{
                    return(
                        <Link href={{pathname:'/dosen/jurnal/[nim]', query:{nim : nim}}}>
                        <Card key={nim} className="w-full h-fit">
                            <CardBody className="w-full flex flex-row justify-center gap-3 items-center h-fit p-3">
                                <Image 
                                src={'/logo/defaultPhoto.jpg'}
                                alt=""
                                width={200}
                                height={200}
                                className="w-16 h-16 rounded-full"
                                />
                                <div className="w-fit font-semibold text-lg flex flex-col">
                                    <p>{mahasiswa}</p>
                                    <p>{nim}</p>
                                </div>
                            </CardBody>
                        </Card>
                        </Link>
                    )
                }
            }) : 
            null}
        </div>
    </div>
)
}
export default DosenLogbook