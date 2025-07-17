import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Shuffle, Copy, RotateCcw, Filter, TrendingUp, Database } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface DataCleaningProps {
  onCleaningAction: (action: string) => void;
  isProcessing?: boolean;
  cleanedData?: any[];
}

export const DataCleaning: React.FC<DataCleaningProps> = ({
  onCleaningAction,
  isProcessing,
  cleanedData
}) => {
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const cleaningActions = [
    {
      id: 'remove-nulls',
      name: 'Remove Nulls',
      description: 'Drop rows with missing values',
      icon: Trash2,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10'
    },
    {
      id: 'normalize',
      name: 'Normalize Data',
      description: 'Scale numerical columns to 0-1 range',
      icon: TrendingUp,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 'one-hot-encode',
      name: 'One-Hot Encode',
      description: 'Convert categorical variables to binary',
      icon: Copy,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      id: 'drop-duplicates',
      name: 'Drop Duplicates',
      description: 'Remove duplicate rows',
      icon: Filter,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: 'aggregate',
      name: 'Aggregate Data',
      description: 'Group by columns and summarize',
      icon: Database,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10'
    },
    {
      id: 'impute',
      name: 'Impute Missing',
      description: 'Fill missing values with mean/median',
      icon: RotateCcw,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10'
    },
    {
      id: 'feature-engineering',
      name: 'Feature Engineering',
      description: 'Create new features from existing data',
      icon: Shuffle,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10'
    },
    {
      id: 'data-validation',
      name: 'Data Validation',
      description: 'Validate data quality and consistency',
      icon: Filter,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10'
    }
  ];

  const handleAction = (actionId: string) => {
    setActiveAction(actionId);
    onCleaningAction(actionId);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Clean & Transform Data</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cleaningActions.map((action) => {
            const Icon = action.icon;
            const isActive = activeAction === action.id;
            
            return (
              <motion.div
                key={action.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  isActive 
                    ? 'border-indigo-400 bg-indigo-500/10 glow-blue' 
                    : 'border-white/20 hover:border-white/30 hover:bg-white/5'
                }`}
                onClick={() => handleAction(action.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg ${action.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${action.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{action.name}</h4>
                    <p className="text-sm text-gray-400">{action.description}</p>
                  </div>
                  {isProcessing && isActive && (
                    <div className="w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Transformed Data Preview */}
      {cleanedData && cleanedData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <h4 className="font-medium mb-4 text-white">Transformed Data Preview</h4>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-300">
                  Rows: <span className="accent font-medium">{cleanedData.length}</span> | 
                  Columns: <span className="accent font-medium">{Object.keys(cleanedData[0] || {}).length}</span>
                </p>
                <Button variant="outline" size="sm">
                  Download Cleaned Data
                </Button>
              </div>
              <div className="overflow-x-auto custom-scrollbar">
                <pre className="text-xs text-gray-300">
                  {JSON.stringify(cleanedData.slice(0, 3), null, 2)}
                </pre>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};