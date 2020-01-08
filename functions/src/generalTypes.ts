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
  tripName: string;
  date: string;
  title: string;
  description: string;
  price: string;
  category: string;
}

export interface DeleteExpenseBody {
  tripName: string;
  category: string;
  expenseName: string;
}

export interface UpdateExpenseBody {
  tripName: string;
  category: string;
  expenseName: string;
  newExpenseName?: string;
  date?: string;
  newTitle?: string;
  description?: string;
  price?: string;
}

export interface GetTripsBody {
  tripName: string;
  date: string;
  title: string;
  description: string;
  price: string;
  category: string;
}

export interface CreateTripBody {
  tripName: string;
  dateStart: string;
  dateEnd: string;
  town: string;
}

export interface DeleteTripBody {
  tripName: string;
}

export interface UpdateTripBody {
  tripName: string;
  newTripName?: string;
  dateStart?: string;
  dateEnd?: string;
  town?: string;
  expenses?: string;
}
