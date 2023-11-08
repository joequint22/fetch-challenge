import { useEffect, useState } from "react";

type Tusers = Array<userData>;

type userData = {
        name: {
            title: string;
            first: string;
            last: string;
        },
        gender: string,
        email: string,
        location: {
            street: {
                number: number,
                name: string
            }
            city: string,
            state: string,
            country: string,
            postcode: number,

        }
    }





const FetchApi = () => {
  // 1. Fetch Users into usersData
  const [usersData, setUsersData] = useState(null);

  // 2. do something with usersData
  const [users, setUsers] = useState<Tusers>([]);

  // Fetch from https://randomuser.me/api/?results=10, create a table showing list of users, only including name, gender, email, location
  //Add Sorting Feature to location column *button ascending

  const createNewUser = (userData: userData) => {
    const {
      name: { title: titleName, first: firstName, last: lastName },
      gender,
      email,
      location: {
        street: { number: streetNumber, name: streetName },
        city: city,
        state: state,
        country: country,
        postcode: zip,
      },
    } = userData;

    const user = {
      name: `${titleName} ${firstName} ${lastName} `,
      gender: gender,
      email: email,
      location: `${streetNumber} ${streetName} ${city} ${state} ${country} ${zip} `,
    };
    return user;
  };

  //name: {title first last}, gender, email, location: {street, city, state, country, postcode}
  useEffect(() => {
    const fetchUserData = async () => {
      // COULDNT THINK OF THE PURPOSE OF THIS FUNCTIION AKA ITS NAME
      try {
        const res = await fetch("https://randomuser.me/api/?results=10");
        const data = await res.json();
        setUsersData(data.results); // FORGOT RESULTS
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
    if (usersData) {
        const usersList: Tusers = [];
        for (const userData of usersData) {
            const newUser = createNewUser(userData);
            usersList.push(newUser);
        }
        setUsers(usersList);
    }
}, []);

  // utitlity function
  function extractObjKeys(obj: object) {
    const objKeys: string[] = [];
    Object.keys(obj).forEach((key: string) => objKeys.push(key));
    console.log(objKeys);
    return objKeys;
  }

  return (<>
    {
        users.map((user, key) => {
            <div key={key}>{user.name}</div>

        })
    }
  </>)
};

export default FetchApi;
