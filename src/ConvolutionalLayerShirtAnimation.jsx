import { useState, useEffect, useRef } from 'react';

export default function ConvolutionalLayerShirtAnimation() {
  // Animation controls
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(2);
  const [reset, setReset] = useState(false);
  const [showValues, setShowValues] = useState(false);
  
  // Position of the 3x3 filter on the input image
  const [filterPosition, setFilterPosition] = useState({ x: 0, y: 0 });
  
  // To keep track of calculated output values
  const [outputValues, setOutputValues] = useState(Array(26*26).fill(null));
  
  // Create a shirt-shaped input image (28x28)
  const createShirtImage = () => {
    // Start with a blank canvas (all zeros)
    const image = Array(28*28).fill(50);
    
    // Create a simple shirt shape
    for (let y = 0; y < 28; y++) {
      for (let x = 0; x < 28; x++) {
        // Collar area
        if (y >= 2 && y <= 5 && x >= 10 && x <= 17) {
          image[y * 28 + x] = 50;
        }
        
        // Shoulders
        else if (y >= 6 && y <= 8) {
          if ((x >= 6 && x <= 21)) {
            image[y * 28 + x] = 220;
          }
        }
        
        // Chest area
        else if (y >= 9 && y <= 20) {
          if (x >= 8 && x <= 19) {
            image[y * 28 + x] = 220;
          }
        }
        
        // Waist area
        else if (y >= 21 && y <= 26) {
          if (x >= 10 && x <= 17) {
            image[y * 28 + x] = 220;
          }
        }
        
        // Left sleeve
        else if (y >= 9 && y <= 13) {
          if (x >= 3 && x <= 7) {
            image[y * 28 + x] = 180;
          }
        }
        
        // Right sleeve
        else if (y >= 9 && y <= 13) {
          if (x >= 20 && x <= 24) {
            image[y * 28 + x] = 180;
          }
        }
        
        // Button line
        if (y >= 7 && y <= 25 && x === 14) {
          image[y * 28 + x] = 100;
        }
        
        // Collar detail
        if ((y === 6 && (x === 12 || x === 15)) || (y === 5 && x === 13 || x === 14)) {
          image[y * 28 + x] = 50;
        }
      }
    }
    
    return image;
  };
  
  // Initialize with a shirt image
  const [inputImage, setInputImage] = useState(createShirtImage);
  
  // Generate a sample 3x3 filter (kernel) - a real edge detector
  const filter = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1]
  ];
  
  // Animation timer
  const animationRef = useRef(null);
  
  // Calculate the convolution for the current filter position
  const calculateCurrentConvolution = (position = filterPosition) => {
    let sum = 0;
    
    for (let fy = 0; fy < 3; fy++) {
      for (let fx = 0; fx < 3; fx++) {
        const imageX = position.x + fx;
        const imageY = position.y + fy;
        
        if (imageX >= 0 && imageX < 28 && imageY >= 0 && imageY < 28) {
          const imagePixel = inputImage[imageY * 28 + imageX];
          const filterValue = filter[fy][fx];
          sum += imagePixel * filterValue;
        }
      }
    }
    
    // Apply ReLU
    return Math.max(0, sum);
  };
  
  // Calculate entire output feature map
  const calculateAllOutputs = () => {
    const newOutputValues = [...outputValues];
    
    for (let y = 0; y < 26; y++) {
      for (let x = 0; x < 26; x++) {
        const outputValue = calculateCurrentConvolution({ x, y });
        newOutputValues[y * 26 + x] = outputValue;
      }
    }
    
    setOutputValues(newOutputValues);
  };
  
  // Update the animation
  const updateAnimation = () => {
    setFilterPosition(prev => {
      // Calculate the current convolution result
      const outputValue = calculateCurrentConvolution();
      
      // Update the output map
      const outputX = prev.x;
      const outputY = prev.y;
      const newOutputValues = [...outputValues];
      newOutputValues[outputY * 26 + outputX] = outputValue;
      setOutputValues(newOutputValues);
      
      // Move the filter to the next position
      let newX = prev.x + 1;
      let newY = prev.y;
      
      if (newX > 25) { // End of row
        newX = 0;
        newY += 1;
      }
      
      if (newY > 25) { // End of image
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
  }, [isPlaying, speed, outputValues]);
  
  // Reset the animation
  useEffect(() => {
    if (reset) {
      setFilterPosition({ x: 0, y: 0 });
      setOutputValues(Array(26*26).fill(null));
      setReset(false);
    }
  }, [reset]);
  
  // Fill a specific pixel in the output when position changes
  useEffect(() => {
    // Calculate the current convolution result
    const outputValue = calculateCurrentConvolution();
    
    // Update the output map
    const newOutputValues = [...outputValues];
    newOutputValues[filterPosition.y * 26 + filterPosition.x] = outputValue;
    setOutputValues(newOutputValues);
  }, [filterPosition]);
  
  // Helper to get pixel brightness for display
  const getPixelStyle = (value) => {
    if (value === null) {
      return {
        backgroundColor: '#e5e7eb', // gray-200
        color: 'transparent'
      };
    }
    
    // Normalize the value to 0-255 range for display
    const normalizedValue = Math.min(255, Math.max(0, Math.floor(value / 3)));
    
    // Color based on intensity
    let bgColor = '#ffffff';
    let textColor = '#000000';
    
    if (normalizedValue > 0) {
      const green = Math.max(0, 255 - normalizedValue);
      bgColor = `rgb(0, ${green}, 0)`;
      textColor = normalizedValue > 150 ? '#ffffff' : '#000000';
    }
    
    return {
      backgroundColor: bgColor,
      color: textColor
    };
  };
  
  // For displaying the current calculation
  const getCalculationDisplay = () => {
    let display = [];
    
    for (let y = 0; y < 3; y++) {
      let row = [];
      for (let x = 0; x < 3; x++) {
        const imageX = filterPosition.x + x;
        const imageY = filterPosition.y + y;
        let pixelValue = 0;
        
        if (imageX < 28 && imageY < 28) {
          pixelValue = inputImage[imageY * 28 + imageX];
        }
        
        const filterValue = filter[y][x];
        row.push(`${pixelValue} × ${filterValue}`);
      }
      display.push(row.join(' + '));
    }
    
    return display;
  };
  
  return (
    <div className="flex flex-col bg-gray-50 p-6 w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">Convolutional Layer Animation</h1>
      <h2 className="text-lg text-gray-600 mb-6 text-center">Visualizing Conv2D(32, (3,3), activation='relu', input_shape=(28, 28, 1))</h2>
      
      <div className="flex gap-6 flex-wrap justify-center">
        {/* Input Image Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-medium mb-2 text-center">Input Image (28×28×1)</h3>
          <div className="relative bg-gray-100 rounded-lg p-3 overflow-hidden inline-block">
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(28, 1fr)',
                gridTemplateRows: 'repeat(28, 1fr)',
                gap: '1px',
                width: '280px',
                height: '280px'
              }}
            >
              {inputImage.map((value, i) => {
                const x = i % 28;
                const y = Math.floor(i / 28);
                
                // Determine if this pixel is under the current filter
                const isUnderFilter = 
                  x >= filterPosition.x && 
                  x < filterPosition.x + 3 && 
                  y >= filterPosition.y && 
                  y < filterPosition.y + 3;
                
                return (
                  <div 
                    key={i}
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: `rgb(${value}, ${value}, ${value})`,
                      border: isUnderFilter ? '1px solid red' : 'none',
                      transform: isUnderFilter ? 'scale(1.1)' : 'scale(1)',
                      zIndex: isUnderFilter ? 10 : 1,
                      transition: 'all 0.2s ease'
                    }}
                  ></div>
                );
              })}
              
              {/* Overlay to show the current 3x3 filter position */}
              <div 
                className="absolute border-2 border-red-500 transition-all duration-200 pointer-events-none"
                style={{
                  left: `${filterPosition.x * 10 + 12}px`,
                  top: `${filterPosition.y * 10 + 12}px`,
                  width: '30px',
                  height: '30px'
                }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Current Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-medium mb-2 text-center">Current Filter (3×3)</h3>
          <div className="mb-2 text-gray-600 text-xs text-center">
            Feature Map #8 of 32
          </div>
          <div className="bg-yellow-50 rounded-lg p-3">
            <div className="grid grid-cols-3 gap-1">
              {filter.flat().map((value, i) => (
                <div 
                  key={i}
                  className={`w-10 h-10 flex items-center justify-center rounded ${
                    value < 0 ? 'bg-red-200' : value > 0 ? 'bg-green-200' : 'bg-gray-200'
                  }`}
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
          
          {/* Current calculation visualization */}
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-1 text-center">Current Calculation</h4>
            <div className="bg-blue-50 rounded p-3 text-sm">
              {isPlaying || filterPosition.x > 0 || filterPosition.y > 0 ? (
                <>
                  <div className="mb-1 font-mono">
                    Position: ({filterPosition.x}, {filterPosition.y})
                  </div>
                  <div className="font-mono text-xs">
                    Sum =
                    {getCalculationDisplay().map((row, i) => (
                      <div key={i}>{row}</div>
                    ))}
                  </div>
                  <div className="mt-1 font-medium">
                    Result = {calculateCurrentConvolution()} (after ReLU)
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500">
                  Press Play to start the convolution
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Output Feature Map Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-medium mb-2 text-center">Output Feature Map (26×26)</h3>
          <div className="mb-2 text-gray-600 text-xs text-center">
            1 of 32 feature maps (filter #8)
          </div>
          <div className="bg-gray-100 rounded-lg p-3 overflow-hidden inline-block">
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(26, 1fr)',
                gridTemplateRows: 'repeat(26, 1fr)',
                gap: '1px',
                width: '260px',
                height: '260px'
              }}
            >
              {outputValues.map((value, i) => {
                const x = i % 26;
                const y = Math.floor(i / 26);
                
                // Highlight the current position
                const isCurrent = x === filterPosition.x && y === filterPosition.y;
                const pixelStyle = getPixelStyle(value);
                
                return (
                  <div 
                    key={i}
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: pixelStyle.backgroundColor,
                      color: showValues ? pixelStyle.color : 'transparent',
                      border: isCurrent ? '1px solid red' : 'none',
                      transform: isCurrent ? 'scale(1.1)' : 'scale(1)',
                      zIndex: isCurrent ? 10 : 1,
                      transition: 'all 0.2s ease',
                      fontSize: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {showValues && value !== null ? value : ''}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-2 flex justify-center">
            <button
              onClick={() => setShowValues(!showValues)}
              className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
            >
              {showValues ? 'Hide Values' : 'Show Values'}
            </button>
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
            setIsPlaying(false);
            calculateAllOutputs();
          }}
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
        <h3 className="font-bold text-lg mb-2">How Convolution Works:</h3>
        <div className="space-y-2 text-sm">
          <p>
            1. A 3×3 filter (this one detects vertical edges) slides across the input image, one pixel at a time.
          </p>
          <p>
            2. At each position, the filter multiplies each of its values with the corresponding image pixel values.
          </p>
          <p>
            3. These multiplications are summed up to produce one output pixel in the feature map.
          </p>
          <p>
            4. The ReLU activation function replaces any negative results with zero.
          </p>
          <p>
            5. The resulting feature map highlights vertical edges in the shirt image (where pixel values change from dark to light or vice versa).
          </p>
          <p>
            6. In a real CNN, this process is repeated with 32 different filters to detect various features like horizontal edges, corners, textures, etc.
          </p>
        </div>
      </div>
    </div>
  );
}
