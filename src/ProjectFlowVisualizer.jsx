import React, { useState } from 'react';

const ProjectFlowVisualizer = () => {
  // State for potential future interactions, currently unused but kept for structure
  // const [expandedQuestion, setExpandedQuestion] = useState(null);

  // Combined data structure based on project questions
  const projectQuestions = [
    {
      id: 'q1a',
      question: "Q1a: What are the mean, median, mode, and standard deviation of the age, BMI, and Blood sodium columns? Why are these statistics important?",
      approach: "Calculated basic descriptive statistics (mean, median, mode, standard deviation) for 'age', 'BMI', and 'Blood sodium' using pandas.",
      results: [
        "Age: Mean=74.1, Median=77.0, Mode=89.0, Std Dev=14.4",
        "BMI: Mean=30.2, Median=28.3, Mode=23.3, Std Dev=9.3",
        "Blood Sodium: Mean=138.9, Median=139.0, Mode=139.0, Std Dev=4.2"
      ],
      implications: "These statistics provide a baseline understanding of the patient cohort (e.g., predominantly elderly, tendency towards overweight/obesity, normal sodium levels). They reveal central tendency, spread, and common values, crucial for identifying potential data issues or characteristics influencing model performance."
    },
    {
      id: 'q1b',
      question: "Q1b: How do the distributions of age, BMI, and Blood sodium look? What can we learn?",
      approach: "Generated histograms with Kernel Density Estimates (KDE) for 'age', 'BMI', and 'Blood sodium' using Matplotlib and Seaborn. Added lines for mean, median, mode, and relevant clinical thresholds.",
      results: [
        "Age: Left-skewed distribution, peak at older ages (mode 89).",
        "BMI: Right-skewed distribution, mean (30.2) in obese range, median (28.3) overweight, mode (23.3) normal.",
        "Blood Sodium: Approximately symmetrical distribution centered around the normal range (135-145 mEq/L)."
      ],
      implications: "Visualizations confirm the statistical findings. Skewness highlights the influence of outliers (very old patients, high BMI patients). The distributions inform feature engineering choices and potential need for data transformation. The patient population is generally elderly and often overweight/obese."
    },
    {
      id: 'q1c',
      question: "Q1c: Predict 'outcome' using 'age', 'BMI', 'Blood sodium' with Logistic Regression, SVM, kNN, Decision Tree. Handle missing values, split data (80/20, random_state=42), report best model, and explain confusion matrix. Address class imbalance.",
      approach: [
        "Dropped rows with missing 'BMI' or 'Blood sodium'.",
        "Selected 'age', 'BMI', 'Blood sodium' as features (X) and 'outcome' as target (y).",
        "Split data into 80% training and 20% testing sets (random_state=42).",
        "Trained Logistic Regression, SVM, KNN, and Decision Tree models on the original training data.",
        "Evaluated models using accuracy and identified KNN as initially best.",
        "Printed classification report and confusion matrix for the best model (KNN).",
        "Identified significant class imbalance (many more '0' outcomes than '1').",
        "Applied SMOTE (Synthetic Minority Over-sampling Technique) to the training data to balance classes.",
        "Retrained all models on the SMOTE-resampled data.",
        "Re-evaluated models, focusing on sensitivity (recall) for the minority class.",
        "Compared performance before and after SMOTE, including detailed metrics and confusion matrices.",
        "Explored ensemble methods (Random Forest, Gradient Boosting, Calibrated SVM) on SMOTE data and optimized prediction thresholds based on balanced accuracy."
      ],
      results: [
        "Initial KNN (best before SMOTE): Accuracy=0.834, but very low recall (Sensitivity) for class 1 (0.036). TN=160, FP=5, FN=27, TP=1.",
        "After SMOTE: Overall accuracy decreased for most models, but sensitivity for class 1 significantly improved.",
        "Best model after SMOTE (KNN with k=3): Accuracy=0.793, Sensitivity=0.536, Specificity=0.830. TN=137, FP=28, FN=13, TP=15.",
        "Ensemble methods (RF, GB, Calibrated SVM) with threshold optimization on SMOTE data further improved balanced accuracy, achieving better trade-offs between sensitivity and specificity (e.g., RF Balanced Acc: ~0.71 at threshold 0.45)."
      ],
      implications: "Accuracy alone is misleading with imbalanced data. SMOTE is crucial for improving the model's ability to detect the minority class (mortality), which is vital in clinical settings. Threshold optimization allows fine-tuning the balance between correctly identifying positive cases (sensitivity) and negative cases (specificity). Ensemble methods can offer robust performance."
    },
    {
      id: 'q1d',
      question: "Q1d: Predict 'BMI' using 'age' and 'Blood sodium' with Linear Regression, SVR, Decision Tree Regressor, kNN Regressor. Calculate RMSE, MSE, R-squared. Split data (80/20, random_state=42). Plot actual vs. predicted.",
      approach: "Selected 'age', 'Blood sodium' as features (X) and 'BMI' as target (y). Used the same cleaned data and train/test split as Q1c. Trained Linear Regression, SVR, Decision Tree Regressor, and KNN Regressor. Calculated Mean Squared Error (MSE), Root Mean Squared Error (RMSE), and R-squared (R²) for each model on the test set. Plotted actual BMI vs. predicted BMI for each model.",
      results: [
        "All models performed poorly.",
        "Linear Regression: RMSE ≈ 9.30, R² ≈ -0.001",
        "SVM Regressor: RMSE ≈ 9.36, R² ≈ -0.014",
        "Decision Tree: RMSE ≈ 11.58, R² ≈ -0.541",
        "KNN Regressor: RMSE ≈ 9.98, R² ≈ -0.147",
        "Negative R² values indicate models performed worse than simply predicting the mean BMI.",
        "Actual vs. Predicted plots showed scattered points with no clear linear relationship."
      ],
      implications: "'Age' and 'Blood sodium' are very weak predictors of 'BMI'. The high RMSE values (around 9-11 BMI points) are clinically significant errors. Predicting BMI accurately requires features more directly related to body composition, like weight and height."
    },
    {
      id: 'q2a',
      question: "Q2a: Apply PCA and t-SNE for dimensionality reduction on 'BMI', 'Blood sodium', 'Blood calcium'. Visualize and compare.",
      approach: "Selected 'BMI', 'Blood sodium', 'Blood calcium' features. Handled missing values (filled with median). Standardized the features using StandardScaler. Applied PCA to reduce to 2 components, calculating explained variance. Applied t-SNE (with perplexities 5, 30, 50) to reduce to 2 components. Visualized the 2D projections from both methods using scatter plots, colored by BMI.",
      results: [
        "PCA: The first two components explained ~70% of the variance. Visualization showed a spread based on variance but no distinct clusters.",
        "t-SNE: Revealed more defined local structures and potential groupings compared to PCA, especially with perplexity=30 and 50. Points with similar BMI values tended to be closer in the t-SNE plot.",
        "Comparison: PCA preserves global variance, while t-SNE focuses on preserving local similarities, making it better for visualizing potential clusters in high-dimensional data."
      ],
      implications: "Dimensionality reduction techniques help visualize high-dimensional data. PCA is useful for understanding variance structure, while t-SNE is better for exploring potential non-linear relationships and clusters. Neither technique showed perfectly separated groups based on these three features alone."
    },
    {
      id: 'q2b',
      question: "Q2b: Apply K-means clustering (k=2 to 6) using 'age', 'BMI', 'diabetes', 'heart rate'. Evaluate using Silhouette and Davies-Bouldin scores. Interpret clusters.",
      approach: "Selected 'age', 'BMI', 'diabetes', 'heart rate' features. Handled missing values (dropped rows). Standardized features using StandardScaler. Applied K-means clustering for k=2, 3, 4, 5, and 6. Calculated Silhouette Score (higher is better) and Davies-Bouldin Score (lower is better) for each k. Analyzed the characteristics (mean feature values) of the clusters for the best k (k=2 based on Silhouette). Visualized feature distributions across the chosen clusters.",
      results: [
        "Evaluation Scores:",
        "k=2: Silhouette=0.315, Davies-Bouldin=1.195",
        "k=3: Silhouette=0.232, Davies-Bouldin=1.285",
        "k=4: Silhouette=0.238, Davies-Bouldin=1.207",
        "k=5: Silhouette=0.215, Davies-Bouldin=1.260",
        "k=6: Silhouette=0.211, Davies-Bouldin=1.264",
        "Best k based on Silhouette Score: k=2.",
        "Interpretation of k=2 clusters:",
        "Cluster 0: Predominantly Diabetic (97.6%), Higher Mean BMI (32.6), Slightly Lower Mean Age (73.6), Lower Mean Heart Rate (75.8).",
        "Cluster 1: Non-Diabetic (0%), Lower Mean BMI (27.3), Slightly Higher Mean Age (74.8), Higher Mean Heart Rate (80.0)."
      ],
      implications: "K-means successfully identified two distinct patient groups primarily differentiated by diabetes status and BMI. This aligns with clinical knowledge linking obesity and diabetes. Unsupervised learning can uncover meaningful patient subgroups even without prior labels."
    },
    {
      id: 'q3a-c',
      question: "Q3a-c: Describe NN training (forward/backprop), explain bias-variance trade-off, and highlight the importance of preprocessing/normalization/splitting.",
      approach: "Provided textual explanations based on standard deep learning concepts.",
      results: [
        "Q3a: Explained initialization, forward pass (calculating weighted sums and applying activations), loss calculation, backward pass (calculating gradients using chain rule), and weight updates (using gradients and learning rate).",
        "Q3b: Explained bias (underfitting due to oversimplification) and variance (overfitting due to over-sensitivity to training data). Emphasized the need to balance them for optimal generalization.",
        "Q3c: Highlighted preprocessing (cleaning, formatting), normalization (scaling features for stable gradient descent), and splitting (train/validation/test sets for learning, tuning, and unbiased evaluation) as crucial steps for effective DL model training and generalization."
      ],
      implications: "Established the theoretical foundation necessary for understanding and implementing the subsequent deep learning model."
    },
    {
      id: 'q3d',
      question: "Q3d: Train a DNN (4 Dense layers: 3xReLU, 1xSigmoid; 2 Dropout layers) using TensorFlow/Keras to classify 'outcome' based on 'age' and 'Blood sodium'. Standardize features, split 80/20, compile (binary_crossentropy, adam, accuracy), train (100 epochs, 20% validation split), plot metrics, evaluate on test set, show confusion matrix and model summary.",
      approach: "Selected 'age', 'Blood sodium' features and 'outcome' target. Cleaned data (dropped NaN). Standardized features using StandardScaler. Split data (80% train, 20% test, random_state=42). Built the specified DNN architecture using Keras Sequential API (Dense layers with ReLU/Sigmoid, Dropout). Compiled the model (loss='binary_crossentropy', optimizer='adam', metrics=['accuracy']). Trained for 100 epochs with a 20% validation split. Plotted training/validation accuracy and loss curves. Evaluated the final model on the test set (accuracy, loss). Generated and plotted a confusion matrix for test predictions. Displayed model.summary(). Calculated ROC-AUC.",
      results: [
        "Model trained successfully over 100 epochs.",
        "Training/Validation plots showed typical learning curves, with validation accuracy plateauing.",
        "Test Accuracy: ~0.866 (Note: This is high due to class imbalance, similar to Q1c initial results).",
        "Test Loss: ~0.35",
        "Confusion Matrix (Test Set): TN=165, FP=0, FN=26, TP=2. (Again, very poor TP/Sensitivity).",
        "ROC AUC: ~0.75 (Indicates some discrimination ability despite poor sensitivity at 0.5 threshold).",
        "Model Summary: Showed layer structure and parameter counts."
      ],
      implications: "Successfully implemented and trained a basic DNN for classification. However, using only 'age' and 'Blood sodium' and without addressing class imbalance explicitly in the loss or sampling, the model heavily favors the majority class, resulting in poor sensitivity for the minority 'outcome=1' class, similar to the initial classical models in Q1c."
    },
     {
      id: 'q3e',
      question: "Q3e: Design a DNN model for in-hospital mortality prediction. Select relevant features. Explore combinations of layers, activation functions, optimizers, loss functions, etc. (Further exploration included RF, GB, SVM, LSTM, Ensembles, LightGBM).",
      approach: [
          "Selected a broader set of potentially relevant features (vitals, demographics, comorbidities).",
          "Handled missing values using KNNImputer.",
          "Standardized features.",
          "Split data (Train/Test, stratified).",
          "Trained and evaluated several models:",
          "  - Random Forest (RF)",
          "  - Gradient Boosting (GB)",
          "  - Support Vector Machine (SVM) with probability calibration",
          "Evaluated these models across various prediction thresholds to find the best balance (optimizing for Balanced Accuracy).",
          "Implemented and trained an LSTM model (more suitable for sequential/time-series data if available, but applied here as an exploration).",
          "Implemented a Stacking Ensemble: Used predictions from base models (GB variants, RF, LR) as input features for a meta-model (Logistic Regression) to combine their strengths.",
          "Implemented and trained a LightGBM model (another efficient gradient boosting framework).",
          "Compared model performance using AUC, confusion matrices (at optimized thresholds), and other metrics.",
          "Analyzed feature importance using SHAP values for tree-based models (GB, LightGBM)."
      ],
      results: [
          "RF, GB, SVM: Showed reasonable performance, with AUCs typically around 0.75-0.80. Threshold optimization was key to achieving better sensitivity/specificity balance compared to the default 0.5.",
          "LSTM: Performance varied depending on data structure (less effective if data wasn't truly sequential per patient).",
          "Stacking Ensemble: Often slightly outperformed the best single base model, demonstrating the benefit of combining diverse models (AUC improved slightly over best base model). Meta-model weights indicated the relative contribution of each base model.",
          "LightGBM: Demonstrated strong performance, often comparable or slightly better than standard GB, with faster training times. AUC around 0.80.",
          "Feature Importance (SHAP): Consistently highlighted features like 'age', 'Lactic acid', 'BUN_Creatinine_ratio', 'Leucocyte', 'Bicarbonate', and the engineered 'organ_failure_score' as important predictors across different models."
      ],
      implications: "Exploring more complex models and feature engineering improved prediction performance compared to the basic DNN in Q3d. Ensemble methods and advanced gradient boosting techniques (LightGBM) are powerful tools for tabular data. Feature importance analysis helps understand model decisions and identify key clinical factors driving mortality risk. Optimizing prediction thresholds based on clinical needs (e.g., prioritizing sensitivity) is crucial for practical application."
    }
  ];


  // --- Rendering Functions ---

  const renderSimplifiedFlowchart = () => {
    // ... existing renderSimplifiedFlowchart code ...
    // No changes needed here
    return (
      <div className="mb-8 overflow-hidden">
        <h3 className="text-lg font-bold mb-4 text-center text-gray-700">Project Workflow Summary</h3>
        <div className="flex flex-col md:flex-row justify-around items-stretch bg-white p-4 rounded-lg shadow-md space-y-4 md:space-y-0 md:space-x-2">
          {/* Simplified stages based on the overall flow */}
          {[
            { id: 'data', label: '1. Data Prep', description: 'Stats, Distributions, Cleaning', color: 'bg-blue-600' },
            { id: 'supervised', label: '2. Supervised ML', description: 'Classification, Regression, SMOTE', color: 'bg-green-600' },
            { id: 'unsupervised', label: '3. Unsupervised ML', description: 'PCA/t-SNE, K-Means', color: 'bg-purple-600' },
            { id: 'dl', label: '4. Deep Learning', description: 'DNN, Advanced Models, Ensembles', color: 'bg-orange-600' }
          ].map((stage, index, arr) => (
            <React.Fragment key={stage.id}>
              <div className="flex flex-col items-center flex-1 min-w-[150px]">
                <div className={`${stage.color} text-white p-3 rounded-lg w-full h-24 flex items-center justify-center text-center shadow`}>
                  <div>
                    <div className="font-bold text-sm md:text-base">{stage.label}</div>
                    <div className="text-xs mt-1 hidden md:block">{stage.description}</div>
                  </div>
                </div>
              </div>
              {index < arr.length - 1 && (
                <div className="flex items-center justify-center">
                   <div className="text-2xl text-gray-400 transform rotate-90 md:rotate-0 mx-2">➔</div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  // New function to render the detailed journey by question
  const renderDetailedProjectJourney = () => {
    return (
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold mb-6 text-center text-gray-700">Detailed Project Journey by Question</h3>
        <div className="space-y-8">
          {projectQuestions.map((item, index) => (
            <div key={item.id} className="border-l-4 border-blue-500 pl-4 py-4 bg-gray-50 rounded-r-lg shadow-sm">
              <h4 className="font-bold text-md text-blue-700 mb-2">{item.question}</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-gray-800">Approach:</p>
                  {Array.isArray(item.approach) ? (
                    <ul className="list-disc list-inside text-gray-700 ml-4">
                      {item.approach.map((step, idx) => <li key={idx}>{step}</li>)}
                    </ul>
                  ) : (
                    <p className="text-gray-700">{item.approach}</p>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Results / Findings:</p>
                  <ul className="list-disc list-inside text-gray-700 ml-4">
                    {item.results.map((result, idx) => <li key={idx}>{result}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-green-800">Meaning / Implications:</p>
                  <p className="text-green-700">{item.implications}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };


  // --- Main Component Return ---

  return (
    <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-inner min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 text-center bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800">Project 1: MIMIC-III Data Analysis Overview</h2>
          <p className="text-gray-600 mt-1 text-sm">
            Visualizing the steps and key findings from analyzing the MIMIC-III dataset using machine learning and deep learning.
          </p>
        </div>

        {/* Simplified Flowchart */}
        {renderSimplifiedFlowchart()}

        {/* Detailed Project Journey by Question */}
        {renderDetailedProjectJourney()}

        {/* Removed calls to renderExpandableStages and renderProjectJourneyView */}

      </div>
    </div>
  );
};

export default ProjectFlowVisualizer;