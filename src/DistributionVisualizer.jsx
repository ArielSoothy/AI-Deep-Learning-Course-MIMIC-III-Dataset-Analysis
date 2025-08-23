import React, { useState } from 'react';

const DistributionVisualizer = () => {
  // State for managing which distribution to display
  const [activeDistribution, setActiveDistribution] = useState('age');

  // Helper function to generate age distribution values (left-skewed)
  function generateAgeDistribution() {
    const data = [];
    for (let i = 0; i < 500; i++) {
      const base = Math.pow(Math.random(), 0.5) * 60 + 40;
      data.push(base);
    }
    for (let i = 0; i < 200; i++) {
      data.push(89 + (Math.random() - 0.5) * 6);
    }
    for (let i = 0; i < 100; i++) {
      data.push(30 + Math.random() * 30);
    }
    return data;
  }

  // Helper function to generate BMI distribution values (right-skewed)
  function generateBMIDistribution() {
    const data = [];
    for (let i = 0; i < 200; i++) {
      data.push(23.3 + (Math.random() - 0.5) * 4);
    }
    for (let i = 0; i < 300; i++) {
      data.push(25 + Math.random() * 5);
    }
    for (let i = 0; i < 250; i++) {
      data.push(30 + Math.random() * 10);
    }
    for (let i = 0; i < 50; i++) {
      data.push(40 + Math.random() * 20);
    }
    return data;
  }

  // Helper function to generate sodium distribution values (nearly symmetrical)
  function generateSodiumDistribution() {
    const data = [];
    for (let i = 0; i < 800; i++) {
      const u = 1 - Math.random();
      const v = 1 - Math.random();
      const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
      data.push(138.89 + z * 4.15);
    }
    return data;
  }

  const sampleData = {
    age: {
      values: generateAgeDistribution(),
      mean: 74.06,
      median: 77.0,
      mode: 89.0,
      stdDev: 13.43,
      min: 18,
      max: 100,
      unit: 'years',
      bins: 10,
      description: 'Left-skewed distribution with more elderly patients',
      insights: [
        'Predominantly elderly patient population.',
        'Significant cluster around 89 years.',
        'Mean pulled down by some younger patients.',
        'Moderate spread (StdDev: 13.43 years).'
      ]
    },
    bmi: {
      values: generateBMIDistribution(),
      mean: 30.19,
      median: 28.31,
      mode: 23.30,
      stdDev: 9.33,
      min: 15,
      max: 60,
      unit: 'kg/m²',
      bins: 12,
      description: 'Right-skewed distribution with several patients having high BMI',
      insights: [
        'Average patient is obese (Mean > 30).',
        'Median patient is overweight (Median 25-30).',
        'Most common value (Mode) is normal.',
        'Wide variation (StdDev: 9.33).'
      ]
    },
    sodium: {
      values: generateSodiumDistribution(),
      mean: 138.89,
      median: 139.25,
      mode: 140.0,
      stdDev: 4.15,
      min: 125,
      max: 150,
      unit: 'mEq/L',
      bins: 8,
      description: 'Nearly symmetrical distribution, mostly within normal range',
      insights: [
        'Tightly regulated, as expected.',
        'Mean, Median, Mode within normal range (135-145).',
        'Small spread (StdDev: 4.15).',
        'Suggests normal biological regulation.'
      ]
    }
  };

  // Create histogram data for visualization
  const createHistogram = (data, bins, min, max) => {
    const histogramBins = Array(bins).fill(0);
    const binWidth = (max - min) / bins;
    data.forEach(value => {
      const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1);
      if (binIndex >= 0 && binIndex < bins) {
        histogramBins[binIndex]++;
      }
    });
    return histogramBins;
  };

  const currentData = sampleData[activeDistribution];
  const histogramData = createHistogram(
    currentData.values,
    currentData.bins,
    currentData.min,
    currentData.max
  );
  const maxBinCount = Math.max(...histogramData);
  const binWidth = (currentData.max - currentData.min) / currentData.bins;
  const binPositions = Array(currentData.bins).fill(0).map((_, index) => {
    return currentData.min + (index * binWidth) + (binWidth / 2);
  });

  const getXPosition = (value) => {
    const range = currentData.max - currentData.min;
    const position = ((value - currentData.min) / range) * 100;
    return Math.min(Math.max(position, 0), 100);
  };

  const getHistogramAreaStyle = () => {
    switch (activeDistribution) {
      case 'age':
        return { background: 'linear-gradient(180deg, #3b82f680 0%, #1d4ed880 100%)' };
      case 'bmi':
        return { background: 'linear-gradient(180deg, #ef476480 0%, #d90429a0 100%)' };
      case 'sodium':
        return { background: 'linear-gradient(180deg, #06d6a080 0%, #0f766e80 100%)' };
      default:
        return {};
    }
  };

  const calculateYAxisTicks = () => {
    const tickCount = 5;
    return Array(tickCount).fill(0).map((_, i) =>
      Math.round(maxBinCount * (i / (tickCount - 1)))
    );
  };

  const calculateXAxisTicks = () => {
    const tickCount = 6;
    const range = currentData.max - currentData.min;
    return Array(tickCount).fill(0).map((_, i) =>
      Math.round(currentData.min + (range * (i / (tickCount - 1))))
    );
  };

  const yAxisTicks = calculateYAxisTicks();
  const xAxisTicks = calculateXAxisTicks();

  return (
    <div className="flex flex-col bg-gray-50 p-6 w-full rounded-lg shadow-md">
      {/* Assignment Context Header */}
      <div className="mb-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h2 className="text-lg font-bold">Assignment Question 1.b: Data Distributions</h2>
        <p className="text-gray-700 text-sm mt-1">
          Visualizing the distributions of Age, BMI, and Blood Sodium from the MIMIC-III dataset to understand patient population characteristics.
        </p>
      </div>

      {/* Distribution Selection */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          {Object.keys(sampleData).map(key => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveDistribution(key)}
              className={`px-4 py-2 text-sm font-medium ${
                activeDistribution === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } ${key === 'age' ? 'rounded-l-lg' : ''} ${
                key === 'sodium' ? 'rounded-r-lg' : ''
              } border border-gray-300 focus:z-10 focus:ring-2 focus:ring-blue-500`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Visualization Panel */}
        <div className="md:w-2/3 bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-1 text-center">
            {activeDistribution.toUpperCase()} Distribution
          </h3>
          <p className="text-sm text-gray-600 mb-4 text-center">
            {currentData.description}
          </p>

          {/* Histogram Container */}
          <div className="relative h-64 border border-gray-200 bg-gray-50 rounded p-4 pt-8 pb-8">
            {/* Y-axis labels */}
            <div className="absolute top-0 left-0 h-full flex flex-col justify-between px-1 py-6">
              {yAxisTicks.map((tick, index) => (
                <div key={index} className="text-xs text-gray-500 -ml-1">
                  {tick}
                </div>
              ))}
              <div className="absolute -left-5 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-gray-500">Frequency</div>
            </div>

            {/* X-axis labels */}
            <div className="absolute bottom-1 left-8 right-4 flex justify-between px-0 text-xs text-gray-500">
              {xAxisTicks.map((tick, index) => (
                <div key={index} className={`${index === 0 ? 'text-left' : index === xAxisTicks.length - 1 ? 'text-right' : 'text-center'}`}>
                  {tick}
                </div>
              ))}
            </div>
             <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                {activeDistribution.charAt(0).toUpperCase() + activeDistribution.slice(1)} ({currentData.unit})
             </div>

            {/* Histogram bars */}
            <div className="absolute top-6 bottom-6 left-8 right-4 flex items-end">
              {histogramData.map((count, index) => {
                const heightPercent = maxBinCount > 0 ? (count / maxBinCount) * 100 : 0;
                return (
                  <div
                    key={index}
                    className="flex-1 mx-px flex justify-center items-end h-full relative"
                  >
                    <div
                      className="w-full"
                      style={{
                        height: `${heightPercent}%`,
                        ...getHistogramAreaStyle()
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Statistical markers - Always visible */}
            {/* Mean Marker */}
            <div
              className="absolute bottom-6 border-l-2 border-red-500 h-[calc(100%-48px)]"
              style={{ left: `calc(32px + ${getXPosition(currentData.mean)}% * (100% - 48px) / 100)` }}
              title={`Mean: ${currentData.mean}`}
            >
              <div className="absolute -left-[1px] -top-4 bg-red-100 text-red-700 rounded px-1 text-[10px] font-medium">
                M
              </div>
            </div>
            {/* Median Marker */}
            <div
              className="absolute bottom-6 border-l-2 border-blue-500 h-[calc(100%-48px)]"
              style={{ left: `calc(32px + ${getXPosition(currentData.median)}% * (100% - 48px) / 100)` }}
              title={`Median: ${currentData.median}`}
            >
               <div className="absolute -left-[1px] -top-4 bg-blue-100 text-blue-700 rounded px-1 text-[10px] font-medium" style={{marginLeft: '5px'}}>
                Md
              </div>
            </div>
            {/* Mode Marker */}
            <div
              className="absolute bottom-6 border-l-2 border-green-500 h-[calc(100%-48px)]"
              style={{ left: `calc(32px + ${getXPosition(currentData.mode)}% * (100% - 48px) / 100)` }}
              title={`Mode: ${currentData.mode}`}
            >
               <div className="absolute -left-[1px] -top-4 bg-green-100 text-green-700 rounded px-1 text-[10px] font-medium" style={{marginLeft: '10px'}}>
                Mo
              </div>
            </div>
            {/* Std Dev Range */}
            <>
              <div
                className="absolute bottom-6 border-l border-purple-400 border-dashed h-[calc(100%-48px)]"
                style={{ left: `calc(32px + ${getXPosition(currentData.mean - currentData.stdDev)}% * (100% - 48px) / 100)` }}
                title={`Mean - StdDev: ${(currentData.mean - currentData.stdDev).toFixed(2)}`}
              />
              <div
                className="absolute bottom-6 border-l border-purple-400 border-dashed h-[calc(100%-48px)]"
                style={{ left: `calc(32px + ${getXPosition(currentData.mean + currentData.stdDev)}% * (100% - 48px) / 100)` }}
                title={`Mean + StdDev: ${(currentData.mean + currentData.stdDev).toFixed(2)}`}
              />
              <div
                className="absolute bottom-[22px] h-[2px] bg-purple-300"
                style={{
                  left: `calc(32px + ${getXPosition(currentData.mean - currentData.stdDev)}% * (100% - 48px) / 100)`,
                  width: `${(getXPosition(currentData.mean + currentData.stdDev) - getXPosition(currentData.mean - currentData.stdDev))}%`,
                }}
                 title={`±1 Standard Deviation (${currentData.stdDev.toFixed(2)})`}
              >
                 <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 text-purple-700 text-[10px] font-medium">
                    ±σ
                  </div>
              </div>
            </>
          </div>
           {/* Legend for Markers */}
           <div className="mt-3 flex justify-center flex-wrap gap-x-4 gap-y-1 text-xs">
                <div className="flex items-center"><span className="w-3 h-3 bg-red-500 mr-1"></span>Mean</div>
                <div className="flex items-center"><span className="w-3 h-3 bg-blue-500 mr-1"></span>Median</div>
                <div className="flex items-center"><span className="w-3 h-3 bg-green-500 mr-1"></span>Mode</div>
                <div className="flex items-center"><span className="w-3 h-3 bg-purple-300 border border-purple-500 mr-1"></span>±1 Std Dev</div>
            </div>
        </div>

        {/* Statistics and Insights Panel */}
        <div className="md:w-1/3 bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-3 text-center">Statistics & Insights</h3>

          {/* Statistics Table */}
          <table className="w-full mb-4 text-sm">
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 px-2 font-medium text-gray-600">Mean</td>
                <td className="py-1.5 px-2 text-right">{currentData.mean.toFixed(2)} {currentData.unit}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 px-2 font-medium text-gray-600">Median</td>
                <td className="py-1.5 px-2 text-right">{currentData.median.toFixed(2)} {currentData.unit}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 px-2 font-medium text-gray-600">Mode</td>
                <td className="py-1.5 px-2 text-right">{currentData.mode.toFixed(2)} {currentData.unit}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-1.5 px-2 font-medium text-gray-600">Std. Deviation</td>
                <td className="py-1.5 px-2 text-right">{currentData.stdDev.toFixed(2)} {currentData.unit}</td>
              </tr>
               <tr>
                <td className="py-1.5 px-2 font-medium text-gray-600">Sample Size</td>
                <td className="py-1.5 px-2 text-right">{currentData.values.length}</td>
              </tr>
            </tbody>
          </table>

          {/* Distribution Shape */}
          <div className="mb-4">
            <h4 className="font-medium text-sm mb-1">Distribution Shape:</h4>
            <p className="text-sm text-gray-700">
              {activeDistribution === 'age' && <><span className="font-semibold">Left-skewed</span> (mean &lt; median)</>}
              {activeDistribution === 'bmi' && <><span className="font-semibold">Right-skewed</span> (mean &gt; median)</>}
              {activeDistribution === 'sodium' && <><span className="font-semibold">Nearly symmetrical</span> (mean ≈ median)</>}
            </p>
          </div>

          {/* Key Insights */}
          <div>
            <h4 className="font-medium text-sm mb-1">Key Insights:</h4>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {currentData.insights.map((insight, index) => (
                <li key={index}>{insight}</li>
              ))}
            </ul>
          </div>

          {/* Reference Ranges */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <h4 className="font-medium text-sm mb-1">Reference Ranges:</h4>
            <div className="text-xs text-gray-600 space-y-0.5">
              {activeDistribution === 'age' && (
                <>
                  <div>Young Adult: 18-40 yrs</div>
                  <div>Middle-aged: 41-65 yrs</div>
                  <div>Elderly: 66+ yrs</div>
                </>
              )}
              {activeDistribution === 'bmi' && (
                <>
                  <div>Underweight: &lt;18.5 kg/m²</div>
                  <div>Normal: 18.5-24.9 kg/m²</div>
                  <div>Overweight: 25-29.9 kg/m²</div>
                  <div>Obese: ≥30 kg/m²</div>
                </>
              )}
              {activeDistribution === 'sodium' && (
                <>
                  <div>Hyponatremia: &lt;135 mEq/L</div>
                  <div>Normal: 135-145 mEq/L</div>
                  <div>Hypernatremia: &gt;145 mEq/L</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributionVisualizer;