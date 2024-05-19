import { useState } from 'react';
import LoginUser from './LoginUser';
import SignupUser from './Signup';

function Loginform() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <>
      {showLogin ? <LoginUser toggleForm={toggleForm} /> : <SignupUser toggleForm={toggleForm} />}
    </>
  );
}

export default Loginform;
