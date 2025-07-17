import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import { Maximize2, Download, BarChart3, LineChart as LineIcon, PieChart as PieIcon, ScatterChart as Scatter3D } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface ChartVisualizationProps {
  charts: Array<{
    id: string;
    type: string;
    title: string;
    data: any[];
    config?: any;
  }>;
  onFullscreen: (chartId: string) => void;
  onDownload: (chartId: string, format: string) => void;
}

export const ChartVisualization: React.FC<ChartVisualizationProps> = ({
  charts,
  onFullscreen,
  onDownload
}) => {
  const [activeChart, setActiveChart] = useState<string | null>(null);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const renderChart = (chart: any) => {
    switch (chart.type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chart.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chart.data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis dataKey="y" />
              <Tooltip />
              <Scatter fill="#3B82F6" />
            </ScatterChart>
          </ResponsiveContainer>
        );
      
      default:
        return <div className="h-300 flex items-center justify-center text-gray-500">Chart type not supported</div>;
    }
  };

  const getChartIcon = (type: string) => {
    switch (type) {
      case 'bar': return BarChart3;
      case 'line': return LineIcon;
      case 'pie': return PieIcon;
      case 'scatter': return Scatter3D;
      default: return BarChart3;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Analytics Visualizations</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {charts.map((chart) => {
            const Icon = getChartIcon(chart.type);
            
            return (
              <motion.div
                key={chart.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border rounded-lg p-4 bg-white"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium">{chart.title}</h4>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onFullscreen(chart.id)}
                      title="View Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDownload(chart.id, 'png')}
                      title="Download Chart"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {/* Share functionality */}}
                      title="Share Chart"
                    >
                      <span className="w-4 h-4 text-xs">📤</span>
                    </Button>
                  </div>
                </div>
                
                <div className="chart-container">
                  {renderChart(chart)}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};