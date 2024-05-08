import landing from '../assets/landing.png'
import appDownload from '../assets/appDownload.png'
import SearchBar, { SearchForm } from '@/components/SearchBar'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
const HomePage = () => {
    const {user}=useAuth0()
    const navigate = useNavigate()
    const handleSearchSubmit =(searchformvalue: SearchForm)=>{
        navigate({
            pathname:`/search/${searchformvalue.searchQuery}`
        })
    }
    useEffect(()=>{
        const currentuser = localStorage.getItem("currentUser")
        if(currentuser){
                // user=currentuser
        }
    },[])
  return (
    <div className="flex flex-col gap-12">
        <div className="md:px-32 bg-white shadow-lg py-4 -mt-16 rounded-md flex flex-col text-center gap-4">
            <h1 className="text-lg sm:text-3xl md:text-5xl font-semibold text-orange-600 tracking-tight ">
                New way of your takeaway
            </h1>
            <span className="text-md sm:text-lg md:text-xl">Hot and Cold food on your door step!</span>
            <SearchBar placeHolder='Search by City or Town' onSubmit={handleSearchSubmit} />
        </div>
        <div className="grid md:grid-cols-2">
            <img src={landing} alt="image" />
            <div className='flex flex-col justify-center items-center text-center gap-4'>
                <span className='text-3xl font-bold tracking-tighter gap-4 select-none'>Order takeaway even faster!</span>
                <span>Download the GoEat app from playstore and apple store for faster ordering and personalised recommentations </span>
                <img src={appDownload}/>
            </div>
        </div>
    </div>
  )
}

export default HomePage