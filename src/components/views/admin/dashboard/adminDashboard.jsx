import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User, chip, Tooltip, Input, Spinner, Select, SelectItem, Button } from "@heroui/react";
import React from "react";
import { IoTrash } from "react-icons/io5";
import useAdminDashboard from "./useAdminDashboard";
import { Controller } from "react-hook-form";
import { FaTrash } from "react-icons/fa";

const AdminDashboard = () => {
  const {eraseService, data,handling,setHandling} = useAdminDashboard()

  const renderCell = React.useCallback((user, columnkey)=>{

    const cellValue = user[columnkey]
    switch(columnkey){
      case "mahasiswa":
          if(user.mahasiswaPhoto !== null){
            const imageString = String.fromCharCode(...user.mahasiswaPhoto.data)
            const base64 = btoa(imageString)
            const photo = user.mahasiswaPhoto? `data:image/jpeg;base64,${base64}`: null
            return(
              <User avatarProps={{src: photo }} description={user.nim} name={cellValue} >
              {user.nim}
            </User>
          )
        }

        return(
              <User avatarProps={{src:'/logo/mahasiswa.jpeg'}} description={user.nim} name={cellValue} >
              {user.nim}
            </User>
        )
        
        case "dosen":
          if(user.dosenPhoto !== null){
            const imageString = String.fromCharCode(...user.dosenPhoto.data)
            const base64 = btoa(imageString)
            const photo = user.dosenPhoto? `data:image/jpeg;base64,${base64}`: null
            return(
              <User avatarProps={{src: photo }} description={user.nip} name={cellValue} >
              {user.nip}
            </User>
          )
        }

        return(
              <User avatarProps={{src:'/logo/dosen.jpeg'}} description={user.nip} name={cellValue} >
              {user.nip}
            </User>
        )

        case 'status':
          return(
            <h1>{user.status}</h1>
          )

        case 'hapus':
          return(
            <Button size="lg" variant="light" color="danger" onClick={(e)=>{
              e.preventDefault()
              eraseService(user.nim)
              setHandling(-1)
            }}>
              <FaTrash size={25} />
            </Button>
          )
        }
  },[])

  const columns = [
    {
      key: "dosen",
      label: "Dosen Pembimbing"
    },
    {
      key:"mahasiswa",
      label:"Mahasiswa"
    },
    {
      key:"status", 
      label:"Status"
    },
    {
      key:"hapus",
      label:"Aksi"
    }
  ]


  return(
    <div className="w-full gap-5 min-h-max flex flex-col justify-center items-center">
      {data !== null ? (
      <Table aria-label="tabel bimbingan" >
      <TableHeader className="w-full grid grid-cols-4" columns={columns}>
        {(column)=> <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data} >
      {(item)=>(
        <TableRow key={item.nim} >
          {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
        </TableRow>
      )}</TableBody>
      </Table>
      ):(
        <p className="font-bold text-xl">Belum membuat relasi bimbingan</p>
      )}
    </div>
  )
};
export default AdminDashboard;
