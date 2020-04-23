import React, { useEffect } from "react";

declare global {
  interface Window {
    [key: string]: Function;
  }
}

interface Props {
  children: JSX.Element;
  history: string;
  host: string;
  name: string;
}

const getKeyValue = <T extends Window, U extends keyof T>(key: U, obj: T) =>
  obj[key];

const MicroFrontend: React.FC<Props> = ({
  children,
  history = "",
  host,
  name,
}) => {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const scriptId = `u-frontend-${name}`;

    const renderMicroFrontend = () => {
      const mountFunction = getKeyValue(`mount${name}`, window);
      if (typeof mountFunction === "function") {
        mountFunction(`${name}-container`, history);
      }
    };

    if (document.getElementById(scriptId)) {
      renderMicroFrontend();
      return;
    }

    const fetchManifest = async () => {
      const response = await fetch(`${host}/u-manifest.json`);
      const { scripts = [] } = await response.json();

      scripts.forEach(({ src }: { src: string }) => {
        const tag = document.createElement("script");
        tag.id = scriptId;
        tag.src = `${host}/${src}`;
        tag.onload = renderMicroFrontend;
        document.head.appendChild(tag);
      });
    };

    fetchManifest();

    return () => window[`unmount${name}`](`${name}-container`, history);
  }, [history, host, name]);

  return React.createElement("main", { id: `${name}-container` }, children);
};

export default MicroFrontend;
