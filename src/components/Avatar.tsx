import classNames from 'classnames';
import { getFirstLetter } from 'utils';

type AvatarProps = {
  onClick?: () => void;
  text?: string;
  src: string;
  showName?: boolean;
  size?: number;
  index?: number;
};

const Avatar = ({ onClick, text, src, showName, size, index = 0 }: AvatarProps) => (
  <div onClick={onClick} className={classNames({ 'flex items-center': showName })}>
    {!text || (src && src.indexOf('/defaultAvatar.png') === -1) ? (
      <div className={classNames({ '-ml-2': index > 0 })}>
        <img
          className={classNames('rounded-xl object-cover object-center', 'h-' + size, 'w-' + size)}
          src={src}
          alt="Avatar"
        />
      </div>
    ) : (
      <div
        className={classNames(
          'rounded-xl inline-block text-center',
          'w-' + size,
          'h-' + size,
          'leading-' + size,
          {
            '-ml-2': index > 0,
          }
        )}
      >
        <strong>{getFirstLetter(text)}</strong>
      </div>
    )}
    {!!showName && !!text && (
      <span className={classNames('ml-1', { 'link-click': !!onClick })}>{text}</span>
    )}
  </div>
);

export default Avatar;
