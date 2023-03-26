import create from 'zustand';

interface SlugAndIdState {
  slug: string;
  id: number;
  setSlugAndId: (slug: string, id: number) => void;
}

// create a Zustand store
const storeCategory = create<SlugAndIdState>((set) => ({
  slug: '',
  id: 0,
  setSlugAndId: (slug, id) => set({ slug, id }),
}));

// create a hook to access the Zustand store
export const storeSlugAndId = () => {
  const { slug, id, setSlugAndId } = storeCategory();

  return { slug, id, setSlugAndId };
};
