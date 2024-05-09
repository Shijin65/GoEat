import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import {UseGetCurrentUser, UseUpdateUser} from '@/Apis/UserApi'
import LoadingSpinner from "@/components/LoadingSpinner";

const UserProfilePage = () => {
  const {isLoading:getloading,currentUser}=UseGetCurrentUser()
  const {isLoading:updateloading,updateuser}=UseUpdateUser()

  if (getloading) {
    return <LoadingSpinner/>
  }

  if(!currentUser){
    return <span>Unable to load user profile</span>
  }
  return <UserProfileForm  currentUser={currentUser} isLoading={updateloading} onSave={updateuser}/>
  
}

export default UserProfilePage;
