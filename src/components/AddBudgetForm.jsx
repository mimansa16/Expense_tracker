import { CurrencyDollarIcon } from "@heroicons/react/24/solid"
import { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom"

const AddBudgetForm = () => {// a benefit of using fetcher.form rather than form by itself is that fetcher.form collects all the simultaneous
  // requests done at once and sends them collectively to make th changes thus making the process faster and in a more organized way.
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";//this will give true or false values to isSubmitting.

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if(!isSubmitting){ 
      formRef.current.reset()  // doing this so that when we submit inputs, the input box becomes empty again after submitting the inputs.
      focusRef.current.focus() //doing this so that when we submit the inputs, the input box is focused after submitting the inputs.
    }
  }, [isSubmitting])

  return (
   
    <div className="form-wrapper">
      <h2 className="h3">
        Create Budget
      </h2>
      <fetcher.Form
      method="post"
      className="grid-sm"
      ref = {formRef}
      >
        <div className="grid-xs">
          <label htmlFor="newBudget">
            Budget Name
          </label>
          <input 
          type="text" 
          name="newBudget" 
          id="newBudget" 
          placeholder="e.g., Groceries"
          required
          ref = {focusRef}
          />
        </div>
        <div className="grid-xs">
            <label htmlFor="newBudgetAmount">Amount</label>
            <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., $350"
            required
            inputMode="decimal"
            />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button 
        type="submit" 
        className="btn btn--dark"
        disabled={isSubmitting}
        >
          {
            isSubmitting ? <span>Submitting...</span> : (
              <>
              <span>Create Budget</span>
              <CurrencyDollarIcon width={20} />
              </>
            )
          }
            
        </button>

      </fetcher.Form>
    </div>
  )
}
export default AddBudgetForm