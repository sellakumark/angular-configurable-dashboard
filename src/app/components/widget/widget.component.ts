import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Widget } from '../../models/widget.model';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent {
  @Input() widget!: Widget;
  @Input() isEditing = false;
  @Output() remove = new EventEmitter<string>();
  @Output() toggle = new EventEmitter<string>();

  private dashboardService = inject(DashboardService);

  isExpanded = false;

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  onRemove(): void {
    this.remove.emit(this.widget.id);
  }

  onToggle(): void {
    this.toggle.emit(this.widget.id);
  }

  updateConfig(key: string, value: any): void {
    this.dashboardService.updateWidget(this.widget.id, {
      config: {
        ...this.widget.config,
        [key]: value
      }
    });
  }

  updateTitle(title: string): void {
    this.dashboardService.updateWidget(this.widget.id, { title });
  }

  changeSize(size: 'small' | 'medium' | 'large'): void {
    this.dashboardService.updateWidget(this.widget.id, { size });
  }

  /**
   * Get widget content based on type
   */
  getWidgetContent(): string {
    switch (this.widget.type) {
      case 'stats':
        return this.widget.config.value || this.widget.data || '—';
      case 'chart':
        return `Chart: ${this.widget.config.chartType || 'line'}`;
      case 'table':
        return `Table with ${this.widget.config.rows?.length || 0} rows`;
      case 'weather':
        return `Weather: ${this.widget.config.location || 'N/A'}`;
      case 'clock':
        return new Date().toLocaleTimeString();
      default:
        return 'Custom Widget';
    }
  }

  /**
   * Refresh widget data
   */
  refreshWidget(): void {
    // Simulate data refresh
    if (this.widget.type === 'clock') {
      // Clock updates automatically via getter
      this.isExpanded = true;
    }
  }
}
