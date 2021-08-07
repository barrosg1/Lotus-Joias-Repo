import { Row, Col } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer" style={{ marginTop: 50 }}>
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()}{" "}
            <a
              className="font-weight-bold ml-1"
              href="/admin"
              rel="noopener noreferrer"
            >
              Lotus Joais Management
            </a>
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
