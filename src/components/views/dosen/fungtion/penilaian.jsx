import { Button, Card, CardBody, Input, Select, SelectItem } from "@heroui/react"
import usePenilaian from "./usePenilaian"
import Image from "next/image"
import usePenilaianDosen from "./usePenilaian"

const PenilaianDosen = () =>{
const {handleNilai,mahasiswa,setNilaiDosen,setNim, info} = usePenilaianDosen()


    return(
        <div className="w-full h-fit flex justify-center items-center">
            <Card className="flex justify-center items-center lg:w-1/2 w-2/3 h-fit">
                <CardBody className="w-full h-fit flex flex-col justify-center gap-10 font-semibold items-center">
                    <p className="w-full flex justify-center font-bold text-xl text-primary-500">Penilaian Dosen</p>
                {info!== null ? 
                info.map(({mahasiswaPhoto, mahasiswa, nim})=>{
                    if(mahasiswaPhoto !== null ){
                    // mengambil kode foto
                    const imageData = mahasiswaPhoto.data
                    // mengubah kode foto menjadi string
                    const binaryString = String.fromCharCode(...imageData)
                    // mengubah string foto menjadi base64
                    const base64 = btoa(binaryString)
                    const imageUrl = `data:image/jpeg;base64,${base64}`
                        return(
                            <Card key={nim} className="w-fit h-fit mt-5">
                                <CardBody className=" w-full h-full flex flex-row gap-4 items-center">
                                    <Image src={imageUrl} alt="" width={300} height={300} className="w-14 h-14 object-cover rounded-full"/>
                                    <div className="flex flex-col">
                                        <p>Nama : {mahasiswa}</p>
                                        <p>Nim : {nim}</p>
                                    </div>
                                </CardBody>
                            </Card>
                        )
                    }else{
                        return(
                            <Card key={nim} className="w-fit h-fit mt-5">
                                <CardBody className="w-full h-full flex flex-row gap-4 items-center">
                                    <Image src={'/logo/defaultPhoto.jpg'} alt="" width={300} height={300} className="w-14 h-14 object-cover rounded-full"/>
                                    <div className="flex flex-col">
                                        <p>Nama : {mahasiswa}</p>
                                        <p>Nim : {nim}</p>
                                    </div>
                                </CardBody>
                            </Card>
                        )
                    }
                }):
                null}
                <div className="w-full flex flex-row justify-center gap-3">
                    <Select className="w-1/2" items={mahasiswa} label='Pilih mahasiswa' onChange={(e)=>setNim(e.target.value)}>
                        {(mahasiswa)=>(
                        <SelectItem key={mahasiswa.nim}>
                            {mahasiswa.mahasiswa}
                        </SelectItem>
                        )} 
                    </Select>
                    <Input className="w-1/6" type="number" variant="bordered" onChange={(e)=>setNilaiDosen(e.target.value)} label='Nilai' />
                </div>
                    <Button className="font-semibold" color="primary" size="lg" onPress={handleNilai}>Beri nilai</Button>
                </CardBody>
            </Card>
        </div>
    )

}

export default PenilaianDosen