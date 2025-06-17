import { Button, Card, CardBody } from "@heroui/react"
import usePendaftarForm from "./usePendaftarForm"
import { useSession } from "next-auth/react"


const PendaftarForm = ({supervisor, nim}) =>{
const {pdf, pendaftar, handleClick, click, handleTerima, handleTolak, mahasiswa} = usePendaftarForm(supervisor, nim)
const {data:session} = useSession()
console.log(pendaftar)
return(
    pendaftar.map(({pendaftar, supervisor, alasan, angkatan, adress, jurusan, email, status})=>{
        return(
            <div key={supervisor} className="w-full flex flex-col gap-5 items-center justify-center py-10 min-h-screen ">
                        <Card className="w-4/5 h-full min-h-screen p-8">
                        <CardBody className="w-full flex flex-col h-full">
                            <div className="w-full mb-16 flex justify-center text-3xl font-bold">
                                <h1>Surat Lamaran Magang</h1>
                            </div>
                        <div className="w-full mb-20">
  <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 font-semibold text-md lg:text-lg">    
    <span>Nama</span>
    <span>: {pendaftar}</span>
    <span>Nim</span>
    <span>: {nim}</span>
    
    <span>Alamat</span>
    <span>: {adress}</span>
    
    <span>Angkatan</span>
    <span>: {angkatan}</span>
    
    <span>Email</span>
    <span>: {email}</span>
    
    <span>Jurusan</span>
    <span>: {jurusan}</span>
  </div>
</div>
                        
                        <div dangerouslySetInnerHTML={{__html: alasan}}/>
                        
                        </CardBody>     
                        </Card>

                        {click && (
                            <Card className="w-4/5 min-h-screen">
                                <CardBody className="w-full h-screen flex flex-col">
                                <iframe 
                                src={pdf}
                                style={{width: '100%', height:'100vh'}}
                                className="rounded-xl"
                                />
                                </CardBody>
                            </Card>
    
                        )}
                        <div className=" w-full justify-center flex gap-10 ">
                            {session?.user.role === 'supervisor' ? mahasiswa === null ? status === 'Menunggu' ? (
                            <Button onClick={handleTolak} color="danger" size="lg" className="font-bold">Tolak</Button>
                        ): null : null :null }


                        {pdf !== null ? (<Button className="font-bold" color="primary" size="lg" onPress={handleClick} >{!click ? 'Lihat CV' : 'Tutup CV'}</Button>              
                        ): null}

                        {session?.user.role === 'supervisor' ? mahasiswa === null ? status === 'Menunggu' ? (
                            <Button onClick={handleTerima} color="success" size="lg" className="font-bold">Terima</Button>
                        ): null : null : null}
                        
                        </div>

                    </div>
        )
    })
)
}
export default PendaftarForm