import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCheck, Play, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SummaryType, TestCaseType } from "@/types";
import { cn } from "@/lib/utils";
import { executeTestCases } from "@/utils/testCaseUtils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface TestCaseListProps {
  testCases: TestCaseType[];
  onTestCaseSelect: (testCase: TestCaseType) => void;
  className?: string;
  loading: boolean;
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

const TestCaseList: React.FC<TestCaseListProps> = ({
  testCases,
  onTestCaseSelect,
  className,
  loading,
}) => {
  const [priorities, setPriorities] = useState<string[]>([]);
  const [selectedTestCases, setSelectedTestCases] = useState<Set<string>>(
    new Set()
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [executing, setExecuting] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCheckboxChange = (testCaseId: string) => {
    const newSelected = new Set(selectedTestCases);

    if (newSelected.has(testCaseId)) {
      newSelected.delete(testCaseId);
    } else {
      newSelected.add(testCaseId);
    }

    setSelectedTestCases(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedTestCases.size === filteredTestCases.length) {
      // If all are selected, deselect all
      setSelectedTestCases(new Set());
    } else {
      // Otherwise, select all
      const allIds = filteredTestCases.map((tc) => tc.id);
      setSelectedTestCases(new Set(allIds));
    }
  };

  const handleExecute = async () => {
    if (selectedTestCases.size === 0) {
      toast({
        title: "No test cases selected",
        description: "Please select at least one test case to execute.",
        variant: "destructive",
      });
      return;
    }

    setExecuting(true);

    // Get the selected test cases
    const testCasesToExecute = testCases.filter((tc) =>
      selectedTestCases.has(tc.id)
    );

    try {
      // Execute the test cases
      const executedTestCases = await executeTestCases(testCasesToExecute);

      // Update the test cases with the execution results
      const updatedTestCases = testCases.map((tc) => {
        const executed = executedTestCases.find((etc) => etc.id === tc.id);
        return executed || tc;
      });

      // Update the parent component with the updated test cases

      toast({
        title: "Test execution complete",
        description: `${executedTestCases.length} test cases executed.`,
      });
    } catch (error) {
      toast({
        title: "Execution failed",
        description: "There was an error executing the test cases.",
        variant: "destructive",
      });
    } finally {
      setExecuting(false);
    }
  };

  // Apply filters and search
  const filteredTestCases = testCases.filter((testCase) => {
    const matchesSearch =
      testCase.coverage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testCase.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testCase.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority =
      priorityFilter.length === 0 || priorityFilter.includes(testCase.priority);

    return matchesSearch && matchesPriority;
  });

  const isAllSelected =
    filteredTestCases.length > 0 &&
    selectedTestCases.size === filteredTestCases.length;

  useEffect(() => {
    const temp = testCases.map((res) => res.priority);
    setPriorities(
      temp.filter((value, index, array) => array.indexOf(value) === index)
    );
  }, [testCases]);

  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div>
          <Badge variant="outline" className="mb-2 text-xs font-normal">
            Test Cases
          </Badge>
          <CardTitle className="text-xl font-semibold">Test Suite</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
            <Input
              placeholder="Search test cases..."
              className="pl-9 w-60 h-9"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>Filter test cases</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Priority</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {priorities.map((priority) => (
                <DropdownMenuCheckboxItem
                  key={priority}
                  checked={priorityFilter.includes(priority)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setPriorityFilter([...priorityFilter, priority]);
                    } else {
                      setPriorityFilter(
                        priorityFilter.filter((p) => p !== priority)
                      );
                    }
                  }}
                >
                  {priority}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={handleSelectAll}
              >
                <CheckCheck className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isAllSelected ? "Deselect all" : "Select all"}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                className="h-9"
                onClick={handleExecute}
                disabled={executing || selectedTestCases.size === 0}
              >
                {executing ? "Executing..." : "Execute"}
                <Play className="ml-2 h-3 w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Execute selected test cases</TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[480px]">
          <div className="px-6 pb-6">
            {filteredTestCases.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-60 text-center">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No test cases found</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
              </div>
            ) : (
              <div className="space-y-2 mt-2">
                {filteredTestCases.map((testCase) => (
                  <div
                    key={testCase.id}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg transition-all duration-150 border",
                      selectedTestCases.has(testCase.id)
                        ? "bg-primary/5 border-primary/20"
                        : "hover:bg-secondary border-transparent hover:border-border"
                    )}
                  >
                    <Checkbox
                      checked={selectedTestCases.has(testCase.id)}
                      onCheckedChange={() => handleCheckboxChange(testCase.id)}
                      className="mt-1"
                    />

                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => onTestCaseSelect(testCase)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-sm">
                            {testCase.coverage}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {testCase.id}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs font-normal border",
                              priorityColorMap[testCase.priority]
                            )}
                          >
                            {testCase.priority}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {testCase.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TestCaseList;
