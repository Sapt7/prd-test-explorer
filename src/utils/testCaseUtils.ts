
import { TestCase, PRDSummary, UploadedDocument } from '@/types';

// Mock data generator for demonstration purposes
export const generateMockData = (documentName: string): UploadedDocument => {
  const testCases: TestCase[] = [];
  const features = ['Login', 'User Profile', 'Search', 'Notifications', 'Settings'];
  
  // Generate random test cases
  for (let i = 1; i <= 15; i++) {
    const featureIndex = Math.floor(Math.random() * features.length);
    const feature = features[featureIndex];
    
    const priorities = ['Low', 'Medium', 'High', 'Critical'] as const;
    const statuses = ['Pending', 'Passed', 'Failed', 'Skipped'] as const;
    
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    const testCase: TestCase = {
      id: `TC-${i.toString().padStart(3, '0')}`,
      title: `Test ${feature} functionality ${i}`,
      description: `Verify that ${feature.toLowerCase()} works correctly under various conditions.`,
      steps: [
        {
          id: `step-${i}-1`,
          description: `Navigate to the ${feature} page`,
          expectedResult: `The ${feature} page should load correctly`
        },
        {
          id: `step-${i}-2`,
          description: `Interact with ${feature} components`,
          expectedResult: `The components should respond appropriately`
        },
        {
          id: `step-${i}-3`,
          description: `Verify data is saved/loaded correctly`,
          expectedResult: `All data should be processed without errors`
        }
      ],
      expectedResult: `${feature} functionality should work as specified in the requirements`,
      priority,
      status,
      feature,
      tags: ['Regression', 'UI', feature]
    };
    
    testCases.push(testCase);
  }
  
  const summary: PRDSummary = {
    title: documentName.replace(/\.\w+$/, ''),
    description: 'This document outlines the requirements for the application, including functional and non-functional requirements.',
    keyPoints: [
      'User authentication and authorization',
      'Profile management',
      'Search functionality',
      'Notification system',
      'Settings and preferences'
    ],
    totalFeatures: features.length,
    totalTestCases: testCases.length
  };
  
  return {
    id: `doc-${Date.now()}`,
    name: documentName,
    content: 'Mock content for demonstration purposes',
    uploadDate: new Date(),
    fileSize: Math.floor(Math.random() * 10000000),
    fileType: documentName.slice(documentName.lastIndexOf('.') + 1),
    summary,
    testCases
  };
};

export const executeTestCases = (testCases: TestCase[]): Promise<TestCase[]> => {
  return new Promise((resolve) => {
    // Simulate test execution delay
    setTimeout(() => {
      const executedTestCases = testCases.map(testCase => {
        const outcomes = ['Passed', 'Failed', 'Skipped'] as const;
        const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
        
        return {
          ...testCase,
          status: randomOutcome
        };
      });
      
      resolve(executedTestCases);
    }, 2000);
  });
};

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' bytes';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else return (bytes / 1048576).toFixed(1) + ' MB';
};
