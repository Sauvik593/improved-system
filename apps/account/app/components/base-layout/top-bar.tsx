import { Hamburger } from '@kyero/icons';
import { useNavigationContext } from './navigation.context';

export const Topbar = () => {
  const { toggleState } = useNavigationContext();

  return (
    <header className="inline-flex h-14 w-full items-center justify-between bg-white p-3 px-4 drop-shadow-md lg:px-10">
      <button onClick={toggleState}>
        <Hamburger />
      </button>
    </header>
  );
};
