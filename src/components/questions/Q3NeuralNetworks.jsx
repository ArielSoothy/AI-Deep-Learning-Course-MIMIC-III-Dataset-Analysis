import React, { useState, useEffect } from 'react';

const Q3NeuralNetworks = () => {
  // Add state for animation
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation control
  useEffect(() => {
    let timer;
    if (isAnimating) {
      timer = setInterval(() => {
        setAnimationStep((prev) => (prev < 3 ? prev + 1 : 0));
      }, 1500);
    }
    return () => clearInterval(timer);
  }, [isAnimating]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Neural Networks Concepts</h2>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-2">Q3.a: Steps in Training a Neural Network</h3>
        <p className="text-gray-700 mb-4">
          Describe the steps involved in training a neural network, including forward propagation and backpropagation.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Neural Network Training Process</h3>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-blue-700 mb-2">1. Initialization</h4>
          <p className="text-gray-700">
            The network starts with randomly initialized weights and biases. This random initialization breaks symmetry and ensures different neurons learn different features.
          </p>
        </div>
        
        <div className="mb-6 border-l-4 border-blue-500 pl-4">
          <h4 className="text-lg font-semibold text-blue-700 mb-2">2. Forward Propagation</h4>
          <p className="text-gray-700 mb-3">
            During forward propagation, the input data flows through the network layer by layer:
          </p>
          <ul className="list-disc pl-6 mb-3 text-gray-700">
            <li className="mb-1">Input data is fed into the network</li>
            <li className="mb-1">For each layer, compute weighted sum: Z = W·X + b</li>
            <li className="mb-1">Apply activation function: A = f(Z)</li>
            <li className="mb-1">Pass activations to the next layer</li>
            <li>Final layer outputs predictions (ŷ)</li>
          </ul>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="font-mono text-sm">
              Z<sup>(l)</sup> = W<sup>(l)</sup>·A<sup>(l-1)</sup> + b<sup>(l)</sup><br/>
              A<sup>(l)</sup> = f(Z<sup>(l)</sup>)
            </p>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-blue-700 mb-2">3. Loss Calculation</h4>
          <p className="text-gray-700">
            Compute the loss (error) between predictions and actual values. Common loss functions include:
          </p>
          <ul className="list-disc pl-6 mb-2 text-gray-700">
            <li>Mean Squared Error (regression)</li>
            <li>Cross-Entropy Loss (classification)</li>
          </ul>
        </div>
        
        {/* Neural Network Animation */}
        <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold text-blue-700 mb-3">Forward Propagation & Loss Visualization</h4>
          
          <div className="relative h-64 bg-white rounded-lg shadow-inner p-2 overflow-hidden mb-4">
            {/* Neural Network Visualization */}
            <svg width="100%" height="100%" viewBox="0 0 600 200">
              {/* Input Layer */}
              <g>
                <text x="60" y="30" className="text-xs font-semibold">Input Layer</text>
                <circle cx="60" cy="70" r="15" fill={animationStep >= 1 ? "#93c5fd" : "#e5e7eb"} stroke="#3b82f6" strokeWidth="2" />
                <circle cx="60" cy="120" r="15" fill={animationStep >= 1 ? "#93c5fd" : "#e5e7eb"} stroke="#3b82f6" strokeWidth="2" />
                <circle cx="60" cy="170" r="15" fill={animationStep >= 1 ? "#93c5fd" : "#e5e7eb"} stroke="#3b82f6" strokeWidth="2" />
              </g>

              {/* Hidden Layer */}
              <g>
                <text x="230" y="30" className="text-xs font-semibold">Hidden Layer</text>
                <circle cx="230" cy="60" r="15" fill={animationStep >= 2 ? "#bfdbfe" : "#e5e7eb"} stroke="#3b82f6" strokeWidth="2" />
                <circle cx="230" cy="110" r="15" fill={animationStep >= 2 ? "#bfdbfe" : "#e5e7eb"} stroke="#3b82f6" strokeWidth="2" />
                <circle cx="230" cy="160" r="15" fill={animationStep >= 2 ? "#bfdbfe" : "#e5e7eb"} stroke="#3b82f6" strokeWidth="2" />
              </g>

              {/* Output Layer */}
              <g>
                <text x="400" y="30" className="text-xs font-semibold">Output Layer</text>
                <circle cx="400" cy="85" r="15" fill={animationStep >= 3 ? "#dbeafe" : "#e5e7eb"} stroke="#3b82f6" strokeWidth="2" />
                <circle cx="400" cy="135" r="15" fill={animationStep >= 3 ? "#dbeafe" : "#e5e7eb"} stroke="#3b82f6" strokeWidth="2" />
              </g>

              {/* Loss Calculation */}
              <g opacity={animationStep === 3 ? "1" : "0"} className="transition-opacity duration-500">
                <text x="520" y="85" className="text-xs font-semibold" fill="#ef4444">Target: 1</text>
                <text x="520" y="135" className="text-xs font-semibold" fill="#ef4444">Target: 0</text>
                
                <line x1="420" y1="85" x2="480" y2="85" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
                <line x1="420" y1="135" x2="480" y2="135" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
                
                <circle cx="490" cy="85" r="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
                <circle cx="490" cy="135" r="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
                <text x="486" y="89" className="text-xs font-bold" fill="#ef4444">!</text>
                <text x="486" y="139" className="text-xs font-bold" fill="#ef4444">!</text>
              </g>

              {/* Connections from input to hidden layer */}
              {[70, 120, 170].map((y1) => 
                [60, 110, 160].map((y2) => (
                  <line 
                    key={`${y1}-${y2}`}
                    x1="75" y1={y1} 
                    x2="215" y2={y2} 
                    stroke={animationStep >= 1 ? "#3b82f6" : "#d1d5db"}
                    strokeWidth="1.5"
                    strokeOpacity={animationStep >= 1 ? "0.6" : "0.2"}
                  />
                ))
              )}

              {/* Connections from hidden to output layer */}
              {[60, 110, 160].map((y1) => 
                [85, 135].map((y2) => (
                  <line 
                    key={`${y1}-${y2}`}
                    x1="245" y1={y1} 
                    x2="385" y2={y2} 
                    stroke={animationStep >= 2 ? "#3b82f6" : "#d1d5db"}
                    strokeWidth="1.5"
                    strokeOpacity={animationStep >= 2 ? "0.6" : "0.2"}
                  />
                ))
              )}
              
              {/* Animation markers */}
              {animationStep >= 1 && 
                <g>
                  <circle cx="125" cy="115" r="5" fill="#3b82f6" opacity="0.8">
                    <animate attributeName="cx" from="75" to="215" dur="1.5s" repeatCount={isAnimating ? "indefinite" : "1"} />
                    <animate attributeName="cy" from="120" to="110" dur="1.5s" repeatCount={isAnimating ? "indefinite" : "1"} />
                  </circle>
                </g>
              }
              
              {animationStep >= 2 && 
                <g>
                  <circle cx="315" cy="110" r="5" fill="#3b82f6" opacity="0.8">
                    <animate attributeName="cx" from="245" to="385" dur="1.5s" repeatCount={isAnimating ? "indefinite" : "1"} />
                    <animate attributeName="cy" from="110" to="100" dur="1.5s" repeatCount={isAnimating ? "indefinite" : "1"} />
                  </circle>
                </g>
              }
            </svg>
            
            {/* Step Information */}
            <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 p-2 rounded text-sm">
              {animationStep === 0 && <span>Initialize network</span>}
              {animationStep === 1 && <span>Input data flows to hidden layer</span>}
              {animationStep === 2 && <span>Hidden layer activations to output</span>}
              {animationStep === 3 && <span>Calculate loss vs. targets</span>}
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => setAnimationStep(prev => prev > 0 ? prev - 1 : 0)}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
            >
              Previous
            </button>
            <button 
              onClick={() => setIsAnimating(!isAnimating)}
              className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
            >
              {isAnimating ? "Pause" : "Animate"}
            </button>
            <button 
              onClick={() => setAnimationStep(prev => prev < 3 ? prev + 1 : 3)}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
            >
              Next
            </button>
          </div>
        </div>
        
        <div className="mb-6 border-l-4 border-blue-500 pl-4">
          <h4 className="text-lg font-semibold text-blue-700 mb-2">4. Backpropagation</h4>
          <p className="text-gray-700 mb-3">
            Backpropagation calculates gradients of the loss with respect to all weights and biases:
          </p>
          <ul className="list-disc pl-6 mb-3 text-gray-700">
            <li className="mb-1">Start at output layer and move backwards</li>
            <li className="mb-1">Calculate error gradient for each neuron</li>
            <li className="mb-1">Propagate error backwards through the network</li>
            <li>Apply chain rule of calculus to compute gradients</li>
          </ul>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="font-mono text-sm">
              δ<sup>(L)</sup> = ∇<sub>A</sub>L ⊙ f'(Z<sup>(L)</sup>)<br/>
              δ<sup>(l)</sup> = (W<sup>(l+1)</sup>)<sup>T</sup>·δ<sup>(l+1)</sup> ⊙ f'(Z<sup>(l)</sup>)
            </p>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-blue-700 mb-2">5. Weight Update</h4>
          <p className="text-gray-700 mb-2">
            Update all weights and biases using the calculated gradients:
          </p>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="font-mono text-sm">
              W<sup>(l)</sup> := W<sup>(l)</sup> - α·∂L/∂W<sup>(l)</sup><br/>
              b<sup>(l)</sup> := b<sup>(l)</sup> - α·∂L/∂b<sup>(l)</sup>
            </p>
          </div>
          <p className="text-gray-700 mt-2">
            Where α is the learning rate that controls step size.
          </p>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-blue-700 mb-2">6. Iteration</h4>
          <p className="text-gray-700">
            Steps 2-5 are repeated for many epochs (iterations through the entire dataset) until the model converges to a minimum of the loss function or reaches a predetermined number of epochs.
          </p>
        </div>
        
        <div className="mt-8 border-t pt-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Key Concepts:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded">
              <h5 className="font-semibold text-gray-700">Gradient Descent</h5>
              <p className="text-sm text-gray-600">Optimization algorithm that iteratively adjusts weights to minimize the loss function.</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <h5 className="font-semibold text-gray-700">Learning Rate</h5>
              <p className="text-sm text-gray-600">Controls step size during optimization. Too large: overshoot minimum. Too small: slow convergence.</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <h5 className="font-semibold text-gray-700">Batch Processing</h5>
              <p className="text-sm text-gray-600">Mini-batch gradient descent updates weights after computing loss on a subset of data.</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <h5 className="font-semibold text-gray-700">Epochs</h5>
              <p className="text-sm text-gray-600">Number of complete passes through the training dataset during training.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-semibold text-center">For information on related topics, please check:</h4>
        <div className="flex flex-col items-center mt-2 space-y-2">
          <p className="text-gray-700">• Bias-Variance Trade-off: See BiasVarianceVisualizer component</p>
          <p className="text-gray-700">• Data Preprocessing: See DataPreprocessingVisualizer component</p>
        </div>
      </div>
    </div>
  );
};

export default Q3NeuralNetworks;