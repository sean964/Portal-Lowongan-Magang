import { Card, CardBody } from "@heroui/react"
import useLogBookMap from "./useLogbookMap"
import Link from "next/link"
import { FaCircleExclamation } from "react-icons/fa6"

const LogbookMap = () =>{
const {logbook} = useLogBookMap()
if(logbook!== null){
    return(
            <div className="w-full h-fit mt-10">
            <p className="text-xl font-bold">Daftar jurnal harian :</p>
        <div className="w-full grid grid-cols-3 mt-5 gap-3 font-semibold text-lg">
            {logbook.map(({judul, date, id, komentar})=>{
                const formattedDate = new Date(date).toLocaleDateString('id-ID')
                return(
                    <Link key={id} href={{pathname:'/logbook/[id]',query:{id:id}}} >
                    <Card className="w-full h-fit p-2">
                        <CardBody className="w-full h-fit flex flex-row items-center">
                            <div className="w-full h-fit">
                            <p>Judul: {judul}</p>
                            <p>Tanggal: {formattedDate}</p>
                            </div>
                            {komentar !== null && <FaCircleExclamation size={30} className="orentext" />}                 
                        </CardBody>
                    </Card>
                    </Link>
                )
            })}
        </div>
            </div>
    )
}else{
    return(
        <p className="text-xl font-bold mt-10">Belum membuat jurnal harian</p>
    )
}

}
export default LogbookMap