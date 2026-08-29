/**
 * Widget model representing a dashboard widget
 */
export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  position: number;
  size: 'small' | 'medium' | 'large';
  config: Record<string, any>;
  data?: any;
  isVisible: boolean;
  refreshInterval?: number; // in seconds
}

export type WidgetType = 'stats' | 'chart' | 'table' | 'weather' | 'clock' | 'custom';

export interface WidgetTemplate {
  type: WidgetType;
  title: string;
  description: string;
  defaultConfig: Record<string, any>;
  defaultSize: 'small' | 'medium' | 'large';
  icon: string;
}

export interface DashboardConfig {
  id: string;
  name: string;
  widgets: Widget[];
  layout: 'grid' | 'flex';
  theme: 'light' | 'dark';
  lastUpdated: Date;
}
