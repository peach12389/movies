import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  data: Record<string, any>;
}

export const RestaurantLayout = ({ children, data }: Props) => {
  return (
    <div className="bg-pink-900">
      {/* <img src={imageSrc} /> */}
      {/* <div /> */}
      <p className="text-pink-900">Adel</p>
      {children}
    </div>
  );
};
