import PageHaead from "@/components/commons/pageHead"
import DashboardLayout from "@/components/layouts/dashboardLayout/dashboardLayout"
import Delete from "@/components/views/admin/fungtion/delete/delete"

const DeletePage = () =>{
return(
    <>
    <DashboardLayout type={'admin'} title={'Admin | Hapus Akun'}>
    <PageHaead title={'Admin | Hapus Akun'} />
    <Delete/>
    </DashboardLayout>
    </>
)
}
export default DeletePage