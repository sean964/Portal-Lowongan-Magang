import { Card, CardBody, User } from "@heroui/react"
import useDosenPerusahaan from "./useDosenPerusahaan"

const DosenPerusahaan = () =>{
const {dosen, perusahaan, judul, photoPerusahaan, supervisorData}=useDosenPerusahaan()

const DosenProfile =()=>{
    if(dosen !== null && dosen !== undefined){
        return(
        dosen.map((dosen)=>{
            if(dosen.dosenPhoto === null){
            return(
                <Card className=" w-1/4 h-fit">
                <CardBody className=" w-full flex flex-col justify-center items-center font-semibold">
                    <User avatarProps={{src:'/logo/default.jpg'}} name={`Dosen Pembimbing : ${dosen.dosen}`}>
                    </User>
                </CardBody>
            </Card>
            )
        }
        if(dosen.dosenPhoto !== null){
            // mengambil kode foto
            const imageData = dosen.dosenPhoto.data
            // mengubah kode foto menjadi string
            const binaryString = String.fromCharCode(...imageData)
            // mengubah string foto menjadi base64
            const base64 = btoa(binaryString)
            const imageUrl = `data:image/jpeg;base64,${base64}`
    
            return(
                <Card className=" w-fit h-fit">
                <CardBody className=" w-full flex flex-col justify-center items-center font-semibold">
                    <User avatarProps={{src:imageUrl}} name={dosen.dosen}>
                    </User>
                </CardBody>
            </Card>
            )
        }
        })
        )

                

    }else{
        return(
            <Card className=" w-fit h-fit">
                <CardBody className=" w-full flex flex-col justify-center items-center font-semibold">
                    <p>Belum mempunyai dosen pembimbing</p>
                </CardBody>
            </Card>
        )
    }
}

const PerusahaanProfile =()=>{
    if(perusahaan !== null){
        if(photoPerusahaan !== null){
            // mengambil kode foto
            const imageData = photoPerusahaan.data
            // mengubah kode foto menjadi string
            const binaryString = String.fromCharCode(...imageData)
            // mengubah string foto menjadi base64
            const base64 = btoa(binaryString)
            const imageUrl = `data:image/jpeg;base64,${base64}`
    
            return(
                <Card className=" w-fit h-fit">
                <CardBody className=" w-full flex mx-2 flex-col justify-center items-start font-semibold">
                    <User avatarProps={{src:imageUrl}} name={`Nama perusahaan : ${perusahaan}`}>
                    </User>
                </CardBody>
            </Card>
            )
        }else{
            return(
                <Card className=" w-1/3 h-fit">
                <CardBody className=" w-full flex mx-2 flex-col justify-center items-start font-semibold">
                    <User avatarProps={{src:'/logo/default.jpg'}} name={`Dosen Pembimbing : ${perusahaan}`}>
                    </User>
                </CardBody>
            </Card>
            )
        }
    }else{
        return(
            <Card className=" w-fit h-fit">
                <CardBody className=" w-full flex flex-col justify-center items-center font-semibold">
                    <p>Perusahaan: belum magang</p>
                </CardBody>
            </Card>
        )
    }
}

const SupervisorProfile =()=>{
    if(supervisorData !== null){
        if(supervisorData.photo !== null){
            // mengambil kode foto
            const imageData = supervisorData.photo.data
            // mengubah kode foto menjadi string
            const binaryString = String.fromCharCode(...imageData)
            // mengubah string foto menjadi base64
            const base64 = btoa(binaryString)
            const imageUrl = `data:image/jpeg;base64,${base64}`
    
            return(
                <Card className=" w-fit h-fit">
                <CardBody className=" w-full flex mx-2 flex-col justify-center items-start font-semibold">
                    <User avatarProps={{src:imageUrl}} name={`Supervisor : ${supervisorData.name}`} description={`Bergabung di : ${judul}`}>
                        Bergabung di : {judul}
                    </User>
                </CardBody>
            </Card>
            )
        }else{
            return(
                <Card className=" w-1/3 h-fit">
                <CardBody className=" w-full flex mx-2 flex-col justify-center items-start font-semibold">
                    <User avatarProps={{src:'/logo/defaultPhoto.jpg'}} name={`Supervisor : ${supervisorData.name}`} description={`Bergabung di : ${judul}`}>
                        Bergabung di : {judul}
                    </User>
                </CardBody>
            </Card>
            )
        }
    }else{
        return(
            <Card className=" w-fit h-fit">
                <CardBody className=" w-full flex flex-col justify-center items-center font-semibold">
                    <p>Supervisor: belum magang</p>
                </CardBody>
            </Card>
        )
    }
}

return(
    <div className="w-full h-fit flex justify-start gap-4 ">
        <DosenProfile/>
        <PerusahaanProfile/>
        <SupervisorProfile/>
    </div>
)
}
export default DosenPerusahaan