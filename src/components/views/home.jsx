import Link from "next/link";
import useHome from "./useHome"
 const Pagination = ({ totalHalaman, halamanSaatIni, setHalaman }) =>{
    const buttons = [];
    for (let i = 1; i <= totalHalaman; i++) {
        console.log(i)
        buttons.push(
            <button
                key={i}
                onClick={() => setHalaman(i)}
                className={i === halamanSaatIni ? 'px-2 transiton-all py-1 bg-primary rounded-lg text-white' : 'px-2 transition-all py-1 bg-white rounded-lg text-primary'}
            >
                {i} 
            </button>
        );
    }
    return <div className="w-full h-fit justify-center flex mt-8 gap-4 text-lg font-bold">{buttons}</div>;
}

const HomePage = () =>{
const {halaman,loading,lowongan,setHalaman,totalHalaman} = useHome()

 return (
        <div className="w-full min-h-screen bg">
            <section className="navbar flex justify-end items-center px-16">
                <Link href={'/auth/login'} className="font-bold tracking-wide text-xl text-white">Login</Link>
            </section>
            <section className="main">

                <div className="deskripsi-container w-2/3 mb-10 h-[30vh]">
                    <p className="text-white text-lg py-7 text-bayang px-16">Program ini adalah buatan anak Institut Teknologi Bacharuddin Jusuf Habibie, dengan tujuan untuk mempermudah seluruh elemen yang berkaitan dalam proses magang mahasiswa diantaranya adalah dosen, mahasiswa, dan perusahaan. Program ini berjalan di website sehingga dapat dijangkau oleh seluruh masyarakat dan tidak dipungut biaya. Cara kerja program ini juga dibuat sedemikian rupa sehingga dapat mencegah kesalahan yang mungkin terjadi dalam penggunaannya</p>
                </div>
                            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="w-full h-[60vh]">
                <div className="w-full h-fit px-16 pt-8 grid grid-cols-4 gap-5" id="card-container">
                    {lowongan.length > 0 ? (
                        lowongan.map((lowongan)=>{
                            return(
                            <Link href={'/auth/login'} key={lowongan.supervisor}>
                            <div className="w-full h-full bg-white rounded-xl overflow-hidden">
                                <p className="h-12 justify-center flex items-center bg-primary text-lg text-white font-semibold">{lowongan.perusahaan}</p>
    <div className="grid grid-cols-[auto_1fr] gap-x-1 font-semibold text-md p-2">    
    <span>Judul</span>
    <span>: {lowongan.judul}</span>

    <span>Kategori</span>
    <span>: {lowongan.kategori}</span>
    
    <span>Masa magang</span>
    <span>: {lowongan.masaMagang} Bulan</span>
    
    <span>Dibutuhkan</span>
    <span>: {lowongan.dibutuhkan}</span>

  </div>
                            </div>
                            </Link>
                            )
                        })
                    ) : (
                        <p>Tidak ada produk untuk ditampilkan.</p>
                    )}
                </div>
                            <Pagination 
                totalHalaman={totalHalaman} 
                halamanSaatIni={halaman}
                setHalaman={setHalaman}
                />
            </div>
            )}
            </section>
        </div>
    );

}

export default HomePage