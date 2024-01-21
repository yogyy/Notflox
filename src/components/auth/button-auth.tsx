import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import React from 'react';
import { useToast } from '../UI/use-toast';
import { useRouter } from 'next/router';

type ButtonProps = {
  variant: 'register' | 'login';
  email: string;
  password: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonAuth: React.FC<ButtonProps> = ({
  email,
  password,
  variant,
  ...props
}) => {
  const [disabled, setDisabled] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const login = async () => {
    setDisabled(prev => !prev);
    try {
      const res = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
        callbackUrl: '/profiles',
      });

      switch (true) {
        case res?.error === null:
          router.push('/profiles');
          break;
        case email === '' && password === '':
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Email and password required',
          });
          break;
        default:
          toast({
            variant: 'destructive',
            title: 'Error',
            description: `${res?.error}`,
          });
          break;
      }
    } catch (error) {
      // Handle errors here, e.g., display an error message or log the error
      console.error('Error in login:', error);
      // You can also show a toast or any other error-handling mechanism.
    } finally {
      setDisabled(prev => !prev);
    }
  };

  return (
    <button
      disabled={disabled || variant === 'register' || email.length === 0}
      type="button"
      className={cn(
        disabled ? 'cursor-not-allowed bg-red-900' : 'hover:bg-red-700',
        'bg-red-600 text-white rounded-md py-3 w-full  transition-colors'
      )}
      onClick={login}
      {...props}>
      {variant === 'login' ? 'Sign In' : 'Register'}
    </button>
  );
};

export default ButtonAuth;