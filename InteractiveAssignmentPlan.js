// InteractiveAssignmentPlan.js

/**
 * Project Plan: Interactive Assignment Explanation Website
 * 
 * Users Original prompt:
 * "Ok so the goal is to create an animated or even interactive website (can be github website) that takes this assignment, and explains it question by question. so it explains the question and the results. Like you see in the ipynb Project1 notebook but as an animated visualzed simplifed explenation like we did on the jsx files maxpooling and convolutioanllayer. get me? we are creating this plan as a reference file that you can go back to and see the context. we are  doing this because im a visual learner and i want tp present it to classmemebers, teammates and linkedin"
 * each tab should represnt anotehr part of the assignment. so a person can click on the tab and see the animated visualized simplified explenation of the assignment. a person should iimmediatly see in a glance  a summary of the results on each tab. we better do it part by part. whenever a part is done we need to update this file for future reference.
 * This document outlines the structure and components for developing an
 * interactive website that explains a deep learning assignment question by question,
 * similar to the structure seen in Project1 but with enhanced interactivity.
 */

const AssignmentPlan = {
  // Main component structure
  mainStructure: {
    title: "MIMIC-III Dataset Analysis: Interactive Explanations",
    description: "A step-by-step interactive guide to understanding healthcare data analysis with machine learning",
    components: [
      "Header",
      "NavigationMenu",
      "QuestionContainer",
      "InteractiveVisualizations",
      "CodeExamples",
      "Footer"
    ],
    styling: "Tailwind CSS with responsive design for all screen sizes"
  },
  
  // Question-by-question breakdown - Following the actual Project1 structure
  questions: [
    {
      id: "q1b",
      title: "Distribution Analysis of Patient Data",
      description: "How do the distributions of age, BMI, and Blood sodium look in the dataset?",
      interactiveComponents: [
        {
          name: "DistributionVisualizer",
          based_on: "DistributionVisualizer.jsx",
          enhancements: [
            "Interactive histogram with density curve overlay",
            "Toggle between different patient features (age, BMI, Blood sodium)",
            "Dynamic statistics display (mean, median, mode, std dev)",
            "Visual indicators for clinical thresholds (e.g., obesity BMI line)"
          ]
        },
        {
          name: "StatisticalMeasuresExplorer",
          based_on: "StatisticalMeasuresExplorer.jsx",
          features: [
            "Interactive exploration of statistical measures",
            "Visual representation of skewness and kurtosis",
            "Clinical interpretation of values with hover tooltips"
          ]
        }
      ],
      summaryPoints: [
        "Left-skewed age distribution (mean < median): predominantly elderly population",
        "Right-skewed BMI distribution: many patients in obese/overweight range",
        "Normal-distributed Blood sodium levels: reflects biological regulation"
      ]
    },
    {
      id: "q1c",
      title: "Classification Models for Patient Outcomes",
      description: "How well can we predict patient outcomes using different classification models?",
      interactiveComponents: [
        {
          name: "ModelComparisonVisualizer",
          based_on: "ModelComparisonVisualizer.jsx",
          enhancements: [
            "Bar chart comparison of model accuracy, precision, recall, and F1",
            "Interactive confusion matrix visualization",
            "Animated explanation of SMOTE balancing technique",
            "Side-by-side comparison of models with and without SMOTE"
          ]
        },
        {
          name: "ConfusionMatrixExplorer",
          features: [
            "Interactive confusion matrix with hover details",
            "Visual explanation of true/false positives/negatives",
            "Demonstrates impact of threshold adjustment on predictions"
          ]
        }
      ],
      summaryPoints: [
        "Initial models struggle with class imbalance (few positive cases)",
        "SMOTE technique significantly improves recall of positive cases",
        "Key metrics improved: sensitivity, balanced accuracy"
      ]
    },
    {
      id: "q1d",
      title: "Regression Analysis for BMI Prediction",
      description: "Can we predict BMI using age and Blood sodium as features?",
      interactiveComponents: [
        {
          name: "RegressionModelVisualizer",
          based_on: "RegressionModelVisualizer.jsx",
          enhancements: [
            "3D scatter plot showing relationship between age, Blood sodium, and BMI",
            "Interactive comparison of different regression models",
            "Visual representation of error metrics (RMSE, MSE, R²)"
          ]
        },
        {
          name: "PredictionErrorVisualizer",
          features: [
            "Predicted vs. actual value plots",
            "Residual analysis visualization",
            "Interactive explanation of why R² values are low"
          ]
        }
      ],
      summaryPoints: [
        "All models show poor performance (R² near zero or negative)",
        "Age and Blood sodium are weak predictors of BMI",
        "Best model still has high error (RMSE of ~9 BMI points)"
      ]
    },
    {
      id: "q2a",
      title: "PCA Visualization and Dimensionality Reduction",
      description: "How can we visualize the MIMIC-III dataset in lower dimensions?",
      interactiveComponents: [
        {
          name: "PCAVisualizer",
          features: [
            "Interactive 2D plot of PCA-transformed data",
            "Color-coding by outcome class",
            "Explained variance ratio visualization",
            "Component contribution analysis"
          ]
        },
        {
          name: "FeatureContributionVisualizer",
          features: [
            "Bar charts showing feature contributions to principal components",
            "Interactive selection of different principal components",
            "Explanation of eigenvectors and eigenvalues"
          ]
        }
      ],
      summaryPoints: [
        "PCA reveals moderate separation between outcome classes",
        "First two components explain ~70% of data variance",
        "Feature standardization is crucial for accurate PCA"
      ]
    },
    {
      id: "q2b",
      title: "K-means Clustering Analysis",
      description: "Can we identify natural patient groups using unsupervised learning?",
      interactiveComponents: [
        {
          name: "ClusterVisualizer",
          features: [
            "Interactive visualization of patient clusters",
            "Dynamic selection of number of clusters (2-6)",
            "Side-by-side comparison of feature distributions by cluster"
          ]
        },
        {
          name: "ClusterEvaluationDashboard",
          features: [
            "Interactive charts of Silhouette and Davies-Bouldin scores",
            "Animated K-means algorithm steps demonstration",
            "Patient characteristics summary for each cluster"
          ]
        }
      ],
      summaryPoints: [
        "Optimal cluster count: 2 clusters by Silhouette, different by Davies-Bouldin",
        "Clear separation between diabetic and non-diabetic patients",
        "Diabetic cluster shows higher BMI, supporting known clinical correlation"
      ]
    },
    {
      id: "q3a",
      title: "Neural Network Training Process",
      description: "How do neural networks learn through forward and backward propagation?",
      interactiveComponents: [
        {
          name: "PropagationVisualizer",
          features: [
            "Animated visualization of data flow in a neural network",
            "Step-by-step demonstration of forward propagation",
            "Backward propagation and gradient descent animation",
            "Weight update visualization"
          ]
        },
        {
          name: "GradientDescentSimulator",
          features: [
            "Interactive 3D error surface exploration",
            "Step-by-step gradient descent animation",
            "Learning rate impact demonstration"
          ]
        }
      ],
      summaryPoints: [
        "Forward propagation computes predictions through the network",
        "Loss function quantifies prediction error",
        "Backpropagation uses chain rule to calculate gradients",
        "Weights update proportional to their contribution to error"
      ]
    },
    {
      id: "q3b",
      title: "Bias-Variance Tradeoff in Neural Networks",
      description: "How does model complexity affect generalization?",
      interactiveComponents: [
        {
          name: "BiasVarianceVisualizer",
          features: [
            "Interactive visualization of underfitting vs. overfitting",
            "Model complexity vs. error curves for training and validation data",
            "Visual demonstration of high bias and high variance scenarios"
          ]
        },
        {
          name: "RegularizationExplorer",
          features: [
            "Interactive demonstration of regularization techniques",
            "Effect of dropout on model performance",
            "Early stopping visualization"
          ]
        }
      ],
      summaryPoints: [
        "Simple models risk high bias (underfitting)",
        "Complex models risk high variance (overfitting)",
        "Optimal model balances complexity to generalize well",
        "Regularization techniques help control variance"
      ]
    },
    {
      id: "q3c",
      title: "Data Preprocessing for Neural Networks",
      description: "Why is data preparation critical for effective deep learning?",
      interactiveComponents: [
        {
          name: "DataPreprocessingVisualizer",
          based_on: "DataPreprocessingVisualizer.jsx",
          features: [
            "Interactive visualization of normalization and standardization impact",
            "Dynamic data splitting visualization with proper vs improper techniques",
            "Side-by-side training performance comparison with/without preprocessing"
          ]
        },
        {
          name: "PreprocessingDashboard",
          features: [
            "Before/after visualizations of normalization and standardization",
            "Interactive data splitting demonstration",
            "Impact of preprocessing on convergence speed and accuracy"
          ]
        },
        {
          name: "NormalizationComparator",
          features: [
            "Side-by-side training curves with/without normalization",
            "Gradient magnitude visualization",
            "Feature scale impact demonstration"
          ]
        }
      ],
      summaryPoints: [
        "Normalization prevents features with large values from dominating",
        "Proper train/validation/test splitting prevents data leakage",
        "Preprocessing can dramatically improve training speed and stability",
        "Consistent preprocessing on all data splits is essential"
      ]
    },
    {
      id: "q3de",
      title: "Building Neural Networks with TensorFlow/Keras",
      description: "How to implement neural networks for healthcare data classification?",
      interactiveComponents: [
        {
          name: "NeuralNetworkBuilder",
          based_on: "Q3NeuralNetworks.jsx",
          enhancements: [
            "Interactive neural network architecture builder",
            "Layer-by-layer explanation of model construction",
            "Training visualization with accuracy/loss curves",
            "Hyperparameter tuning demonstration"
          ]
        },
        {
          name: "ActivationFunctionsVisualizer",
          based_on: "ActivationFunctionsVisualizer.jsx",
          features: [
            "Interactive visualization of different activation functions",
            "Impact of activation choice on model performance",
            "Vanishing/exploding gradient demonstration"
          ]
        }
      ],
      summaryPoints: [
        "Sequential Keras model structure simplifies implementation",
        "Dense layers with appropriate activations convert inputs to predictions",
        "Model training monitors loss and accuracy metrics",
        "Trained model outperforms traditional ML algorithms"
      ]
    }
  ],
  
  // Common interactive features
  commonFeatures: {
    codeBlocks: {
      language: "Python",
      features: [
        "Syntax highlighting",
        "Copy to clipboard button",
        "Editable with live validation",
        "Toggle between code and output view"
      ]
    },
    
    animations: {
      controls: [
        "Play/Pause",
        "Speed adjustment",
        "Step forward/backward",
        "Reset"
      ],
      tooltips: "Contextual explanations that appear during animations"
    },
    
    navigation: {
      type: "Linear tab-based progression",
      features: [
        "Question-based navigation tabs",
        "Completion tracking",
        "Summary highlights for each section"
      ]
    }
  },
  
  // Implementation approach
  implementation: {
    framework: "React with Vite",
    stateManagement: "React Context API for global state",
    componentStructure: "Modular, reusable components",
    dataFlow: "Top-down with props, Context for global state",
    styling: "Tailwind CSS with custom theme",
    deployment: "GitHub Pages with automated deployment",
    
    developmentSteps: [
      "1. Set up project structure and base components",
      "2. Implement linear tab-based navigation",
      "3. Develop Q1.b distribution analysis components",
      "4. Build Q1.c classification model comparison",
      "5. Create Q1.d regression analysis visualizations",
      "6. Implement Q2.a PCA visualization components",
      "7. Develop Q2.b clustering visualization and controls",
      "8. Build Q3 neural network theory visualizations",
      "9. Complete deployment and testing"
    ],
    
    completionStatus: {
      "Q1.b": "Not started",
      "Q1.c": "Not started",
      "Q1.d": "Not started",
      "Q2.a": "Not started",
      "Q2.b": "Not started",
      "Q3.a": "Not started",
      "Q3.b": "Not started",
      "Q3.c": "Completed - DataPreprocessingVisualizer.jsx implemented with interactive visualization of normalization, data splitting, and training performance comparison",
      "Q3.d-e": "Not started"
    }
  },
  
  // User engagement features
  engagement: {
    features: [
      "Linear progression through tabs matching the project questions",
      "At-a-glance result summaries for each question",
      "Interactive visualizations adapted from maxpooling and convolution examples",
      "Dark/light mode toggle",
      "Mobile-responsive design for presentations"
    ]
  }
};

export default AssignmentPlan;