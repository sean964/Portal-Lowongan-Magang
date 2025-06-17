import { Card, CardBody } from "@heroui/react"
import useJurnalMahasiswa from "./useJurnalMahasiswa"
import { FaCheckCircle } from "react-icons/fa"
import Link from "next/link"

const JurnalMahasiswa = ({nim}) =>{
const {logbook, mahasiswa} = useJurnalMahasiswa(nim)
if(logbook !== null){
    return(
        <div className="w-full min-h-screen px-14">
            <div className="w-full h-screen">
                <p className="mb-10 font-bold text-2xl">Logbook {mahasiswa} : </p>
                <div className="w-full grid grid-cols-3 gap-5 font-semibold text-md">
                    {logbook.map(({date,judul,id,komentar})=>{
                        const formatDate = new Date(date).toLocaleDateString('id-ID')
                        return(
                            <Link key={id} href={{pathname:"/logbook/[id]",query:{id:id}}}>
                                <Card className="w-full h-fit">
                                    <CardBody className="w-full h-fit flex flex-row items-center px-5">
                                        <div className="w-full h-fit flex flex-col justify-center">
                                        <p>Judul : {judul}</p>
                                        <p>Tanggal Pembuatan : {formatDate}</p>
                                        </div>
                                        {komentar !== null && <FaCheckCircle size={30} className="orentext"/> }
                                    </CardBody>
                                </Card>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

}
export default JurnalMahasiswa