import { cn } from "@/lib/utils";
import { getDifficultyLabel } from "@/data/mockHikes";

interface DifficultyIndicatorProps {
  difficulty: 1 | 2 | 3;
  showLabel?: boolean;
  className?: string;
}

export const DifficultyIndicator = ({
  difficulty,
  showLabel = true,
  className,
}: DifficultyIndicatorProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex gap-1">
        {[1, 2, 3].map((level) => (
          <div
            key={level}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              level <= difficulty
                ? difficulty === 1
                  ? "bg-green-500"
                  : difficulty === 2
                  ? "bg-accent"
                  : "bg-red-500"
                : "bg-muted"
            )}
          />
        ))}
      </div>
      {showLabel && (
        <span className="text-xs text-muted-foreground">
          {getDifficultyLabel(difficulty)}
        </span>
      )}
    </div>
  );
};
