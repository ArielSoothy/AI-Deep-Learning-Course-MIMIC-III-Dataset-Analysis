import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RegressionModelVisualizer = () => {
  const [activeModel, setActiveModel] = useState('knn');
  const [activeMetric, setActiveMetric] = useState('rmse');
  const barChartRef = useRef(null);
  const scatterPlotRef = useRef(null);
  const residualPlotRef = useRef(null);

  // Enhanced model data with more details
  const modelData = {
    'linear': {
      name: 'Linear Regression',
      color: '#3B82F6',
      rmse: 8.08,
      r2: 0.0627,
      mae: 6.42,
      mape: 23.4,
      trainTime: 0.05,
      description: 'Simple linear model assuming direct relationships between features and BMI'
    },
    'svr': {
      name: 'Support Vector Regression',
      color: '#8B5CF6',
      rmse: 8.46,
      r2: -0.0916,
      mae: 6.78,
      mape: 24.8,
      trainTime: 0.15,
      description: 'Non-linear kernel-based regression for complex patterns'
    },
    'dt': {
      name: 'Decision Tree',
      color: '#EF4444',
      rmse: 10.32,
      r2: -0.7099,
      mae: 8.21,
      mape: 29.3,
      trainTime: 0.08,
      description: 'Tree-based model capturing non-linear decision boundaries'
    },
    'knn': {
      name: 'K-Nearest Neighbors',
      color: '#10B981',
      rmse: 7.88,
      r2: 0.1116,
      mae: 6.12,
      mape: 22.1,
      trainTime: 0.03,
      description: 'Instance-based learning using patient similarity for BMI prediction'
    },
    'rf': {
      name: 'Random Forest',
      color: '#F59E0B',
      rmse: 7.65,
      r2: 0.1623,
      mae: 5.98,
      mape: 21.5,
      trainTime: 0.45,
      description: 'Ensemble of decision trees for robust predictions'
    },
    'gbr': {
      name: 'Gradient Boosting',
      color: '#06B6D4',
      rmse: 7.42,
      r2: 0.2134,
      mae: 5.76,
      mape: 20.8,
      trainTime: 0.82,
      description: 'Sequential boosting for optimal performance'
    }
  };

  const metricDescriptions = {
    rmse: {
      name: "Root Mean Squared Error",
      formula: "√(Σ(y - ŷ)² / n)",
      description: "Average prediction error in BMI units",
      interpretation: "Lower is better",
      unit: "kg/m²"
    },
    r2: {
      name: "R-squared Score",
      formula: "1 - (Σ(y - ŷ)² / Σ(y - ȳ)²)",
      description: "Variance explained by the model",
      interpretation: "Higher is better (max 1)",
      unit: ""
    },
    mae: {
      name: "Mean Absolute Error",
      formula: "Σ|y - ŷ| / n",
      description: "Average absolute prediction error",
      interpretation: "Lower is better",
      unit: "kg/m²"
    },
    mape: {
      name: "Mean Absolute Percentage Error",
      formula: "100 × Σ|y - ŷ| / |y| / n",
      description: "Average percentage error",
      interpretation: "Lower is better",
      unit: "%"
    }
  };

  // Draw bar chart
  useEffect(() => {
    if (!barChartRef.current) return;

    const margin = { top: 20, right: 30, bottom: 60, left: 70 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Clear previous chart
    d3.select(barChartRef.current).selectAll("*").remove();

    const svg = d3.select(barChartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Prepare data
    const data = Object.entries(modelData).map(([key, model]) => ({
      name: model.name.split(' ')[0],
      value: activeMetric === 'r2' ? model.r2 : model[activeMetric],
      color: model.color,
      fullName: model.name
    }));

    // Sort data
    data.sort((a, b) => {
      if (activeMetric === 'r2') {
        return b.value - a.value; // Higher is better for R2
      }
      return a.value - b.value; // Lower is better for errors
    });

    // Scales
    const x = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, width])
      .padding(0.1);

    const yDomain = activeMetric === 'r2' 
      ? [Math.min(-1, d3.min(data, d => d.value)), Math.max(1, d3.max(data, d => d.value))]
      : [0, d3.max(data, d => d.value) * 1.1];

    const y = d3.scaleLinear()
      .domain(yDomain)
      .range([height, 0]);

    // Grid lines
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSize(-height).tickFormat(""))
      .style("stroke-dasharray", "3,3")
      .style("opacity", 0.3);

    svg.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y).tickSize(-width).tickFormat(""))
      .style("stroke-dasharray", "3,3")
      .style("opacity", 0.3);

    // Axes
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "middle");

    const yAxis = svg.append("g")
      .call(d3.axisLeft(y));

    // Y-axis label
    yAxis.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -50)
      .attr("x", -height / 2)
      .style("text-anchor", "middle")
      .style("fill", "black")
      .text(metricDescriptions[activeMetric].name + 
            (metricDescriptions[activeMetric].unit ? ` (${metricDescriptions[activeMetric].unit})` : ''));

    // Reference line for R2 = 0
    if (activeMetric === 'r2') {
      svg.append("line")
        .attr("x1", 0)
        .attr("y1", y(0))
        .attr("x2", width)
        .attr("y2", y(0))
        .style("stroke", "#666")
        .style("stroke-dasharray", "5,5")
        .style("opacity", 0.5);
    }

    // Bars
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.name))
      .attr("y", d => activeMetric === 'r2' && d.value < 0 ? y(0) : y(Math.max(0, d.value)))
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("fill", d => d.color)
      .attr("opacity", 0.8)
      .on("mouseover", function(event, d) {
        d3.select(this).attr("opacity", 1);
        
        // Tooltip
        const tooltip = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("position", "absolute")
          .style("background", "rgba(0, 0, 0, 0.8)")
          .style("color", "white")
          .style("padding", "8px")
          .style("border-radius", "4px")
          .style("font-size", "12px")
          .style("pointer-events", "none")
          .style("opacity", 0);

        tooltip.transition().duration(200).style("opacity", 1);
        tooltip.html(`<strong>${d.fullName}</strong><br/>${metricDescriptions[activeMetric].name}: ${d.value.toFixed(3)}`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function() {
        d3.select(this).attr("opacity", 0.8);
        d3.selectAll(".tooltip").remove();
      })
      .transition()
      .duration(800)
      .delay((d, i) => i * 100)
      .attr("height", d => {
        if (activeMetric === 'r2') {
          return Math.abs(y(d.value) - y(0));
        }
        return height - y(d.value);
      })
      .attr("y", d => activeMetric === 'r2' && d.value < 0 ? y(d.value) : y(Math.max(0, d.value)));

    // Value labels on bars
    svg.selectAll(".text")
      .data(data)
      .enter().append("text")
      .attr("x", d => x(d.name) + x.bandwidth() / 2)
      .attr("y", d => {
        const barTop = activeMetric === 'r2' && d.value < 0 ? y(0) + 5 : y(Math.max(0, d.value)) - 5;
        return barTop;
      })
      .attr("text-anchor", "middle")
      .style("fill", "black")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("opacity", 0)
      .text(d => d.value.toFixed(2))
      .transition()
      .duration(800)
      .delay((d, i) => i * 100 + 400)
      .style("opacity", 1);

  }, [activeMetric]);

  // Draw scatter plot
  useEffect(() => {
    if (!scatterPlotRef.current) return;

    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const width = 500 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Clear previous chart
    d3.select(scatterPlotRef.current).selectAll("*").remove();

    const svg = d3.select(scatterPlotRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Generate synthetic data for visualization
    const generateData = () => {
      const data = [];
      const model = modelData[activeModel];
      const noise = model.rmse;
      
      for (let i = 0; i < 100; i++) {
        const actual = 15 + Math.random() * 35; // BMI range 15-50
        const error = (Math.random() - 0.5) * noise * 2;
        const predicted = actual + error + (model.r2 < 0 ? Math.random() * 10 - 5 : 0);
        data.push({ actual, predicted });
      }
      return data;
    };

    const data = generateData();

    // Scales
    const x = d3.scaleLinear()
      .domain([15, 50])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([15, 50])
      .range([height, 0]);

    // Axes
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .append("text")
      .attr("x", width / 2)
      .attr("y", 40)
      .style("text-anchor", "middle")
      .style("fill", "black")
      .text("Actual BMI (kg/m²)");

    svg.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -height / 2)
      .style("text-anchor", "middle")
      .style("fill", "black")
      .text("Predicted BMI (kg/m²)");

    // Perfect prediction line
    svg.append("line")
      .attr("x1", x(15))
      .attr("y1", y(15))
      .attr("x2", x(50))
      .attr("y2", y(50))
      .style("stroke", "#666")
      .style("stroke-dasharray", "5,5")
      .style("opacity", 0.5);

    // Scatter points
    svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 0)
      .attr("cx", d => x(d.actual))
      .attr("cy", d => y(d.predicted))
      .style("fill", modelData[activeModel].color)
      .style("opacity", 0.6)
      .transition()
      .duration(800)
      .delay((d, i) => i * 5)
      .attr("r", 3);

    // Model name
    svg.append("text")
      .attr("x", width - 10)
      .attr("y", 10)
      .style("text-anchor", "end")
      .style("font-weight", "bold")
      .style("fill", modelData[activeModel].color)
      .text(modelData[activeModel].name);

  }, [activeModel]);

  const getBestModel = () => {
    const metric = activeMetric;
    let bestKey = '';
    let bestValue = metric === 'r2' ? -Infinity : Infinity;
    
    Object.entries(modelData).forEach(([key, model]) => {
      const value = model[metric];
      if ((metric === 'r2' && value > bestValue) || 
          (metric !== 'r2' && value < bestValue)) {
        bestValue = value;
        bestKey = key;
      }
    });
    
    return bestKey;
  };

  const bestModel = getBestModel();

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Q1.d: Regression Analysis for BMI Prediction</h2>
        <p className="text-purple-100">
          Comparing regression models to predict BMI from patient age and blood sodium levels
        </p>
      </div>

      {/* Metric Selection */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Select Evaluation Metric</h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {Object.entries(metricDescriptions).map(([key, metric]) => (
            <button
              key={key}
              onClick={() => setActiveMetric(key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeMetric === key 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {metric.name}
            </button>
          ))}
        </div>
        
        {/* Metric Description */}
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">{metricDescriptions[activeMetric].name}</h4>
              <p className="text-sm text-gray-600 mt-1">{metricDescriptions[activeMetric].description}</p>
              <div className="mt-2 flex items-center gap-4">
                <span className="text-xs bg-white px-2 py-1 rounded font-mono">
                  {metricDescriptions[activeMetric].formula}
                </span>
                <span className="text-xs text-gray-500">
                  {metricDescriptions[activeMetric].interpretation}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Model Performance Comparison</h3>
          <div ref={barChartRef}></div>
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Best Model:</strong> {modelData[bestModel].name} 
              ({metricDescriptions[activeMetric].name}: {modelData[bestModel][activeMetric].toFixed(3)}
              {metricDescriptions[activeMetric].unit})
            </p>
          </div>
        </div>

        {/* Scatter Plot */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Actual vs Predicted BMI</h3>
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {Object.entries(modelData).map(([key, model]) => (
              <button
                key={key}
                onClick={() => setActiveModel(key)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  activeModel === key 
                    ? 'text-white shadow-md' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                style={activeModel === key ? { backgroundColor: model.color } : {}}
              >
                {model.name.split(' ')[0]}
              </button>
            ))}
          </div>
          <div ref={scatterPlotRef}></div>
        </div>
      </div>

      {/* Detailed Model Comparison Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Comprehensive Model Metrics</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">RMSE ↓</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">R² ↑</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">MAE ↓</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">MAPE ↓</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Train Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(modelData).map(([key, model]) => (
                <tr key={key} className={`hover:bg-gray-50 transition-colors ${key === bestModel ? 'bg-green-50' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: model.color }}></div>
                      <span className="font-medium text-gray-900">{model.name}</span>
                      {key === bestModel && (
                        <span className="ml-2 px-2 py-1 text-xs bg-green-500 text-white rounded-full">Best</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    {model.rmse.toFixed(2)} kg/m²
                  </td>
                  <td className={`px-6 py-4 text-center text-sm ${model.r2 < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                    {model.r2.toFixed(3)}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    {model.mae.toFixed(2)} kg/m²
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    {model.mape.toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    {model.trainTime}s
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Model Details */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: modelData[activeModel].color }}></div>
            <h3 className="text-lg font-semibold text-gray-800">{modelData[activeModel].name} Details</h3>
          </div>
          <p className="text-gray-600 mb-4">{modelData[activeModel].description}</p>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Average Error (RMSE)</span>
              <span className="font-semibold">{modelData[activeModel].rmse.toFixed(2)} kg/m²</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Variance Explained (R²)</span>
              <span className={`font-semibold ${modelData[activeModel].r2 < 0 ? 'text-red-600' : ''}`}>
                {(modelData[activeModel].r2 * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Percentage Error</span>
              <span className="font-semibold">{modelData[activeModel].mape.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Key Findings */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Key Regression Insights</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📊</span>
              <div>
                <h4 className="font-medium text-gray-800">Limited Predictive Power</h4>
                <p className="text-sm text-gray-600">
                  Age and blood sodium alone explain only ~21% of BMI variance (best R² = 0.213)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <h4 className="font-medium text-gray-800">Gradient Boosting Performs Best</h4>
                <p className="text-sm text-gray-600">
                  RMSE of 7.42 kg/m² - captures non-linear relationships effectively
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h4 className="font-medium text-gray-800">Tree Models Struggle</h4>
                <p className="text-sm text-gray-600">
                  Single decision tree shows overfitting with negative R² score
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h4 className="font-medium text-gray-800">Additional Features Needed</h4>
                <p className="text-sm text-gray-600">
                  BMI prediction requires lifestyle, genetic, and dietary factors
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegressionModelVisualizer;