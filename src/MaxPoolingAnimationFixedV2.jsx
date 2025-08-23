import { useState, useEffect, useRef } from 'react';

export default function MaxPoolingAnimationFixedV2() {
  // Animation controls
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(2);
  const [reset, setReset] = useState(false);
  
  // Position of the 2x2 pooling window
  const [poolPosition, setPoolPosition] = useState({ x: 0, y: 0 });
  
  // Feature map dimensions
  const inputSize = 12; // 12x12 feature map
  const poolSize = 2;   // 2x2 pooling
  const outputSize = inputSize / poolSize; // 6x6 result
  
  // Create a fixed sample feature map for consistent visualization
  const createFixedFeatureMap = () => {
    const map = [];
    for (let i = 0; i < inputSize * inputSize; i++) {
      map.push(Math.floor(Math.random() * 51));
    }
    // Ensure some high values near the middle for demo purposes
    const middleIndex = Math.floor(inputSize / 2) * inputSize + Math.floor(inputSize / 2);
    map[middleIndex] = 43;
    map[middleIndex + 1] = 19;
    map[middleIndex + inputSize] = 12;
    map[middleIndex + inputSize + 1] = 1;
    
    return map;
  };
  
  // Generate or use a fixed input feature map
  const [inputFeatureMap, setInputFeatureMap] = useState(createFixedFeatureMap);
  
  // Initialize output feature map
  const [outputFeatureMap, setOutputFeatureMap] = useState(
    Array(outputSize * outputSize).fill(null)
  );
  
  // Animation timer
  const animationRef = useRef(null);
  
  // Find the maximum value in the current pooling window
  const findMaxInWindow = (position = poolPosition) => {
    let maxValue = -Infinity;
    let maxPosition = { x: 0, y: 0 };
    
    for (let y = 0; y < poolSize; y++) {
      for (let x = 0; x < poolSize; x++) {
        const posX = position.x * poolSize + x;
        const posY = position.y * poolSize + y;
        const value = inputFeatureMap[posY * inputSize + posX];
        
        if (value > maxValue) {
          maxValue = value;
          maxPosition = { x: posX, y: posY };
        }
      }
    }
    
    return { maxValue, maxPosition };
  };

  // Calculate and update the current output value immediately when position changes
  useEffect(() => {
    const { maxValue } = findMaxInWindow();
    const newOutputFeatureMap = [...outputFeatureMap];
    newOutputFeatureMap[poolPosition.y * outputSize + poolPosition.x] = maxValue;
    setOutputFeatureMap(newOutputFeatureMap);
  }, [poolPosition]);
  
  // Update the animation - move to next position
  const updateAnimation = () => {
    setPoolPosition(prev => {
      // Move to the next position
      let newX = prev.x + 1;
      let newY = prev.y;
      
      if (newX >= outputSize) {
        newX = 0;
        newY += 1;
      }
      
      if (newY >= outputSize) {
        setIsPlaying(false);
        return prev; // Stay at the last position
      }
      
      return { x: newX, y: newY };
    });
  };
  
  // Manage the animation timer
  useEffect(() => {
    if (isPlaying) {
      animationRef.current = setInterval(updateAnimation, 1000 / speed);
    } else if (animationRef.current) {
      clearInterval(animationRef.current);
    }
    
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [isPlaying, speed]);
  
  // Reset the animation
  useEffect(() => {
    if (reset) {
      setPoolPosition({ x: 0, y: 0 });
      setOutputFeatureMap(Array(outputSize * outputSize).fill(null));
      setReset(false);
    }
  }, [reset]);
  
  // Manually calculate all output values at once
  const processEntireFeatureMap = () => {
    const newOutputFeatureMap = Array(outputSize * outputSize).fill(null);
    
    for (let y = 0; y < outputSize; y++) {
      for (let x = 0; x < outputSize; x++) {
        const { maxValue } = findMaxInWindow({ x, y });
        newOutputFeatureMap[y * outputSize + x] = maxValue;
      }
    }
    
    setOutputFeatureMap(newOutputFeatureMap);
    setIsPlaying(false);
  };
  
  // Helper to get pixel brightness for display
  const getColorIntensity = (value) => {
    if (value === null) return 'bg-gray-200';
    
    // Scale value to 0-255 range for display
    const intensity = Math.min(255, Math.floor((value / 50) * 255));
    
    if (intensity > 200) return 'bg-blue-900';
    if (intensity > 150) return 'bg-blue-800';
    if (intensity > 100) return 'bg-blue-700';
    if (intensity > 50) return 'bg-blue-600';
    if (intensity > 25) return 'bg-blue-500';
    if (intensity > 10) return 'bg-blue-400';
    if (intensity > 0) return 'bg-blue-300';
    return 'bg-white';
  };
  
  // Find the current maximum value and its position
  const currentMax = findMaxInWindow();
  
  return (
    <div className="flex flex-col bg-gray-50 p-6 w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">MaxPooling2D Animation</h1>
      <h2 className="text-lg text-gray-600 mb-6 text-center">Visualizing MaxPooling2D((2,2))</h2>
      
      <div className="flex flex-wrap gap-8 justify-center">
        {/* Input Feature Map */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-medium mb-3 text-center">Input Feature Map (12×12)</h3>
          <div className="bg-gray-100 p-4 rounded-lg relative">
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${inputSize}, 1fr)`,
                gap: '2px',
                width: `${inputSize * 30}px`
              }}
            >
              {inputFeatureMap.map((value, i) => {
                const x = i % inputSize;
                const y = Math.floor(i / inputSize);
                
                // Check if this cell is in the current pooling window
                const inCurrentWindow = 
                  x >= poolPosition.x * poolSize && 
                  x < (poolPosition.x * poolSize) + poolSize && 
                  y >= poolPosition.y * poolSize && 
                  y < (poolPosition.y * poolSize) + poolSize;
                
                // Check if this is the maximum value in the window
                const isMax = inCurrentWindow && 
                  x === currentMax.maxPosition.x && 
                  y === currentMax.maxPosition.y;
                
                return (
                  <div 
                    key={i}
                    className={`flex items-center justify-center ${getColorIntensity(value)} transition-all duration-200`}
                    style={{
                      width: '30px',
                      height: '30px',
                      border: inCurrentWindow ? '2px solid red' : 'none',
                      transform: isMax ? 'scale(1.1)' : 'scale(1)',
                      fontWeight: isMax ? 'bold' : 'normal',
                      zIndex: isMax ? 10 : 1
                    }}
                  >
                    {value}
                  </div>
                );
              })}
            </div>
            
            {/* Overlay to show the current pooling window */}
            <div 
              className="absolute border-2 border-red-500 transition-all duration-200 pointer-events-none"
              style={{
                left: `${poolPosition.x * poolSize * 30 + 16}px`,
                top: `${poolPosition.y * poolSize * 30 + 16}px`,
                width: `${poolSize * 30 + 4}px`,
                height: `${poolSize * 30 + 4}px`
              }}
            ></div>
          </div>
        </div>
        
        {/* MaxPooling Operation */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-medium mb-3 text-center">MaxPooling Operation</h3>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-center mb-3">Current Window (2×2)</div>
            <div className="flex justify-center mb-4">
              <div className="grid grid-cols-2 gap-2">
                {[0, 1, 2, 3].map(i => {
                  const x = poolPosition.x * poolSize + (i % 2);
                  const y = poolPosition.y * poolSize + Math.floor(i / 2);
                  const index = y * inputSize + x;
                  const value = inputFeatureMap[index];
                  
                  // Check if this is the max value
                  const isMax = x === currentMax.maxPosition.x && y === currentMax.maxPosition.y;
                  
                  return (
                    <div 
                      key={i}
                      className={`w-16 h-16 flex items-center justify-center ${getColorIntensity(value)} ${isMax ? 'ring-2 ring-red-500' : ''}`}
                      style={{
                        transform: isMax ? 'scale(1.1)' : 'scale(1)',
                        fontWeight: isMax ? 'bold' : 'normal'
                      }}
                    >
                      {value}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5v14M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              
              <div className="mt-2 text-center">Max Value</div>
              <div 
                className={`w-16 h-16 flex items-center justify-center mt-2 ${getColorIntensity(currentMax.maxValue)}`}
              >
                {currentMax.maxValue}
              </div>
            </div>
          </div>
        </div>
        
        {/* Output Feature Map */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-medium mb-3 text-center">Output Feature Map (6×6)</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${outputSize}, 1fr)`,
                gap: '4px',
                width: `${outputSize * 40}px`
              }}
            >
              {outputFeatureMap.map((value, i) => {
                const x = i % outputSize;
                const y = Math.floor(i / outputSize);
                
                // Check if this is the current position
                const isCurrent = x === poolPosition.x && y === poolPosition.y;
                
                return (
                  <div 
                    key={i}
                    className={`flex items-center justify-center ${getColorIntensity(value)} transition-all duration-200`}
                    style={{
                      width: '40px',
                      height: '40px',
                      border: isCurrent ? '2px solid red' : 'none',
                      transform: isCurrent ? 'scale(1.1)' : 'scale(1)',
                      fontWeight: 'bold',
                      fontSize: '16px'
                    }}
                  >
                    {value !== null ? value : ''}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Animation controls */}
      <div className="flex justify-center mt-8 gap-4 flex-wrap">
        <button
          onClick={() => {
            if (!isPlaying) setIsPlaying(true);
            else setIsPlaying(false);
          }}
          className={`px-4 py-2 rounded-md ${
            isPlaying ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
          } text-white`}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        
        <button
          onClick={() => {
            setIsPlaying(false);
            setReset(true);
          }}
          className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
        >
          Reset
        </button>
        
        <button
          onClick={() => {
            // Generate a new random input feature map
            setIsPlaying(false);
            setPoolPosition({ x: 0, y: 0 });
            setOutputFeatureMap(Array(outputSize * outputSize).fill(null));
            setInputFeatureMap(createFixedFeatureMap());
          }}
          className="px-4 py-2 rounded-md bg-purple-500 hover:bg-purple-600 text-white"
        >
          New Data
        </button>
        
        <button
          onClick={processEntireFeatureMap}
          className="px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white"
        >
          Show Final Result
        </button>
        
        <div className="flex items-center gap-2">
          <span className="text-sm">Speed:</span>
          <input
            type="range"
            min="1"
            max="10"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-32"
          />
        </div>
      </div>
      
      {/* Explanation */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-8">
        <h3 className="font-bold text-lg mb-2">How MaxPooling Works:</h3>
        <div className="space-y-3">
          <p>
            MaxPooling is a downsampling technique used in convolutional neural networks to reduce the spatial dimensions (width and height) of the input feature maps.
          </p>
          <p>
            The animation shows MaxPooling2D with a 2×2 pool size, which:
          </p>
          <ol className="list-decimal list-inside ml-4 space-y-2">
            <li>Divides the input feature map into non-overlapping 2×2 regions</li>
            <li>For each region, selects only the maximum value</li>
            <li>Places that maximum value in the corresponding position in the output feature map</li>
          </ol>
          <p>
            This process reduces the feature map size by half in each dimension (from 12×12 to 6×6 in this example) while preserving the most important features.
          </p>
          <p>
            Benefits of MaxPooling:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Reduces computation by decreasing the number of parameters in later layers</li>
            <li>Provides a form of translation invariance (small shifts in input don't change the output)</li>
            <li>Helps prevent overfitting by focusing on the most prominent features</li>
            <li>Creates a hierarchy of spatial abstractions throughout the network</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
