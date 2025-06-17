import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react"
import React from 'react'
import useTableStatus from "./useTableStatus"

const TableStatus = () =>{
const {status} = useTableStatus()

    const columns = [
        {
          key: "Perusahaan",
          label: "Perusahaan"
        },
        {
          key:"Supervisor",
          label:"Email supervisor"
        },
        {
          key:"Judul", 
          label:"Judul Lowongan"
        },
        {
          key:"Status", 
          label:"Status"
        }
      ]
    
      const renderCell = React.useCallback((item, columnKey)=>{
       
        switch(columnKey){
            case "Perusahaan":
                return(
                    <p>{item.perusahaan}</p>
                )
            
            case "Supervisor":
                return(
                    <p>{item.supervisor}</p>
                )
            
            case "Judul":
                return(
                    <p>{item.judul}</p>
                )
    
            case "Status":
                return(
                    <p>{item.status}</p>
                )
        }
      },[])
    
      return(
        <div className="w-full my-5 gap-5 min-h-max flex flex-col justify-center items-center">
              <Table aria-label="tabel bimbingan" >
              <TableHeader columns={columns}>
                {(column)=> <TableColumn key={column.key}>{column.label}</TableColumn>}
              </TableHeader>
              <TableBody items={status} >{(item)=>(
                <TableRow key={item.judul} >
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}</TableBody>
              </Table>
        </div>
      )
}


export default TableStatus