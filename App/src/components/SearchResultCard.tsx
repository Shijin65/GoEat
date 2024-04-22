import { Restaurant } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";

type Props = {
  restaturant: Restaurant;
};

const SearchResultCard = ({ restaturant }: Props) => {
  return (
    <Link
      to={`/details/${restaturant._id}`}
      className="grid lg:grid-cols-[2fr_3fr]  gap-5 group"
    >
      <AspectRatio ratio={16/6}>
        <img
          src={restaturant.imageUrl}
          className="rounded-md w-full h-full object-cover"
          alt=""
        />
      </AspectRatio>
      <div id="card-content" className="grid md:grid-cols-2 gap-2">
        <span>
          <h3 className="text-xl font-bold underline">{restaturant.restaurantName}</h3>
          <div className="flex flex-row flex-wrap ">
          {restaturant.cuisines.map((item, index) => (
            <span key={index} className="flex">
              <span>{item}</span>
              {index < restaturant.cuisines.length - 1 && <Dot/>}
            </span>
          ))}
        </div>
        </span>
        
        <div className="flex gap-2 flex-col">
          <div className="flex items-center gap-2 ">
                <Clock className="text-green-600"/>
                {restaturant.deliveryTime}
          </div>
          <div className="flex items-center gap-2 ">
                <Banknote/>
                Delivery from ₹{(restaturant.deliveryCharge/100).toFixed(2)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
