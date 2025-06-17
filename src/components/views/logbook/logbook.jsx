import { Button, Card, CardBody, Textarea } from "@heroui/react"
import useLogBook from "./uselogbook"
import { cn } from "../../../../utils/cn"
import { useSession } from "next-auth/react"

const LogBook = ({id}) =>{
const {data:session} = useSession()
const {logbook,click,setClick,handleKomentar,setKomentar} = useLogBook(id)
console.log(logbook)
if(logbook!==undefined){
    const date = new Date(logbook.date).toLocaleDateString('id-ID')
    return(
        <div className="w-full h-fit flex flex-col items-center justify-center relative">
            <Card className="w-2/3 h-fit">
                <CardBody className="w-full flex flex-col h-full p-8 font-semibold text-lg">
                    <p className="w-full text-2xl flex justify-center font-bold mb-10">{logbook.judul}</p>
                    <p className="text-xl mb-5">Tanggal : {date}</p>
                    <p className="text-xl mb-3">Deskripsi jurnal:</p>
                    <div className="w-full border-black border rounded-lg p-4" dangerouslySetInnerHTML={{__html:logbook.deskripsi}} />
                </CardBody>
            </Card>
            
            {session?.user.role === 'mahasiswa' && (
            <Card className={cn("w-1/2 h-fit kegelapan -translate-y-full opacity-0 absolute transition-all",{'-translate-y-0 opacity-100':click===true})}>
                <CardBody className="w-full h-fit flex flex-col p-8 font-semibold">
                    <p className="text-xl font-bold">Komentar dosen : </p>
                    <div className="w-full min-h-72 border-black border rounded-lg p-4" dangerouslySetInnerHTML={{__html:logbook.komentar}} />
                </CardBody>
            </Card>
            )}


            {session?.user.role === 'dosen' && logbook.komentar === null && (
            <Card className={cn("w-1/2 h-fit kegelapan -translate-y-full opacity-0 absolute transition-all",{'-translate-y-0 opacity-100':click===true})}>
                <CardBody className="w-full h-fit flex flex-col p-8 font-semibold gap-4">
                    <p className="text-xl font-bold">Komentar : </p>
                        <Textarea
                        onChange={(e)=>setKomentar(e.target.value)}
                        autoComplete="off"
                        variant="bordered"
                        type="text"
                        label='komentar....'
                        className="resize-y"
                        />
                        <div className="w-full flex justify-center">
                    <Button size="md" color="primary" onClick={handleKomentar} className="w-1/5">Kirim</Button>
                        </div>
                </CardBody>
            </Card>
            )}

            {session?.user.role === 'dosen' && logbook.komentar !== null && (
            <Card className={cn("w-1/2 h-fit kegelapan -translate-y-full opacity-0 absolute transition-all",{'-translate-y-0 opacity-100':click===true})}>
                <CardBody className="w-full h-fit flex flex-col p-8 font-semibold">
                    <p className="text-xl font-bold">Komentar dosen : </p>
                    <div className="w-full min-h-72 border-black border rounded-lg p-4" dangerouslySetInnerHTML={{__html:logbook.komentar}} />
                </CardBody>
            </Card>
            )}



            {session?.user.role === 'dosen' &&(
            <div className={cn("w-full flex mt-5 justify-center transition-all", {'mt-24': click===true})}>
                <Button onPress={()=>setClick(!click)} size="lg" color="primary">Beri komentar</Button>
            </div>
            )}
            {session?.user.role === 'mahasiswa' &&(
            <div className={cn("w-full flex mt-5 justify-center transition-all", {'mt-24': click===true})}>
                <Button onPress={()=>setClick(!click)} size="lg" color="primary">Lihat komentar</Button>
            </div>
            )}
        </div>

    )
}
}

export default LogBook