import React from "react";
import { Table, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface TestCaseTableHeaderProps {
  className?: string;
}

const TestCaseTableHeader: React.FC<TestCaseTableHeaderProps> = ({
  className,
}) => {
  return (
    <TableHeader>
      <TableRow className="border-b-0">
        <TableHead className="w-[240px]">Name</TableHead>
        <TableHead className="w-[150px]">Last Synced</TableHead>
        <TableHead className="w-[100px]">Size</TableHead>
        <TableHead className="w-[100px]">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TestCaseTableHeader;
