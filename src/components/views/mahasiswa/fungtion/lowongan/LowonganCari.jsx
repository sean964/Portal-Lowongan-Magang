import { Autocomplete, AutocompleteItem, Button, Card, CardBody, Input, Select, SelectItem, User } from "@heroui/react"
import useLowonganCari from "./useMahasiswaLowongan"
import Link from "next/link"
import { FaMagnifyingGlass } from "react-icons/fa6"


const LowonganCari = () =>{
const {jurusan, lowongan, handleKategori, handleMasa, perusahaan, handlePerusahaan, auto} = useLowonganCari()

return(
    <div className="w-full min-h-screen flex flex-col justify-center items-center  lg:px-20 lg:py-10">
        <Card className="w-full p-8 h-screen">
             <CardBody className="w-full items-center flex flex-col p-10">
                <p className="lg:text-3xl text-2xl font-bold mb-5">Lowongan magang:</p>
                <div className="lg:w-2/5 font-semibold mb-5">
                      <Autocomplete 
                      selectedKey={perusahaan} 
                      onSelectionChange={handlePerusahaan}  
                      defaultItems={auto} 
                      variant="bordered"
                      startContent={<FaMagnifyingGlass  />}
                      label={'Masukkan Perusahaan yang diinginkan'}>
                      
                        {({name})=> <AutocompleteItem key={name} >{name}</AutocompleteItem>}
                      
                      </Autocomplete>
                      <div className="flex gap-3 h-16 items-center justify-between">
                <Select
                    label="kategori"
                    items={jurusan}
                    onChange={handleKategori}
                    variant="bordered"
                    className=""
                  >
                    {({label}) => (
                      <SelectItem key={label}>{label}</SelectItem>
                    )}
                  </Select>
                    <div className="flex gap-2 items-center">
                  <Input type="number" className="w-3/5" label='Durasi' variant="bordered" onChange={handleMasa} />
                  <p>Bulan</p>
                    </div>
                      </div>
                </div>
                  
                
                <div className="lg:w-full w-2/3 flex flex-col lg:grid lg:grid-cols-3 gap-5 text-medium font-semibold">
                {lowongan === undefined ? ( <p>Lowongan pada kategori ini belum ada</p>): lowongan?.map(({photo, judul, masaMagang, kategori, perusahaan, supervisor })=>{
            
            if(photo !==null){
                const baseString = String.fromCharCode(...photo.data)
                const base64 = btoa(baseString)
                const imageUrl = `data:image/jpeg;base64,${base64}`
                return(
                    <Link className="" key={supervisor} href={{pathname:`/mahasiswa/lowongan/[supervisor]`, query:{supervisor: supervisor}}}>
                   <Card className="">
                       <CardBody className="flex items-start gap-2">
                            <User itemType="bordered" avatarProps={{src:imageUrl}} name={`Lowongan : ${judul}`} description={`Perusahaan: ${perusahaan}`}/>
                            <div>
                                <p>Masa magang : {masaMagang}</p>
                                <p>Kategori jurusan : {kategori}</p>
                            </div>
                       </CardBody>
                   </Card>
                    </Link>
                    
                )
                
            }else{
                return(
                    <Link className="" key={supervisor} href={{pathname:`/mahasiswa/lowongan/[supervisor]`, query:{supervisor: supervisor}}}>
                   <Card className="">
                       <CardBody className="flex items-start gap-2">
                            <User itemType="bordered" avatarProps={{src:'/logo/defaultPhoto.jpg'}} name={`Lowongan : ${judul}`} description={`Perusahaan: ${perusahaan}`}/>
                            <div>
                                <p>Masa magang : {masaMagang}</p>
                                <p>Kategori jurusan : {kategori}</p>
                            </div>
                       </CardBody>
                   </Card>
                    </Link>
                )
            }
        })}
                </div>
             </CardBody>
        </Card>
    </div>
    )

}
export default LowonganCari