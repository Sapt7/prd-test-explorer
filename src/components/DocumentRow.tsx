import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { FileText, MoreVertical, Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadedDocument } from "@/types";
import { formatDate, formatFileSize } from "@/utils/formatUtils";

interface DocumentRowProps {
  document: UploadedDocument;
  onSelect: () => void;
}

const DocumentRow: React.FC<DocumentRowProps> = ({ document, onSelect }) => {
  return (
    <TableRow className="cursor-pointer hover:bg-gray-50" onClick={onSelect}>
      <TableCell className="font-medium flex gap-2 text-left">
        <div className="flex justify-start gap-2">
          <FileText size={16} className="text-blue-500" />
          {document.name || "--"}
        </div>
      </TableCell>
      <TableCell>{formatDate(document.uploadDate)}</TableCell>
      <TableCell>{formatFileSize(document.fileSize)}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-start gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => e.stopPropagation()}
          >
            <BellOff size={16} className="text-gray-400" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical size={16} className="text-gray-400" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default DocumentRow;
