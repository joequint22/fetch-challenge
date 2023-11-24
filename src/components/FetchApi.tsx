import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

type UserData = {
  name: { title: string; first: string; last: string };
  gender: string;
  email: string;
  location: {
    street: { name: string; number: number };
    city: string;
    state: string;
    postalcode: number;
    country: string;
  };
};

type Tuser = {
  name: string;
  gender: string;
  email: string;
  location: string;
};

const DisplayData = () => {
  // Fetch from https://randomuser.me/api/?results=10, create a table showing list of users, only including name, gender, email, location

  //utility function to extract the object keys
  !function extractObjKeys(obj: object) {
    const objKeys = [];
    const keys = Object.keys(obj);
    objKeys.push(keys);
    console.log(objKeys);
    return objKeys;
  };

  // 1. fetch user's data
  const [users, setUsers] = useState<Tuser[]>([]);
  // 2. extract: name, gender, email, location
  const createNewUser = (userData: UserData): Tuser => {
    const {
      name: { title, first, last },
      gender,
      email,
      location: {
        street: { name, number },
        city,
        state,
        postalcode,
        country,
      },
    } = userData;

    const user = {
      name: `${title} ${first} ${last}`,
      gender,
      email,
      location: `${number} ${name} ${city} ${state} ${postalcode} ${country}`,
    };

    return user;
  };
  // 3. create a table

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await fetch("https://randomuser.me/api/?results=10");
        //catch does not catch non 200 repsonses
        if (!res.ok) {
          throw new Response("Error", res);
        }
        const data = await res.json();
        //set data to be mapped/iterate through creating a new user with only the extracted data asked for, making newUsers an array of strings
        const newUsers = data.results.map(createNewUser);
        return setUsers(newUsers);
      } catch (err: any) {
        switch (err.status) {
          case 400:
            break;
          case 401:
            break;
          case 404:
            break;
          case 500:
            break;
        }
        console.log(err);
      }
    };
    fetchApi();

    return () => {
      //important to cleanup to prevent memory leaks
      //setting up an interval method will continue to run even after unmounting the component, causing a memory leak
    };
  }, []);

  console.log(users)
  

  const tableHeadContent = (
    <> 
    <thead>
      <th>Name</th>
      <th>Gender</th>
      <th>Email</th>
      <th>Location</th>
    </thead>
    </>
  )



  return <>
    <table>
      {tableHeadContent}
      {users.map(user => (
      <tr key={nanoid()}>
        <td>{user.name}</td>
        <td>{user.gender}</td>
        <td>{user.email}</td>
        <td>{user.location}</td>
      </tr>
    ))}
    </table>
  
  </>;
};

export default DisplayData;
