import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface RoleSpecificTasksProps {
  role: string;
  onRunTask: (taskId: string) => void;
  isProcessing?: boolean;
  completedTasks?: string[];
}

export const RoleSpecificTasks: React.FC<RoleSpecificTasksProps> = ({
  role,
  onRunTask,
  isProcessing,
  completedTasks = []
}) => {
  const [activeTask, setActiveTask] = useState<string | null>(null);

  const roleTasksMap: Record<string, any[]> = {
    'business-analyst': [
      { id: 'kpi-dashboard', name: 'KPI Dashboard', description: 'Generate key performance indicators', icon: '📊' },
      { id: 'customer-segmentation', name: 'Customer Segmentation', description: 'KMeans clustering analysis', icon: '👥' },
      { id: 'sales-trend', name: 'Sales Trend Analysis', description: 'Time series trend analysis', icon: '📈' },
      { id: 'anomaly-detection', name: 'Anomaly Detection', description: 'Identify unusual patterns', icon: '🚨' }
    ],
    'research-eda': [
      { id: 'correlation-matrix', name: 'Correlation Matrix', description: 'Variable correlation analysis', icon: '🔗' },
      { id: 'summary-stats', name: 'Summary Statistics', description: 'Descriptive statistics overview', icon: '📋' },
      { id: 'outlier-detection', name: 'Outlier Detection', description: 'Identify data outliers', icon: '🎯' },
      { id: 'hypothesis-testing', name: 'Hypothesis Testing', description: 'Statistical significance tests', icon: '🧪' }
    ],
    'marketing': [
      { id: 'roi-analysis', name: 'ROI Analysis', description: 'Return on investment metrics', icon: '💰' },
      { id: 'rfm-analysis', name: 'RFM Analysis', description: 'Recency, Frequency, Monetary analysis', icon: '🎯' },
      { id: 'engagement-funnel', name: 'Engagement Funnel', description: 'Customer journey analysis', icon: '🔄' },
      { id: 'persona-clusters', name: 'Persona Clusters', description: 'Customer persona identification', icon: '👤' }
    ],
    'finance': [
      { id: 'forecasting', name: 'Financial Forecasting', description: 'Prophet-based predictions', icon: '🔮' },
      { id: 'risk-heatmap', name: 'Risk Heatmap', description: 'Risk assessment visualization', icon: '🌡️' },
      { id: 'roi-irr-npv', name: 'ROI/IRR/NPV', description: 'Investment analysis metrics', icon: '📊' },
      { id: 'volatility-analysis', name: 'Volatility Analysis', description: 'Market volatility assessment', icon: '📉' }
    ],
    'predictive-modeling': [
      { id: 'automl', name: 'AutoML Pipeline', description: 'Automated machine learning', icon: '🤖' },
      { id: 'model-evaluation', name: 'Model Evaluation', description: 'ROC, Confusion Matrix, AUC', icon: '📏' },
      { id: 'feature-importance', name: 'Feature Importance', description: 'Variable importance analysis', icon: '⭐' },
      { id: 'drift-monitoring', name: 'Drift Monitoring', description: 'Model performance monitoring', icon: '📡' }
    ],
    'healthcare': [
      { id: 'cohort-survival', name: 'Cohort Survival', description: 'Survival analysis', icon: '❤️' },
      { id: 'prevalence-graph', name: 'Prevalence Analysis', description: 'Disease prevalence trends', icon: '📊' },
      { id: 'patient-clustering', name: 'Patient Clustering', description: 'Patient group analysis', icon: '👥' },
      { id: 'hospital-stats', name: 'Hospital Statistics', description: 'Healthcare facility metrics', icon: '🏥' }
    ],
    'ecommerce': [
      { id: 'market-basket', name: 'Market Basket Analysis', description: 'Product association rules', icon: '🛒' },
      { id: 'sales-trends', name: 'Sales Trends', description: 'E-commerce trend analysis', icon: '📈' },
      { id: 'order-funnel', name: 'Order Funnel', description: 'Purchase funnel analysis', icon: '🔄' },
      { id: 'inventory-forecast', name: 'Inventory Forecast', description: 'Stock prediction model', icon: '📦' }
    ],
    'general': [
      { id: 'auto-eda', name: 'Auto EDA', description: 'Automated exploratory analysis', icon: '🔍' },
      { id: 'correlation-analysis', name: 'Correlation Analysis', description: 'Variable relationships', icon: '🔗' },
      { id: 'gpt-insights', name: 'GPT Insights', description: 'AI-powered data insights', icon: '🧠' },
      { id: 'auto-queries', name: 'Auto SQL Queries', description: 'Automated query generation', icon: '💾' }
    ]
  };

  const tasks = roleTasksMap[role] || roleTasksMap['general'];

  const handleRunTask = (taskId: string) => {
    setActiveTask(taskId);
    onRunTask(taskId);
  };

  const getTaskStatus = (taskId: string) => {
    if (completedTasks.includes(taskId)) return 'completed';
    if (activeTask === taskId && isProcessing) return 'running';
    return 'pending';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'running': return <Clock className="w-5 h-5 text-blue-400 animate-spin" />;
      default: return <Play className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'border-green-400 bg-green-500/10';
      case 'running': return 'border-blue-400 bg-blue-500/10 glow-blue';
      default: return 'border-white/20 hover:border-white/30';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Role-Specific Analysis Tasks</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => {
            const status = getTaskStatus(task.id);
            
            return (
              <motion.div
                key={task.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${getStatusColor(status)}`}
                onClick={() => status === 'pending' && handleRunTask(task.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{task.icon}</div>
                    <div>
                      <h4 className="font-medium text-white">{task.name}</h4>
                      <p className="text-sm text-gray-400">{task.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(status)}
                    {status === 'pending' && (
                      <Button variant="outline" size="sm">
                        Run
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};