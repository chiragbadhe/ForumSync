import React, { useState } from 'react';
import protocols from '@/utils/protocols.json';

interface Protocol {
  name: string;
  forumLink: string;
}

const CheckProtocol = () => {
  const [selectedProtocols, setSelectedProtocols] = useState<Protocol[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [suggestedProtocols, setSuggestedProtocols] = useState<Protocol[]>([]);
  const [notFoundMessage, setNotFoundMessage] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.toLowerCase();
    setUserInput(input);
  
    if (input === '') {
      setSuggestedProtocols([]);
      return;
    }
  
    const suggested = protocols.filter((protocol: Protocol) =>
      protocol.name.toLowerCase().includes(input)
    );
    setSuggestedProtocols(suggested);
  };

  const handleAddProtocol = (protocol: Protocol) => {
    if (!selectedProtocols.find((p: Protocol) => p.name === protocol.name)) {
      setSelectedProtocols([...selectedProtocols, protocol]);
      setNotFoundMessage('');
      setUserInput('');
      setSuggestedProtocols(suggestedProtocols.filter(p => p.name !== protocol.name));
    }
  };
  

  const handleRemoveProtocol = (protocol: Protocol) => {
    const updatedProtocols = selectedProtocols.filter((p: Protocol) => p.name !== protocol.name);
    setSelectedProtocols(updatedProtocols);
  };

  const handleProtocolClick = (protocol: Protocol) => {
    console.log(`${protocol.name} clicked`);
  };

  return (
    <div>
      <input type="text" value={userInput} onChange={handleInputChange} />
      <button onClick={() => handleAddProtocol(suggestedProtocols[0])} disabled={suggestedProtocols.length === 0}>Add</button>
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
          <li key={protocol.name} onClick={() => handleProtocolClick(protocol)}>
            {protocol.name}
            <button onClick={() => handleRemoveProtocol(protocol)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckProtocol;
