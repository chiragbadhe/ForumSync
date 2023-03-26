import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

// Define the expected structure of the topic data
interface Topic {
  category_list: {
    categories: {
      name: string;
      id: number;
      slug: string;
    }[];
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Topic[]>
) {
  try {
    const protocol = req.query.protocol || "https://gov.uniswap.org"; // Default to Uniswap if no protocol is specified
    
    const response = await axios.get(`${protocol}/categories.json`);
    // Extract the array of category objects from the response and type it as an array of Topic objects
    const categories: Topic[] = response.data;
    console.log("categories", categories)
    // Send a 200 response with the array of categories as the response body
    res.status(200).json(categories);
  } catch (error: any) {
    // If there was an error fetching the categories, log the error to the console and send a 500 response with an empty array as the response body
    console.error(error);
    res.status(500).json([]);
  }
}
