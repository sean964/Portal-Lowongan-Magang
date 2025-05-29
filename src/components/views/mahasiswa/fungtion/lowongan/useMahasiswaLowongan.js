import { useEffect, useState } from 'react';
import { NEXT_PUBLIC_API_URL } from '../../../../../../environment/env';


const useLowonganCari = () =>{
    const [kategori, setKategori] = useState('')
    const [lowongan, setLowongan] = useState([])
    const [masa, setMasa] = useState(0)
    const [auto, setAuto] = useState([])
    const [perusahaan, setPerusahaan] = useState(null)
    
    // ambil nama perusahaan untuk autocomplete
    const fetchAutoComplete = async () =>{
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/perusahaan`)
        const json = await res.json()
        setAuto(json.perusahaan)
    }
    // fetch 1 identifier
    const fetchKategori = async (kategori) =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/lowonganMahasiswa?kategori=${kategori}`)
    const json = await res.json()
    return json.data
    }

    const fetchMasa = async (masa) =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/lowonganMahasiswa?masaMagang=${masa}`)
    const json = await res.json()
    return json.data
    }
    
    const fetchPerusahaan = async (perusahaan) =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/lowonganMahasiswa?perusahaan=${perusahaan}`)
    const json = await res.json()
    return json.data
    }

    // fetching 2 identifier
    const fetchMasaKategori = async (masa, kategori) =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/lowonganMahasiswa?masaMagang=${masa}&kategori=${kategori}`)
    const json = await res.json()
    return json.data
    }

    const fetchMasaPerusahaan = async (masa, perusahaan) =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/lowonganMahasiswa?masaMagang=${masa}&perusahaan=${perusahaan}`)
    const json = await res.json()
    return json.data
    }
    
    const fetchPerusahaanKategori = async (perusahaan, kategori) =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/lowonganMahasiswa?perusahaan=${perusahaan}&kategori=${kategori}`)
    const json = await res.json()
    return json.data
    }

    // fetching 3 identifier
    const fetchAll = async (perusahaan, kategori, masa) =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/lowonganMahasiswa?perusahaan=${perusahaan}&kategori=${kategori}&masaMagang=${masa}`)
    const json = await res.json()
    return json.data
    }


    // fetch default
    const fetchDefault = async () =>{
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/get/lowonganMahasiswa`)
    const json = await res.json()
    return json.data
    }

const handleKategori = (e) =>{
    const category = e.target.value
    setKategori(category)
}

const handleMasa = (e) =>{
    setMasa(parseInt(e.target.value,10)|0)
}

const handlePerusahaan = (key) =>{
    setPerusahaan(key)
}


const fetching = async () =>{
        let result
        // 1 identifier
        if(kategori && masa===0 && perusahaan === null){
            result = await fetchKategori(kategori)
        }
        if(masa && kategori=== '' && perusahaan === null){
            result = await fetchMasa(masa)
        }
        if(perusahaan && kategori === '' && masa === 0){
            result = await fetchPerusahaan(perusahaan)
        }

        // 2 identifier
        if(masa && kategori && perusahaan === null){
            result = await fetchMasaKategori(masa, kategori)
        }
        if(kategori && perusahaan && masa === 0){
            result = await fetchPerusahaanKategori(perusahaan, kategori)
        }
        if(perusahaan && masa && kategori === ''){
            result = await fetchMasaPerusahaan(masa, perusahaan)
        }

        // 3 identifier
        if(perusahaan && masa && kategori){
            result = await fetchAll(perusahaan, kategori, masa)
        }

        // default
        if(perusahaan === null && masa === 0 && kategori === ''){
            result = await fetchDefault()
        }
        
        setLowongan(result)
    }

useEffect(()=>{
    fetchAutoComplete()
    fetching()
    if(lowongan?.length !==0) return

        const interval = setInterval(()=>{fetching()},1000)
        return ()=> clearInterval(interval)
},[kategori, masa, perusahaan])



    const jurusan = [
    { label: 'Teknik Sipil' },
    { label: 'Teknologi Pangan' },
    { label: 'Teknik Metalurgi' },
    { label: 'Teknik Sistem Energi' },
    { label: 'Teknik Arsitektur' },
    { label: 'Matematika' },
    { label: 'Sistem Informasi' },
    { label: 'Sains Akurturia' },
    { label: 'Sains Data' },
    { label: 'Ilmu komputer' },
    { label: 'bioteknologi' },
  ];

  return{
    jurusan,
    lowongan,
    kategori,
    handleKategori,
    handleMasa,
    perusahaan,
    handlePerusahaan,
    auto
  }

}

export default useLowonganCari