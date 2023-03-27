import React, { useState } from 'react';
import protocols from '@/utils/protocols.json';
import { X } from 'lucide-react';
import { useProtocolStore } from '@/store/useProtocolStore';

interface Protocol {
  name?: any;
  forumLink?: any;
}

interface CheckProtocolProps {
  onProtocolClick?: (protocol: Protocol) => void;
}

interface CheckProtocolProps {
  onProtocolClick?: (protocol: Protocol) => void;
}

const CheckProtocol: React.FC<CheckProtocolProps> = ({ onProtocolClick }) => {
  const [selectedProtocols, setSelectedProtocols] = useState<Protocol[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [suggestedProtocols, setSuggestedProtocols] = useState<Protocol[]>([]);
  const [notFoundMessage, setNotFoundMessage] = useState<string>('');

  const { protocol, setProtocol } = useProtocolStore();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = (event.target.value || '').toLowerCase();
    
    setUserInput(input);

    if (input === '') {
      setSuggestedProtocols([]);
      return;
    }



    const suggested = protocols.filter((protocol: any) => protocol?.name?.toLowerCase()?.includes(input));
    setSuggestedProtocols(suggested);
  };

  const handleAddProtocol = (protocol: Protocol) => {
    if (!selectedProtocols.find((p: Protocol) => p.name === protocol.name)) {
      setSelectedProtocols([...selectedProtocols, protocol]);
      setNotFoundMessage('');
      setUserInput('');
      setSuggestedProtocols(suggestedProtocols.filter((p) => p.name !== protocol.name));
    }
  };

  const handleRemoveProtocol = (protocol: Protocol) => {
    const updatedProtocols = selectedProtocols.filter((p: Protocol) => p.name !== protocol.name);
    setSelectedProtocols(updatedProtocols);
  };

  const handleProtocolClick = (protocol: Protocol) => {
    setProtocol(protocol.name);
    if (onProtocolClick) {
      onProtocolClick(protocol);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        className="border w-full rounded-[5px] mt-[12px] py-[5px] focus-none px-[10px]"
      />
      {/* <button onClick={() => handleAddProtocol(suggestedProtocols[0])} disabled={suggestedProtocols.length === 0}>Add</button> */}
      {notFoundMessage && <p>{notFoundMessage}</p>}
      <ul>
        {suggestedProtocols.map((protocol: Protocol) => (
          <li key={protocol.name} onClick={() => handleAddProtocol(protocol)}>
            {protocol.name}
          </li>
        ))}
      </ul>
      <ul>
        {selectedProtocols.map((protocol: Protocol) => (
          <li
            key={protocol.name}
            onClick={() => handleProtocolClick(protocol)}
            className="bg-gray-100 border rounded-[5px] px-[10px] py-[5px] mt-[12px] relative flex items-center opacity-70"
          >
            {protocol.name}
            <button className="absolute right-1" onClick={() => handleRemoveProtocol(protocol)}>
              <X size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface RightSidebarProps {
  onProtocolClick?: (protocol: Protocol) => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ onProtocolClick }) => {
  return (
    <div className="w-1/3 bg-gray-50 h-auto rounded-[7px] px-[20px] p-[15px] border">
      <div>
        <p className="text-[20px] opacity-70">Subscriptions</p>
        <p className="border-b mt-[10px]"></p>
      </div>
      <div>
        <CheckProtocol onProtocolClick={onProtocolClick} />
      </div>
    </div>
  );
};

export default RightSidebar;
