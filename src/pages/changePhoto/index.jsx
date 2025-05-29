import BackButton from "@/components/commons/backButton"
import PageHaead from "@/components/commons/pageHead"
import PhotoInput from "@/components/views/update/photo/photo"


const changePhoto = () =>{

return(
    <>
    <PageHaead title={'Ganti Foto'} />
    <BackButton />
    <PhotoInput />
    </>
)
}

export default changePhoto