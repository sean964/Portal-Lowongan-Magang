import { Controller } from 'react-hook-form';
import {
  Button,
  Card,
  CardBody,
  DateInput,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Spinner,
} from '@heroui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import useRegisterMahasiswa from './useRegister';
import { cn } from '../../../../../../utils/cn';
import Image from 'next/image';
import Link from 'next/link';

const RegisterMahasiswa = () => {
  const {
    handleRegister,
    isPending,
    visibleConfirm,
    visiblePass,
    handleVisibleConfirm,
    handleVisiblePass,
    handleSubmit,
    control,
    gender,
    jurusan,
    errors,
    handleExcel,
    handleSubmitExcel,
    xl,
    setXl
  } = useRegisterMahasiswa();

  return (
    <div className={cn("flex flex-col min-h-screen w-full relative items-center overflow-hidden py-5 justify-start gap-10",{'min-h-[150vh]':xl===false})}>
      <div className={cn('flex w-fit h-fit relative bg-white p-1 rounded-full transition-all cursor-pointer shadowCustom')}>
        <div className={cn('w-1/2 h-3/4 bg-black absolute rounded-full z-0 transition-all bg-primary ', {'translate-x-[3.3rem]':xl===true})}></div>
        <div className="absolute z-10 flex w-fit h-fit px-2 items-center gap-3 relative font-bold text-lg">
        <p onClick={()=>setXl(false)} className={cn('text-black transition-all',{'text-white':xl===false})}>Form</p>
        <p onClick={()=>setXl(true)} className={cn('text-black transition-all',{'text-white':xl===true})}>Excel</p>
        </div>
      </div>
      
      <div className={cn('absolute transition-all my-20',{'translate-x-[50rem]' :xl===true})}>
        <Card className="">
          <CardBody className="flex w-full flex-col items-center justify-center px-10 py-8">
            <Image
              className="mb-2"
              src="/logo/logoIth.png"
              width={30}
              height={30}
              alt=""
            />
            <h2 className="mb-2 text-2xl font-bold text-primary-500">
              Register Mahasiswa
            </h2>
            
            <form
              onSubmit={handleSubmit(handleRegister)}
              className={cn(
                'flex flex-col',
                Object.keys(errors).length > 0 ? 'gap-2' : 'gap-4'  
              )}
            >
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="nama mahasiswa"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.name !== undefined}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="nim"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    label="nim mahasiswa"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.nim !== undefined}
                    errorMessage={errors.nim?.message}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    label="email mahasiswa"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.email !== undefined}
                    errorMessage={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="adress"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="alamat mahasiswa"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.adress !== undefined}
                    errorMessage={errors.adress?.message}
                  />
                )}
              />

              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    label="jenis kelamin"
                    {...field}
                    isInvalid={errors.gender !== undefined}
                    errorMessage={errors.gender?.message}
                    items={gender}
                  >
                    {(gender) => (
                      <SelectItem key={gender.label}>{gender.label}</SelectItem>
                    )}
                  </Select>
                )}
              />

              <Controller
                name="jurusan"
                control={control}
                render={({ field }) => (
                  <Select
                    label="jurusan mahasiswa"
                    {...field}
                    isInvalid={errors.jurusan !== undefined}
                    errorMessage={errors.jurusan?.message}
                    items={jurusan}
                  >
                    {(jurusan) => (
                      <SelectItem key={jurusan.label}>
                        {jurusan.label}
                      </SelectItem>
                    )}
                  </Select>
                )}
              />

              <Controller
                name="angkatan"
                control={control}
                render={({ field }) => (
                  <Input 
                  {...field}
                  type='number'
                  variant='bordered'
                  label='Tahun angkatan'
                  isInvalid={errors.angkatan !== undefined}
                  errorMessage={errors.angkatan?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type={visiblePass ? 'text' : 'password'}
                    label="Password"
                    variant="bordered"
                    autoComplete="off"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={() => handleVisiblePass('password')}
                      >
                        {visiblePass ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    }
                    isInvalid={errors.password !== undefined}
                    errorMessage={errors.password?.message}
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type={visibleConfirm ? 'text' : 'password'}
                    label="Confirm Password"
                    variant="bordered"
                    autoComplete="off"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={() => handleVisibleConfirm('password')}
                      >
                        {visibleConfirm ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    }
                    isInvalid={errors.confirmPassword !== undefined}
                    errorMessage={errors.confirmPassword?.message}
                  />
                )}
              />

              <Button color="primary" size="lg" type="submit">
                {isPending ? <Spinner color="white" size="sm" /> : 'Register'}
              </Button>
            </form>
          </CardBody>
        </Card>
      </div> 

        <div className={cn('absolute transition-all my-20',{'-translate-x-[50rem]':xl===false})}>
        <Card className='w-80 h-fit'>
          <CardBody className='w-full h-full flex flex-col items-center justify-start px-8 py-8'>
                <div>
                  <Image
                    className="mb-2"
                    src="/logo/logoIth.png"
                    width={30}
                    height={30}
                    alt=""
                  />
                </div>
                <p className='font-bold flex justify-center text-2xl mb-5 text-primary-500'>Registrasi Mahasiswa</p>
                <p className='text-md text-center font-medium mb-3'>Registrasi mahasiswa dengan menggunakan file excel yang telah diformat khusus dibawah ini</p>
                <Link className='mb-3' href={'/api/download'}><Button color='primary' size='sm'>Download</Button></Link>
                <div className='flex flex-col h-fit items-center mb-4 gap-2 font-semibold'>
                <p className='flex items-center'>Masukkan file excel</p>
                <Input 
                className='w-1/2'
                onChange={handleExcel}
                type='file'
                accept=".xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                variant='bordered'
                />
                </div>
                <Button onClick={handleSubmitExcel} color='primary' size='lg'>Register</Button>

          </CardBody>
        </Card>
      </div>


    </div>
  );
};

export default RegisterMahasiswa;
