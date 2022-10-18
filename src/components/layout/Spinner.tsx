import SpinnerGif from '../assets/Ripple-1s-200px.gif';

export default function Spinner() {
  return (
    <div className='w-100 mt-20'>
      <img
        width={100}
        className='text-center mx-auto'
        src={SpinnerGif}
        alt='Loading...'
      />
    </div>
  );
}
