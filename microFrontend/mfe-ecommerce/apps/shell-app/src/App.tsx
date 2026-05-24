import React, { Suspense } from "react";
const ProductPage = React.lazy(
  ()=> import("product_mfe/ProductPage")
);

function App() {

  return (
    <div>
      <h1>Shell Application</h1>
      <Suspense fallback={<div>Loading....</div>}>
        <ProductPage/>
      </Suspense>
    </div>
  )
}

export default App
