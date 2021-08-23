import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type TProps = {
  fetchMore?: CallableFunction;
  containerClass?: string;
};

const FetchMore = ({ fetchMore, containerClass }: TProps) => {
  const [loading, setLoading] = useState(false);
  const ismounted = useRef(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const callFatchMore = async () => {
    ismounted.current && setLoading(true);
    if (fetchMore) {
      await fetchMore();
    }
    ismounted.current && setLoading(false);
  };
  useEffect(() => {
    ismounted.current = true;
    if (inView && !loading) {
      callFatchMore();
    }
    return () => {
      ismounted.current = false;
    };
  }, [inView]);
  return (
    <div
      ref={ref}
      className={
        containerClass
          ? containerClass
          : 'bg-green-light w-10 h-full max-h-[275px] rounded-lg m-2 flex justify-center items-center'
      }>
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
