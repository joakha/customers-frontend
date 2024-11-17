import './App.css'
import AddModal from './components/AddDialog'
import EditDialog from './components/EditDialog'
import { Customer } from './interfaces/interfaces'
import { Button } from '@mui/material'

function App() {

  const customers: Customer[] = [
    {
      id: 0,
      firstname: "John",
      lastname: "Johnson",
      phone: "0123456789"
    },
    {
      id: 1,
      firstname: "Matti",
      lastname: "Meikalainen",
      phone: "987654321"
    }
  ]

  const addCustomer = async (customer: Customer) => {
    console.log("Adding new Customer...");
    console.log(customer);
  }

  const editCustomer = async (customer: Customer) => {
    console.log("Editing Customer Info...");
    console.log(customer);
  }

  const deleteCustomer = async (customer: Customer) => {
    console.log(`Deleting Customer ${customer.firstname} ${customer.lastname}`)
  }

  return (
    <main>
      <h1>Customer List</h1>
      <section className='customer-list'>
        {
          customers.map(customer => {

            return (
              <article key={customer.id} className='customer-row'>

                <div className='customer-info'>
                  <div>{customer.firstname} {customer.lastname} </div>
                  <div>{customer.phone}</div>
                </div>

                <EditDialog existingCustomer={customer} editCustomer={editCustomer} />

                <Button
                  variant="contained"
                  style={{ backgroundColor: "red" }}
                  onClick={() => deleteCustomer(customer)}
                >
                  Delete
                </Button>
              </article>
            )
          })
        }
      </section>
      <AddModal addCustomer={addCustomer} />
    </main>
  )
}

export default App
