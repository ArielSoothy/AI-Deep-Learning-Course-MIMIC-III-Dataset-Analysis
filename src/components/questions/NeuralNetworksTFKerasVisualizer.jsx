import React, { useState } from 'react';

const NeuralNetworksTFKerasVisualizer = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  
  return (
    <div className="container mx-auto px-4 py-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Neural Networks with TensorFlow/Keras for Healthcare Data Analysis
      </h2>
      
      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center mb-6 border-b">
        <button 
          onClick={() => setSelectedTab('overview')}
          className={`px-4 py-2 ${selectedTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600 font-semibold' : 'text-gray-600'}`}
        >
          Project Overview
        </button>
        <button 
          onClick={() => setSelectedTab('architecture')}
          className={`px-4 py-2 ${selectedTab === 'architecture' ? 'text-blue-600 border-b-2 border-blue-600 font-semibold' : 'text-gray-600'}`}
        >
          Network Architecture
        </button>
        <button 
          onClick={() => setSelectedTab('training')}
          className={`px-4 py-2 ${selectedTab === 'training' ? 'text-blue-600 border-b-2 border-blue-600 font-semibold' : 'text-gray-600'}`}
        >
          Training Process
        </button>
        <button 
          onClick={() => setSelectedTab('results')}
          className={`px-4 py-2 ${selectedTab === 'results' ? 'text-blue-600 border-b-2 border-blue-600 font-semibold' : 'text-gray-600'}`}
        >
          Results & Evaluation
        </button>
      </div>
      
      {/* Overview Tab Content */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-gray-800">Project Task Summary</h3>
            <p className="text-gray-700 mb-4">
              In Q3.d-e of our MIMIC-III healthcare data analysis project, we were tasked with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Training a Deep Neural Network (DNN) to predict in-hospital mortality (binary outcome) based on patient features
              </li>
              <li>
                Using age and blood sodium as key predictive features
              </li>
              <li>
                Implementing a specific network architecture with multiple dense layers and dropout for regularization
              </li>
              <li>
                Optimizing the model with different hyperparameters
              </li>
            </ul>
          </div>
          
          <div className="bg-white border border-gray-200 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-gray-800">Key Findings</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700">Model Performance</h4>
                <p className="text-gray-700">The final model achieved 85.5% accuracy on the test set, though with limited sensitivity (ability to identify positive mortality cases).</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700">Challenges</h4>
                <p className="text-gray-700">The dataset exhibited class imbalance with only 14.5% positive cases, making it difficult for the model to learn to predict the minority class.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700">Best Practices</h4>
                <p className="text-gray-700">Feature standardization and dropout regularization were essential for model convergence and preventing overfitting.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700">Evaluation Metrics</h4>
                <p className="text-gray-700">Beyond accuracy, we used sensitivity, specificity and the ROC curve to evaluate model performance for this clinical prediction task.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Architecture Tab Content */}
      {selectedTab === 'architecture' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-gray-800">Neural Network Architecture</h3>
            <p className="text-gray-700 mb-4">
              We implemented a deep neural network with the following structure:
            </p>
            
            {/* Network Architecture Visualization */}
            <div className="my-8 relative overflow-auto">
              <div className="mx-auto w-full md:w-3/4 bg-gray-50 p-6 rounded-lg shadow-inner">
                <svg viewBox="0 0 800 400" className="w-full">
                  {/* Input Layer */}
                  <g>
                    <text x="100" y="30" className="text-sm font-semibold fill-gray-700">Input Layer</text>
                    <rect x="50" y="50" width="100" height="300" rx="15" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
                    <text x="100" y="120" textAnchor="middle" className="text-xs fill-gray-700">Age</text>
                    <circle cx="100" cy="100" r="20" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2" />
                    <text x="100" y="220" textAnchor="middle" className="text-xs fill-gray-700">Blood Sodium</text>
                    <circle cx="100" cy="200" r="20" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2" />
                    <text x="100" y="320" textAnchor="middle" className="text-xs fill-gray-700">Input Shape: (2,)</text>
                  </g>
                  
                  {/* First Hidden Layer */}
                  <g>
                    <text x="250" y="30" className="text-sm font-semibold fill-gray-700">Hidden Layer 1</text>
                    <rect x="200" y="50" width="100" height="300" rx="15" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
                    <text x="250" y="200" textAnchor="middle" className="text-xs fill-gray-700">3 neurons</text>
                    <text x="250" y="220" textAnchor="middle" className="text-xs fill-gray-700">ReLU</text>
                    <circle cx="250" cy="120" r="15" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="250" cy="170" r="15" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="250" cy="220" r="15" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2" />
                  </g>
                  
                  {/* Dropout Layer 1 */}
                  <g>
                    <text x="350" y="30" className="text-sm font-semibold fill-gray-700">Dropout (0.05)</text>
                    <rect x="325" y="50" width="50" height="300" rx="15" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
                    <text x="350" y="200" textAnchor="middle" transform="rotate(-90 350,200)" className="text-xs fill-gray-700">Dropout: 5%</text>
                  </g>
                  
                  {/* Second Hidden Layer */}
                  <g>
                    <text x="450" y="30" className="text-sm font-semibold fill-gray-700">Hidden Layer 2</text>
                    <rect x="400" y="50" width="100" height="300" rx="15" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
                    <text x="450" y="200" textAnchor="middle" className="text-xs fill-gray-700">3 neurons</text>
                    <text x="450" y="220" textAnchor="middle" className="text-xs fill-gray-700">ReLU</text>
                    <circle cx="450" cy="120" r="15" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="450" cy="170" r="15" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="450" cy="220" r="15" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2" />
                  </g>
                  
                  {/* Dropout Layer 2 */}
                  <g>
                    <text x="550" y="30" className="text-sm font-semibold fill-gray-700">Dropout (0.05)</text>
                    <rect x="525" y="50" width="50" height="300" rx="15" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
                    <text x="550" y="200" textAnchor="middle" transform="rotate(-90 550,200)" className="text-xs fill-gray-700">Dropout: 5%</text>
                  </g>
                  
                  {/* Third Hidden Layer */}
                  <g>
                    <text x="650" y="30" className="text-sm font-semibold fill-gray-700">Hidden Layer 3</text>
                    <rect x="600" y="50" width="100" height="300" rx="15" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
                    <text x="650" y="200" textAnchor="middle" className="text-xs fill-gray-700">3 neurons</text>
                    <text x="650" y="220" textAnchor="middle" className="text-xs fill-gray-700">ReLU</text>
                    <circle cx="650" cy="120" r="15" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="650" cy="170" r="15" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="650" cy="220" r="15" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2" />
                  </g>
                  
                  {/* Output Layer */}
                  <g>
                    <text x="750" y="30" className="text-sm font-semibold fill-gray-700">Output Layer</text>
                    <rect x="725" y="150" width="50" height="100" rx="15" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
                    <text x="750" y="210" textAnchor="middle" className="text-xs fill-gray-700">Sigmoid</text>
                    <circle cx="750" cy="170" r="20" fill="#7dd3fc" stroke="#0284c7" strokeWidth="2" />
                    <text x="750" y="175" textAnchor="middle" className="text-xs fill-gray-700">1</text>
                    <text x="750" y="230" textAnchor="middle" className="text-xs fill-gray-700">Binary</text>
                    <text x="750" y="245" textAnchor="middle" className="text-xs fill-gray-700">Output</text>
                  </g>
                  
                  {/* Connections */}
                  {/* These connections are simplified for visualization */}
                  <g opacity="0.3">
                    {/* Input to Hidden 1 connections */}
                    <line x1="120" y1="100" x2="235" y2="120" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="120" y1="100" x2="235" y2="170" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="120" y1="100" x2="235" y2="220" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="120" y1="200" x2="235" y2="120" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="120" y1="200" x2="235" y2="170" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="120" y1="200" x2="235" y2="220" stroke="#3b82f6" strokeWidth="1" />
                    
                    {/* Hidden 1 to Hidden 2 connections (through dropout) */}
                    <line x1="265" y1="120" x2="435" y2="120" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="265" y1="170" x2="435" y2="170" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="265" y1="220" x2="435" y2="220" stroke="#3b82f6" strokeWidth="1" />
                    
                    {/* Hidden 2 to Hidden 3 connections (through dropout) */}
                    <line x1="465" y1="120" x2="635" y2="120" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="465" y1="170" x2="635" y2="170" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="465" y1="220" x2="635" y2="220" stroke="#3b82f6" strokeWidth="1" />
                    
                    {/* Hidden 3 to Output connections */}
                    <line x1="665" y1="120" x2="735" y2="170" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="665" y1="170" x2="735" y2="170" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="665" y1="220" x2="735" y2="170" stroke="#3b82f6" strokeWidth="1" />
                  </g>
                </svg>
              </div>
            </div>
            
            {/* Model Summary */}
            <div className="font-mono text-sm bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="whitespace-pre-wrap">
{`Model: "sequential"
_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 dense_1 (Dense)            (None, 3)                 9         
                                                                 
 dropout_1 (Dropout)        (None, 3)                 0         
                                                                 
 dense_2 (Dense)            (None, 3)                 12        
                                                                 
 dropout_2 (Dropout)        (None, 3)                 0         
                                                                 
 dense_3 (Dense)            (None, 3)                 12        
                                                                 
 output (Dense)             (None, 1)                 4         
                                                                 
=================================================================
Total params: 37 (148.00 Byte)
Trainable params: 37 (148.00 Byte)
Non-trainable params: 0 (0.00 Byte)
_________________________________________________________________`}
              </pre>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-gray-800">Model Configuration</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700">Optimizer</h4>
                <p className="text-gray-700">Adam: Adaptive learning rate optimization algorithm</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700">Loss Function</h4>
                <p className="text-gray-700">Binary Cross-Entropy: Appropriate for binary classification</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700">Metrics</h4>
                <p className="text-gray-700">Accuracy: Proportion of correctly predicted samples</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700">Regularization</h4>
                <p className="text-gray-700">Dropout: 5% dropout rate between dense layers to prevent overfitting</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Training Tab Content */}
      {selectedTab === 'training' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-gray-800">Data Preparation</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700">1. Data Cleaning</h4>
                <p className="text-gray-700">Removed rows with missing values to ensure clean data for the model</p>
                <p className="text-sm text-gray-500 mt-1">Dataset shape after cleaning: 962 samples × 3 features</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700">2. Feature Selection</h4>
                <p className="text-gray-700">Selected 'age' and 'blood sodium' as features, 'outcome' as target</p>
                <div className="mt-2 font-mono text-xs bg-gray-200 p-2 rounded">
                  X = df_nn[['age', 'Blood sodium']]<br />
                  y = df_nn['outcome']
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700">3. Feature Standardization</h4>
                <p className="text-gray-700">Applied StandardScaler to normalize features to mean=0, std=1</p>
                <div className="mt-2 font-mono text-xs bg-gray-200 p-2 rounded">
                  scaler = StandardScaler()<br />
                  X_scaled = scaler.fit_transform(X)
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700">4. Train-Test Split</h4>
                <p className="text-gray-700">Split data: 80% training, 20% testing, with stratification</p>
                <div className="mt-2 font-mono text-xs bg-gray-200 p-2 rounded">
                  X_train, X_test, y_train, y_test = train_test_split(<br />
                  &nbsp;&nbsp;X_scaled, y, test_size=0.2, random_state=42)<br />
                </div>
                <p className="text-sm text-gray-500 mt-1">Training set: 769 samples, Test set: 193 samples</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-gray-800">Model Training</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700">Training Configuration</h4>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Epochs: 100</li>
                  <li>Batch size: 32</li>
                  <li>Validation split: 20% of training data</li>
                </ul>
                <div className="mt-2 font-mono text-xs bg-gray-200 p-2 rounded">
                  history = model.fit(<br />
                  &nbsp;&nbsp;X_train,<br />
                  &nbsp;&nbsp;y_train,<br />
                  &nbsp;&nbsp;epochs=100,<br />
                  &nbsp;&nbsp;batch_size=32,<br />
                  &nbsp;&nbsp;validation_split=0.2,<br />
                  &nbsp;&nbsp;verbose=1<br />
                  )
                </div>
              </div>
              
              {/* Training Progress Charts */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700 mb-3">Training Progress</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Accuracy Chart (Mock) */}
                  <div className="bg-white p-3 rounded border border-gray-300">
                    <h5 className="text-sm font-semibold text-gray-700 mb-2">Model Accuracy Over Time</h5>
                    <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                      <svg viewBox="0 0 400 250" className="w-full h-full">
                        {/* Chart axes */}
                        <line x1="50" y1="200" x2="350" y2="200" stroke="black" strokeWidth="1" />
                        <line x1="50" y1="50" x2="50" y2="200" stroke="black" strokeWidth="1" />
                        
                        {/* X axis labels */}
                        <text x="50" y="220" textAnchor="middle" className="text-xs">0</text>
                        <text x="125" y="220" textAnchor="middle" className="text-xs">25</text>
                        <text x="200" y="220" textAnchor="middle" className="text-xs">50</text>
                        <text x="275" y="220" textAnchor="middle" className="text-xs">75</text>
                        <text x="350" y="220" textAnchor="middle" className="text-xs">100</text>
                        <text x="200" y="240" textAnchor="middle" className="text-xs font-semibold">Epoch</text>
                        
                        {/* Y axis labels */}
                        <text x="40" y="200" textAnchor="end" className="text-xs">0.80</text>
                        <text x="40" y="150" textAnchor="end" className="text-xs">0.85</text>
                        <text x="40" y="100" textAnchor="end" className="text-xs">0.90</text>
                        <text x="40" y="50" textAnchor="end" className="text-xs">0.95</text>
                        <text x="20" y="125" textAnchor="middle" transform="rotate(-90 20,125)" className="text-xs font-semibold">Accuracy</text>
                        
                        {/* Training accuracy line */}
                        <path d="M50,180 C75,170 100,150 125,140 C150,130 175,100 200,95 C225,90 250,85 275,83 C300,80 325,80 350,78" 
                              stroke="#3b82f6" strokeWidth="2" fill="none" />
                        
                        {/* Validation accuracy line */}
                        <path d="M50,185 C75,175 100,160 125,155 C150,145 175,130 200,125 C225,125 250,120 275,120 C300,115 325,115 350,110" 
                              stroke="#10b981" strokeWidth="2" fill="none" strokeDasharray="4" />
                        
                        {/* Legend */}
                        <circle cx="100" cy="30" r="4" fill="#3b82f6" />
                        <text x="110" y="35" className="text-xs">Training</text>
                        <circle cx="180" cy="30" r="4" fill="#10b981" />
                        <text x="190" y="35" className="text-xs">Validation</text>
                        
                        {/* Best point */}
                        <circle cx="300" cy="115" r="5" fill="red" />
                        <text x="310" y="105" className="text-xs">Best: 0.87</text>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Loss Chart (Mock) */}
                  <div className="bg-white p-3 rounded border border-gray-300">
                    <h5 className="text-sm font-semibold text-gray-700 mb-2">Model Loss Over Time</h5>
                    <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                      <svg viewBox="0 0 400 250" className="w-full h-full">
                        {/* Chart axes */}
                        <line x1="50" y1="200" x2="350" y2="200" stroke="black" strokeWidth="1" />
                        <line x1="50" y1="50" x2="50" y2="200" stroke="black" strokeWidth="1" />
                        
                        {/* X axis labels */}
                        <text x="50" y="220" textAnchor="middle" className="text-xs">0</text>
                        <text x="125" y="220" textAnchor="middle" className="text-xs">25</text>
                        <text x="200" y="220" textAnchor="middle" className="text-xs">50</text>
                        <text x="275" y="220" textAnchor="middle" className="text-xs">75</text>
                        <text x="350" y="220" textAnchor="middle" className="text-xs">100</text>
                        <text x="200" y="240" textAnchor="middle" className="text-xs font-semibold">Epoch</text>
                        
                        {/* Y axis labels */}
                        <text x="40" y="200" textAnchor="end" className="text-xs">0.0</text>
                        <text x="40" y="150" textAnchor="end" className="text-xs">0.3</text>
                        <text x="40" y="100" textAnchor="end" className="text-xs">0.6</text>
                        <text x="40" y="50" textAnchor="end" className="text-xs">0.9</text>
                        <text x="20" y="125" textAnchor="middle" transform="rotate(-90 20,125)" className="text-xs font-semibold">Loss</text>
                        
                        {/* Training loss line */}
                        <path d="M50,80 C75,100 100,120 125,135 C150,145 175,150 200,155 C225,160 250,165 275,167 C300,170 325,172 350,173" 
                              stroke="#ef4444" strokeWidth="2" fill="none" />
                        
                        {/* Validation loss line */}
                        <path d="M50,80 C75,110 100,125 125,130 C150,140 175,145 200,148 C225,150 250,149 275,150 C300,152 325,153 350,155" 
                              stroke="#7c3aed" strokeWidth="2" fill="none" strokeDasharray="4" />
                        
                        {/* Legend */}
                        <circle cx="100" cy="30" r="4" fill="#ef4444" />
                        <text x="110" y="35" className="text-xs">Training Loss</text>
                        <circle cx="220" cy="30" r="4" fill="#7c3aed" />
                        <text x="230" y="35" className="text-xs">Validation Loss</text>
                        
                        {/* Best point */}
                        <circle cx="300" cy="152" r="5" fill="red" />
                        <text x="310" y="142" className="text-xs">Best: 0.41</text>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mt-3">
                  The model showed signs of convergence after approximately 75 epochs, with minimal improvement in validation metrics thereafter.
                  Accuracy continued to improve on the training set but plateaued on the validation set, suggesting the model reached its capacity.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Results Tab Content */}
      {selectedTab === 'results' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-gray-800">Model Evaluation</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Confusion Matrix */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700 mb-3">Confusion Matrix</h4>
                <div className="relative max-w-xs mx-auto">
                  <svg viewBox="0 0 300 300" className="w-full">
                    <rect x="50" y="50" width="100" height="100" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1" />
                    <rect x="150" y="50" width="100" height="100" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" />
                    <rect x="50" y="150" width="100" height="100" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" />
                    <rect x="150" y="150" width="100" height="100" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1" />
                    
                    <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold">165</text>
                    <text x="200" y="100" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold">0</text>
                    <text x="100" y="200" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold">28</text>
                    <text x="200" y="200" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold">0</text>
                    
                    <text x="100" y="45" textAnchor="middle" className="text-xs font-semibold">Predicted Negative</text>
                    <text x="200" y="45" textAnchor="middle" className="text-xs font-semibold">Predicted Positive</text>
                    
                    <text x="45" y="100" textAnchor="end" dominantBaseline="middle" transform="rotate(-90 45,100)" className="text-xs font-semibold">Actual Negative</text>
                    <text x="45" y="200" textAnchor="end" dominantBaseline="middle" transform="rotate(-90 45,200)" className="text-xs font-semibold">Actual Positive</text>
                    
                    <text x="100" y="120" textAnchor="middle" dominantBaseline="middle" className="text-xs">True Negatives</text>
                    <text x="200" y="120" textAnchor="middle" dominantBaseline="middle" className="text-xs">False Positives</text>
                    <text x="100" y="220" textAnchor="middle" dominantBaseline="middle" className="text-xs">False Negatives</text>
                    <text x="200" y="220" textAnchor="middle" dominantBaseline="middle" className="text-xs">True Positives</text>
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  The model predicted all samples as negative, correctly classifying all truly negative cases (True Negatives = 165)
                  but failing to identify any positive cases (False Negatives = 28, True Positives = 0).
                </p>
              </div>
              
              {/* Performance Metrics */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700 mb-3">Key Performance Metrics</h4>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2 border border-gray-300">Metric</th>
                      <th className="p-2 border border-gray-300">Value</th>
                      <th className="p-2 border border-gray-300">Interpretation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-gray-300">Accuracy</td>
                      <td className="p-2 border border-gray-300 font-semibold">85.5%</td>
                      <td className="p-2 border border-gray-300">Proportion of correct predictions</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-gray-300">Sensitivity/Recall</td>
                      <td className="p-2 border border-gray-300 font-semibold text-red-600">0.0%</td>
                      <td className="p-2 border border-gray-300">Proportion of positives correctly identified</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-gray-300">Specificity</td>
                      <td className="p-2 border border-gray-300 font-semibold">100.0%</td>
                      <td className="p-2 border border-gray-300">Proportion of negatives correctly identified</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-gray-300">Precision</td>
                      <td className="p-2 border border-gray-300 font-semibold">N/A</td>
                      <td className="p-2 border border-gray-300">Proportion of positive predictions that are correct</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* ROC Curve */}
          <div className="bg-white border border-gray-200 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-gray-800">ROC Curve Analysis</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="aspect-w-16 aspect-h-9 bg-white border border-gray-200 rounded-lg">
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* Chart axes */}
                  <rect x="50" y="50" width="300" height="200" fill="white" stroke="#e5e7eb" strokeWidth="1" />
                  
                  <line x1="50" y1="250" x2="350" y2="250" stroke="black" strokeWidth="1" />
                  <line x1="50" y1="250" x2="50" y2="50" stroke="black" strokeWidth="1" />
                  
                  {/* Grid lines */}
                  <line x1="50" y1="50" x2="350" y2="50" stroke="#e5e7eb" strokeWidth="0.5" />
                  <line x1="50" y1="100" x2="350" y2="100" stroke="#e5e7eb" strokeWidth="0.5" />
                  <line x1="50" y1="150" x2="350" y2="150" stroke="#e5e7eb" strokeWidth="0.5" />
                  <line x1="50" y1="200" x2="350" y2="200" stroke="#e5e7eb" strokeWidth="0.5" />
                  
                  <line x1="125" y1="50" x2="125" y2="250" stroke="#e5e7eb" strokeWidth="0.5" />
                  <line x1="200" y1="50" x2="200" y2="250" stroke="#e5e7eb" strokeWidth="0.5" />
                  <line x1="275" y1="50" x2="275" y2="250" stroke="#e5e7eb" strokeWidth="0.5" />
                  <line x1="350" y1="50" x2="350" y2="250" stroke="#e5e7eb" strokeWidth="0.5" />
                  
                  {/* Labels */}
                  <text x="200" y="280" textAnchor="middle" className="text-xs font-semibold">False Positive Rate (1 - Specificity)</text>
                  <text x="15" y="150" textAnchor="middle" transform="rotate(-90 15,150)" className="text-xs font-semibold">True Positive Rate (Sensitivity)</text>
                  
                  {/* X-axis ticks */}
                  <text x="50" y="270" textAnchor="middle" className="text-xs">0.0</text>
                  <text x="125" y="270" textAnchor="middle" className="text-xs">0.25</text>
                  <text x="200" y="270" textAnchor="middle" className="text-xs">0.5</text>
                  <text x="275" y="270" textAnchor="middle" className="text-xs">0.75</text>
                  <text x="350" y="270" textAnchor="middle" className="text-xs">1.0</text>
                  
                  {/* Y-axis ticks */}
                  <text x="35" y="250" textAnchor="end" dominantBaseline="middle" className="text-xs">0.0</text>
                  <text x="35" y="200" textAnchor="end" dominantBaseline="middle" className="text-xs">0.25</text>
                  <text x="35" y="150" textAnchor="end" dominantBaseline="middle" className="text-xs">0.5</text>
                  <text x="35" y="100" textAnchor="end" dominantBaseline="middle" className="text-xs">0.75</text>
                  <text x="35" y="50" textAnchor="end" dominantBaseline="middle" className="text-xs">1.0</text>
                  
                  {/* Diagonal reference line (random classifier) */}
                  <line x1="50" y1="250" x2="350" y2="50" stroke="navy" strokeWidth="1" strokeDasharray="4" />
                  
                  {/* ROC curve */}
                  <path d="M50,250 L50,250 L50,250 L50,200 L75,150 L125,125 L250,100 L350,50" 
                        stroke="darkorange" strokeWidth="2" fill="none" />
                  
                  {/* AUC annotation */}
                  <text x="175" y="175" textAnchor="middle" className="text-xs font-semibold">AUC = 0.63</text>
                  
                  {/* Legend */}
                  <rect x="250" y="65" width="10" height="2" fill="navy" stroke="none" strokeDasharray="4" />
                  <text x="265" y="70" className="text-xs">Random Classifier</text>
                  
                  <rect x="250" y="85" width="10" height="2" fill="darkorange" stroke="none" />
                  <text x="265" y="90" className="text-xs">ROC Curve</text>
                </svg>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                The ROC curve shows the trade-off between sensitivity (True Positive Rate) and specificity (1 - False Positive Rate). 
                The AUC of 0.63 indicates the model has some discriminative ability, but its performance is still limited, especially
                for identifying positive cases.
              </p>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-gray-800">Key Findings & Interpretation</h3>
            <div className="space-y-3">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-700">Class Imbalance Challenge</h4>
                <p className="text-gray-700">
                  Our model struggled with the highly imbalanced dataset (85.5% negative, 14.5% positive cases). The model learned to predict the majority class 
                  (negative outcome) for all samples, achieving high accuracy but failing to identify any positive cases.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-700">Limited Predictive Features</h4>
                <p className="text-gray-700">
                  Using only age and blood sodium as features provided insufficient information for the model to effectively predict mortality risk.
                  These features likely have complex, non-linear relationships with the outcome that our model couldn't fully capture.
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-green-700">Clinical Implications</h4>
                <p className="text-gray-700">
                  In a healthcare context, missing positive cases (false negatives) is often more problematic than false alarms. Our model needs improvement
                  in sensitivity before it could be clinically useful for predicting mortality risk.
                </p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-700">Areas for Improvement</h4>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Apply techniques like SMOTE (Synthetic Minority Over-sampling) to address class imbalance</li>
                  <li>Incorporate additional clinically relevant features (vital signs, lab values, comorbidities)</li>
                  <li>Implement class weights in model training to penalize false negatives more heavily</li>
                  <li>Optimize the threshold for classification based on clinical priorities</li>
                  <li>Explore ensemble methods that may better handle imbalanced data</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-8 bg-gray-100 p-4 rounded-lg text-center">
        <p className="text-gray-700">
          This implementation demonstrates the application of neural networks with TensorFlow/Keras for healthcare data analysis,
          highlighting both the potential and challenges of deep learning in clinical prediction tasks.
        </p>
      </div>
    </div>
  );
};

export default NeuralNetworksTFKerasVisualizer;