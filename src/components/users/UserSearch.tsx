import { useState, useContext } from 'react';
import GHContext from '../../context/github/GithubContext';

export default function UserSearch() {
  const [text, setText] = useState('');

  const { users, searchUsers } = useContext(GHContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text === '') {
      alert('Please enter smth');
    } else {
      searchUsers(text);
      console.log(users);
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
          <button className='btn-ghost btn-lg'>Clear</button>
        </div>
      )}
    </div>
  );
}
