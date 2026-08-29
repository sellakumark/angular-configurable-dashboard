import { Injectable, signal, computed } from '@angular/core';
import { WidgetTemplate, WidgetType, Widget } from '../models/widget.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  private widgetTemplatesSignal = signal<WidgetTemplate[]>([
    {
      type: 'stats',
      title: 'Statistics',
      description: 'Display key metrics and statistics',
      defaultConfig: {
        metric: 'users',
        label: 'Total Users',
        value: 0
      },
      defaultSize: 'small',
      icon: 'chart-bar'
    },
    {
      type: 'chart',
      title: 'Chart',
      description: 'Display data in chart format',
      defaultConfig: {
        chartType: 'line',
        data: []
      },
      defaultSize: 'large',
      icon: 'chart-line'
    },
    {
      type: 'table',
      title: 'Table',
      description: 'Display tabular data',
      defaultConfig: {
        columns: [],
        rows: []
      },
      defaultSize: 'large',
      icon: 'table'
    },
    {
      type: 'weather',
      title: 'Weather',
      description: 'Display current weather',
      defaultConfig: {
        location: 'New York',
        units: 'celsius'
      },
      defaultSize: 'medium',
      icon: 'cloud'
    },
    {
      type: 'clock',
      title: 'Clock',
      description: 'Display current time',
      defaultConfig: {
        format: '24h',
        timezone: 'UTC'
      },
      defaultSize: 'small',
      icon: 'clock'
    }
  ]);

  availableTemplates = computed(() => this.widgetTemplatesSignal());

  constructor() {}

  /**
   * Get all available widget templates
   */
  getTemplates(): WidgetTemplate[] {
    return this.widgetTemplatesSignal();
  }

  /**
   * Get template by type
   */
  getTemplate(type: WidgetType): WidgetTemplate | undefined {
    return this.widgetTemplatesSignal().find(t => t.type === type);
  }

  /**
   * Create widget from template
   */
  createWidgetFromTemplate(type: WidgetType): Widget | null {
    const template = this.getTemplate(type);
    if (!template) return null;

    return {
      id: uuidv4(),
      type,
      title: template.title,
      position: 0,
      size: template.defaultSize,
      config: { ...template.defaultConfig },
      isVisible: true,
      refreshInterval: 30
    };
  }

  /**
   * Update widget data
   */
  updateWidgetData(widget: Widget, data: any): Widget {
    return {
      ...widget,
      data
    };
  }

  /**
   * Get widget by type
   */
  getWidgetsByType(type: WidgetType, widgets: Widget[]): Widget[] {
    return widgets.filter(w => w.type === type);
  }

  /**
   * Validate widget configuration
   */
  validateWidget(widget: Widget): boolean {
    if (!widget.id || !widget.type || !widget.title) {
      return false;
    }
    return true;
  }

  /**
   * Clone widget
   */
  cloneWidget(widget: Widget): Widget {
    return {
      ...widget,
      id: uuidv4(),
      config: { ...widget.config }
    };
  }

  /**
   * Add custom template
   */
  addCustomTemplate(template: WidgetTemplate): void {
    this.widgetTemplatesSignal.update(templates => [...templates, template]);
  }
}
