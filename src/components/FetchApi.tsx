import { useEffect, useState } from "react";
import { nanoid } from 'nanoid'

type userData = { 
  name: {
    title: string, 
    first: string, 
    last: string
  }, 
  gender: string, 
  email: string, 
  location: {
    street: {name: string, number: number},
    state: string,
    postcode: string,
    city: string,
    country: string
  }
}

type Tuser = {
  name: string,
  gender: string,
  email: string,
  location: string 
}

const DisplayData = () => {
  const [users, setUsers] = useState<Tuser[]>([])
  //utility function: extract object keys from bigger json files
  !function extractObjKeys(obj: object): object[]{
    const objKeys = []
    // Turns keys into strings
    const keys = Object.keys(obj)
    objKeys.push(keys)
    return objKeys
  }

  function createNewUser(userData: userData): Tuser{
    const { 
      name: {
        title, 
        first, 
        last
      }, 
      gender, 
      email, 
      location: {
        street: {name, number},
        state,
        postcode,
        city,
        country
      }
    } = userData

    const user = {
      name: `${title} ${first} ${last} `,
      gender: gender,
      email: email,
      location: `${number} ${name} ${city} ${state} ${postcode} ${country} ` 
    }
    return user
  }
  

  // Fetch from https://randomuser.me/api/?results=10, create a table showing list of users, only including name, gender, email, location

  // function createNewUsers(userData: userData): Tuser{

  //
  // }


  useEffect(() => {
    const fetchApi = async() => {
      try {
        const res = await fetch('https://randomuser.me/api/?results=10')
        //catch does not catch non 200 responses
        if(!res.ok){
          throw new Response('error', res)
        }
        const data = await res.json()
        const newUsers = data.results.map(createNewUser)
        setUsers(newUsers)
        // const users = data.map(createNewUser)


      } catch (err) {
        switch (err.response.status){
          case 400: break;
          case 401: break;
          case 404: break;
          case 500: break;
        }
        console.log(err)
        
      }
    }
    fetchApi()
    return () => {
    }
  }, [])
  
  let tableBodyContent;

  const tableHeadContent = (
    <tr>
      <th>NAME</th>
      <th>GENDER</th>
      <th>ADDRESS</th>
      <th>EMAIL</th>
    </tr>
  )

  if(users.length !== 0) tableBodyContent = (
    <>
    {users.map(user => (
      <tr key={nanoid()}>
        <td>{user.name}</td>
        <td>{user.gender}</td>
        <td>{user.location}</td>
        <td>{user.email}</td>
      </tr>
    ))}
    </>
  )


  return (
    <table>
    {tableHeadContent}
    {tableBodyContent}
    </table>
  )
};

export default DisplayData;


