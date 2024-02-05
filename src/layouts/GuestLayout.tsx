import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from 'contexts/ContextProvider';
import { useTranslation } from 'react-i18next';
import logo from 'assets/svg/logo.svg';

const GuestLayout = () => {
  const { token, changeLanguage } = useStateContext();
  const { i18n } = useTranslation();

  if (token) {
    return <Navigate to={'/'} />;
  }

  if (['en', 'vi'].indexOf(i18n.language) === -1) {
    if (i18n.language === 'vi-VN') {
      changeLanguage('vi');
    } else {
      changeLanguage('en');
    }
  }

  return (
    <div>
      <div className="flex w-screen h-screen flex-col ">
        <div className="flex justify-center content-center bg-primary-blue py-4">
          <div className="logo w-[40px] mr-4">
            <img src={logo} className="w-full h-auto" />
          </div>
          <div className="flex items-center ">
            <h1 className="text-2xl text-center text-primary-yellow">
              14/12 Than Nhan Trung, Ward 13, Tan Binh District, Ho Chi Minh City
            </h1>
          </div>
        </div>
        <div className="flex justify-center content-center mt-24">
          <h1 className="text-6xl text-primary-lightblue font-semibold">Levinci Software</h1>
        </div>
        <div className="mt-24">{<Outlet />}</div>
      </div>
    </div>
  );
};

export default GuestLayout;
