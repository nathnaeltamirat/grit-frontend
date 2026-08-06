import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import '../index.css';
import { CheckCircleIcon, CommandIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { registerFormInput, registerSchema } from '../schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUp } from '../api/hooks/useAuth';
import { Link } from '@tanstack/react-router';
export const Route = createLazyFileRoute('/register')({
  component: RegisterComponent,
});

function RegisterComponent() {
  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm<registerFormInput>({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });
  const signup = useSignUp();
  const navigate = useNavigate();
  const submit = (data: registerFormInput) => {
    signup.mutate(data, {
      onSuccess: () => {
        reset();
        navigate({
          to: '/',
        });
      },
    });
  };

  return (
    <>
      <div className="flex items-center font-sans flex-row bg-[#0E0E0E] w-full min-h-screen ">
        {/* Left side informative div */}
        <div className="hidden md:block flex-1 md:p-12">
          <div className="flex gap-2 items-center font-label w-fit p-2   rounded-4xl m-4 bg-[#2A2A2A] text-[#C4C7BE]">
            <CommandIcon className="w-4 h-4" />
            VERSION 1.0.0-beta
          </div>
          <h1 className="text-[#ffffff] text-5xl m-4 font-sans w-[90%]  ">
            Log the annoyance. Score the fix.
          </h1>
          <p className="font-sans w-[90%] text-[#888888] m-4 ">
            Turn one-line workflow friction into researched alternatives and
            prioritized resolution plans.
          </p>
          <div className="flex flex-row gap-6 w-[90%] m-4 mt-9 ml-3">
            <div className="flex flex-col items-center">
              <div className="w-px h-2 bg-[#2A2A2A]"></div>
              <div className="w-1 rounded-full bg-[#FFB4AB] h-1"></div>
              <div className="w-px h-8 bg-[#2A2A2A]"></div>
            </div>
            <div className="flex flex-col w-[90%] ">
              <p className="text-[#FFB4AB]">CRITICAL FRICTION</p>
              <p className="text-[#ffffff]">
                "Manual staging deploys waste 20 minutes every morning due to
                missing environment scripts."
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-6 w-[90%] m-4 mt-9 ml-3">
            <div className="flex flex-col items-center">
              <div className="w-px h-2 bg-[#2A2A2A]"></div>
              <div className="w-1 rounded-full bg-[#6D6C6B] h-1"></div>
              <div className="w-px h-8 bg-[#2A2A2A]"></div>
            </div>
            <div className="flex flex-col w-[90%] ">
              <p className="text-[#6D6C6B]">REFACTOR LOG</p>
              <p className="text-[#6D6C6B]">
                "Grit analyzed 3 CLI options. Score: 8.4/10 — Automating saves
                ~8 hrs/month."
              </p>
            </div>
          </div>
        </div>
        {/*Middle div*/}
        <div className="hidden md:block bg-[#3A3D3D] w-px self-stretch"></div>
        <div className="flex-1  flex-col md:ml-24 p-12 items-center">
          <div className="flex flex-row items-center gap-2">
            <CheckCircleIcon className="w-12 h-8 text-[#FFB4AB]" />
            <h1 className="text-4xl font-bold text-[#ffffff]">Grit</h1>
          </div>
          <h1 className="text-[#ffffff]  text-1xl font-bold my-3 ">
            Create an account
          </h1>
          <p className="text-[#888888] ">
            Enter your details to capture friction and generate research
            insights.
          </p>
          <form
            onSubmit={handleSubmit(submit)}
            className="my-8 w-full md:w-[80%]"
          >
            <div className="flex flex-col gap-1">
              <label
                className=" font-label text-[#888888] font-bold "
                htmlFor="full_name"
              >
                FULL NAME
              </label>
              <input
                type="text"
                placeholder="Nathnael Tamirat"
                id="full_name"
                {...register('full_name')}
                className="border-[#3D4041] text-[#ffffff] border-2 rounded-1xl py-2 px-4 placeholder-[#7f7979]"
              />
              {errors.full_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.full_name.message}
                </p>
              )}
            </div>
            <div className="flex flex-col my-4 gap-1">
              <label
                className=" font-label text-[#888888] font-bold "
                htmlFor="email"
              >
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                placeholder="nathnaeltamirat3@gmail.com"
                id="email"
                {...register('email')}
                className="border-[#3D4041] text-[#ffffff] border-2 rounded-1xl py-2 px-4 placeholder-[#7f7979]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col my-4 gap-1">
              <label
                className=" font-label text-[#888888] font-bold "
                htmlFor="password"
              >
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="********"
                id="password"
                {...register('password')}
                className="border-[#3D4041] text-[#ffffff] border-2 rounded-1xl py-2 px-4 placeholder-[#7f7979]"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            {signup.isError && (
              <p className="text-red-500 text-sm mt-3">
                {signup.error.message}
              </p>
            )}
            <button
              type="submit"
              disabled={signup.isPending}

              className={`  transition duration-300    w-full px-4 py-2 text-1xl font-semibold rounded-1xl ${
                signup.isPending
                  ? ' cursor-not-allowed opacity-50'
                  : 'bg-[#ffffff] hover:cursor-pointer text-[#1A1C1C] hover:bg-[#1A1C1C] hover:text-[#ffffff]'
              }`}
            >
              {signup.isPending ? (
                <span className="flex justify-center items-center text-[#ffffff] gap-2">
                  <span className="w-4 h-4 border-2 border-t-transparent border-[#FFB4AB] rounded-full animate-spin"></span>
                  Creating account...
                </span>
              ) : (
                'Create Account '
              )}
            </button>
            <p className="my-10 text-center text-[#888888]">
              Alreay have an account?{' '}
              <Link
                to="/login"
                className="text-[#ffffff] hover:cursor-pointer font-semibold"
              >
                Log in instead
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
