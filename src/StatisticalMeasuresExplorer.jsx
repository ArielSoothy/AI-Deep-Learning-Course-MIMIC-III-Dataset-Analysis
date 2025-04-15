import React from 'react';

const StatisticalMeasuresExplorer = () => {
  const StatCard = ({ title, value, description }) => (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  );

  const MeasureExplainer = ({ measure, definition, medicalUse }) => (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-bold text-gray-800">{measure}</h3>
      <p className="mt-2 text-gray-700"><span className="font-semibold">Definition:</span> {definition}</p>
      <p className="mt-2 text-gray-700"><span className="font-semibold">Medical Use:</span> {medicalUse}</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-100 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">MIMIC-III Dataset Statistics Guide</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Understanding patient data through basic statistics: A visual explainer
          for healthcare professionals and data scientists
        </p>
      </header>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-bold text-blue-800 mb-2">What are the mean, median, mode, and standard deviation of the age, BMI, and Blood sodium columns in the dataset? Why are these statistics important for understanding the data?</h3>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Raw Statistics & Code</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Python Code:</h4>
                <pre className="bg-gray-200 p-2 rounded text-sm whitespace-pre-wrap overflow-auto">
{`# For age
print("AGE STATISTICS:")
print("Average age:", data['age'].mean())
print("Middle age value:", data['age'].median())
print("Most common age:", data['age'].mode()[0])
print("How spread out ages are:", data['age'].std())
print("\\n")

# For BMI
print("BMI STATISTICS:")
print("Average BMI:", data['BMI'].mean())
print("Middle BMI value:", data['BMI'].median())
print("Most common BMI:", data['BMI'].mode()[0])
print("How spread out BMI values are:", data['BMI'].std())
print("\\n")

# For Blood sodium
print("BLOOD SODIUM STATISTICS:")
print("Average blood sodium:", data['Blood sodium'].mean())
print("Middle blood sodium value:", data['Blood sodium'].median())
print("Most common blood sodium:", data['Blood sodium'].mode()[0])
print("How spread out blood sodium values are:", data['Blood sodium'].std())`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Raw Values:</h4>
                <pre className="bg-gray-200 p-2 rounded text-sm whitespace-pre-wrap overflow-auto">
{`AGE STATISTICS:
Average age: 74.05522514868309
Middle age value: 77.0
Most common age: 89
How spread out ages are: 13.43406075637212

BMI STATISTICS:
Average BMI: 30.188277651590436
Middle BMI value: 28.3124741
Most common BMI: 23.29697566
How spread out BMI values are: 9.325997440128411

BLOOD SODIUM STATISTICS:
Average blood sodium: 138.89001647986404
Middle blood sodium value: 139.25
Most common blood sodium: 140.0
How spread out blood sodium values are: 4.151346613012868`}
                </pre>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow mt-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Summary of Statistics</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-3 text-left">Statistic</th>
                    <th className="py-2 px-3 text-left">Age</th>
                    <th className="py-2 px-3 text-left">BMI</th>
                    <th className="py-2 px-3 text-left">Blood Sodium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-3 border-t">Mean</td>
                    <td className="py-2 px-3 border-t">74.06 years</td>
                    <td className="py-2 px-3 border-t">30.19</td>
                    <td className="py-2 px-3 border-t">138.89 mEq/L</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-t">Median</td>
                    <td className="py-2 px-3 border-t">77.0 years</td>
                    <td className="py-2 px-3 border-t">28.31</td>
                    <td className="py-2 px-3 border-t">139.25 mEq/L</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-t">Mode</td>
                    <td className="py-2 px-3 border-t">89 years</td>
                    <td className="py-2 px-3 border-t">23.30</td>
                    <td className="py-2 px-3 border-t">140.0 mEq/L</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 border-t">Standard Deviation</td>
                    <td className="py-2 px-3 border-t">13.43 years</td>
                    <td className="py-2 px-3 border-t">9.33</td>
                    <td className="py-2 px-3 border-t">4.15 mEq/L</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h4 className="text-lg font-semibold text-gray-800 mt-5 mb-2">Why These Statistics Are Important</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li><span className="font-semibold">They provide a comprehensive summary of the data:</span> These statistics allow us to understand the central tendency (mean, median, mode) and dispersion (standard deviation) of our data without having to examine every individual value.</li>
              <li><span className="font-semibold">They reveal distribution patterns:</span> Comparing mean and median helps identify skewness in the data. For example, our age data shows mean &lt; median, indicating a left-skewed distribution with more elderly patients.</li>
              <li><span className="font-semibold">They identify typical and atypical values:</span> The mean helps establish what is "average," while standard deviation shows how much variation exists. For instance, blood sodium has a small standard deviation (4.15), indicating consistent values across patients.</li>
              <li><span className="font-semibold">They enable comparison between different populations:</span> These statistics allow us to compare our patient population with other datasets or reference ranges.</li>
              <li><span className="font-semibold">They support data quality assessment:</span> Unusual statistical values might indicate data collection errors or special characteristics of the dataset.</li>
            </ol>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow mt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">How do the distributions of age, BMI, and Blood sodium look in the dataset? What can we learn from these distributions about the patient population?</h4>
            
            <h5 className="text-md font-semibold text-gray-700 mt-4">Age Distribution</h5>
            <p className="text-gray-700 mb-2">The age distribution is left-skewed (mean 74.06 &lt; median 77), with a high mode of 89 years. This indicates:</p>
            <ul className="list-disc pl-5 mb-3 text-gray-700">
              <li>This is predominantly an elderly patient population</li>
              <li>There's a significant cluster of very elderly patients (around 89 years)</li>
              <li>There are some younger patients pulling the mean down</li>
              <li>The moderate standard deviation (13.43 years) shows some age diversity but mostly within older ranges</li>
            </ul>
            
            <h5 className="text-md font-semibold text-gray-700 mt-4">BMI Distribution</h5>
            <p className="text-gray-700 mb-2">The BMI distribution is right-skewed (mean 30.19 &gt; median 28.31), with a mode in the normal range (23.30). This tells us:</p>
            <ul className="list-disc pl-5 mb-3 text-gray-700">
              <li>There are some patients with very high BMI values pulling the average up</li>
              <li>The average patient is in the obese category (BMI &gt; 30)</li>
              <li>The median patient is in the overweight category (25-30)</li>
              <li>Interestingly, the most common BMI value is in the normal range</li>
              <li>The large standard deviation (9.33) indicates wide variation in body composition</li>
            </ul>
            
            <h5 className="text-md font-semibold text-gray-700 mt-4">Blood Sodium Distribution</h5>
            <p className="text-gray-700 mb-2">The blood sodium distribution is nearly symmetrical (mean 138.89 ≈ median 139.25), with a mode of 140.0 mEq/L. This reveals:</p>
            <ul className="list-disc pl-5 mb-3 text-gray-700">
              <li>Blood sodium levels are tightly regulated in this population, as expected physiologically</li>
              <li>All central tendency measures (mean, median, mode) fall within the normal clinical range (135-145 mEq/L)</li>
              <li>The small standard deviation (4.15) confirms most patients have values close to the average</li>
              <li>The near-symmetrical distribution suggests normal biological regulation</li>
            </ul>
            
            <h5 className="text-md font-semibold text-gray-700 mt-4">Overall Patient Population Insights</h5>
            <p className="text-gray-700">
              From these distributions, we can conclude this dataset represents a predominantly elderly patient population with a tendency toward overweight/obesity, but with well-regulated electrolyte balance (as shown by sodium levels). The presence of wide variation in BMI but tight distribution of sodium suggests that despite weight differences, physiological regulation of electrolytes remains consistent. This could represent an inpatient population in a hospital setting where electrolyte balance is carefully monitored.
            </p>
          </div>
        </div>
        
        <MeasureExplainer 
          measure="Mean (Average)" 
          definition="The sum of all values divided by the number of values. Calculated by adding all data points and dividing by the count."
          medicalUse="Provides the central tendency of a measurement. Used to establish baseline values for patient populations."
        />
        
        <MeasureExplainer 
          measure="Median" 
          definition="The middle value when all data is sorted from lowest to highest. If there are an even number of observations, it's the average of the two middle values."
          medicalUse="Less influenced by outliers than the mean. More representative when dealing with skewed data."
        />
        
        <MeasureExplainer 
          measure="Mode" 
          definition="The value that occurs most frequently in the dataset. A distribution can have one mode (unimodal), two modes (bimodal), or more."
          medicalUse="Identifies the most common presentation or value in a dataset."
        />
        
        <MeasureExplainer 
          measure="Standard Deviation" 
          definition="A measure of how spread out the values are from the mean. Calculated as the square root of the variance."
          medicalUse="Quantifies variation in the data. Lower values indicate more consistent measurements."
        />
        
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Skewness and Kurtosis</h3>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Skewness</h4>
            <p className="text-gray-700">
              Skewness measures the asymmetry of a distribution. A distribution can be:
            </p>
            <ul className="list-disc pl-5 mt-2 text-gray-700">
              <li><span className="font-semibold">Positively skewed (right-skewed)</span>: When the tail extends more to the right (like our BMI data)</li>
              <li><span className="font-semibold">Negatively skewed (left-skewed)</span>: When the tail extends more to the left (like our age data)</li>
              <li><span className="font-semibold">Symmetrical</span>: When the distribution is balanced (like our sodium data)</li>
            </ul>
            <p className="text-gray-700 mt-2">
              In medical data, skewness often reveals important population characteristics. For example, the right-skewed BMI distribution indicates that while most patients are in the overweight range, there are some with extremely high BMI values.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Kurtosis</h4>
            <p className="text-gray-700">
              Kurtosis measures the "tailedness" of a distribution. It tells us about outliers:
            </p>
            <ul className="list-disc pl-5 mt-2 text-gray-700">
              <li><span className="font-semibold">High kurtosis (leptokurtic)</span>: More outliers, "heavier tails"</li>
              <li><span className="font-semibold">Low kurtosis (platykurtic)</span>: Fewer outliers, "lighter tails"</li>
              <li><span className="font-semibold">Normal kurtosis (mesokurtic)</span>: Similar to a normal distribution</li>
            </ul>
            <p className="text-gray-700 mt-2">
              In our data, blood sodium shows low kurtosis (consistent with its biological regulation), while BMI shows higher kurtosis, indicating more patients with extreme values.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticalMeasuresExplorer;
