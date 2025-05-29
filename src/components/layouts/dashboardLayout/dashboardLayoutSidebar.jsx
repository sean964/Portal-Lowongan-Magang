import { cn } from "../../../../utils/cn"
import { Button, sty } from "@heroui/react"
import { signOut } from "next-auth/react"
import Image from "next/image"
import { CiLogout } from "react-icons/ci"
import Link from "next/link"
import useDashboardLayoutSidebar from "./useDashboardLayoutSidebar"
import { useRouter } from "next/router"
import { FaCamera } from "react-icons/fa";


const DashboardLayoutSidebar = ({isOpen, sidebarItems}) => {

    const {
    photo,
    user,
    hover,
    setHover} = useDashboardLayoutSidebar()
    const router = useRouter()



    return(
        <div className={cn("fixed font-semibold -translate-x-full shadowCustom lg:-translate-x-0 lg:relative z-50 flex items-center h-screen w-full max-w-[300px] flex-col justify-between border-r-1 border-default-200 bg-white px-4 py-8 transition-all",
                {'translate-x-0':isOpen}
                )}>
                    <div className="flex flex-col items-center">
                        <div onMouseEnter={()=>setHover(!hover)} onMouseLeave={()=>setHover(!hover)} className="w-36 h-36 mb-4 relative rounded-full">
                            <div className={cn('transition-all opacity-0 absolute rounded-full items-center justify-center gap-5 flex w-full h-full overflow-hidden back', {'opacity-100': hover})}>
                                <Link className={cn("oren w-1/3 transition-all -rotate-180 -translate-x-full rounded-full flex items-center justify-center h-1/3",{'translate-x-0 rotate-0':hover})} href={'/changePhoto'}><FaCamera size={30}/></Link>
                            </div>
                        {photo !== ''?(
                            <Image 
                            src={photo}
                            alt="/logo/defaultPhoto.jpg"
                            width={170}
                            height={170}
                            className="rounded-full w-full h-full object-cover"
                            />
                        ):(
                            <Image 
                            src={'/logo/defaultPhoto.jpg'}
                            alt="/logo/defaultPhoto.jpg"
                            width={170}
                            height={170}
                            className="rounded-full w-full h-full object-cover"
                            />
                        )}
                            
                        </div>
                            <p className="text-xl text-center ">Selamat Datang {user.name} </p>
                            {user.nim || user.nip ?<p className="flex">{user.nim? `nim: ${user.nim}`:`nip: ${user.nip}`}</p> :null}
                    </div>
                            
                    <div className="w-full">
                        {sidebarItems.map(({key, label, href, icon})=>(
                                <Link key={key} href={href} className="flex gap-8 items-center my-1 w-full h-12 text-lg toOren transition-all p-3 rounded-lg text-black">
                                    <p className="scale-125">{icon}</p>
                                    <p>{label}</p>
                                </Link>
                            ))}
                    </div>

                    <Button 
                        color="danger" 
                        fullWidth 
                        variant="light" 
                        className="flex justify-start rounded-lg hover:translate-x-2 transition-all"
                        onPress={()=> {
                            signOut()
                            router.push('/auth/login')
                        }}
                        href="/auth/login" 
                        >
                            <CiLogout/>
                            LogOut
                    </Button>
        </div>)
}

export default DashboardLayoutSidebar