//local storage
export const fetchData = (key) =>{
    return JSON.parse(localStorage.getItem(key));
}

//get all items from local storage
export const getAllMatchingItems = ({category,key,value}) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key]=== value)
}

//delete item from local storage
export const deleteItem = ({key,id}) => {
  const existingData = fetchData(key);
  if(id){
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
}

//wait func
export const waait = () => new Promise(
  res => setTimeout(res, Math.random() * 800)
  )



//colors
const generateRandomColor = () => {
    const existingBudgetLength = fetchData('budgets')?. length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`
}

//create budget
export const createBudget = ({name, amount}) => {
      const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createAt: Date.now(),
        amount: +amount, // since by default amount would come as a string so to convert it into a number --> +amount
        color: generateRandomColor()
      }

      const existingBudgets = fetchData('budgets') ?? []; //either give me the budgets that exists or give me an empty array --> []
      return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
}

//create Expense
export const createExpense = ({name, amount, budgetId}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createAt: Date.now(),
    amount: +amount, // since by default amount would come as a string so to convert it into a number --> +amount
    budgetId: budgetId
  }

  const existingExpenses = fetchData('expenses') ?? []; //either give me the expenses that exists or give me an empty array --> []
  return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]))
}




//total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    //The reduce() method of Array instances executes a user-supplied "reducer" callback function on each element of the array, in order,
    // passing in the return value from the calculation on the preceding element. The final result of running the reducer across 
    //all elements of the array is a single value.
     //checking if the expense.id === budgetId i passed in
     if(expense.budgetId !== budgetId) return acc;

     //adding the current amount to my total
     return acc += expense.amount;
  }, 0) // 0 is the given initial value
  return budgetSpent;
}

//FORMATTING

//format date
export const formatDateToLocalString = (epoch) =>
new Date(epoch).toLocaleDateString();


//format percentages
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style : "percent",
    minimumFractionDigits : 0,
  })
}

//format currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "INR"
  })
}