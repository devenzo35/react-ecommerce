import { Cards } from '../components/Cards';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreateProduct} from '../components/CreateProduct';
import { useSelector } from 'react-redux';


export default function Home() {

  const [openCreateForm, setCreateForm] = useState(false)
  
  const { products } = useSelector(state => state.home)
  
  const handleCreateForm=()=>{

    setCreateForm(true)
    

  }
  
  return (
    <div className="flex w-full flex-col items-center">
      

      {
        (openCreateForm)&&<CreateProduct setCreateForm={ setCreateForm }/>
      }

      

     <ul className="mt-20 flex w-full flex-col items-center justify-evenly sm:flex-row sm:justify-evenly sm:flex-wrap">

         {
          products.map(product=>{

            return(
                
              <li key={product[0].id}>
                  <Link to={`products/?pr=${product[0].id}`}>

                    <Cards { ...product[0]} />

                  </Link>
              </li>
                
              ) 
          })
        } 
      
      </ul>

      <button onClick={ handleCreateForm } className="rounded-full bg-gray-800 grid place-items-center fixed bottom-2 right-2 w-10 h-10 text-white shadow-lg outline-none"><i className="fas fa-plus"></i></button>
 
    </div>
  )
}


 