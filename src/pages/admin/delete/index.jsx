import BackButton from "@/components/commons/backButton"
import PageHaead from "@/components/commons/pageHead"
import Delete from "@/components/views/admin/fungtion/delete/delete"

const DeletePage = () =>{
return(
    <>
    <PageHaead title={'Admin | Hapus Akun'} />
    <BackButton/>
    <Delete/>
    </>
)
}
export default DeletePage