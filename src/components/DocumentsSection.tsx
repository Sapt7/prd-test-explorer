
import React from 'react';
import { Table, TableBody } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import TestCaseTableHeader from '@/components/TestCaseTableHeader';
import DocumentRow from '@/components/DocumentRow';
import { UploadedDocument } from '@/types';
import Container from '@/components/layout/Container';

interface DocumentsSectionProps {
  documents: UploadedDocument[];
  onSelectDocument: (document: UploadedDocument) => void;
  sectionTitle?: string;
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({ 
  documents, 
  onSelectDocument,
  sectionTitle = "Teammate Knowledge"
}) => {
  return (
    <div className="space-y-5">
      <Container withGradientBorder className="inline-block mb-5">
        <div className="px-4 py-2 text-base font-medium">
          {sectionTitle}
        </div>
      </Container>
      
      <div className="bg-white rounded-lg border shadow-sm">
        <TestCaseTableHeader />
        
        <Table>
          <TableBody>
            {documents.map((doc) => (
              <DocumentRow 
                key={doc.id} 
                document={doc}
                onSelect={() => onSelectDocument(doc)}
              />
            ))}
          </TableBody>
        </Table>
        
        <div className="p-4 border-t">
          <Button 
            variant="ghost" 
            className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 px-4"
          >
            Manage {sectionTitle} <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentsSection;
