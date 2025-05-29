import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User, chip, Tooltip, Input, Spinner, Select, SelectItem } from "@heroui/react";
import React from "react";
import { IoTrash } from "react-icons/io5";
import useAdminDashboard from "./useAdminDashboard";
import { Controller } from "react-hook-form";

const AdminDashboard = () => {
  const {control, handleErase, handleSubmit, isPending, data} = useAdminDashboard()

  const renderCell = React.useCallback((user, columnkey)=>{

    const cellValue = user[columnkey]
    switch(columnkey){
      case "mahasiswa":
          if(user.mahasiswaPhoto !== null){
            const imageString = String.fromCharCode(...user.mahasiswaPhoto.data)
            const base64 = btoa(imageString)
            const photo = user.mahasiswaPhoto? `data:image/jpeg;base64,${base64}`: null
            console.log('check photo', photo)
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
          return(
            <User avatarProps={{src:'/logo/dosen.jpeg'}} description={user.nip} name={cellValue} >
            {user.nip}
          </User>
          )

        case 'status':
          return(
            <h1>{user.status}</h1>
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
    }
  ]


  return(
    <div className="w-full gap-5 min-h-max flex flex-col justify-center items-center">
      <Table aria-label="tabel bimbingan" >
      <TableHeader columns={columns}>
        {(column)=> <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data} >{(item)=>(
        <TableRow key={item.nim} >
          {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
        </TableRow>
      )}</TableBody>
      </Table>
      <form className="w-full flex" onSubmit={handleSubmit(handleErase)}>

      <Controller control={control} name="nim" render={({field})=>(
        <Select
        className="w-1/2"
        label="Hapus Relasi Bimbingan"
        {...field}
        items={data}
        >
                    {data.map((data) => (
                        <SelectItem key={data.nim}>
                        {data.mahasiswa}
                      </SelectItem>
                    ))}
                  </Select>
      )}/>

      <button type="submit" className="
      " >{isPending? <Spinner color="primary" size="20" /> : <IoTrash color="danger" size={30}/>}</button>
        </form>
    </div>
  )
};
export default AdminDashboard;
