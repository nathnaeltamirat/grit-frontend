import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { CheckCircleIcon, CommandIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { loginFormInput, loginSchema } from '../schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';

import '../index.css';
import { useLogin } from '../api/hooks/useAuth';
export const Route = createLazyFileRoute('/login')({
  component: loginComponent,
});

function loginComponent() {
  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm<loginFormInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });
  const login = useLogin();
  const navigate = useNavigate();
  const submit = (data: loginFormInput) => {
    login.mutate(data, {
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
      <div className="flex  items-center font-sans flex-row bg-[#0E0E0E] w-full min-h-screen ">
        {/* Left side informative div */}

        <div className="hidden md:block my-8  flex-1 md:p-12">
          <div className="flex gap-2 items-center font-label w-fit p-2   rounded-4xl m-4 bg-[#2A2A2A] text-[#C4C7BE]">
            <CommandIcon className="w-4 h-4" />
            VERSION 1.0.0-beta
          </div>
          <h1 className="text-[#ffffff] text-5xl m-4 font-sans w-[90%]  ">
            Turn workflow friction into actionable options.
          </h1>

          <div className="flex flex-row items-center justify-center gap-6 w-[90%] m-4 mt-9 ml-3">
            <div className="text-[#FFFFFF] text-2xl font-label font-semibold">
              01
            </div>
            <div className="flex flex-col  w-[90%] ">
              <p className="text-[#FFFFFF]">RESEARCH ALTERNATIVES</p>
              <p className="text-[#C4C7C8]">
                Stop writing custom code for problems with existing solutions.
                Grit surveys real-world tools so you don't reinvent the wheel.
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center gap-6 w-[90%] m-4 mt-9 ml-3">
            <div className="text-[#FFFFFF] text-2xl font-label font-semibold">
              02
            </div>
            <div className="flex flex-col  w-[90%] ">
              <p className="text-[#FFFFFF]">PRIORITIZE RESOLUTION</p>
              <p className="text-[#C4C7C8]">
                Receive a clear feasibility score and step-by-step plan for
                every gap logged
              </p>
            </div>
          </div>
        </div>
        {/*Middle div*/}
        <div className="hidden md:block bg-[#3A3D3D] w-px self-stretch"></div>

        {/* Right div */}
        <div className="flex-1  flex-col md:ml-24 p-12 items-center">
          <div className="flex flex-row items-center gap-2">
            <CheckCircleIcon className="w-12 h-8 text-[#FFB4AB]" />
            <h1 className="text-4xl font-bold text-[#ffffff]">Grit</h1>
          </div>

          <h1 className="text-[#ffffff]  text-1xl font-bold my-3 ">
            Welcome back
          </h1>
          <p className="text-[#888888] ">
            Enter your details to access your logged friction, research, and
            resolution plans
          </p>
          <form
            onSubmit={handleSubmit(submit)}
            className="my-8 w-full md:w-[80%]"
          >
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
            {login.isError && (
              <p className="text-red-500 text-sm mt-3">{login.error.message}</p>
            )}
            <button
              type="submit"
              disabled={login.isPending}

              className={`  transition duration-300    w-full px-4 py-2 text-1xl font-semibold rounded-1xl ${
                login.isPending
                  ? ' cursor-not-allowed opacity-50'
                  : 'bg-[#ffffff] hover:cursor-pointer text-[#1A1C1C] hover:bg-[#1A1C1C] hover:text-[#ffffff]'
              }`}
            >
              {login.isPending ? (
                <span className="flex justify-center items-center text-[#ffffff] gap-2">
                  <span className="w-4 h-4 border-2 border-t-transparent border-[#FFB4AB] rounded-full animate-spin"></span>
                  Logging in...
                </span>
              ) : (
                'Log in '
              )}
            </button>
            <p className="my-10 text-center text-[#888888]">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-[#ffffff] hover:cursor-pointer font-semibold"
              >
                Sign up instead
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
