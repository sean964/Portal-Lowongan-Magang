import DosenPerusahaan from "./dosenPerusahaan";
import LogbookMap from "./logbook";
import TableStatus from "./tableStatus";
import useDosenPerusahaan from "./useDosenPerusahaan";

const MahasiswaDashboard = () => {
  const {perusahaan} = useDosenPerusahaan() 
  return (
    <div>
      <DosenPerusahaan/>
      {perusahaan === null ? <TableStatus/> : <LogbookMap/> }
      
    </div>
  );
};

export default MahasiswaDashboard;
