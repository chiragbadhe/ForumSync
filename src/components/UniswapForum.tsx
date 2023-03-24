import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Topic {
  id: number;
  title: string;
  slug: string;
}

const UniswapForum: React.FC = () => {
  const [latestTopics, setLatestTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const fetchLatestTopics = async () => {
      const response = await axios.get('/api/latest');
      setLatestTopics(response.data);
    };
    fetchLatestTopics();
  }, []);

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Latest Uniswap Forum Topics</h2>
        <ul>
          {latestTopics.map((topic) => (
            <li key={topic.id} className="mb-2">
              <a href={`${topic.slug}/${topic.id}`} className="hover:underline">
                {topic.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UniswapForum;
