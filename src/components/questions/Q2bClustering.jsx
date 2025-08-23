import React from 'react';
import ClusteringVisualizer from '../../ClusteringVisualizer';

const Q2bClustering = () => {
  const results = [
    { k: 2, silhouette: 0.3112, davies_bouldin: 1.4762, interpretation: 'Best silhouette score, clear separation between diabetic/non-diabetic patients', isBestSilhouette: true, isBestDavies: false },
    { k: 3, silhouette: 0.3064, davies_bouldin: 1.2913, interpretation: 'Further subdivides groups but with less clear separation', isBestSilhouette: false, isBestDavies: false },
    { k: 4, silhouette: 0.2982, davies_bouldin: 1.2012, interpretation: 'Lowest silhouette score, indicating less distinct clusters', isBestSilhouette: false, isBestDavies: false },
    { k: 5, silhouette: 0.3002, davies_bouldin: 1.1666, interpretation: 'Improvement in Davies-Bouldin score, better compactness', isBestSilhouette: false, isBestDavies: false },
    { k: 6, silhouette: 0.3010, davies_bouldin: 1.1411, interpretation: 'Best Davies-Bouldin score, indicating most compact clusters', isBestSilhouette: false, isBestDavies: true },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Question and Objective */}
      <div className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Q2.b: K-means Clustering Analysis</h1>
        <div className="p-4 bg-white rounded-lg shadow-sm mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">The Task</h2>
          <p className="text-gray-600">
            Apply K-means clustering to group patients based on age, BMI, diabetes, and heart rate for K=2, 3, 4, 5, and 6.
            Evaluate using Silhouette and Davies-Bouldin scores.
          </p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-1">Goal:</h3>
          <p className="text-gray-700">
            Discover natural patient groupings using K-means and assess the quality of different cluster numbers (K).
          </p>
        </div>
      </div>

      {/* Clustering Visualizer */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Interactive Clustering Visualization</h2>
        <p className="text-gray-600 mb-4">
          Explore how K-means groups patients based on Age and BMI for different cluster numbers (K).
          <br />
          <span className="text-sm text-gray-500">Clustering uses Age, BMI, Diabetes, and Heart Rate features.</span>
        </p>
        <ClusteringVisualizer />
      </div>

      {/* Results Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Clustering Evaluation Metrics</h2>
        <p className="text-gray-600 mb-4">We use two common metrics to evaluate the quality of the clusters:</p>
        <ul className="list-disc pl-5 space-y-1 text-gray-600 mb-6">
            <li><strong>Silhouette Score:</strong> Measures how similar an object is to its own cluster compared to other clusters. Ranges from -1 to 1. <span className="font-semibold text-green-700">Higher is better.</span></li>
            <li><strong>Davies-Bouldin Score:</strong> Measures the average similarity ratio of each cluster with its most similar cluster. <span className="font-semibold text-red-700">Lower is better (closer to 0).</span></li>
        </ul>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border border-gray-300 text-left">K (Clusters)</th>
                <th className="py-2 px-4 border border-gray-300 text-left">
                  Silhouette Score <span className="text-xs font-normal">(Higher is better)</span>
                </th>
                <th className="py-2 px-4 border border-gray-300 text-left">
                  Davies-Bouldin Score <span className="text-xs font-normal">(Lower is better)</span>
                </th>
                <th className="py-2 px-4 border border-gray-300 text-left">Interpretation</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.k} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border border-gray-300 text-center font-medium">{result.k}</td>
                  <td className={`py-2 px-4 border border-gray-300 text-center ${result.isBestSilhouette ? 'font-bold bg-green-100 text-green-800' : ''}`}>
                    {result.silhouette.toFixed(4)}
                    {result.isBestSilhouette && <span className="ml-1 text-xs">(Best)</span>}
                  </td>
                  <td className={`py-2 px-4 border border-gray-300 text-center ${result.isBestDavies ? 'font-bold bg-green-100 text-green-800' : ''}`}>
                    {result.davies_bouldin.toFixed(4)}
                     {result.isBestDavies && <span className="ml-1 text-xs">(Best)</span>}
                  </td>
                  <td className="py-2 px-4 border border-gray-300 text-sm">{result.interpretation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interpretation and Conclusion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 shadow-sm">
          <h3 className="text-xl font-semibold text-blue-800 mb-3">Key Findings & Conclusion</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Metrics suggest different optimal K values:
                <ul className="list-circle pl-5 space-y-1 mt-1">
                    <li><strong>Silhouette Score</strong> is highest for <strong>K=2</strong>, indicating good separation.</li>
                    <li><strong>Davies-Bouldin Score</strong> is lowest (best) for <strong>K=6</strong>, indicating compact clusters.</li>
                </ul>
            </li>
            <li>The <strong>K=2</strong> solution is clinically meaningful:
                <ul className="list-circle pl-5 space-y-1 mt-1">
                    <li>It clearly separates patients into diabetic and non-diabetic groups.</li>
                    <li>The diabetic group shows significantly higher BMI (obese range).</li>
                </ul>
            </li>
            <li>This aligns with medical knowledge: <strong>Obesity is a major risk factor for type 2 diabetes.</strong></li>
          </ul>
        </div>

        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Important Considerations</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>K-means requires choosing K beforehand.</li>
            <li>Different evaluation metrics can point to different 'best' K values.</li>
            <li>Data <span className="font-semibold">standardization</span> was crucial to prevent BMI from dominating.</li>
            <li>Missing values were handled (imputed or removed).</li>
            <li>K-means assumes spherical clusters, which might not fit all data patterns.</li>
            <li>Results depend slightly on initial random starting points (mitigated using `random_state=42`).</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Q2bClustering;