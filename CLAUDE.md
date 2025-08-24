# 🏥 MIMIC-III Dataset Analysis Dashboard

## 🎯 Project Overview
**Interactive AI & Deep Learning Educational Platform**  
A comprehensive React-based application providing visual explanations and interactive learning modules for healthcare data analysis using the MIMIC-III dataset. Built as a portfolio project for the Google/Reichman AI & Deep Learning course.

## 🚀 Quick Start

### Development Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy

# Code quality check
npm run lint
```

## 📁 Project Architecture

### Directory Structure
```
📦 AI-Deep-Learning-Course-MIMIC-III-Dataset-Analysis/
├── 📂 src/
│   ├── 📂 components/          # Reusable UI components
│   │   ├── 📄 Glossary.jsx     # Medical terminology glossary
│   │   └── 📂 questions/       # Course assignment components
│   ├── 📄 main.jsx             # Application entry point
│   ├── 📄 index.css            # Global styles
│   └── 📊 Visualizers:
│       ├── StatisticalMeasuresExplorer.jsx
│       ├── DistributionVisualizer.jsx
│       ├── ModelComparisonVisualizer.jsx
│       ├── RegressionModelVisualizer.jsx
│       ├── ClusteringVisualizer.jsx
│       ├── BiasVarianceVisualizer.jsx
│       ├── DataPreprocessingVisualizer.jsx
│       ├── ActivationFunctionsVisualizer.jsx
│       └── ProjectFlowVisualizer.jsx
├── 📂 public/                  # Static assets
├── 📂 mimic_results/           # Model training outputs
├── 📂 mimic_ensemble_results/  # Ensemble model outputs
├── 📄 package.json             # Dependencies & scripts
├── 📄 vite.config.js           # Build configuration
└── 📄 tailwind.config.js       # Styling configuration
```

## 🎨 Component Overview

### Core Visualizers

#### 📊 **Statistical Measures Explorer**
- **Purpose**: Interactive exploration of mean, median, mode, and standard deviation
- **Features**: Real-time calculations, visual comparisons, medical context
- **Location**: `src/StatisticalMeasuresExplorer.jsx`

#### 📈 **Distribution Visualizer**
- **Purpose**: Visualize data distributions for Age, BMI, and Blood Sodium
- **Features**: Interactive histograms, skewness analysis, statistical overlays
- **Location**: `src/DistributionVisualizer.jsx`

#### 🤖 **Model Comparison Visualizer**
- **Purpose**: Compare ML model performance (SVM, Random Forest, GBM, Deep Learning)
- **Features**: Confusion matrices, ROC curves, feature importance
- **Location**: `src/ModelComparisonVisualizer.jsx`

#### 🧠 **Neural Networks Components**
- **Q3 Neural Networks**: Step-by-step NN training visualization
- **TF/Keras Visualizer**: Interactive TensorFlow/Keras implementation
- **Activation Functions**: Visual comparison of activation functions
- **Bias-Variance Tradeoff**: Interactive demonstration

#### 🔬 **Data Preprocessing**
- **Purpose**: Demonstrate normalization, feature scaling, data splitting
- **Features**: Before/after comparisons, visual transformations
- **Location**: `src/DataPreprocessingVisualizer.jsx`

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.10
- **Styling**: Tailwind CSS 3.4.0
- **Icons**: Heroicons React 2.2.0
- **Data Viz**: D3.js 7.9.0

### Development
- **Package Manager**: npm
- **Deployment**: GitHub Pages via gh-pages
- **Linting**: ESLint (via Vite)
- **CSS Processing**: PostCSS + Autoprefixer

## 📋 Feature Checklist

### ✅ Implemented Features
- [x] Statistical measures calculator with medical context
- [x] Distribution analysis with skewness detection
- [x] Multiple ML model comparisons
- [x] Neural network training visualization
- [x] Interactive data preprocessing demos
- [x] Responsive design for all screen sizes
- [x] Tab-based navigation system
- [x] Medical glossary integration

### 🔧 Known Issues & TODOs
- [ ] Some hardcoded data needs real MIMIC-III integration
- [ ] Missing error boundaries for component failures
- [ ] Loading states need implementation
- [ ] Dark mode support not yet added
- [ ] Export functionality for charts pending
- [ ] Performance optimization for large datasets needed

## 🚀 Deployment

### GitHub Pages Configuration
1. **Base URL**: Set in `vite.config.js` and `package.json`
2. **Build Output**: `dist/` directory
3. **Deploy Command**: `npm run deploy`
4. **Live URL**: https://ariels-simplex.github.io/AI-Deep-Learning-Essentials

### Environment Variables
```bash
# No sensitive environment variables required
# All API keys should be handled client-side if needed
```

## 📊 Data Structure

### Sample Data Format
```javascript
{
  age: {
    mean: 74.06,
    median: 77.0,
    mode: 89.0,
    stdDev: 13.43,
    unit: 'years'
  },
  bmi: {
    mean: 30.19,
    median: 28.31,
    mode: 23.30,
    stdDev: 9.33,
    unit: 'kg/m²'
  },
  sodium: {
    mean: 138.89,
    median: 139.25,
    mode: 140.0,
    stdDev: 4.15,
    unit: 'mEq/L'
  }
}
```

## 🎯 Learning Objectives

This project demonstrates proficiency in:
1. **Data Visualization**: Creating interactive, educational visualizations
2. **Statistical Analysis**: Implementing and explaining statistical measures
3. **Machine Learning**: Comparing different ML approaches
4. **Deep Learning**: Neural network architecture and training
5. **React Development**: Component-based architecture
6. **Healthcare Data**: Understanding medical data characteristics

## 🐛 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Development Server Issues
```bash
# Check port availability
lsof -i :5173
# Use alternative port
npm run dev -- --port 3000
```

#### Deployment Issues
```bash
# Ensure gh-pages branch exists
git branch -a | grep gh-pages
# Manual deployment if needed
npm run build
npx gh-pages -d dist
```

## 📚 Course Context

**Course**: Google/Reichman AI & Deep Learning  
**Assignment**: MIMIC-III Dataset Analysis  
**Topics Covered**:
- Q1: Statistical Analysis & Machine Learning
- Q2: Clustering Techniques
- Q3: Neural Networks & Deep Learning

## 🔗 Resources

- [MIMIC-III Documentation](https://mimic.mit.edu/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [D3.js Documentation](https://d3js.org/)
- [Course Materials](https://github.com/ArielSoothy)

## 👤 Author

**Ariel Soothy**  
- Data Engineer at Nuvei, Tel Aviv
- AI & Deep Learning Student
- [GitHub](https://github.com/ArielSoothy)
- [LinkedIn](https://www.linkedin.com/in/ariel-soothy/)

## 📄 License

This project is part of an educational course and is intended for learning purposes.

---

*Last Updated: 2025*  
*Built with ❤️ for the Google/Reichman AI & Deep Learning Course*