import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

interface Topic {
  id: number;
  title: string;
  slug: string;
}

const UniswapForum: React.FC = () => {
  const [latestTopics, setLatestTopics] = useState<Topic[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [allResultsLoaded, setAllResultsLoaded] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLatestTopics = async () => {
      const response = await axios.get(`/api/latest?page=${page}`);
      setLatestTopics((topics) => [...topics, ...response.data]);
    };
    fetchLatestTopics();
  }, [page]);

  useEffect(() => {
    setPage(0); // Reset page number when search query changes
    setAllResultsLoaded(false); // Reset allResultsLoaded flag
  }, [searchQuery]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // disconnect observer when search query changes
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [searchQuery]);

  const fetchSearchResults = async () => {
    console.log('button clicked');
    if (!searchQuery) return;
    try {
      const response = await axios.get(`/api/search/?term=${searchQuery}&page=${page}`);
      if (response.data.length === 0) {
        // No more results to load
        setAllResultsLoaded(true);
      }
      if (page === 0) {
        setLatestTopics(response?.data);
      } else {
        setLatestTopics((topics) => [...topics, ...response.data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && searchQuery === '' && !allResultsLoaded) {
      setPage((page) => page + 1);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };


  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Uniswap Forum</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search topics"
            value={searchQuery}
            onChange={handleSearch}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                fetchSearchResults();
              }
            }}
            className="border border-gray-400 rounded py-2 px-4 w-full"
          />
          <button onClick={() => fetchSearchResults()}>Search </button>
        </div>
        {latestTopics.length > 0 ? (
          <ul>
            {latestTopics.map((topic, index) => (
              <li key={`${index}-${topic.id}`} className="mb-2">
                <a href={`${topic.slug}/${topic.id}`} className="hover:underline">
                  {topic.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No topics found</p>
        )}
        <div ref={loaderRef}>Loading...</div>
      </div>
    </div>
  );
};

export default UniswapForum;
