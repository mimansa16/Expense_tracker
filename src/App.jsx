import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Dashboard, { dashboardAction, dashboardLoader } from './pages/Dashboard'
import Error from './pages/Error'
import Main, { mainLoader } from './layouts/Main'
import { logoutAction } from './actions/logout'
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import ExpensesPage , {expensesAction, expensesLoader} from './pages/ExpensesPage'
import BudgetPage, { budgetAction, budgetLoader } from './pages/BudgetPage'
import { deleteBudget } from './actions/deleteBudget'
  


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Main/>} loader={mainLoader}>
    <Route path='/' 
    element={<Dashboard/>} 
    loader={dashboardLoader}
    action={dashboardAction}
    errorElement={<Error/>}
    />
    <Route path='budget/:id' 
     element = {<BudgetPage />}
     loader = {budgetLoader}
     action={budgetAction}
     errorElement={<Error/>}
    >
      <Route path='delete'
      action = {deleteBudget}
      />
    </Route>
    <Route path='expenses' 
     element = {<ExpensesPage />}
     loader = {expensesLoader}
     action={expensesAction}
     errorElement={<Error/>}
    />
     <Route path='logout' action = {logoutAction}/>  
    {/* here since we donot want to display a diff element for logout rather we want to
     simply logout the user and go back to the main route hence we're using an action here.This is what action does.
      we can pass a function in this action to perform the required task. */}
    </Route>
    
  )
)

const App = () => {
  return (
    <div className='App'>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}
export default App