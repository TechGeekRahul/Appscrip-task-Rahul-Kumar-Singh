import { useState, useEffect, useRef } from 'react';

export function RangeSlider({ 
  min, 
  max, 
  step = 1, 
  value, 
  onChange 
}) {
  const [localMin, setLocalMin] = useState(value.min);
  const [localMax, setLocalMax] = useState(value.max);
  const [dragging, setDragging] = useState(null);
  const isFirstRender = useRef(true);
  
  const range = max - min;
  
  // Calculate percentages for slider positions
  const minPos = ((localMin - min) / range) * 100;
  const maxPos = ((localMax - min) / range) * 100;
  
  // Update local values when props change significantly
  useEffect(() => {
    // Skip during first render since it will cause double initialization
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    // Only update if the external values are different enough to avoid update loops
    const minDiff = Math.abs(localMin - value.min);
    const maxDiff = Math.abs(localMax - value.max);
    
    if (minDiff > 1 || maxDiff > 1) {
      setLocalMin(value.min);
      setLocalMax(value.max);
    }
  }, [value.min, value.max]);
  
  // Commit changes to parent when dragging stops
  useEffect(() => {
    if (dragging === null && !isFirstRender.current) {
      // Avoid redundant updates
      if (Math.abs(localMin - value.min) > 0.01 || Math.abs(localMax - value.max) > 0.01) {
        onChange({ min: localMin, max: localMax });
      }
    }
  }, [dragging]);
  
  // Handle min slider change
  const handleMinChange = (e) => {
    const newValue = Number(e.target.value);
    setLocalMin(Math.min(newValue, localMax - step));
  };
  
  // Handle max slider change
  const handleMaxChange = (e) => {
    const newValue = Number(e.target.value);
    setLocalMax(Math.max(newValue, localMin + step));
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
        value={localMin}
        onChange={handleMinChange}
        onMouseDown={() => setDragging('min')}
        onMouseUp={() => setDragging(null)}
        onTouchStart={() => setDragging('min')}
        onTouchEnd={() => setDragging(null)}
        className="absolute w-full h-1 -top-1 appearance-none bg-transparent pointer-events-none"
        style={{
          pointerEvents: 'auto',
          WebkitAppearance: 'none',
        }}
      />
      
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={localMax}
        onChange={handleMaxChange}
        onMouseDown={() => setDragging('max')}
        onMouseUp={() => setDragging(null)}
        onTouchStart={() => setDragging('max')}
        onTouchEnd={() => setDragging(null)}
        className="absolute w-full h-1 -top-1 appearance-none bg-transparent pointer-events-none"
        style={{
          pointerEvents: 'auto',
          WebkitAppearance: 'none',
        }}
      />
      
      <div className="flex justify-between mt-4">
        <div className="text-sm font-medium">${localMin}</div>
        <div className="text-sm font-medium">${localMax}</div>
      </div>
    </div>
  );
}