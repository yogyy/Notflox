import React from 'react';
import { EmailInput, NameInput, PassInput } from './input';
import ButtonAuth from './button-auth';
import OAuth from './o-auth';

type Variant = 'login' | 'register';
const LoginForm = () => {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [variant, setVariant] = React.useState<Variant>('login');

  const toggleVariant = React.useCallback(() => {
    setVariant(currentVariant =>
      currentVariant === 'login' ? 'register' : 'login'
    );
  }, []);
  return (
    <div className="h-full px-2 sm:px-16 py-16 rounded-md sm:min-w-[480px] flex flex-col gap-3 md:gap-6 bg-black/90">
      <div className="grid place-content-center">
        <h1 className="text-3xl font-semibold text-white">
          {variant === 'login' ? 'Sign in' : 'Create an account'}
        </h1>
        {variant === 'register' && (
          <p className="text-primary place-self-end">currently disabled.</p>
        )}
      </div>
      <div className="flex flex-col gap-3.5">
        {variant === 'register' && (
          <NameInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            value={name}
            variant={variant}
          />
        )}
        <EmailInput
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          value={variant === 'register' ? 'not@available.com' : email}
          variant={variant}
        />
        <PassInput
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          value={variant === 'register' ? '' : password}
          variant={variant}
        />
      </div>
      <ButtonAuth email={email} password={password} variant={variant} />
      <OAuth />
      <div className="flex flex-col mt-12 sm:justify-between sm:flex-row">
        <p className="text-neutral-500">
          {variant === 'login'
            ? 'First time using Notflox?'
            : 'Already have an account?'}
        </p>
        <button
          type="button"
          onClick={toggleVariant}
          className="inline-flex text-white cursor-pointer hover:underline">
          {variant === 'login' ? 'Create an account' : 'Login'}.
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
