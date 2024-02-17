import "./Landing.css";
import land from "../../asset/brand/outdoor4.jpg";
import { Link } from "react-router-dom";
import { Button, Container } from "@mui/material";

const Landing = () => {
  return (
    <div className="landing__container">
      <div className="landing">
          <Container maxWidth="lg" sx={{mt: 16, mb: 10}}>
            <h3 className="landing__header__discount">UP TO 15% DISCOUNT</h3>
            <h1 className="landing__header__main">
              Checkout The Best Outdoor Lighting Solutions
            </h1>
            <Link to="/shop">
              <Button
                variant="outlined"
                sx={[
                  {
                    width: "190px",
                    height: "50px",
                    borderRadius: "20px",
                    fontWeight: "700",
                    backgroundColor: "black",
                    borderColor: "black",
                    color: "white",
                  },
                  {
                    "&:hover": {
                      backgroundColor: "none",
                      color: "#FFE26E",
                      borderColor: "black",
                    },
                  },
                ]}
              >
                SHOP NOW
              </Button>
            </Link>
          </Container>
        </div>
    </div>
  );
};

export default Landing;
