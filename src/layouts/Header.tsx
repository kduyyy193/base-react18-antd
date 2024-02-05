import { Dropdown, MenuProps, Select } from 'antd';
import classNames from 'classnames';
import { routerLinks } from 'common/routerLinks';
import { useStateContext } from 'contexts/ContextProvider';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import us from 'assets/svg/us.svg';
import vn from 'assets/svg/vn.svg';
import avatar from 'assets/images/avatar.jpeg';
import { Avatar } from 'components';

const Header = ({ isCollapsed, isDesktop }: { isCollapsed: boolean; isDesktop: boolean }) => {
  const { user, logout, changeLanguage } = useStateContext();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div onClick={() => navigate(routerLinks('MyProfile'), { replace: true })}>My Profile</div>
      ),
    },
    {
      key: '2',
      label: (
        <div
          onClick={() => {
            logout();
            navigate(routerLinks('Login'), { replace: true });
          }}
        >
          Sign Out
        </div>
      ),
    },
  ];

  if (['en', 'vi'].indexOf(i18n.language) === -1) {
    if (i18n.language === 'vi-VN') {
      changeLanguage('vi');
    } else {
      changeLanguage('en');
    }
  }

  return (
    <header
      className={classNames(
        'bg-blue-50 w-full header h-20 transition-all duration-300 ease-in-out sticky top-0 block z-10',
        {
          'pl-52': !isCollapsed && isDesktop,
          'pl-32': isCollapsed && isDesktop,
          'pl-28': !isDesktop,
        }
      )}
    >
      <div className="flex items-center justify-end sm:justify-between px-5 h-20">
        <Select
          className="h-[42px]"
          defaultValue={'en'}
          value={i18n.language}
          onChange={(value) => changeLanguage(value)}
        >
          <Select.Option value="en">
            <img src={us} alt="US" className="mr-1 w-4 inline-block relative -top-0.5" /> English
          </Select.Option>
          <Select.Option value="vi">
            <img src={vn} alt="VN" className="mr-1 w-4 inline-block relative -top-0.5" /> Vietnam
          </Select.Option>
        </Select>
        <div className="flex items-center">
          <div className="mr-5 relative flex group">
            <div className="rounded-full text-white w-5 h-5 bg-blue-400 absolute -right-1.5 -top-1.5 leading-none text-center pt-1 text-xs group-hover:animate-bounce">
              4
            </div>
            <i className="las la-bell text-4xl text-gray-500" />
          </div>
          <div className="mr-5 relative flex group">
            <div className="rounded-full text-white w-5 h-5 bg-yellow-500 absolute -right-1.5 -top-1.5 leading-none text-center pt-1 text-xs group-hover:animate-bounce">
              76
            </div>
            <i className="las la-comment text-4xl text-gray-500" />
          </div>
          <Dropdown trigger={['hover', 'click']} menu={{ items }} placement="bottomRight">
            <section className="flex items-center" id={'dropdown-profile'}>
              <div className="text-right leading-none mr-3 hidden sm:block">
                <div className="font-bold text-black text-lg leading-snug mb-0.5">{user?.name}</div>
                <div className="text-gray-500">{user?.email}</div>
              </div>
              <Avatar src={avatar} size={10} />
            </section>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
