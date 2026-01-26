import React from 'react';
import styles from './Navbar.module.css';
import logo from './ComicHub.svg';
import logo_small from './CH.svg';
import { useNavigate } from 'react-router-dom'; 

function Navbar() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/`);
  };
  return (
    <nav className={`navbar ${styles.bar}`} id="main-navbar">
      
      <div className="container-fluid">
        
        <div className={`${styles.logo}`} 
		        onClick={handleClick}>
					<img src={logo} alt="ComicHub" className="d-none d-sm-inline ms-2" style={{ height: '29px' }} />
					<img src={logo_small} alt="CH" className="d-inline d-sm-none" style={{ height: '20px' }} />
        </div>
        
        <div className="d-none d-md-flex flex-grow-1 justify-content-center">
          <div className="search-container w-75">
            <div className={`input-group ${styles.input_group}`} >
              <input 
                type="search" 
                className={`form-control ${styles.search_input}`}
                placeholder="Поиск..."
              />
              
            	<span className={`input-group-text ${styles.search_icon}`}>
								<svg 
									width="25" 
									height="25" 
									viewBox="0 0 70 70"
									fill="currentColor"
								>
									<path d="M 31 11 C 19.973 11 11 19.973 11 31 C 11 42.027 19.973 51 31 51 C 34.974166 51 38.672385 49.821569 41.789062 47.814453 L 54.726562 60.751953 C 56.390563 62.415953 59.088953 62.415953 60.751953 60.751953 C 62.415953 59.087953 62.415953 56.390563 60.751953 54.726562 L 47.814453 41.789062 C 49.821569 38.672385 51 34.974166 51 31 C 51 19.973 42.027 11 31 11 z M 31 19 C 37.616 19 43 24.384 43 31 C 43 37.616 37.616 43 31 43 C 24.384 43 19 37.616 19 31 C 19 24.384 24.384 19 31 19 z"/>
								</svg>
							</span>
            </div>
          </div>
        </div>
        
        {/* Иконка лупы для мобильных */}
        <div className="d-md-none">
          <span className={`${styles.mobile_search_icon}`}>
            <svg 
							width="30" 
							height="30" 
							viewBox="0 0 70 70"
							fill="currentColor"
						>
							<path d="M 31 11 C 19.973 11 11 19.973 11 31 C 11 42.027 19.973 51 31 51 C 34.974166 51 38.672385 49.821569 41.789062 47.814453 L 54.726562 60.751953 C 56.390563 62.415953 59.088953 62.415953 60.751953 60.751953 C 62.415953 59.087953 62.415953 56.390563 60.751953 54.726562 L 47.814453 41.789062 C 49.821569 38.672385 51 34.974166 51 31 C 51 19.973 42.027 11 31 11 z M 31 19 C 37.616 19 43 24.384 43 31 C 43 37.616 37.616 43 31 43 C 24.384 43 19 37.616 19 31 C 19 24.384 24.384 19 31 19 z"/>
						</svg>
          </span>
        </div>
        
      </div>
    </nav>
  );
}

export default Navbar;