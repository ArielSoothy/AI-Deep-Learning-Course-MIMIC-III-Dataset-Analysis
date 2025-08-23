import React, { useState } from 'react';

const RegressionModelVisualizer = () => {
  // State to track which model is being viewed in detail
  const [activeModel, setActiveModel] = useState('knn'); // Default to best RMSE
  // State to control which metric is being viewed in the bar chart
  const [activeMetric, setActiveMetric] = useState('rmse');

  // Simplified model performance data
  const modelData = {
    'linear': {
      name: 'Linear Regression',
      rmse: 8.08,
      r2: 0.0627,
    },
    'svr': {
      name: 'SVM Regressor',
      rmse: 8.46,
      r2: -0.0916, // Corrected R2 from notebook
    },
    'dt': {
      name: 'Decision Tree', // Simplified name
      rmse: 10.32,
      r2: -0.7099,
    },
    'knn': {
      name: 'KNN Regressor',
      rmse: 7.88,
      r2: 0.1116, // Corrected R2 from notebook
    }
  };

  // Simplified metrics descriptions
  const metricDescriptions = {
    rmse: {
      name: "Root Mean Squared Error (RMSE)",
      formula: "√(Σ(y_i - ŷ_i)² / n)",
      description: "Square root of the average squared difference between predicted and actual BMI.",
      interpretation: "Lower is better. In BMI units (kg/m²)."
    },
    r2: {
      name: "R-squared (R²)",
      formula: "1 - (Σ(y_i - ŷ_i)² / Σ(y_i - ȳ)²)",
      description: "Proportion of BMI variance explained by age and blood sodium.",
      interpretation: "Higher is better (max 1). 0 = no better than mean, < 0 = worse than mean."
    }
  };

  // Calculate best model for current metric
  const getBestModel = () => {
    const metricIsBetter = (a, b) => {
      // R²: higher is better; RMSE: lower is better
      return activeMetric === 'r2' ? a > b : a < b;
    };

    let bestModelKey = Object.keys(modelData)[0];
    let bestValue = modelData[bestModelKey][activeMetric];

    Object.keys(modelData).forEach(key => {
      if (metricIsBetter(modelData[key][activeMetric], bestValue)) {
        bestValue = modelData[key][activeMetric];
        bestModelKey = key;
      }
    });

    return bestModelKey;
  };

  const bestModel = getBestModel();

  // Get appropriate bar color
  const getBarColor = (modelKey) => {
    if (modelKey === activeModel) {
      return 'bg-blue-600'; // Selected model
    } else if (modelKey === bestModel) {
      return 'bg-green-500'; // Best model for the current metric
    }
    return 'bg-gray-400'; // Other models
  };

  // Calculate bar height percentage - completely revised
  const getBarHeight = (modelKey) => {
    const value = modelData[modelKey][activeMetric];
    
    if (activeMetric === 'r2') {
      // For R² (higher is better)
      // If R² is negative, show minimal bar (5%)
      if (value < 0) return 5;
      
      // For positive R², scale from 0 to max value (around 0.11)
      // Maximum R² in our data is ~0.11, so scale that to 80% height
      return Math.min((value / 0.15) * 80, 80);
    } else {
      // For RMSE (lower is better)
      // Range is roughly 7.8 to 10.3
      // Invert so lower values get taller bars
      // First get the relative position between min and max RMSE
      const minRMSE = 7.5;  // Slightly below lowest value
      const maxRMSE = 10.5; // Slightly above highest value
      const range = maxRMSE - minRMSE;
      
      // Invert: taller bars for lower RMSE
      return Math.max(85 - ((value - minRMSE) / range) * 80, 5);
    }
  };

  // Formatter for metric values
  const formatMetric = (value, metric) => {
    return value.toFixed(metric === 'r2' ? 4 : 2);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1 text-center">Regression Models: Predicting BMI</h1>
        <p className="text-gray-600 text-sm text-center">
          Evaluating BMI prediction using only Age and Blood Sodium (Q1.d)
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Model selection and metrics panel */}
        <div className="md:w-1/3 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Models</h2>
          {/* Model selection buttons */}
          <div className="space-y-2 mb-4">
            {Object.keys(modelData).map(key => (
              <button
                key={key}
                onClick={() => setActiveModel(key)}
                className={`w-full text-left p-2 rounded-md text-sm ${
                  activeModel === key
                    ? 'bg-blue-100 border border-blue-300 text-blue-800 font-medium'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
              >
                {modelData[key].name}
                <div className="text-xs mt-1">
                  RMSE: {modelData[key].rmse.toFixed(2)} | R²: {modelData[key].r2.toFixed(4)}
                </div>
              </button>
            ))}
          </div>

          {/* Metric selector */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2 text-sm">Compare by:</h3>
            <div className="grid grid-cols-2 gap-1 text-sm">
              {Object.keys(metricDescriptions).map(key => (
                <button
                  key={key}
                  onClick={() => setActiveMetric(key)}
                  className={`p-2 rounded ${
                    activeMetric === key
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  {metricDescriptions[key].name.split('(')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Charts and visualizations panel */}
        <div className="md:w-2/3 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Performance Comparison</h2>

          {/* Bar Chart */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2 text-center">
              {metricDescriptions[activeMetric].name} Comparison
              <span className="font-normal text-xs">
                {activeMetric === 'r2' ? " (Higher is Better)" : " (Lower is Better)"}
              </span>
            </h3>
            <div className="h-64 flex items-end space-x-4 border-b border-gray-300 px-2">
              {Object.keys(modelData).map(key => {
                const value = modelData[key][activeMetric];
                const heightPercent = getBarHeight(key);
                
                return (
                  <div
                    key={key}
                    className="flex flex-col items-center flex-1 cursor-pointer group"
                    onClick={() => setActiveModel(key)}
                    title={`${modelData[key].name}: ${formatMetric(value, activeMetric)}`}
                  >
                    <div className="w-full flex flex-col items-center justify-end h-full relative">
                      {/* Debug info - optional, can be removed */}
                      <div className="absolute -top-8 text-xs text-gray-400 w-full text-center">
                        {heightPercent.toFixed(0)}%
                      </div>
                      
                      {/* Bar */}
                      <div
                        className={`w-3/4 ${getBarColor(key)} transition-all duration-300 group-hover:opacity-80 rounded-t`}
                        style={{
                          height: `${heightPercent}%`,
                          minHeight: '4px' // Ensure minimum visibility
                        }}
                      ></div>
                      {/* Value Label */}
                      <div className="absolute -top-4 text-xs font-medium text-gray-600 w-full text-center">
                        {formatMetric(value, activeMetric)}
                      </div>
                    </div>
                    <div className="text-xs mt-2 text-center text-gray-600 group-hover:font-medium">
                      {modelData[key].name.split(' ')[0]}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Legend */}
            <div className="text-xs text-gray-500 mt-2 flex justify-center space-x-4">
              <span><span className="inline-block w-3 h-3 bg-blue-600 mr-1 rounded-sm"></span> Selected</span>
              <span><span className="inline-block w-3 h-3 bg-green-500 mr-1 rounded-sm"></span> Best</span>
              <span><span className="inline-block w-3 h-3 bg-gray-400 mr-1 rounded-sm"></span> Other</span>
            </div>
          </div>

          {/* Metric Explanation */}
          <div className="bg-gray-50 p-3 rounded border border-gray-200 mb-6">
            <h3 className="font-medium text-sm mb-1">{metricDescriptions[activeMetric].name}</h3>
            <p className="text-xs text-gray-700 mb-1">{metricDescriptions[activeMetric].description}</p>
            <p className="text-xs text-gray-700 font-medium">{metricDescriptions[activeMetric].interpretation}</p>
          </div>

          {/* Selected Model Details Section */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h3 className="text-md font-semibold text-blue-800 mb-2">
              Selected Model: {modelData[activeModel].name}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-medium text-gray-700">RMSE:</div>
              <div className="text-gray-900">{formatMetric(modelData[activeModel].rmse, 'rmse')}</div>

              <div className="font-medium text-gray-700">R-squared (R²):</div>
              <div className="text-gray-900">{formatMetric(modelData[activeModel].r2, 'r2')}</div>
            </div>
            <p className="text-xs text-gray-600 mt-3">
              {modelData[activeModel].r2 < 0 ?
                `This model performs worse than simply predicting the average BMI.` :
                modelData[activeModel].r2 < 0.1 ?
                  `This model explains very little (${(modelData[activeModel].r2 * 100).toFixed(1)}%) of the variance in BMI.` :
                  `This model explains only ${(modelData[activeModel].r2 * 100).toFixed(1)}% of the variance in BMI.`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Analysis and insights */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-semibold text-red-800 mb-2">Key Conclusion: Poor Predictive Power</h2>
        <p className="text-sm text-gray-700 mb-2">
          Predicting BMI using only <strong className="font-medium">Age</strong> and <strong className="font-medium">Blood Sodium</strong> is ineffective.
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>
            <strong className="font-medium">High RMSE:</strong> The best model (KNN) still has an error of ~7.9 BMI points, which is clinically very large (often spanning entire BMI categories).
          </li>
          <li>
            <strong className="font-medium">Low R-squared:</strong> R² values are near zero (or negative for Decision Tree), meaning the models explain almost none of the variance in BMI. They perform barely better (or worse) than simply guessing the average BMI.
          </li>
          <li>
            <strong className="font-medium">Reason:</strong> BMI primarily depends on height and weight (BMI = weight/height²). Age and blood sodium are not strong predictors.
          </li>
          <li>
            <strong className="font-medium">Improvement Requires:</strong> Relevant features like height, weight, waist circumference, or body composition data.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RegressionModelVisualizer;