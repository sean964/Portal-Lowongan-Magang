import { Button, Card, CardBody, Input, Select, SelectItem } from "@heroui/react"
import usePenilaian from "./usePenilaian"
import Image from "next/image"

const Penilaian = () =>{
const {handleNilai,mahasiswa,setNilaiSupervisor,setNim, nim, info} = usePenilaian()


    return(
        <div className="w-full h-screen flex justify-center items-center">
            <Card className="flex justify-center items-center w-1/2 h-1/2">
                <CardBody className="w-full h-screen flex flex-col justify-center gap-10 font-semibold items-center">
                {info?.length !== 0 ? 
                info?.map(({photo, name, nim})=>{
                    if(photo !== null ){
                    // mengambil kode foto
                    const imageData = photo.data
                    // mengubah kode foto menjadi string
                    const binaryString = String.fromCharCode(...imageData)
                    // mengubah string foto menjadi base64
                    const base64 = btoa(binaryString)
                    const imageUrl = `data:image/jpeg;base64,${base64}`
                        return(
                            <Card key={nim} className="w-fit h-fit mt-5">
                                <CardBody className=" w-full h-full flex flex-row gap-4 items-center">
                                    <Image src={imageUrl} width={300} height={300} className="w-14 h-14 object-cover rounded-full"/>
                                    <div className="flex flex-col">
                                        <p>Nama : {name}</p>
                                        <p>Nim : {nim}</p>
                                    </div>
                                </CardBody>
                            </Card>
                        )
                    }else{
                        return(
                            <Card key={nim} className="w-fit h-fit mt-5">
                                <CardBody className="w-full h-full flex flex-row gap-4 items-center">
                                    <Image src={'/logo/defaultPhoto.jpg'} width={300} height={300} className="w-14 h-14 object-cover rounded-full"/>
                                    <div className="flex flex-col">
                                        <p>Nama : {name}</p>
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
                            {mahasiswa.name}
                        </SelectItem>
                        )} 
                    </Select>
                    <Input className="w-1/6" type="number" variant="bordered" onChange={(e)=>setNilaiSupervisor(e.target.value)} label='Nilai' />
                </div>
                    <Button className="font-semibold" color="primary" size="lg" onPress={handleNilai}>Beri nilai</Button>
                </CardBody>
            </Card>
        </div>
    )

}

export default Penilaian