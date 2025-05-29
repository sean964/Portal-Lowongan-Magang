import Image from 'next/image';
import UsePhoto from './usePhoto';
import { Button, Card, CardBody, Input } from '@heroui/react';
import useDashboardLayoutSidebar from '@/components/layouts/dashboardLayout/useDashboardLayoutSidebar';

const PhotoInput = () => {
  const { handlePhoto, handleSubmit, preview } = UsePhoto();
  return (
    <div className='flex flex-col w-full h-screen items-center justify-center'>
     <Card className="m-10">
              <CardBody className="flex w-full flex-col items-center justify-center px-10 py-8 gap-4">
      {preview &&(
        <div className='w-48 h-48 rounded-full'>
          <Image src={preview} alt='' width={10000} height={10000} className='rounded-full w-full h-full object-cover'/>
        </div>
      )}
    <form onSubmit={handleSubmit} className='w-full flex flex-col items-center gap-4'>
      <Input type="file" accept='image/*' onChange={handlePhoto} variant='bordered' label='Masukkan Foto' />
      <Button color='primary' type="submit">kirim</Button>
    </form>
              </CardBody>
          </Card>
      </div>
  );
};

export default PhotoInput;
