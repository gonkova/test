import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';

export default function Header() {
    const MENU_ITEMS = [
        { link: '/', title: 'Home' },
        { link: '/addevent', title: 'Добави събитие' },
        { link: '/editevent', title: 'Редактирай събитие' },
        { link: '/eventdetails', title: 'Детайли за събитие' },
    ];
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav style={{ background: 'linear-gradient(to right, #0d44ba, #3498db)' }} className="navbar navbar-expand-lg navbar-light ">
            <a className="navbar-brand fw-bold ms-5" href="#" style={{ color: 'orange', width: '150px', textAlign: 'start' }}>EventMaster</a>
            <button
                className="navbar-toggler"
                type="button"
                onClick={toggleMobileMenu}
                style={{ background: 'transparent', border: 'none', outline: 'none', boxShadow: 'none' }}
            >
                <span className="navbar-toggler-icon my-toggler" >
                    <i class="fas fa-bars" style={{ color: 'white', fontSize: '28px' }}></i>
                </span>
            </button>
            <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}>
                <ul className='navbar-nav ml-auto' >
                    {MENU_ITEMS.map((item, index) => (
                        <li className='nav-item' key={index}>
                            <Link className='nav-link text-white text-uppercase fw-bold' to={item.link}>
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

