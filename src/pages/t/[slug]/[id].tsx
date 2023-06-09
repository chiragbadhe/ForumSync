import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useProtocolStore } from '@/store/useProtocolStore';
import Header from '@/components/Header';

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
  const { slug, id } = router.query;
  const [topicData, setTopicData] = useState<TopicData>();
  const { protocol } = useProtocolStore();

  console.log(protocol.forumLink);

  useEffect(() => {
    const fetchTopicData = async () => {
      console.log('slug:', slug, 'id:', id);
      const response = await fetch(`/api/topics?slug=${slug}&id=${id}&protocol=${protocol.forumLink}`);
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
    <>
      <Header topicHeader={topicData} />
      <div>
        {topicData?.post_stream?.posts.map((post) => (
          <div className="relative container mx-auto max-w-3xl ">
            <div className="absolute flex space-x-[15px] -left-[60px]  rounded-[5px]">
              {post.avatar_template.match(/letter/) ? (
                <img
                  className="h-[50px] rounded-full border"
                  src={`${post.avatar_template.replace('{size}', '90')}`}
                  alt=""
                />
              ) : (
                <img
                  className="h-[50px] rounded-full border"
                  src={`${protocol.forumLink}${post.avatar_template.replace('{size}', '90')}`}
                  alt=""
                />
              )}
            </div>
            <div className="mt-[25px] bg-gray-100 rounded-[10px] p-[20px] border" key={post.id}>
              <div className="flex justify-between ">
                <p className="font-semibold text-[16px] mb-[15px]">{post.username}</p>
                <p className="opacity-50 text-[14px] mb-[15px]">{post.created_at}</p>
              </div>
              <div className="post" dangerouslySetInnerHTML={{ __html: post.cooked }} /> {/* Render "cooked" data */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TopicPage;
