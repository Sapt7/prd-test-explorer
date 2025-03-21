import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  PRDSummary as PRDSummaryType,
  SummaryType,
  TestCaseType,
} from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface PRDSummaryProps {
  summary: SummaryType | null;
  className?: string;
  testCases?: TestCaseType[];
}

const PRDSummary: React.FC<PRDSummaryProps> = ({
  summary,
  className,
  testCases,
}) => {
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="outline" className="mb-2 text-xs font-normal">
              PRD Summary
            </Badge>
            <CardTitle className="text-xl font-semibold">
              {summary?.title}
            </CardTitle>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Features</p>
              <p className="text-xl font-medium">{summary?.feature_count}</p>
            </div>
            <div className="h-8 w-px bg-border"></div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Test Cases</p>
              <p className="text-xl font-medium">{testCases?.length || 0}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{summary?.summary}</p>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Key Points</h4>
          <ul className="space-y-2">
            {summary?.key_points.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                  {index + 1}
                </span>
                <span className="text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PRDSummary;
