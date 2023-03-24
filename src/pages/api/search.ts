import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { useProtocolStore } from '@/store/useProtocolStore';
interface SearchResult {
  id: number;
  title: string;
  slug: string;
}
interface SearchResponse {
  topics: SearchResult[];
}
const { protocol } = useProtocolStore();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResult[]>
) {
  try {
    const { term } = req.query;
    const response = await axios.get<SearchResponse>(
      `${protocol.link}/search.json?q=${term}&page=0`
    );

    const searchResults: SearchResult[] = response.data.topics.map((topic) => ({
      id: topic.id,
      title: topic.title,
      slug: topic.slug
    }));

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
