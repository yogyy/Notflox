import { signIn } from 'next-auth/react';
import { Github, Google } from '@/components/icons';

const OAuth: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => {
  return (
    <div
      className="flex flex-row items-center justify-center gap-4 mt-4"
      {...props}>
      <button
        type="button"
        onClick={() => signIn('google', { callbackUrl: '/profiles' })}
        className="flex items-center justify-center w-10 h-10 transition bg-transparent rounded-full cursor-pointer hover:brightness-50">
        <Google size="30px" />
      </button>
      <button
        type="button"
        onClick={() => signIn('github', { callbackUrl: '/profiles' })}
        className="flex items-center justify-center w-10 h-10 transition bg-transparent rounded-full cursor-pointer hover:brightness-50">
        <Github size="30px" className="stroke-white " />
      </button>
    </div>
  );
};

export default OAuth;
