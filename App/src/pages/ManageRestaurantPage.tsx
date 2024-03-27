import { UseCreateRestaurant, UseGetCurrentRestaurant } from '@/Apis/RestaurantApi';
import ManageRestaurantForm from '@/forms/manage-restaurant-form/ManageRestaurantForm';


const ManageRestaurantPage = () => {
  const{CreateRestaurant,isLoading}=UseCreateRestaurant()
  const {restaurant}=UseGetCurrentRestaurant()
  return (
    <>
    
    <ManageRestaurantForm restaurant={restaurant} onsave={CreateRestaurant} isloding={isLoading}/>
    
    </>
  )
}
export default ManageRestaurantPage;
