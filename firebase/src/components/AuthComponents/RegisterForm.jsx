import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signUpUser } from '../../redux/actionCreators/authActionCreator';

function RegisterForm() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !passwordConfirmation) {
      toast.error('Please fill in all fields');
    }
    if (password !== passwordConfirmation) {
      toast.error('Passwords do not match');
    }
    dispatch(signUpUser(name, email, password, setSuccess));
  };

  React.useEffect(() => {
    if (success) {
      navigate('/dashboard');
    }
  }, [success]);

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="form-group my-2">
        <input className="form-control" type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group my-2">
        <input className="form-control" type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group my-2">
        <input className="form-control" type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="form-group my-2">
        <input className="form-control" type="password" name="passwordConfirmation" placeholder="Re-type password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary my-2 form-control">Register</button>
    </form>
  );
}

export default RegisterForm;
