import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import styles from '../../css/navbar.module.css';
import favicon3 from '../Home/images/favicon3.png';
import anime3 from '../Home/images/anime3.png';
import defaultavatar from '../Home/images/defaultavatar.png';
import NavDropdown from 'react-bootstrap/NavDropdown'
// reactstrap components
import {
	Collapse,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	NavbarBrand,
	Navbar,
	NavItem,
	NavLink,
	Nav,
	Container,
	Row,
	Col
} from 'reactstrap';

//Auth
import AuthApi from "../Auth/AuthAPI";
import Cookies from 'js-cookie'
import sessionstorage from 'sessionstorage'



// const Navbardefault = (auth, forgetpass) => {

//     console.log(auth)
//     console.log(forgetpass)
//     return (
//         <Navbar className={'fixed-top ' + this.state.color} color-on-scroll="100" expand="lg">
// 				<Container>
// 					<div className="navbar-translate">
// 						<NavbarBrand to="/" tag={Link} id="navbar-brand">
// 							<span>MotorCare</span>
// 						</NavbarBrand>
// 					</div>
// 					<Collapse
// 						className={'justify-content-end ' + this.state.collapseOut}
// 						navbar
// 						isOpen={this.state.collapseOpen}
// 						onExiting={this.onCollapseExiting}
// 						onExited={this.onCollapseExited}
// 					>
// 						<div className="navbar-collapse-header">
// 							<Row>
// 								<Col className="collapse-brand" xs="6">
// 									<a href="#pablo" onClick={(e) => e.preventDefault()}>
// 										MotorCare•React
// 									</a>
// 								</Col>
// 								<Col className="collapse-close text-right" xs="6">
// 									<button
// 										aria-expanded={this.state.collapseOpen}
// 										className="navbar-toggler"
// 										onClick={this.toggleCollapse}
// 									>
// 										<i className="tim-icons icon-simple-remove" />
// 									</button>
// 								</Col>
// 							</Row>
// 						</div>
// 						<Nav navbar>
// 							<NavItem className="p-0">
// 								<NavLink
// 									data-placement="bottom"
// 									href="/my-cart"
// 									rel="noopener noreferrer"
// 								>
// 									<p className="d-lg-none d-xl-none">Twitter</p>
// 								</NavLink>
// 							</NavItem>
// 							<UncontrolledDropdown nav>
// 								<DropdownToggle
// 									caret
// 									color="default"
// 									data-toggle="dropdown"
// 									href="#pablo"
// 									nav
// 									onClick={(e) => e.preventDefault()}
// 								>
// 									<i className="fa fa-cogs d-lg-none d-xl-none" />



// 								</DropdownToggle>
// 								<DropdownMenu className="dropdown-with-icons">
// 									{this.state.isLogin ? "" :
// 										<DropdownItem tag={Link} to="/register-page">
// 											<i className="tim-icons icon-bullet-list-67" />
// 										Register
// 									</DropdownItem>}


// 									{this.state.isLogin ? "" :
// 										<DropdownItem tag={Link} to="/signin">
// 											<i className="tim-icons icon-single-02" />
// 										Sign in
// 									</DropdownItem>}

// 									{this.state.isLogin ?
// 										<DropdownItem tag={Link} to="/profile-page">
// 											<i className="tim-icons icon-badge" />
// 										Profile Page
// 									</DropdownItem> : ""}

// 									{this.state.isLogin ?
// 										<DropdownItem tag={Link} to="/orders-page">
// 											<i className="tim-icons icon-badge" />
// 										Orders
// 									</DropdownItem> : ""}

// 									{this.state.isLogin ?
// 										<DropdownItem onClick={this.handleClick} tag={Link} to="/">
// 											<i className="tim-icons icon-button-power" />
// 										Log out
// 									</DropdownItem> : ""}

// 								</DropdownMenu>
// 							</UncontrolledDropdown>
// 						</Nav>
// 					</Collapse>
// 				</Container>
//         	</Navbar>

//     )
// }




