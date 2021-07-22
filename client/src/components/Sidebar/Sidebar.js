/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

import { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import routes from '../../routes';


const Sidebar = ({ user }) => {

  const [collapse, setCollapse] = useState([]);
  const [collapseOpen, setCollapseOpen] = useState();

  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };

  const closeCollapse = (prop = null) => {

    if (!prop.sub) {
      setCollapseOpen(false);
    }
  };

  const toggleSidebarItems = index => {
    let collapseCopy = [...collapse];
    collapseCopy[index] = !collapseCopy[index];
    setCollapse(collapseCopy);

  }

  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, index) => {
      return (
        prop.sub ? (
          <NavItem key={index} onClick={() => toggleSidebarItems(index)}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={() => closeCollapse(prop)}
              activeClassName="active"
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>

            <Collapse isOpen={collapse[index]}>
              {
                prop.sub.map((prop, index) =>
                  <NavItem key={index}>
                    <NavLink
                      to={prop.layout + prop.path}
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      {prop.name}
                    </NavLink>
                  </NavItem>
                )
              }
            </Collapse>
          </NavItem>
        ) :
          <NavItem key={index}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={closeCollapse}
              activeClassName="active"
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
          </NavItem>

      );
    });
  };

  const logo = {
    innerLink: "/admin",
    imgSrc: require("../../assets/img/brand/Logo-02.png").default,
    imgAlt: "...",
  }

  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (

    <>
      {

        !user ? <p>Loading...</p>

          :

          <Navbar
            className="navbar-vertical fixed-left navbar-light bg-white"
            expand="md"
            id="sidenav-main"
          >
            <Container fluid>
              {/* Toggler */}
              <button
                className="navbar-toggler"
                type="button"
                onClick={toggleCollapse}
              >
                <span className="navbar-toggler-icon" />
              </button>
              {/* Brand */}
              {logo ? (
                <NavbarBrand className="pt-0" {...navbarBrandProps}>
                  <img
                    alt={logo.imgAlt}
                    className="navbar-brand-img"
                    src={logo.imgSrc}
                  />
                </NavbarBrand>
              ) : null}
              {/* User */}
              <Nav className="align-items-center d-md-none">
                <UncontrolledDropdown nav>
                  <DropdownToggle nav className="nav-link-icon">
                    <i className="ni ni-bell-55" />
                  </DropdownToggle>
                  <DropdownMenu
                    aria-labelledby="navbar-default_dropdown_1"
                    className="dropdown-menu-arrow"
                    right
                  >
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Something else here</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav>
                  <DropdownToggle nav>
                    <Media className="align-items-center">
                      <span className="avatar avatar-sm rounded-circle">
                        <img
                          alt="..."
                          src={user.avatar}
                        />
                      </span>
                    </Media>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem className="noti-title" header tag="div">
                      <h6 className="text-overflow m-0">Welcome!</h6>
                    </DropdownItem>
                    <DropdownItem to="/admin/user-profile" tag={Link}>
                      <i className="ni ni-single-02" />
                      <span>My profile</span>
                    </DropdownItem>
                    <DropdownItem to="/admin/user-profile" tag={Link}>
                      <i className="ni ni-settings-gear-65" />
                      <span>Settings</span>
                    </DropdownItem>
                    <DropdownItem to="/admin/user-profile" tag={Link}>
                      <i className="ni ni-calendar-grid-58" />
                      <span>Activity</span>
                    </DropdownItem>
                    <DropdownItem to="/admin/user-profile" tag={Link}>
                      <i className="ni ni-support-16" />
                      <span>Support</span>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                      <i className="ni ni-user-run" />
                      <span>Logout</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
              {/* Collapse */}
              <Collapse navbar isOpen={collapseOpen}>
                {/* Collapse header */}
                <div className="navbar-collapse-header d-md-none">
                  <Row>
                    {logo ? (
                      <Col className="collapse-brand" xs="6">
                        {logo.innerLink ? (
                          <Link to={logo.innerLink}>
                            <img alt={logo.imgAlt} src={logo.imgSrc} />
                          </Link>
                        ) : (
                          <a href={logo.outterLink}>
                            <img alt={logo.imgAlt} src={logo.imgSrc} />
                          </a>
                        )}
                      </Col>
                    ) : null}
                    <Col className="collapse-close" xs="6">
                      <button
                        className="navbar-toggler"
                        type="button"
                        onClick={toggleCollapse}
                      >
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                {/* Form */}
                <Form className="mt-4 mb-3 d-md-none">
                  <InputGroup className="input-group-rounded input-group-merge">
                    <Input
                      aria-label="Search"
                      className="form-control-rounded form-control-prepended"
                      placeholder="Search"
                      type="search"
                    />
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <span className="fa fa-search" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Form>
                {/* Navigation */}
                <Nav navbar>{createLinks(routes)}</Nav>
                {/* Divider */}
                <hr className="my-3" />
                {/* Heading */}
                <h6 className="navbar-heading text-muted">Documentation</h6>


              </Collapse>
            </Container>

          </Navbar>

      }
    </>

  );
};


Sidebar.propTypes = {

  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.authReducer.user
});

export default connect(mapStateToProps)(Sidebar);
