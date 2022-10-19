import { Link } from 'react-router-dom';
export default function UserItem(props: {
  user: { login: string; avatar_url: string };
}) {
  return (
    <div className='card shadow-md compact side bg-base-100'>
      <div className='flex-row items-center space-x-4 card-body'>
        <div>
          <div className='avatar'>
            <div className='rounded-full shadow w-14 h-14'>
              <img
                src={props.user.avatar_url}
                alt='Profile Pic'
              />
            </div>
          </div>
          <div>
            <h2 className='card-title'>{props.user.login}</h2>
            <Link
              className='text-base-content text-opacity-40'
              to={`/user/${props.user.login}`}
            >
              Visit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
