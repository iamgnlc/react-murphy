import React, { memo } from "react";
import ReactLoadingImport from "react-loading";

// react-loading is CommonJS with a fake `__esModule` marker, so bundler
// interop can yield its component double-wrapped as `{ default: Component }`.
// Unwrap it; the fallback keeps this correct if interop changes.
const ReactLoading = (
  (ReactLoadingImport as unknown as { default?: unknown }).default ??
  ReactLoadingImport
) as typeof ReactLoadingImport;

const Loading: React.FC = memo(() => <ReactLoading type="spin" color="#ccc" />);

Loading.displayName = "Loading";

export { Loading };
