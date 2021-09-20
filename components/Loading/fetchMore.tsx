import { FC, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type TProps = {
  fetchMore?: CallableFunction;
  width?: string;
  maxWidth?: string;
  height?: string;
  maxHeight?: string;
};

const FetchMore: FC<TProps> = (props) => {
  const { fetchMore, width, maxWidth, maxHeight, height } = props;
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const callFetchMore = async () => {
    isMounted.current && setLoading(true);
    if (fetchMore) {
      await fetchMore();
    }
    isMounted.current && setLoading(false);
  };
  useEffect(() => {
    isMounted.current = true;
    if (inView && !loading) {
      callFetchMore();
    }
    return () => {
      isMounted.current = false;
    };
  }, [inView]);
  return (
    <div
      ref={ref}
      className={`bg-green-light ${width ?? 'w-10'} ${height ?? 'h-full'} ${maxHeight ?? 'max-h-[275px]'} ${
        maxWidth ?? ''
      } rounded-lg m-2 flex justify-center items-center`}>
      <div className="flex justify-center items-center">
        <div
          style={{
            borderTopColor: 'rgba(255, 191, 0, 1)',
          }}
          className="animate-spin ease-linear rounded-full border-4 border-gray-300 h-7 w-7"
        />
      </div>
    </div>
  );
};

export default FetchMore;
