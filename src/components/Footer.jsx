import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Project Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <i className="fas fa-brain text-blue-400"></i>
              MIMIC-III Analysis Dashboard
            </h3>
            <p className="text-gray-300 leading-relaxed">
              An interactive educational platform for healthcare data analysis using the MIMIC-III dataset. 
              Built as a portfolio project for the Google/Reichman AI & Deep Learning course.
            </p>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <i className="fas fa-code text-green-400"></i>
              Technologies Used
            </h3>
            <div className="grid grid-cols-2 gap-2 text-gray-300">
              <div className="flex items-center gap-2">
                <i className="fab fa-react text-cyan-400"></i>
                <span>React 18</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-wind text-blue-400"></i>
                <span>Tailwind CSS</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-chart-bar text-orange-400"></i>
                <span>D3.js</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-bolt text-yellow-400"></i>
                <span>Vite</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-robot text-purple-400"></i>
                <span>Machine Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-heartbeat text-red-400"></i>
                <span>Healthcare AI</span>
              </div>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <i className="fas fa-link text-purple-400"></i>
              Connect
            </h3>
            <div className="space-y-3">
              <a 
                href="https://github.com/ArielSoothy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
              >
                <i className="fab fa-github text-xl"></i>
                <span>GitHub: ArielSoothy</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/ariel-soothy/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
              >
                <i className="fab fa-linkedin text-xl text-blue-400"></i>
                <span>LinkedIn: Ariel Soothy</span>
              </a>
              <div className="flex items-center gap-3 text-gray-300">
                <i className="fas fa-building text-xl text-green-400"></i>
                <span>AI & Data Engineer at Nuvei</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <i className="fas fa-map-marker-alt text-xl text-red-400"></i>
                <span>Tel Aviv, Israel</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                © 2025 Ariel Soothy. All rights reserved.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Built with ❤️ for the Google/Reichman AI & Deep Learning Course
              </p>
            </div>
            <div className="flex gap-4">
              <a 
                href="https://github.com/ArielSoothy/AI-Deep-Learning-Course-MIMIC-III-Dataset-Analysis"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <i className="fas fa-code-branch"></i>
                View Source
              </a>
              <a 
                href="https://ariels-simplex.github.io/AI-Deep-Learning-Essentials"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <i className="fas fa-external-link-alt"></i>
                Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;