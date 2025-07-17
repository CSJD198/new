import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '../components/layout/Header';
import { PipelineSteps } from '../components/analysis/PipelineSteps';
import { FileUpload } from '../components/analysis/FileUpload';
import { DataCleaning } from '../components/analysis/DataCleaning';
import { RoleSpecificTasks } from '../components/analysis/RoleSpecificTasks';
import { ChartVisualization } from '../components/analysis/ChartVisualization';
import { AIInsights } from '../components/analysis/AIInsights';
import { DownloadSection } from '../components/analysis/DownloadSection';
import { roles } from '../data/roles';
import { Card } from '../components/ui/Card';
import * as Icons from 'lucide-react';

export const RoleAnalysis: React.FC = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [cleanedData, setCleanedData] = useState<any[]>([]);
  const [charts, setCharts] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const role = roles.find(r => r.id === roleId);

  useEffect(() => {
    if (!role) {
      navigate('/dashboard');
    }
  }, [role, navigate]);

  if (!role) {
    return null;
  }

  const IconComponent = Icons[role.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    try {
      setUploadedFile(file);
      
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock preview data
      const mockData = [
        { name: 'Product A', sales: 1200, revenue: 24000, category: 'Electronics' },
        { name: 'Product B', sales: 800, revenue: 16000, category: 'Clothing' },
        { name: 'Product C', sales: 1500, revenue: 30000, category: 'Electronics' },
        { name: 'Product D', sales: 600, revenue: 12000, category: 'Books' },
        { name: 'Product E', sales: 900, revenue: 18000, category: 'Clothing' }
      ];
      
      setPreview(mockData);
      setColumns(Object.keys(mockData[0]));
      setCurrentStep(2);
      setCompletedSteps([1]);
    } catch (error) {
      console.error('File upload error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePreview = () => {
    setCurrentStep(2);
    if (!completedSteps.includes(2)) {
      setCompletedSteps([...completedSteps, 2]);
    }
  };

  const handleCleaningAction = async (action: string) => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock cleaned data
      setCleanedData(preview.slice(0, 3));
      setCurrentStep(3);
      if (!completedSteps.includes(3)) {
        setCompletedSteps([...completedSteps, 3]);
      }
    } catch (error) {
      console.error('Cleaning error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRunTask = async (taskId: string) => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock chart generation
      const newChart = {
        id: taskId,
        type: 'bar',
        title: `${taskId} Analysis`,
        data: preview.map(item => ({ name: item.name, value: item.sales }))
      };
      
      setCharts([...charts, newChart]);
      setCompletedTasks([...completedTasks, taskId]);
      setCurrentStep(4);
      if (!completedSteps.includes(4)) {
        setCompletedSteps([...completedSteps, 4]);
      }
    } catch (error) {
      console.error('Task error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAskQuestion = async (question: string) => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const response = `Based on your ${role.name.toLowerCase()} data, here are the key insights: The data shows strong performance in electronics category with Product C leading in both sales (1500 units) and revenue ($30,000). There's a clear correlation between sales volume and revenue generation across all product categories.`;
      
      const newInsight = {
        question,
        response,
        timestamp: new Date()
      };
      
      setInsights([...insights, newInsight]);
    } catch (error) {
      console.error('AI insight error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFullscreen = (chartId: string) => {
    console.log('Fullscreen chart:', chartId);
  };

  const handleDownload = (type: string, format: string) => {
    console.log('Download:', type, format);
    // Mock download
    const blob = new Blob(['Mock data'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleChartDownload = (chartId: string, format: string) => {
    handleDownload(chartId, format);
  };

  return (
    <div className="min-h-screen main-bg">
      <Header showBackButton />
      
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-8">
        {/* Role Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{role.name}</h1>
                <p className="text-gray-400">{role.description}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Pipeline Steps */}
        <PipelineSteps currentStep={currentStep} completedSteps={completedSteps} />

        {/* Analysis Sections */}
        <div className="space-y-8">
          {/* Step 1: File Upload */}
          <FileUpload
            onFileUpload={handleFileUpload}
            onPreview={handlePreview}
            uploadedFile={uploadedFile}
            preview={preview}
            columns={columns}
            isUploading={isProcessing && currentStep === 1}
          />

          {/* Step 2: Data Cleaning */}
          {uploadedFile && (
            <DataCleaning
              onCleaningAction={handleCleaningAction}
              isProcessing={isProcessing && currentStep === 3}
              cleanedData={cleanedData}
            />
          )}

          {/* Step 3: Role-Specific Tasks */}
          {uploadedFile && (
            <RoleSpecificTasks
              role={roleId!}
              onRunTask={handleRunTask}
              isProcessing={isProcessing && currentStep === 4}
              completedTasks={completedTasks}
            />
          )}

          {/* Step 4: Charts */}
          {charts.length > 0 && (
            <ChartVisualization
              charts={charts}
              onFullscreen={handleFullscreen}
              onDownload={handleChartDownload}
            />
          )}

          {/* Step 5: AI Insights */}
          {uploadedFile && (
            <AIInsights
              onAskQuestion={handleAskQuestion}
              insights={insights}
              isProcessing={isProcessing && insights.length === 0}
            />
          )}

          {/* Step 6: Download */}
          {uploadedFile && (
            <DownloadSection
              onDownload={handleDownload}
              role={role.name}
            />
          )}
        </div>
      </div>
    </div>
  );
};