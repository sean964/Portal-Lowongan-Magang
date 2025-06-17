import { useState } from 'react';
import { NEXT_PUBLIC_API_URL } from '../../../../../environment/env';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import useDashboardLayoutSidebar from '@/components/layouts/dashboardLayout/useDashboardLayoutSidebar';

const UsePhoto = () => {
  const router = useRouter()
  const [preview, setPreview] = useState(null);
  const [photo, setPhoto] = useState(null)
    const {data:session, status} = useSession()
      if (status === 'loading') {
    return <>loading...</>;
  }
  if (status === 'unauthenticated') {
    return <>belum login</>;
  }

  const email = session.user.email
  const role = session.user.role

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (!file) {
      setPreview(null);
      return;
    }

      
      if (file && file.type.startsWith('image/')) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  console.log('check',photo?.size)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const MAX_FILE_SIZE = 120000;
    if(photo.size > MAX_FILE_SIZE) return toast.error('Ukuran foto Lebih Dari 1 MB')
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('email', email)
    formData.append('role', role)
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/upPhoto`, {
        method: 'PUT',
        body: formData,
      });
      if (res.ok) {
        const json = await res.json();
        toast.success(json.message)
        router.push('/')
      } else {
        toast.error('gagal mengupload foto')
      }
    } catch (error) {
      toast.error('gagal mengupload foto')      
    }
  };


  return {
    handlePhoto,
    handleSubmit,
    preview
  };
};

export default UsePhoto;
