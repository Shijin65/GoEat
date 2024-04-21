import { Link } from "react-router-dom";


type Props = { 
    total:number,
    city:string,
    
}

const SearchResultInfo = ({total,city}: Props ) => {
    return(
        <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
            <span >
                {total} Restaurant Found in {city}
            <Link to="/" className="ml-1 text-sm font-semibold text-blue-400 underline cursor-pointer " >Change loction</Link>
            </span>

            
        </div>
    )

}

export default SearchResultInfo;