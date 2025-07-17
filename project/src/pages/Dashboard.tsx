import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { roles } from '../data/roles';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Header } from '../components/layout/Header';
import * as Icons from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (roleId: string) => {
    navigate(`/analyze/${roleId}`);
  };

  return (
    <div className="min-h-screen main-bg p-4">
      <Header showBackButton />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 pt-24"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-green-400 bg-clip-text text-transparent">
            Choose Your Analytics Role
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Select the analysis workflow that matches your role and get specialized insights tailored to your needs
          </p>
        </motion.div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {roles.map((role, index) => {
            const IconComponent = Icons[role.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
            
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => handleRoleSelect(role.id)}
              >
                <Card hover className="p-6 h-full cursor-pointer group">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${role.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-400 transition-colors text-white">
                    {role.name}
                  </h3>
                  
                  <p className="text-gray-400 mb-4">
                    {role.description}
                  </p>
                  
                  <div className="mt-auto">
                    <Button variant="outline" size="sm" className="w-full">
                      Get Started
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Card className="p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-white">Need Help Choosing?</h3>
            <p className="text-gray-400 mb-6">
              Not sure which role fits your needs? Start with General Analysis for a comprehensive overview
            </p>
            <Button 
              size="lg"
              onClick={() => handleRoleSelect('general')}
              className="px-8"
            >
              Start with General Analysis
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};