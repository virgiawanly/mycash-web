import authBg from '@/assets/images/auth-bg.jpg';
import logo from '@/assets/images/logo-default.svg';
import ToggleThemeDropdown from '@/components/shared/dropdowns/ToggleThemeDropdown';
import { useThemeStore } from '@/store/useThemeStore';
import { Toaster } from 'sonner';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <>
      <Toaster position="top-right" theme={theme} richColors duration={2500} />
      <div className="grid min-h-screen w-full md:grid-cols-12">
        <div className="h-0 md:col-span-6 md:h-full lg:col-span-7">
          <div className="relative flex h-full items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 to-blue-900 opacity-50"></div>
            <img src={authBg} alt="auth-bg" className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="min-h-screen flex flex-col md:col-span-6 lg:col-span-5 relative">
          <div className="absolute top-8 right-8">
            {/* Toggle Theme Dropdown */}
            <ToggleThemeDropdown />
          </div>
          <div className="mx-auto flex h-full w-full max-w-xl flex-1 flex-col justify-center gap-3 p-12">
            <img src={logo} className="h-auto w-12" />
            <div className="mb-3 flex flex-col gap-1 py-3">
              <h1 className="text-4xl font-semibold">Welcome Back!</h1>
              <p className="text-content2">Please sign in to your account</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
