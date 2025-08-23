import React, { useState } from 'react';

const FixedDataPreprocessingVisualizer = () => {
  const [activeTab, setActiveTab] = useState('normalization');
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-center mb-2">Data Preprocessing for Neural Networks</h3>
      <h3 className="text-2xl font-bold text-center mb-2">
        <span className="text-lg">Q3.c Highlight the importance of data preprocessing, normalization, and splitting for training effective deep learning models.
        </span> </h3>
      <p className="text-center mb-6">Essential preprocessing steps for effective model training</p>
      
      {/* Tab Navigation */}
      <div className="flex justify-center mb-6">
        <button 
          className={`px-4 py-2 rounded-t-lg border-t border-l border-r ${activeTab === 'normalization' 
            ? 'bg-blue-500 text-white font-medium' 
            : 'bg-gray-200'}`}
          onClick={() => setActiveTab('normalization')}
        >
          Feature Normalization
        </button>
        <button 
          className={`px-4 py-2 rounded-t-lg border-t border-l border-r ${activeTab === 'splitting' 
            ? 'bg-blue-500 text-white font-medium' 
            : 'bg-gray-200'}`}
          onClick={() => setActiveTab('splitting')}
        >
          Data Splitting
        </button>
        <button 
          className={`px-4 py-2 rounded-t-lg border-t border-l border-r ${activeTab === 'training' 
            ? 'bg-blue-500 text-white font-medium' 
            : 'bg-gray-200'}`}
          onClick={() => setActiveTab('training')}
        >
          Training Performance
        </button>
      </div>
      
      {/* Feature Normalization Tab */}
      {activeTab === 'normalization' && (
        <div className="grid grid-cols-1 gap-8">
          {/* BEFORE NORMALIZATION PANEL */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-xl font-bold text-center mb-4">Before Normalization</h3>
            
            {/* Feature scales visualization - horizontal bars */}
            <div className="mb-6">
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <div className="w-20 text-right pr-2 font-medium">Age:</div>
                  <div className="flex-1 bg-gray-100 h-8 relative rounded">
                    <div className="absolute h-full w-1/5 bg-blue-500 rounded-l"></div>
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm">30-80 years</span>
                  </div>
                </div>
                
                <div className="flex items-center mb-2">
                  <div className="w-20 text-right pr-2 font-medium">Sodium:</div>
                  <div className="flex-1 bg-gray-100 h-8 relative rounded">
                    <div className="absolute h-full w-4/5 bg-red-500 rounded-l"></div>
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm">130-160 mmol/L</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-20 text-right pr-2 font-medium">BMI:</div>
                  <div className="flex-1 bg-gray-100 h-8 relative rounded">
                    <div className="absolute h-full w-2/5 bg-yellow-500 rounded-l"></div>
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm">15-50</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Network weight visualization */}
            <h4 className="font-semibold text-center mb-3">Network Weights</h4>
            <div className="flex items-center justify-between mb-4">
              <div className="w-1/6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">Age</div>
                  <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-medium">Sodium</div>
                  <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-medium">BMI</div>
                </div>
              </div>
              
              <div className="w-4/6">
                <div className="space-y-4">
                  <div className="h-12 flex items-center">
                    <div className="w-full h-1 bg-blue-500"></div>
                  </div>
                  <div className="h-12 flex items-center">
                    <div className="w-full h-5 bg-red-500"></div>
                  </div>
                  <div className="h-12 flex items-center">
                    <div className="w-full h-1 bg-yellow-500"></div>
                  </div>
                </div>
              </div>
              
              <div className="w-1/6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs text-center">
                  Hidden Layer
                </div>
              </div>
            </div>
            
            <div className="bg-red-100 p-3 rounded mt-2">
              <p className="text-center font-medium">
                Problem: Sodium dominates the learning process due to its larger scale
              </p>
            </div>
          </div>
          
          {/* AFTER NORMALIZATION PANEL */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-xl font-bold text-center mb-4 text-green-600">After Normalization</h3>
            
            {/* Feature scales visualization - horizontal bars */}
            <div className="mb-6">
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <div className="w-20 text-right pr-2 font-medium">Age:</div>
                  <div className="flex-1 bg-gray-100 h-8 relative rounded">
                    <div className="absolute h-full w-full bg-blue-500 rounded"></div>
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-white font-medium">0-1 scale</span>
                  </div>
                </div>
                
                <div className="flex items-center mb-2">
                  <div className="w-20 text-right pr-2 font-medium">Sodium:</div>
                  <div className="flex-1 bg-gray-100 h-8 relative rounded">
                    <div className="absolute h-full w-full bg-red-500 rounded"></div>
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-white font-medium">0-1 scale</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-20 text-right pr-2 font-medium">BMI:</div>
                  <div className="flex-1 bg-gray-100 h-8 relative rounded">
                    <div className="absolute h-full w-full bg-yellow-500 rounded"></div>
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-white font-medium">0-1 scale</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Network weight visualization */}
            <h4 className="font-semibold text-center mb-3">Network Weights</h4>
            <div className="flex items-center justify-between mb-4">
              <div className="w-1/6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">Age</div>
                  <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-medium">Sodium</div>
                  <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-medium">BMI</div>
                </div>
              </div>
              
              <div className="w-4/6">
                <div className="space-y-4">
                  <div className="h-12 flex items-center">
                    <div className="w-full h-2 bg-blue-500"></div>
                  </div>
                  <div className="h-12 flex items-center">
                    <div className="w-full h-2 bg-red-500"></div>
                  </div>
                  <div className="h-12 flex items-center">
                    <div className="w-full h-2 bg-yellow-500"></div>
                  </div>
                </div>
              </div>
              
              <div className="w-1/6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs text-center">
                  Hidden Layer
                </div>
              </div>
            </div>
            
            <div className="bg-green-100 p-3 rounded mt-2">
              <p className="text-center font-medium">
                Solution: All features contribute equally to the learning process
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Data Splitting Tab */}
      {activeTab === 'splitting' && (
        <div className="grid grid-cols-1 gap-6">
          {/* Common Data Splitting Approaches */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-xl font-bold text-center mb-4">Data Splitting Approaches</h3>
            
            <div className="space-y-6">
              {/* Bad Practice - No Splitting */}
              <div className="bg-white p-3 rounded-lg shadow">
                <h4 className="font-semibold text-red-600 mb-2">❌ Bad Practice: No Splitting</h4>
                <div className="h-16 flex mb-2">
                  <div className="h-full bg-blue-500 rounded w-full flex items-center justify-center text-white font-medium">
                    Training & Evaluation on Same Data
                  </div>
                </div>
                <div className="bg-red-50 p-2 rounded text-sm">
                  <strong>Problem:</strong> Models appear to perform well but fail on new data (overfitting)
                </div>
              </div>
              
              {/* Better - Train/Test Split */}
              <div className="bg-white p-3 rounded-lg shadow">
                <h4 className="font-semibold text-yellow-600 mb-2">⚠️ Better: Train/Test Split</h4>
                <div className="h-16 flex mb-2">
                  <div className="h-full bg-blue-500 rounded-l w-4/5 flex items-center justify-center text-white font-medium">
                    Training Data (80%)
                  </div>
                  <div className="h-full bg-red-500 rounded-r w-1/5 flex items-center justify-center text-white font-medium">
                    Test (20%)
                  </div>
                </div>
                <div className="bg-yellow-50 p-2 rounded text-sm">
                  <strong>Improvement:</strong> Separate testing data provides unbiased evaluation, but model selection can still cause overfitting
                </div>
              </div>
              
              {/* Best - Train/Val/Test Split */}
              <div className="bg-white p-3 rounded-lg shadow">
                <h4 className="font-semibold text-green-600 mb-2">✅ Best: Train/Validation/Test Split</h4>
                <div className="h-16 flex mb-2">
                  <div className="h-full bg-blue-500 rounded-l w-3/5 flex items-center justify-center text-white font-medium">
                    Training (60%)
                  </div>
                  <div className="h-full bg-yellow-500 w-1/5 flex items-center justify-center text-white font-medium">
                    Validation (20%)
                  </div>
                  <div className="h-full bg-red-500 rounded-r w-1/5 flex items-center justify-center text-white font-medium">
                    Test (20%)
                  </div>
                </div>
                <div className="bg-green-50 p-2 rounded text-sm">
                  <strong>Best Practice:</strong> Train on training data, tune hyperparameters with validation data, final evaluation on test data
                </div>
              </div>
            </div>
          </div>
          
          {/* Stratified Sampling */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-xl font-bold text-center mb-4">Random Stratified Sampling</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sequential Splitting - LEFT */}
              <div className="bg-white p-3 rounded-lg shadow">
                <h4 className="font-semibold text-red-600 text-center mb-3">❌ Sequential Splitting</h4>
                
                {/* Visual representation of sequential split */}
                <div className="mb-3">
                  <div className="grid grid-cols-10 gap-0.5 border border-gray-200 p-1 rounded">
                    {Array.from({ length: 60 }).map((_, i) => (
                      <div key={`seq-train-${i}`} className="w-full aspect-square bg-blue-400" />
                    ))}
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={`seq-val-${i}`} className="w-full aspect-square bg-yellow-400" />
                    ))}
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={`seq-test-${i}`} className="w-full aspect-square bg-red-400" />
                    ))}
                  </div>
                </div>
                
                <div className="mt-3 bg-red-50 p-2 rounded text-sm">
                  <p><strong>Problem:</strong> Data ordered by time or groups creates biased splits</p>
                </div>
              </div>
              
              {/* Stratified Sampling - RIGHT */}
              <div className="bg-white p-3 rounded-lg shadow">
                <h4 className="font-semibold text-green-600 text-center mb-3">✅ Stratified Random Sampling</h4>
                
                {/* Visual representation of stratified split */}
                <div className="mb-3">
                  <div className="grid grid-cols-10 gap-0.5 border border-gray-200 p-1 rounded">
                    {Array.from({ length: 100 }).map((_, i) => {
                      // Create a deterministic but scattered pattern
                      const pattern = (i * 13) % 5;
                      return (
                        <div 
                          key={`strat-${i}`} 
                          className={`w-full aspect-square ${
                            pattern < 3 ? 'bg-blue-400' : 
                            pattern === 3 ? 'bg-yellow-400' : 'bg-red-400'
                          }`} 
                        />
                      );
                    })}
                  </div>
                </div>
                
                <div className="mt-3 bg-green-50 p-2 rounded text-sm">
                  <p><strong>Benefit:</strong> Random sampling preserves data distribution across all sets</p>
                </div>
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex justify-center mt-4 space-x-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-400 mr-1"></div>
                <span className="text-sm">Training</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-400 mr-1"></div>
                <span className="text-sm">Validation</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-400 mr-1"></div>
                <span className="text-sm">Test</span>
              </div>
            </div>
            
            <div className="bg-blue-50 p-3 rounded mt-4">
              <p className="text-center font-medium mb-2">Why Stratified Sampling Matters:</p>
              <div className="text-sm flex flex-col md:flex-row justify-between">
                <p>• Maintains class balance across all splits</p>
                <p>• Prevents data leakage between splits</p>
                <p>• More reliable evaluation metrics</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Training Performance Tab */}
      {activeTab === 'training' && (
        <div className="grid grid-cols-1 gap-6">
          {/* Training Performance Comparison */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-xl font-bold text-center mb-4">Impact on Model Training</h3>
            
            <div className="bg-blue-100 p-2 rounded text-sm text-center mb-4">
              <p>The metrics below represent typical performance patterns based on educational examples</p>
            </div>
            
            {/* Numerical Accuracy Comparison */}
            <div className="mb-8 bg-white p-3 rounded-lg shadow">
              <h4 className="font-medium text-center mb-4">Model Accuracy After 30 Epochs</h4>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Raw Data Performance */}
                <div className="border border-gray-200 rounded p-3">
                  <h5 className="font-medium text-center mb-2 text-red-600">Raw Data</h5>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Starting Accuracy:</div>
                    <div className="font-bold">21%</div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm">After 10 Epochs:</div>
                    <div className="font-bold">43%</div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm">After 20 Epochs:</div>
                    <div className="font-bold">51%</div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm">Final Accuracy:</div>
                    <div className="font-bold text-lg">63%</div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="text-sm">Convergence Speed:</div>
                    <div className="font-medium text-red-600">Slow</div>
                  </div>
                </div>
                
                {/* Preprocessed Data Performance */}
                <div className="border border-gray-200 rounded p-3 bg-blue-50">
                  <h5 className="font-medium text-center mb-2 text-blue-600">Preprocessed Data</h5>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Starting Accuracy:</div>
                    <div className="font-bold">25%</div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm">After 10 Epochs:</div>
                    <div className="font-bold">67%</div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm">After 20 Epochs:</div>
                    <div className="font-bold">82%</div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm">Final Accuracy:</div>
                    <div className="font-bold text-lg text-green-600">89%</div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="text-sm">Convergence Speed:</div>
                    <div className="font-medium text-green-600">Fast</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 bg-yellow-50 p-2 rounded text-sm text-center">
                <p className="font-medium">Preprocessing typically improves final accuracy by <span className="text-green-600 font-bold">20-30%</span></p>
              </div>
            </div>
            
            {/* Numerical Loss Comparison */}
            <div className="bg-white p-3 rounded-lg shadow mb-6">
              <h4 className="font-medium text-center mb-4">Training Loss Metrics</h4>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Raw Data Loss */}
                <div className="border border-gray-200 rounded p-3">
                  <h5 className="font-medium text-center mb-2 text-red-600">Raw Data</h5>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Initial Loss:</div>
                    <div className="font-bold">2.38</div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm">After 10 Epochs:</div>
                    <div className="font-bold">1.53</div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm">After 20 Epochs:</div>
                    <div className="font-bold">1.12</div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm">Final Loss:</div>
                    <div className="font-bold text-lg">0.87</div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="text-sm">Loss Reduction:</div>
                    <div className="font-medium text-red-600">-1.51</div>
                  </div>
                </div>
                
                {/* Preprocessed Data Loss */}
                <div className="border border-gray-200 rounded p-3 bg-blue-50">
                  <h5 className="font-medium text-center mb-2 text-blue-600">Preprocessed Data</h5>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Initial Loss:</div>
                    <div className="font-bold">2.31</div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm">After 10 Epochs:</div>
                    <div className="font-bold">0.93</div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm">After 20 Epochs:</div>
                    <div className="font-bold">0.46</div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm">Final Loss:</div>
                    <div className="font-bold text-lg text-green-600">0.32</div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="text-sm">Loss Reduction:</div>
                    <div className="font-medium text-green-600">-1.99</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 bg-yellow-50 p-2 rounded text-sm text-center">
                <p className="font-medium">Preprocessing reduces final loss by <span className="text-green-600 font-bold">63%</span> compared to raw data</p>
              </div>
            </div>
            
            {/* Key differences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-blue-50 p-3 rounded">
                <h4 className="font-semibold text-center mb-2">Preprocessed Data Benefits</h4>
                <ul className="text-sm space-y-1">
                  <li>• Faster convergence (high accuracy sooner)</li>
                  <li>• Lower final loss values (better optimization)</li>
                  <li>• More stable training curves</li>
                  <li>• Higher overall accuracy ceiling</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-3 rounded">
                <h4 className="font-semibold text-center mb-2">Raw Data Issues</h4>
                <ul className="text-sm space-y-1">
                  <li>• Slower learning rate initially</li>
                  <li>• Higher loss values throughout training</li>
                  <li>• More erratic training process</li>
                  <li>• Lower final model performance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Common footer for all tabs */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-center">Key Takeaways</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div className="bg-white p-2 rounded">• Normalization ensures all features contribute appropriately</div>
          <div className="bg-white p-2 rounded">• Proper data splitting prevents overfitting and data leakage</div>
          <div className="bg-white p-2 rounded">• Stratified sampling preserves data distribution across splits</div>
          <div className="bg-white p-2 rounded">• Preprocessing improves training speed and model performance</div>
        </div>
      </div>
    </div>
  );
};

export default FixedDataPreprocessingVisualizer;