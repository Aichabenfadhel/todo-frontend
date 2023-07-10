import React from 'react';
import {
  
  Navbar,
  NavbarToggler,
  NavbarBrand,
 
} from 'reactstrap';

import {SiTodoist} from "react-icons/si"

import "./nav.css"

export default function NavbarComponent(args:any) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='Nav-cont'>
      <Navbar {...args}>
        <NavbarBrand href="/" className='nav-title'> <SiTodoist className='nav-icon'/>Todo List</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        {/* <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
          
            
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse> */}
      </Navbar>
    </div>
  );
}


