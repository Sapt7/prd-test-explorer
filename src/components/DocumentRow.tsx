
import React from 'react';
import { TableRow, TableCell } from "@/components/ui/table";
import { FileText, MoreVertical, Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UploadedDocument } from '@/types';
import { formatDate } from '@/utils/formatUtils';

interface DocumentRowProps {
  document: UploadedDocument;
  onSelect: () => void;
}

const DocumentRow: React.FC<DocumentRowProps> = ({ document, onSelect }) => {
  return (
    <TableRow 
      className="cursor-pointer hover:bg-gray-50" 
      onClick={onSelect}
    >
      <TableCell className="p-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-50 text-blue-500">
          <FileText size={16} />
        </div>
      </TableCell>
      <TableCell className="font-medium flex items-center gap-2">
        <FileText size={16} className="text-blue-500" />
        {document.name}
      </TableCell>
      <TableCell>You</TableCell>
      <TableCell>{formatDate(document.uploadDate)}</TableCell>
      <TableCell>{formatFileSize(document.fileSize)}</TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
            <BellOff size={16} className="text-gray-400" />
          </Button>
          <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
            <MoreVertical size={16} className="text-gray-400" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '-';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default DocumentRow;
