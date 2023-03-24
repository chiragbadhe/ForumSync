import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import networkLinks from '@/store/protocolLink';
// Define the expected structure of the topic data
interface TopicData {
  title: string;
  fancy_title: string;
  posts: {
    id: number;
    cooked: string;
  }[];
}

const BASE_URL = networkLinks["uniswap"];

// Define the API route handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse<TopicData | { error: string }>) {
  // Extract the slug and id from the request query
  const { slug, id } = req.query;

  // Make a request to the Uniswap forum API with the provided slug and id
  try {
    const response = await axios.get<TopicData>(
      `${BASE_URL}/t/${slug}/${id}.json`
    );
    const topicData = response.data;
    // If the request is successful, send the topic data back to the client
    res.status(200).json(topicData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
