import { Card, CardBody } from "@heroui/react"
import useNilai from "./useNilai"

const Nilai = () =>{
const {nilai} = useNilai()
if(nilai!==null){
    return(
        <div className="w-full  flex justify-center">
        <div className="w-2/3 h-[50vh] rounded-lg shadowCustom">
            <div className="w-full h-full flex flex-col items-start gap-16 bg-white rounded-lg justify-start">
                <p className="oren w-full rounded-t-lg text-3xl font-bold flex justify-center items-center h-1/6">Nilai</p>
                <div className="w-full h-fit flex justify-center ">
                    {nilai?.map(({nilaiSupervisor, nilaiDosen, nilaiTotal})=>(
                         <div key={''} className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 font-semibold text-md lg:text-xl">    
        <span>Nilai Kinerja</span>
        <span>: {nilaiSupervisor}</span>
    
        <span>Nilai Jurnal</span>
        <span>: {nilaiDosen}</span>
        
        <span>Nilai Akhir</span>
        <span>: {nilaiTotal}</span>
        
      </div>
                    ))}
                </div>
            </div>
        </div>
        </div>
    )
}
}
export default Nilai