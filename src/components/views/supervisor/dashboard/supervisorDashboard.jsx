import { Card, CardBody } from "@heroui/react";
import useSuprvisorDashboard from "./useSupervisorDashboard";

const SupervisorDashboard = () => {
  const {supervisor} = useSuprvisorDashboard()
  return(
    supervisor?.map(({judul, perusahaan})=>{
      return(
        <div key={judul} className="w-full font-bold  text-md flex text-center flex-row gap-5 mb-5">
          <Card className="w-2/5 px-2">
            <CardBody className="w-full flex flex-col items-center">
              <p>Nama perusahaan</p>
              <p className="text-2xl">{perusahaan}</p>
            </CardBody>
          </Card>
          <Card className="w-2/5 px-2">
            <CardBody className="w-full flex flex-col items-center px-2">
          <p>Ditugaskan di lowongan</p>
          <p className="text-2xl">{judul}</p>
            </CardBody>
          </Card>
        </div>
      )
    })

  )
};

export default SupervisorDashboard;
