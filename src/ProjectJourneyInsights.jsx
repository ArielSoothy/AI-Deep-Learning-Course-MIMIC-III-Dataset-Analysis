import React, { useState } from 'react';

const ProjectJourneyInsights = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  
  // Data structure containing our journey insights with clinical implications
  const journeyInsights = [
    {
      id: "q1b",
      question: "Distributions of Age, BMI, and Blood Sodium",
      results: [
        "Mean age: 74.1 years (elderly population)",
        "Mean BMI: 30.2 (obese category)",
        "Blood sodium: Normal range (mean 138.9 mEq/L)",
        "Left-skewed age distribution, right-skewed BMI"
      ],
      clinicalImplications: [
        "The elderly population (mean age 74.1) is at higher risk for mortality and complications",
        "Obesity prevalence (mean BMI 30.2) indicates increased metabolic disease risk",
        "Sodium regulation appears intact despite other health issues",
        "Patient population typical of ICU settings: elderly with metabolic risk factors"
      ]
    },
    {
      id: "q1c",
      question: "Classification Models for Mortality Prediction",
      results: [
        "Initial models: High accuracy (85%) but poor minority class detection",
        "Class imbalance: Only ~15% positive cases (mortality)",
        "SMOTE implementation: Improved minority detection but lower accuracy (68%)",
        "Best balanced model: KNN with SMOTE (balanced accuracy 49%)"
      ],
      clinicalImplications: [
        "Initial high accuracy was misleading - models were simply predicting 'no mortality' for everyone",
        "Missing positive cases (false negatives) is dangerous in healthcare",
        "SMOTE resampling sacrificed overall accuracy but significantly improved detection of at-risk patients",
        "In healthcare, sensitivity (detecting true positives) is often more important than overall accuracy",
        "Models need further refinement, but demonstrate the common healthcare data challenge of imbalanced outcomes"
      ]
    },
    {
      id: "q1d",
      question: "Regression Models for BMI Prediction",
      results: [
        "All models performed poorly (best RMSE: ~7.9 BMI points)",
        "Negative R² for Decision Tree (-0.71)",
        "KNN Regressor was slightly better than other approaches",
        "Age and blood sodium had minimal predictive power for BMI"
      ],
      clinicalImplications: [
        "A difference of 7.9 BMI points is clinically significant (could span multiple BMI categories)",
        "Negative R² means the model performs worse than simply predicting the mean BMI for everyone",
        "Age and sodium levels are not meaningful predictors of BMI (which depends on weight and height)",
        "Shows importance of selecting clinically relevant features - domain knowledge matters",
        "Models would need additional variables like diet, activity level, or genetic factors to be useful"
      ]
    },
    {
      id: "q2b",
      question: "K-means Clustering of Patient Groups",
      results: [
        "Two distinct clusters identified as optimal solution",
        "Cluster 1: Non-diabetic (0%), lower BMI, slightly older patients",
        "Cluster 2: Diabetic (97.6%), higher BMI, slightly younger patients",
        "Diabetes status was the strongest differentiator"
      ],
      clinicalImplications: [
        "Confirms strong relationship between diabetes and BMI seen in medical literature",
        "Could help stratify patient populations for targeted interventions",
        "Cluster 1 (non-diabetic) patients may need different treatment approaches",
        "Cluster 2 represents classic metabolic syndrome presentation",
        "Unsupervised learning validated known clinical associations but didn't reveal new patterns",
        "Potential for personalized medicine approaches based on cluster membership"
      ]
    },
    {
      id: "q3",
      question: "Neural Networks for Healthcare Data",
      results: [
        "Neural network required careful preprocessing and regularization",
        "Dropout layers (5%) helped reduce overfitting",
        "Achieved improved minority class detection compared to simpler models",
        "Training accuracy higher than validation accuracy (sign of overfitting)"
      ],
      clinicalImplications: [
        "Neural networks can potentially capture complex relationships in healthcare data",
        "The limited dataset size made overfitting a significant concern",
        "Preprocessing was more important than complex architecture",
        "With sufficient data, neural networks could identify subtle patterns missed by traditional methods",
        "For critical healthcare applications, interpretable models may be preferred over black-box approaches",
        "Balance between model complexity and interpretability remains a key challenge"
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">The Story Behind Our Analysis: Clinical Implications</h2>
      
      <p className="text-gray-600 mb-8 text-center">
        Beyond the technical details, our analysis has real implications for patient care. 
        Click each section to explore what our findings actually mean in a healthcare context.
      </p>
      
      <div className="space-y-4">
        {journeyInsights.map((section) => (
          <div 
            key={section.id}
            className="border border-blue-200 rounded-lg overflow-hidden bg-white shadow-sm"
          >
            {/* Section header */}
            <div 
              className={`p-4 flex justify-between items-center cursor-pointer transition-colors ${
                expandedSection === section.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
              onClick={() => setExpandedSection(
                expandedSection === section.id ? null : section.id
              )}
            >
              <h3 className="font-semibold">{section.question}</h3>
              <span className="text-xl">
                {expandedSection === section.id ? '−' : '+'}
              </span>
            </div>
            
            {/* Expanded content */}
            {expandedSection === section.id && (
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Results column */}
                  <div className="bg-gray-50 p-4 rounded border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-800 mb-2">What We Found</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {section.results.map((result, idx) => (
                        <li key={idx}>{result}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Clinical Implications column */}
                  <div className="bg-green-50 p-4 rounded border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-800 mb-2">What It Means Clinically</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {section.clinicalImplications.map((implication, idx) => (
                        <li key={idx}>{implication}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-blue-100 border-l-4 border-blue-500 p-4 rounded-lg">
        <h4 className="font-bold text-blue-800">Overall Clinical Impact of Our Analysis</h4>
        <p className="text-gray-700 mt-2">
          This project demonstrates the challenges and opportunities of applying machine learning to healthcare data.
          While our models had limited predictive power with the features available, they highlighted important 
          considerations: the need for handling class imbalance, the importance of clinically relevant features, 
          and the value of different evaluation metrics in healthcare settings. Most significantly, the analysis 
          showed how different ML approaches can validate known clinical relationships (like diabetes and obesity)
          while potentially uncovering new patterns with more comprehensive data.
        </p>
      </div>
    </div>
  );
};

export default ProjectJourneyInsights;