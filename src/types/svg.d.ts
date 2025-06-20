// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="react" />

declare module "*.svg?react" {
    import * as React from "react";
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}
