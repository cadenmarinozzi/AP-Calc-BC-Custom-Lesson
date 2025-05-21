import cn from "modules/utils/cn";
import { LazyLoadImage } from "react-lazy-load-image-component";
export default ({ className, parentClassName, ...rest }) => {
  return (
    <div
      className={`p-5 bg-base-200 rounded-3xl flex items-center flex-col shadow-2xl border border-base-300 ${parentClassName}`}
    >
      <LazyLoadImage
        className={cn(`rounded-xl w-full shadow-xl ${className}`)}
        {...rest}
      />
    </div>
  );
};
