export interface Expense {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  date: string;
}
export interface Trip {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  town: string;
  backgroundUrl: string;
}
export interface Category {
  id: string;
  tripId: string;
  name: string;
  color: string;
}
export interface Message {
  id: string;
  content: string;
  type: MessageTypes;
}
type MessageTypes = "warning" | "error" | "info" | "success";
export interface GetExpensesBody {
  tripId: string;
}
export interface CreateExpenseBody {
  tripId: string;
  categoryId: string;
  date: string;
  name: string;
  description: string;
  price: number;
  currency: string;
}

export interface DeleteExpenseBody {
  tripId: string;
  expenseId: string;
}

export interface UpdateExpenseBody {
  tripId: string;
  expenseId: string;
  categoryId?: string;
  date?: string;
  name?: string;
  description?: string;
  price?: number;
  currency?: string;
}

export interface CreateCategoryBody {
  name: string;
  color: string;
}

export interface DeleteCategoryBody {
  id: string;
}

export interface UpdateCategoryBody {
  id: string;
  name: string;
  color: string;
}

export interface CreateTripBody {
  name: string;
  startDate: string;
  endDate: string;
  town: string;
  backgroundUrl: string | null;
}

export interface DeleteTripBody {
  id: string;
}

export interface UpdateTripBody {
  id: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  town?: string;
  backgroundUrl?: string;
}
