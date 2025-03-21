export interface PRDSummary {
  title: string;
  description: string;
  keyPoints: string[];
  totalFeatures: number;
  totalTestCases: number;
}

export interface TestCase {
  id: string;
  title: string;
  description: string;
  steps: TestStep[];
  expectedResult: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Pending" | "Passed" | "Failed" | "Skipped";
  feature: string;
  tags: string[];
}

export interface TestStep {
  id: string;
  description: string;
  expectedResult?: string;
}

export interface UploadedDocument {
  id: string;
  name: string;
  content: string;
  uploadDate: Date;
  fileSize: number;
  fileType: string;
  summary?: PRDSummary;
  testCases?: TestCase[];
}

export interface SummaryType {
  feature_count: number;
  key_points: string[];
  summary: string;
  title: string;
}

export interface TestCaseResponse {
  test_cases: TestCaseType[];
}

export interface TestCaseType {
  coverage: string;
  description: string;
  expected_results: string[];
  id: string;
  preconditions: string[];
  priority: string;
  steps: string[];
  test_type: string;
}
