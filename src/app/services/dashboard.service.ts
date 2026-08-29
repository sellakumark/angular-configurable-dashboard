import { Injectable, signal, computed, effect } from '@angular/core';
import { Widget, DashboardConfig, WidgetTemplate } from '../models/widget.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // Signals
  private dashboardConfigSignal = signal<DashboardConfig>({
    id: 'dashboard-1',
    name: 'My Dashboard',
    widgets: [],
    layout: 'grid',
    theme: 'light',
    lastUpdated: new Date()
  });

  private widgetsSignal = signal<Widget[]>([]);
  private themeSignal = signal<'light' | 'dark'>('light');
  private isEditingSignal = signal<boolean>(false);

  // Computed signals
  visibleWidgets = computed(() => 
    this.widgetsSignal().filter(w => w.isVisible)
  );

  widgetCount = computed(() => this.widgetsSignal().length);
  visibleWidgetCount = computed(() => this.visibleWidgets().length);
  
  dashboardConfig = computed(() => this.dashboardConfigSignal());
  theme = computed(() => this.themeSignal());
  isEditing = computed(() => this.isEditingSignal());

  constructor(private storageService: StorageService) {
    this.initializeDashboard();
    
    // Effect to save dashboard config whenever widgets change
    effect(() => {
      const widgets = this.widgetsSignal();
      this.saveDashboard(widgets);
    });
  }

  /**
   * Initialize dashboard with saved config or defaults
   */
  private initializeDashboard(): void {
    const savedConfig = this.storageService.getItem<Widget[]>('dashboard-widgets');
    const savedTheme = this.storageService.getItem<'light' | 'dark'>('dashboard-theme');

    if (savedConfig && Array.isArray(savedConfig)) {
      this.widgetsSignal.set(savedConfig);
    }

    if (savedTheme) {
      this.themeSignal.set(savedTheme);
    }
  }

  /**
   * Add a new widget to the dashboard
   */
  addWidget(widget: Widget): void {
    const newPosition = Math.max(...this.widgetsSignal().map(w => w.position), -1) + 1;
    const newWidget = { ...widget, position: newPosition };
    this.widgetsSignal.update(widgets => [...widgets, newWidget]);
  }

  /**
   * Remove a widget by ID
   */
  removeWidget(widgetId: string): void {
    this.widgetsSignal.update(widgets => 
      widgets.filter(w => w.id !== widgetId)
    );
  }

  /**
   * Update a widget
   */
  updateWidget(widgetId: string, updates: Partial<Widget>): void {
    this.widgetsSignal.update(widgets =>
      widgets.map(w => w.id === widgetId ? { ...w, ...updates } : w)
    );
  }

  /**
   * Reorder widgets
   */
  reorderWidgets(widgets: Widget[]): void {
    const reorderedWidgets = widgets.map((w, index) => ({
      ...w,
      position: index
    }));
    this.widgetsSignal.set(reorderedWidgets);
  }

  /**
   * Toggle widget visibility
   */
  toggleWidgetVisibility(widgetId: string): void {
    this.updateWidget(widgetId, { 
      isVisible: !this.getWidget(widgetId)?.isVisible 
    });
  }

  /**
   * Get widget by ID
   */
  getWidget(widgetId: string): Widget | undefined {
    return this.widgetsSignal().find(w => w.id === widgetId);
  }

  /**
   * Get all widgets
   */
  getWidgets(): Widget[] {
    return this.widgetsSignal();
  }

  /**
   * Set editing mode
   */
  setEditingMode(isEditing: boolean): void {
    this.isEditingSignal.set(isEditing);
  }

  /**
   * Toggle editing mode
   */
  toggleEditingMode(): void {
    this.isEditingSignal.update(current => !current);
  }

  /**
   * Change theme
   */
  setTheme(theme: 'light' | 'dark'): void {
    this.themeSignal.set(theme);
    this.storageService.setItem('dashboard-theme', theme);
  }

  /**
   * Save dashboard configuration
   */
  private saveDashboard(widgets: Widget[]): void {
    this.storageService.setItem('dashboard-widgets', widgets);
    this.dashboardConfigSignal.update(config => ({
      ...config,
      widgets,
      lastUpdated: new Date()
    }));
  }

  /**
   * Clear all widgets
   */
  clearDashboard(): void {
    this.widgetsSignal.set([]);
  }

  /**
   * Reset to default configuration
   */
  resetToDefault(): void {
    this.clearDashboard();
    this.storageService.removeItem('dashboard-widgets');
  }
}
