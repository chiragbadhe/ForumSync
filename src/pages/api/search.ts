import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";


interface SearchResult {
  id: number;
  title: string;
  slug: string;
}

interface SearchResponse {
  topics: SearchResult[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResult[]>
) {
  try {
    const { term } = req.query;
    const protocol = req.query.protocol || "https://gov.uniswap.org/"; // Default to uniswap if no protocol is specified
    
    const response = await axios.get<SearchResponse>(
      `${protocol}/search.json?q=${term}&page=0`
    );

    const searchResults: SearchResult[] = response.data.topics

    res.status(200).json(searchResults);
  } catch (error: any) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      res.status(error?.response?.status || 500).json([]);
    } else {
      res.status(500).json([]);
    }
  }
}
