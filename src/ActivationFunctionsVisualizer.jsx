import React, { useState, useEffect, useRef } from 'react';

const ActivationFunctionsVisualizer = () => {
  const [activeFunction, setActiveFunction] = useState('relu');
  const [showComparison, setShowComparison] = useState(false);
  const canvasRef = useRef(null);
  const comparisonCanvasRef = useRef(null);

  // Define activation functions
  const activationFunctions = {
    relu: {
      name: 'ReLU',
      formula: 'f(x) = max(0, x)',
      description: 'The most commonly used activation function that outputs the input directly if positive, or zero otherwise.',
      advantages: [
        'Simple and efficient computation',
        'Helps solve vanishing gradient problem',
        'Sparse activation (many neurons output 0)'
      ],
      disadvantages: [
        'Dead neurons problem (neurons that only output 0)',
        'Not zero-centered outputs',
        'Unbounded positive activations'
      ],
      useCases: [
        'Default choice for hidden layers in most networks',
        'CNNs for image recognition',
        'Deep networks where vanishing gradients are a concern'
      ],
      calculate: (x) => Math.max(0, x),
      derivative: (x) => x > 0 ? 1 : 0,
      color: '#3366cc'
    },
    leakyRelu: {
      name: 'Leaky ReLU',
      formula: 'f(x) = max(αx, x) where α is a small constant (typically 0.01)',
      description: 'A variant of ReLU that allows small negative values when the input is less than zero.',
      advantages: [
        'Prevents dead neurons problem',
        'All benefits of ReLU',
        'Simple computation'
      ],
      disadvantages: [
        'Not zero-centered',
        'Results not as consistent as ReLU',
        'Alpha parameter needs tuning'
      ],
      useCases: [
        'When dead neurons are a problem in ReLU networks',
        'Computer vision applications',
        'As a drop-in replacement for ReLU'
      ],
      calculate: (x) => x > 0 ? x : 0.01 * x,
      derivative: (x) => x > 0 ? 1 : 0.01,
      color: '#dc3912'
    },
    sigmoid: {
      name: 'Sigmoid',
      formula: 'f(x) = 1 / (1 + e^(-x))',
      description: 'Squashes input values into the range (0, 1), historically common but now primarily used in output layers for binary classification.',
      advantages: [
        'Output bounded between 0 and 1',
        'Clear probabilistic interpretation',
        'Smooth gradient'
      ],
      disadvantages: [
        'Suffers from vanishing gradient for extreme values',
        'Not zero-centered',
        'Computationally expensive (exponential)'
      ],
      useCases: [
        'Binary classification (output layer)',
        'Gates in recurrent neural networks like LSTM',
        'When output must be interpreted as a probability'
      ],
      calculate: (x) => 1 / (1 + Math.exp(-x)),
      derivative: (x) => {
        const sigX = 1 / (1 + Math.exp(-x));
        return sigX * (1 - sigX);
      },
      color: '#ff9900'
    },
    tanh: {
      name: 'Tanh',
      formula: 'f(x) = (e^x - e^(-x)) / (e^x + e^(-x))',
      description: 'Hyperbolic tangent function that squashes inputs to range (-1, 1), with stronger gradients than sigmoid.',
      advantages: [
        'Zero-centered output (-1 to 1)',
        'Stronger gradients than sigmoid',
        'Clear saturation boundaries'
      ],
      disadvantages: [
        'Still suffers from vanishing gradient',
        'Computationally expensive',
        'Saturation can slow learning'
      ],
      useCases: [
        'Hidden layers when zero-centered output is beneficial',
        'Recurrent neural networks',
        'When input normalization is important'
      ],
      calculate: (x) => Math.tanh(x),
      derivative: (x) => 1 - Math.pow(Math.tanh(x), 2),
      color: '#109618'
    },
    elu: {
      name: 'ELU',
      formula: 'f(x) = x if x > 0 else α(e^x - 1)',
      description: 'Exponential Linear Unit - similar to ReLU but smooths the curve for negative values using an exponential function.',
      advantages: [
        'Can produce negative outputs (mean closer to zero)',
        'Robust to noise',
        'Avoids dead neuron problem'
      ],
      disadvantages: [
        'More computationally expensive than ReLU',
        'Alpha parameter needs tuning',
        'Can still saturate for large negative values'
      ],
      useCases: [
        'When you need negative outputs but want ReLU benefits',
        'Deep networks sensitive to mean activations',
        'Networks requiring self-normalizing properties'
      ],
      calculate: (x) => x > 0 ? x : 1.0 * (Math.exp(x) - 1),
      derivative: (x) => x > 0 ? 1 : 1.0 * Math.exp(x),
      color: '#990099'
    },
    swish: {
      name: 'Swish',
      formula: 'f(x) = x * sigmoid(x)',
      description: 'A self-gated activation function introduced by Google researchers that often outperforms ReLU in deep networks.',
      advantages: [
        'Smooth function with non-monotonic behavior',
        'Avoids dead neurons and vanishing gradients',
        'Often improves accuracy in deep networks'
      ],
      disadvantages: [
        'More computation than ReLU',
        'Not bounded above',
        'Relatively newer, less theoretical understanding'
      ],
      useCases: [
        'Deep networks (often as drop-in replacement for ReLU)',
        'When network performance plateaus with ReLU',
        'Mobile and embedded networks (MobileNet)'
      ],
      calculate: (x) => x / (1 + Math.exp(-x)),
      derivative: (x) => {
        const sigmoid = 1 / (1 + Math.exp(-x));
        return sigmoid + x * sigmoid * (1 - sigmoid);
      },
      color: '#0099c6'
    }
  };

  // Draw function for the canvas
  const drawActivationFunction = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 30;
    const xScale = (width - 2 * padding) / 10; // Scale for x from -5 to 5
    const yScale = (height - 2 * padding) / 10; // Scale for y, assuming range -5 to 5
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    // X-axis
    ctx.moveTo(padding, height / 2);
    ctx.lineTo(width - padding, height / 2);
    // Y-axis
    ctx.moveTo(width / 2, padding);
    ctx.lineTo(width / 2, height - padding);
    ctx.stroke();
    
    // Draw grid
    ctx.beginPath();
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 0.5;
    for (let i = -5; i <= 5; i++) {
      // Vertical grid lines
      if (i !== 0) {
        ctx.moveTo(width / 2 + i * xScale, padding);
        ctx.lineTo(width / 2 + i * xScale, height - padding);
      }
      // Horizontal grid lines
      if (i !== 0) {
        ctx.moveTo(padding, height / 2 - i * yScale);
        ctx.lineTo(width - padding, height / 2 - i * yScale);
      }
    }
    ctx.stroke();
    
    // Draw axes labels
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    // X-axis ticks and labels
    for (let i = -5; i <= 5; i++) {
      if (i !== 0) {
        const x = width / 2 + i * xScale;
        ctx.fillText(i.toString(), x, height / 2 + 20);
        ctx.beginPath();
        ctx.moveTo(x, height / 2 - 3);
        ctx.lineTo(x, height / 2 + 3);
        ctx.stroke();
      }
    }
    
    // Y-axis ticks and labels
    for (let i = -5; i <= 5; i++) {
      if (i !== 0) {
        const y = height / 2 - i * yScale;
        ctx.fillText(i.toString(), width / 2 - 15, y + 5);
        ctx.beginPath();
        ctx.moveTo(width / 2 - 3, y);
        ctx.lineTo(width / 2 + 3, y);
        ctx.stroke();
      }
    }
    
    // Draw origin label
    ctx.fillText('0', width / 2 - 15, height / 2 + 15);
    
    // Draw function
    ctx.beginPath();
    const func = activationFunctions[activeFunction].calculate;
    const derivativeFunc = activationFunctions[activeFunction].derivative;
    const color = activationFunctions[activeFunction].color;
    
    // Draw activation function
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let pixelX = padding; pixelX <= width - padding; pixelX++) {
      const x = (pixelX - width / 2) / xScale;
      const y = func(x);
      const pixelY = height / 2 - y * yScale;
      
      if (pixelX === padding) {
        ctx.moveTo(pixelX, pixelY);
      } else {
        ctx.lineTo(pixelX, pixelY);
      }
    }
    ctx.stroke();
    
    // Draw derivative with dashed line
    ctx.setLineDash([5, 3]);
    ctx.strokeStyle = '#888';
    ctx.beginPath();
    
    for (let pixelX = padding; pixelX <= width - padding; pixelX++) {
      const x = (pixelX - width / 2) / xScale;
      const y = derivativeFunc(x);
      const pixelY = Math.min(Math.max(height / 2 - y * yScale, padding), height - padding); // Clamp to avoid huge derivative values
      
      if (pixelX === padding) {
        ctx.moveTo(pixelX, pixelY);
      } else {
        ctx.lineTo(pixelX, pixelY);
      }
    }
    ctx.stroke();
    ctx.setLineDash([]); // Reset to solid line
    
    // Add legend
    ctx.font = '14px Arial';
    ctx.fillStyle = color;
    ctx.textAlign = 'start';
    ctx.fillText(activationFunctions[activeFunction].name, padding + 10, padding + 20);
    
    ctx.fillStyle = '#888';
    ctx.fillText('Derivative', padding + 10, padding + 40);
  };

  // Draw comparison of all functions
  const drawComparison = () => {
    if (!showComparison) return;
    
    const canvas = comparisonCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 30;
    const xScale = (width - 2 * padding) / 10; // Scale for x from -5 to 5
    const yScale = (height - 2 * padding) / 10; // Scale for y, assuming range -5 to 5
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    // X-axis
    ctx.moveTo(padding, height / 2);
    ctx.lineTo(width - padding, height / 2);
    // Y-axis
    ctx.moveTo(width / 2, padding);
    ctx.lineTo(width / 2, height - padding);
    ctx.stroke();
    
    // Draw grid
    ctx.beginPath();
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 0.5;
    for (let i = -5; i <= 5; i++) {
      // Vertical grid lines
      if (i !== 0) {
        ctx.moveTo(width / 2 + i * xScale, padding);
        ctx.lineTo(width / 2 + i * xScale, height - padding);
      }
      // Horizontal grid lines
      if (i !== 0) {
        ctx.moveTo(padding, height / 2 - i * yScale);
        ctx.lineTo(width - padding, height / 2 - i * yScale);
      }
    }
    ctx.stroke();
    
    // Draw axes labels
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    // X-axis ticks and labels
    for (let i = -5; i <= 5; i += 2) {
      if (i !== 0) {
        const x = width / 2 + i * xScale;
        ctx.fillText(i.toString(), x, height / 2 + 20);
        ctx.beginPath();
        ctx.moveTo(x, height / 2 - 3);
        ctx.lineTo(x, height / 2 + 3);
        ctx.stroke();
      }
    }
    
    // Y-axis ticks and labels
    for (let i = -5; i <= 5; i += 2) {
      if (i !== 0) {
        const y = height / 2 - i * yScale;
        ctx.fillText(i.toString(), width / 2 - 15, y + 5);
        ctx.beginPath();
        ctx.moveTo(width / 2 - 3, y);
        ctx.lineTo(width / 2 + 3, y);
        ctx.stroke();
      }
    }
    
    // Draw all functions
    Object.entries(activationFunctions).forEach(([key, funcData]) => {
      const func = funcData.calculate;
      const color = funcData.color;
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      for (let pixelX = padding; pixelX <= width - padding; pixelX++) {
        const x = (pixelX - width / 2) / xScale;
        const y = func(x);
        const pixelY = Math.min(Math.max(height / 2 - y * yScale, padding), height - padding); // Clamp to avoid huge values
        
        if (pixelX === padding) {
          ctx.moveTo(pixelX, pixelY);
        } else {
          ctx.lineTo(pixelX, pixelY);
        }
      }
      ctx.stroke();
      
      // Add to legend
      ctx.fillStyle = color;
      ctx.textAlign = 'start';
      ctx.fillText(funcData.name, width - padding - 100, padding + (Object.keys(activationFunctions).indexOf(key) + 1) * 20);
    });
  };
  
  // Effect to draw the canvas on mount and when activeFunction changes
  useEffect(() => {
    drawActivationFunction();
  }, [activeFunction]);
  
  // Effect to draw the comparison canvas
  useEffect(() => {
    if (showComparison) {
      drawComparison();
    }
  }, [showComparison]);

  return (
    <div className="bg-gray-50 p-6 w-full rounded-lg shadow-md flex flex-col">
      <div className="mb-4 bg-blue-50 border-l-4 border-blue-500 p-4">
        <h2 className="text-lg font-bold">Assignment Question 4</h2>
        <p className="text-gray-700">
          Describe common activation functions (ReLU, sigmoid, tanh) and explain their impact on neural network performance.
        </p>
      </div>

      {/* Activation Functions Topic Overview */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-bold mb-2">Activation Functions</h2>
        <p className="text-gray-700 mb-3">
          Activation functions are mathematical operations applied to neural network nodes that introduce non-linearity, 
          enabling networks to learn complex patterns. They transform the summed weighted input from the node into an output 
          value that is passed to the next layer.
        </p>
        <div className="border-l-4 border-yellow-500 pl-3 py-1 bg-yellow-50 mb-3">
          <p className="text-sm">
            <strong>Key Point:</strong> Without activation functions, neural networks would only be capable of learning linear 
            relationships, regardless of how many layers they have.
          </p>
        </div>
      </div>

      {/* Main visualization area */}
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left panel - Function visualization */}
        <div className="xl:w-7/12 bg-white p-4 rounded-lg shadow-md">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Interactive Visualization</h3>
            <p className="text-sm text-gray-600">
              Select an activation function to see its shape and behavior.
            </p>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {Object.keys(activationFunctions).map((func) => (
              <button
                key={func}
                onClick={() => setActiveFunction(func)}
                className={`px-3 py-1 text-sm font-medium rounded-full 
                  ${activeFunction === func 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                {activationFunctions[func].name}
              </button>
            ))}
          </div>

          <div className="border rounded-lg p-2 bg-gray-50">
            <canvas 
              ref={canvasRef} 
              width={600} 
              height={300}
              className="w-full h-auto border"
            />
          </div>

          <div className="mt-4">
            <div className="font-medium mb-1">Formula:</div>
            <div className="text-gray-700 bg-gray-100 p-2 rounded font-mono text-sm mb-4">
              {activationFunctions[activeFunction].formula}
            </div>

            <div className="font-medium mb-1">Description:</div>
            <p className="text-gray-700 mb-4">
              {activationFunctions[activeFunction].description}
            </p>
          </div>

          <button
            onClick={() => setShowComparison(!showComparison)}
            className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-2 px-4 rounded transition-colors"
          >
            {showComparison ? 'Hide Comparison' : 'Compare All Functions'}
          </button>

          {showComparison && (
            <div className="mt-4 border rounded-lg p-2 bg-gray-50">
              <h4 className="text-center mb-2 font-medium">Function Comparison</h4>
              <canvas 
                ref={comparisonCanvasRef} 
                width={600} 
                height={300}
                className="w-full h-auto border"
              />
            </div>
          )}
        </div>

        {/* Right panel - Technical details */}
        <div className="xl:w-5/12 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">
            {activationFunctions[activeFunction].name} Details
          </h3>

          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-1">Advantages</h4>
            <ul className="list-disc pl-5 text-gray-600">
              {activationFunctions[activeFunction].advantages.map((adv, index) => (
                <li key={index} className="mb-1">{adv}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-1">Disadvantages</h4>
            <ul className="list-disc pl-5 text-gray-600">
              {activationFunctions[activeFunction].disadvantages.map((disadv, index) => (
                <li key={index} className="mb-1">{disadv}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-1">Common Use Cases</h4>
            <ul className="list-disc pl-5 text-gray-600">
              {activationFunctions[activeFunction].useCases.map((useCase, index) => (
                <li key={index} className="mb-1">{useCase}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium mb-2">Impact on Neural Networks</h4>
            
            <div className="mb-2">
              <span className="inline-block w-24 font-medium">Training:</span>
              {activeFunction === 'relu' && 
                <span className="text-sm">Faster convergence, helps with deep networks</span>
              }
              {activeFunction === 'leakyRelu' && 
                <span className="text-sm">Similar to ReLU but more stable with negative inputs</span>
              }
              {activeFunction === 'sigmoid' && 
                <span className="text-sm">Can be slow due to vanishing gradients in deep networks</span>
              }
              {activeFunction === 'tanh' && 
                <span className="text-sm">Better than sigmoid for hidden layers due to zero-centered output</span>
              }
              {activeFunction === 'elu' && 
                <span className="text-sm">Good convergence with negative value handling</span>
              }
              {activeFunction === 'swish' && 
                <span className="text-sm">Often trains faster and achieves better accuracy than ReLU</span>
              }
            </div>
            
            <div className="mb-2">
              <span className="inline-block w-24 font-medium">Gradients:</span>
              {activeFunction === 'relu' && 
                <span className="text-sm">Constant gradient for positive values prevents vanishing</span>
              }
              {activeFunction === 'leakyRelu' && 
                <span className="text-sm">Always has non-zero gradient, addressing dead neurons</span>
              }
              {activeFunction === 'sigmoid' && 
                <span className="text-sm">Gradient approaches zero at the tails, causing vanishing gradients</span>
              }
              {activeFunction === 'tanh' && 
                <span className="text-sm">Stronger gradients than sigmoid but still saturates</span>
              }
              {activeFunction === 'elu' && 
                <span className="text-sm">Smooth transition at x=0 results in better gradient flow</span>
              }
              {activeFunction === 'swish' && 
                <span className="text-sm">Non-monotonic shape gives interesting gradient properties</span>
              }
            </div>
            
            <div>
              <span className="inline-block w-24 font-medium">Performance:</span>
              {activeFunction === 'relu' && 
                <span className="text-sm">Excellent general performance, computational efficiency</span>
              }
              {activeFunction === 'leakyRelu' && 
                <span className="text-sm">Better generalization than ReLU in some cases</span>
              }
              {activeFunction === 'sigmoid' && 
                <span className="text-sm">Good for binary outputs, poor for hidden layers</span>
              }
              {activeFunction === 'tanh' && 
                <span className="text-sm">Better than sigmoid for hidden layers, good for recurrent networks</span>
              }
              {activeFunction === 'elu' && 
                <span className="text-sm">Can outperform ReLU with proper hyperparameters</span>
              }
              {activeFunction === 'swish' && 
                <span className="text-sm">Often outperforms other functions in deep networks</span>
              }
            </div>
          </div>
        </div>
      </div>

      {/* Learning Outcome Section */}
      <div className="mt-6 bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">What I've Learned</h3>
        <p className="text-gray-700 mb-3">
          Through this exploration of activation functions, I've gained an understanding of:
        </p>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>How different activation functions transform input signals</li>
          <li>The trade-offs between different functions in terms of computational efficiency, vanishing gradients, and training dynamics</li>
          <li>Why functions like ReLU have become the default choice despite their simplicity</li>
          <li>How the choice of activation function impacts overall network performance and trainability</li>
          <li>The relationship between an activation function's derivative and its effect on gradient-based learning</li>
        </ul>
      </div>
    </div>
  );
};

export default ActivationFunctionsVisualizer;