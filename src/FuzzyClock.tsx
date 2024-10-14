import React, { useEffect, useState } from 'react';
import { Clock } from './core/clock';
import { TimeOfDay } from './core/enums';
import './index.css';

const FuzzyClock: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const clock = new Clock();

  // Update content based on fuzzy time
  const updateTime = () => {
    clock.refresh();
    setContent(clock.getContent());
  };

  useEffect(() => {
    updateTime(); // Set the initial time

    // Calculate the time until the next 5-minute interval
    const now = new Date();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    // Calculate the time remaining until the next 5-minute mark
    const timeToNextMinuteInterval = (60 - seconds) * 1000 - milliseconds;

    // Set a timeout for the next 5-minute interval, then update every 5 minutes
    const timeoutId = setTimeout(() => {
      updateTime();

      // Start an interval to update every 5 minutes after the first timeout
      const intervalId = setInterval(updateTime, 5 * 60 * 1000);

      // Cleanup interval when component unmounts
      return () => clearInterval(intervalId);
    }, timeToNextMinuteInterval);

    // Cleanup timeout when component unmounts
    return () => clearTimeout(timeoutId);
  }, [clock]);

  useEffect(() => {
    const timeOfDay = clock.getTimeOfDay(); // Get the appropriate class ('day' or 'night')
    const bodyClass = 
      timeOfDay === TimeOfDay.EARLY_MORNING ? 'early-morning' :
      timeOfDay === TimeOfDay.MORNING ? 'morning' :
      timeOfDay === TimeOfDay.DAY ? 'day' :
      timeOfDay === TimeOfDay.EVENING ? 'evening' :
      'night'; // Default to 'night' for TimeOfDay.NIGHT

    document.body.classList.add(bodyClass); // Apply the class to the body element

    // Clean up: remove the class when the component unmounts
    return () => {
      document.body.classList.remove(bodyClass);
    };
  }, []);

  return (
    <div className="clock-container">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default FuzzyClock;
