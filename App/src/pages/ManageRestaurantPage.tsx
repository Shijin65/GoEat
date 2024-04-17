import { UseCreateRestaurant, UseGetCurrentRestaurant, UseUpdateRestaurant } from '@/Apis/MyRestaurantApi';
import ManageRestaurantForm from '@/forms/manage-restaurant-form/ManageRestaurantForm';


const ManageRestaurantPage = () => {
  const{CreateRestaurant,isLoading:Createloading}=UseCreateRestaurant()
  const {restaurant}=UseGetCurrentRestaurant()
  const {UpdateRestaurant,isLoading:updateloading}=UseUpdateRestaurant()

  const Editing=!!restaurant
  return (
    <>
    
    <ManageRestaurantForm restaurant={restaurant} onsave={Editing?UpdateRestaurant:CreateRestaurant} isloding={Createloading || updateloading}/>
    
    </>
  )
}
export default ManageRestaurantPage;
