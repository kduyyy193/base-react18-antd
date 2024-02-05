import classNames from 'classnames';

type ButtonProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  type?: string;
  htmlType?: string;
};

const Button = ({ id, children, title, type, className, onClick }: ButtonProps) => {
  return (
    <button
      id={id}
      className={classNames(
        `btn w-full flex items-center justify-center text-sm active:opacity-75 h-10 bg-primary-blue min-w-20 ${className || ''}`,
        {
          'bg-blue-500 text-white font-bold cursor-pointer': !type || type === 'submit',
          'text-blue-500 bg-white font-bold shadow-md cursor-pointer': type === 'cancel',
          'text-blue-500 bg-white font-medium shadow-sm cursor-pointer': type === 'other',
          '!text-neutral-400 !bg-neutral-200 font-semibold': type === 'disabled',
        }
      )}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClick && onClick(e)}
    >
      <span className="btn-text">{children || title}</span>
    </button>
  );
};

export default Button;
