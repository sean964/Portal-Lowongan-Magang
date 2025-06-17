import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import useDosenDashboard from "./usedosenDashboard";
import React from 'react'
import Image from "next/image";

const DosenDashboard = () => {
  const {mahasiswa} = useDosenDashboard()

    const columns = [
      {
        key:'mahasiswa',
        label:'Mahasiswa'
      },
      {
        key:'nim',
        label:'Nim'
      },
      {
        key:'status',
        label:'status'
      },
    ]

    const renderCell = React.useCallback((item, columnkey)=>{
      switch (columnkey){
        case 'mahasiswa':
          if(item.mahasiswaPhoto !== null){
            // mengambil kode foto
        const imageData = item.mahasiswaPhoto.data
        // mengubah kode foto menjadi string
        const binaryString = String.fromCharCode(...imageData)
        // mengubah string foto menjadi base64
        const base64 = btoa(binaryString)
        const imageUrl = `data:image/jpeg;base64,${base64}`
            return(
              <div className="w-full h-fit flex justify-center items-center">
                <div className="w-fit h-fit flex gap-3">
                <Image src={imageUrl} alt="" width={200} height={200} className="rounded-full w-8 h-8"/>
                <p className="text-lg font-semibold">{item.mahasiswa}</p>
                </div>
              </div>
            )
          }else{
            return(
              <div className="w-full h-fit flex justify-center items-center">
                <div className="w-fit h-fit flex gap-3">
                <Image src={'/logo/defaultPhoto.jpg'} alt="" width={200} height={200} className="rounded-full w-8 h-8"/>
                <p className="text-lg font-semibold">{item.mahasiswa}</p>
                </div>
              </div>
            )
          }

        case 'nim':
          return(
            <div className="w-full flex justify-center">
              <p className="w-fit h-full flex items-center text-lg font-semibold">{item.nim}</p>
            </div>
          )

        case 'status':
          if(item.status === 'Belum Magang'){
            return(
              <div className="w-full flex justify-center items-center">
                <p className="w-fit h-fit px-5 text-lg font-semibold bg-red-300 rounded-2xl">{item.status}</p>
              </div>
            )
          }else{
            return(
              <div className="w-full flex justify-center items-center">
                <p className="w-fit h-fit px-5 text-lg font-semibold bg-green-300 rounded-2xl">{item.status}</p>
              </div>
            )
          }
      }
    })

    if(mahasiswa.length !== 0)
    return (
      <div className="w-full h-fit">
        <Table aria-label="table mahasiswa">
        <TableHeader columns={columns}>
          {(column)=><TableColumn className="text-center" key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={mahasiswa}>
          {(item)=>(
            <TableRow key={item.nim}>
              {(columnKey)=><TableCell>{renderCell(item,columnKey)}</TableCell>}
            </TableRow>
          )}

        </TableBody>
        </Table>
      </div>
    );
  }

export default DosenDashboard;
