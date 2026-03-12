import React, { useId } from "react";

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "usd",
    className = "",
}) {

    const amountInputId = useId();

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>

            {/* Amount Input */}
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
                    {label}
                </label>

                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) =>
                        onAmountChange && onAmountChange(Number(e.target.value))
                    }
                />
            </div>

            {/* Currency Select */}
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">
                    Currency Type
                </p>

                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectCurrency}
                    onChange={(e) =>
                        onCurrencyChange && onCurrencyChange(e.target.value)
                    }
                >
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>

        </div>
    );
}

export default InputBox;//export InputBox as the default export from this file




/*This is a very important React concept you’re asking about: how data and functions flow between parent and child. Once you understand this, many React projects will suddenly make sense. Let’s go slowly.

1️⃣ First: Who Owns the Data?

In this project:

App.jsx owns the state

Example:

const [amount, setAmount] = useState(0)
const [currency, setCurrency] = useState("usd")


So:

amount → stored in App
currency → stored in App


InputBox does NOT store them.

It just displays and reports changes.

Think of it like:

App.jsx = Brain
InputBox.jsx = UI tool

2️⃣ What the Parent Sends to the Child

In App.jsx we render:

<InputBox
  amount={amount}
  onAmountChange={(amount) => setAmount(amount)}
  selectCurrency={currency}
  onCurrencyChange={(currency) => setCurrency(currency)}
/>


This means the parent sends 4 props:

Prop	What it contains
amount	current amount value
onAmountChange	function to update amount
selectCurrency	current currency
onCurrencyChange	function to update currency

So internally InputBox receives:

function InputBox({
  amount,
  onAmountChange,
  selectCurrency,
  onCurrencyChange
})

3️⃣ What Happens When User Types

Look at this code inside InputBox:

<input
  type="number"
  value={amount}
  onChange={(e) => onAmountChange(Number(e.target.value))}
/>


Now let's follow the exact flow.

4️⃣ Detailed Flow When User Types
Step 1: Initial Render

App state:

amount = 0


App renders:

<InputBox amount={0} ... />


InputBox receives:

amount = 0


So the input shows:

0

Step 2: User Types 5

User presses key.

Input value becomes:

5


React triggers the event:

onChange

Step 3: React Sends Event Object

React gives an event object:

e


Inside it:

e.target.value = "5"

Step 4: InputBox Calls Parent Function

This runs:

onAmountChange(Number(e.target.value))


Which becomes:

onAmountChange(5)


But remember what onAmountChange actually is.

The parent passed:

onAmountChange={(amount) => setAmount(amount)}


So now this executes:

setAmount(5)

5️⃣ Parent State Updates

Now inside App.jsx:

amount = 5


React detects state change.

React re-renders App.

6️⃣ Parent Sends Updated Value Again

App renders again:

<InputBox amount={5} ... />


InputBox receives:

amount = 5


Input shows:

5

7️⃣ Full Flow Diagram
User types "5"
        ↓
Input onChange fires
        ↓
e.target.value = "5"
        ↓
onAmountChange(5)
        ↓
Parent setAmount(5)
        ↓
State updates in App
        ↓
App re-renders
        ↓
InputBox receives amount=5
        ↓
UI updates

8️⃣ Same Flow for Currency Dropdown

Inside InputBox:

<select
  value={selectCurrency}
  onChange={(e) => onCurrencyChange(e.target.value)}
>


User selects:

EUR


Flow:

User selects EUR
       ↓
onChange event
       ↓
e.target.value = "EUR"
       ↓
onCurrencyChange("EUR")
       ↓
setCurrency("EUR") in App
       ↓
state updates
       ↓
App re-renders

9️⃣ Key Idea to Remember

Child components cannot directly change parent state.

Instead:

Child → calls function
Parent → updates state
Parent → sends new value back


This is called:

🔵 "Lifting State Up"
🔟 Why We Use value={amount}

This makes the input a controlled component.

Meaning:

React controls the input value
not the browser


So the source of truth = React state.*/








/*The reason we write value on <select> even though <option> already has value is because of how React controls form elements.

Let’s break this slowly.

1️⃣ What <option value=""> Does

Inside a dropdown we write:

<select>
  <option value="usd">USD</option>
  <option value="inr">INR</option>
  <option value="eur">EUR</option>
</select>


Here:

<option value="usd">USD</option>


means:

If this option is selected,
the value returned will be "usd"


But this does NOT decide which option is selected.

It only defines the value associated with that option.

2️⃣ Who Decides Which Option Is Selected?

That is decided by the value of the <select> element.

Example:

<select value="usd">
  <option value="usd">USD</option>
  <option value="inr">INR</option>
</select>


React checks:

select value = "usd"


Then it finds the option with:

value="usd"


and marks it selected automatically.*/