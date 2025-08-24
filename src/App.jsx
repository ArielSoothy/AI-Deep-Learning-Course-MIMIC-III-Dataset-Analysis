import React, { useState } from 'react';
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
import Footer from './components/Footer';

function App() {
  const [tab, setTab] = useState('overview');
  
  const tabs = [
    { id: 'overview', label: 'Project Overview', icon: '🏥', color: 'indigo' },
    { id: 'stats', label: 'Q1.a: Statistical Measures', icon: '📊', color: 'blue' },
    { id: 'dist', label: 'Q1.b: Distribution Analysis', icon: '📈', color: 'blue' },
    { id: 'classify', label: 'Q1.c: Classification Models', icon: '🤖', color: 'green' },
    { id: 'regress', label: 'Q1.d: Regression Analysis', icon: '📉', color: 'purple' },
    { id: 'cluster', label: 'Q2.b: K-means Clustering', icon: '🎯', color: 'pink' },
    { id: 'nn_steps', label: 'Q3.a: NN Training Steps', icon: '🧠', color: 'yellow' },
    { id: 'bias_variance', label: 'Q3.b: Bias-Variance', icon: '⚖️', color: 'red' },
    { id: 'preprocess', label: 'Q3.c: Data Preprocessing', icon: '🔬', color: 'orange' },
    { id: 'tf_keras', label: 'Q3.d-f: NN with TF/Keras', icon: '🚀', color: 'teal' },
    { id: 'activation', label: 'Activation Functions', icon: '⚡', color: 'cyan' },
    { id: 'glossary', label: 'Glossary', icon: '📚', color: 'gray' }
  ];

  const getTabColorClasses = (color, isActive) => {
    const colorMap = {
      indigo: isActive ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg transform scale-105' : 'bg-white text-gray-700 hover:bg-indigo-50',
      blue: isActive ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105' : 'bg-white text-gray-700 hover:bg-blue-50',
      green: isActive ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105' : 'bg-white text-gray-700 hover:bg-green-50',
      purple: isActive ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg transform scale-105' : 'bg-white text-gray-700 hover:bg-purple-50',
      pink: isActive ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg transform scale-105' : 'bg-white text-gray-700 hover:bg-pink-50',
      yellow: isActive ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg transform scale-105' : 'bg-white text-gray-700 hover:bg-yellow-50',
      red: isActive ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg transform scale-105' : 'bg-white text-gray-700 hover:bg-red-50',
      orange: isActive ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-105' : 'bg-white text-gray-700 hover:bg-orange-50',
      teal: isActive ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg transform scale-105' : 'bg-white text-gray-700 hover:bg-teal-50',
      cyan: isActive ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg transform scale-105' : 'bg-white text-gray-700 hover:bg-cyan-50',
      gray: isActive ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg transform scale-105' : 'bg-white text-gray-700 hover:bg-gray-50'
    };
    return colorMap[color] || colorMap.gray;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <header className="bg-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
        <div className="relative p-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
              MIMIC-III Dataset Analysis Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Interactive AI & Deep Learning Educational Platform • Google/Reichman Course
            </p>
            <div className="mt-4 flex justify-center gap-4 text-sm">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                <i className="fas fa-brain mr-1"></i> Deep Learning
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                <i className="fas fa-chart-line mr-1"></i> Data Analysis
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                <i className="fas fa-heartbeat mr-1"></i> Healthcare AI
              </span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Enhanced Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tabItem) => (
              <button
                key={tabItem.id}
                className={`
                  px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 
                  flex items-center gap-2 border border-gray-200
                  ${getTabColorClasses(tabItem.color, tab === tabItem.id)}
                `}
                onClick={() => setTab(tabItem.id)}
              >
                <span className="text-lg">{tabItem.icon}</span>
                <span className="hidden sm:inline">{tabItem.label}</span>
                <span className="sm:hidden">{tabItem.label.split(':')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content with Animation */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="animate-fadeIn">
          {tab === 'overview' && (
            <div className="bg-white rounded-xl shadow-xl p-6">
              <ProjectFlowVisualizer />
            </div>
          )}
          {tab === 'stats' && (
            <div className="bg-white rounded-xl shadow-xl p-6">
              <StatisticalMeasuresExplorer />
            </div>
          )}
          {tab === 'dist' && (
            <div className="bg-white rounded-xl shadow-xl p-6">
              <DistributionVisualizer />
            </div>
          )}
          {tab === 'classify' && (
            <div className="bg-white rounded-xl shadow-xl p-6">
              <ModelComparisonVisualizer />
            </div>
          )}
          {tab === 'regress' && (
            <div className="bg-white rounded-xl shadow-xl p-6">
              <RegressionModelVisualizer />
            </div>
          )}
          {tab === 'cluster' && (
            <div className="bg-white rounded-xl shadow-xl p-6">
              <ClusteringVisualizer />
            </div>
          )}
          {tab === 'nn_steps' && (
            <div className="bg-white rounded-xl shadow-xl p-6">
              <Q3NeuralNetworks />
            </div>
          )}
          {tab === 'bias_variance' && (
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Q3.b: Bias-Variance Trade-off in Neural Networks
              </h2>
              <p className="mb-6 text-gray-600">
                Understanding how model complexity affects generalization performance
              </p>
              <BiasVarianceVisualizer />
            </div>
          )}
          {tab === 'preprocess' && (
            <div className="bg-white rounded-xl shadow-xl p-6">
              <DataPreprocessingVisualizer />
            </div>
          )}
          {tab === 'tf_keras' && (
            <div className="bg-white rounded-xl shadow-xl p-6">
              <NeuralNetworksTFKerasVisualizer />
            </div>
          )}
          {tab === 'activation' && (
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Activation Functions in Neural Networks
              </h2>
              <ActivationFunctionsVisualizer />
            </div>
          )}
          {tab === 'glossary' && (
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Healthcare Data Analysis Glossary
              </h2>
              <Glossary />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;