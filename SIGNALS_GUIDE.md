# Angular Dashboard Configuration Guide

## Signals Usage Guide

This dashboard demonstrates best practices for using Angular Signals in Angular 20.

### Core Signals

#### 1. Dashboard Service Signals

```typescript
// Writable signal for widgets
private widgetsSignal = signal<Widget[]>([]);

// Writable signals for theme and editing mode
private themeSignal = signal<'light' | 'dark'>('light');
private isEditingSignal = signal<boolean>(false);

// Computed signals (read-only derived state)
visibleWidgets = computed(() => 
  this.widgetsSignal().filter(w => w.isVisible)
);

widgetCount = computed(() => this.widgetsSignal().length);
```

### Signal Methods

#### Reading Signals
```typescript
const widgets = this.dashboardService.getWidgets(); // Returns current value
const visibleCount = this.dashboardService.visibleWidgetCount(); // Computed
```

#### Writing to Signals
```typescript
// Update entire state
this.widgetsSignal.set(newWidgets);

// Update based on current value
this.widgetsSignal.update(widgets => [...widgets, newWidget]);
```

#### Using in Templates
```html
<!-- Signals are called as functions in templates -->
<div>{{ visibleWidgets().length }} visible widgets</div>
<button [disabled]="isEditing()">Edit</button>
```

### Effects

Effects run automatically when signal dependencies change:

```typescript
effect(() => {
  const widgets = this.widgetsSignal();
  this.saveDashboard(widgets); // Auto-saves when widgets change
});
```

## Widget Configuration

### Adding a Widget

```typescript
const widget = this.widgetService.createWidgetFromTemplate('stats');
this.dashboardService.addWidget(widget);
```

### Widget Types

- **stats**: Display key metrics
- **chart**: Display data visualization
- **table**: Display tabular data
- **weather**: Display weather information
- **clock**: Display current time
- **custom**: Create custom widgets

### Widget Sizes

- **small**: Single column
- **medium**: Two columns
- **large**: Three columns

## Theme Support

Toggle between light and dark themes:

```typescript
this.dashboardService.setTheme('dark');
```

Theme is automatically persisted to localStorage.

## Drag & Drop

When in editing mode, widgets can be reordered via drag and drop using Angular CDK.

## Local Storage

The dashboard automatically saves:
- Widget configuration
- Dashboard theme
- Widget positions

Data is restored on page reload.

## Advanced Patterns

### Computed Derived State

```typescript
// Efficiently compute data based on multiple signals
visibleWidgets = computed(() => 
  this.widgetsSignal().filter(w => w.isVisible)
);

// Computed signals are memoized - only recompute when dependencies change
```

### Reactive Updates

```typescript
// Update a specific widget
updateWidget(widgetId: string, updates: Partial<Widget>): void {
  this.widgetsSignal.update(widgets =>
    widgets.map(w => w.id === widgetId ? { ...w, ...updates } : w)
  );
}
```

## Performance Tips

1. Use `computed()` for derived state
2. Use `effect()` for side effects that depend on signals
3. Keep signals at the service level for shared state
4. Use OnPush change detection with signals for better performance
5. Leverage signal memoization to prevent unnecessary computations

## Browser Support

Angular 20 Signals work in all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
