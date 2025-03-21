import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import UploadSection from "@/components/UploadSection";
import PRDSummary from "@/components/PRDSummary";
import TestCaseList from "@/components/TestCaseList";
import TestCasePreview from "@/components/TestCasePreview";
import DocumentsSection from "@/components/DocumentsSection";
import {
  SummaryType,
  TestCase,
  TestCaseResponse,
  TestCaseType,
  UploadedDocument,
} from "@/types";
import { generateMockData } from "@/utils/testCaseUtils";
import { useToast } from "@/hooks/use-toast";
import { CommonService } from "@/utils/apis/common.service";

const Index = () => {
  const [document, setDocument] = useState<SummaryType | null>(null);
  const [docLoad, setDocLoad] = useState(false);
  const [documentTestCases, setDocumentTestCases] =
    useState<TestCaseResponse | null>(null);
  const [documentTestCasesLoad, setDocumentTestCasesLoad] = useState(false);
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [selectedTestCase, setSelectedTestCase] = useState<TestCaseType | null>(
    null
  );
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFile = (selectedFile: File) => {
    // Check file type (you might want to expand this for your use case)
    const validTypes = ["application/pdf"];

    if (!validTypes.includes(selectedFile.type)) {
      toast({
        title: "Unsupported file type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
      return;
    }

    // Check file size (10MB limit)
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
  };

  // Initialize with some demo documents
  useEffect(() => {
    const demoDocuments = [
      generateMockData("Merchant Education Guide"),
      generateMockData("SupportSample_External"),
    ];
    setDocuments(demoDocuments);
  }, []);

  const handleFileUploaded = (file: File) => {
    setDocLoad(true);
    setDocumentTestCasesLoad(true);
    CommonService.getSummary(file)
      .then((res) => {
        setDocument(res);
        setIsUploaded(true);
        toast({
          title: "Summary Extracted successful",
          description: `${file.name} file summary processed.`,
        });
      })
      .finally(() => {
        setDocLoad(false);
      });
    CommonService.getTestData(file)
      .then((res) => {
        setDocumentTestCases(res);
        setIsUploaded(true);
        toast({
          title: "Test Cases Generated successful",
          description: `${file.name} file test case processed.`,
        });
      })
      .finally(() => {
        setDocumentTestCasesLoad(false);
      });
  };

  const handleSelectDocument = (doc: UploadedDocument) => {
    // setDocument(doc);
    // setIsUploaded(true);
    // setSelectedTestCase(null);
  };

  const handleTestCaseSelect = (testCase: TestCaseType) => {
    setSelectedTestCase(testCase);
  };

  const handleTestCaseUpdate = (updatedTestCase: TestCaseType) => {
    // if (documentTestCases.test_cases) {
    //   const updatedTestCases = documentTestCases.test_cases.map((tc) =>
    //     tc.id === updatedTestCase.id ? updatedTestCase : tc
    //   );
    //   setDocument(document);
    // }
  };

  const handleClosePreview = () => {
    setSelectedTestCase(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 py-8">
        <Container>
          {!isUploaded && !(docLoad || documentTestCasesLoad) ? (
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
                  handleFile={handleFile}
                  file={file}
                  setFile={setFile}
                />
              </div>

              {documents?.length > 0 && (
                <DocumentsSection
                  documents={documents}
                  onSelectDocument={handleSelectDocument}
                  sectionTitle="Previous Test Documents"
                />
              )}
            </div>
          ) : (
            <div className="space-y-6 animate-scale-in">
              <PRDSummary
                summary={document}
                loading={docLoad}
                testCaseLoading={documentTestCasesLoad}
                testCasesTotal={documentTestCases?.test_cases?.length || 0}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-6">
                  <TestCaseList
                    testCases={documentTestCases?.test_cases || []}
                    onTestCaseSelect={handleTestCaseSelect}
                    loading={documentTestCasesLoad}
                  />
                </div>

                <div className="lg:col-span-6">
                  <TestCasePreview
                    testCase={selectedTestCase}
                    onClose={handleClosePreview}
                    onTestCaseUpdate={handleTestCaseUpdate}
                    loading={documentTestCasesLoad}
                  />
                </div>
              </div>
            </div>
          )}
        </Container>
      </main>
    </div>
  );
};

export default Index;
