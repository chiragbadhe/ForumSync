import { createContext, useContext, useState } from 'react';
import { FC } from 'react';

interface IProtocolProvider {
  children: any;
}

type Protocol = {
  name: string;
  link: string;
};

type ProtocolContextType = {
  protocol: Protocol;
  setProtocol: (name: string) => void;
};

const protocols: Protocol[] = [
  { name: 'uniswap', link: 'https://gov.uniswap.org/' },
  { name: 'aave', link: 'https://governance.aave.com/' },
  { name: 'compound', link: 'https://compound.com' },
];

export const ProtocolContext = createContext<ProtocolContextType>({
  protocol: protocols[0], // default to first protocol in the list
  setProtocol: () => {},
});

export const useProtocol = () => useContext(ProtocolContext);

export const ProtocolProvider: FC<IProtocolProvider> = ({ children }) => {
  const [protocol, setProtocol] = useState<Protocol>(protocols[0]);

  const handleSetProtocol = (name: string) => {
    console.log('hanlde set protocol');
    const newProtocol = protocols.find((p) => p.name === name);
    if (newProtocol) {
      setProtocol({ name: newProtocol.name, link: newProtocol.link });
    }
  };

  return (
    <ProtocolContext.Provider value={{ protocol, setProtocol: handleSetProtocol }}>{children}</ProtocolContext.Provider>
  );
};
