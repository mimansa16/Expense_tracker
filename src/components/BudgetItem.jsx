import { Form, Link } from "react-router-dom";
import { calculateSpentByBudget, formatCurrency, formatPercentage } from "../helpers";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";
import { deleteBudget } from "../actions/deleteBudget";

const BudgetItem = ({budget, showDelete = true}) => {
    const {id, name, amount, color} = budget;
    const spent = calculateSpentByBudget(id);
  return (
    <div 
    className="budget"
    style={{
      "--accent" : color
    }}
    >
        <div className="progress-text">
            <h3>{name}</h3>
            <p>{formatCurrency(amount)} Budgeted</p>
        </div>
        <progress max={amount} value={spent}> 
        {/* here value is the amount that has been spent and it will be shown in the form of a progress bar out of the total mount that
        you've given for the particular budget. */}
           {formatPercentage(spent / amount)} ;
        </progress>
        <div className="progress-text">
            <small>{formatCurrency(spent)}</small>
            <small>{formatCurrency(amount - spent)}</small>
        </div>
        {
          showDelete ? (
            <div className="flex-sm">
            <Form
            method="post"
            action="delete"
            onSubmit={(event)=>{
             if(
              !confirm(
                "Are you sure you want to permanently delete the budget?"
              )
             ){
              event.preventDefault();
             }
            }}
            >
              <button
              type = "submit"
              className="btn"
              onSubmit={deleteBudget}
              >
              <span>Delete Budget</span>
              <TrashIcon width={20} />
              </button>
              
            </Form>
            </div>
          ) : (
            <div className="flex-sm">
            <Link
            to={`/budget/${id}`}
            className="btn"
            >
            <span>View Details</span>
            <BanknotesIcon width={20} />
            </Link>
            </div>
          )
        }
    </div>
  )
}
export default BudgetItem