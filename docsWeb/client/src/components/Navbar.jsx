import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa'; // Tambahkan ikon untuk dark mode

const Navbar = ({ toggleDarkMode, isDarkMode }) => {
	const [isTransparent, setIsTransparent] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State untuk mengontrol sidebar

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setIsTransparent(true);
			} else {
				setIsTransparent(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	// Fungsi untuk toggle sidebar
	const toggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	return (
		<>
			<nav className={`navbar ${isTransparent ? 'transparent' : ''}`}>
				<div className="navbar-logo-container">
					<Link to="/">
						<img src="/logo.png" alt="Logo" className="navbar-logo" />
					</Link>
					<Link to="/">
						<span className="navbar-logo-text">ETLWHIZ</span>
					</Link>
				</div>
				<div className="navbar-links">
					<Link to="/reactsetup">
						<span className="navbar-links-item">React Setup</span>
					</Link>
					<Link to="/about">
						<span className="navbar-links-item">About</span>
					</Link>

					{/* Tombol toggle dark mode */}
					<div className="navbar-dark-mode-toggle" onClick={toggleDarkMode}>
						{isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
					</div>
				</div>

				{/* Ikon menu untuk membuka sidebar */}
				<div className="navbar-dropdown">
					<span className="navbar-links-item" onClick={toggleSidebar}>
						<FaBars size={24} />
					</span>
				</div>
			</nav>

			{/* Sidebar */}
			<div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
				<div className="sidebar-header">
					{/* Tombol toggle dark mode */}
					<div className="navbar-dark-mode-toggle" onClick={toggleDarkMode}>
						{isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
					</div>
					<span className="close-icon" onClick={toggleSidebar}>
						<FaTimes size={22} />
					</span>
				</div>
				<ul className="sidebar-menu">
					<li>
						<Link to="/reactsetup" onClick={toggleSidebar}>
							React Setup
						</Link>
					</li>
					<li>
						<Link to="/about" onClick={toggleSidebar}>
							About
						</Link>
					</li>
				</ul>
			</div>

			{/* Overlay untuk menutup sidebar */}
			{isSidebarOpen && (
				<div className="sidebar-overlay" onClick={toggleSidebar}></div>
			)}
		</>
	);
};

export default Navbar;
