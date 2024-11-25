import './App.css'
import AddDialog from './components/AddDialog'
import EditDialog from './components/EditDialog'
import { Customer } from './types/types.ts'
import { Button } from '@mui/material'
import { backendURL } from './constants/constants.ts'
import { useEffect, useState } from 'react'

function App() {

  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const getCustomers = async () => {
    try {
      setLoadingCustomers(true);
      const response = await fetch(backendURL + "/customers");
      const customerData = await response.json();
      setCustomers(customerData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCustomers(false);
    }
  }

  const addCustomer = async (customer: Customer) => {
    try {
      const response = await fetch(backendURL + "/customers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(customer) });
      if (!response.ok) {
        throw new Error("Issue adding a customer to database!");
      }

      const responseJSON = await response.json();
      console.log(responseJSON);
    } catch (error) {
      console.error(error);
    } finally {
      getCustomers();
    }
  }

  const editCustomer = async (customer: Customer) => {
    console.log(customer._id)
    try {
      const response = await fetch(backendURL + "/customers", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(customer) });

      if (!response.ok) {
        throw new Error("Issue editing customer in database!");
      }

      const responseJSON = await response.json();
      console.log(responseJSON);
    }
    catch (error) {
      console.error(error);
    } finally {
      getCustomers();
    }
  }

  const deleteCustomer = async (id: string) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      try {
        const response = await fetch(backendURL + "/customers", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ "id": `${id}` }) });
        if (response.ok) {
          const responseMessage = await response.json();
          console.log(responseMessage);
        }
      } catch (error) {
        console.error(error);
      } finally {
        getCustomers();
      }
    }
  }

  useEffect(() => {
    getCustomers()
  }, [])

  return (
    <main>
      <h1>Customer List</h1>
      <section className='customer-list'>
        {
          loadingCustomers ? (
            <p>Loading customers...</p>
          ) : (
            customers.map(customer => {
              return (
                <article key={customer._id} className='customer-row'>

                  <div className='customer-info'>
                    <div>{customer.firstname} {customer.lastname} </div>
                    <div>{customer.phone}</div>
                  </div>

                  <EditDialog existingCustomer={customer} editCustomer={editCustomer} />

                  <Button
                    variant="contained"
                    style={{ backgroundColor: "red" }}
                    onClick={() => deleteCustomer(customer._id)}
                  >
                    Delete
                  </Button>
                </article>
              )
            }))
        }
      </section>
      <AddDialog addCustomer={addCustomer} />
    </main>
  )
}

export default App
