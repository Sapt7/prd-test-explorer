import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SummaryType, TestCase, TestCaseType } from "@/types";
import { Play, X } from "lucide-react";
import { executeTestCases } from "@/utils/testCaseUtils";
import { useToast } from "@/hooks/use-toast";

interface TestCasePreviewProps {
  testCase: TestCaseType | null;
  onClose: () => void;
  onTestCaseUpdate: (updatedTestCase: TestCaseType) => void;
  className?: string;
}

const priorityColorMap = {
  Low: "bg-blue-50 text-blue-600 border-blue-200",
  Medium: "bg-yellow-50 text-yellow-600 border-yellow-200",
  High: "bg-orange-50 text-orange-600 border-orange-200",
  Critical: "bg-red-50 text-red-600 border-red-200",
};

const statusColorMap = {
  Pending: "bg-gray-50 text-gray-600 border-gray-200",
  Passed: "bg-green-50 text-green-600 border-green-200",
  Failed: "bg-red-50 text-red-600 border-red-200",
  Skipped: "bg-purple-50 text-purple-600 border-purple-200",
};

const TestCasePreview: React.FC<TestCasePreviewProps> = ({
  testCase,
  onClose,
  onTestCaseUpdate,
  className,
}) => {
  const [executing, setExecuting] = React.useState(false);
  const { toast } = useToast();

  if (!testCase) {
    return (
      <Card
        className={cn("shadow-sm flex items-center justify-center", className)}
      >
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Select a test case to preview</p>
        </CardContent>
      </Card>
    );
  }

  const handleExecute = async () => {
    setExecuting(true);

    try {
      // Execute just this test case
      const [executed] = await executeTestCases([testCase]);

      // Update the parent component with the executed test case
      onTestCaseUpdate(executed);

      toast({
        title: `Test case passed`,
        description: `Test case ${testCase.id} has been executed.`,
      });
    } catch (error) {
      toast({
        title: "Execution failed",
        description: "There was an error executing the test case.",
        variant: "destructive",
      });
    } finally {
      setExecuting(false);
    }
  };

  return (
    <Card className={cn("shadow-sm flex flex-col", className)}>
      <CardHeader className="pb-3 flex flex-row items-start justify-between">
        <div>
          <Badge variant="outline" className="mb-2 text-xs font-normal">
            Test Case Preview
          </Badge>
          <div className="flex flex-col gap-1">
            <CardTitle className="text-xl font-semibold">
              {testCase.coverage}
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {testCase.id}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {testCase.description}
              </span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <Badge
            variant="outline"
            className={cn(
              "text-xs font-normal border",
              priorityColorMap[testCase.priority]
            )}
          >
            {testCase.priority}
          </Badge>
          {[testCase.priority].map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Description</h3>
            <p className="text-sm text-muted-foreground">
              {testCase.description}
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-2">Test Steps</h3>
            <ol className="space-y-4">
              {testCase.steps.map((step, index) => (
                <li key={index} className="space-y-1.5">
                  <div className="flex gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium">{step}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-2">Expected Result</h3>
            <ol className="space-y-4">
              {testCase.expected_results.map((expected_result, index) => (
                <li key={index} className="space-y-1.5">
                  <div className="flex gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium">
                      {expected_result}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t p-4">
        <Button className="w-full" onClick={handleExecute} disabled={executing}>
          {executing ? "Executing..." : "Execute Test Case"}
          <Play className="ml-2 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TestCasePreview;
