import React, { memo } from "react";
import ReactLoading from "react-loading";

const Loading = memo(() => <ReactLoading type="spin" color="#ccc" />);

Loading.displayName = "Loading";

export { Loading };
