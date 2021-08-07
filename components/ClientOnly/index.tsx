import { useEffect, useState, ReactNode } from "react";

type TProps = {
  children: ReactNode;
};

export default function ClientOnly({ children, ...rest }: TProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...rest}>{children}</div>;
}
