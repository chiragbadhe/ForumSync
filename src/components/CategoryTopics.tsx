import React, { useState, useRef, useEffect, useContext } from 'react';
import { useProtocolStore } from '@/store/useProtocolStore';
import axios from 'axios';
import Toast, { ToastContext } from '@/components/ui/Toast';
import TopicCard from '@/components/TopicCard';
import { storeSlugAndId } from '@/store/useCategoryStore';

interface Topic {
  excerpt: string;
  created_at: string;
  last_poster_username: string;
  like_count: number;
  posts_count: number;
  id: any;
  views: number;
  pinned: boolean;
  title: string;
  slug: string;
}

const DiscourseForum: React.FC = () => {
  const { slug, id } = storeSlugAndId();
  const [topicsCategoryWise, setTopicCategoryWise] = useState<Topic[]>([]);
  const [page, setPage] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const { protocol } = useProtocolStore();
  const [prevProtocolLink, setPrevProtocolLink] = useState('');
  const [prevSlug, setPrevSlug] = useState('');

  const { showErrorToast } = useContext(ToastContext);

  useEffect(() => {
    const fetchtopicsCategoryWise = async () => {
      const response = await axios.get(
        `/api/categoriesarray?slug=${slug}&id=${id}&page=${page}&protocol=${protocol.forumLink}`
      );
      if (protocol.forumLink !== prevProtocolLink) {
        // If protocol link has changed, reset the topics list
        setTopicCategoryWise(response.data);
      } else if (slug !== prevSlug) {
        setTopicCategoryWise(response.data);
      } else {
        // If protocol link is the same, append new topics to the list
        setTopicCategoryWise((topics) => [...topics, ...response.data]);
      }
      setPrevProtocolLink(protocol.forumLink);
      setPrevSlug(slug);
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
                    <TopicCard
                      title={topic.title}
                      views={topic.views}
                      posts_count={topic.posts_count}
                      excerpt={topic.excerpt}
                      like_count={topic.like_count}
                      createdAt={topic.created_at}
                      last_posted_by={topic.last_poster_username}
                    ></TopicCard>
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
