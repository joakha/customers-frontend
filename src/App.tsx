import './App.css'
import AddModal from './components/AddDialog'
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
    console.log("Adding new Customer...");
    console.log(customer);
  }

  const editCustomer = async (customer: Customer) => {
    console.log("Editing Customer Info...");
    console.log(customer);
  }

  const deleteCustomer = async (id: string) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      try {
        const response = await fetch(backendURL + "/customers", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ "id": `${id}` }) });
        if (response.ok) {
          const responseMessage = await response.json();
          console.log(responseMessage);
          getCustomers();
        }
      } catch (error) {
        console.error(error);
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
      <AddModal addCustomer={addCustomer} />
    </main>
  )
}

export default App
