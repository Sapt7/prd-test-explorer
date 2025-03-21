import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { SummaryType } from "@/types";

interface PRDSummaryProps {
  summary: SummaryType | null;
  className?: string;
  testCasesTotal: number;
  loading: boolean;
  testCaseLoading: boolean;
}

const PRDSummary: React.FC<PRDSummaryProps> = ({
  summary,
  className,
  testCasesTotal,
  loading,
  testCaseLoading,
}) => {
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="outline" className="mb-2 text-xs font-normal">
              PRD Summary
            </Badge>
            {loading ? (
              <div className="h-6 w-48 bg-gray-200 animate-pulse rounded"></div>
            ) : (
              <CardTitle className="text-xl font-semibold">
                {summary?.title}
              </CardTitle>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Features</p>
              {loading ? (
                <div className="h-6 w-12 bg-gray-200 animate-pulse rounded"></div>
              ) : (
                <p className="text-xl font-medium">{summary?.feature_count}</p>
              )}
            </div>
            <div className="h-8 w-px bg-border"></div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Test Cases</p>
              {testCaseLoading ? (
                <div className="h-6 w-12 bg-gray-200 animate-pulse rounded"></div>
              ) : (
                <p className="text-xl font-medium">{testCasesTotal}</p>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-10 w-full bg-gray-200 animate-pulse rounded mb-4"></div>
        ) : (
          <p className="text-sm text-muted-foreground mb-4">
            {summary?.summary}
          </p>
        )}

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Key Points</h4>
          <ul className="space-y-2">
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <li
                    key={index}
                    className="h-5 w-3/4 bg-gray-200 animate-pulse rounded"
                  ></li>
                ))
              : summary?.key_points.map((point, index) => (
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
