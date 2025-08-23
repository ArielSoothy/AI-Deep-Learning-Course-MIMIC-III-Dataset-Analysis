import React from 'react';

const Glossary = () => {
  const glossaryData = {
    'General Statistical Terms': [
      { term: 'Mean', definition: 'The average value of a dataset, calculated by summing all values and dividing by the count' },
      { term: 'Median', definition: 'The middle value in a sorted dataset; less sensitive to outliers than the mean' },
      { term: 'Mode', definition: 'The most frequently occurring value in a dataset' },
      { term: 'Standard Deviation', definition: 'Measure of the amount of variation or dispersion in a dataset' },
      { term: 'Variance', definition: 'The average of squared differences from the mean, indicating data spread' },
      { term: 'Correlation', definition: 'Statistical measure indicating the extent to which two variables have a linear relationship' },
      { term: 'Percentile', definition: 'Value below which a given percentage of observations in a group falls' },
      { term: 'Quartile', definition: 'Values that divide a dataset into four equal parts' },
      { term: 'p-value', definition: 'Probability value used to determine statistical significance of results' }
    ],
    'Medical & Domain Terms': [
      { term: 'BMI (Body Mass Index)', definition: 'Measure of body fat based on height and weight (kg/m²); used to categorize weight status' },
      { term: 'Blood Sodium', definition: 'Concentration of sodium in blood, typically measured in mEq/L; critical for nerve and muscle function' },
      { term: 'Hyponatremia', definition: 'Abnormally low sodium concentration in blood (below 135 mEq/L)' },
      { term: 'Hypernatremia', definition: 'Abnormally high sodium concentration in blood (above 145 mEq/L)' },
      { term: 'MIMIC-III', definition: 'Medical Information Mart for Intensive Care - large, freely-available database of de-identified health records' },
      { term: 'Heart Rate', definition: 'Number of heartbeats per minute; normal adult range is typically 60-100 bpm' },
      { term: 'Diabetes', definition: 'Group of metabolic disorders characterized by high blood sugar levels over a prolonged period' },
      { term: 'ICU', definition: 'Intensive Care Unit - specialized hospital department providing intensive care medicine' }
    ],
    'Question 1.b: Distribution Analysis': [
      { term: 'Distribution', definition: 'Pattern of variation in a dataset showing how frequently values occur' },
      { term: 'Normal Distribution', definition: 'Bell-shaped probability distribution that is symmetric about the mean' },
      { term: 'Skewness', definition: 'Measure of asymmetry of the probability distribution' },
      { term: 'Kurtosis', definition: 'Measure of the "tailedness" of the probability distribution' },
      { term: 'Histogram', definition: 'Graphical representation showing the distribution of a dataset' },
      { term: 'Left-skewed Distribution', definition: 'Distribution where the long tail is on the left side and mean < median' },
      { term: 'Right-skewed Distribution', definition: 'Distribution where the long tail is on the right side and mean > median' },
      { term: 'Outlier', definition: 'Data point that differs significantly from other observations' }
    ],
    'Question 1.c: Classification Models': [
      { term: 'Classification', definition: 'Process of predicting the category of a data point based on its features' },
      { term: 'Decision Trees', definition: 'Tree-like model of decisions based on features in the dataset' },
      { term: 'Random Forest', definition: 'Ensemble learning method using multiple decision trees for improved performance' },
      { term: 'Logistic Regression', definition: 'Statistical model that predicts binary outcomes using a logistic function' },
      { term: 'SVM (Support Vector Machine)', definition: 'Algorithm that finds a hyperplane that best separates data into classes' },
      { term: 'kNN (k-Nearest Neighbors)', definition: 'Classification method that assigns labels based on the k closest training examples' },
      { term: 'Confusion Matrix', definition: 'Table showing correct and incorrect predictions for each class' },
      { term: 'Precision', definition: 'Proportion of positive identifications that were actually correct (TP/(TP+FP))' },
      { term: 'Recall', definition: 'Proportion of actual positives correctly identified (TP/(TP+FN)); also called Sensitivity' },
      { term: 'F1 Score', definition: 'Harmonic mean of precision and recall, providing a balance between the two metrics' },
      { term: 'SMOTE', definition: 'Synthetic Minority Over-sampling Technique: creates synthetic samples of the minority class' },
      { term: 'Class Imbalance', definition: 'Problem where classes in a dataset have significantly different numbers of samples' }
    ],
    'Question 1.d: Regression Analysis': [
      { term: 'Regression Analysis', definition: 'Statistical process for estimating relationships between variables' },
      { term: 'Linear Regression', definition: 'Method to model linear relationship between a dependent variable and one or more independent variables' },
      { term: 'SVR (Support Vector Regression)', definition: 'Regression version of SVM that maintains all the main features of the algorithm' },
      { term: 'Decision Tree Regressor', definition: 'Decision tree algorithm adapted for continuous output prediction tasks' },
      { term: 'KNN Regressor', definition: 'Regression version of kNN that predicts based on average of nearest neighbors' },
      { term: 'MSE (Mean Squared Error)', definition: 'Average squared difference between estimated values and actual value' },
      { term: 'RMSE (Root Mean Square Error)', definition: 'Square root of MSE, giving errors in the same units as the output variable' },
      { term: 'R² (R-squared)', definition: 'Statistical measure representing proportion of variance explained by the model' }
    ],
    'Question 2.b: K-means Clustering': [
      { term: 'Clustering', definition: 'Unsupervised learning technique that groups similar data points' },
      { term: 'K-means', definition: 'Algorithm that partitions data into K clusters based on feature similarity' },
      { term: 'Centroid', definition: 'Center point of a cluster in the feature space' },
      { term: 'Inertia', definition: 'Sum of squared distances of samples to their closest cluster center' },
      { term: 'Elbow Method', definition: 'Technique to determine optimal number of clusters by plotting inertia against K values' },
      { term: 'Silhouette Score', definition: 'Measure of how similar an object is to its own cluster compared to other clusters (range: -1 to 1)' },
      { term: 'Davies-Bouldin Score', definition: 'Measure of average similarity between clusters (lower values indicate better clustering)' },
      { term: 'Feature Standardization', definition: 'Process of rescaling features to have mean=0 and standard deviation=1' }
    ],
    'Question 3: Neural Networks': [
      { term: 'Neural Network', definition: 'Computing system inspired by biological neural networks that learn from data' },
      { term: 'Deep Learning', definition: 'Subset of machine learning using neural networks with multiple layers' },
      { term: 'Forward Propagation', definition: 'Process of moving data through a neural network from input to output layers' },
      { term: 'Backpropagation', definition: 'Algorithm for calculating gradients and updating weights during neural network training' },
      { term: 'Neuron/Node', definition: 'Basic unit in a neural network that receives inputs, applies weights and activation function' },
      { term: 'Activation Function', definition: 'Function that determines the output of a neural node based on inputs' },
      { term: 'ReLU', definition: 'Rectified Linear Unit activation function that outputs the input if positive, otherwise zero' },
      { term: 'Sigmoid', definition: 'Activation function that maps any input into a value between 0 and 1' },
      { term: 'Bias-Variance Tradeoff', definition: 'Balance between model complexity and ability to generalize to unseen data' },
      { term: 'Overfitting', definition: 'When a model learns noise in training data, affecting performance on new data' },
      { term: 'Underfitting', definition: 'When a model is too simple to learn the underlying structure of the data' },
      { term: 'Dense Layer', definition: 'Neural network layer where each neuron is connected to all neurons in previous layer' },
      { term: 'Dropout', definition: 'Regularization technique that randomly sets a fraction of inputs to zero during training' },
      { term: 'Epoch', definition: 'One complete pass through the entire training dataset during neural network training' },
      { term: 'Batch Size', definition: 'Number of training samples processed before the model weights are updated' },
      { term: 'Binary Cross-Entropy', definition: 'Loss function commonly used for binary classification problems' },
      { term: 'Adam Optimizer', definition: 'Optimization algorithm that adapts learning rates for each parameter' },
      { term: 'TensorFlow/Keras', definition: 'Popular libraries for building and training neural networks' },
      { term: 'ROC Curve', definition: 'Receiver Operating Characteristic curve showing performance of classification model at various thresholds' },
      { term: 'AUC', definition: 'Area Under the ROC Curve; measures classifier performance across all possible thresholds' },
      { term: 'Data Preprocessing', definition: 'Transformations applied to data before feeding it into a machine learning algorithm' }
    ]
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Healthcare Data Analysis Glossary</h2>
      <p className="mb-6 text-center text-gray-600">A comprehensive guide to key terms used throughout this project</p>
      
      {Object.entries(glossaryData).map(([section, terms]) => (
        <div key={section} className="mb-8">
          <h3 className="text-xl font-semibold mb-3 bg-gray-100 p-2 rounded">{section}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {terms.map((item, index) => (
              <div key={index} className="border p-3 rounded-lg hover:bg-blue-50 transition-colors">
                <h4 className="font-bold text-blue-600">{item.term}</h4>
                <p className="text-gray-700">{item.definition}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Glossary;