import '../styles/Private.scss';
import HeaderPrivate from '../components/HeaderPrivate';
import NavBarHome from '../components/NavBarHome';
const Private = () => {

  return (
    <div className='body_private' >
      <HeaderPrivate />
      <main>
        <nav>
          <NavBarHome />
        </nav>
      </main>
    </div>
  );
};

export default Private;
