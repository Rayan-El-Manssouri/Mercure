import '../../styles/main.scss';
import Header from '../../components/Header';
import HeaderPrivate from '../../components/NavBarHome';
import logo from '../../assets/color light 500.png';

const Panel = () => {

  return (
    <div className='body_private'>
      <HeaderPrivate logo={logo} />
      <div className='Header-contenaire'>
        <Header active="none" />
        <div className='notification'>
          <p>Des nouveaux messages sont disponible ...</p>
        </div>
        <div
          className='contenaire-aceuil'
        >
          <div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;