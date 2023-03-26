import { ReactNode, useContext, useEffect, useState } from 'react';
import { useProtocolStore } from '@/store/useProtocolStore';
import axios from 'axios';
import Toast, { ToastContext } from './ui/Toast';

interface Category {
  topic_count: string;
  description: ReactNode;
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

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(`/api/categories?protocol=${protocol.link}`);
        setCategories(response.data.category_list.categories);
      } catch (error) {
        setError('Error fetching categories');
      }
    }
    fetchCategories();
  }, []);

  console.log(categories);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Uniswap Forum Categories</h1>
      {categories.map((category) => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          {/* <p>{category.id}</p>
          <p>{category.slug}</p> */}
          <p>{category.description}</p>
          <p>{category.topic_count}</p>
        </div>
      ))}
    </div>
  );
}
