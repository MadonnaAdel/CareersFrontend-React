import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import JobSeekerSidebar from "../../component/JobSeekerSidebar";
import { Outlet } from "react-router-dom";


export default function DashboardJobSekeer() {

  return (
     <div className="container-fluid">
      <div className="row">
        <div  className="col-md-3 col-sm-2 col-2 col-lg-3">
          <JobSeekerSidebar activee={"dashboard"}  />
        </div>
        <div className="col-md-9 col-sm-10 col-9 col-lg-9 my-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
