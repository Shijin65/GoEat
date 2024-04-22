import { Request, Response } from "express";
import Restaurant from "../model/RestaurantSchema";

const getRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.restaurantId;
    const restaurantdata = await Restaurant.findById(restaurantId);
    if (!restaurantdata) {
      return res.status(404).json({ message: "No Restaurant Found" });
    }
    return res.json(restaurantdata);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const searchRestaurants = async (req: Request, res: Response) => {
  try {
    const city = req.params.city;

    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedcuisine = (req.query.selectedCuisine as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdate";
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};
    query["city"] = new RegExp(city, "i");
    console.log(query);
    const cityCheck = await Restaurant.countDocuments(query);
    console.log(cityCheck);
    if (cityCheck === 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }

    if (selectedcuisine) {
      const cuisinesArray = selectedcuisine
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      query["cuisines"] = { $all: cuisinesArray };
    }

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      query["$or"] = [
        { restaurantName: searchRegex },
        { cuisines: { $in: [searchRegex] } },
      ];
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await Restaurant.countDocuments(query);

    const response = {
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error occered while fetching the data" });
  }
};
export default { searchRestaurants, getRestaurant };
