import { Component, OnInit, inject, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { DashboardService } from '../../services/dashboard.service';
import { WidgetService } from '../../services/widget.service';
import { WidgetComponent } from '../widget/widget.component';
import { ConfigurationPanelComponent } from '../configuration-panel/configuration-panel.component';
import { Widget } from '../../models/widget.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    WidgetComponent,
    ConfigurationPanelComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private widgetService = inject(WidgetService);

  // Expose signals from service
  visibleWidgets = this.dashboardService.visibleWidgets;
  isEditing = this.dashboardService.isEditing;
  theme = this.dashboardService.theme;
  widgetCount = this.dashboardService.widgetCount;
  visibleWidgetCount = this.dashboardService.visibleWidgetCount;

  ngOnInit(): void {
    // Setup any initial data loading
    this.loadSampleData();
  }

  /**
   * Load sample data for demonstration
   */
  private loadSampleData(): void {
    // This is optional - load sample widgets for demo purposes
    const widgets = this.dashboardService.getWidgets();
    if (widgets.length === 0) {
      // Add some sample widgets on first load
      const statsWidget = this.widgetService.createWidgetFromTemplate('stats');
      if (statsWidget) {
        this.dashboardService.addWidget({
          ...statsWidget,
          title: 'Total Users',
          config: { metric: 'users', label: 'Total Users', value: 1250 }
        });
      }
    }
  }

  /**
   * Toggle editing mode
   */
  toggleEditingMode(): void {
    this.dashboardService.toggleEditingMode();
  }

  /**
   * Toggle theme
   */
  toggleTheme(): void {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.dashboardService.setTheme(newTheme);
  }

  /**
   * Handle drag and drop
   */
  drop(event: CdkDragDrop<Widget[]>): void {
    if (event.previousIndex !== event.currentIndex) {
      const widgets = [...this.visibleWidgets()];
      const [dropped] = widgets.splice(event.previousIndex, 1);
      widgets.splice(event.currentIndex, 0, dropped);
      this.dashboardService.reorderWidgets(widgets);
    }
  }

  /**
   * Remove widget
   */
  removeWidget(widgetId: string): void {
    if (confirm('Are you sure you want to remove this widget?')) {
      this.dashboardService.removeWidget(widgetId);
    }
  }

  /**
   * Toggle widget visibility
   */
  toggleWidgetVisibility(widgetId: string): void {
    this.dashboardService.toggleWidgetVisibility(widgetId);
  }

  /**
   * Reset dashboard to default
   */
  resetDashboard(): void {
    if (confirm('This will clear all widgets. Are you sure?')) {
      this.dashboardService.resetToDefault();
    }
  }

  /**
   * Export dashboard configuration
   */
  exportConfig(): void {
    const config = this.dashboardService.dashboardConfig();
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dashboard-config-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