const Navbardefault = () => {
	const Auth = React.useContext(AuthApi);
	const [totalState, settotalState] = React.useState({ collapseOpen: false, color: 'transparent' })
	const Styles = styled.div`
	 .DropdownItem,span{
		color: white;
	 }
	 .DropdownMenu{
		color: black;
	 }
  `;
	React.useEffect(() => {
		window.addEventListener('scroll', changeColor);
		return () => window.removeEventListener('scroll', changeColor);
		
	})

	const changeColor = () => {
		if (document.documentElement.scrollTop > 99 || document.body.scrollTop > 99) {

			settotalState({ collapseOpen: totalState.collapseOpen, color: 'bg-info' })
		} else if (document.documentElement.scrollTop < 100 || document.body.scrollTop < 100) {

			settotalState({ collapseOpen: totalState.collapseOpen, color: 'transparent' })
		}
	};
	// const toggleCollapse = () => {
	// 	document.documentElement.classList.toggle('nav-open');

	// 	settotalState({ collapseOpen: !totalState.collapseOpen, color: 'navbar-transparent' })
	// };
	const onCollapseExiting = () => {

		settotalState({ collapseOpen: totalState.collapseOpen, color: 'collapsing-out' })
	};
	const onCollapseExited = () => {
		this.setState({
			collapseOut: ''
		});
		settotalState({ collapseOpen: totalState.collapseOpen, color: '' })
	};


	const ClickLogOut = () => {
		Auth.setAuth(false)
		Auth.setforgetpass(false)
		Auth.setcheckUserName(null)
		Cookies.remove("checkUserName");
		Cookies.remove("token");

		Cookies.remove("refreshtoken");

		sessionstorage.clear();
	};



	if (Auth.auth === true || Auth.forgetpass === true) {
		return (
				<Navbar className={totalState.color === 'bg-info' ? `${styles.fixedtop} ${styles.bginfo}` : `${styles.fixedtop} + '#3155AA'`} color-on-scroll="100">
					<Container>
						<Row>
						<div className="navbar-translate">
							<NavbarBrand className="NavbarBrand" to="/" tag={Link} id="navbar-brand">
								<span>Saigon Parking</span>
							</NavbarBrand>
							<NavbarBrand className="NavbarBrand" to="/parkingmap" tag={Link} id="navbar-brand">
								<span>
									<img src={favicon3} alt="favicon3"></img>
								</span>
							</NavbarBrand>
						</div>
						
						</Row>
						<Row
							className={'justify-content-end ' + totalState.collapseOut}
							navbar
							isOpen={totalState.collapseOpen}
							onExiting={onCollapseExiting}
							onExited={onCollapseExited}
						>
							{/* <div className="navbar-collapse-header">
							<Row>
								<Col className="collapse-close text-right" xs="6">
									<button
										aria-expanded={this.state.collapseOpen}
										className="navbar-toggler"
										onClick={this.toggleCollapse}
									>
										<i className="tim-icons icon-simple-remove" />
									</button>
								</Col>
							</Row>
						</div> */}
						<Nav navbar>
								<UncontrolledDropdown nav>
									<DropdownToggle
										color="default"
										data-toggle="dropdown"
										href="#pablo"
										nav
										onClick={(e) => e.preventDefault()}
									>
										
										<div className="photo">
											<img style={{}}  src={anime3} alt="anime3" />
										</div>

									</DropdownToggle>
									<DropdownMenu title="INFORMATION" className="DropdownMenu">
										<DropdownItem className="DropdownItem" tag={Link} to="/profile">
											<i className="tim-icons icon-bullet-list-67" />
										<a>Hồ sơ cá nhân</a>
									</DropdownItem>
										<DropdownItem className="DropdownItem" tag={Link} to="/profile/changepassword">
											<i className="tim-icons icon-single-02" />
										Đổi mật khẩu
									</DropdownItem>
										<DropdownItem className="DropdownItem" onClick={ClickLogOut}>
											<i className="tim-icons icon-single-02" />
										Đăng xuất
									</DropdownItem>
									</DropdownMenu>
								</UncontrolledDropdown>
							</Nav>
						</Row>
					</Container>
				</Navbar>
		);
	}
	else if (Auth.auth === false) {
		return (
			<Navbar className={totalState.color === 'bg-info' ? `${styles.fixedtop} ${styles.bginfo}` : `${styles.fixedtop} + 'transparent'`} color-on-scroll="100">
				<Container>
					<div className="navbar-translate">
						<NavbarBrand className="NavbarBrand" to="/" tag={Link} id="navbar-brand">
							<span>SaiGon Parking</span>
						</NavbarBrand>
					</div>
					<Row
						className={'justify-content-end ' + totalState.collapseOut}
						navbar
						isOpen={totalState.collapseOpen}
						onExiting={onCollapseExiting}
						onExited={onCollapseExited}
					>
						{/* <div className="navbar-collapse-header">
						<Row>
							<Col className="collapse-close text-right" xs="6">
								<button
									aria-expanded={this.state.collapseOpen}
									className="navbar-toggler"
									onClick={this.toggleCollapse}
								>
									<i className="tim-icons icon-simple-remove" />
								</button>
							</Col>
						</Row>
					</div> */}
						<Nav navbar>
							<UncontrolledDropdown nav>
								<DropdownToggle
									color="default"
									data-toggle="dropdown"
									href="#pablo"
									nav
									onClick={(e) => e.preventDefault()}
								>
									<i className="fa fa-cogs d-lg-none d-xl-none" />
									<div className="photo">
											<img style={{paddingTop: "11%"}} src={defaultavatar} alt="defaultavatar" />
										</div>

								</DropdownToggle>
								<DropdownMenu className="DropdownMenu">
									<DropdownItem className="DropdownItem" tag={Link} to="/register">
										<i className="tim-icons icon-bullet-list-67" />
									Đăng ký
								</DropdownItem>
									<DropdownItem className="DropdownItem" tag={Link} to="/login">
										<i className="tim-icons icon-single-02" />
									Đăng nhập
								</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						</Nav>
					</Row>
				</Container>
			</Navbar>
		);
	}
}



export default Navbardefault