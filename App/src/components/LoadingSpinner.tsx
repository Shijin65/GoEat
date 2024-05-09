import { ClipLoader } from "react-spinners";

const LoadingSpinner = ( ) => {
return(
    <>
     <div className="flex items-center justify-center h-[60vh] ">
        <span className="flex items-center gap-2 text-lg text-blue-500 tracking-tighter ">
          <ClipLoader color="#368dd6" size={25} />
          <h3 className="animate-pulse">Loading...</h3>
        </span>
      </div></>
)
}

export default LoadingSpinner;