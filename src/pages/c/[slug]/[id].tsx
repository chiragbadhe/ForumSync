import React, { useState, useRef, useEffect, useContext } from 'react';
import { useProtocolStore } from '@/store/useProtocolStore';
import axios from 'axios';
import Toast, { ToastContext } from '@/components/ui/Toast';
import TopicCard from '@/components/TopicCard';

interface Topic {
  id: any;
  views: number;
  pinned: boolean;
  title: string;
  slug: string;
}

import { useRouter } from 'next/router';

const DiscourseForum: React.FC = () => {
  const router = useRouter();
  const { slug, id } = router.query;

  const [topicsCategoryWise, setTopicCategoryWise] = useState<Topic[]>([]);
  const [page, setPage] = useState(0);
  const [allResultsLoaded, setAllResultsLoaded] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const { protocol, setProtocol } = useProtocolStore();
  const [prevProtocolLink, setPrevProtocolLink] = useState('');

  const { showErrorToast } = useContext(ToastContext);

  useEffect(() => {
    const fetchtopicsCategoryWise = async () => {
      console.log('fetching for', protocol.forumLink);
      const response = await axios.get(`/api/categoriesarray?slug=${slug}&id=${id}&page=${page}&protocol=${protocol.forumLink}`);
      console.log({ response });
      if (protocol.forumLink !== prevProtocolLink) {
        // If protocol link has changed, reset the topics list
        setTopicCategoryWise(response.data);
      } else {
        // If protocol link is the same, append new topics to the list
        setTopicCategoryWise((topics) => [...topics, ...response.data]);
      }
      setPrevProtocolLink(protocol.forumLink);
    };
    fetchtopicsCategoryWise();
  }, [page, protocol, prevProtocolLink, slug, id]);

  
  return (
    <div className="">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4"></h2>
        {topicsCategoryWise.length > 0 ? (
          <ul>
            {topicsCategoryWise?.map((topic, index) => (
              <>
                <li key={`${index}-${topic.id}`} className="mb-2">
                  <a href={`t/${topic.slug}/${topic.id}`} className="">
                    <TopicCard children={undefined} title={topic.title}></TopicCard>
                  </a>
                </li>
              </>
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
