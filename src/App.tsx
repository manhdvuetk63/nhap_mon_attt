import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Row } from 'antd';
import './App.css';
import RSA from './rsa/RSA';
import Elgamal from './elgamal/Elgamal';
import ModuloCaculate from './rsa/Modulo';
import SignRSA from './rsa/SignRSA';
import SignCheckRSA from './rsa/SignRSACheck';
import EncryptElgamal from './elgamal/EncryptElgamal';
import SignElgama from './elgamal/SignElgamal';
import SignCheckElgamal from './elgamal/SignElgamalCheck';
import Elliptic from './elliptic/Elliptic';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
const { Header, Content, Sider } = Layout;

const App = () => {
  const location = useLocation();
  return (
    <>
          <Navbar bg="info" expand="xl">
            <Navbar.Brand href="#">Xuan CuTE</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <NavDropdown title="Hệ mật RSA" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={({ }) => {
                    window.location.href = '/#/rsa-1';
                  }}>Xây dựng hệ mật RSA</NavDropdown.Item>

                  <NavDropdown.Item onClick={({ }) => {
                    window.location.href = '/#/rsa-2';
                  }}>Tính mũ theo modulo</NavDropdown.Item>

                  <NavDropdown.Item onClick={({ }) => {
                    window.location.href = '/#/rsa-3';
                  }}>Ký văn bản</NavDropdown.Item>

                  <NavDropdown.Item onClick={({ }) => {
                    window.location.href = '/#/rsa-4';
                  }}>Kiểm tra chữ ký</NavDropdown.Item>
                </NavDropdown><NavDropdown title="Hệ mật ElGamal" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={({ }) => {
                    window.location.href = '/#/elgamal-1';
                  }}>Xây dựng hệ mật Elgamal</NavDropdown.Item>
                  <NavDropdown.Item onClick={({ }) => {
                    window.location.href = '/#/elgamal-2';
                  }}>Mã hóa Elgamal</NavDropdown.Item>
                  <NavDropdown.Item onClick={({ }) => {
                    window.location.href = '/#/elgamal-3';
                  }}>Ký văn bản</NavDropdown.Item>
                  <NavDropdown.Item onClick={({ }) => {
                    window.location.href = '/#/elgamal-4';
                  }}>Kiểm tra chữ ký</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link onClick={({ }) => {
                    window.location.href = '/#/elliptic-1';
                  }}>Hệ mật trên đường cong Elliptic</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

      <Content style={{ padding: '0 50px' }}>
        <Layout className='site-layout-background' id="aaaaa">
          <Content style={{ padding: '30px', marginBottom: 30 }}>
            <Switch>
              <Route path='/rsa-1' component={RSA} />
              <Route path='/rsa-2' component={ModuloCaculate} />
              <Route path='/rsa-3' component={SignRSA} />
              <Route path='/rsa-4' component={SignCheckRSA} />
              <Route path='/elgamal-1' component={Elgamal} />
              <Route path='/elgamal-2' component={EncryptElgamal} />
              <Route path='/elgamal-3' component={SignElgama} />
              <Route path='/elgamal-4' component={SignCheckElgamal} />
              <Route path='/elliptic-1' component={Elliptic} />
              <Route path='*' component={DefaultRedirect} />
            </Switch>
          </Content>
        </Layout>
      </Content>
    </>
  );
};

export default App;

const DefaultRedirect: React.FC = () => {
  useEffect(() => {
    window.location.href = '/#/rsa-1';
  }, []);
  return <></>;
};
