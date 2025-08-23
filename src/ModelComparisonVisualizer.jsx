import React from 'react';

const ModelComparisonVisualizer = () => {
  // Data focused on the comparison between Original KNN and SMOTE KNN
  const confusionMatrices = {
    basic: {
      name: 'Original KNN',
      matrix: [[160, 5], [27, 1]], // TN, FP, FN, TP
      metrics: {
        accuracy: 0.8342,
        sensitivity: 0.0357, // TP / (TP + FN) = 1 / (1 + 27)
        specificity: 0.9697, // TN / (TN + FP) = 160 / (160 + 5)
        precision: 0.1667, // TP / (TP + FP) = 1 / (1 + 5)
        f1: 0.0588,
        balancedAccuracy: 0.5027 // (Sensitivity + Specificity) / 2
      }
    },
    smote: {
      name: 'SMOTE KNN',
      matrix: [[125, 40], [22, 6]], // TN, FP, FN, TP
      metrics: {
        accuracy: 0.6788, // (125 + 6) / (125 + 40 + 22 + 6) = 131 / 193
        sensitivity: 0.2143, // TP / (TP + FN) = 6 / (6 + 22)
        specificity: 0.7576, // TN / (TN + FP) = 125 / (125 + 40)
        precision: 0.1304, // TP / (TP + FP) = 6 / (6 + 40)
        f1: 0.1622,
        balancedAccuracy: 0.4859 // (Sensitivity + Specificity) / 2
      }
    }
  };

  // Helper to color code based on value improvement
  const getComparisonColor = (original, improved) => {
    const difference = improved - original;
    if (difference > 0.05) return 'text-green-600 font-semibold';
    if (difference < -0.05) return 'text-red-600 font-semibold';
    return 'text-gray-700';
  };

  // Helper to render a confusion matrix
  const renderConfusionMatrix = (data) => (
    <div className="md:w-1/2">
      <h4 className="font-medium mb-3 text-center">{data.name}</h4>
      <div className="relative overflow-hidden">
        <div className="grid grid-cols-2 gap-1 mx-auto max-w-xs">
          <div className="text-center text-xs text-gray-500">Predicted Negative</div>
          <div className="text-center text-xs text-gray-500">Predicted Positive</div>
          <div className="bg-blue-100 p-4 text-center border border-blue-300 relative">
            <span className="text-lg font-bold">{data.matrix[0][0]}</span>
            <span className="block text-xs text-gray-600">True Negatives (TN)</span>
          </div>
          <div className="bg-orange-100 p-4 text-center border border-orange-300">
            <span className="text-lg font-bold">{data.matrix[0][1]}</span>
            <span className="block text-xs text-gray-600">False Positives (FP)</span>
          </div>
          <div className="bg-orange-100 p-4 text-center border border-orange-300">
            <span className="text-lg font-bold">{data.matrix[1][0]}</span>
            <span className="block text-xs text-gray-600">False Negatives (FN)</span>
          </div>
          <div className="bg-green-100 p-4 text-center border border-green-300">
            <span className="text-lg font-bold">{data.matrix[1][1]}</span>
            <span className="block text-xs text-gray-600">True Positives (TP)</span>
          </div>
        </div>
        <div className="absolute top-0 left-0 h-full">
          <div className="h-1/2 flex items-center -ml-6">
            <span className="transform -rotate-90 text-xs text-gray-500">Actual Negative</span>
          </div>
          <div className="h-1/2 flex items-center -ml-6">
            <span className="transform -rotate-90 text-xs text-gray-500">Actual Positive</span>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-700 mb-1">
          Sensitivity: <span className="font-semibold">{(data.metrics.sensitivity * 100).toFixed(1)}%</span>
        </p>
        <p className="text-sm text-gray-700">
          Specificity: <span className="font-semibold">{(data.metrics.specificity * 100).toFixed(1)}%</span>
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col bg-gray-50 p-6 w-full rounded-lg shadow-md">
      {/* Header */}
      <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h2 className="text-lg font-bold">Model Comparison: Original vs. SMOTE</h2>
        <p className="text-gray-700 text-sm mt-1">
          Comparing the best original model (KNN) with the SMOTE-enhanced KNN model for mortality prediction, highlighting the impact of addressing class imbalance.
        </p>
      </div>

      {/* Confusion Matrix Comparison */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <h3 className="text-lg font-semibold mb-4 text-center">Confusion Matrix Comparison</h3>
        <div className="flex flex-col md:flex-row gap-6">
          {renderConfusionMatrix(confusionMatrices.basic)}
          {renderConfusionMatrix(confusionMatrices.smote)}
        </div>
      </div>

      {/* Metrics Table */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <h3 className="text-lg font-semibold mb-4 text-center">Key Metric Comparison</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Original KNN</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">SMOTE KNN</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-2 text-sm text-gray-900">Accuracy</td>
              <td className="px-4 py-2 text-sm text-gray-900 text-right">{(confusionMatrices.basic.metrics.accuracy * 100).toFixed(1)}%</td>
              <td className="px-4 py-2 text-sm text-gray-900 text-right">{(confusionMatrices.smote.metrics.accuracy * 100).toFixed(1)}%</td>
              <td className={`px-4 py-2 text-sm text-right ${getComparisonColor(confusionMatrices.basic.metrics.accuracy, confusionMatrices.smote.metrics.accuracy)}`}>
                {((confusionMatrices.smote.metrics.accuracy - confusionMatrices.basic.metrics.accuracy) * 100).toFixed(1)}%
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-gray-900 font-medium">Sensitivity (Recall)</td>
              <td className="px-4 py-2 text-sm text-gray-900 text-right">{(confusionMatrices.basic.metrics.sensitivity * 100).toFixed(1)}%</td>
              <td className="px-4 py-2 text-sm text-gray-900 text-right">{(confusionMatrices.smote.metrics.sensitivity * 100).toFixed(1)}%</td>
              <td className={`px-4 py-2 text-sm text-right ${getComparisonColor(confusionMatrices.basic.metrics.sensitivity, confusionMatrices.smote.metrics.sensitivity)}`}>
                +{((confusionMatrices.smote.metrics.sensitivity - confusionMatrices.basic.metrics.sensitivity) * 100).toFixed(1)}%
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-gray-900">Specificity</td>
              <td className="px-4 py-2 text-sm text-gray-900 text-right">{(confusionMatrices.basic.metrics.specificity * 100).toFixed(1)}%</td>
              <td className="px-4 py-2 text-sm text-gray-900 text-right">{(confusionMatrices.smote.metrics.specificity * 100).toFixed(1)}%</td>
              <td className={`px-4 py-2 text-sm text-right ${getComparisonColor(confusionMatrices.basic.metrics.specificity, confusionMatrices.smote.metrics.specificity)}`}>
                {((confusionMatrices.smote.metrics.specificity - confusionMatrices.basic.metrics.specificity) * 100).toFixed(1)}%
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-gray-900">Precision</td>
              <td className="px-4 py-2 text-sm text-gray-900 text-right">{(confusionMatrices.basic.metrics.precision * 100).toFixed(1)}%</td>
              <td className="px-4 py-2 text-sm text-gray-900 text-right">{(confusionMatrices.smote.metrics.precision * 100).toFixed(1)}%</td>
              <td className={`px-4 py-2 text-sm text-right ${getComparisonColor(confusionMatrices.basic.metrics.precision, confusionMatrices.smote.metrics.precision)}`}>
                {((confusionMatrices.smote.metrics.precision - confusionMatrices.basic.metrics.precision) * 100).toFixed(1)}%
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-gray-900">F1 Score</td>
              <td className="px-4 py-2 text-sm text-gray-900 text-right">{(confusionMatrices.basic.metrics.f1 * 100).toFixed(1)}%</td>
              <td className="px-4 py-2 text-sm text-gray-900 text-right">{(confusionMatrices.smote.metrics.f1 * 100).toFixed(1)}%</td>
              <td className={`px-4 py-2 text-sm text-right ${getComparisonColor(confusionMatrices.basic.metrics.f1, confusionMatrices.smote.metrics.f1)}`}>
                +{((confusionMatrices.smote.metrics.f1 - confusionMatrices.basic.metrics.f1) * 100).toFixed(1)}%
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-gray-900">Balanced Accuracy</td>
              <td className="px-4 py-2 text-sm text-gray-900 text-right">{(confusionMatrices.basic.metrics.balancedAccuracy * 100).toFixed(1)}%</td>
              <td className="px-4 py-2 text-sm text-gray-900 text-right">{(confusionMatrices.smote.metrics.balancedAccuracy * 100).toFixed(1)}%</td>
              <td className={`px-4 py-2 text-sm text-right ${getComparisonColor(confusionMatrices.basic.metrics.balancedAccuracy, confusionMatrices.smote.metrics.balancedAccuracy)}`}>
                {((confusionMatrices.smote.metrics.balancedAccuracy - confusionMatrices.basic.metrics.balancedAccuracy) * 100).toFixed(1)}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Visualization Placeholder */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h4 className="font-medium mb-2 text-center">SMOTE Effect Visualization</h4>
        <div className="flex justify-center">
          <img
            src="smote_comparison.png"
            alt="SMOTE Comparison"
            className="max-w-md h-auto rounded border border-gray-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/600x300?text=SMOTE+Comparison+Image';
              e.target.alt = 'SMOTE Comparison Placeholder';
            }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Visualization of data distribution before and after applying SMOTE. The right plot shows synthetic minority class samples (red dots) generated by SMOTE to balance the dataset.
        </p>
      </div>

      {/* Conclusions */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-2">Key Takeaways</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
          <li>
            <strong>Class Imbalance is Critical:</strong> The original model achieved high accuracy (83.4%) by mostly ignoring the minority class (mortality), resulting in very low sensitivity (3.6%).
          </li>
          <li>
            <strong>SMOTE Boosts Sensitivity:</strong> Applying SMOTE significantly increased the model's ability to detect the minority class (sensitivity jumped to 21.4%), although overall accuracy decreased (67.9%).
          </li>
          <li>
            <strong>Trade-offs in Medical AI:</strong> In clinical settings, improving sensitivity (correctly identifying at-risk patients) is often more important than maximizing overall accuracy. SMOTE helps achieve this, despite increasing false positives.
          </li>
          <li>
            <strong>Conclusion:</strong> For predicting mortality, the SMOTE-enhanced model is preferable because it identifies significantly more true positive cases, which is crucial for timely intervention, even at the cost of lower overall accuracy and specificity.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ModelComparisonVisualizer;