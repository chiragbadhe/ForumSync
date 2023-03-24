import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

// Define the expected structure of the topic data
interface Topic {
  id: number;
  title: string;
  slug: string;
}

// Define the request handler for the API endpoint
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Topic[]>
) {
  try {
    // Make a GET request to the forum's "latest" JSON endpoint
    const response = await axios.get("https://gov.uniswap.org/latest.json");
    
    // Extract the array of topic objects from the response and type it as an array of Topic objects
    const latestTopics: Topic[] = response.data.topic_list.topics;
    
    // Send a 200 response with the array of topics as the response body
    res.status(200).json(latestTopics);
  } catch (error: any) {
    // If there was an error fetching the latest topics, log the error to the console and send a 500 response with an empty array as the response body
    console.error(error);
    res.status(500).json([]);
  }
}
