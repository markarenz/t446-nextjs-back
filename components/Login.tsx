import { useState } from 'react';
import { useAuthContext } from '../auth/AuthContext';

type LoginState = {
  username: string;
  password: string;
};

const Login = () => {
  const initialState = {
    username: '',
    password: ''
  };
  const [loginState, setLoginState] = useState(initialState);
  const { authLogin } = useAuthContext();
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState((prevLoginState) => ({
      ...prevLoginState,
      [e.target.name]: e.target.value
    }));
  };
  const isFormValid =
    loginState.username.length > 0 && loginState.password.length > 0;
  const handleLogin = () => {
    authLogin(loginState.username, loginState.password);
  };
  return (
    <div>
      <div>
        {typeof authLogin}
        <input
          name="username"
          type="text"
          value={loginState.username}
          onChange={handleLoginChange}
        />
      </div>
      <div>
        <input
          name="password"
          type="password"
          value={loginState.password}
          onChange={handleLoginChange}
        />
      </div>
      <div>
        <button disabled={!isFormValid} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
