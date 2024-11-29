import React, { useState, useRef } from 'react';
import { 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';


import testCase1 from './startup-test-case-1.json';
import testCase2 from './startup-test-case-2.json';
import testCase3 from './startup-test-case-3.json';

/*const ColorBlindPalettes = {
  default: {
    primary: '#3182CE',     // Blue
    secondary: '#48BB78',   // Green
    accent1: '#ED64A6',     // Pink
    accent2: '#ED8936',     // Orange
    neutral: '#718096'      // Gray
  },
  deuteranopia: {
    primary: '#0077BB',     // Blue
    secondary: '#EE7733',   // Orange
    accent1: '#009988',     // Teal
    accent2: '#CC3311',     // Red
    neutral: '#718096'      // Gray
  },
  protanopia: {
    primary: '#0044AA',     // Blue
    secondary: '#EE7711',   // Orange
    accent1: '#00BB88',     // Teal
    accent2: '#CC3311',     // Red
    neutral: '#718096'      // Gray
  }
};*/
const StartupInvestmentTracker = () => {
  const [formData, setFormData] = useState({
    startupName: '',
    founder: '',
    sector: '',
    foundedYear: '',
    initialInvestment: '',
    requiredFunding: '',
    operationalRisk: '',
    competitionRisk: '',
    regulatoryRisk: '',
    technologicalRisk: '',
    marketRisk: '',
    businessModel: '',
    targetMarket: '',
    additionalDetails: ''
  });

  const [projectedRevenue, setProjectedRevenue] = useState([]);
  const [riskScore, setRiskScore] = useState(null);
  const [generatedReport, setGeneratedReport] = useState(null);
  const reportRef = useRef(null);

  const testCases = [
    testCase1,
    testCase2,
    testCase3
  ];

  const loadTestCase = (testCase) => {
    setFormData(testCase);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateRiskScore = () => {
    const riskFactors = {
      operationalRisk: parseFloat(formData.operationalRisk) || 0,
      competitionRisk: parseFloat(formData.competitionRisk) || 0,
      regulatoryRisk: parseFloat(formData.regulatoryRisk) || 0,
      technologicalRisk: parseFloat(formData.technologicalRisk) || 0,
      marketRisk: parseFloat(formData.marketRisk) || 0
    };

    // Risk Score Calculation Formula: 
    // Total Risk Score = (Sum of Individual Risk Scores) / Number of Risk Factors
    const totalRiskScore = Object.values(riskFactors).reduce((a, b) => a + b, 0) / 5;

    const riskClassification = totalRiskScore <= 3 ? 'Low Risk' :
                               totalRiskScore <= 6 ? 'Moderate Risk' : 
                               'High Risk';

    return {
      score: totalRiskScore.toFixed(2),
      classification: riskClassification,
      individualRisks: riskFactors
    };
  };

  const generateRevenueProjection = () => {
    const initialInvestment = parseFloat(formData.initialInvestment) || 0;
    const requiredFunding = parseFloat(formData.requiredFunding) || 0;
    
    // Revenue Projection Formula:
    // Projected Amount = Initial Investment * (1 + Growth Rate)^(Year Number)
    const growthRates = [0.1, 0.15, 0.2, 0.25, 0.3]; // Varying growth rates

    const projections = growthRates.map((growthRate, i) => ({
      year: new Date().getFullYear() + i,
      amount: Math.round(initialInvestment * Math.pow(1 + growthRate, i + 1)),
      funding: Math.round(requiredFunding * Math.pow(1 + growthRate, i + 1)),
      growthRate: (growthRate * 100).toFixed(0) + '%'
    }));

    return projections;
  };

  const generateMarketPotentialProjection = () => {
    const initialMarketSize = parseFloat(formData.initialInvestment) * 10;
    return [
      { year: new Date().getFullYear(), marketSize: initialMarketSize },
      { year: new Date().getFullYear() + 1, marketSize: initialMarketSize * 1.5 },
      { year: new Date().getFullYear() + 2, marketSize: initialMarketSize * 2.2 },
      { year: new Date().getFullYear() + 3, marketSize: initialMarketSize * 3 },
      { year: new Date().getFullYear() + 4, marketSize: initialMarketSize * 4.5 }
    ];
  };
  const generateReport = () => {
    const riskAnalysis = calculateRiskScore();
    const revenueProjections = generateRevenueProjection();
    
    const report = {
      startupDetails: formData,
      projectedRevenue: revenueProjections,
      riskScore: riskAnalysis,
      
    };

    setProjectedRevenue(revenueProjections);
    setRiskScore(riskAnalysis);
    //setMarketPotentialProjections(marketPotentialProjectionData);
    setGeneratedReport(report);
  };

  const handleDownloadPDF = async () => {
    if (!generatedReport || !reportRef.current) return;
  
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
  
    
    const captureChartAsImage = async (selector) => {
      const chartElement = reportRef.current.querySelector(selector);
      if (!chartElement) return null;
  
      
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      const canvas = await html2canvas(chartElement, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#FFFFFF',
        logging: false,
        allowTaint: true,
        scrollX: 0,
        scrollY: -window.scrollY
      });
  
      return canvas.toDataURL('image/png');
    };
  
    
    const addHeader = (doc, title) => {
      doc.setFont('times', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(44, 62, 80);
      doc.text(title, pageWidth / 2, 15, { align: 'center' });
      
      
      doc.setLineWidth(0.5);
      doc.setDrawColor(200);
      doc.line(20, 20, pageWidth - 20, 20);
    };
  
   
    const addChartToPDF = (doc, chartImage, title) => {
      if (!chartImage) return;
  
      doc.addPage();
      
      
      addHeader(doc, title);
      
      
      const imgProps = doc.getImageProperties(chartImage);
      const availableWidth = pageWidth - 40;
      const availableHeight = pageHeight - 50;
      const imgRatio = imgProps.width / imgProps.height;
      const pageRatio = availableWidth / availableHeight;
      
      let imgWidth, imgHeight;
      if (imgRatio > pageRatio) {
        
        imgWidth = availableWidth;
        imgHeight = imgWidth / imgRatio;
      } else {
        
        imgHeight = availableHeight;
        imgWidth = imgHeight * imgRatio;
      }
      
      // Center the image
      const xPos = (pageWidth - imgWidth) / 2;
      const yPos = (pageHeight - imgHeight) / 2;
      
      doc.addImage(
        chartImage, 
        'PNG', 
        xPos, 
        yPos, 
        imgWidth, 
        imgHeight
      );
    };
  
    
    const [
      riskChartImage, 
      revenueChartImage, 
      marketChartImage,
      profitabilityChartImage
    ] = await Promise.all([
      captureChartAsImage('[data-testid="risk-pie-chart"]'),
      captureChartAsImage('[data-testid="revenue-line-chart"]'),
      captureChartAsImage('[data-testid="market-bar-chart"]'),
      captureChartAsImage('[data-testid="profitability-bar-chart"]')
    ]);
  
    // 1. Cover Page
    doc.setFont('times', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(0);
    doc.text('Startup Investment Report', pageWidth / 2, pageHeight / 2 - 30, { align: 'center' });
    
    doc.setFontSize(18);
    doc.text(`Startup: ${formData.startupName}`, pageWidth / 2, pageHeight / 2 + 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight / 2 + 50, { align: 'center' });
  
    // 2. Startup Details Page
    doc.addPage();
    addHeader(doc, 'Startup Overview');
    
    doc.autoTable({
      startY: 30,
      head: [['Attribute', 'Details']],
      body: [
        ['Startup Name', formData.startupName],
        ['Founder', formData.founder],
        ['Sector', formData.sector],
        ['Founded Year', formData.foundedYear],
        ['Initial Investment', `Rs. ${parseFloat(formData.initialInvestment).toLocaleString()}`], 
        ['Required Funding', `Rs. ${parseFloat(formData.requiredFunding).toLocaleString()}`], 
        ['Business Model', formData.businessModel],
        ['Target Market', formData.targetMarket]
      ],
      theme: 'striped',
      styles: { 
        fontSize: 12,        
        cellPadding: 6,       
        font: 'times',    
        halign: 'center' },     
      headStyles: {
        fillColor: [52 , 152, 219],  
        textColor: 255,            
        fontStyle: 'bold',         
        halign: 'center'           
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]  
      },
      columnStyles: {
        0: { halign: 'left' },    
        1: { halign: 'left' }     
      },
      margin: { top: 30, bottom: 30 },  
    });
    
  
    // 3. Risk Assessment Page
    doc.addPage();
    addHeader(doc, 'Risk Assessment');
  
    doc.autoTable({
      startY: 30,
      head: [['Risk Category', 'Score', 'Description']],
      body: [
        ['Overall Risk', 
         `${riskScore.score} (${riskScore.classification})`, 
         'Comprehensive risk evaluation across multiple dimensions'
        ],
        ['Operational Risk', 
         `${riskScore.individualRisks.operationalRisk}/10`, 
         'Risks related to internal processes and operations'
        ],
        ['Competition Risk', 
         `${riskScore.individualRisks.competitionRisk}/10`, 
         'Potential challenges from market competitors'
        ],
        ['Regulatory Risk', 
         `${riskScore.individualRisks.regulatoryRisk}/10`, 
         'Risks associated with legal and regulatory compliance'
        ],
        ['Technological Risk', 
         `${riskScore.individualRisks.technologicalRisk}/10`, 
         'Risks related to technological changes and obsolescence'
        ],
        ['Market Risk', 
         `${riskScore.individualRisks.marketRisk}/10`, 
         'Potential market volatility and market-specific challenges'
        ]
      ],
      theme: 'striped',
      styles: { 
        fontSize: 12,        
        cellPadding: 6,       
        font: 'times',    
        halign: 'center'},      
      headStyles: {
        fillColor: [52 , 152, 219],  
        textColor: 255,            
        fontStyle: 'bold',         
        halign: 'center'           
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]  
      },
      columnStyles: {
        0: { halign: 'left' },    
        1: { halign: 'left' }     
      },
      margin: { top: 30, bottom: 30 },
    });
    if (riskChartImage) addChartToPDF(doc, riskChartImage, 'Risk Distribution');
    
    // 4. Revenue Projection Page
    doc.addPage();
    addHeader(doc, 'Revenue Projection');
  
    doc.autoTable({
      startY: 30,
      head: [['Year', 'Revenue', 'Funding', 'Growth Rate']],
      body: projectedRevenue.map(projection => [
        projection.year.toString(),
        `Rs. ${projection.amount.toLocaleString()}`,
        `Rs. ${projection.funding.toLocaleString()}`,
        projection.growthRate
      ]),
      theme: 'striped',
      styles: { 
        fontSize: 12,        
        cellPadding: 6,       
        font: 'times',    
        halign: 'center'},      
      headStyles: {
        fillColor: [52 , 152, 219],  
        textColor: 255,            
        fontStyle: 'bold',         
        halign: 'center'           
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]  
      },
      columnStyles: {
        0: { halign: 'left' },    
        1: { halign: 'left' }     
      },
      margin: { top: 30, bottom: 30 },
    });
  
    if (revenueChartImage) addChartToPDF(doc, revenueChartImage, 'Revenue Projection');
    
    // 5. Market Potential Page
    doc.addPage();
    addHeader(doc, 'Market Potential Projection');
  
    doc.autoTable({
      startY: 30,
      head: [['Year', 'Market Size']],
      body: marketProjections.map(projection => [
        projection.year.toString(),
        `Rs. ${projection.marketSize.toLocaleString()}`
      ]),
      theme: 'striped',
      styles: { 
        fontSize: 12,        
        cellPadding: 6,       
        font: 'times',    
        halign: 'center'},      
      headStyles: {
        fillColor: [52 , 152, 219],  
        textColor: 255,            
        fontStyle: 'bold',         
        halign: 'center'           
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]  
      },
      columnStyles: {
        0: { halign: 'left' },    
        1: { halign: 'left' }     
      },
      margin: { top: 30, bottom: 30 },
    });
    if (marketChartImage) addChartToPDF(doc, marketChartImage, 'Market Potential');
    

    // 6. Additional Notes 
    if (profitabilityChartImage) addChartToPDF(doc, profitabilityChartImage, 'Profitability Projection');
  
    if (formData.additionalDetails) {
      doc.addPage();
      addHeader(doc, 'Additional Notes');
      
      doc.setFontSize(10);
      doc.text(formData.additionalDetails, 20, 40, { 
        maxWidth: pageWidth - 40,
        lineHeightFactor: 1.5
      });
    }
  
    doc.save(`${formData.startupName}_investment_report.pdf`);
};
 /* const PALE_COLORS = {
    paleBlue: '#B0E0E6',
    paleGreen: '#98FB98',
    paleRed: '#FFB6C1',
    paleYellow: '#FFFFE0',
    palePurple: '#D8BFD8'
  };*/
  const COLORS = {
    darkBlue: '#4682B4',
    darkGreen: '#2E8B57',
    darkRed: '#CD5C5C',
    darkYellow: '#FFD700',
    darkPurple: '#6A5ACD'
};


  const marketProjections = generateMarketPotentialProjection();
   
  const profitabilityData = generatedReport ? [
    { year: new Date().getFullYear(), profitMargin: 10 },
    { year: new Date().getFullYear() + 1, profitMargin: 15 },
    { year: new Date().getFullYear() + 2, profitMargin: 22 },
    { year: new Date().getFullYear() + 3, profitMargin: 30 },
    { year: new Date().getFullYear() + 4, profitMargin: 40 }
  ] : [];

  
  const riskPieData = generatedReport ? [
    { name: 'Operational', value: parseFloat(formData.operationalRisk) },
    { name: 'Competition', value: parseFloat(formData.competitionRisk) },
    { name: 'Regulatory', value: parseFloat(formData.regulatoryRisk) },
    { name: 'Technological', value: parseFloat(formData.technologicalRisk) },
    { name: 'Market', value: parseFloat(formData.marketRisk) }
  ] : [];

  

  return (
    <div className="container mx-auto p-6 bg-white">
      <div ref={reportRef} className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Report Analysis</h2>

      
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Load Test Case</h3>
          <div className="flex space-x-2">
            {testCases.map((testCase, index) => (
              <button 
                key={index}
                onClick={() => loadTestCase(testCase)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                {testCase.startupName}
              </button>
            ))}
          </div>
        </div>

        
        <div className="grid md:grid-cols-2 gap-4">
          <input 
            type="text" 
            name="startupName" 
            placeholder="Startup Name" 
            value={formData.startupName}
            onChange={handleInputChange}
            className="input mb-2"
          />
          <input 
            type="text" 
            name="founder" 
            placeholder="Founder Name" 
            value={formData.founder}
            onChange={handleInputChange}
            className="input mb-2"
          />
          <input 
            type="text" 
            name="sector" 
            placeholder="Sector" 
            value={formData.sector}
            onChange={handleInputChange}
            className="input mb-2"
          />
          <input 
            type="text" 
            name="foundedYear" 
            placeholder="Founded Year" 
            value={formData.foundedYear}
            onChange={handleInputChange}
            className="input mb-2"
          />
          <input 
            type="number" 
            name="initialInvestment" 
            placeholder="Initial Investment (Rs.)" 
            value={formData.initialInvestment}
            onChange={handleInputChange}
            className="input mb-2"
          />
          <input 
            type="number" 
            name="requiredFunding" 
            placeholder="Required Funding (Rs. )" 
            value={formData.requiredFunding}
            onChange={handleInputChange}
            className="input mb-2"
          />
          <input 
            type="number" 
            name="operationalRisk" 
            placeholder="Operational Risk (0-10)" 
            value={formData.operationalRisk}
            onChange={handleInputChange}
            className="input mb-2"
            max="10"
            min="0"
          />
          <input 
            type="number" 
            name="competitionRisk" 
            placeholder="Competition Risk (0-10)" 
            value={formData.competitionRisk}
            onChange={handleInputChange}
            className="input mb-2"
            max="10"
            min="0"
          />
          <input 
            type="number" 
            name="regulatoryRisk" 
            placeholder="Regulatory Risk (0-10)" 
            value={formData.regulatoryRisk}
            onChange={handleInputChange}
            className="input mb-2"
            max="10"
            min="0"
          />
          <input 
            type="number" 
            name="technologicalRisk" 
            placeholder="Technological Risk (0-10)" 
            value={formData.technologicalRisk}
            onChange={handleInputChange}
            className="input mb-2"
            max="10"
            min="0"
          />
          <input 
            type="number" 
            name="marketRisk" 
            placeholder="Market Risk (0-10)" 
            value={formData.marketRisk}
            onChange={handleInputChange}
            className="input mb-2"
            max="10"
            min="0"
          />
          <input 
            type="text" 
            name="businessModel" 
            placeholder="Business Model" 
            value={formData.businessModel}
            onChange={handleInputChange}
            className="input mb-2"
          />
          <input 
            type="text" 
            name="targetMarket" 
            placeholder="Target Market" 
            value={formData.targetMarket}
            onChange={handleInputChange}
            className="input mb-2"
          />
          <textarea 
            name="additionalDetails" 
            placeholder="Additional Details" 
            value={formData.additionalDetails}
            onChange={handleInputChange}
            className="input mb-2 col-span-2"
            rows="3"
          />
        </div>

        
        <button 
          onClick={generateReport}
          className="w-full bg-gray-500 text-white py-3 rounded mt-6 hover:bg-gray-600"
        >
          Generate Comprehensive Report
        </button>

        
        {generatedReport && (
          <button 
            onClick={handleDownloadPDF}
            className="w-full bg-green-500 text-white py-3 rounded mt-4 hover:bg-green-600"
          >
            Download Report as PDF
          </button>
        )}

        
        {generatedReport && (
          <div className="space-y-8">
            {/* Revenue Projection Chart  */}
            <div  data-testid="revenue-line-chart"
            className="w-full h-[600px] border p-4 rounded" style={{backgroundColor: 'white'}}>
              <h3 className="text-2xl font-bold mb-4">Revenue Projection</h3>
              <ResponsiveContainer width="95%" height="85%">
                <LineChart data={projectedRevenue} 
                margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottomRight', offset: -10 }} />
                  <YAxis label={{ 
      value: 'Amount (Rs. in Lakhs)', 
      angle: -90, 
      position: 'insideLeft', 
      offset: -20 
    }} 
    tickFormatter={(value) => `Rs. ${value/100000}`}/>
                  <Tooltip formatter={(value) => [`Rs. ${value.toLocaleString()}`, 'Amount']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    name="Revenue (Rs.)" 
                    stroke="#8884d8" 
                    strokeWidth={3}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="funding" 
                    name="Funding" 
                    stroke="#82ca9d" 
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Risk Distribution Chart */}
            <div data-testid="risk-pie-chart"
            className="w-full h-[600px] border p-4 rounded" style={{backgroundColor: 'white'}}>
              <h3 className="text-2xl font-bold mb-4">Risk Distribution</h3>
              <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                  <Pie
                    data={riskPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={200}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {riskPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={Object.values(COLORS)[index % Object.keys(COLORS).length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Market Potential Chart (Full Page) */}
            <div data-testid="market-bar-chart"
            className="w-full h-[600px] border p-4 rounded" style={{ backgroundColor: 'white' }}>
  <h3 className="text-2xl font-bold mb-4">Market Potential Projection</h3>
  <ResponsiveContainer width="95%" height="85%">
    <BarChart
      data={marketProjections}
      margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year"  label={{ value: 'Year', position: 'insideBottomRight', offset: -10 }} />
      <YAxis label={{ 
      value: 'Market Size (Rs. in Lakhs)', 
      angle: -90, 
      position: 'insideLeft', 
      offset: -20 
    }} 
    tickFormatter={(value) => `Rs. ${value/100000}`} 
      />
      <Tooltip formatter={(value) => [`Rs. ${value.toLocaleString()}`, 'Market Size']} />
      <Bar dataKey="marketSize" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
</div>

{/* Profitability Projection Chart */}

            <div data-testid="profitability-bar-chart"
            className="w-full h-[600px] border p-4 rounded" style={{backgroundColor: '#FFFFFF'}}>
            <h3 className="text-2xl font-bold mb-4">Profitability Projection</h3>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={profitabilityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottomRight', offset: -10 }}/>
                <YAxis label={{ 
      value: 'Profit Margin (%)', 
      angle: -90, 
      position: 'insideLeft', 
      offset: -20 
    }} />
                <Tooltip formatter={(value) => [`${value}%`, 'Profit Margin']} />
                <Bar dataKey="profitMargin" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
            
            {/* Risk Score Details */}
            <div className="w-full border p-6 rounded" style={{backgroundColor: 'white'}}>
              <h3 className="text-2xl font-bold mb-4">Comprehensive Risk Assessment</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Overall Risk Score</h4>
                  <div className="bg-white p-4 rounded">
                    <p>Score: {riskScore.score}</p>
                    <p>Classification: {riskScore.classification}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Individual Risk Breakdown</h4>
                  {Object.entries(riskScore.individualRisks).map(([key, value]) => (
                    <div key={key} className="mb-2">
                      <div className="flex justify-between">
                        <span className="capitalize">{key.replace('Risk', '')}</span>
                        <span>{value}/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div 
                          className="bg-green-500 h-2.5 rounded-full" 
                          style={{
                            backgroundColor: COLORS.darkRed,
                            width: `${(value / 10) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartupInvestmentTracker;