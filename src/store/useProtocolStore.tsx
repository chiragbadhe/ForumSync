import { create } from 'zustand';
import protocols from '@/utils/protocols.json';

type Protocol = {
  name: string;
  forumLink: string;
};

type ProtocolStore = {
  protocol: Protocol;
  setProtocol: (name: string) => void;
};

const protocolList = protocols as unknown as Protocol[]; // cast the protocols as Protocol[]

export const useProtocolStore = create<ProtocolStore>((set) => ({
  protocol: protocolList[0], // default to first protocol in the list
  setProtocol: (name: string) => {
    const newProtocol = protocolList.find((p) => p.name === name);
    if (newProtocol) {
      set({ protocol: { name: newProtocol.name, forumLink: newProtocol.forumLink } });
    }
  },
}));
