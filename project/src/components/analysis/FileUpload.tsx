import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, Eye, X, Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  onPreview: () => void;
  uploadedFile?: File;
  preview?: any[];
  columns?: string[];
  isUploading?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  onPreview,
  uploadedFile,
  preview,
  columns,
  isUploading
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [showFullPreview, setShowFullPreview] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Upload Your Data</h3>
        
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            dragActive 
              ? 'border-indigo-400 bg-indigo-500/10' 
              : 'border-white/20 hover:border-white/30'
          }`}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg mb-2 text-white">Drop your CSV or Excel file here</p>
          <p className="text-gray-400 mb-4">or click to browse</p>
          
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          
          <label htmlFor="file-upload">
            <Button as="span" loading={isUploading}>
              {isUploading ? 'Uploading...' : 'Choose File'}
            </Button>
          </label>
        </div>
      </Card>

      {/* File Info */}
      {uploadedFile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <File className="w-6 h-6 text-indigo-400" />
                <div>
                  <h4 className="font-medium text-white">{uploadedFile.name}</h4>
                  <p className="text-sm text-gray-400">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={onPreview}>
                  <Eye className="w-4 h-4 mr-2" />
                  Quick Preview
                </Button>
                <Button variant="secondary" onClick={() => setShowFullPreview(true)}>
                  <Eye className="w-4 h-4 mr-2" />
                  Full Preview
                </Button>
                <Button variant="accent" onClick={() => {}}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>

            {/* Quick Preview Table */}
            {preview && preview.length > 0 && (
              <div className="mt-4">
                <h5 className="font-medium mb-2 text-white">Data Preview (First 5 rows)</h5>
                <div className="overflow-x-auto border border-white/10 rounded-lg custom-scrollbar">
                  <table className="min-w-full divide-y divide-white/10">
                    <thead className="bg-white/5">
                      <tr>
                        {columns?.map((column, idx) => (
                          <th
                            key={idx}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {preview.slice(0, 5).map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/5">
                          {columns?.map((column, colIdx) => (
                            <td
                              key={colIdx}
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                            >
                              {row[column]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      )}

      {/* Full Preview Modal */}
      {showFullPreview && preview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowFullPreview(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card-bg rounded-xl p-6 max-w-6xl max-h-[80vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Full Data Preview</h3>
              <button
                onClick={() => setShowFullPreview(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="overflow-auto max-h-96 custom-scrollbar">
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-white/5 sticky top-0">
                  <tr>
                    {columns?.map((column, idx) => (
                      <th
                        key={idx}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {preview.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/5">
                      {columns?.map((column, colIdx) => (
                        <td
                          key={colIdx}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                        >
                          {row[column]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};