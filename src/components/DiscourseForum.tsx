import React, { useState, useRef, useEffect, useContext } from 'react';
import { useProtocolStore } from '@/store/useProtocolStore';
import axios from 'axios';
import { ToastContext } from './ui/Toast';
import TopicCard from './TopicCard';

interface Topic {
  id: any;
  views: number;
  pinned: boolean;
  title: string;
  slug: string;
}

const DiscourseForum: React.FC = () => {
  const [latestTopics, setLatestTopics] = useState<Topic[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [allResultsLoaded, setAllResultsLoaded] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const { protocol, setProtocol } = useProtocolStore();
  const [prevProtocolLink, setPrevProtocolLink] = useState('');

  const { showErrorToast } = useContext(ToastContext);

  useEffect(() => {
    const fetchLatestTopics = async () => {
      const response = await axios.get(`/api/latest?page=${page}&protocol=${protocol.forumLink}`);
      if (protocol.forumLink !== prevProtocolLink) {
        // If protocol link has changed, reset the topics list
        setLatestTopics(response.data);
      } else {
        // If protocol link is the same, append new topics to the list
        setLatestTopics((topics) => [...topics, ...response.data]);
      }
      setPrevProtocolLink(protocol.forumLink);
    };
    fetchLatestTopics();
  }, [page, protocol, prevProtocolLink]);

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
    if (!searchQuery) return;
    try {
      const response = await axios.get(`/api/search/?term=${searchQuery}&page=${page}&protocol=${protocol.forumLink}`);
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
      console.log(error);
      showErrorToast('An error occurred');
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
    <div className="">
      <div className="container mx-auto px-4">
        <p className="text-xl p-[10px] px-[15px] font-bold mb-4 bg-gray-100 rounded-[5px] border">
          {protocol.name} Forum
        </p>
        {/* 
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
            className=""
          />
          <button onClick={() => fetchSearchResults()}>Search </button>
        </div> */}

        {latestTopics.length > 0 ? (
          <ul>
            {latestTopics.map((topic, index) => (
              <li key={`${index}-${topic.id}`} className="mb-2">
                <a href={`t/${topic.slug}/${topic.id}`} className="">
                  <TopicCard children={undefined} title={topic.title}></TopicCard>
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

export default DiscourseForum;
