import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import StatisticalMeasuresExplorer from './StatisticalMeasuresExplorer';
import DistributionVisualizer from './DistributionVisualizer';
import ActivationFunctionsVisualizer from './ActivationFunctionsVisualizer';
import ModelComparisonVisualizer from './ModelComparisonVisualizer';
import RegressionModelVisualizer from './RegressionModelVisualizer';
import ClusteringVisualizer from './ClusteringVisualizer';
import Q3NeuralNetworks from './components/questions/Q3NeuralNetworks';
import BiasVarianceVisualizer from './BiasVarianceVisualizer';
import DataPreprocessingVisualizer from './DataPreprocessingVisualizer';
import ProjectFlowVisualizer from './ProjectFlowVisualizer';
import Glossary from './components/Glossary';
import NeuralNetworksTFKerasVisualizer from './components/questions/NeuralNetworksTFKerasVisualizer';
import './index.css';

function App() {
  const [tab, setTab] = useState('overview');
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 mb-6">
        <h1 className="text-2xl font-bold text-center text-gray-900">MIMIC-III Dataset Analysis: Interactive Explanations</h1>
        <p className="text-center text-gray-600 mt-1">A step-by-step interactive guide to understanding healthcare data analysis with machine learning</p>
      </header>
      
      <nav className="flex flex-wrap justify-center gap-2 bg-white shadow p-4 mb-8 overflow-x-auto">
        <button
          className={`px-4 py-2 rounded font-semibold ${tab === 'overview' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setTab('overview')}
        >
          Project Overview
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${tab === 'stats' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setTab('stats')}
        >
          Q1.a: Statistical Measures 
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${tab === 'dist' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setTab('dist')}
        >
          Q1.b: Distribution Analysis
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${tab === 'classify' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setTab('classify')}
        >
          Q1.c: Classification Models
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${tab === 'regress' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setTab('regress')}
        >
          Q1.d: Regression Analysis
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${tab === 'cluster' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setTab('cluster')}
        >
          Q2.b: K-means Clustering
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${tab === 'nn_steps' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setTab('nn_steps')}
        >
          Q3.a: NN Training Steps
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${tab === 'bias_variance' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setTab('bias_variance')}
        >
          Q3.b: Bias-Variance Tradeoff
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${tab === 'preprocess' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setTab('preprocess')}
        >
          Q3.c: Data Preprocessing
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${tab === 'tf_keras' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setTab('tf_keras')}
        >
          Q3.d-f: NN with TF/Keras
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${tab === 'activation' ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setTab('activation')}
        >
          Activation Functions
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${tab === 'glossary' ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setTab('glossary')}
        >
          Glossary
        </button>
      </nav>

      <main className="container mx-auto px-4 py-4">
        {tab === 'overview' && <ProjectFlowVisualizer />}
        {tab === 'stats' && <StatisticalMeasuresExplorer />}
        {tab === 'dist' && <DistributionVisualizer />}
        {tab === 'classify' && <ModelComparisonVisualizer />}
        {tab === 'regress' && <RegressionModelVisualizer />}
        {tab === 'cluster' && <ClusteringVisualizer />}
        {tab === 'nn_steps' && <Q3NeuralNetworks />}
        {tab === 'bias_variance' && <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Q3.b Explain the bias-variance trade-off in neural network performance. How does it affect model generalization?</h2>
          <p className="mb-4"> Bias-Variance Tradeoff in Neural Networks. This section demonstrates how model complexity affects generalization.</p>
          <BiasVarianceVisualizer />
        </div>}
        {tab === 'preprocess' && <DataPreprocessingVisualizer />}
        {tab === 'tf_keras' && <NeuralNetworksTFKerasVisualizer />}
        {tab === 'activation' && <div>
          <h2 className="text-xl font-bold mb-4 bg-white p-4 rounded shadow">Activation Functions in Neural Networks</h2>
          <ActivationFunctionsVisualizer />
        </div>}
        {tab === 'glossary' && <div>
          <h2 className="text-xl font-bold mb-4 bg-white p-4 rounded shadow">Healthcare Data Analysis Glossary</h2>
          <Glossary />
        </div>}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
