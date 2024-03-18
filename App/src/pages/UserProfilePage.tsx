import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import {UseUpdateUser} from '@/Apis/UserApi'

const UserProfilePage = () => {
  const {isLoading,updateuser}=UseUpdateUser()
  return <UserProfileForm isLoading={isLoading} onSave={updateuser}/>
  
}

export default UserProfilePage;
