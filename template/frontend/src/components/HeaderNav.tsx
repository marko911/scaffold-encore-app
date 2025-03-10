import { FC } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "./ui/card";

const HeaderNav: FC = () => {
  const isLoginPage = window.location.pathname.includes("login");

  return (
    <header className="bg-gray-900 text-white">
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="text-2xl font-bold leading-7 text-white tracking-tight">
              Appointment Booking Me
            </h2>
          </CardTitle>
        </CardHeader>
      </Card>
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        {!isLoginPage && (
          <div className="flex flex-1 justify-end">
            <Link
              to="login"
              className="text-sm font-semibold leading-6 text-white"
            >
              Admin <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default HeaderNav;
