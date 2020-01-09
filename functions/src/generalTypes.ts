export interface Expense {
  title: string;
  price: string;
  description: string;
  date: string;
}
export interface ExpenseCategory {
  name: string;
  values: Array<Expense>;
}
export interface CreateExpenseBody {
  name: string;
  date: string;
  title: string;
  description: string;
  price: string;
  category: string;
}

export interface DeleteExpenseBody {
  name: string;
  category: string;
  expenseName: string;
}

export interface UpdateExpenseBody {
  name: string;
  category: string;
  expenseName: string;
  newExpenseName?: string;
  date?: string;
  newTitle?: string;
  description?: string;
  price?: string;
}

export interface GetTripsBody {
  name: string;
  date: string;
  title: string;
  description: string;
  price: string;
  category: string;
}

export interface CreateTripBody {
  name: string;
  startDate: string;
  endDate: string;
  town: string;
}

export interface DeleteTripBody {
  name: string;
}

export interface UpdateTripBody {
  name: string;
  newName?: string;
  startDate?: string;
  endDate?: string;
  town?: string;
  expenses?: string;
}
