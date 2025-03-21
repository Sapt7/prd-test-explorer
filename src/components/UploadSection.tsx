import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { File, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatFileSize } from "@/utils/testCaseUtils";

interface UploadSectionProps {
  onFileUploaded: (fileName: string) => void;
  className?: string;
  uploadLabel?: string;
}

const UploadSection: React.FC<UploadSectionProps> = ({
  onFileUploaded,
  className,
  uploadLabel = "Upload Document",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      handleFile(selectedFile);
    }
  };

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

  const handleUpload = () => {
    if (!file) return;

    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Upload successful",
        description: `${file.name} has been processed.`,
      });
      onFileUploaded(file.name);
    }, 1500);
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card className={cn("overflow-hidden shadow-sm transition-all", className)}>
      <CardContent className="p-6">
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200",
            isDragging ? "border-primary bg-primary-light" : "border-border",
            file ? "bg-secondary/50" : "bg-transparent"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!file ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <File className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">{uploadLabel}</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                  Drag & drop your file here, or click to browse
                </p>
              </div>
              <Button
                onClick={handleBrowseClick}
                variant="secondary"
                className="mt-2"
              >
                <Upload className="mr-2 h-4 w-4" />
                Browse Files
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf"
              />
              <p className="text-xs text-muted-foreground mt-3">
                Supported formats: PDF (max 10MB)
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 animate-in">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <File className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-medium mb-1">{file.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Button
                  onClick={handleUpload}
                  className="px-4"
                  disabled={isUploading}
                >
                  {isUploading ? "Processing..." : "Process Document"}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveFile}
                  disabled={isUploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadSection;
