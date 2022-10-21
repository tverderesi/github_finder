import { useState, useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';
import GHContext from '../../context/github/GithubContext';
import { searchUsers } from '../../context/github/GithubActions';

export default function UserSearch() {
  const [text, setText] = useState('');

  const { users, dispatch } = useContext(GHContext);
  const { setAlert } = useContext(AlertContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text === '') {
      setAlert('Please enter an username to search!', 'error ');
    } else {
      dispatch({ type: 'SET_LOADING' });
      const users = await searchUsers(text);
      dispatch({ type: 'GET_USERS', payload: users });

      setText('');
    }
  };
  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <div className=''>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <div className='relative'>
              <input
                type='text'
                className='w-full pr-40 bg-gray-200 input input-lg text-black'
                placeholder='Search'
                value={text}
                onChange={handleChange}
              />
              <button
                type='submit'
                className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div className=''>
          <button
            className='btn-ghost btn-lg'
            onClick={() => {
              dispatch({ type: 'CLEAR_USERS' });
            }}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
