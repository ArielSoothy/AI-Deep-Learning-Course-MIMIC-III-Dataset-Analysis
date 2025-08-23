import React, { useState, useEffect, useRef } from 'react';
import { select, scaleLinear, scaleBand, axisBottom, axisLeft, line, format } from 'd3';
import './index.css';

const ClusteringVisualizer = () => {
  const [selectedMetric, setSelectedMetric] = useState('silhouette');
  const [selectedClusterCount, setSelectedClusterCount] = useState(2);

  const metricsChartRef = useRef(null);
  const clusterFeaturesRef = useRef(null);

  // Key results of the K-means clustering analysis
  const results = [
    { k: 2, silhouette: 0.3112, davies_bouldin: 1.4762, interpretation: 'Best silhouette score, clear separation between diabetic/non-diabetic patients', isBestSilhouette: true, isBestDavies: false },
    { k: 3, silhouette: 0.3064, davies_bouldin: 1.2913, interpretation: 'Further subdivides groups but with less clear separation', isBestSilhouette: false, isBestDavies: false },
    { k: 4, silhouette: 0.2982, davies_bouldin: 1.2012, interpretation: 'Lowest silhouette score, indicating less distinct clusters', isBestSilhouette: false, isBestDavies: false },
    { k: 5, silhouette: 0.3002, davies_bouldin: 1.1666, interpretation: 'Improvement in Davies-Bouldin score, better compactness', isBestSilhouette: false, isBestDavies: false },
    { k: 6, silhouette: 0.3010, davies_bouldin: 1.1411, interpretation: 'Best Davies-Bouldin score, indicating most compact clusters', isBestSilhouette: false, isBestDavies: true },
  ];

  const datasetInfo = {
    totalPatients: 956,
    features: ['Age', 'BMI', 'Diabetes', 'Heart Rate'],
    description: 'MIMIC-III medical dataset with patient health features'
  };

  // Evaluation metrics data
  const clusterEvaluationMetrics = {
    silhouette: [
      { clusters: 2, score: 0.3112, best: true },
      { clusters: 3, score: 0.3064, best: false },
      { clusters: 4, score: 0.2982, best: false },
      { clusters: 5, score: 0.3002, best: false },
      { clusters: 6, score: 0.3010, best: false }
    ],
    daviesBouldin: [
      { clusters: 2, score: 1.4762, best: false },
      { clusters: 3, score: 1.2913, best: false },
      { clusters: 4, score: 1.2012, best: false },
      { clusters: 5, score: 1.1666, best: false },
      { clusters: 6, score: 1.1411, best: true }
    ]
  };

  // Statistics for the 2-cluster solution
  const clusterStats = {
    2: [
      {
        name: "Diabetic Group",
        count: 423,
        features: {
          'Age': { mean: 71.8, std: 13.8 },
          'BMI': { mean: 32.9, std: 11.2 },
          'Diabetes': { percentage: 97.6, count: 413 },
          'Heart Rate': { mean: 81.4, std: 15.1 }
        }
      },
      {
        name: "Non-Diabetic Group",
        count: 533,
        features: {
          'Age': { mean: 75.3, std: 13.2 },
          'BMI': { mean: 28.1, std: 6.9 },
          'Diabetes': { percentage: 0.0, count: 0 },
          'Heart Rate': { mean: 86.2, std: 16.6 }
        }
      }
    ]
  };

  // D3 chart for metrics visualization
  useEffect(() => {
    if (!metricsChartRef.current) return;

    const data = selectedMetric === 'silhouette' ?
      clusterEvaluationMetrics.silhouette :
      clusterEvaluationMetrics.daviesBouldin;

    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    select(metricsChartRef.current).selectAll("*").remove();

    const svgElement = select(metricsChartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const g = svgElement
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = scaleBand()
      .domain(data.map(d => d.clusters))
      .range([0, width])
      .padding(0.2);

    const y = scaleLinear()
      .domain([
        selectedMetric === 'silhouette' ? 0 : Math.min(...data.map(d => d.score)) * 0.95,
        Math.max(...data.map(d => d.score)) * 1.05
      ])
      .range([height, 0]);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(axisBottom(x).tickFormat(d => `${d}`))
      .append("text")
      .attr("x", width / 2)
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .text("Number of Clusters");

    g.append("g")
      .call(axisLeft(y).ticks(5).tickFormat(format(".2f")))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .text(selectedMetric === 'silhouette' ? "Silhouette Score (higher is better)" : "Davies-Bouldin Score (lower is better)");

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.clusters))
      .attr("y", d => y(d.score))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.score))
      .attr("fill", d => d.best ? (selectedMetric === 'silhouette' ? "#38B2AC" : "#ED64A6") : "#4299E1");

    const lineGenerator = line()
      .x(d => x(d.clusters) + x.bandwidth() / 2)
      .y(d => y(d.score));

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#718096")
      .attr("stroke-width", 2)
      .attr("d", lineGenerator);

    g.selectAll(".point")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "point")
      .attr("cx", d => x(d.clusters) + x.bandwidth() / 2)
      .attr("cy", d => y(d.score))
      .attr("r", d => d.best ? 7 : 5)
      .attr("fill", d => d.best ? (selectedMetric === 'silhouette' ? "#38B2AC" : "#ED64A6") : "#4299E1");

    const bestScore = data.find(d => d.best);
    if (bestScore) {
      const bestColor = selectedMetric === 'silhouette' ? "#38B2AC" : "#ED64A6";
      g.append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", y(bestScore.score))
        .attr("y2", y(bestScore.score))
        .attr("stroke", bestColor)
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "3,3");

      g.append("text")
        .attr("x", 5)
        .attr("y", y(bestScore.score) - 5)
        .attr("fill", bestColor)
        .attr("font-size", "12px")
        .text(`Best: ${bestScore.score.toFixed(3)} (${bestScore.clusters} clusters)`);
    }
  }, [selectedMetric]);

  // D3 chart for cluster feature comparison
  useEffect(() => {
    if (!clusterFeaturesRef.current || selectedClusterCount !== 2 || !clusterStats[2]) return;

    const clusterData = clusterStats[2];
    const features = ['Age', 'BMI', 'Heart Rate'];
    const margin = { top: 30, right: 20, bottom: 50, left: 60 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    select(clusterFeaturesRef.current).selectAll("*").remove();

    const svg = select(clusterFeaturesRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const featureScale = scaleBand()
      .domain(features)
      .range([0, width])
      .padding(0.3);

    const maxMean = Math.max(...features.map(f => Math.max(clusterData[0].features[f].mean, clusterData[1].features[f].mean)));
    const valueScale = scaleLinear()
      .domain([0, maxMean * 1.1])
      .range([height, 0]);

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(axisBottom(featureScale))
      .append("text")
      .attr("x", width / 2)
      .attr("y", 40)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .text("Features");

    svg.append("g")
      .call(axisLeft(valueScale).ticks(5))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -45)
      .attr("x", -height / 2)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .text("Average Value");

    const clusterGroupScale = scaleBand()
      .domain(clusterData.map(d => d.name))
      .range([0, featureScale.bandwidth()])
      .padding(0.05);

    const featureGroups = svg.selectAll(".feature-group")
      .data(features)
      .enter()
      .append("g")
      .attr("class", "feature-group")
      .attr("transform", d => `translate(${featureScale(d)},0)`);

    featureGroups.selectAll("rect")
      .data(feature => clusterData.map(cluster => ({ feature, cluster })))
      .enter()
      .append("rect")
      .attr("x", d => clusterGroupScale(d.cluster.name))
      .attr("y", d => valueScale(d.cluster.features[d.feature].mean))
      .attr("width", clusterGroupScale.bandwidth())
      .attr("height", d => height - valueScale(d.cluster.features[d.feature].mean))
      .attr("fill", d => d.cluster.name === "Diabetic Group" ? "#4299E1" : "#38B2AC");

    const legend = svg.append("g")
      .attr("transform", `translate(${width - 150}, -20)`);

    legend.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "#4299E1");
    legend.append("text")
      .attr("x", 15)
      .attr("y", 10)
      .text("Diabetic Group")
      .attr("font-size", "12px");

    legend.append("rect")
      .attr("x", 0)
      .attr("y", 15)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "#38B2AC");
    legend.append("text")
      .attr("x", 15)
      .attr("y", 25)
      .text("Non-Diabetic Group")
      .attr("font-size", "12px");
  }, [selectedClusterCount]);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header Section */}
      <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">K-means Clustering Analysis</h1>
        <p className="text-gray-600">
          Analyzing patient groupings in the MIMIC-III dataset using K-means clustering
        </p>
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Task & Dataset</h2>
          <p className="text-gray-600 mb-3">
            Applied K-means clustering to group {datasetInfo.totalPatients} patients based on {datasetInfo.features.join(', ')}.
            Evaluated clusters using Silhouette and Davies-Bouldin scores.
          </p>
          <div className="p-3 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800">Key Findings</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-700">
              <li>Two distinct patient groups emerged, primarily separated by <strong>diabetes status</strong></li>
              <li>Diabetic group (423 patients) had significantly <strong>higher BMI</strong> (32.9 vs 28.1)</li>
              <li>Best separation (Silhouette): <strong>K=2</strong></li>
              <li>Most compact clusters (Davies-Bouldin): <strong>K=6</strong></li>
            </ul>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Clinical Relevance</h2>
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-green-800 text-sm">
              The clustering analysis confirms the <strong>strong clinical relationship between obesity and diabetes</strong>. 
              The diabetic cluster shows BMI in the obese range (32.9), while the non-diabetic cluster shows BMI in the 
              overweight range (28.1).
            </p>
          </div>
          
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700 mb-2">Patient Group Characteristics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 text-sm">Diabetic Group (423)</h4>
                <ul className="mt-1 space-y-1 text-xs">
                  <li>BMI: 32.9 ± 11.2 (obese)</li>
                  <li>Age: 71.8 ± 13.8 years</li>
                  <li>Heart Rate: 81.4 ± 15.1 bpm</li>
                </ul>
              </div>
              <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                <h4 className="font-semibold text-teal-800 text-sm">Non-Diabetic Group (533)</h4>
                <ul className="mt-1 space-y-1 text-xs">
                  <li>BMI: 28.1 ± 6.9 (overweight)</li>
                  <li>Age: 75.3 ± 13.2 years</li>
                  <li>Heart Rate: 86.2 ± 16.6 bpm</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Visualization Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Cluster Evaluation Metrics</h2>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-4 py-2 rounded-md text-sm ${selectedMetric === 'silhouette' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => setSelectedMetric('silhouette')}
            >
              Silhouette Score (higher is better)
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm ${selectedMetric === 'daviesBouldin' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => setSelectedMetric('daviesBouldin')}
            >
              Davies-Bouldin Score (lower is better)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div ref={metricsChartRef} className="w-full h-80"></div>
            <p className="text-center text-xs text-gray-500 mt-2">
              Scores for K-means clustering with 2 to 6 clusters. Best score highlighted.
            </p>
          </div>
          
          <div>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800">Interpreting the Metrics</h3>
              <div className="mt-2 space-y-3">
                <div className="p-2 bg-gray-50 rounded">
                  <h4 className="font-medium text-blue-700 text-sm">Silhouette Score</h4>
                  <p className="text-xs text-gray-600">
                    Measures how similar points are to their own cluster vs. other clusters.
                    Range: -1 to 1. Higher values mean better-defined, well-separated clusters.
                  </p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <h4 className="font-medium text-blue-700 text-sm">Davies-Bouldin Score</h4>
                  <p className="text-xs text-gray-600">
                    Measures the average similarity ratio of each cluster with its most similar cluster.
                    Lower values indicate better clustering with compact, well-separated clusters.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border text-xs">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-1">Clusters</th>
                    <th className="border p-1">Silhouette ↑</th>
                    <th className="border p-1">Davies-Bouldin ↓</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map(r => (
                    <tr key={r.k}>
                      <td className="border p-1 text-center">{r.k}</td>
                      <td className={`border p-1 text-center ${r.isBestSilhouette ? 'font-bold bg-green-50' : ''}`}>
                        {r.silhouette.toFixed(4)}
                      </td>
                      <td className={`border p-1 text-center ${r.isBestDavies ? 'font-bold bg-green-50' : ''}`}>
                        {r.davies_bouldin.toFixed(4)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Cluster Features Visualization */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">2-Cluster Solution Features</h2>
        <p className="text-gray-600 mb-4">
          Comparison of average feature values between the two main clusters:
        </p>
        <div ref={clusterFeaturesRef} className="w-full h-80 mx-auto"></div>
        <p className="text-center text-xs text-gray-500 mt-2">
          Bar chart comparing average Age, BMI, and Heart Rate between diabetic and non-diabetic groups.
        </p>
      </div>

      {/* Key Takeaways Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-lg shadow-md">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li>K-means clustering identified two primary patient groups, separated mainly by diabetes status and BMI</li>
            <li>Different evaluation metrics suggested different optimal cluster counts:
              <ul className="list-circle pl-5 mt-1 space-y-1">
                <li>Silhouette score favored K=2 (better separation)</li>
                <li>Davies-Bouldin favored K=6 (more compact clusters)</li>
              </ul>
            </li>
            <li>The 2-cluster solution provides valuable clinical insights about the diabetes-obesity relationship</li>
          </ul>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Technical Considerations</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
            <li>Feature standardization was essential to prevent BMI from dominating</li>
            <li>K-means requires selecting K in advance - evaluation metrics help</li>
            <li>K-means assumes spherical clusters of similar size</li>
            <li>Different metrics may suggest different optimal K values</li>
            <li>Clinical interpretation is as important as statistical evaluation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClusteringVisualizer;