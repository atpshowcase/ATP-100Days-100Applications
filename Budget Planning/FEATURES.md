# Budget Planning Application - Feature Overview

## 🎯 Application Summary

A minimalist black and white budget planning application built with Next.js, designed to help users manage their personal finances with clarity and simplicity.

## ✨ Key Features

### 1. **Minimalist Design Philosophy**
- **Pure Black & White**: No colors, no gradients - just clean, professional black and white
- **System Fonts**: Uses native system fonts for optimal readability
- **Sharp Borders**: Clean 1-2px borders for clear visual separation
- **Ample White Space**: Breathing room for better focus

### 2. **Budget Management**

#### Income Tracking
- Multiple income sources
- Categories: Main Income, Side Income, Passive Income
- Planned vs Actual comparison
- Automatic variance calculation

#### Expense Tracking
- Categorized expenses:
  - **Kebutuhan Pokok** (Basic Needs): Rent, utilities, groceries
  - **Transportasi** (Transportation): Fuel, parking, tolls
  - **Kesehatan** (Health): Insurance, medicine
  - **Hiburan** (Entertainment): Dining out, streaming, hobbies
  - **Tabungan & Investasi** (Savings & Investment)

### 3. **Interactive Components**

#### Month Navigation
- Previous/Next month buttons
- Year tracking
- Clean month/year display

#### Collapsible Tables
- Click to expand/collapse categories
- View detailed items within each category
- See planned vs actual amounts
- Variance highlighting

#### Add Item Modal
- Add new income items
- Add new expense items
- Form validation
- Category selection
- Planned and actual amount inputs

### 4. **Automatic Calculations**

#### Summary Dashboard
- **Total Income**: Sum of all actual income
- **Total Expenses**: Sum of all actual expenses
- **Balance**: Income minus expenses
- **Savings Rate**: (Balance / Income) × 100%

#### Visual Indicators
- Progress bar for savings rate
- Target: 20% savings rate
- Surplus/Deficit badge
- Color-coded status (black for positive, gray for negative)

#### Variance Tracking
- Item-level variance (Actual - Planned)
- Category-level totals
- Percentage calculations
- Over/under budget indicators

### 5. **Indonesian Localization**
- Indonesian language interface
- Rupiah (IDR) currency formatting
- Indonesian month names
- Local number formatting

## 🎨 Design Elements

### Typography
- **Headers**: Bold, uppercase, tracking-wide
- **Numbers**: Monospace font for alignment
- **Labels**: Small, uppercase, tracking-wide
- **Body**: System sans-serif

### Layout
- **Max Width**: 7xl container (1280px)
- **Spacing**: Consistent 6-unit spacing
- **Borders**: 1-2px solid black
- **Padding**: Generous padding for readability

### Interactive States
- **Hover**: Background changes on hover
- **Focus**: Ring outline for accessibility
- **Active**: Visual feedback on click
- **Transitions**: Smooth 200-300ms transitions

## 📊 Data Structure

### BudgetItem
```typescript
{
  id: string
  name: string
  planned: number
  actual: number
  category: 'income' | 'expense'
  subcategory: string
}
```

### MonthlyBudget
```typescript
{
  month: string
  year: number
  income: BudgetItem[]
  expenses: BudgetItem[]
}
```

### BudgetSummary
```typescript
{
  totalIncome: number
  totalExpenses: number
  balance: number
  savingsRate: number
}
```

## 🔧 Technical Implementation

### Components
1. **MonthSelector**: Month/year navigation
2. **BudgetSummary**: Financial overview
3. **BudgetTable**: Collapsible expense/income tables
4. **AddItemModal**: Form for adding new items

### Utilities
- Currency formatting (Indonesian Rupiah)
- Total calculations
- Variance calculations
- Percentage calculations

### State Management
- React useState for local state
- Real-time calculations
- Dynamic updates

## 💡 User Experience

### Workflow
1. **View** current month's budget
2. **Navigate** between months
3. **Add** income/expense items
4. **Expand** categories to see details
5. **Monitor** savings rate and balance

### Visual Feedback
- Hover states on interactive elements
- Smooth transitions
- Clear typography hierarchy
- Consistent spacing

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation support
- High contrast (black on white)

## 🎯 Financial Goals

### Savings Target
- **Recommended**: 20% of monthly income
- **Visual Progress**: Progress bar indicator
- **Status**: Surplus/Deficit badge

### Budget Tracking
- Compare planned vs actual
- Identify overspending
- Monitor income variance
- Adjust future budgets

## 🚀 Future Enhancements (Potential)

1. **Data Persistence**
   - Local storage
   - Database integration
   - Export to CSV/Excel

2. **Charts & Graphs**
   - Spending trends
   - Category breakdown
   - Monthly comparison

3. **Budget Templates**
   - Save budget templates
   - Quick setup for new months
   - Category presets

4. **Multi-Currency**
   - Support for other currencies
   - Exchange rate tracking

5. **Reports**
   - Monthly reports
   - Annual summary
   - PDF export

## 📱 Responsive Design

The application is built with responsive design in mind:
- Mobile-friendly layout
- Touch-friendly buttons
- Readable on all screen sizes
- Adaptive spacing

## 🎨 Design Inspiration

Inspired by:
- Minimalist web design
- Spreadsheet clarity
- Swiss design principles
- Brutalist web design
- Print media aesthetics

---

**Built with**: Next.js 16, TypeScript, Tailwind CSS
**Design**: Minimalist Black & White
**Language**: Indonesian (Bahasa Indonesia)
