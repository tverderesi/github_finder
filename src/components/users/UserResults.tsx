import { useContext } from 'react';
import GHContext from '../../context/github/GithubContext';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';

export default function UserResults() {
  const { users, loading } = useContext(GHContext);

  if (!loading) {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {users.map((user: any) => {
          return (
            <UserItem
              key={user.id}
              user={user}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <h3>
        <Spinner />
      </h3>
    );
  }
}
