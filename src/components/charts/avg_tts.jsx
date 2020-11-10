import React, { useEffect, useState } from 'react';
import { getAvgTTS } from '../../utils/data_formatting_utils';

const AvgTTS = ({ rawData }) => {
  const [avgTTS, setAvgTTS] = useState(null);

  useEffect(() => {
    if (rawData.length) setAvgTTS(getAvgTTS(rawData));
  }, [rawData]);

  return (
    <div className="metric-card num-component">
      <span>{`Avg. TTS: ${avgTTS}s`}</span>
    </div>
  )
}

export default AvgTTS;
