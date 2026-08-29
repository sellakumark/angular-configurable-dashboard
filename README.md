# Angular 20 Configurable Dashboard with Signals

A complete example of a custom configurable dashboard built with Angular 20 using Angular Signals for state management.

## Features

- **Signal-based State Management**: Uses Angular Signals for reactive, fine-grained state management
- **Configurable Widgets**: Add, remove, and customize dashboard widgets
- **Drag & Drop**: Reorder widgets on the dashboard
- **Local Storage**: Persist dashboard configuration
- **Responsive Design**: Works on desktop and mobile
- **Real-time Updates**: Live data updates using signals
- **Widget Templates**: Multiple widget types (stats, charts, tables, etc.)

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── dashboard.component.ts
│   │   │   ├── dashboard.component.html
│   │   │   ├── dashboard.component.css
│   │   ├── widget/
│   │   │   ├── widget.component.ts
│   │   │   ├── widget.component.html
│   │   │   ├── widget.component.css
│   │   ├── widget-grid/
│   │   └── configuration-panel/
│   ├── services/
│   │   ├── dashboard.service.ts
│   │   ├── widget.service.ts
│   │   └── storage.service.ts
│   ├── models/
│   │   ├── widget.model.ts
│   │   ├── dashboard.model.ts
│   └── app.component.ts
├── assets/
└── styles/
```

## Getting Started

### Prerequisites
- Node.js 18+
- Angular CLI 20+

### Installation

```bash
npm install
ng serve
```

Navigate to `http://localhost:4200/`

## Usage

The dashboard is fully configurable through signals:

1. **Add Widgets**: Use the configuration panel to add new widgets
2. **Remove Widgets**: Click the remove button on any widget
3. **Reorder**: Drag and drop widgets to reorder them
4. **Persist**: Configuration is automatically saved to localStorage

## Key Technologies

- Angular 20
- Angular Signals
- TypeScript
- RxJS
- Tailwind CSS
- CDK (Component Dev Kit)

## License

MIT
