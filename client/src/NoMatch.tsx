import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NoMatch = () => {
  const { t } = useTranslation();
  return (
    <div className="background">
      <div
        style={{
          height: "90vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          flexDirection: "column",
          lineHeight: "70px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "25px 10px",
          }}
        >
          <h1 style={{ textShadow: "5px 5px 8px white" }}>
            {t("404_doesntExist")}
          </h1>
          <div style={{ position: "relative" }}>
            <div
              className="stroke"
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%) rotate(36deg)",
                fontSize: "872px",
                textShadow: "55px 55px 8px black",
                zIndex: "-1",
                color: "orange",
              }}
            >
              ???
            </div>
            <Link
              style={{ color: "black", textShadow: "4px 4px 4px white" }}
              to="/"
            >
              {" "}
              {t("404_goBack")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NoMatch;
