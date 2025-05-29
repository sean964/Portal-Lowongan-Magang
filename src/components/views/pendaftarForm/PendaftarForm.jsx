import { Button, Card, CardBody } from "@heroui/react"
import usePendaftarForm from "./usePendaftarForm"
import { useSession } from "next-auth/react"


const PendaftarForm = ({supervisor, nim}) =>{
const {pdf, pendaftar, handleClick, click, handleTerima, handleTolak, mahasiswa} = usePendaftarForm(supervisor, nim)
const {data:session} = useSession()
console.log(mahasiswa)
return(
    pendaftar.map(({pendaftar, supervisor, alasan, birth, adress, jurusan, email, status})=>{
        const formattedBirth = new Date(birth).toLocaleDateString('id-ID')
        return(
            <div key={supervisor} className="w-full flex flex-col gap-5 items-center justify-center py-10 min-h-screen ">
                        <Card className="w-4/5 h-full min-h-screen p-8">
                        <CardBody className="w-full flex flex-col h-full">
                            <div className="w-full mb-16 flex justify-center text-3xl font-bold">
                                <h1>Form Pendaftaran {pendaftar}</h1>
                            </div>
                        <div className="flex mb-20 text-lg font-medium gap-2">
                            <div>
                            <p>nim</p>
                            <p>Tanggal Lahir</p>
                            <p>Alamat</p>
                            <p>Jurusan</p>
                            <p>Email</p>
                            </div>
                            <div>
                            <p>: {nim}</p>
                            <p>: {formattedBirth}</p>
                            <p>: {adress}</p>
                            <p>: {jurusan}</p>
                            <p>: {email}</p>
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

                        {session.user.role === 'supervisor' ? mahasiswa === null ? status === 'Menunggu...' ? (
                            <Button onClick={handleTerima} color="success" size="lg" className="font-bold">Terima</Button>
                        ): null : null : null}
                        
                        </div>

                    </div>
        )
    })
)
}
export default PendaftarForm