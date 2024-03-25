import { UseCreateRestaurant } from '@/Apis/RestaurantApi';
import ManageRestaurantForm from '@/forms/manage-restaurant-form/ManageRestaurantForm';


const ManageRestaurantPage = () => {
  const{CreateRestaurant,isLoading}=UseCreateRestaurant()
  return (
    <>
    
    <ManageRestaurantForm onsave={CreateRestaurant} isloding={isLoading}/>
    
    </>
  )
}
export default ManageRestaurantPage;
