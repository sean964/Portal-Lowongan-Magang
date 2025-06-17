import { Button, Card, CardBody, Select, SelectItem } from "@heroui/react"
import useDelete from "./useDelete"
import { FaTrash } from "react-icons/fa"

const Delete = () =>{
const {deleteService1,deleteService2,dosen,mahasiswa,setNim,setNip,setClick,click} = useDelete()
console.log(mahasiswa)
return(
    <div className="w-full h-fit flex items-center justify-center">
        <Card className="lg:w-1/2 lg:h-1/2 w-3/4 h-3/4">
            <CardBody className="w-full h-full font-semibold flex flex-col items-center justify-center gap-10">
                <p className="lg:text-xl text-lg font-bold">Hapus akun dosen dan mahasiswa</p>
                <div className="w-2/3 flex sm:flex-col lg:flex-row items-center gap-3 lg:gap-5">
                    <Select
                    label="Nama Mahasiswa"
                    onChange={(e)=>setNim(e.target.value)}
                    items={mahasiswa}
                    >
                        {({name, nim}) => (
                        <SelectItem key={nim}>
                        {name}
                        </SelectItem>
                    )}
                    </Select>
                    <Button color="primary" onClick={deleteService1} size="md"><FaTrash size={20} /></Button> 
                </div>
                    <div className="w-2/3 flex sm:flex-col lg:flex-row items-center lg:gap-5 gap-3">
                    <Select
                    label="Nama Dosen"
                    onChange={(e)=>setNip(e.target.value)}
                    items={dosen}
                    >
                        {({name, nip}) => (
                        <SelectItem key={nip}>
                        {name}
                        </SelectItem>
                    )}
                    </Select>
                    <Button color="primary" onClick={deleteService2} size="md"><FaTrash size={20} /></Button> 
                    </div>
            </CardBody>
        </Card>
    </div>
                       
)
}
export default Delete