const API_BASE_URL = 'http://localhost:8000';

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('auth_token');
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  }

  // File Upload
  async uploadFile(role: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/upload/${role}`, {
      method: 'POST',
      body: formData,
      headers: {
        ...(localStorage.getItem('auth_token') && { 
          Authorization: `Bearer ${localStorage.getItem('auth_token')}` 
        }),
      },
    });
    
    return response.json();
  }

  // Data Cleaning
  async cleanData(role: string, operation: string, data: any) {
    return this.request(`/clean/${role}`, {
      method: 'POST',
      body: JSON.stringify({ operation, data }),
    });
  }

  // Analysis Tasks
  async runAnalysis(role: string, task: string, data: any) {
    return this.request(`/analyze/${role}/${task}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // AI Insights
  async getAIInsight(role: string, question: string) {
    return this.request(`/ai-insight/${role}`, {
      method: 'POST',
      body: JSON.stringify({ question }),
    });
  }

  // Reports & Downloads
  async downloadReport(role: string, format: string = 'pdf') {
    const response = await fetch(`${API_BASE_URL}/report/${role}?format=${format}`);
    return response.blob();
  }

  async downloadChart(chartId: string) {
    const response = await fetch(`${API_BASE_URL}/download-chart/${chartId}`);
    return response.blob();
  }

  // Preview Data
  async previewData(role: string) {
    return this.request(`/preview/${role}`);
  }
}

export const apiService = new ApiService();