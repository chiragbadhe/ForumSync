import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface TopicData {
  title: string;
  fancy_title: string;
  timeline_lookup: any;
  posts: {
    id: number;
    cooked: string;
  }[];
}

const TopicPage: React.FC = () => {
  const router = useRouter();
  const { id, slug } = router.query;
  const [topicData, setTopicData] = useState<TopicData>();
  useEffect(() => {
    const fetchTopicData = async () => {
      const response = await fetch(`/api/topics?slug=${slug}&id=${id}`);
      const topicData = await response.json();
      setTopicData(topicData);
    };
    fetchTopicData();
  }, [id, slug]);

  console.log(topicData);

  if (!topicData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1></h1>
      <h1>{topicData.fancy_title}</h1>
      {/* {topicData.timeline_lookup.map((post : any ) => (
        <div key={post.id} dangerouslySetInnerHTML={{ __html: post.cooked }} />
      ))} */}
    </div>
  );
};

export default TopicPage;
