import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Input from './common/Input';
import Button from './common/Button';

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
  const { authLogin, setLoading } = useAppContext();
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState((prevLoginState) => ({
      ...prevLoginState,
      [e.target.name]: e.target.value
    }));
  };
  const isFormValid =
    loginState.username.length > 0 && loginState.password.length > 0;
  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      authLogin(loginState.username, loginState.password);
      setLoading(false);
    }, 500);
  };
  return (
    <div className="center-wrap">
      <div className="container-md">
        <div className="card">
          <div className="card-header">Log In</div>
          <div className="card-body">
            <div className="pb-1">
              <Input
                name="username"
                type="text"
                value={loginState.username}
                onChange={handleLoginChange}
                tabIndex={1}
                autoFocus
              />
            </div>
            <div>
              <Input
                name="password"
                type="password"
                value={loginState.password}
                onChange={handleLoginChange}
                tabIndex={2}
                autoFocus={false}
              />
            </div>
          </div>
          <div className="card-actions">
            <Button disabled={!isFormValid} onClick={handleLogin} tabIndex={3}>
              <span>Login</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
