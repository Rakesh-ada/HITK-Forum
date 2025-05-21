/**
 * This script pulls data from localStorage and writes it to JSON files
 * It's meant to be used in development to sync user-generated data to GitHub
 */

import fs from 'fs';
import path from 'path';

// Helper function to get localStorage data (needs to be run in browser context)
function getLocalStorageData(): string | null {
  return localStorage.getItem('forumData');
}

// Helper function to write data to file
function writeJsonFile(filePath: string, data: any): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Successfully wrote data to ${filePath}`);
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
  }
}

// Main export function to be used in browser environment
export function exportDataToJsonFiles(): void {
  const storageData = getLocalStorageData();
  
  if (!storageData) {
    console.error('No data found in localStorage');
    return;
  }
  
  try {
    const data = JSON.parse(storageData);
    
    // Ensure the data directory exists
    const dataDir = path.join(process.cwd(), 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Write each data type to its own file
    if (data.users) {
      writeJsonFile(path.join(dataDir, 'users.json'), data.users);
    }
    
    if (data.posts) {
      writeJsonFile(path.join(dataDir, 'posts.json'), data.posts);
    }
    
    if (data.comments) {
      writeJsonFile(path.join(dataDir, 'comments.json'), data.comments);
    }
    
    if (data.subreddits) {
      writeJsonFile(path.join(dataDir, 'subreddits.json'), data.subreddits);
    }
    
    console.log('Data export completed successfully');
  } catch (error) {
    console.error('Error exporting data:', error);
  }
}

// Browser utility function to manually trigger export
export function createExportButton(): void {
  // Create a button to trigger the export
  const exportButton = document.createElement('button');
  exportButton.textContent = 'Export Data for GitHub';
  exportButton.style.position = 'fixed';
  exportButton.style.bottom = '20px';
  exportButton.style.right = '20px';
  exportButton.style.zIndex = '9999';
  exportButton.style.padding = '10px';
  exportButton.style.backgroundColor = '#0366d6';
  exportButton.style.color = 'white';
  exportButton.style.border = 'none';
  exportButton.style.borderRadius = '4px';
  exportButton.style.cursor = 'pointer';
  
  // Add click event
  exportButton.addEventListener('click', () => {
    try {
      // Manual data extraction since we can't directly use fs in browser
      const forumData = localStorage.getItem('forumData');
      if (!forumData) {
        alert('No data found in localStorage');
        return;
      }
      
      // Create a download link for the data
      const blob = new Blob([forumData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'forumData.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert('Data exported successfully. Please save this file and use it to update your GitHub repository.');
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Error exporting data. See console for details.');
    }
  });
  
  // Add to DOM
  document.body.appendChild(exportButton);
}

// If in browser context and in development mode, add the export button
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createExportButton);
  } else {
    createExportButton();
  }
} 