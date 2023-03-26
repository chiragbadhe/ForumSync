import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useProtocolStore } from '@/store/useProtocolStore';

interface TopicData {
  title: string;
  fancy_title: string;
  timeline_lookup: any;
  post_stream: {
    posts: {
      id: number;
      name: string;
      username: string;
      avatar_template: string;
      created_at: string;
      cooked: string;
      // Add more properties as needed
    }[];
  };
}

const TopicPage: React.FC = () => {
  const router = useRouter();
  const { slug, id  } = router.query;
  const [topicData, setTopicData] = useState<TopicData>();
  const { protocol, setProtocol } = useProtocolStore();

  
  useEffect(() => {
    const fetchTopicData = async () => {
        console.log("slug:", slug, "id:", id)
      const response = await fetch(`/api/topics?slug=${slug}&id=${id}&protocol=${protocol.link}`);
      const topicData = await response.json();
      setTopicData(topicData);
    };
    fetchTopicData();
  }, [id, slug]);

  console.log(topicData)

  if (!topicData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{topicData.fancy_title}</h1>
      {topicData?.post_stream?.posts.map((post) => (
        <div key={post.id}>
          <p>{post.name}</p>
          <p>{post.username}</p>
          <p>{post.created_at}</p>
          <div dangerouslySetInnerHTML={{ __html: post.cooked }} /> {/* Render "cooked" data */}

          {/* Render more properties as needed */}
        </div>
      ))}
    </div>
  );
};

export default TopicPage;
