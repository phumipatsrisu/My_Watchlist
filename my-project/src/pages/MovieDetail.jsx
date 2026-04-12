import React from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>รายละเอียดหนัง</h2>
      <p>
        รหัส id ของหนังเรื่องนี้ <span>{id}</span>:
      </p>
      <Link to="/">home page</Link>
    </div>
  );
};

export default MovieDetail;
