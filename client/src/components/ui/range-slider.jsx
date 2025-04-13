import { useState, useEffect } from 'react';

export function RangeSlider({ 
  min, 
  max, 
  step = 1, 
  value, 
  onChange 
}) {
  const [localValues, setLocalValues] = useState(value);
  const [dragging, setDragging] = useState(null);
  
  const range = max - min;
  
  // Calculate percentages for slider positions
  const minPos = ((localValues.min - min) / range) * 100;
  const maxPos = ((localValues.max - min) / range) * 100;
  
  // Update local values when props change
  useEffect(() => {
    setLocalValues(value);
  }, [value.min, value.max]); // Added specific dependencies to avoid infinite updates
  
  // Commit changes to parent when dragging stops
  useEffect(() => {
    if (dragging === null && 
        (localValues.min !== value.min || localValues.max !== value.max)) {
      onChange(localValues);
    }
  }, [dragging, localValues, onChange, value.min, value.max]);
  
  // Handle slider thumb movements
  const handleSliderChange = (e, type) => {
    const newValue = Number(e.target.value);
    
    if (type === 'min') {
      setLocalValues(prev => ({
        ...prev,
        min: Math.min(newValue, prev.max - step)
      }));
    } else {
      setLocalValues(prev => ({
        ...prev,
        max: Math.max(newValue, prev.min + step)
      }));
    }
  };

  return (
    <div className="px-2 relative pt-5 pb-2">
      <div className="h-1 bg-gray-300 rounded-full">
        <div 
          className="absolute h-1 bg-secondary rounded-full" 
          style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
        ></div>
      </div>
      
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={localValues.min}
        onChange={(e) => handleSliderChange(e, 'min')}
        onMouseDown={() => setDragging('min')}
        onMouseUp={() => setDragging(null)}
        onTouchStart={() => setDragging('min')}
        onTouchEnd={() => setDragging(null)}
        className="absolute w-full h-1 -top-1 appearance-none bg-transparent pointer-events-none"
        style={{
          // Only the thumb should be clickable to avoid interference between sliders
          pointerEvents: 'auto',
          // Hide the track
          WebkitAppearance: 'none',
        }}
      />
      
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={localValues.max}
        onChange={(e) => handleSliderChange(e, 'max')}
        onMouseDown={() => setDragging('max')}
        onMouseUp={() => setDragging(null)}
        onTouchStart={() => setDragging('max')}
        onTouchEnd={() => setDragging(null)}
        className="absolute w-full h-1 -top-1 appearance-none bg-transparent pointer-events-none"
        style={{
          // Only the thumb should be clickable to avoid interference between sliders
          pointerEvents: 'auto',
          // Hide the track
          WebkitAppearance: 'none',
        }}
      />
      
      <div className="flex justify-between mt-4">
        <div className="text-sm font-medium">${localValues.min}</div>
        <div className="text-sm font-medium">${localValues.max}</div>
      </div>
    </div>
  );
}