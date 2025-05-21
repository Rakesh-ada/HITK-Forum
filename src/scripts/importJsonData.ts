/**
 * This script is used to import the downloaded JSON data and split it into separate files
 * Run this script with Node.js after downloading the forumData.json file
 */

import fs from 'fs';
import path from 'path';

// Define paths
const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');
const COMMENTS_FILE = path.join(DATA_DIR, 'comments.json');
const SUBREDDITS_FILE = path.join(DATA_DIR, 'subreddits.json');

function importData(sourceFilePath: string): void {
  try {
    // Read the JSON file
    const rawData = fs.readFileSync(sourceFilePath, 'utf8');
    const data = JSON.parse(rawData);
    
    // Ensure the data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    // Write each data type to its own file
    if (data.users) {
      fs.writeFileSync(USERS_FILE, JSON.stringify(data.users, null, 2), 'utf8');
      console.log(`Successfully wrote data to ${USERS_FILE}`);
    }
    
    if (data.posts) {
      fs.writeFileSync(POSTS_FILE, JSON.stringify(data.posts, null, 2), 'utf8');
      console.log(`Successfully wrote data to ${POSTS_FILE}`);
    }
    
    if (data.comments) {
      fs.writeFileSync(COMMENTS_FILE, JSON.stringify(data.comments, null, 2), 'utf8');
      console.log(`Successfully wrote data to ${COMMENTS_FILE}`);
    }
    
    if (data.subreddits) {
      fs.writeFileSync(SUBREDDITS_FILE, JSON.stringify(data.subreddits, null, 2), 'utf8');
      console.log(`Successfully wrote data to ${SUBREDDITS_FILE}`);
    }
    
    console.log('Data import completed successfully');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

// Check if the script is being run directly
if (require.main === module) {
  // Get the file path from command line argument
  const filePath = process.argv[2];
  
  if (!filePath) {
    console.error('Please provide the path to the forumData.json file');
    console.log('Usage: npx ts-node importJsonData.ts path/to/forumData.json');
    process.exit(1);
  }
  
  importData(filePath);
}

export { importData }; 