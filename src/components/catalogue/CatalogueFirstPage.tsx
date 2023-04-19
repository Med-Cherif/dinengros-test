import React from "react";

const CatalogueFirstPage = ({
  img = "https://cdn.ipaper.io/iPaper/Papers/865b59f9-6f2a-4566-8993-2ee389e24af6/Pages/1/Zoom.jpg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9jZG4uaXBhcGVyLmlvL2lQYXBlci9QYXBlcnMvODY1YjU5ZjktNmYyYS00NTY2LTg5OTMtMmVlMzg5ZTI0YWY2L1BhZ2VzLyoiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODE5NzU5MDV9fX1dfQ__&Signature=Ks6nHRaxEXE-ytGwHQAW0F-HMtA-2t1~oMcAzHiYZR1Q5XVF7UVa0OVdW6hq6xWO3YUB9ZiHheb80ClwexQsHiajmPqklvSpn~rEYgA6NLhbkFZkWkIKcqIRObwWnFUIPn3Z6XvZyH7LugeGNrxSpNkhsL-TE2kRKqwV5dhFZvU_&Key-Pair-Id=APKAIPGQN6BDBMBZ2LCA",
}) => {
  return (
    <img
      // ref={imageRef}
      style={{
        // height: "100%",
        width: 320,
        height: "100%",
        // objectFit: "contain",
      }}
      src={img}
      alt=""
    />
  );
};

export default CatalogueFirstPage;
