import { createLazyFileRoute, Link } from '@tanstack/react-router';
import '../index.css';
import {
  CheckCircleIcon,
  LayoutDashboardIcon,
  LightbulbIcon,
  LockIcon,
  MenuIcon,
  SettingsIcon,
  VerifiedIcon,
  XIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { useAuthContext } from '../providers/AuthProvider';
import {
  useAPIUpdate,
  useUpdatePassword,
  useUpdateProfile,
} from '../api/hooks/useSetting';

export const Route = createLazyFileRoute('/setting')({
  component: SettingComponent,
});

function SettingComponent() {
  const [navToggle, setNavToggle] = useState(false);
  const [accountEdit, setAccountEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [apiKeyEdit, setapiKeyEdit] = useState(false);
  const { status, data } = useAuthContext();
  const [updateProfileError, setUpdateProfileError] = useState<
    string | null | undefined
  >(null);
  const [updatePasswordError, setUpdatePasswordError] = useState<
    string | null | undefined
  >(null);
  const [updateAPIKeyError, setUpdateAPIKeyError] = useState<
    string | null | undefined
  >(null);
  const [email, setEmail] = useState<string | undefined>('');
  const [name, setName] = useState<string | undefined>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setconfirmPassword] = useState<string>('');

  const [rawApiKey, setRawApiKey] = useState<string>('');
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSucess] = useState(false);
  const [apiSuccess, setApiSuccess] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const apiKeyRef = useRef<HTMLInputElement>(null);
  console.log(status);
  useEffect(() => {
    if (status == 'authed' && !accountEdit) {
      setEmail(data?.data.user.email);
      setName(data?.data.user.full_name);
    }
    if (accountEdit) {
      emailRef.current?.focus();
    }
    if (passwordEdit) {
      passwordRef.current?.focus();
    }
    if (apiKeyEdit) {
      apiKeyRef.current?.focus();
    }
  }, [status, data, accountEdit, passwordEdit, apiKeyEdit]);

  const { mutate, isPending, error: profileError } = useUpdateProfile();
  const {
    mutate: passwordMutate,
    isPending: isPasswordPending,
    error: passwordErrror,
  } = useUpdatePassword();
  const {
    mutate: apiMutate,
    isPending: isAPIPending,
    error: apiError,
  } = useAPIUpdate();

  const handleUpdatePassword = () => {
    if (oldPassword && newPassword && confirmPassword) {
      const body = {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      };

      passwordMutate(body, {
        onSuccess: () => {
          setPasswordSucess(true);
          setTimeout(() => {
            setPasswordSucess(false);
            setPasswordEdit(false);
            setNewPassword('');
            setOldPassword('');
            setconfirmPassword('');
          }, 2000);
        },
        onError: () => {
          setUpdatePasswordError(passwordErrror?.message);
        },
      });
    } else if (newPassword != oldPassword) {
      setUpdatePasswordError("Passwords doesn't match");
    } else {
      setUpdatePasswordError("Field can't be empty");
    }
  };
  const handleUpdateProfile = () => {
    if (name && email) {
      const body = {
        full_name: name,
        email,
      };
      setUpdateProfileError(null);
      mutate(body, {
        onSuccess: () => {
          setProfileSuccess(true);
          setTimeout(() => {
            setNewPassword('');
            setconfirmPassword('');
            setOldPassword('');
            setProfileSuccess(false);
            setAccountEdit(false);
          }, 2000);
        },
        onError: () => {
          setUpdateProfileError(profileError?.message);
        },
      });
    } else {
      setUpdateProfileError("Field can't be empty");
    }
  };
  const handleUpdateAPI = () => {
    if (rawApiKey) {
      const body = {
        ai_api_key: rawApiKey,
      };
      setUpdateAPIKeyError(null);
      apiMutate(body, {
        onSuccess: () => {
          setApiSuccess(true);
          setTimeout(() => {
            setRawApiKey('');
            setApiSuccess(false);
            setapiKeyEdit(false);
          }, 2000);
        },
        onError: () => {
          setUpdateAPIKeyError(apiError?.message);
        },
      });
    } else {
      setUpdateAPIKeyError("Field can't be empty");
    }
  };

  return (
    <>
      {status == 'authed' || status == 'loading' ? (
        <div className="w-full relative min-h-screen font-sans bg-[#0e0e0e]">
          {/*Mobile view */}

          {/* closed */}
          <aside
            className={` w-full bg-[#0e0e0e]   left-0  sticky flex-col top-0 z-40  md:hidden ${navToggle ? 'hidden' : 'flex'}`}
          >
            <div className="flex flex-row py-3 items-center gap-4">
              <MenuIcon
                onClick={() => setNavToggle((prev) => !prev)}
                className="w-10 hover:cursor-pointer h-8 text-[#FFB4AB]"
              />

              <div className="flex flex-row p-2 py-4  items-center">
                <CheckCircleIcon className="w-12 h-8 text-[#FFB4AB]" />
                <div className="flex flex-col">
                  <h1 className="text-white  text-2xl font-semibold">Grit</h1>
                  <p className="text-[#C4C7BE]">v1.0.0-beta</p>
                </div>
              </div>
            </div>

            <div className=" bg-[#3A3D3D] w-full  h-px "></div>
          </aside>
          {/* Open */}
          <aside
            className={`fixed inset-0  bg-[#0e0e0e]/60 backdrop-blur-md shadow-xl z-50  md:hidden  flex-col  ${navToggle ? 'flex' : 'hidden'}`}
          >
            <div className="w-[75%] bg-[#0e0e0e] min-h-screen ">
              <div className="flex flex-row p-2 py-4  items-center">
                <CheckCircleIcon className="w-12 h-8 text-[#FFB4AB]" />
                <div className="flex flex-col">
                  <h1 className="text-white  text-2xl font-semibold">Grit</h1>
                  <p className="text-[#C4C7BE]">v1.0.0-beta</p>
                </div>
                <XIcon
                  onClick={() => setNavToggle((prev) => !prev)}
                  className="w-10 ml-auto hover:cursor-pointer h-8 text-[#FFB4AB]"
                />
              </div>
              <div className=" bg-[#3A3D3D] w-full  h-px "></div>
              <nav className="my-12  ">
                <Link
                  to="/"
                  className="flex my-1 p-2 hover:cursor-pointer hover:bg-[#404040] text-white gap-2 items-center justify-content"
                >
                  <LayoutDashboardIcon className="w-10 h-6" />
                  <p>Frictions</p>
                </Link>
                <Link
                  to="/insights"
                  className="flex my-1 p-2 hover:cursor-pointer hover:bg-[#404040] text-white gap-2 items-center justify-content"
                >
                  <LightbulbIcon className="w-10 h-6" />
                  <p>Insights</p>
                </Link>
                <Link
                  to="/setting"
                  className="flex p-2 my-1 bg-[#2A2A2A] hover:cursor-pointer hover:bg-[#404040] text-white gap-2 items-center justify-content"
                >
                  <SettingsIcon className="w-10 h-6" />
                  <p>Setting</p>
                </Link>
              </nav>
            </div>
          </aside>

          <div className="flex flex-row  min-h-screen">
            {/* Desktop view */}
            <aside className="sticky top-0 w-64 h-screen md:block hidden flex-col">
              <div className="flex flex-row p-2 py-4  items-center">
                <CheckCircleIcon className="w-12 h-8 text-[#FFB4AB]" />
                <div className="flex flex-col">
                  <h1 className="text-white  text-2xl font-semibold">Grit</h1>
                  <p className="text-[#C4C7BE]">v1.0.0-beta</p>
                </div>
              </div>
              <nav className="my-12  ">
                <Link
                  to="/"
                  className="flex my-1 p-2 hover:cursor-pointer hover:bg-[#404040] text-white gap-2 items-center justify-content"
                >
                  <LayoutDashboardIcon className="w-10 h-6" />
                  <p>Frictions</p>
                </Link>
                <Link
                  to="/insights"
                  className="flex my-1 p-2 hover:cursor-pointer hover:bg-[#404040] text-white gap-2 items-center justify-content"
                >
                  <LightbulbIcon className="w-10 h-6" />
                  <p>Insights</p>
                </Link>
                <Link
                  to="/setting"
                  className="flex p-2 my-1 bg-[#2A2A2A] hover:cursor-pointer hover:bg-[#404040] text-white gap-2 items-center justify-content"
                >
                  <SettingsIcon className="w-10 h-6" />
                  <p>Setting</p>
                </Link>
              </nav>
            </aside>

            <div className="hidden md:block bg-[#3A3D3D] w-px self-stretch"></div>
            <div className="flex flex-col min-w-0 flex-1 ml-10 mt-8">
              <h1 className="text-white font-bold text-3xl ">
                Profile Settings
              </h1>
              <p className="text-[#C4C7C8]">
                Manage your identity, security credentials, and third-party
                developer integrations.
              </p>
              <div className="border mt-12 border-[#444748] p-4 py-6">
                {/* Acount label div*/}
                <div className="flex flex-wrap gap-2  justify-between">
                  <div className="flex gap-2 items-center">
                    <p className="text-white text-xs md:text-xl">[ 01 ]</p>
                    <h1 className="text-white font-bold md:text-2xl ">
                      Account Information
                    </h1>
                  </div>
                  {!accountEdit && (
                    <button
                      onClick={() => {
                        setUpdateProfileError('');
                        setAccountEdit(true);
                      }}
                      className="bg-[#201F1F] md:text-md text-xs  md:px-8 py-1 px-2 opacity-90 hover:cursor-pointer border-[#444748] border-2 rounded text-[#ffffff] "
                    >
                      Edit
                    </button>
                  )}
                </div>

                {/*Email address */}
                <div className="mt-8">
                  <label
                    htmlFor="email"
                    className="text-[#C4C7C8] text-sm font-semibold"
                  >
                    EMAIL ADDRESS
                  </label>
                  <div className="border-2 bg-[#201F1F] items-center flex justify-between border-[#444748] rounded p-2  ">
                    {!accountEdit ? (
                      <>
                        <input
                          type="email"
                          className=" min-w-0 turncate  text-sm text-[#c4c7c8]  focus:outline-none"
                          value={email}
                          id="email"
                          readOnly
                        />
                        <VerifiedIcon className="w-8 h-4 text-[#C4C7C8]" />
                      </>
                    ) : (
                      <input
                        type="email"
                        ref={emailRef}
                        className=" text-sm min-w-0 turncate  text-[#c4c7c8]  focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                      />
                    )}
                  </div>
                </div>
                {/*Display Name */}
                <div className="mt-4">
                  <label
                    htmlFor="name"
                    className="text-[#C4C7C8] text-sm font-semibold"
                  >
                    DISPLAY NAME
                  </label>
                  <div className="border-2 bg-[#201F1F] items-center flex justify-between border-[#444748] rounded p-2  ">
                    {!accountEdit ? (
                      <input
                        type="text"
                        className=" min-w-0 turncate text-sm text-[#c4c7c8]  focus:outline-none"
                        value={name}
                        id="name"
                      />
                    ) : (
                      <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        className=" min-w-0 turncate text text-sm text-[#c4c7c8]  focus:outline-none"
                        value={name}
                        id="name"
                      />
                    )}
                  </div>
                </div>
                {updateProfileError && (
                  <p className=" mt-2 text-red-500">{updateProfileError}</p>
                )}
                {profileSuccess && (
                  <p className="mt-2 text-green-500">Updated Successfully</p>
                )}
                {/* Cancel and Save */}
                {accountEdit && (
                  <>
                    <div className="flex justify-end gap-2 mt-10">
                      <button
                        onClick={() => {
                          setAccountEdit(false);
                          setUpdateProfileError(null);
                          setProfileSuccess(false);
                        }}
                        className="bg-[#201F1F] py-1 p-2 md:px-8 opacity-90 hover:cursor-pointer border-[#444748] border-2 rounded text-[#ffffff] "
                      >
                        CANCEL
                      </button>
                      <button
                        onClick={handleUpdateProfile}
                        className={` md:px-8 py-1 px-2  border-[#444748] border-2 rounded text-[#2F3131] ${!isPending ? ' bg-[#ffffff] opacity-90 hover:cursor-pointer' : 'opacity-50 bg-[#ffffff] hover:cursor-not-allowed'} `}
                      >
                        {isPending ? 'Saving Changes...' : 'SAVE CHANGES'}
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/*Security Auth */}
              <div className="border mt-12 border-[#444748] p-4 py-6">
                <div className="flex flex-wrap gap-2  justify-between">
                  <div className="flex gap-2 items-center">
                    <p className="text-white text-sm md:text-xl">[ 02 ]</p>
                    <h1 className="text-white font-bold md:text-2xl ">
                      Security & Auth
                    </h1>
                  </div>
                  {!passwordEdit && (
                    <button
                      onClick={() => {
                        setPasswordEdit(true);
                        setUpdatePasswordError('');
                      }}
                      className="bg-[#201F1F] md:text-md text-xs py-1  px-2 md:px-8 opacity-90 hover:cursor-pointer border-[#444748] border-2 rounded text-[#ffffff] "
                    >
                      Edit
                    </button>
                  )}
                </div>

                {/*OLD PASSWORD */}
                <div className="mt-8">
                  <label
                    htmlFor="password"
                    className="text-[#C4C7C8] text-sm font-semibold"
                  >
                    OLD PASSWORD
                  </label>
                  <div className="border-2 bg-[#201F1F] items-center flex justify-between border-[#444748] rounded p-2  ">
                    <input
                      ref={passwordRef}
                      type="password"
                      className=" text-sm text-[#c4c7c8]  focus:outline-none"
                      value={passwordEdit ? oldPassword : ''}
                      placeholder="********"
                      id="password"
                      onChange={(e) => {
                        setOldPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
                {/*New Password */}
                <div className="mt-4">
                  <label
                    htmlFor="new_password"
                    className="text-[#C4C7C8] text-sm font-semibold"
                  >
                    NEW PASSWORD
                  </label>
                  <div className="border-2 bg-[#201F1F] items-center flex justify-between border-[#444748] rounded p-2  ">
                    <input
                      type="password"
                      className=" text-sm text-[#c4c7c8]  focus:outline-none"
                      value={passwordEdit ? newPassword : ''}
                      placeholder="********"
                      id="new_password"
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>

                {/*confirmPassword */}
                <div className="mt-4">
                  <label
                    htmlFor="confirm_password"
                    className="text-[#C4C7C8] text-sm font-semibold"
                  >
                    CONFIRM PASSWORD
                  </label>
                  <div className="border-2 bg-[#201F1F] items-center flex justify-between border-[#444748] rounded p-2  ">
                    <input
                      type="password"
                      className=" text-sm text-[#c4c7c8]  focus:outline-none"
                      value={passwordEdit ? confirmPassword : ''}
                      placeholder="********"
                      id="confirm_password"
                      onChange={(e) => {
                        setconfirmPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
                {updatePasswordError && (
                  <p className=" mt-2 text-red-500">{updatePasswordError}</p>
                )}
                {passwordSuccess && (
                  <p className="mt-2 text-green-500">Updated Successfully</p>
                )}

                {/* Cancel and Save */}
                {passwordEdit && (
                  <>
                    <div className="flex justify-end gap-2 mt-10">
                      <button
                        onClick={() => {
                          setPasswordSucess(false);
                          setNewPassword('');
                          setconfirmPassword('');
                          setOldPassword('');
                          setPasswordEdit(false);
                        }}
                        className="bg-[#201F1F] py-1  px-2 md:px-8 opacity-90 hover:cursor-pointer border-[#444748] border-2 rounded text-[#ffffff] "
                      >
                        CANCEL
                      </button>
                      <button
                        onClick={handleUpdatePassword}
                        className={` py-1 px-2 md:px-8  border-[#444748] border-2 rounded text-[#2F3131] ${!isPending ? ' bg-[#ffffff] opacity-90 hover:cursor-pointer' : 'opacity-50 bg-[#ffffff] hover:cursor-not-allowed'} `}
                      >
                        {isPasswordPending
                          ? 'UPDATING PASSWORD...'
                          : 'UPDATE PASSWORD'}
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/*GROQ API KEY */}
              <div className="border mt-12 border-[#444748] p-4 py-6 mb-3">
                <div className="flex flex-wrap gap-2 justify-between">
                  <div className="flex gap-2 items-center">
                    <p className="text-white text-sm md:text-xl">[ 03 ]</p>
                    <h1 className="text-white font-bold md:text-2xl ">
                      Groq API Key
                    </h1>
                  </div>

                  {!apiKeyEdit && (
                    <button
                      onClick={() => {
                        setapiKeyEdit(true);
                        setUpdateAPIKeyError('');
                      }}
                      className="bg-[#201F1F] md:text-md text-xs py-1  px-2 md:px-8 opacity-90 hover:cursor-pointer border-[#444748] border-2 rounded text-[#ffffff] "
                    >
                      CHANGE KEY
                    </button>
                  )}
                </div>
                <p className="text-[#c4c7c8] mt-1 text-xs">
                  Used to power on-demand AI reflections, root cause scoring,
                  and project suggestions.
                </p>

                {/*api key */}

                <div className="mt-4">
                  {apiKeyEdit ? (
                    <>
                      {' '}
                      <label
                        htmlFor="confirm_password"
                        className="text-[#C4C7C8] text-sm font-semibold"
                      >
                        New Groq API Key
                      </label>
                      <div className="border-2 bg-[#201F1F] items-center flex justify-between border-[#444748] rounded p-2  ">
                        <input
                          type="password"
                          ref={apiKeyRef}
                          className=" text-sm text-[#c4c7c8]  focus:outline-none"
                          value={rawApiKey}
                          placeholder="gsk_..."
                          id="confirm_password"
                          onChange={(e) => {
                            setRawApiKey(e.target.value);
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex gap-4 flex-wrap  py-1 px-2 border-[#444748]">
                        <p className="text-[#c4c7c8] min-w-0 truncate">
                          {data?.data.user.ai_api_key
                            ? 'Hashed key configured'
                            : 'Not configured'}
                        </p>
                        <p className="text-[#444748]">GROK API KEY</p>
                      </div>
                    </>
                  )}

                  <div className="flex gap-2 items-center mt-1">
                    <LockIcon className="w-4 h-6 text-[#c4c7c8]" />
                    <p className="text-[#c4c7c8]  text-xs">
                      Your API key is hashed in our server,and protected.
                    </p>
                  </div>
                </div>
                {updateAPIKeyError && (
                  <p className=" mt-2 text-red-500">{updatePasswordError}</p>
                )}
                {apiSuccess && (
                  <p className="mt-2 text-green-500">Updated Successfully</p>
                )}

                {/* Cancel and Save */}
                {apiKeyEdit && (
                  <>
                    <div className="flex justify-end gap-2 mt-10">
                      <button
                        onClick={() => {
                          setApiSuccess(false);
                          setRawApiKey('');
                          setapiKeyEdit(false);
                        }}
                        className="bg-[#201F1F] py-1  px-2 md:px-8 opacity-90 hover:cursor-pointer border-[#444748] border-2 rounded text-[#ffffff] "
                      >
                        CANCEL
                      </button>
                      <button
                        onClick={handleUpdateAPI}
                        className={` py-1 px-2 md:px-8  border-[#444748] border-2 rounded text-[#2F3131] ${!isPending ? ' bg-[#ffffff] opacity-90 hover:cursor-pointer' : 'opacity-50 bg-[#ffffff] hover:cursor-not-allowed'} `}
                      >
                        {isAPIPending ? 'Saving...' : 'Verify and Save'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Unauthorizd</p>
      )}
    </>
  );
}
