import { UseCreateRestaurant, UseGetCurrentRestaurant } from '@/Apis/RestaurantApi';
import ManageRestaurantForm from '@/forms/manage-restaurant-form/ManageRestaurantForm';


const ManageRestaurantPage = () => {
  const{CreateRestaurant,isLoading}=UseCreateRestaurant()
  const {Restaurant}=UseGetCurrentRestaurant
  return (
    <>
    
    <ManageRestaurantForm restaurant={Restaurant} onsave={CreateRestaurant} isloding={isLoading}/>
    
    </>
  )
}
export default ManageRestaurantPage;
