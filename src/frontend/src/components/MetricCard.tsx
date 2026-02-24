import { type LucideIcon } from 'lucide-react';
import { TrendingUp } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
  trend?: 'up' | 'down';
}

export default function MetricCard({ title, value, icon: Icon, description, trend }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-border/40 bg-card p-6 shadow-xs hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
        {trend && (
          <span className="flex items-center text-xs font-medium text-primary">
            <TrendingUp className="h-3 w-3 mr-1" />
          </span>
        )}
      </div>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </div>
  );
}
