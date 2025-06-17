import { useRouter } from "next/router"
import { useEffect } from "react"
import { MdArrowCircleLeft } from "react-icons/md"

const BackButton = ({path}) => {
    const route = useRouter()

        const handleBack =() =>{
            if(path === undefined){
                route.back()
            }else(
                route.push(`/${path}`)
            )
        }


return(
    <button className="fixed z-50 lg:left-[320px] left-3 top-1/2 opacity-75 hover:opacity-100 transition-all buton" onClick={handleBack}>
        <MdArrowCircleLeft size={48} className="text-primary-700" />
    </button>
)
}

export default BackButton