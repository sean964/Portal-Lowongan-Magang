import { Button, Card, CardBody } from "@heroui/react"
import Link from "next/link"

const LowonganForm = ({lowongan}) =>{

    return(
        lowongan.map(({perusahaan, deskripsi, kategori, supervisor, judul, masaMagang})=>{
            return(
            <div key={supervisor} className="w-full flex flex-col gap-5 items-center justify-center py-10 min-h-screen ">
            <Card className="w-4/5 h-full min-h-screen p-8">
            <CardBody className="w-full flex flex-col h-full">
                <div className="w-full mb-16 flex justify-center text-3xl font-bold">
                    <h1>{judul}</h1>
                </div>
            <div className="flex mb-20 text-lg font-medium gap-2">
                <div>
                <p>Kategori Jurusan</p>
                <p>Perusahaan</p>
                <p>Masa Magang</p>
                </div>
                <div>
                <p>: {kategori}</p>
                <p>: {perusahaan}</p>
                <p>: {masaMagang}</p>
                </div>
            </div>
            
            <div dangerouslySetInnerHTML={{__html: deskripsi}}/>
            
            </CardBody>     
            </Card>
            
            <Button color="primary" size="lg" className="px-0">
            <Link href={{pathname:'/mahasiswa/lowongan/daftar/[supervisor]', query:{supervisor:supervisor}}} className="w-full h-full flex items-center justify-center font-bold">
                Daftar
            </Link>
                </Button>
        </div>
            )
        })

    )
}
export default LowonganForm