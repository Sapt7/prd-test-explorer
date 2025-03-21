import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import UploadSection from "@/components/UploadSection";
import PRDSummary from "@/components/PRDSummary";
import TestCaseList from "@/components/TestCaseList";
import TestCasePreview from "@/components/TestCasePreview";
import DocumentsSection from "@/components/DocumentsSection";
import { TestCase, UploadedDocument } from "@/types";
import { generateMockData } from "@/utils/testCaseUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, TestTube } from "lucide-react";

const Index = () => {
  const [document, setDocument] = useState<UploadedDocument | null>(null);
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(
    null
  );
  const [isUploaded, setIsUploaded] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("testEnvironment");

  // Initialize with some demo documents
  useEffect(() => {
    const demoDocuments = [
      generateMockData("Merchant Education Guide"),
      generateMockData("SupportSample_External"),
    ];
    setDocuments(demoDocuments);
  }, []);

  const handleFileUploaded = (
    fileName: string,
    isKnowledge: boolean = false
  ) => {
    // For demonstration, generate mock data
    const mockData = generateMockData(fileName);

    if (isKnowledge) {
      setDocuments((prev) => [mockData, ...prev]);
    } else {
      setDocument(mockData);
      setDocuments((prev) => [mockData, ...prev]);
      setIsUploaded(true);
    }
  };

  const handleSelectDocument = (doc: UploadedDocument) => {
    setDocument(doc);
    setIsUploaded(true);
    setSelectedTestCase(null);
  };

  const handleTestCaseSelect = (testCase: TestCase) => {
    setSelectedTestCase(testCase);
  };

  const handleTestCasesUpdate = (updatedTestCases: TestCase[]) => {
    if (document) {
      setDocument({
        ...document,
        testCases: updatedTestCases,
      });

      // If the currently selected test case was updated, update it too
      if (selectedTestCase) {
        const updated = updatedTestCases.find(
          (tc) => tc.id === selectedTestCase.id
        );
        if (updated) {
          setSelectedTestCase(updated);
        }
      }

      // Update the documents list as well
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === document.id ? { ...doc, testCases: updatedTestCases } : doc
        )
      );
    }
  };

  const handleTestCaseUpdate = (updatedTestCase: TestCase) => {
    if (document && document.testCases) {
      const updatedTestCases = document.testCases.map((tc) =>
        tc.id === updatedTestCase.id ? updatedTestCase : tc
      );

      setDocument({
        ...document,
        testCases: updatedTestCases,
      });

      setSelectedTestCase(updatedTestCase);

      // Update the documents list as well
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === document.id ? { ...doc, testCases: updatedTestCases } : doc
        )
      );
    }
  };

  const handleClosePreview = () => {
    setSelectedTestCase(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 py-8">
        <Container>
          {!isUploaded ? (
            <div className="space-y-10">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                  Test Environment
                </h2>
                <p className="text-muted-foreground text-center mb-8">
                  Upload a Product Requirement Document to automatically
                  generate and execute test cases.
                </p>
                <UploadSection
                  onFileUploaded={handleFileUploaded}
                  uploadLabel="Upload PRD Document"
                />
              </div>

              {documents.length > 0 && (
                <DocumentsSection
                  documents={documents}
                  onSelectDocument={handleSelectDocument}
                  sectionTitle="Previous Test Documents"
                />
              )}
            </div>
          ) : (
            document && (
              <div className="space-y-6 animate-scale-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PRDSummary summary={document.summary!} />

                  <div className="flex flex-col gap-6">
                    <UploadSection
                      onFileUploaded={handleFileUploaded}
                      className="shadow-none border"
                      uploadLabel="Upload PRD Document"
                    />

                    <div className="text-sm text-muted-foreground p-4 bg-muted/50 rounded-lg border">
                      <p className="font-medium mb-1">Current Document</p>
                      <p>
                        {document.name} • {document.testCases?.length} test
                        cases
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <TestCaseList
                      testCases={document.testCases || []}
                      onTestCaseSelect={handleTestCaseSelect}
                      onTestCasesUpdate={handleTestCasesUpdate}
                    />
                  </div>

                  <div className="lg:col-span-1">
                    <TestCasePreview
                      testCase={selectedTestCase}
                      onClose={handleClosePreview}
                      onTestCaseUpdate={handleTestCaseUpdate}
                    />
                  </div>
                </div>
              </div>
            )
          )}
        </Container>
      </main>
    </div>
  );
};

export default Index;
