import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader/loader';
import { Button } from '@/components/ui/button';
import { UsersInput } from '@/features/users/components/users-input/users-input';
import { selectRegisterError, selectRegisterLoading } from '@/features/users/usersSlice';
import { register } from '@/features/users/usersThunks';
import type { RegisterMutation } from '@/types';
import React, { type ChangeEvent, type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const initialState: RegisterMutation = {
  username: '',
  password: '',
  displayName: '',
  avatar: null,
};

interface FieldErrors {
  username: boolean;
  password: boolean;
  displayName: boolean;
  confirmPassword: boolean;
}

const initialErrors: FieldErrors = {
  username: false,
  password: false,
  displayName: false,
  confirmPassword: false,
};

export const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectRegisterLoading);
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();
  const [registerMutation, setRegisterMutation] = useState<RegisterMutation>(initialState);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [inputErrors, setInputErrors] = useState<FieldErrors>(initialErrors);

  const getFieldError = (field: string) => {
    return error?.errors[field]?.message;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterMutation((prev) => ({ ...prev, [name]: value }));
    setInputErrors((prev) => ({
      ...prev,
      [name]: !value,
    }));
  };

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setConfirmPassword(value);

    setInputErrors((prev) => ({
      ...prev,
      confirmPassword: registerMutation.password !== value,
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, files } = event.target;
    const value = files && files[0] ? files[0] : null;
    setRegisterMutation((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const errors = {
        username: !registerMutation.username,
        password: !registerMutation.password,
        displayName: !registerMutation.displayName,
        confirmPassword: registerMutation.password !== confirmPassword,
      };

      setInputErrors(errors);

      if (errors.username || errors.password || errors.displayName || errors.confirmPassword) {
        return;
      }

      await dispatch(register(registerMutation)).unwrap();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={'grid place-items-center h-screen'}>
      <div className={'max-w-sm w-full'}>
        <header>
          <h4 className={'text-center text-2xl font-semibold'}>Create Your Account</h4>
          <p className={'text-muted-foreground text-sm text-center mb-3'}>
            Enter your username and password to create a new account.
          </p>
        </header>

        <main>
          <form onSubmit={handleSubmit}>
            <div className={'flex flex-col gap-2'}>
              <UsersInput
                onChange={handleChange}
                name={'username'}
                label={'Username'}
                error={getFieldError('username')}
                value={registerMutation.username}
                placeholder={'Enter your username'}
                autoComplete={'current-username'}
                className={inputErrors.username ? 'ring-red-600 ring-1 focus-visible:ring-red-600' : ''}
              />

              <UsersInput
                onChange={handleChange}
                name={'displayName'}
                label={'Display name'}
                error={getFieldError('displayName')}
                value={registerMutation.displayName}
                placeholder={'Enter your display name'}
                autoComplete={'current-username'}
                className={inputErrors.displayName ? 'ring-red-600 ring-1 focus-visible:ring-red-600' : ''}
              />

              <UsersInput
                onChange={handleChange}
                name={'password'}
                label={'Password'}
                error={getFieldError('password')}
                value={registerMutation.password}
                placeholder={'Enter your password'}
                type={'password'}
                autoComplete={'new-password'}
                className={inputErrors.password ? 'ring-red-600 ring-1 focus-visible:ring-red-600' : ''}
              />

              <UsersInput
                onChange={handleConfirmPasswordChange}
                name={'confirmPassword'}
                label={'Confirm password'}
                error={inputErrors.confirmPassword ? 'Passwords do not match' : ''}
                value={confirmPassword}
                placeholder={'Enter your password'}
                type={'password'}
                autoComplete={'new-password'}
                className={inputErrors.confirmPassword ? 'ring-red-600 ring-1 focus-visible:ring-red-600' : ''}
              />

              <UsersInput
                onChange={handleImageChange}
                type={'file'}
                name={'avatar'}
                label={'Avatar'}
                placeholder={'Select an avatar'}
              />

              <Button type={'submit'} disabled={loading} className={'select-none'}>
                Sign Up {loading && <Loader className={'text-muted size-5 ml-2'} />}
              </Button>
            </div>
          </form>
        </main>

        <footer>
          <Link
            to={'/login'}
            className={
              'text-sm text-muted-foreground hover:text-black border-b border-transparent hover:border-black duration-100'
            }
          >
            Already have an account? Log in
          </Link>
        </footer>
      </div>
    </div>
  );
};
