import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, BarElement, PointElement, LineElement, RadialLinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line, Radar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, PointElement, LineElement, RadialLinearScale, Title, Tooltip, Legend);

function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Analytics</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow h-72">
          <h3 className="font-medium mb-2">Document Types Distribution</h3>
          <Bar
            data={{
              labels: ['PDFs','Documents','Images','Spreadsheets','Presentations','Archives'],
              datasets:[{
                label:'Count',
                data:[436,312,187,156,98,59],
                backgroundColor:[
                  'rgba(239, 68, 68, 0.7)',
                  'rgba(59, 130, 246, 0.7)',
                  'rgba(139, 92, 246, 0.7)',
                  'rgba(16, 185, 129, 0.7)',
                  'rgba(245, 158, 11, 0.7)',
                  'rgba(249,115,22,0.7)'
                ]
              }]
            }}
          />
        </div>

        <div className="bg-white p-4 rounded shadow h-72">
          <h3 className="font-medium mb-2">User Activity</h3>
          <Radar
            data={{
              labels:['Uploads','Downloads','Shares','Views','Comments','Edits'],
              datasets:[
                {label:'John',data:[85,90,75,80,65,70],borderColor:'rgba(59,130,246,1)',backgroundColor:'rgba(59,130,246,0.2)'},
                {label:'Jane',data:[70,85,90,75,80,65],borderColor:'rgba(139,92,246,1)',backgroundColor:'rgba(139,92,246,0.2)'},
                {label:'Robert',data:[65,75,80,70,60,85],borderColor:'rgba(16,185,129,1)',backgroundColor:'rgba(16,185,129,0.2)'},
              ]
            }}
          />
        </div>

        <div className="bg-white p-4 rounded shadow h-72 md:col-span-2">
          <h3 className="font-medium mb-2">Storage Usage</h3>
          <Line
            data={{
              labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
              datasets:[{
                label:'Storage Used (GB)',
                data:[12,14,16,15,18,20,19,21,23,24,25,26],
                borderColor:'rgba(59,130,246,1)',
                backgroundColor:'rgba(59,130,246,0.1)',
                tension:0.4,
                fill:true
              }]
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
