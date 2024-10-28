import React, { useState } from 'react';
import { Button } from './ui/Button'; // Adjust the import path as necessary

const MuteToggle: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false); // State to track mute status

  const toggleMute = () => {
    setIsMuted((prev) => !prev); // Toggle the mute state
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">{isMuted ? 'Muted' : 'Unmuted'}</h1>
      <Button variant={isMuted ? 'secondary' : 'primary'} onClick={toggleMute}>
        {isMuted ? 'Unmute' : 'Mute'}
      </Button>
    </div>
  );
};

export default MuteToggle;