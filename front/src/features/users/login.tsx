import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader/loader';
import { Button } from '@/components/ui/button';
import { selectLoginError, selectLoginLoading } from '@/features/users/usersSlice';
import { login } from '@/features/users/usersThunks';
import type { LoginMutation } from '@/types';
import { UsersInput } from '@/features/users/components/users-input/users-input';
import React, { type ChangeEvent, type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const initialState: LoginMutation = {
  username: '',
  password: '',
};

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoginLoading);
  const error = useAppSelector(selectLoginError);
  const navigate = useNavigate();
  const [loginMutation, setLoginMutation] = useState<LoginMutation>(initialState);
  const [inputErrors, setInputErrors] = useState<{ username: boolean; password: boolean }>({
    username: false,
    password: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginMutation((prev) => ({ ...prev, [name]: value }));
    setInputErrors((prev) => ({ ...prev, [name]: !value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = {
      username: !loginMutation.username,
      password: !loginMutation.password,
    };

    setInputErrors(errors);

    if (errors.username || errors.password) {
      return;
    }

    await dispatch(login(loginMutation)).unwrap();
    navigate('/');
  };

  return (
    <div className={'grid place-items-center h-screen'}>
      <div className={'max-w-sm w-full'}>
        <header>
          <h4 className={'text-center text-2xl font-semibold'}>Access Your Account</h4>
          <p className={'text-muted-foreground text-sm text-center mb-3'}>
            Please provide your username and password to log in.
          </p>
        </header>

        <main>
          <form onSubmit={handleSubmit}>
            <div className={'flex flex-col gap-2'}>
              <UsersInput
                onChange={handleChange}
                name={'username'}
                label={'Username'}
                error={error?.error.includes('Username') ? error.error : ''}
                value={loginMutation.username}
                placeholder={'Enter your username'}
                className={inputErrors.username ? 'ring-red-600 ring-1 focus-visible:ring-red-600' : ''}
              />

              <UsersInput
                onChange={handleChange}
                name={'password'}
                label={'Password'}
                error={error?.error.includes('Password') ? error.error : ''}
                value={loginMutation.password}
                placeholder={'Enter your password'}
                type={'password'}
                autoComplete={'new-password'}
                className={inputErrors.password ? 'ring-red-600 ring-1 focus-visible:ring-red-600' : ''}
              />

              <Button type={'submit'} disabled={loading} className={'select-none'}>
                Sign In {loading && <Loader className={'text-muted size-5 ml-2'} />}
              </Button>
            </div>
          </form>
        </main>

        <footer>
          <Link
            to={'/register'}
            className={
              'text-sm text-muted-foreground hover:text-black border-b border-transparent hover:border-black duration-100'
            }
          >
            Don't have an account? Sign up
          </Link>
        </footer>
      </div>
    </div>
  );
};
