import { ReactNode, useContext, useEffect, useState } from 'react';
import { useProtocolStore } from '@/store/useProtocolStore';
import axios from 'axios';
import Toast, { ToastContext } from './ui/Toast';

import ReactDOMServer from 'react-dom/server';

import { storeSlugAndId } from '@/store/useCategoryStore';
interface Category {
  topic_count: string;
  description: string;
  name: string;
  id: number;
  slug: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState('');

  const { protocol, setProtocol } = useProtocolStore();
  const [prevProtocolLink, setPrevProtocolLink] = useState('');

  const { showErrorToast } = useContext(ToastContext);

  const { slug, id, setSlugAndId } = storeSlugAndId();

  const handleCategory = () => {
    // set the slug and id values
    setSlugAndId('my-slug', 123);
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(`/api/categories?protocol=${protocol.forumLink}`);
        setCategories(response.data.category_list.categories);
      } catch (error) {
        setError('Error fetching categories');
      }
    }
    fetchCategories();
  }, [protocol.forumLink]); // add protocol.forumLink as a dependency

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>
          <div onClick={() => setSlugAndId(category.slug, category.id)} className="flex my-[10px] hover:cursor-pointer">
            <div>
              <p className="text-[16px]">{category.name}</p>
              {/* <p className="text-[14px] opacity-50">{category.description} </p> */}
              <p className="text-[14px] opacity-50" dangerouslySetInnerHTML={{ __html: category.description }} />
            </div>
            <div>
              <p className="text-[14px] opacity-50">x{category.topic_count}</p>
            </div>
          </div>
          <p className="border-b pt-[10px]"></p>
        </div>
      ))}
    </div>
  );
}
