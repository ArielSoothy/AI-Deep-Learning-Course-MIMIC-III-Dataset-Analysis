import React, { useState, useEffect, useRef } from 'react';

const BiasVarianceVisualizer = () => {
  const [complexity, setComplexity] = useState(50);
  const [showExplanations, setShowExplanations] = useState(false);
  const [animationState, setAnimationState] = useState('paused');
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const complexityRef = useRef(complexity);
  const animationRef = useRef(null);

  useEffect(() => {
    complexityRef.current = complexity;
  }, [complexity]);

  useEffect(() => {
    if (animationState === 'playing') {
      let direction = 1;
      const animate = () => {
        setComplexity(prev => {
          let next = prev + direction * animationSpeed;
          if (next >= 100) { direction = -1; return 100; }
          if (next <= 0) { direction = 1; return 0; }
          return next;
        });
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationRef.current);
    }
  }, [animationState, animationSpeed]);

  const calculateBiasError = c => 100 - c * 0.9;
  const calculateVarianceError = c => c * 0.6;
  const calculateTotalError = c => 10 + calculateBiasError(c) * 0.4 + calculateVarianceError(c) * 0.6;

  const optimalComplexity = 53;
  const biasError = calculateBiasError(complexity);
  const varianceError = calculateVarianceError(complexity);
  const totalError = calculateTotalError(complexity);

  const getStatusColor = () => {
    if (complexity < 40) return { status: 'High Bias (Underfitting)', color: 'text-red-600', bgColor: 'bg-red-100', description: 'Model is too simple and cannot capture the underlying patterns' };
    if (complexity > 65) return { status: 'High Variance (Overfitting)', color: 'text-blue-600', bgColor: 'bg-blue-100', description: 'Model is too complex and captures noise in the training data' };
    return { status: 'Balanced (Good Generalization)', color: 'text-green-600', bgColor: 'bg-green-100', description: 'Optimal trade-off between bias and variance' };
  };
  const statusInfo = getStatusColor();

  const trainingError = 100 - complexity * 0.98;
  const testError = calculateTotalError(complexity);

  return (
    <>   
      <div className="p-4 border rounded-lg shadow-lg bg-white max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Bias-Variance Trade-off Interactive Visualizer</h2>

        {/* Controls */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Model Complexity</h3>
            <div className="flex space-x-2">
              <button onClick={() => setAnimationState(s => s === 'playing' ? 'paused' : 'playing')} className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600">
                {animationState === 'playing' ? 'Pause' : 'Play'}
              </button>
              <button onClick={() => setShowExplanations(e => !e)} className="px-3 py-1 rounded bg-gray-500 text-white hover:bg-gray-600">
                {showExplanations ? 'Hide Explanations' : 'Show Explanations'}
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Simple</span>
            <input type="range" min="0" max="100" value={complexity} onChange={e => setComplexity(+e.target.value)} className="w-full" />
            <span className="text-sm">Complex</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Complexity: {complexity}% {complexity === optimalComplexity && '(Optimal)'}
          </div>
        </div>

        {/* Status */}
        <div className={`p-4 rounded-lg mb-6 ${statusInfo.bgColor}`}>
          <h3 className={`font-bold ${statusInfo.color}`}>{statusInfo.status}</h3>
          <p className="text-gray-700">{statusInfo.description}</p>
        </div>

        {/* Error Bars */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Error Components</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[
              ['Bias Error', biasError.toFixed(1), 'red'],
              ['Variance Error', varianceError.toFixed(1), 'blue'],
              ['Total Error', totalError.toFixed(1), 'purple'],
            ].map(([label, value, color]) => (
              <div key={label} className="relative pt-1">
                <div className="flex justify-between mb-1">
                  <span className={`text-xs font-semibold text-${color}-600`}>{label}</span>
                  <span className={`text-xs font-semibold text-${color}-600`}>{value}%</span>
                </div>
                <div className={`overflow-hidden h-2 text-xs flex rounded bg-${color}-200`}>
                  <div style={{ width: `${value}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${color}-500`} />
                </div>
              </div>
            ))}
          </div>
          {showExplanations && (
            <div className="text-sm text-gray-700 bg-gray-50 p-4 rounded mb-4">
              <h4 className="font-semibold mb-2">What's happening here?</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><span className="text-red-600 font-medium">Bias</span> decreases as model complexity increases</li>
                <li><span className="text-blue-600 font-medium">Variance</span> increases as model complexity increases</li>
                <li><span className="text-purple-600 font-medium">Total Error</span> combines both plus irreducible error</li>
                <li>Optimal point balances bias and variance</li>
              </ul>
            </div>
          )}
        </div>

        {/* Training vs Test Graph */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Training vs. Test Performance</h3>
          <div className="relative h-72 border-2 border-gray-300 rounded-lg bg-white">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              <path d="M0,10 Q50,50 100,90" stroke="green" strokeWidth="2" fill="none" />
              <path d="M0,80 Q25,40 50,60 T100,80" stroke="red" strokeWidth="2" fill="none" />
              <line x1={complexity} y1="0" x2={complexity} y2="100" stroke="#333" strokeDasharray="3,3" />
              <line x1={optimalComplexity} y1="0" x2={optimalComplexity} y2="100" stroke="purple" strokeWidth="1.5" />
              <circle cx={complexity} cy={100 - trainingError} r="2.5" fill="green" stroke="white" strokeWidth="0.5" />
              <circle cx={complexity} cy={100 - testError} r="2.5" fill="red" stroke="white" strokeWidth="0.5" />
              <text x="50" y="105" fill="gray" fontSize="4" textAnchor="middle">Model Complexity</text>
              <text transform="translate(-10,50) rotate(-90)" fill="gray" fontSize="4" textAnchor="middle">Error</text>
            </svg>
          </div>

          <div className="flex text-xs text-center text-gray-700 font-medium mt-2">
            <div className="flex-1 bg-red-200 py-1 border border-red-300">Underfitting</div>
            <div className="flex-1 bg-green-200 py-1 border border-green-300">Good Fit</div>
            <div className="flex-1 bg-blue-200 py-1 border border-blue-300">Overfitting</div>
          </div>

          {showExplanations && (
            <div className="text-sm text-gray-700 bg-gray-50 p-4 rounded mt-4">
              <h4 className="font-semibold mb-2">What this graph shows:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><span className="text-green-600">Training error</span> decreases with complexity</li>
                <li><span className="text-red-600">Test error</span> is U-shaped</li>
                <li>Minimum test error is the optimal point</li>
                <li>Large gap ⇒ overfitting</li>
              </ul>
            </div>
          )}
        </div>

        {/* Signs and NN Implications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="border p-4 rounded-lg">
            <h4 className="font-semibold text-red-600 mb-2">Underfitting Signs</h4>
            <ul className="text-sm list-disc pl-5">
              <li>High training error</li>
              <li>High test error</li>
              <li>Model too simple</li>
              <li>Poor fit</li>
            </ul>
          </div>
          <div className="border p-4 rounded-lg">
            <h4 className="font-semibold text-green-600 mb-2">Good Fit Signs</h4>
            <ul className="text-sm list-disc pl-5">
              <li>Low training error</li>
              <li>Low test error</li>
              <li>Small gap</li>
              <li>Generalizes well</li>
            </ul>
          </div>
          <div className="border p-4 rounded-lg">
            <h4 className="font-semibold text-blue-600 mb-2">Overfitting Signs</h4>
            <ul className="text-sm list-disc pl-5">
              <li>Very low training error</li>
              <li>High test error</li>
              <li>Large gap</li>
              <li>Poor generalization</li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">Neural Network Implications</h4>
          <p className="text-sm text-gray-700 mb-2">Control the trade-off via:</p>
          <ul className="text-sm list-disc pl-5 text-gray-700">
            <li>Network size (layers/neurons)</li>
            <li>Regularization (L1/L2/dropout)</li>
            <li>Early stopping</li>
            <li>Data augmentation</li>
          </ul>
        </div>

        <div className="mt-4 text-right text-xs text-gray-500">
          Animation Speed:
          <select value={animationSpeed} onChange={e => setAnimationSpeed(+e.target.value)} className="ml-2 border rounded p-1">
            <option value={0.5}>Slow</option>
            <option value={1}>Normal</option>
            <option value={2}>Fast</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default BiasVarianceVisualizer;