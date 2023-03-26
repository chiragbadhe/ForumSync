import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
// Define the expected structure of the topic data
interface TopicData {
  topic_list: any;
  title: string;
  fancy_title: string;
}


// Define the API route handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse<TopicData | { error: string }>) {
  // Extract the slug and id from the request query
  const { slug, id } = req.query;
  const protocol = req.query.protocol || "https://gov.uniswap.org/"; // Default to uniswap if no protocol is specified

  // Make a request to the Uniswap forum API with the provided slug and id
  try {
    const response = await axios.get<TopicData>(
      `${protocol}/c/${slug}/${id}.json`
    );
    const topicData = response.data.topic_list.topics;
    // If the request is successful, send the topic data back to the client
    res.status(200).json(topicData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
