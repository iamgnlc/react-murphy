import React, { memo } from "react";

import { Spinner } from "./styles";

const Loading: React.FC = memo(() => (
  <Spinner role="status" aria-label="Loading" />
));

Loading.displayName = "Loading";

export { Loading };
