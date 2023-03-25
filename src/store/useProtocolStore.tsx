import { create } from 'zustand';

type Protocol = {
  name: string;
  link: string;
};

type ProtocolStore = {
  protocol: Protocol;
  setProtocol: (name: string) => void;
};

const protocols: Protocol[] = [
  { name: 'uniswap', link: 'https://gov.uniswap.org/' },
  { name: 'aave', link: 'https://governance.aave.com/' },
  { name: 'compound', link: 'https://www.comp.xyz/' },
  { name: 'optimism', link: 'https://gov.optimism.io/' },
  { name: 'treasure', link: 'https://gov.treasure.lol/' },

];

export const useProtocolStore = create<ProtocolStore>((set) => ({
  protocol: protocols[0], // default to first protocol in the list
  setProtocol: (name: string) => {
    console.log('hanlde set protocol');
    const newProtocol = protocols.find((p) => p.name === name);
    if (newProtocol) {
      set({ protocol: { name: newProtocol.name, link: newProtocol.link } });
    }
  },
}));
