import React from "react";
import { Table, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import TestCaseTableHeader from "@/components/TestCaseTableHeader";
import DocumentRow from "@/components/DocumentRow";
import { UploadedDocument } from "@/types";
import Container from "@/components/layout/Container";

interface DocumentsSectionProps {
  documents: UploadedDocument[];
  onSelectDocument: (document: UploadedDocument) => void;
  sectionTitle?: string;
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({
  documents,
  onSelectDocument,
  sectionTitle = "Teammate Knowledge",
}) => {
  return (
    <div className="space-y-5">
      <div className="text-lg font-medium">{sectionTitle}</div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TestCaseTableHeader />
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
      </div>
    </div>
  );
};

export default DocumentsSection;
