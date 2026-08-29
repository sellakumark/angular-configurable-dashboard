import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { WidgetService } from '../../services/widget.service';
import { WidgetType } from '../../models/widget.model';

@Component({
  selector: 'app-configuration-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuration-panel.component.html',
  styleUrls: ['./configuration-panel.component.css']
})
export class ConfigurationPanelComponent {
  private dashboardService = inject(DashboardService);
  private widgetService = inject(WidgetService);

  availableTemplates = this.widgetService.availableTemplates;
  selectedWidgetType: WidgetType = 'stats';

  /**
   * Add a new widget
   */
  addWidget(): void {
    const widget = this.widgetService.createWidgetFromTemplate(this.selectedWidgetType);
    if (widget) {
      this.dashboardService.addWidget(widget);
    }
  }

  /**
   * Get all widgets
   */
  getAllWidgets = computed(() => this.dashboardService.dashboardConfig().widgets);
}
