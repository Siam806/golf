import React from 'react'
import Mailto from '../components/Mailto'

const MockData = {
  email: 'siam.ngamkam@stud-provadis-hochschule.de',
  name: 'Siam',
  oldHandicap: 10,
  newHandicap: 8
};

const Home = () => {
    return (
        <>
            <Mailto 
                email={MockData.email} 
                name={MockData.name} 
                oldHandicap={MockData.oldHandicap} 
                newHandicap={MockData.newHandicap} 
            />
        </>
    );
}

export default Home;